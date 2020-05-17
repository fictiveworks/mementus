import test from "ava";
import Source from "../../../src/pipeline/source";
import PropsStep from "../../../src/pipeline/steps/props-step";

test("Deferences props from input pipe", t => {
  const props = new PropsStep(new Source([
    {id: 123, props: { color: "red" }},
    {id: 987, props: { color: "green"}},
    {id: 456, props: { color: "blue"}}
  ]));

  t.deepEqual([...props.process()], [{ color: "red" }, { color: "green"}, { color: "blue"}]);
});
