// Card heap
function CardHeap(){
  this.cards = [];
}
//CardHeap.prototype.cards = [];

CardHeap.prototype.top = function() {
  return this.cards[this.cards.length - 1];
};

CardHeap.prototype.bottom = function() {
  return this.cards[0];
};

CardHeap.prototype.push = function(card){
  this.cards.push(card);
  return this;
};

CardHeap.prototype.pop = function(){
  return this.cards.splice(this.cards.length - 1, 1)[0];
};

CardHeap.prototype.toString = function(){
  return this.cards.join(",");
};

CardHeap.prototype.segment = function(from) {
  var segmentHeap = new CardHeap();
  var segArr = this.cards.splice(from, this.cards.length);
  for(i = 0; i < segArr.length; i++){
    segmentHeap.push(segArr[i]);
  }
  return segmentHeap;
};

CardHeap.prototype.size = function(){
  return this.cards.length;
};

CardHeap.prototype.merge = function(heap){
  this.cards = this.cards.concat(heap.clear());
  return this;
};

CardHeap.prototype.clear = function(from) {
  return this.cards.splice((from || 0), this.cards.length);
};