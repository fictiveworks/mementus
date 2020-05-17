class InStep {
  constructor(pipe, graph) {
    this.pipe = pipe;
    this.graph = graph;
  }

  *process() {
    for (const node of this.pipe.process()) {
      yield* this.graph.incoming(node.id);
    }
  }

  toString() {
    return "[InStep]";
  }
}

export default InStep;
