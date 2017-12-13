import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DataService } from '../restApi';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  model:any={};
  loading =false;
  error = '';

  constructor(private router:Router, private _dataService:DataService) { }

  ngOnInit() {
    // login ekranına girilmiş ise yeni bir login işlemi gerçekleştirilecek. 
    //bu yüzden öncelikle session temizlenmeli.
    this._dataService.logout();
  }

  login(){
    this.loading = true;
    this._dataService.login(this.model.username, this.model.password)
    .subscribe(result=>{
      if(result == true){
        this.router.navigate(['/dashboard']);
      }else{
        this.error = 'Kullanıcı bilgileri hatalı';
        this.loading = false;
      }
    })
  }

}