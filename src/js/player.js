//Player
function Player(){
  this.hand = new CardHeap();
  this.comp = new DrawableComponent(100, 150, 0, 0);
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