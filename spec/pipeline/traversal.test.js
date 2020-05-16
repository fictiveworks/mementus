import test from "ava";
import Traversal from "../../src/pipeline/traversal";

test("Connect collection source", t => {
  const traversal = new Traversal([]);

  t.is(traversal.toString(), "[CollectionSource]");
});

test("Connect single step", t => {
  const traversal = new Traversal([]);
  traversal.filter(i => i);

  t.is(traversal.toString(), "[CollectionSource]->[FilterStep]");
});

test("Connect multiple steps", t => {
  const traversal = new Traversal([]);
  traversal.filter(i => i).id();

  t.is(traversal.toString(), "[CollectionSource]->[FilterStep]->[IdStep]");
});

test("Terminate with all values", t => {
  const traversal = new Traversal([1,2,3,4]);

  t.deepEqual(traversal.all(), [1,2,3,4]);
});

test("Terminate with one value", t => {
  const traversal = new Traversal([1,2,3,4]);

  t.deepEqual(traversal.one(), 1);
});

test("API filter", t => {
  const traversal = new Traversal([1,2,3,4]);

  t.deepEqual(traversal.filter(i => i % 2).all(), [1,3]);
});

test("API id", t => {
  const traversal = new Traversal([{id: 1}, {id: 2}, {id: 3}, {id: 4}]);

  t.deepEqual(traversal.id().all(), [1,2,3,4]);
});
