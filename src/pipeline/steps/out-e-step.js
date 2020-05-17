class OutEStep {
  constructor(pipe, graph) {
    this.pipe = pipe;
    this.graph = graph;
  }

  *process() {
    for (const node of this.pipe.process()) {
      yield* this.graph.outgoingEdges(node.id);
    }
  }

  toString() {
    return "[OutEStep]";
  }
}

export default OutEStep;
