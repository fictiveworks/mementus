import assert from 'assert';
import { Graph, createGraph } from './metis';

describe('Graph', function() {
  it("hides mutability in a context scope", function() {
    var graph = createGraph(function(g) {
      g.addNode(1);
      g.addNode(2);
      g.addNode(3);
    });

    assert.equal(graph.nodesCount(), 3);
  });

  it("starts empty", function() {
    var graph = new Graph();
    assert.equal(graph.nodesCount(), 0);
  });

  it("can add nodes", function() {
    var graph = new Graph();
    graph.addNode(1);
    graph.addNode(2);
    graph.addNode(3);

    assert.equal(graph.nodesCount(), 3);
  });

  it("can add edges", function() {
    var graph = new Graph();
    graph.addEdge({ from: 1, to: 2});
    graph.addEdge({ from: 2, to: 3});

    assert.equal(graph.nodesCount(), 3);
    assert.equal(graph.edgesCount(), 2);
  });

  it("enumerates over the node list", function() {
    var graph = new Graph();
    graph.addEdge({ from: 1, to: 2});
    graph.addEdge({ from: 2, to: 3});

    var nodes = graph.nodes();

    assert.equal(nodes[0].id, 1);
    assert.equal(nodes[1].id, 2);
    assert.equal(nodes[2].id, 3);
  });

  it("enumerates over the node list", function() {
    var graph = new Graph();
    graph.addEdge({ from: 1, to: 2});
    graph.addEdge({ from: 1, to: 3});
    graph.addEdge({ from: 1, to: 4});

    var adjacent = graph.adjacentNodes(1);

    assert.equal(adjacent[0].id, 2);
    assert.equal(adjacent[1].id, 3);
    assert.equal(adjacent[2].id, 4);
  });
});
