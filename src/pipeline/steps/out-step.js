class OutStep {
  constructor(pipe, graph) {
    this.pipe = pipe;
    this.graph = graph;
  }

  *process() {
    for (const node of this.pipe.process()) {
      yield* this.graph.outgoing(node.id);
    }
  }

  toString() {
    return "[OutStep]";
  }
}

export default OutStep;
