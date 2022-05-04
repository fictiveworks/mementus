import Node from "../../src/node.js";
import Edge from "../../src/edge.js";

function outgoingNodes(t, StructureImpl) {
  const structure = new StructureImpl();

  const edge = new Edge({
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  structure.setEdge(edge);

  t.is(structure.outgoing(1)[0].id, 2);
}
outgoingNodes.title = () => "enumerates outgoing nodes";

function outgoingEdges(t, StructureImpl) {
  const structure = new StructureImpl();

  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  structure.setEdge(edge);

  t.is(structure.outgoingEdges(1)[0].id, 3);
}
outgoingEdges.title = () => "enumerates outgoing edges";

function incomingNodes(t, StructureImpl) {
  const structure = new StructureImpl();

  const edge = new Edge({
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  structure.setEdge(edge);

  t.is(structure.incoming(2)[0].id, 1);
}
incomingNodes.title = () => "enumerates incoming nodes";

function incomingEdges(t, StructureImpl) {
  const structure = new StructureImpl();

  const edge = new Edge({
    id: 3,
    from: new Node({ id: 1}),
    to: new Node({ id: 2})
  });

  structure.setEdge(edge);

  t.is(structure.incomingEdges(2)[0].id, 3);
}
incomingEdges.title = () => "enumerates incoming edges";

export default [
  outgoingNodes,
  outgoingEdges,
  incomingNodes,
  incomingEdges
]
