import Traversal from "../traversal";

class UnionStep {
  constructor(source, graph, base, other) {
    this.pipe = source;
    this.graph = graph;
    this.base = base;
    this.other = other;
  }

  *process() {
    let _base = [];
    let _other = [];

    for (const element of this.pipe.process()) {
      _base = _base.concat(this.base(new Traversal([element], this.graph)));
      _other = _other.concat(this.other(new Traversal([element], this.graph)));
    }

     yield* new Set([..._base, ..._other]);
  }

  toString() {
    return "[UnionStep]";
  }
}

export default UnionStep;
