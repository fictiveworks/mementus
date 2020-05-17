import Graph from "../../src/graph";
import Node from "../../src/node";
import Edge from "../../src/edge";

const node1 = () => new Node({ id: 1 });
const node2 = () => new Node({ id: 2, props: { color: "red" }});
const node3 = () => new Node({ id: 3, props: { color: "green" } });
const node4 = () => new Node({ id: 4, props: { color: "blue" } });
const node5 = () => new Node({ id: 5 });
const node6 = () => new Node({ id: 6 });
const edge1to2 = () => new Edge({ id: 10, from: node1(), to: node2() });
const edge1to3 = () => new Edge({ id: 20, from: node1(), to: node3() });
const edge1to4 = () => new Edge({ id: 30, from: node1(), to: node4() });
const edge2to5 = () => new Edge({ id: 40, from: node2(), to: node5() });
const edge3to5 = () => new Edge({ id: 50, from: node3(), to: node5() });
const edge3to6 = () => new Edge({ id: 60, from: node3(), to: node6() });

const fanOutEdges = new Graph(g => {
  g.setEdge(edge1to2());
  g.setEdge(edge1to3());
  g.setEdge(edge1to4());
  g.setEdge(edge2to5());
  g.setEdge(edge3to5());
  g.setEdge(edge3to6());
});

export {
  fanOutEdges
}
