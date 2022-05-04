import Node from "../node.js";
import Edge from "../edge.js";
import ConnectedNode from "../connected-node.js";

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
    if (node instanceof Node || node instanceof ConnectedNode) {
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
    this._nodes.set(node.id, new ConnectedNode(node, this));
    this._outgoing.set(node.id, []);
    this._incoming.set(node.id, []);
    this.outgoingE.set(node.id, []);
    this.incomingE.set(node.id, []);
  }

  node(id) {
    return this._nodes.get(id);
  }

  edge(id) {
    return this._edges.get(id);
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

  edges(match) {
    if (!match) return [...this._edges.values()];

    if (typeof(match) === "string") {
      return [...this._edges.values()].filter(edge => edge.label === match);

    } else if (typeof(match) === "object" && match !== null) {
      return [...this._edges.values()].filter(edge => {
        for (const prop of Object.keys(match)) {
          if (edge.props[prop] !== match[prop]) return false;
        }
        return true;
      });
    }
  }

  adjacent(id, direction=DIR_OUT, label=null) {
    let directionalIndex;
    if (direction == DIR_OUT) directionalIndex = this._outgoing;
    if (direction == DIR_IN) directionalIndex = this._incoming;

    if (!label) {
      return directionalIndex.get(id).map(adj => this._nodes.get(adj));
    }

    return this.incidentEdges(id, direction).reduce((result, edge) => {
      if (edge.label == label) {
        const node = direction == DIR_OUT ? edge.to : edge.from;
        result.push(this._nodes.get(node.id));
      }
      return result;
    }, []);
  }

  outgoing(id, label=null) {
    return this.adjacent(id, DIR_OUT, label);
  }

  incoming(id, label=null) {
    return this.adjacent(id, DIR_IN, label);
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

  removeNode(node) {
    const nodeId = node instanceof Node ? node.id : node;

    for (const edgeId of this.outgoingE.get(nodeId)) {
      const toId = this._edges.get(edgeId).to.id;

      const incomingNodeIndex = this._incoming.get(toId).indexOf(nodeId);
      this._incoming.get(toId).splice(incomingNodeIndex, 1);

      const incomingEdgeIndex = this.incomingE.get(toId).indexOf(edgeId);
      this.incomingE.get(toId).splice(incomingEdgeIndex, 1);

      this._edges.delete(edgeId);
    }

    for (const edgeId of this.incomingE.get(nodeId)) {
      const fromId = this._edges.get(edgeId).from.id;

      const outgoingNodeIndex = this._outgoing.get(fromId).indexOf(nodeId);
      this._outgoing.get(fromId).splice(outgoingNodeIndex, 1);

      const outgoingEdgeIndex = this.outgoingE.get(fromId).indexOf(edgeId);
      this.outgoingE.get(fromId).splice(outgoingEdgeIndex, 1);

      this._edges.delete(edgeId);
    }

    this._nodes.delete(nodeId);
  }

  removeEdge(edge) {
    const edgeId = edge instanceof Edge ? edge.id : edge;
    const { to, from } = this._edges.get(edgeId);

    const toIndex = this._outgoing.get(from.id).indexOf(to.id);
    this._outgoing.get(from.id).splice(toIndex, 1);

    const fromIndex = this._incoming.get(to.id).indexOf(from.id);
    this._incoming.get(to.id).splice(fromIndex, 1);

    const outgoingEdgeIndex = this.outgoingE.get(from.id).indexOf(edgeId);
    this.outgoingE.get(from.id).splice(outgoingEdgeIndex, 1);

    const incomingEdgeIndex = this.incomingE.get(to.id).indexOf(edgeId);
    this.incomingE.get(to.id).splice(incomingEdgeIndex, 1);

    this._edges.delete(edgeId);
  }
}

export default IncidenceList;
