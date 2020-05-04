import Node from "../node";
import Edge from "../edge";

const DIR_OUT = true;
const DIR_IN = false;

class IncidenceList {
  constructor(isDirected=true) {
    this._outgoing = new Map();
    this._incoming = new Map();
    this.outgoingE = new Map();
    this.incomingE = new Map();
    this._nodes = new Map();
    this._edges = new Map();
    this.isDirected = isDirected;
  }

  get nodesCount() {
    return this._nodes.size;
  }

  get edgesCount() {
    return this._edges.size;
  }

  hasNode(node) {
    if (node instanceof Node) {
      return this._nodes.get(node.id) === node;
    } else {
      return this._nodes.has(node);
    }
  }

  hasEdge(edge, target=null) {
    if (target) {
      if (!this.node(edge)) return false;
      return this.outgoing(edge).some(n => n.id == target);
    }

    if (edge instanceof Edge) {
      return this._edges.get(edge.id) === edge;
    } else {
      return this._edges.has(edge);
    }
  }

  setEdge(edge) {
    if (!this.hasNode(edge.from.id)) {
      this.setNode(edge.from);
    }

    if (!this.hasNode(edge.to.id)) {
      this.setNode(edge.to);
    }

    this._edges.set(edge.id, edge);
    this._outgoing.get(edge.from.id).push(edge.to.id);
    this._incoming.get(edge.to.id).push(edge.from.id);
    this.outgoingE.get(edge.from.id).push(edge.id);
    this.incomingE.get(edge.to.id).push(edge.id);
  }

  setNode(node) {
    this._nodes.set(node.id, node);
    this._outgoing.set(node.id, []);
    this._incoming.set(node.id, []);
    this.outgoingE.set(node.id, []);
    this.incomingE.set(node.id, []);
  }

  edge(id) {
    return this._edges.get(id);
  }

  node(id) {
    return this._nodes.get(id);
  }

  nodes(match) {
    if (!match) return [...this._nodes.values()];

    if (typeof(match) === "string") {
      return [...this._nodes.values()].filter(node => node.label === match);

    } else if (typeof(match) === "object" && match !== null) {
      return [...this._nodes.values()].filter(node => {
        for (const prop of Object.keys(match)) {
          if (node.props[prop] !== match[prop]) return false;
        }
        return true;
      });
    }
  }

  adjacent(id, direction=DIR_OUT) {
    let directionalIndex;
    if (direction == DIR_OUT) directionalIndex = this._outgoing;
    if (direction == DIR_IN) directionalIndex = this._incoming;

    return directionalIndex.get(id).map(adj => this._nodes.get(adj));
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

    return directionalIndex.get(id).map(adj => this._edges.get(adj));
  }

  outgoingEdges(id) {
    return this.incidentEdges(id, DIR_OUT);
  }

  incomingEdges(id) {
    return this.incidentEdges(id, DIR_IN);
  }
}

export default IncidenceList;
