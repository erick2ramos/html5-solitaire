//Deck
function Deck(game){
  this.game = game;
  this.comp = new DrawableComponent(0, 0, 40, 50);
  this.cards = [];
  for(i = 0; i < Card.prototype.figures.length; i++){
    for(j = 0; j < Card.prototype.values.length; j++){
      this.cards.push(new Card(game, Card.prototype.values[j]+Card.prototype.figures[i]));
    }
  }
  this.game.cnv.addEventListener("mouseup", function(e){
    var mouse= {
      x: e.pageX - this.game.cnvInfo.x,
      y: e.pageY - this.game.cnvInfo.y
    };
    if (this.comp.x < mouse.x &&
        this.comp.x + this.comp.width > mouse.x &&
        this.comp.y < mouse.y &&
        this.comp.y + this.comp.height > mouse.y) {
      this.game.input(0, ["draw", ""]);
    }
  }.bind(this));
}

Deck.prototype = Object.create(CardHeap.prototype);

Deck.prototype.draw = function() {
  return this.cards.splice(Math.floor(Math.random()*this.cards.length), 1)[0];
};

Deck.prototype.isEmpty = function(){
  return this.cards.length === 0;
}

Deck.prototype.render = function(canvas, ctx) {
  ctx.strokeRect(this.comp.x, this.comp.y, 40, 50);
  ctx.fillStyle = this.comp.color;
  if(this.cards.length > 0){
    ctx.fillRect(this.comp.x, this.comp.y, 40, 50);
  }
};