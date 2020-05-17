import test from "ava";
import Traversal from "../../../src/pipeline/traversal";
import { fanOutEdges } from "../graph-sample";

test("map", t => {
  const traversal = new Traversal([1,2,3,4]);

  t.deepEqual(traversal.map(i => i * 2).all(), [2,4,6,8]);
});

test("filter", t => {
  const traversal = new Traversal([1,2,3,4]);

  t.deepEqual(traversal.filter(i => i % 2).all(), [1,3]);
});

test("out", t => {
  const traversal = new Traversal([fanOutEdges.node(1)], fanOutEdges);

  const result = traversal.out().all();
  t.is(result[0].id, 2);
  t.is(result[1].id, 3);
  t.is(result[2].id, 4);
});

test("inc", t => {
  const traversal = new Traversal([fanOutEdges.node(5)], fanOutEdges);

  const result = traversal.inc().all();
  t.is(result[0].id, 2);
  t.is(result[1].id, 3);
});

test("outE", t => {
  const traversal = new Traversal([fanOutEdges.node(1)], fanOutEdges);

  const result = traversal.outE().all();
  t.is(result[0].id, 10);
  t.is(result[1].id, 20);
  t.is(result[2].id, 30);
});

test("inE", t => {
  const traversal = new Traversal([fanOutEdges.node(5)], fanOutEdges);

  const result = traversal.inE().all();
  t.is(result[0].id, 40);
  t.is(result[1].id, 50);
});

test("id", t => {
  const traversal = new Traversal([{id: 1}, {id: 2}, {id: 3}, {id: 4}]);

  t.deepEqual(traversal.id().all(), [1,2,3,4]);
});

test("label", t => {
  const traversal = new Traversal([
    {id: 1, label: "aaa" },
    {id: 2, label: "aaa" },
    {id: 3, label: "bbb" },
    {id: 4, label: "ccc" }
  ]);

  t.deepEqual(traversal.label().all(), ["aaa", "aaa", "bbb", "ccc"]);
});

test("props", t => {
  const nodes = [fanOutEdges.node(2), fanOutEdges.node(3), fanOutEdges.node(4)];
  const traversal = new Traversal(nodes, fanOutEdges);

  const result = traversal.props().all();
  t.deepEqual(result, [{ color: "red"}, { color: "green"}, { color: "blue"}]);
});

test("prop", t => {
  const nodes = [fanOutEdges.node(2), fanOutEdges.node(3), fanOutEdges.node(4)];
  const traversal = new Traversal(nodes, fanOutEdges);

  const result = traversal.prop("color").all();
  t.deepEqual(result, ["red", "green", "blue"]);
});
