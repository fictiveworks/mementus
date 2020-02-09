const DIR_OUT = true;
const DIR_IN = false;

class IncidenceList {
  constructor(isDirected=true) {
    this._outgoing = new Map();
    this._incoming = new Map();
    this.outgoingE = new Map();
    this.incomingE = new Map();
    this.nodes = new Map();
    this.edges = new Map();
    this.isDirected = isDirected;
  }

  hasNode(nodeId) {
    return this.nodes.has(nodeId);
  }

  setEdge(edge) {
    if (!this.hasNode(edge.from.id)) {
      this.setNode(edge.from);
    }

    if (!this.hasNode(edge.to.id)) {
      this.setNode(edge.to);
    }

    this.edges.set(edge.id, edge);
    this._outgoing.get(edge.from.id).push(edge.to.id);
    this._incoming.get(edge.to.id).push(edge.from.id);
    this.outgoingE.get(edge.from.id).push(edge.id);
    this.incomingE.get(edge.to.id).push(edge.id);
  }

  setNode(node) {
    this.nodes.set(node.id, node);
    this._outgoing.set(node.id, []);
    this._incoming.set(node.id, []);
    this.outgoingE.set(node.id, []);
    this.incomingE.set(node.id, []);
  }

  edge(id) {
    return this.edges.get(id);
  }

  node(id) {
    return this.nodes.get(id);
  }

  adjacent(id, direction=DIR_OUT) {
    let directionalIndex;
    if (direction == DIR_OUT) directionalIndex = this._outgoing;
    if (direction == DIR_IN) directionalIndex = this._incoming;

    return directionalIndex.get(id).map(adj => this.nodes.get(adj));
  }

  outgoing(id) {
    return this.adjacent(id, DIR_OUT);
  }

  incoming(id) {
    return this.adjacent(id, DIR_IN);
  }

  incidentEdges(id, direction=DIR_OUT) {
    let directionalIndex;
    if (direction == DIR_OUT) directionalIndex = this.outgoingE;
    if (direction == DIR_IN) directionalIndex = this.incomingE;

    return directionalIndex.get(id).map(adj => this.edges.get(adj));
  }

  outgoingEdges(id) {
    return this.incidentEdges(id, DIR_OUT);
  }

  incomingEdges(id) {
    return this.incidentEdges(id, DIR_IN);
  }
}

export default IncidenceList;
