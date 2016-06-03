//Deck
function Deck(){
  this.cards = [];
  for(i = 0; i < Card.prototype.figures.length; i++){
    for(j = 0; j < Card.prototype.values.length; j++){
      this.cards.push(new Card(Card.prototype.values[j]+Card.prototype.figures[i]));
    }
  }
}

Deck.prototype = Object.create(CardHeap.prototype);

Deck.prototype.draw = function() {
  return this.cards.splice(Math.floor(Math.random()*this.cards.length), 1)[0];
};

Deck.prototype.isEmpty = function(){
  return this.cards.length === 0;
}