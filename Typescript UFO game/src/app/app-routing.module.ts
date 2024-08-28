import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {PlayComponent} from "./play/play.component";
import {LoginComponent} from "./login/login.component";
import {PreferencesComponent} from "./preferences/preferences.component";
import {RecordsComponent} from "./records/records.component";
import {RegisterComponent} from "./register/register.component";
import {GameoverComponent} from "./play/gameover/gameover.component";
import {NavbarComponent} from "./shared/navbar/navbar.component";

const routes: Routes = [
  {path: "home", component : HomeComponent},
  {path: "play", component : PlayComponent},
  {path: "login", component : LoginComponent},
  {path: "nav", component : NavbarComponent},
  {path: "preferences", component : PreferencesComponent},
  {path: "records", component : RecordsComponent},
  {path: "register", component : RegisterComponent},
  {path: "gameover", component : GameoverComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: '/home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
