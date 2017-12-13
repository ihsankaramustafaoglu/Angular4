import 'rxjs/add/operator/map';

import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Router, CanActivate } from '@angular/router';
import { Configuration } from './apiConfiguration';
import { Options } from 'selenium-webdriver/firefox';
import { Headers, RequestOptions } from '@angular/http';
import { Body } from '@angular/http/src/body';

@Injectable()
export class DataService {

    private actionUrl: string;
    public token: string;

    constructor(private http: HttpClient, private _api: Configuration, private router: Router) {
        var currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.token = currentUser && currentUser.token;
        this.actionUrl = _api.ServerWithApiUrl;
    }

    public login(username: string, password: string): Observable<any> {
        //this._api._method = 'User_Login';
        //const headerOptions: any = new Headers({ "username": username, "password": password, "client_id": "bilisimHR.WebApp", "grant_type": "password" });
        //const header: any = new Headers(headerOptions);
        //{ JSON.stringify({ username: username, password: password }'
        this.actionUrl = 'http://192.168.10.27:40200/Auth/Auth/Token';
        /*return this.http.post(
            this.actionUrl,
            { "username": username, "password": password, "client_id": "bilisimHR.WebApp", "grant_type": "password" }
        ).map((response: Response) => {
            // response içerisinde token varsa login başarılı
            var responseJson: any = response.json();
            //let token = response.json() && response.json().token;
            let token = responseJson && responseJson.token;
            if (token) {
                // token değerini setle
                this.token = token;

                // routing yaparken token kontrolü için response token localStorage ile sakla
                localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                // login başarılı 
                return true;
            } else {
                // login başarısız
                return false;
            }
        });*/

        const options = new RequestOptions({
            withCredentials: false
        });

        return this.http.post(
            this.actionUrl,
            "username=" + username + "&password=" + password + "&client_id=bilisimHR.WebApp&grant_type=password",
            //{ body: { "username": username, "password": password, "client_id": "bilisimHR.WebApp", "grant_type": "password" } },
            { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
        )
            .map((response: Response) => {
                // response içerisinde token varsa login başarılı
                var responseJson: any = response;

                //let token = response.json() && response.json().token;
                let token = responseJson && responseJson.access_token;
                if (token) {
                    // token değerini setle
                    this.token = token;

                    console.log(token);

                    // routing yaparken token kontrolü için response token localStorage ile sakla
                    localStorage.setItem('currentUser', JSON.stringify({ username: username, token: token }));

                    // login başarılı 
                    return true;
                } else {
                    // login başarısız
                    return false;
                }
            });
    }

    public logout(): void {
        // token bilgilerini sil. (session temizle)
        this.token = null;
        localStorage.removeItem('currentUser');
    }

    public getAll<T>(): Observable<T> {
        this._api.ServerWithApiUrl = this._api._apiUrl + this._api._method;
        return this.http.get<T>(this._api.ServerWithApiUrl);
    }

    public getSingle<T>(id: number): Observable<T> {
        this._api.ServerWithApiUrl = this._api._apiUrl + this._api._method;
        return this.http.get<T>(this._api.ServerWithApiUrl + '/' + id);
    }

    public add<T>(itemName: string): Observable<T> {
        const toAdd = JSON.stringify({ ItemName: itemName });

        return this.http.post<T>(this.actionUrl, toAdd);
    }

    public update<T>(id: number, itemToUpdate: any): Observable<T> {
        this._api.ServerWithApiUrl = this._api._apiUrl + this._api._method;
        return this.http
            .put<T>(this._api.ServerWithApiUrl, JSON.stringify(itemToUpdate));
    }

    public delete<T>(id: number): Observable<T> {
        return this.http.delete<T>(this.actionUrl + id);
    }
}


@Injectable()
export class CustomInterceptor implements HttpInterceptor {

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (!req.headers.has('Content-Type')) {
            req = req.clone({ headers: req.headers.set('Content-Type', 'application/json') });
        }

        req = req.clone({ headers: req.headers.set('Accept', 'application/json') });
        console.log(JSON.stringify(req.headers));
        return next.handle(req);
    }
}