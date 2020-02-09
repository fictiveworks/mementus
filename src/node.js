class Node {
  constructor({ id, label, props } = {}) {
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

export default Node;
