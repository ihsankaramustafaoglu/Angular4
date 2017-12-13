import { Http, Response } from '@angular/http';
import { Injectable } from '@angular/core';
import * as $ from 'jquery';
import { Observable } from 'rxjs/Observable';
import { HttpClient, HttpRequest, HttpInterceptor } from '@angular/common/http';
import { HttpHandler } from '@angular/common/http/src/backend';
import { HttpEvent } from '@angular/common/http/src/response';
import { Users } from './user-list/users';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/catch';

@Injectable()
export class RestApi {
    // data: any;
    private apiUrl = 'http://192.168.10.27:40200/Auth/api/users';

    constructor(private http: Http, private httpClient: HttpClient) { }

    /*async getData(apiUrl: string): Promise<any> {
        const list = await this.http.get(apiUrl).map(response => response.json()).toPromise();
        // console.log('service');
        // console.log(list);
        return await list;
    }*/

    /*getList<T>(userId: number): Observable<T> {
        const url = this.apiUrl + "/" + userId;
        return this.httpClient.get<T>(url);
    }*/

    getUsers(): Observable<Users[]>{
        return this.http.get(this.apiUrl)
        .map(response => response.json());
    }

    getUserById(userId: number): Observable<Users[]>{
        const url = this.apiUrl + "/" + userId;
        return this.http.get(url)
        .map(response => response.json());
    }

    // async getUserById(userId: number): Promise<any> {
    //     const url = this.apiUrl + "/" + userId;

    //     const list = this.getData(url)//await this.http.get(apiUrl).map(response => response.json()).toPromise();
    //     // console.log('service');
    //     // console.log(list);
    //     return await list;
    // }
}

@Injectable()
export class SetHeaders implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.headers.has('content-type')) {
            request = request.clone({
                headers: request.headers.set('content-type', 'application/json')
            });
        }
        request = request.clone({
            headers: request.headers.set('accept', 'application/json')
        });

        return next.handle(request);
    }
}