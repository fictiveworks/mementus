import Node from "./node.js";

class Edge {
  constructor({ from, to, id, label, props} = {}) {
    this.from = (from instanceof Node) ? from : new Node({ id: from });
    this.to = (to instanceof Node) ? to : new Node({ id: to });

    this.id = id;
    this.label = label;
    this.props = props || {};

    for (let key of Object.keys(this.props)) {
      Object.defineProperty(this, key, {
        enumerable: true,
        writable: false,
        value: props[key]
      });
    }

    Object.preventExtensions(this);
  }
}

export default Edge;
