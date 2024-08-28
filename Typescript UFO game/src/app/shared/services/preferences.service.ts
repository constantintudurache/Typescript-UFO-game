import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService {

  constructor() { }

  savePreferences(numUfo : number, seconds : number) {
      sessionStorage.setItem("UFOs", String(numUfo));
      sessionStorage.setItem("seconds", String(seconds));
  }

  getNumUFOs() : number {
      if (sessionStorage.getItem("UFOs") !=  null)
        return Number(sessionStorage.getItem("UFOs"))
      else return 1;
  }

  getSeconds() : number {
    if (sessionStorage.getItem("seconds") !=  null){
      return Number(sessionStorage.getItem("seconds"));
    }
    else return 60;
  }

}
