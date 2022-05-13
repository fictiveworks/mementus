import Node from "./node.js";
import Edge from "./edge.js";

const Mutators = {
  setNode(node) {
    this.structure.setNode(node);
  },

  setEdge(edge) {
    this.structure.setEdge(edge);
  },

  addNode(object={}) {
    if (!object.id) {
      object.id = this.nodeIds.nextId();
    }
    const node = new Node(object);
    this.structure.setNode(node);
    return node;
  },

  addEdge(object={}) {
    if (!object.id) {
      object.id = this.edgeIds.nextId();
    }

    if (!object.from) {
      object.from = this.addNode();
    }

    if (!object.to) {
      object.to = this.addNode();
    }

    const edge = new Edge(object);
    this.structure.setEdge(edge);
    return edge;
  },

  createNode(builder) {
    const object = { id: null, label: null, props: {} };

    builder(object);

    this.structure.setNode(new Node(object));
  },

  createEdge(builder) {
    const object = { id: null, label: null, props: {}, from: null, to: null };

    builder(object);

    this.structure.setEdge(new Edge(object));
  }
}

export default Mutators;
