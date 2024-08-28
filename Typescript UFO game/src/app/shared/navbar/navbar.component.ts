import { Component, AfterViewInit, DoCheck} from '@angular/core';
import {ButtonService} from "../services/button.service";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements DoCheck{


  element : HTMLElement;
  logged : boolean = false;

  constructor(private btnService : ButtonService, private user : UserService) {
    this.element = document.getElementById("login")!;
  }

  logout() {
    this.btnService.logout();
    this.element.innerHTML = sessionStorage.getItem("button")!;
  }

  login() {
    this.element.innerHTML = sessionStorage.getItem("button")!;
    this.btnService.login();
  }

  ngDoCheck() {
    this.logged = this.btnService.Status();
  }


}
