import test from "ava";
import Traversal from "../../../src/pipeline/traversal";

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
