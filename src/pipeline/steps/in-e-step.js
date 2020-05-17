class InEStep {
  constructor(pipe, graph) {
    this.pipe = pipe;
    this.graph = graph;
  }

  *process() {
    for (const node of this.pipe.process()) {
      yield* this.graph.incomingEdges(node.id);
    }
  }

  toString() {
    return "[InEStep]";
  }
}

export default InEStep;
