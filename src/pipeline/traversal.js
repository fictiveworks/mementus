import Source from "./source";
import MapStep from "./steps/map";
import FilterStep from "./steps/filter";
import IdStep from "./steps/id";

class Traversal {
  constructor(input) {
    this.input = input;
    this.reset();
  }

  reset() {
    this.chain = new Source(this.input);
  }

  id() {
    this.chain.connect(IdStep);
    return this;
  }

  map(transform) {
    this.chain.connect(MapStep, transform);
    return this;
  }

  filter(predicate) {
    this.chain.connect(FilterStep, predicate);
    return this;
  }

  one() {
    const producer = this.chain.process();
    this.reset();
    return producer.next().value;
  }

  all() {
    const result = [...this.chain.process()];
    this.reset();
    return result;
  }

  take(num) {
    const producer = this.chain.process();
    this.reset();

    const result = [];

    for (let n=0; n<num; n++) {
      const current = producer.next();
      if (current.done) break;
      result.push(current.value);
    }

    return result;
  }

  run() {
    return this.chain.process();
  }

  toString() {
    let out = [];
    let pipe = this.chain.pipe;
    while (pipe != null) {
      out.unshift(pipe);
      pipe = pipe.pipe;
    }
    return out.join("->");
  }
}

export default Traversal;
