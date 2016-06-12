function App(){
  this.cnv = null;
  this.ctx = null;
  this.mg = null;
  this.cnvInfo = null;
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
  this.mg.render(this.cnv, this.ctx);
};

App.prototype.render = function() {
  this.mg.render(this.cnv, this.ctx);
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

  window.app.run();
};