class WhereStep {
  constructor(source, predicate, graph, traverser) {
    this.pipe = source;
    this.predicate = predicate;
    this.graph = graph;
    this.traverser = traverser;
  }

  *process() {
    for (const element of this.pipe.process()) {
      const subtraversal = new this.traverser([element], this.graph);
      if (this.predicate(subtraversal)) yield element;
    }
  }

  toString() {
    return "[WhereStep]";
  }
}

export default WhereStep;
