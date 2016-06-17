//Stack
function SolitaireStack(game, stackNumber){
  this.game = game;
  this.number = stackNumber;
  this.hidden = new CardHeap();
  this.visible = new CardHeap();
  this.comp = new DrawableComponent(0, 0, 40, 50);

  this.game.cnv.addEventListener("dblclick", function(e){
    var mouse = {
      x: e.pageX - this.game.cnvInfo.x,
      y: e.pageY - this.game.cnvInfo.y
    };
    if (this.comp.x < mouse.x &&
        this.comp.x + this.comp.width > mouse.x &&
        this.comp.y < mouse.y &&
        this.comp.y + this.comp.height > mouse.y) {
      this.game.input(0, ["stack", this.number + ""]);
    }
  }.bind(this));

  this.game.cnv.addEventListener("mousedown", function(e){
    var mouse = {
      x: e.pageX - this.game.cnvInfo.x,
      y: e.pageY - this.game.cnvInfo.y
    };
    if (this.comp.x < mouse.x &&
        this.comp.x + this.comp.width > mouse.x &&
        this.comp.y < mouse.y &&
        this.comp.y + this.comp.height > mouse.y) {
      var relative = {
        x: this.comp.x - mouse.x,
        y: mouse.y - this.comp.y
      };
      var snap = Math.floor(((relative.y) / 10) / this.visible.cards.length);

      this.game.mouse.stack = this.number + "," + Math.min(snap, this.visible.cards.length - 1);

    }
  }.bind(this));

  this.game.cnv.addEventListener("mouseup", function(e){
    var mouse= {
      x: e.pageX - this.game.cnvInfo.x,
      y: e.pageY - this.game.cnvInfo.y
    };
    if (this.comp.x < mouse.x &&
        this.comp.x + this.comp.width > mouse.x &&
        this.comp.y < mouse.y &&
        this.comp.y + this.comp.height > mouse.y) {
      if(this.game.mouse.stack !== null && this.game.mouse.stack !== null && this.game.mouse.stack[0] !== this.number + ""){
        this.game.input(0, ["move",this.game.mouse.stack + "|" + this.number]);
        this.game.mouse.stack = null;
      } else if(this.game.mouse.card !== null){
        this.game.input(0, ["play", this.number]);
        this.game.mouse.card = null;
      }
    }
  }.bind(this));
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

SolitaireStack.prototype.update = function(timelapse){
  for(var j = 0; j < this.visible.cards.length; j++){
    var tc = this.visible.cards[j];
    tc.comp.x = this.comp.x;
    tc.comp.y = this.comp.y + (3) + (j * 10);
  }
  this.comp.height = 3 + (this.visible.cards.length * 10) + 50;
};

SolitaireStack.prototype.render = function(canvas, ctx) {
  ctx.strokeRect(this.comp.x, this.comp.y, 40, 50);
  if(this.hidden.cards.length > 0){
    this.comp.height = 50; 
    ctx.strokeRect(this.comp.x, this.comp.y, 40, 50);
    ctx.fillStyle = "blue";
    ctx.fillRect(this.comp.x, this.comp.y, 40, 50);
  }
  for(var j = 0; j < this.visible.cards.length; j++){
    this.visible.cards[j].render(canvas, ctx);
  }
};