import test from "ava";
import Traversal from "../../../src/pipeline/traversal";

test("map", t => {
  const traversal = new Traversal([1,2,3,4]);

  t.deepEqual(traversal.map(i => i * 2).all(), [2,4,6,8]);
});

test("filter", t => {
  const traversal = new Traversal([1,2,3,4]);

  t.deepEqual(traversal.filter(i => i % 2).all(), [1,3]);
});

test("id", t => {
  const traversal = new Traversal([{id: 1}, {id: 2}, {id: 3}, {id: 4}]);

  t.deepEqual(traversal.id().all(), [1,2,3,4]);
});
