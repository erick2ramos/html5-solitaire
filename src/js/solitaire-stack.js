//Stack
function SolitaireStack(){
  this.hidden = new CardHeap();
  this.visible = new CardHeap();
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