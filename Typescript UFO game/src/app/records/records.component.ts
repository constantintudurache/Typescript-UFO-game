import { Component, AfterViewInit } from '@angular/core';
import {UserService} from "../shared/services/user.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrl: './records.component.css'
})
export class RecordsComponent implements AfterViewInit{

  username : string = "";
  constructor(private user : UserService) {
  }

  ngAfterViewInit() {
    if (this.user.getUsername() != "") {
      document.getElementById("user")!.innerHTML = this.user.getUsername() + " RECORDS";
    }
  }




}
