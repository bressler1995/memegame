// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/147-chrome-dinosaur.html
// https://youtu.be/l0HoJHc-63Q

// Google Chrome Dinosaur Game (Unicorn, run!)
// https://editor.p5js.org/codingtrain/sketches/v3thq2uhk

class memeGirl {
  constructor() {
    this.r = 100;
    this.x = width;
    this.y = height - this.r;
  }

  move() {
    this.x -= 16;
  }

  show() {
    if(gamemode == 0) {
      image(classicenemy_img, this.x, this.y, this.r, this.r);
    } else if(gamemode == 1) {
      image(mgiImg, this.x, this.y, this.r, this.r);
    }
    

    // fill(255, 50);
    // ellipseMode(CORNER);
    // ellipse(this.x, this.y, this.r, this.r);
  }
}
