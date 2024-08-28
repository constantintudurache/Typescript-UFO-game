import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { PreferencesComponent } from './preferences/preferences.component';
import { RecordsComponent } from './records/records.component';
import { PlayComponent } from './play/play.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ScoresService} from "./shared/services/scores.service";
import {HttpClientModule} from "@angular/common/http";
import { ScoresComponent } from './scores/scores.component';
import {FormsModule} from "@angular/forms";
import {UserService} from "./shared/services/user.service";
import {TokenmngService} from "./shared/services/tokenmng.service";
import { NavbarComponent } from './shared/navbar/navbar.component';
import {PreferencesService} from "./shared/services/preferences.service";
import { GameoverComponent } from './play/gameover/gameover.component';
import {ButtonService} from "./shared/services/button.service";
import {SaveScoreService} from "./shared/services/save-score.service";
import { UserScoresComponent } from './user-scores/user-scores.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    PreferencesComponent,
    RecordsComponent,
    PlayComponent,
    LoginComponent,
    RegisterComponent,
    ScoresComponent,
    NavbarComponent,
    GameoverComponent,
    UserScoresComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ScoresService,
              UserService,
              TokenmngService,
              PreferencesService,
              ButtonService,
              SaveScoreService
  ], // the services must be imported here at least 3 for this project
  bootstrap: [AppComponent]
})
export class AppModule { }
