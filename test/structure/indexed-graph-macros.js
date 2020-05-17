import Node from "../../src/node";
import Edge from "../../src/edge";

function emptyNodeList(t, StructureImpl) {
  const structure = new StructureImpl();

  t.is(structure.nodesCount, 0);
}

emptyNodeList.title = () => "starts with empty node list";

function emptyEdgeList(t, StructureImpl) {
  const structure = new StructureImpl();

  t.is(structure.edgesCount, 0);
}

emptyEdgeList.title = () => "starts with empty edge list";

function setNode(t, StructureImpl) {
  const structure = new StructureImpl();

  structure.setNode(new Node({ id: 1}));

  t.is(structure.nodesCount, 1);
  t.is(structure.edgesCount, 0);
}

setNode.title = () => "assigns a node to the graph";

function setEdge(t, StructureImpl) {
  const structure = new StructureImpl();

  structure.setEdge(new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  }));

  t.is(structure.nodesCount, 2);
  t.is(structure.edgesCount, 1);
}

setEdge.title = () => "assigns an edge to the graph";

// function hasNodeIdentity(t, StructureImpl) {
//   const structure = new StructureImpl();
//   const node = new Node({ id: 1});
//
//   t.false(structure.hasNode(1));
//
//   structure.setNode(node);
//
//   t.true(structure.hasNode(node));
// }
//
// hasNodeIdentity.title = () => "tests for the presence of a given node by identity";

function hasNodeId(t, StructureImpl) {
  const structure = new StructureImpl();

  t.false(structure.hasNode(1));

  structure.setNode(new Node({ id: 1}));

  t.true(structure.hasNode(1));
}

hasNodeId.title = () => "tests for the presence of a given node by id";


function hasEdgeIdentity(t, StructureImpl) {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  t.false(structure.hasEdge(edge));

  structure.setEdge(edge);

  t.true(structure.hasEdge(edge));
}

hasEdgeIdentity.title = () => "tests for the presence of an edge by identity";

function hasEdgeId(t, StructureImpl) {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 123,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  t.false(structure.hasEdge(123));

  structure.setEdge(edge);

  t.true(structure.hasEdge(123));
}

hasEdgeId.title = () => "tests for the presence of an edge by id";

function hasEdgeFromTo(t, StructureImpl) {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 123,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  t.false(structure.hasEdge(1, 2));

  structure.setEdge(edge);

  t.true(structure.hasEdge(1, 2));
}

hasEdgeFromTo.title = () => "tests for the presence of an edge between nodes";

function findNodeById(t, StructureImpl) {
  const structure = new StructureImpl();
  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  structure.setEdge(edge);

  t.is(structure.node(1).id, edge.from.id);
}

findNodeById.title = () => "finds a node by id";

function findEdgeById(t, StructureImpl) {
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
}

findEdgeById.title = () => "finds an edge by id";

function findAllNodes(t, StructureImpl) {
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
}

findAllNodes.title = () => "finds all nodes in the graph";

function findAllEdges(t, StructureImpl) {
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
}

findAllEdges.title = () => "finds all edges in the graph";

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
  findEdgeById,
  findAllNodes,
  findAllEdges
];
