import test from "ava";
import Source from "../../../src/pipeline/source.js";
import Traversal from "../../../src/pipeline/traversal.js";
import WhereStep from "../../../src/pipeline/steps/where-step.js";
import { fanOutEdges } from "../graph-sample.js";

test("Where predicate filters using a traversal pipe", t => {
  const predicate = n => n.id().one() == 1;
  const source = new Source([fanOutEdges.node(1), fanOutEdges.node(2)]);
  const whereStep = new WhereStep(source, predicate, fanOutEdges, Traversal);

  const result = whereStep.process();

  t.is(result.next().value.id, 1);
  t.true(result.next().done);
});
