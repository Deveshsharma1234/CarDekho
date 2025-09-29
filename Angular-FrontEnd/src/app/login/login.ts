import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  imports: [],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  title = 'Login Page';
  username = '';
  password = '';  

  handleLogin(){
    

  }
  handleInputEmail(e: Event){
    this.username = (e.target as HTMLInputElement).value;
    console.log(this.username);
  }
  handleInputPassword(e: Event){
    this.password = (e.target as HTMLInputElement).value;
    console.log(this.password);
  }



}
