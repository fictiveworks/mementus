import Node from "./node";

const Mutators = {
  setNode: function(node) {
    this.structure.setNode(node);
  },

  addNode: function(object={}) {
    if (!object.id) {
      object.id = this.nodeIds.nextId();
    }

    this.structure.setNode(new Node(object));
  },

  createNode: function(builder) {
    const object = { id: null, label: null, props: {} };

    builder(object);

    this.structure.setNode(new Node(object));
  }
}

export default Mutators;
