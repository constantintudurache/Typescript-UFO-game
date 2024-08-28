import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {config} from "../config";
import {TokenmngService} from "./tokenmng.service";

@Injectable({
  providedIn: 'root'
})
export class ScoresService {
  constructor(private http: HttpClient, private tknmng : TokenmngService) { }

  getRecords() : Observable<any> {
    return this.http.get(config.baseURL + "/records");
  }

  getUserRecords(username : string, token : string) {
    if(username != "") {
      const headers = new HttpHeaders()
        .set("Authorization", token) ;
      return this.http.get(config.baseURL + "/records/" + username, {headers});
    }
    return null;
  }



  postRecord(points : number, ufos : number, disposedTime : number) {
    let token = this.tknmng.getToken();
    const headers = new HttpHeaders()
      .set("Content-Type", "application/json")
      .set("Authorization", token);

    return this.http.post(config.baseURL + "/records", {punctuation : points, ufos: ufos, disposedTime: disposedTime},{headers})
  }



}



