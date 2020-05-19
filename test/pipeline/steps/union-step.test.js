import test from "ava";
import Source from "../../../src/pipeline/source";
import UnionStep from "../../../src/pipeline/steps/union-step";
import { fanOutEdges } from "../graph-sample";

test("Union of two identical traversals", t => {
  const source = new Source([fanOutEdges.node(5), fanOutEdges.node(6)])
  const unionStep = new UnionStep(
    source,
    fanOutEdges,
    p => p.inc().id().all(),
    p => p.inc().id().all()
  );

  const result = unionStep.process();

  t.is(result.next().value, 2);
  t.is(result.next().value, 3);
  t.true(result.next().done);
});
