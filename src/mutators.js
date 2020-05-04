import Node from "./node";
import Edge from "./edge";

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

    this.structure.setNode(new Node(object));
  },

  addEdge(object) {
    if (!object.id) {
      object.id = this.edgeIds.nextId();
    }

    this.structure.setEdge(new Edge(object));
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
