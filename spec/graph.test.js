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
