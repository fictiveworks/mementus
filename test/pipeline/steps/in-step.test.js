import test from "ava";
import Source from "../../../src/pipeline/source.js";
import InStep from "../../../src/pipeline/steps/in-step.js";
import { fanOutEdges } from "../graph-sample.js";

test("Enumerates incoming nodes as a flat map", t => {
  const source = new Source([fanOutEdges.node(4), fanOutEdges.node(5)])
  const inStep = new InStep(source, fanOutEdges);

  const producer = inStep.process();

  t.is(producer.next().value.id, 1);
  t.is(producer.next().value.id, 2);
  t.is(producer.next().value.id, 3);
});
