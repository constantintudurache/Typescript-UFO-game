import { Injectable } from '@angular/core';
import {UserService} from "./user.service";

@Injectable({
  providedIn: 'root'
})
export class ButtonService {

  logged : boolean = false;
  constructor(private user : UserService) { }

  saveState(state : string) {
    if(state == "Login" || state =="Logout")
      sessionStorage.setItem("button", state);
  }

  getState() {
    if (sessionStorage.getItem("button") != null) {
      return sessionStorage.getItem("button")
    }

    return ""
  }


  logout() {
      this.logged = false;
      this.saveState("Login");
      sessionStorage.removeItem("token");
      sessionStorage.removeItem("username");
  }

  login() {
      this.logged = true;
      this.saveState("Logout");
  }

  Status() {
    return this.logged;
  }

}
