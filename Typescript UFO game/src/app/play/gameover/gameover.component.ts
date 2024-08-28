import { Component } from '@angular/core';
import {SaveScoreService} from "../../shared/services/save-score.service";
import { OnInit, AfterViewInit, HostListener, ViewChild, ElementRef} from '@angular/core';
import {PreferencesService} from "../../shared/services/preferences.service";
import {ScoresService} from "../../shared/services/scores.service";
@Component({
  selector: 'app-gameover',
  templateUrl: './gameover.component.html',
  styleUrl: './gameover.component.css'
})
export class GameoverComponent {

  constructor(private scrSaver : SaveScoreService, private pref : PreferencesService, private scoresSrv : ScoresService) {

  }

  showScore() {
    document.getElementById("score")!.innerHTML = String(this.scrSaver.retrieve());
  }

  ngAfterViewInit() {
    this.showScore();
  }

  sendRecord() {
    this.scoresSrv.postRecord(this.scrSaver.retrieve(), this.pref.getNumUFOs(), this.pref.getSeconds()).subscribe({
      next: (values) => {window.alert("Score saved successfully")
        console.log(values)},
      error : (error) => {console.log("there was an error")
      window.alert("Your record registration failed");}
    })
  }

}
