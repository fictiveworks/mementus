import test from "ava";
import Source from "../../../src/pipeline/source.js";
import OutStep from "../../../src/pipeline/steps/out-step.js";
import { fanOutEdges } from "../graph-sample.js";

test("Enumerates outgoing nodes as a flat map", t => {
  const source = new Source([fanOutEdges.node(1), fanOutEdges.node(3)])
  const outStep = new OutStep(source, fanOutEdges);

  const producer = outStep.process();

  t.is(producer.next().value.id, 2);
  t.is(producer.next().value.id, 3);
  t.is(producer.next().value.id, 4);
  t.is(producer.next().value.id, 5);
  t.is(producer.next().value.id, 6);
});
