import test from "ava";
import Source from "../../src/pipeline/source";

class DoubleStep {
  constructor(pipe, marker) {
    this.pipe = pipe;
    this.marker = marker;
  }

  *process() {
    yield (this.pipe * 2);
  }
}

test("Connects a linked list of pipes", t => {
  const source = new Source([1,2,3,4]);
  source.connect(DoubleStep, "%");
  source.connect(DoubleStep, "¶");
  source.connect(DoubleStep, "¥");

  t.is(source.pipe.marker, "¥");
  t.is(source.pipe.pipe.marker, "¶");
  t.is(source.pipe.pipe.pipe.marker, "%");
});

test("Provides values from the process iterator", t => {
  const source = new Source([1,2,3,4]);
  const process = source.process();

  t.is(process.next().value, 1);
  t.is(process.next().value, 2);
  t.is(process.next().value, 3);
  t.is(process.next().value, 4);
});

test("Returns done when no more values can be provided", t => {
  const source = new Source([]);

  t.is(source.process().next().done, true);
});

test("creates an isolated iteration context with each process", t => {
  const source = new Source(["a"]);

  const seq1 = source.process();
  const seq2 = source.process();
  t.is(seq1.next().value, "a");
  t.is(seq2.next().value, "a");
});
