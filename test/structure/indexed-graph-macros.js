import test from "ava";
import Node from "../../src/node.js";
import Edge from "../../src/edge.js";

function macro(testTitle, exec) {
  return test.macro({
    exec,
    title(providedTitle = "", impl) {
      return testTitle;
    }
  });
}

const emptyNodeList = macro("starts with empty node list", (t, StructureImpl) => {
  const structure = new StructureImpl();

  t.is(structure.nodesCount, 0);
});

const emptyEdgeList = macro("starts with empty edge list", (t, StructureImpl) => {
  const structure = new StructureImpl();

  t.is(structure.edgesCount, 0);
});

const setNode = macro("assigns a node to the graph", (t, StructureImpl) => {
  const structure = new StructureImpl();

  structure.setNode(new Node({ id: 1}));

  t.is(structure.nodesCount, 1);
  t.is(structure.edgesCount, 0);
});

const setEdge = macro("assigns an edge to the graph", (t, StructureImpl) => {
  const structure = new StructureImpl();

  structure.setEdge(new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  }));

  t.is(structure.nodesCount, 2);
  t.is(structure.edgesCount, 1);
});

// const hasNodeIdentity = macro("tests for the presence of a given node by identity", (t, StructureImpl) => {
//   const structure = new StructureImpl();
//   const node = new Node({ id: 1});
//
//   t.false(structure.hasNode(1));
//
//   structure.setNode(node);
//
//   t.true(structure.hasNode(node));
// });

const hasNodeId = macro("tests for the presence of a given node by id", (t, StructureImpl) => {
  const structure = new StructureImpl();

  t.false(structure.hasNode(1));

  structure.setNode(new Node({ id: 1}));

  t.true(structure.hasNode(1));
});

const hasEdgeIdentity = macro("tests for the presence of an edge by identity", (t, StructureImpl) => {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  t.false(structure.hasEdge(edge));

  structure.setEdge(edge);

  t.true(structure.hasEdge(edge));
});

const hasEdgeId = macro("tests for the presence of an edge by id", (t, StructureImpl) => {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 123,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  t.false(structure.hasEdge(123));

  structure.setEdge(edge);

  t.true(structure.hasEdge(123));
});

const hasEdgeFromTo = macro("tests for the presence of an edge between nodes", (t, StructureImpl) =>{
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 123,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  t.false(structure.hasEdge(1, 2));

  structure.setEdge(edge);

  t.true(structure.hasEdge(1, 2));
});

const findNodeById = macro("finds a node by id", (t, StructureImpl) => {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  structure.setEdge(edge);

  t.is(structure.node(1).id, edge.from.id);
});

const findNodeByProp = macro("finds a node by prop value", (t, StructureImpl) => {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1, props: { color: "green" }}),
    to: new Node({ id: 2, props: { color: "yellow" }})
  });

  structure.setEdge(edge);

  const [firstNode, ...rest] = structure.nodes({color: "green"});
  t.is(firstNode.id, edge.from.id);
});

const findNodeByLabel = macro("finds a node by label", (t, StructureImpl) => {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1, label: "atom" }),
    to: new Node({ id: 2, label: "molecule" })
  });

  structure.setEdge(edge);

  const [firstNode, ...rest] = structure.nodes("atom");
  t.is(firstNode.id, edge.from.id);
});

const findEdgeById = macro("finds an edge by id", (t, StructureImpl) => {


  const structure = new StructureImpl();
  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  structure.setEdge(edge);

  t.is(structure.edge(3).id, 3);
  t.is(structure.edge(3).from.id, 1);
  t.is(structure.edge(3).to.id, 2);
});

const findEdgeByProp = macro("finds an edge by prop value", (t, StructureImpl) => {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2}),
    props: {
      bond: "covalent"
    }
  });

  const edge2 = new Edge({
    id: 6,
    from: new Node({ id: 4}),
    to: new Node({ id: 5}),
    props: {
      bond: "ionic"
    }
  });

  structure.setEdge(edge);
  structure.setEdge(edge2);

  const [firstEdge, ...rest] = structure.edges({ bond: "covalent"});

  t.is(firstEdge.id, 3);
  t.is(firstEdge.from.id, 1);
  t.is(firstEdge.to.id, 2);
});

const findEdgeByLabel = macro("finds an edge by label", (t, StructureImpl) => {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2}),
    label: "atom"
  });

  const edge2 = new Edge({
    id: 6,
    from: new Node({ id: 4}),
    to: new Node({ id: 5}),
    label: "molecule"
  });

  structure.setEdge(edge);
  structure.setEdge(edge2);

  const [firstEdge, ...rest] = structure.edges("molecule");

  t.is(firstEdge.id, 6);
  t.is(firstEdge.from.id, 4);
  t.is(firstEdge.to.id, 5);
});

const findAllNodes = macro("finds all nodes in the graph", (t, StructureImpl) => {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  structure.setEdge(edge);

  const [first, last] = structure.nodes();

  t.is(first.id, edge.from.id);
  t.is(last.id, edge.to.id);
});

const findAllEdges = macro("finds all edges in the graph", (t, StructureImpl) => {
  const structure = new StructureImpl();
  const edge1 = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });
  const edge2 = new Edge({
    id: 4,
    from: new Node({ id: 10}),
    to: new Node({ id: 20})
  });

  structure.setEdge(edge1);
  structure.setEdge(edge2);

  const [first, last] = structure.edges();

  t.is(first.id, 3);
  t.is(last.id, 4);
});

export default [
  emptyNodeList,
  emptyEdgeList,
  setNode,
  setEdge,
  //hasNodeIdentity,
  hasNodeId,
  hasEdgeIdentity,
  hasEdgeId,
  hasEdgeFromTo,
  findNodeById,
  findNodeByProp,
  findNodeByLabel,
  findEdgeById,
  findEdgeByProp,
  findEdgeByLabel,
  findAllNodes,
  findAllEdges
];
