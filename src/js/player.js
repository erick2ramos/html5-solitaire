//Player
function Player(game){
  this.game = game;
  this.hand = new CardHeap(game);
  this.comp = new DrawableComponent(340, 50, 40, 50);

  this.game.cnv.addEventListener('dblclick', function(e){
    var mouse= {
      x: e.pageX - this.game.cnvInfo.x,
      y: e.pageY - this.game.cnvInfo.y
    };
    if (this.comp.x < mouse.x &&
        this.comp.x + this.comp.width > mouse.x &&
        this.comp.y < mouse.y &&
        this.comp.y + this.comp.height > mouse.y) {
      this.game.input(0, ["hand", ""]);
    }
  }.bind(this));
}

Player.prototype.draw = function(deck) {
  this.hand.push(deck.draw());
  return this;
};

Player.prototype.show = function(){
  return this.hand.top();
};

Player.prototype.render = function(canvas, ctx) {
  var tc = this.hand.top();
  if(tc !== undefined){
    tc.comp.x = this.comp.x;
    tc.comp.y = this.comp.y;
    tc.render(canvas, ctx);
  }
};