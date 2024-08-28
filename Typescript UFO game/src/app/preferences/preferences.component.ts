import { Component, OnInit } from '@angular/core';
import {PreferencesService} from "../shared/services/preferences.service";


@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.component.html',
  styleUrl: './preferences.component.css'
})
export class PreferencesComponent implements OnInit{

  time : number = 60;
  UFOs : number = 1;
  saved : boolean = false;

  constructor(private pref : PreferencesService) {}

  save(UFOs : number, seconds : number) {
    this.pref.savePreferences(UFOs, seconds);
    this.saved = true;
  }

  ngOnInit() {
      this.time = this.pref.getSeconds();
      this.UFOs = this.pref.getNumUFOs();
  }
}
