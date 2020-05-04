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
}

export default Graph;
