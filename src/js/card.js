// Card Class
function Card(value){
  this.value = value;
  this.comp = new DrawableComponent(0, 0, 40, 50);
}

Card.prototype.figures = "SDCH";
Card.prototype.values = "A23456789TJQK";

Card.prototype.color = function(){
  return (this.figures.indexOf(this.figure()) % 2 === 0 ? "B": "R");
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

Card.prototype.render = function(canvas, ctx) {
  ctx.strokeRect(this.comp.x, this.comp.y, this.comp.width, this.comp.height);
  ctx.fillStyle = 'white'
  ctx.fillRect(this.comp.x, this.comp.y, this.comp.width, this.comp.height);
  ctx.fillStyle = this.color() === "B" ? "black" : "red";
  ctx.fillText(this.value, this.comp.x + 10, this.comp.y + 10);
};