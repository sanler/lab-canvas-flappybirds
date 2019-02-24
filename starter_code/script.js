window.onload = function() {
  document.getElementById("start-button").onclick = function() {
    
    var game = new Game();

    game.start();  

};  

}
function Game(){

  this.canvas = document.createElement("canvas");
  this.ctx = this.canvas.getContext("2d");
  this.canvas.width = 1200;
  this.canvas.height = 700;
  this.child=document.getElementById("game-board");
  document.body.insertBefore(this.canvas, this.child.nextSibling);
  this.fps = 60;
  this.reset();
}

Game.prototype.reset = function() {
  this.background = new Background(this);
  this.player = new Player(this);

};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}; 

Game.prototype.draw = function() {
  this.background.draw();
  this.player.draw();

};


Game.prototype.stop = function() {
  clearInterval(this.interval);
};


Game.prototype.start = function() {


  this.interval = setInterval(function() {
    this.clear();
    this.moveAll();

    this.draw();
  }.bind(this), 6000 / this.fps);
};

Game.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
}; 



Game.prototype.moveAll = function() {
  this.background.move();
  this.player.move();
  //this.obstacles.forEach(function(obstacle) { obstacle.move(); });
};

function Background(game) {
  this.game = game;

  this.img = new Image();
  this.img.src = 'images/bg.png';

  this.x = 0;
  this.y = 0;

  this.dx = 10;


}

Background.prototype.draw = function() {
  this.game.ctx.drawImage(this.img, this.x, this.y, this.game.canvas.width, this.game.canvas.height);
  this.game.ctx.drawImage(this.img, this.x + this.game.canvas.width, this.y, this.game.canvas.width, this.game.canvas.height);
};

Background.prototype.move = function() {
  this.x -= this.dx;

  if (this.x < -this.game.canvas.width) this.x = 0;
};

function Player(game) {
  this.game = game;
 
  this.x = 100;

  // guardar posición original (suelo)
  this.y = 350;
 
  this.y0 = 350;
  this.y = this.y0;

  this.img = new Image();
  this.img.src = 'images/flappy.png';

  // medidas de la imagen a representar en el canvas
  this.w = 50;
  this.h = 75;

  this.vy = 1;


  this.setListeners();
}




Player.prototype.draw = function() {
  // Documentación drawImage:
  // https://developer.mozilla.org/es/docs/Web/API/CanvasRenderingContext2D/drawImage
 

  this.game.ctx.drawImage(this.img, this.x, this.y, 100, 150);

};

var SPACE = 38;


Player.prototype.setListeners = function() {
  document.onkeydown = function(event) {
    //alert('te oigo');
    if (event.keyCode === SPACE && this.y == this.y0) {
      this.y -= 5;
      this.vy -= 50;
    } 
  }.bind(this);
};

Player.prototype.move = function() {
  // Aumenta la velocidad en el eje y.
  var gravity = 10;

  // solo salta cuando el personaje está en el suelo
 if (this.y >= this.y0) {
    this.vy = 1;
    this.y = this.y0;
  } else{
    this.vy += gravity;
    this.y += this.vy;
  }
};
