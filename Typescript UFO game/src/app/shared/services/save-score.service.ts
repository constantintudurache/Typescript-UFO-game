import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SaveScoreService {

  constructor() { }

  save(score : number) {
    sessionStorage.setItem("currentScore", String(score));
  }

  retrieve() : number {
    if (sessionStorage.getItem("currentScore") != null)
      return Number(sessionStorage.getItem("currentScore"))
    else return 0
  }
}
