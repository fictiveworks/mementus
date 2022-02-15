// Simple priority queue using a binary heap array to store items.
// Uses the empty 0 index trick to simplify the arithmetic as described in
// Sedgewick's 'Algorithms' book.
//
// No JS-specific optimisations have been added to the code. Probably needs
// a profiling and refactoring tidyup.
//
// @maetl / 2017
class PriorityQueue {
  constructor() {
    this._heap = [];
    this._size = 0;
  }

  enqueue(item, priority) {
    this._heap[++this._size] = [priority, item];
    this.bubbleUp(this._size);
  }

  dequeue() {
    var first = this._heap[1][1];
    this.swap(1, this._size--);
    this._heap[this._size + 1] = null;
    this.bubbleDown(1);
    return first;
  }

  isEmpty() {
    return this._size == 0;
  }

  bubbleUp(pos) {
    while (pos > 1 && this.comparison(Math.floor(pos / 2), pos)) {
      this.swap(Math.floor(pos / 2), pos);
      pos = Math.floor(pos / 2);
    }
  }

  bubbleDown(pos) {
    while (2 * pos <= this._size) {
      const next = 2 * pos;
      if (next < this._size && this.comparison(next, next + 1)) next++;
      if (!this.comparison(pos, next)) break;
      this.swap(pos, next);
      pos = next;
    }
  }

  comparison(a, b) {
    return this._heap[a][0] > this._heap[b][0];
  }

  swap(a, b) {
    const item = this._heap[a];
    this._heap[a] = this._heap[b];
    this._heap[b] = item;
  }
}

export default PriorityQueue;
