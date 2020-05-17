class ConnectedNode {
  constructor(node, graph) {
    this.id = node.id;
    this.label = node.label;
    this.props = node.props;
    this.graph = graph;

    for (let key of Object.keys(node.props)) {
      Object.defineProperty(this, key, {
        enumerable: true,
        writable: false,
        value: node.props[key]
      });
    }

    Object.preventExtensions(this);
  }
}

export default ConnectedNode;
