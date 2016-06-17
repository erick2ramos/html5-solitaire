//Table
function Table(game){
  this.game = game;
  this.stacks = [];
  this.piles = [];
  this.deck = new Deck(game);

  this.deck.comp.x = 400;
  this.deck.comp.y = 50;

  for(i = 0; i < 7; i++){
    var aHeap = new SolitaireStack(game, i);
    for(j = 0; j <= i; j++){
      aHeap.draw(this.deck);
    };
    aHeap.uncover();
    aHeap.comp.x = 100 + (60*i);
    aHeap.comp.y = 150;
    this.stacks.push(aHeap);
  }
  for(i = 0; i < 4; i++){
    this.piles.push(new CardHeap(game));
  }
}

Table.prototype.move = function(from, to){
  var coords = from.split(",");
  var stackSegment = this.stacks[coords[0]*1].segment(coords[1]*1);
  if(this.stacks[to*1].visible.cards.length === 0 && stackSegment.bottom().number() === "K"){
    this.stacks[to*1].merge(stackSegment);
    return;
  }
  if(stackSegment.bottom().color() !== this.stacks[to*1].visible.top().color() && 
    this.stacks[to*1].visible.top().isNext(stackSegment.bottom() ) ){
    this.stacks[to*1].merge(stackSegment);
    this.stacks[coords[0]*1].uncover();
  } else {
    this.stacks[coords[0]*1].merge(stackSegment);
  }
};

Table.prototype.play = function(card, to){
  if(!this.stacks[to*1].visible.top() && card.number() === "K"){
    this.stacks[to*1].visible.push(card);
    return true;
  }
  if(this.stacks[to*1].visible.top().isNext(card) && card.color() != this.stacks[to*1].visible.top().color() ){
    this.stacks[to*1].visible.push(card);
    return true;
  }
  return false;
};

Table.prototype.hand = function(card){
  var index = Card.prototype.figures.indexOf(card.figure());
  if(!this.piles[index].top() && card.number() === "A"){
    this.piles[index].push(card);
    return true;
  } else if(card.isNext(this.piles[index].top())){
    this.piles[index].push(card);
    return true;
  }
  return false;
};

Table.prototype.stack = function(from){
  var stackCard = this.stacks[from*1].visible.pop();
  var index = Card.prototype.figures.indexOf(stackCard.figure())
  if(!this.piles[index].top() && stackCard.number() === "A"){
    this.piles[index].push(stackCard);
    this.stacks[from*1].uncover();
    return true;
  } else if(stackCard.isNext(this.piles[index].top())){
    this.piles[index].push(stackCard);
    this.stacks[from*1].uncover();
    return true;
  }
  this.stacks[from*1].visible.push(stackCard);
  return false;
};

Table.prototype.show = function(){
  var output = "";
  for(i = 0; i < this.piles.length; i++){
    output += this.piles[i].top() + " - ";
  }
  output += "\n";
  for(i = 0; i < this.stacks.length; i++){
    output += i + ": " + this.stacks[i] + "\n";
  }
  return output;
};

Table.prototype.update = function(timelapse){
  for(var i = 0; i < this.piles.length; i++){
    var tc = this.piles[i].top();
    if(tc !== undefined){
      tc.comp.x = 100 + (i * 60);
      tc.comp.y = 50;
    }
  }
  for(var i = 0; i < this.stacks.length; i++){
    this.stacks[i].update(timelapse);
  }
};

Table.prototype.render = function(canvas, ctx) {
  for(var i = 0; i < this.piles.length; i++){
    ctx.strokeRect(100 + (i * 60), 50, 40, 50);
    if(this.piles[i].top() !== undefined){
      this.piles[i].top().render(canvas, ctx);
    }  
  }
  for(var i = 0; i < this.stacks.length; i++){
    this.stacks[i].render(canvas, ctx);
  }
  this.deck.render(canvas, ctx);
};