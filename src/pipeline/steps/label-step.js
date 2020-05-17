class LabelStep {
  constructor(source) {
    this.pipe = source;
  }

  *process() {
    for (const element of this.pipe.process()) {
      yield element.label;
    }
  }

  toString() {
    return "[LabelStep]";
  }
}

export default LabelStep;
