class CollectionSource {
  constructor(collection) {
    this.collection = collection;
  }

  *process() {
    yield * this.collection;
  }

  toString() {
    return "[CollectionSource]";
  }
}

class Source {
  constructor(source) {
    if (Array.isArray(source)) {
      this.pipe = new CollectionSource(source);
    } else {
      throw new Error("Source must be an array (for now)");
    }
  }

  connect(step, ...args) {
    this.pipe = new step(this.pipe, ...args);
  }

  *process() {
    yield* this.pipe.process();
  }
}


export default Source;
