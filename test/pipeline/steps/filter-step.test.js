import test from "ava";
import Source from "../../../src/pipeline/source.js";
import FilterStep from "../../../src/pipeline/steps/filter-step.js";

test("Predicate filters passed in values", t => {
  const predicate = n => n % 2;
  const filter = new FilterStep(new Source([1,2,3,4,5]), predicate);

  t.deepEqual([...filter.process()], [1,3,5]);
});
