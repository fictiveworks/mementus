import test from "ava";
import Graph from "../src/graph";
import Node from "../src/node";
import Edge from "../src/edge";

const node1 = () => new Node({ id: 1 });
const node2 = () => new Node({ id: 2 });
const node3 = () => new Node({ id: 3 });
const edge1to2 = () => new Edge({ from: node1(), to: node2() });
const edge1to3 = () => new Edge({ from: node1(), to: node3() });

test("#new", t => {
  const graph = new Graph();

  t.is(graph.nodesCount, 0);
  t.is(graph.edgesCount, 0);
});

test("#setNode", t => {
  const graph = new Graph(g => {
    g.setNode(node1());
  });

  t.is(graph.nodesCount, 1);
  t.is(graph.edgesCount, 0);
});

test("#addNode", t => {
  const graph = new Graph(g => {
    g.addNode({ id: 1 });
  });

  t.is(graph.nodesCount, 1);
  t.is(graph.edgesCount, 0);
  t.is(graph.node(1).id, 1);
});

test("#addNode with auto id", t => {
  const graph = new Graph(g => {
    g.addNode();
  });

  t.is(graph.node(1).id, 1);
});

test("#addNode with props", t => {
  const graph = new Graph(g => {
    g.addNode({ id: 1, props: { title: "Vertex" }});
  });

  t.is(graph.node(1).props.title, "Vertex");
});

test("#createNode", t => {
  const graph = new Graph(g => {
    g.createNode(n => {
      n.id = 20;
      n.label = "vertex";
      n.props.title = "Vertex";
    });
  });

  t.is(graph.nodesCount, 1);
  t.is(graph.edgesCount, 0);

  const node = graph.node(20);
  t.is(node.id, 20);
  t.is(node.label, "vertex");
  t.is(node.props.title, "Vertex");
});

test("#setEdge", t => {
  const graph = new Graph(g => {
    g.setEdge(edge1to2());
  });

  t.is(graph.nodesCount, 2);
  t.is(graph.edgesCount, 1);
  t.is(graph.node(1).id, 1);
  t.is(graph.node(2).id, 2);
});

test("#addEdge", t => {
  const graph = new Graph(g => {
    g.addEdge({ id: 3, from: node1(), to: node2() });
  });

  t.is(graph.nodesCount, 2);
  t.is(graph.edgesCount, 1);
  t.is(graph.node(1).id, 1);
  t.is(graph.node(2).id, 2);
  t.is(graph.edge(3).id, 3);
});

test("#addEdge with auto id", t => {
  const graph = new Graph(g => {
    g.addEdge({ from: node1(), to: node2() });
  });

  t.is(graph.edge(1).id, 1);
});

test("#addEdge with props", t => {
  const graph = new Graph(g => {
    g.addEdge({ from: node1(), to: node2(), props: {
      title: "Relationship"
    }});
  });

  t.is(graph.edge(1).props.title, "Relationship");
});

test("#createEdge", t => {
  const graph = new Graph(g => {
    g.createEdge(e => {
      e.id = 123;
      e.label = "relationship";
      e.from = node1();
      e.to = node2();
      e.props = {
        title: "Relationship"
      }
    });
  });

  t.is(graph.nodesCount, 2);
  t.is(graph.edgesCount, 1);

  const edge = graph.edge(123);
  t.is(edge.id, 123);
  t.is(edge.label, "relationship");
  t.is(edge.from.id, 1);
  t.is(edge.to.id, 2);
  t.is(edge.props.title, "Relationship");
});

test("#hasNode by ref", t => {
  const node = node1();
  const graph = new Graph(g => {
    g.setNode(node);
  });

  t.is(graph.hasNode(node), true);
  t.is(graph.hasNode(node1()), false);
});

test("#hasNode by id", t => {
  const graph = new Graph(g => {
    g.setNode(node1());
  });

  t.is(graph.hasNode(node1().id), true);
  t.is(graph.hasNode(44), false);
});

test("#hasEdge by ref", t => {
  const edge = edge1to2();
  const graph = new Graph(g => {
    g.setEdge(edge);
  });

  t.is(graph.hasEdge(edge), true);
  t.is(graph.hasEdge(edge1to2()), false);
});

test("#hasEdge by id", t => {
  const graph = new Graph(g => {
    g.setEdge(edge1to2());
  });

  t.is(graph.hasEdge(edge1to2().id), true);
  t.is(graph.hasEdge(44), false);
});
