import { Component, OnInit } from '@angular/core';
import { RestApi } from '../rest-api';
import { Users } from './users';
import { DataService } from '../restApi';
import { Configuration } from '../apiConfiguration';
import { error } from 'selenium-webdriver';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  private apiUrl = 'http://192.168.10.27:40200/Auth/api/users';
  data: Users[];

  constructor(/*private restapi: RestApi*/
    public restApi: DataService,
    public conf: Configuration,
    public _loadingBar: SlimLoadingBarService,
    public toastr: ToastrService
  ) {
  }

  ngOnInit() {
    //this.userlist();
    this._loadingBar.start();

    this.conf._method = 'Users';
    this.restApi.getAll<Users[]>()
      .subscribe(
      (data: Users[]) => { this.data = data; },
      (error) => { console.log('Hata Oluştu'); this.toastr.error('Bağlantı Hatası'); console.log(error); },
      () => { console.log('Data Alındı'); this.toastr.success('User List'); }
      );

    /*this.toastr.success('success');
    this.toastr.error('error');
    this.toastr.info('info');
    this.toastr.warning('warning');*/

    this._loadingBar.complete();
  }

  /*userlist() {
    this.restapi.getUsers().subscribe(data => {
      this.data = data;
    });
  }*/

  editClick(user) {
    console.log(user)
  }
}
