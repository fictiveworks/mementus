// Simple queue which uses an array as storage.
//
// Based on the original idea by Stephen Morley.
// See: http://code.stephenmorley.org/javascript/queues/
//
// @maetl / 2017
function Queue() {
  this._entries = [];
  this._offset = 0;
}

Queue.prototype.add = function(entry) {
  this._entries.push(entry);
}

Queue.prototype.isEmpty = function(){
  return (this._entries.length - this._offset) == 0;
}

Queue.prototype.removeFirst = function() {
  if (this._entries.length == 0) return;

  var entry = this._entries[this._offset];

  this._offset++;

  // If the space left at the front takes up half of the array then
  // slice it off and reset the array offset
  if (this._offset * 2 > this._entries.length) {
    this._entries = this._entries.slice(this._offset);
    this._offset = 0;
  }

  return entry;
}

export default Queue;
