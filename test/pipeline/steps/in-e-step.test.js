import test from "ava";
import Source from "../../../src/pipeline/source.js";
import InEStep from "../../../src/pipeline/steps/in-e-step.js";
import { fanOutEdges } from "../graph-sample.js";

test("Enumerates incoming edges as a flat map", t => {
  const source = new Source([fanOutEdges.node(5)], fanOutEdges);
  const inEStep = new InEStep(source, fanOutEdges);

  const producer = inEStep.process();

  t.is(producer.next().value.id, 40);
  t.is(producer.next().value.id, 50);
});
