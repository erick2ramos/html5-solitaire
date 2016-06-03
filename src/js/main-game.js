// Game
function MainGame(){
  this.table = new Table();
  this.player = new Player();
}

MainGame.prototype.draw = function(player, coords){
  if(this.table.deck.isEmpty()){
    this.table.deck.merge(this.player.hand);
  }
  this.player.hand.push(this.table.deck.pop());
};
MainGame.prototype.hand = function(player,coords){
  var handCard = this.player.hand.pop();
  if(!this.table.hand(handCard)){
    this.player.hand.push(handCard);
  }
};
MainGame.prototype.play = function(player, coords){
  var handCard = this.player.hand.pop();
  if(!this.table.play(handCard, coords)){
    this.player.hand.push(handCard);
  }
};
MainGame.prototype.stack = function(player, coords){
  this.table.stack(coords);
};
MainGame.prototype.move = function(player, coords){
  coords = coords.split("|");
  this.table.move(coords[0], coords[1]);
};

MainGame.prototype.show = function(){
  console.log(this.table.show());
  console.log(this.player.show() + "");
};

MainGame.prototype.input = function(player, actions){
  this[actions[0]](player, actions[1]);
  this.show();
};