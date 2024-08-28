
export class missile {

  hpos = 700;
  hstep = 10;
  vpos = 0;
  vstep = 5;
  width = 20;
  height = 160;
  pid = 0;
  triggered = false;
  element : HTMLElement;
  rLimit : number;
  uLimit : number;
  constructor() {
    this.element = document.getElementById("missile") as HTMLElement;
    this.rLimit  =  window.innerWidth;
    this.uLimit  =  window.innerHeight;

  }

}
