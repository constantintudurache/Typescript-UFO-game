import {Component, OnInit} from '@angular/core';
import {ScoresService} from "../shared/services/scores.service";
import {HttpClient, HttpClientModule} from "@angular/common/http";

@Component({
  selector: 'app-scores',
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.css'
})
export class ScoresComponent implements OnInit{
  scoresList: Array<any> = [];
  constructor(private scores:ScoresService) {}

  listScores() {
    this.scores.getRecords().subscribe({
      next : (values) => {this.scoresList = values},
      error : (error) => {console.log("there was an error")}
    })
    console.log(this.scoresList)
  }

  ngOnInit() {
    this.listScores();
  }
}
