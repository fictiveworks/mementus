import test from "ava";
import Traversal from "../../../src/pipeline/traversal";

test("Terminate with empty source", t => {
  const traversal = new Traversal([]);

  t.deepEqual(traversal.all(), []);
});

test("Terminate with all values", t => {
  const traversal = new Traversal([1,2,3,4]);

  t.deepEqual(traversal.all(), [1,2,3,4]);
});

test("Terminate with one value", t => {
  const traversal = new Traversal([1,2,3,4]);

  t.deepEqual(traversal.one(), 1);
});

test("Terminate by taking a given number of values", t => {
  const traversal = new Traversal([1,2,3,4,5,6,7,8]);

  t.deepEqual(traversal.take(4), [1,2,3,4]);
});
