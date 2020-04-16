let memeguy;
let mgImg, mgiImg, loseImg, bImg;
let classicbg_img, classicplayer_img, whitedino;
let memegirls = [];
let soundClassifier;
let gamestate = 0;
let gamemode = 0;
let bf_text = ["Millenials", "Me", "Me", "Me", "Me", "Introverts", "Me", "Me"];
let gf_text = ["A stable career", "Work", "Multiple Pressing matters and responsibilities", "Scientific evidence supporting the danger of staring at the sun", "Distracted boyfriend meme", "Corona virus", "This meme", "Still using this meme in 2020"];
let other_text = ["Avocado toast", "Anything else", "A nap", "Solar eclipse", "Drake hotline bling meme", "Enjoying some me time", "Anything that's not this meme", "Newer, funnier memes"];
let myfont;
let toast, toaststate = 0, toastdom;
let savepic;
let canvasdom;
var canvasdom_rect;


function preload() {
  const options = {
    probabilityThreshold: 0.95
  };

  whitedino = loadImage('whitedino.png');
  //meme images
  mgImg = loadImage('memeguy.png');
  mgiImg = loadImage('memegirl.png');
  loseImg = loadImage('memegirllose.png');
  bImg = loadImage('memebackground.jpg');
  //classic images
  classicbg_img = loadImage('classicbackground.jpg');
  classicplayer_img = loadImage('classicplayer.png');
  classicenemy_img = loadImage('classicenemy.png');
  //fonts
  myfont = loadFont('impact.ttf');
  startfont = loadFont('press_start.ttf');
}

function mousePressed() {
  switch(gamestate) {
    case 1:
      memeguy.jump();
      break;
  }
  
}

function setup() {
  toast = select('#toast');
  toastdom = document.getElementById("toast");
  canvasdom = document.getElementById("defaultCanvas0");
  savepic = createButton('');
  savepic.addClass('savepic');
  savepic.mousePressed(function(){
    saveCanvas('boringmeme', 'jpg');
  });
  
  createCanvas(800, 450);
  calculatebounds();
}

function keyPressed() {

  switch(gamestate) {
    case 0:
      if (key == '1') {
        gamemode = 0;
        initializegame(false);
      } else if(key == '2') {
        gamemode = 1;
        initializegame(false);
      }
      
      break;
    case 1:
      if (key == ' ') {
        memeguy.jump();
      }
      break;
    case 2:
      savepic.removeClass("show_savepic");
      initializegame(true);
      break;
  }
  
}

function draw() {

  switch(gamestate) {
    case 0:
      background(0);
      //randomSeed(2); // useful for freezing frame
      for (var i = 0; i < width; i += 20) {
        
        for (var j = 0; j < height; j += 20){
        
          
          fill(random(0,100));
          // line bwlow eliminates the lines(stroke) around the boxes (0)
          strokeWeight(0);
        // shape and one dimension  
        rect(i, j, 15, 15);
      
        }
      }

      push();
      fill(255);
      textSize(16);
      textFont(startfont);
      text("Press 1 For Classic", 50, 50);
      text("Press 2 For Meme Version", 50, 90);
      pop();

      image(whitedino, width - 200, height - 200, 150, 160)
      break;
    case 1:
      if (random(1) < 0.005) {
        memegirls.push(new memeGirl());
      }

      if(gamemode == 0) {
        background(classicbg_img);
      } else if(gamemode == 1) {
        background(bImg);
      }

      memeguy.show();
      memeguy.move();
    
      
      for (let t of memegirls) {
        t.move();
        t.show();
        if (memeguy.hits(t)) {
          if(gamemode == 0) {
            push();
            fill(73, 73, 73);
            textSize(24);
            textFont(startfont);
            text("GAME OVER", width / 2 - 110, height / 2 - 30);
            pop();
            showtoast("Press Any Key To Restart.")
          } else if(gamemode == 1) {
            let randommeme = round(random(0, bf_text.length -1));
            console.log(randommeme);
            console.log('game over');
            image(loseImg, width - 275 - 30, height - 400, 275, 400);

            push();
            strokeWeight(1.2);
            stroke(0);
            fill(255);
            textSize(18);
            textLeading(22);
            textFont(myfont);
            text(bf_text[randommeme], memeguy.x, memeguy.y - 30, memeguy.x + 100);
            text(gf_text[randommeme], t.x + 50, t.y - 30, t.x + 50 + 100);
            text(other_text[randommeme], width - 275 + 50, height - 200, width - 275 + 50 + 100);
            pop();
            showtoast("Save a Picture Or Press Any Key To Restart.");
            savepic.addClass("show_savepic");
          }
          
          gamestate = 2;
          noLoop();
        }
      }
    
      
      break;
  }

}

function initializegame(reset) {
  loop();
  if(gamemode == 0) {
    memeguy = new memeGuy(100);
  } else if(gamemode == 1) {
    memeguy = new memeGuy(150);
  }

  memegirls = [];

  if(reset == false) {
    gamestate = 1;
    showtoast("Press space to jump and change jump speed.");
  } else if(reset == true) {
    gamestate = 0;
  }
  
}

function showtoast(message) {
  toastdom.innerHTML = message;

  if(toaststate == 0) {
    setTimeout(function(){
      toast.addClass("show_toast");
      toaststate = 1;
      showtoast(message);
    }, 500);
  } else if(toaststate == 1) {
    setTimeout(function(){
      toast.removeClass("show_toast");
      toaststate = 0;
    }, 2300);
  }
}

function calculatebounds() {
  canvasdom_rect = canvasdom.getBoundingClientRect();
  console.log(canvasdom_rect.left)
  savepic.style('left', canvasdom_rect.left + 30 + "px");
  savepic.style('top', canvasdom_rect.top + 30 + "px");
  
}

function windowResized() {
  calculatebounds();
}