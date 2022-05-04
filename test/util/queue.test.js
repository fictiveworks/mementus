import test from "ava";
import Queue from "../../src/util/queue.js";

test("queue starts empty", t => {
  const queue = new Queue();
  t.is(queue.isEmpty(), true);
});

test("first in, first out", t => {
  const queue = new Queue();
  queue.enqueue("first");
  queue.enqueue("second");
  queue.enqueue("third");

  t.is(queue.dequeue(), "first");
  t.is(queue.dequeue(), "second");
  t.is(queue.dequeue(), "third");
});
