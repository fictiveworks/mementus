import test from "ava";
import Source from "../../../src/pipeline/source.js";
import MapStep from "../../../src/pipeline/steps/map-step.js";

test("Transforms objects from input pipe", t => {
  const transform = n => n.id;
  const id = new MapStep(new Source([{id: 123}, {id: 987}]), transform);

  t.deepEqual([...id.process()], [123, 987]);
});
