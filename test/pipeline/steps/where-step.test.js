import test from "ava";
import Source from "../../../src/pipeline/source";
import WhereStep from "../../../src/pipeline/steps/where-step";
import { fanOutEdges } from "../graph-sample";

test("Where predicate filters using a traversal pipe", t => {
  const predicate = n => n.id().one() == 1;
  const source = new Source([fanOutEdges.node(1), fanOutEdges.node(2)]);
  const whereStep = new WhereStep(source, predicate);

  const result = whereStep.process();

  t.is(result.next().value.id, 1);
  t.true(result.next().done);
});
