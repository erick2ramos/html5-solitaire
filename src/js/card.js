// Card Class
function Card(game, value){
  this.game = game;
  this.value = value;
  this.comp = new DrawableComponent(0, 0, 40, 50);
  this.startingComp = {x: 0, y: 0, active: false};

  this.game.cnv.addEventListener("mousedown", function(e){
    var mouse= {
      x: e.pageX - this.game.cnvInfo.x,
      y: e.pageY - this.game.cnvInfo.y
    };
    if (this.comp.x < mouse.x &&
        this.comp.x + this.comp.width > mouse.x &&
        this.comp.y < mouse.y &&
        this.comp.y + this.comp.height > mouse.y && !this.startingComp.active) {
      this.startingComp.x = this.comp.x;
      this.startingComp.y = this.comp.y;
      this.startingComp.offX = this.comp.x - mouse.x;
      this.startingComp.offY = this.comp.y - mouse.y;
      this.startingComp.active = true;
    }
  }.bind(this));

  this.game.cnv.addEventListener("mousemove", function(e){
    var mouse= {
      x: e.pageX - this.game.cnvInfo.x,
      y: e.pageY - this.game.cnvInfo.y
    };
    if (this.startingComp.active){
      this.comp.x = mouse.x + this.startingComp.offX;
      this.comp.y = mouse.y + this.startingComp.offY;
    }
  }.bind(this));

  this.game.cnv.addEventListener("mouseup", function(e){
    var mouse= {
      x: e.pageX - this.game.cnvInfo.x,
      y: e.pageY - this.game.cnvInfo.y
    };
    if (this.startingComp.active) {
      this.comp.x = this.startingComp.x;
      this.comp.y = this.startingComp.y;
      this.startingComp.active = false;
    }
  }.bind(this));
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
  return card !== undefined && Card.prototype.values.indexOf(card.value[0]) + 1 === Card.prototype.values.indexOf(this.value[0]);
};

Card.prototype.render = function(canvas, ctx) {
  ctx.strokeRect(this.comp.x, this.comp.y, this.comp.width, this.comp.height);
  ctx.fillStyle = 'white'
  ctx.fillRect(this.comp.x, this.comp.y, this.comp.width, this.comp.height);
  ctx.fillStyle = this.color() === "B" ? "black" : "red";
  ctx.fillText(this.value, this.comp.x + 10, this.comp.y + 10);
};