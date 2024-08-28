import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {config} from "../config";
import {ButtonService} from "./button.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  login(username : string, password : string) : Observable<any> {

    return this.http.get(config.baseURL + "/users/login?username=" + username +"&password="
      + password, {observe : "response"});
  }
  find(username : string) : Observable<any> {
    return this.http.get(config.baseURL + "/users/" + username, {observe : "response"});
  }

  register(username : string, email : string, password : string) {

    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")

    return this.http.post(config.baseURL + "/users", {username : username, email: email, password: password},{headers})
  }

  saveUsername(username : string) {
    sessionStorage.setItem("username", username);
  }

  getUsername() {
    if (sessionStorage.getItem("username") != null) {
      return sessionStorage.getItem("username")!;
    }

    return "";
  }

}
