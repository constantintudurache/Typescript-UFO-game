import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenmngService {

  constructor() { }

  saveToken(theToken : string) {
    sessionStorage.setItem("token", theToken);
  }

  getToken() : string  {
    if (sessionStorage.getItem("token") != null)
        return sessionStorage.getItem("token") as string;
    else return "";

  }
}
