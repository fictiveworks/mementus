import test from "ava";
import PriorityQueue from "../../src/util/priority-queue";

test("priority queue starts empty", t => {
  const pqueue = new PriorityQueue();
  t.is(pqueue.isEmpty(), true);
});


test("min priority queue", t => {
  const pqueue = new PriorityQueue();
  pqueue.enqueue("first", 3);
  pqueue.enqueue("second", 1);
  pqueue.enqueue("third", 2);

  t.is(pqueue.dequeue(), "second");
  t.is(pqueue.dequeue(), "third");
  t.is(pqueue.dequeue(), "first");
});
