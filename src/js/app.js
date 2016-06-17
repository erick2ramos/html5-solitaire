function App(){
  this.cnv = null;
  this.ctx = null;
  this.mg = null;
  this.cnvInfo = null;
  this.mouse = {x: 0, y: 0, stack: null, card: null, extra: ""};
}

App.prototype.canvas = function(cnv){
  if(cnv !== undefined){
    this.cnv = cnv
  }
  return this.cnv;
}

App.prototype.input = function(player, action){
  this.mg.input(player, action);
  this.render();
};

App.prototype.run = function() {
  this.mg = new MainGame(this);

  var gameloop = function(){
    this.render();
    setTimeout(gameloop.bind(this), 30);
  };
  gameloop.bind(this)();
  this.update();
};

App.prototype.update = function() {
  this.mg.update(0);
};

App.prototype.render = function() {
  this.mg.render(this.cnv, this.ctx);
  this.ctx.fillStyle = "white";
  this.ctx.strokeStyle = "black";
  this.ctx.fillText("("+this.mouse.x+", "+this.mouse.y+") " + this.mouse.extra, this.mouse.x + 2, this.mouse.y);
};

window.onload = function(){
  window.app = new App();
  var canvas = document.getElementById("screen");
  window.app.canvas(canvas);
  window.app.cnvInfo = {
    x: canvas.offsetLeft,
    y: canvas.offsetTop
  };
  window.app.ctx = window.app.canvas().getContext("2d");
  canvas.addEventListener("mousemove", function(e){
    window.app.mouse.x = e.pageX - window.app.cnvInfo.x;
    window.app.mouse.y = e.pageY - window.app.cnvInfo.y;
  })
  window.app.run();
};