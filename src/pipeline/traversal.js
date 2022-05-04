import Source from "./source.js";
import MapStep from "./steps/map-step.js";
import FilterStep from "./steps/filter-step.js";
import WhereStep from "./steps/where-step.js";
import UnionStep from "./steps/union-step.js";
import IdStep from "./steps/id-step.js";
import LabelStep from "./steps/label-step.js";
import PropsStep from "./steps/props-step.js";
import PropStep from "./steps/prop-step.js";
import OutStep from "./steps/out-step.js";
import InStep from "./steps/in-step.js";
import OutEStep from "./steps/out-e-step.js";
import InEStep from "./steps/in-e-step.js";

class Traversal {
  constructor(input, graph) {
    this.input = input;
    this.graph = graph;
    this.reset();
  }

  reset() {
    this.chain = new Source(this.input);
  }

  id() {
    this.chain.connect(IdStep);
    return this;
  }

  label() {
    this.chain.connect(LabelStep);
    return this;
  }

  props() {
    this.chain.connect(PropsStep);
    return this;
  }

  prop(name) {
    this.chain.connect(PropStep, name);
    return this;
  }

  out(label=null) {
    this.chain.connect(OutStep, this.graph, label);
    return this;
  }

  inc(label=null) {
    this.chain.connect(InStep, this.graph, label);
    return this;
  }

  in(label=null) {
    this.chain.connect(InStep, this.graph, label);
    return this;
  }

  outE() {
    this.chain.connect(OutEStep, this.graph);
    return this;
  }

  inE() {
    this.chain.connect(InEStep, this.graph);
    return this;
  }

  map(transform) {
    this.chain.connect(MapStep, transform);
    return this;
  }

  where(predicate) {
    this.chain.connect(WhereStep, predicate, this.graph);
    return this;
  }

  filter(predicate) {
    this.chain.connect(FilterStep, predicate);
    return this;
  }

  union(base, other) {
    this.chain.connect(UnionStep, this.graph, base, other);
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
