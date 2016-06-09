//Stack
function SolitaireStack(){
  this.hidden = new CardHeap();
  this.visible = new CardHeap();
  this.comp = new DrawableComponent();
}

SolitaireStack.prototype.merge = function(heap){
  return this.visible.merge(heap);
};

SolitaireStack.prototype.segment = function(from){
  return this.visible.segment(from);
};

SolitaireStack.prototype.draw = function(deck) {
  this.hidden.push(deck.draw());
  return this;
};

SolitaireStack.prototype.uncover = function(){
  if(this.hidden.size() > 0 && this.visible.size() === 0){
    this.visible.push(this.hidden.pop());
  }
  return this;
};

SolitaireStack.prototype.toString = function(){
  return "("+ this.hidden.size() +")- " + this.visible;
};

SolitaireStack.prototype.render = function(canvas, ctx) {
  ctx.strokeRect(this.comp.x, this.comp.y, 40, 50);
  for(var i = 0; i < this.hidden.cards.length; i++){
    ctx.strokeRect(this.comp.x, this.comp.y + (i * 10), 40, 50);
    ctx.fillStyle = "blue";
    ctx.fillRect(this.comp.x, this.comp.y + (i * 10), 40, 50);
  }
  for(var j = 0; j < this.visible.cards.length; j++){
    var tc = this.visible.cards[j];
    tc.comp.x = this.comp.x;
    tc.comp.y = this.comp.y + (i * 10) + (j * 10);
    this.visible.cards[j].render(canvas, ctx);
  }
};