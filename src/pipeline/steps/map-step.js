class MapStep {
  constructor(source, transform) {
    this.pipe = source;
    this.transform = transform;
  }

  *process() {
    for (const item of this.pipe.process()) {
      yield this.transform(item);
    }
  }

  toString() {
    return "[MapStep]";
  }
}

export default MapStep;
