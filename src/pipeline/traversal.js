import Source from "./source";
import IdStep from "./steps/id";
import FilterStep from "./steps/filter";

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

  filter(predicate) {
    this.chain.connect(FilterStep, predicate);
    return this;
  }

  one() {
    const generator = this.chain.process();
    this.reset();
    return generator.next().value;
  }

  all() {
    const result = [...this.chain.process()];
    this.reset();
    return result;
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
