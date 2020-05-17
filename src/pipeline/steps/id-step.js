class IdStep {
  constructor(source) {
    this.pipe = source;
  }

  *process() {
    for (const item of this.pipe.process()) {
      yield item.id;
    }
  }

  toString() {
    return "[IdStep]";
  }
}

export default IdStep;
