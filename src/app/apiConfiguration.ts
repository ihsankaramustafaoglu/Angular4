import { Injectable } from '@angular/core';

@Injectable()
export class Configuration {
    public _apiUrl = 'http://192.168.10.27:40200/Auth/api/';
    public _method: any;
    public ServerWithApiUrl = this._apiUrl + this._method;
}