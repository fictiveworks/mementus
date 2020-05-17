import Traversal from "../traversal";

class WhereStep {
  constructor(source, predicate, graph) {
    this.pipe = source;
    this.predicate = predicate;
    this.graph = graph;
  }

  *process() {
    for (const element of this.pipe.process()) {
      const subtraversal = new Traversal(element, this.graph);
      if (this.predicate(subtraversal)) yield element;
    }
  }

  toString() {
    return "[WhereStep]";
  }
}

export default WhereStep;
