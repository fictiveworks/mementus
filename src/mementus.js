import Graph from "./graph.js";
import Node from "./node.js";
import Edge from "./edge.js";
import Queue from "./util/queue.js";
import PriorityQueue from "./util/priority-queue.js";

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
