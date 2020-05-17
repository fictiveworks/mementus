import test from "ava";
import Source from "../../../src/pipeline/source";
import LabelStep from "../../../src/pipeline/steps/label-step";

test("Deferences labels from input pipe", t => {
  const label = new LabelStep(new Source([
    {id: 123, label: "aaa" },
    {id: 987, label: "bbb" }
  ]));

  t.deepEqual([...label.process()], ["aaa", "bbb"]);
});
