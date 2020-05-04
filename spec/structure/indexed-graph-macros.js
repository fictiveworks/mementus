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

function hasNodeIdentity(t, StructureImpl) {
  const structure = new StructureImpl();
  const node = new Node({ id: 1});

  t.false(structure.hasNode(1));

  structure.setNode(node);

  t.true(structure.hasNode(node));
}

hasNodeIdentity.title = () => "tests for the presence of a given node by identity";

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

export default [
  emptyNodeList,
  emptyEdgeList,
  setNode,
  setEdge,
  hasNodeIdentity,
  hasNodeId,
  hasEdgeIdentity,
  hasEdgeId,
  hasEdgeFromTo,
  findNodeById,
  findAllNodes
];
