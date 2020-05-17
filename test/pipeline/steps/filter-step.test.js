import test from "ava";
import Source from "../../../src/pipeline/source";
import FilterStep from "../../../src/pipeline/steps/filter-step";

test("Predicate filters passed in values", t => {
  const predicate = n => n % 2;
  const filter = new FilterStep(new Source([1,2,3,4,5]), predicate);

  t.deepEqual([...filter.process()], [1,3,5]);
});
