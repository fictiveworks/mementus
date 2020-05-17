class FilterStep {
  constructor(source, predicate) {
    this.pipe = source;
    this.predicate = predicate;
  }

  *process() {
    for (const item of this.pipe.process()) {
      if (this.predicate(item)) yield item;
    }
  }

  toString() {
    return "[FilterStep]";
  }
}

export default FilterStep;
