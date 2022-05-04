import test from "ava";
import Source from "../../../src/pipeline/source.js";
import PropStep from "../../../src/pipeline/steps/prop-step.js";

test("Deferences props from input pipe", t => {
  const prop = new PropStep(new Source([
    {id: 123, props: { color: "red" }},
    {id: 987, props: { color: "green"}},
    {id: 456, props: { color: "blue"}}
  ]), "color");

  t.deepEqual([...prop.process()], ["red", "green", "blue"]);
});
