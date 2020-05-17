import test from "ava";
import Source from "../../../src/pipeline/source";
import OutEStep from "../../../src/pipeline/steps/out-e-step";
import { fanOutEdges } from "../graph-sample";

test("Enumerates outgoing edges as a flat map", t => {
  const source = new Source([fanOutEdges.node(1)], fanOutEdges);
  const outEStep = new OutEStep(source, fanOutEdges);

  const producer = outEStep.process();

  t.is(producer.next().value.id, 10);
  t.is(producer.next().value.id, 20);
  t.is(producer.next().value.id, 30);
});
