let memeguy;
let mgImg;
let mgiImg;
let loseImg;
let bImg;
let memegirls = [];
let soundClassifier;

function preload() {
  const options = {
    probabilityThreshold: 1.2
  };
  soundClassifier = ml5.soundClassifier('SpeechCommands18w', options);
  mgImg = loadImage('memeguy.png');
  mgiImg = loadImage('memegirl.png');
  loseImg = loadImage('memegirllose.png');
  bImg = loadImage('memebackground.jpg');
}

function mousePressed() {
  memegirls.push(new memeGirl());
}

function setup() {
  createCanvas(800, 450);
  memeguy = new memeGuy();
  soundClassifier.classify(gotCommand);
}

function gotCommand(error, results) {
  if (error) {
    console.error(error);
  }
  console.log(results[0].label, results[0].confidence);
  if (results[0].label == 'up') {
    memeguy.jump();
  }
}

function keyPressed() {
  if (key == ' ') {
    memeguy.jump();
  }
}

function draw() {
  if (random(1) < 0.005) {
    memegirls.push(new memeGirl());
  }

  background(bImg);
  for (let t of memegirls) {
    t.move();
    t.show();
    if (memeguy.hits(t)) {
      console.log('game over');
      image(loseImg, width - 275 - 30, height - 400, 275, 400);
      noLoop();
    }
  }

  memeguy.show();
  memeguy.move();
}
