import Graph from "./graph";
import Node from "./node";
import Edge from "./edge";
import Queue from "./util/queue";
import PriorityQueue from "./util/priority-queue";

function createGraph(initializer) {
  return new Graph(initializer);
}

export {
  createGraph,
  Graph,
  Node,
  Edge,
  Queue,
  PriorityQueue
}
