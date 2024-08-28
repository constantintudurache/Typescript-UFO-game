import { Component, AfterViewInit} from '@angular/core';
import {UserService} from "../shared/services/user.service";
import {ButtonService} from "../shared/services/button.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent{

  constructor(private userSrv : UserService, private btnService : ButtonService) {
  }

  password : string = "";
  repeatedPassword : string = "";
  username : string = "";
  email : string = "";
  subscription : any;


  checkPassword(pwd : string, rpwd : string) {
    return pwd == rpwd;
  }

  checkData(username : string, email : string, password : string) {
    return (username != "" && email != "" && password != "")
  }

  checkDuplicate(username : string) : number {
    this.userSrv.find(username).subscribe({
      next : (values) => {return values.status},
      error : (error) => {return 0;}
    })

    return 0;
  }

  sendData() {

    if(!this.checkData(this.username, this.email, this.password)) {
      window.alert("You MAY NOT leave empty fields");
    }
    else if (!this.checkPassword(this.password, this.repeatedPassword)) {
      window.alert("Password and repeated password MUST be the same");
    }

    if(this.btnService.Status() == true) {
      window.alert("You cannot register a user while logged in");
    }
    else {
      if (this.checkDuplicate(this.username) == 200) {
        window.alert("This user is already registered");
      }
      else {
        this.subscription = this.userSrv.register(this.username, this.email, this.password).subscribe({
          next: (values) => {
            window.alert("User registration was successful")
          },
          error : (error) => {console.log("there was an error");
            window.alert("User registration Failed");}
        })
      }
    }





  }

}
