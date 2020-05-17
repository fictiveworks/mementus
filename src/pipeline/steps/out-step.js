class OutStep {
  constructor(pipe, graph, label=null) {
    this.pipe = pipe;
    this.graph = graph;
    this.label = label;
  }

  *process() {
    for (const node of this.pipe.process()) {
      yield* this.graph.outgoing(node.id, this.label);
    }
  }

  toString() {
    return "[OutStep]";
  }
}

export default OutStep;
