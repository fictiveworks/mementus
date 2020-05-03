import test from "ava";
import IntegerId from "../src/integer-id";

test("counts upwards from 1 by default", t => {
  const generator = new IntegerId();

  t.is(generator.nextId(), 1);
  t.is(generator.nextId(), 2);
  t.is(generator.nextId(), 3);
});

test("counts upwards from given start value", t => {
  const generator = new IntegerId(100);

  t.is(generator.nextId(), 100);
  t.is(generator.nextId(), 101);
  t.is(generator.nextId(), 102);
});
