// Game
function MainGame(game){
  this.game = game;
  this.table = new Table(game);
  this.player = new Player(game);
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
  this.update(0);
};

MainGame.prototype.update = function(timelapse){
  this.table.update(timelapse);
  this.player.update(timelapse);
};

MainGame.prototype.render = function(canvas, ctx) {
  ctx.fillStyle = "#00AA64";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  this.table.render(canvas, ctx);
  this.player.render(canvas, ctx);
};
