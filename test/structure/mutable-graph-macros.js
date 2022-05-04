import Node from "../../src/node.js";
import Edge from "../../src/edge.js";

const node1 = () => new Node({ id: 1 });
const node2 = () => new Node({ id: 2 });
const node3 = () => new Node({ id: 3 });
const edge1to2 = () => new Edge({ id: 1, from: node1(), to: node2() });
const edge1to3 = () => new Edge({ id: 2, from: node1(), to: node3() });

function removeNodeByRef(t, StructureImpl) {
  const structure = new StructureImpl();
  const node = node1();
  structure.setEdge(new Edge({ id: 10, from: node, to: node2()}));
  structure.setEdge(new Edge({ id: 20, props: { tag: "checked" }, from: node, to: node3()}));
  structure.setEdge(new Edge({ id: 30, props: { tag: "checked" }, from: node2(), to: node3()}));

  t.is(structure.nodesCount, 3);
  t.is(structure.edgesCount, 3);

  structure.removeNode(node);

  t.is(structure.nodesCount, 2);
  t.is(structure.edgesCount, 1);
}

removeNodeByRef.title = () => "remove all references to a node"

function removeNodeById(t, StructureImpl) {
  const structure = new StructureImpl();
  structure.setEdge(new Edge({ id: 10, from: node1(), to: node2()}));
  structure.setEdge(new Edge({ id: 20, props: { tag: "checked" }, from: node1(), to: node3()}));
  structure.setEdge(new Edge({ id: 30, props: { tag: "checked" }, from: node2(), to: node3()}));

  structure.removeNode(1);

  t.is(structure.nodesCount, 2);
  t.is(structure.edgesCount, 1);
}

removeNodeById.title = () => "removes all references to a node id";

function removeEdgeByRef(t, StructureImpl) {
  const structure = new StructureImpl();
  const edge1 = new Edge({ id: 10, from: node1(), to: node2()});
  const edge2 = new Edge({ id: 20, from: node2(), to: node3()});
  structure.setEdge(edge1);
  structure.setEdge(edge2);

  structure.removeEdge(edge1);

  t.is(structure.nodesCount, 3);
  t.is(structure.edgesCount, 1);
}

removeEdgeByRef.title = () => "removes all references to an edge"

function removeEdgeById(t, StructureImpl) {
  const structure = new StructureImpl();
  const edge1 = new Edge({ id: 10, from: node1(), to: node2()});
  const edge2 = new Edge({ id: 20, from: node2(), to: node3()});
  structure.setEdge(edge1);
  structure.setEdge(edge2);

  structure.removeEdge(10);

  t.is(structure.nodesCount, 3);
  t.is(structure.edgesCount, 1);
}

removeEdgeById.title = () => "removes all references to an edge id"

export default [
  removeNodeByRef,
  removeNodeById,
  removeEdgeByRef,
  removeEdgeById
];
