class InStep {
  constructor(pipe, graph, label=null) {
    this.pipe = pipe;
    this.graph = graph;
    this.label = label;
  }

  *process() {
    for (const node of this.pipe.process()) {
      yield* this.graph.incoming(node.id, this.label);
    }
  }

  toString() {
    return "[InStep]";
  }
}

export default InStep;
