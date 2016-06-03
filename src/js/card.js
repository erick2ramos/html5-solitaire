// Card Class
function Card(value){
  this.value = value;
}

Card.prototype.figures = "SDCH";
Card.prototype.values = "A23456789TJQK";

Card.prototype.color = function(){
  return (this.figures.indexOf(this.figure()) % 2 ? "B": "R");
};

Card.prototype.number = function(){
  return this.value[0];
};

Card.prototype.figure = function(){
  return this.value[1];
};

Card.prototype.toString = function(){
  return this.value;
};

Card.prototype.isNext = function(card){
  return Card.prototype.values.indexOf(card.value[0]) + 1 === Card.prototype.values.indexOf(this.value[0]);
};