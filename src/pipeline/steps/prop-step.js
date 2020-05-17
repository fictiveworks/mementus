class PropStep {
  constructor(source, match) {
    this.pipe = source;
    this.match = match;
  }

  *process() {
    for (const node of this.pipe.process()) {
      if (node.props.hasOwnProperty(this.match)) {
        yield node.props[this.match];
      }
    }
  }

  toString() {
    return "[PropStep]";
  }
}

export default PropStep;
