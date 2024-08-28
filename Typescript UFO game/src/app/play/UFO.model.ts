export class UFO {
  id : string;
  element : HTMLElement;
  limitRight : number = window.innerWidth;
  hpos : number = 10;
  vpos : number;
  ufoWidth: number = 60;
  hstep : number = 3;

  constructor(id : string) {
    this.id = id;
    this.element = document.getElementById(this.id) as HTMLElement;
    this.hpos = parseInt(window.getComputedStyle(this.element)["left"]);
    this.ufoWidth = parseInt(window.getComputedStyle(this.element)["width"]);
    this.vpos = parseInt(window.getComputedStyle(this.element)["bottom"]) + 100
    this.hstep = 1 + Math.random() * 3 ;
  }


}
