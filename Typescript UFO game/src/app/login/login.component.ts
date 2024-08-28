import {Component, AfterViewInit, Renderer2} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {TokenmngService} from "../shared/services/tokenmng.service";
import {Router} from "@angular/router";
import {ButtonService} from "../shared/services/button.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username : string = "";
  password : string = "";
  myToken : string = "";
  login : string = "";
  element : HTMLElement | undefined;
  constructor(private user : UserService, private tknManager : TokenmngService, private btnService : ButtonService, private router : Router) {
  }


  doLogin() {
    this.user.login(this.username, this.password).subscribe({
      next : (response) =>
      {
        this.myToken = response.headers.get("Authorization");
        this.tknManager.saveToken(this.myToken);
        this.btnService.saveState("Logout");
        this.user.saveUsername(this.username);
        this.btnService.login();
        window.alert("Login successful");
        this.router.navigate(["home"]);
      },
      error : (error) => {
        console.log("An error occurred");
        window.alert("Login unsuccessful");
      }
    })
  }
}
