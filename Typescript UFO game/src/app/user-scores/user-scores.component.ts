import { Component } from '@angular/core';
import {ScoresService} from "../shared/services/scores.service";
import {UserService} from "../shared/services/user.service";
import {TokenmngService} from "../shared/services/tokenmng.service";

@Component({
  selector: 'app-user-scores',
  templateUrl: './user-scores.component.html',
  styleUrl: './user-scores.component.css'
})
export class UserScoresComponent {
  scoresList: Array<any> = [];
  response : Object = [];
  constructor(private scores : ScoresService, private user : UserService, private tkn : TokenmngService) {}

  listScores() : void {
    if (this.scores.getUserRecords(this.user.getUsername(), this.tkn.getToken()) != null) {
      this.scores.getUserRecords(this.user.getUsername(), this.tkn.getToken())!.subscribe({
        next: (values): void => {
          this.response = values
          console.log(this.response)
          this.scoresList = Object.values(this.response);
          // console.log(()
        },
        error: (error) => {
          console.log("there was an error");
          this.user.saveUsername("");
        }
      })
      console.log(this.scoresList)
    }
  }

  ngOnInit() {
    this.listScores();
  }
}
