import GraphBuilder from "./graph-builder";

class Graph {
  constructor(initializer) {
    const builder = new GraphBuilder();

    if (initializer) {
      initializer(builder);
    }

    this.structure = builder.graph();
    this.index = new Map();
  }

  addEdge(edge) {
    this.addNode(edge.from);
    this.addNode(edge.to);
    this.index.get(edge.from).add(edge.to);
  }

  get nodesCount() {
    return this.structure.nodesCount;
  }

  get edgesCount() {
    return this.structure.edgesCount;
  }

  adjacentNodes(id) {
    const _graph = this;
    return [...this.index.get(id)].map(function(id) {
      return new Node(id, _graph);
    });
  }

  node(id) {
    return this.structure.node(id);
  }

  nodes() {
    const _graph = this;
    return [...this.index].map(function(entry) {
      return new Node(entry[0], _graph);
    });
  }

  edges() {
    const _graph = this;
    let edges = [];
    this.index.forEach(function(from) {
      from.forEach(function(to) {
        edges.push(new Edge(from, to, _graph));
      });
    });
    return edges;
  }
}

export default Graph;
