import { Component, OnInit } from '@angular/core';
import { RestApi } from '../../rest-api';
import { ActivatedRoute } from '@angular/router';
import { NgModel } from '@angular/forms';
import { Users } from '../users';
import { DataService } from '../../restApi';
import { Configuration } from '../../apiConfiguration';
import { SlimLoadingBarService } from 'ng2-slim-loading-bar';
import { ToastrService } from 'toastr-ng2';

@Component({
  selector: 'app-user-edit',
  moduleId: module.id.toString(),
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {

  data: Users;

  constructor(/*private restapi: RestApi*/ private restApi: DataService, private conf: Configuration, private router: ActivatedRoute,
    public _loadingBar: SlimLoadingBarService,
    public toastr: ToastrService) {
    //this.bas();
  }

  ngOnInit() {
    let userId: number = Number(this.router.snapshot.params['id']);
    console.log(userId);
    //this.getUser(userId);

    this.conf._method = 'Users';

    this.restApi.getSingle<Users>(userId)
      .subscribe(
      (data: Users) => { this.data = data; console.log(data); },
      (error) => { console.log('Hata Oluştu'); this.toastr.error('Bağlantı Hatası'); console.log(error); },
      () => { console.log('Data Alındı'); this.toastr.success('User Edit'); }
      );
  }

  updateClick() {
    let userId: number = Number(this.router.snapshot.params['id']);
    this.conf._method = 'Users/Put';

    console.log(this.data);

    this.restApi.update<Users>(userId, this.data).subscribe((error) => { console.log('Hata Oluştu'); this.toastr.error('Bağlantı Hatası'); console.log(error); });;
  }

  /*getUser(userId: number) {
    this.restapi.getUserById(userId).subscribe(data => {
      this.data = data;
    });*/

  /*async getUserById(userId: number) {
    var liste;
    liste = await this.restapi.getUserById(userId);
    // liste = JSON.stringify(liste);
    this.data = liste;
    // console.log('userlist');
    // console.log(liste);
  }*/


  //await this.getUserById(userId);
  /*console.log('bas');
  this.restapi.getList<Users[]>(userId).subscribe((value: Users[]) => {
    this.data = value;
    console.log(this.data)
  }, (error: any) => { console.log(error) }
  );*/

}
