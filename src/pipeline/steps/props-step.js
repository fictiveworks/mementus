class PropsStep {
  constructor(source) {
    this.pipe = source;
  }

  *process() {
    for (const node of this.pipe.process()) {
      yield node.props;
    }
  }

  toString() {
    return "[PropsStep]";
  }
}

export default PropsStep;
