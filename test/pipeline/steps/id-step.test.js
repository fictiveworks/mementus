import test from "ava";
import Source from "../../../src/pipeline/source";
import IdStep from "../../../src/pipeline/steps/id-step";

test("Deferences ids from input pipe", t => {
  const id = new IdStep(new Source([{id: 123}, {id: 987}]));

  t.deepEqual([...id.process()], [123, 987]);
});
