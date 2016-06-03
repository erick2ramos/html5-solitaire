//Player
function Player(){
  this.hand = new CardHeap();
}

Player.prototype.draw = function(deck) {
  this.hand.push(deck.draw());
  return this;
};

Player.prototype.show = function(){
  return this.hand.top();
};