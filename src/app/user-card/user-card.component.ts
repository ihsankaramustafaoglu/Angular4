import { Component, OnInit } from '@angular/core';
//import { RestApi } from '../rest-api';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  // private apiUrl = 'http://192.168.10.27:40200/Auth/api/Users/';
  // data: any[];

  constructor(/*private restapi: RestApi*/) { }

  ngOnInit() {
  }
  /*
    async userlist() {
      var liste;
      liste = await this.restapi.getData(this.apiUrl);
      // liste = JSON.stringify(liste);
      this.data = liste;
      // console.log('userlist');
      // console.log(liste);
    }
  
    async bas() {
      await this.userlist();
      console.log('bas');
      console.log(this.data)
    }*/
}
