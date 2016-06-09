function App(){
  this.cnv = null;
  this.ctx = null;
  this.mg = null;
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
  this.mg = new MainGame();
  this.mg.render(this.cnv, this.ctx);
};

App.prototype.render = function() {
  this.mg.render(this.cnv, this.ctx);
};

window.onload = function(){
  window.app = new App();
  window.app.canvas(document.getElementById("screen"));
  window.app.ctx = window.app.canvas().getContext("2d");
  window.app.run();
};