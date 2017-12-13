import { Component, OnInit, Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private router: Router) { }

    canActivate() {
        if (localStorage.getItem('currentUser')) {
            return true;
        }

        /*
        burada sadece login olup olmadığımız kontrol ediyoruz.
        Hatalı login girişini localStorage ya da ip bazında db de tutarak
        ip ban kontrolünü gerçekleştirebilriz. DB de banlı ip bağlandığında burada 
        kontrol gerçekleştirip kullanıcı logini engelleyebiliriz.
        */


        this.router.navigate(['/login']);
        return false;
    }
}