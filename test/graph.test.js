import test from "ava";
import Graph from "../src/graph";
import Node from "../src/node";
import Edge from "../src/edge";

const node1 = () => new Node({ id: 1, label: "trunk", props: { num: "one" }});
const node2 = () => new Node({ id: 2, label: "twig", props: { num: "two" }});
const node3 = () => new Node({ id: 3, label: "twig", props: { num: "three" }});
const edge1to2 = () => new Edge({ id: 1, from: node1(), to: node2() });
const edge1to3 = () => new Edge({ id: 2, from: node1(), to: node3() });

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

test.skip("#hasNode by ref", t => {
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

test("#node(id)", t => {
  const graph = new Graph(g => {
    g.setEdge(edge1to2());
  });

  t.is(graph.node(1).id, 1);
  t.is(graph.node(2).id, 2);
});

test("#edge(id)", t => {
  const graph = new Graph(g => {
    g.setEdge(edge1to2());
  });

  t.is(graph.edge(1).id, 1);
  t.is(graph.edge(1).from.id, 1);
  t.is(graph.edge(1).to.id, 2);
});

test("#nodes", t => {
  const graph = new Graph(g => {
    g.setEdge(edge1to2());
    g.setEdge(edge1to3());
  });

  const nodes = graph.nodes();
  t.is(nodes.length, 3);
  t.is(nodes[0].id, 1);
  t.is(nodes[1].id, 2);
  t.is(nodes[2].id, 3);
});

test("#nodes(label)", t => {
  const graph = new Graph(g => {
    g.setEdge(edge1to2());
    g.addNode({id: 3, label: "checked"});
    g.addNode({id: 4, label: "checked"});
  });

  const nodes = graph.nodes("checked");
  t.is(nodes.length, 2);
  t.is(nodes[0].id, 3);
  t.is(nodes[1].id, 4);
});

test("#nodes(props: match)", t => {
  const graph = new Graph(g => {
    g.setEdge(edge1to2());
    g.addNode({id: 3, props: { tag: "numeral" }});
    g.addNode({id: 4, props: { tag: "numeral" }});
  });

  const nodes = graph.nodes({ tag: "numeral" });
  t.is(nodes.length, 2);
  t.is(nodes[0].props.tag, "numeral");
  t.is(nodes[1].props.tag, "numeral");
});

test("#edges", t => {
  const graph = new Graph(g => {
    g.setEdge(edge1to2());
    g.setEdge(edge1to3());
  });

  const edges = graph.edges();
  t.is(edges.length, 2);
  t.is(edges[0].id, 1);
  t.is(edges[1].id, 2);
});

test("#edges(label)", t => {
  const graph = new Graph(g => {
    g.addEdge({ id: 10, from: node1(), to: node2()});
    g.addEdge({ id: 20, label: "checked", from: node1(), to: node3()});
    g.addEdge({ id: 30, label: "checked", from: node2(), to: node3()});
  });

  const edges = graph.edges("checked");
  t.is(edges.length, 2);
  t.is(edges[0].id, 20);
  t.is(edges[1].id, 30);
});

test("#edges(props: match)", t => {
  const graph = new Graph(g => {
    g.addEdge({ id: 10, from: node1(), to: node2()});
    g.addEdge({ id: 20, props: { tag: "checked" }, from: node1(), to: node3()});
    g.addEdge({ id: 30, props: { tag: "checked" }, from: node2(), to: node3()});
  });

  const edges = graph.edges({tag: "checked"});
  t.is(edges.length, 2);
  t.is(edges[0].id, 20);
  t.is(edges[1].id, 30);
});

test("n(id)", t => {
  const graph = new Graph(g => {
    g.addEdge({ id: 10, props: { tag: "marked" }, from: node1(), to: node2()});
    g.addEdge({ id: 20, props: { tag: "checked" }, from: node1(), to: node3()});
    g.addEdge({ id: 30, props: { tag: "checked" }, from: node2(), to: node3()});
  });

  const result = graph.n(1).outE().prop("tag").all();
  t.deepEqual(result, ["marked", "checked"]);
});

test("n()", t => {
  const graph = new Graph(g => {
    g.addEdge({ id: 10, from: node1(), to: node2()});
    g.addEdge({ id: 20, from: node1(), to: node3()});
    g.addEdge({ id: 30, from: node2(), to: node3()});
  });

  const result = graph.n().out().id().all();
  t.deepEqual(result, [2,3,3]);
});

test("n(label)", t => {
  const graph = new Graph(g => {
    g.addEdge({ id: 10, from: node1(), to: node2()});
    g.addEdge({ id: 20, from: node1(), to: node3()});
    g.addEdge({ id: 30, from: node2(), to: node3()});
  });

  const result = graph.n("twig").id().all();
  t.deepEqual(result, [2,3]);
});

test("n(prop: match)", t => {
  const graph = new Graph(g => {
    g.addEdge({ id: 10, from: node1(), to: node2()});
    g.addEdge({ id: 20, from: node1(), to: node3()});
    g.addEdge({ id: 30, from: node2(), to: node3()});
  });

  const result = graph.n({num: "one"}).outE().id().all();
  t.deepEqual(result, [10, 20]);
});

test("e(id)", t => {
  const graph = new Graph(g => {
    g.addEdge({ id: 10, props: { tag: "marked" }, from: node1(), to: node2()});
    g.addEdge({ id: 20, props: { tag: "checked" }, from: node1(), to: node3()});
    g.addEdge({ id: 30, props: { tag: "checked" }, from: node2(), to: node3()});
  });

  const result = graph.e(10).props().one();
  t.deepEqual(result, { tag: "marked" });
});
