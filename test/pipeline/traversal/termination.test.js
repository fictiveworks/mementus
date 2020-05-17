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
