import GraphBuilder from "./graph-builder.js";
import Traversal from "./pipeline/traversal.js";
import Mutators from "./mutators.js";
import IntegerId from "./integer-id.js";

const defaultOptions = {
  isMutable: false,
  isDirected: true
}

class Graph {
  constructor(initializer, options={}) {
    const initialOptions = Object.assign(defaultOptions, options);

    const builder = new GraphBuilder();

    if (initializer) {
      initializer(builder);
    }

    this.structure = builder.graph();
    this.index = new Map();
    
    if (initialOptions.isMutable) {
      Object.assign(Graph.prototype, Mutators);
      this.nodeIds = new IntegerId(builder.nextNodeId());
      this.edgeIds = new IntegerId(builder.nextEdgeId());
    }
  }

  get nodesCount() {
    return this.structure.nodesCount;
  }

  get edgesCount() {
    return this.structure.edgesCount;
  }

  node(id) {
    return this.structure.node(id);
  }

  nodes(match=null) {
    return this.structure.nodes(match);
  }

  edge(id) {
    return this.structure.edge(id);
  }

  edges(match=null) {
    return this.structure.edges(match);
  }

  hasNode(node) {
    return this.structure.hasNode(node);
  }

  hasEdge(edge) {
    return this.structure.hasEdge(edge);
  }

  outgoing(id, label) {
    return this.structure.outgoing(id, label);
  }

  incoming(id, label) {
    return this.structure.incoming(id, label);
  }

  outgoingEdges(id) {
    return this.structure.outgoingEdges(id);
  }

  incomingEdges(id) {
    return this.structure.incomingEdges(id);
  }

  n(match=null) {
    const sequence = typeof match === "number" ?
      [this.structure.node(match)] : this.structure.nodes(match);

    return new Traversal(sequence, this);
  }

  e(match=null) {
    const sequence = typeof match === "number" ?
      [this.structure.edge(match)] : this.structure.edges(match);

    return new Traversal(sequence, this);
  }
}

export default Graph;
