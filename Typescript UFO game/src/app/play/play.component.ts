import {Component, OnInit, AfterViewInit, HostListener, ViewChild, ElementRef, OnDestroy} from '@angular/core';
import {PreferencesService} from "../shared/services/preferences.service";
import {Renderer2} from "@angular/core";
import {UFO} from "./UFO.model";
import {range} from "rxjs";
import {missile} from "./missile.model";
import {Router} from "@angular/router";
import {SaveScoreService} from "../shared/services/save-score.service";
import {ScoresService} from "../shared/services/scores.service";

@Component({
  selector: 'app-play',
  templateUrl: './play.component.html',
  styleUrl: './play.component.css'
})
export class PlayComponent implements OnInit, AfterViewInit, OnDestroy {
  msl : missile  = new missile();
  UFOs : Array<UFO> = [];
  score : number = 0;
  scoreBoard : any;
  timeBoard : any;
  timePID : any;
  isOver : boolean = false;
  gameTime: number = this.pref.getSeconds();
  numUFOs: number = this.pref.getNumUFOs();
  constructor(private pref: PreferencesService, private renderer: Renderer2, private router : Router, private scrSaver : SaveScoreService) {
  }



  ngOnInit() {
    console.log(this.gameTime + " " + this.numUFOs)
    this.move();
  }

  ngAfterViewInit() {
    this.spawnUFOs();
    for (let i = 0; i < this.numUFOs; i++) {
      this.renderer.setStyle(this.UFOs[0].element, 'left',  this.UFOs[0].hpos + 'px');
      window.setInterval(() => { this.move(); } , 25);
      window.onresize = () => {this.UFOs[0].limitRight = window.innerWidth; };
    }
    this.msl.element = document.getElementById("missile") as HTMLElement;
    this.scoreBoard = document.getElementById("score");
    this.timer();
  }

  move() {

    for (let i = 0; i < this.numUFOs; i ++)
    {
      if ((this.UFOs[i].hpos > this.UFOs[i].limitRight - this.UFOs[i].ufoWidth - 8) || (this.UFOs[i].hpos) < 0) {
        this.UFOs[i].hstep = (-1) * this.UFOs[i].hstep;
      }

      this.UFOs[i].hpos = this.UFOs[i].hpos + this.UFOs[i].hstep;
      this.renderer.setStyle(this.UFOs[i].element, 'left', this.UFOs[i].hpos + 'px');
    }

  }

  createTag(id: string) {
    let newImg = this.renderer.createElement('img');
    this.renderer.setProperty(newImg, "src", "../assets/Pictures/UFO-play.png");
    this.renderer.setProperty(newImg, "id", id);

    return newImg
  }

  spawnUFOs() {
    for (let i = 0; i < this.numUFOs; i++) {
      let id: string = String(i + 1);
      id = "UFO" + id;
      let newUFO = this.createTag(id);
      document.getElementById("container")!.appendChild(newUFO);
    }
    for (let i = 0; i < this.numUFOs; i++) {
      let id: string = String(i + 1);
      id = "UFO" + id;
      this.UFOs[i] = new UFO(id)
    }
  }

  @HostListener('document:keydown', ['$event'])
  keypressed(theEvent: KeyboardEvent) {
    switch (theEvent.key) {
      case 'ArrowRight':
        this.moveHorizontal(this.msl.hstep);
        break;
      case 'ArrowLeft':  this.moveHorizontal((-1) * this.msl.hstep);
        break;
      case ' ':
        this.pullTrigger();
        break;
    }
  }



  moveHorizontal(step: number) {
    if (this.msl.hpos + this.msl.width + step < this.msl.rLimit && this.msl.hpos + this.msl.width + step > this.msl.width && !this.msl.triggered){
      this.msl.hpos = this.msl.hpos + step;
      this.renderer.setStyle(this.msl.element, 'left', this.msl.hpos + 'px');
    }
  }

  newMissile() {
    this.msl.vpos = 0;
    this.msl.element.style.bottom = this.msl.vpos + 'px';
    this.msl.triggered = false;
  }

  trigger() {
    if (this.msl.vpos + this.msl.height > this.msl.uLimit) {
      clearInterval(this.msl.pid);
      this.newMissile();
      this.score = this.score - 25;
      this.scoreBoard.innerHTML = this.score;
    } else {
      this.msl.vpos = this.msl.vpos + this.msl.vstep;
    }
    this.msl.element.style.bottom = this.msl.vpos + 'px';
  }

  checkForAHit(index : number) {

    let hit : boolean = false;
    if (
      (this.msl.vpos <= this.UFOs[index].vpos + this.UFOs[index].ufoWidth) &&
      (this.msl.vpos + this.msl.height >= this.UFOs[index].vpos) &&
      (this.msl.hpos + this.msl.width / 2 > this.UFOs[index].hpos) &&
      (this.msl.hpos + this.msl.width / 2 < this.UFOs[index].hpos + this.UFOs[index].ufoWidth)
    )
    {
      hit = true;
    }

    return hit;
  }

  launch() {
    for (let i = 0; i < this.numUFOs; i ++) {
      if(this.checkForAHit(i)) {
        window.clearInterval(this.msl.pid);
        this.msl.triggered = false;
        this.msl.vpos = 0;
        this.score = this.score + 100;
        this.scoreBoard.innerHTML = this.score;
        this.renderer.setProperty(this.UFOs[i].element, "src", "../assets/Pictures/explosion.gif");

        window.setTimeout(() => {
            this.renderer.setProperty(this.UFOs[i].element, "src", "../assets/Pictures/UFO-play.png");
        }, 1000);
      }
    }

    this.trigger();
  }

  pullTrigger() {
    if (!this.msl.triggered) {
      this.msl.pid = window.setInterval(() => {this.launch(); }, 10);
      this.msl.triggered = true;
    }
  }
  displayTime() {
    this.timeBoard = document.getElementById("time");
    this.timeBoard.innerHTML = this.gameTime;
    this.gameTime = this.gameTime - 1;

    if (this.gameTime < 0 ) {
      window.clearInterval(this.timePID);
      this.gameOver();
      window.clearInterval(this.msl.pid);
    }
  }

  timer() {
    this.timePID = window.setInterval(() => this.displayTime(), 1000);
  }
  gameOver() {
    this.scrSaver.save(this.score)
    for (let i = 0; i < this.numUFOs; i++) {
        document.getElementById("container")!.removeChild(this.UFOs[i].element);
    }


    this.score = this.score - 50 * (this.numUFOs - 1);
    this.score = Math.floor(this.score / (this.pref.getSeconds() / 60));

    window.clearInterval(this.timePID);
    document.getElementById("container")!.removeChild(this.msl.element);
    document.getElementById("container")!.removeChild(document.getElementById("score")!);
    document.getElementById("container")!.removeChild(document.getElementById("time")!);
    this.router.navigate(['/gameover'])
    this.isOver = true;
  }

  ngOnDestroy() {
    window.clearInterval(this.msl.pid);
    window.clearInterval(this.timePID);

  }

}
