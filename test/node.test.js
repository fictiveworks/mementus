import test from "ava";
import Node from "../src/node";

test("initializes with id", t => {
  const node = new Node({ id: 22 });
  t.is(node.id, 22);
});

test("initializes with label", t => {
  const node = new Node({ label: "vertex" });
  t.is(node.label, "vertex");
});

test("initializes with id and label", t => {
  const node = new Node({ id: 22, label: "vertex" });
  t.is(node.id, 22);
  t.is(node.label, "vertex");
});

test("returns undefined when missing prop is accessed", t => {
  const node = new Node();
  t.is(node.title, undefined);
  t.is(node.props.title, undefined);
});

test("initializes with auto props", t => {
  const node = new Node({ props: { title: "Vertex" }});
  t.is(node.title, "Vertex");
});

test("initializes with props keys", t => {
  const node = new Node({ props: { title: "Vertex", count: 10 }});
  t.deepEqual(node.props, { title: "Vertex", count: 10 });
});

test("does not allow mutation of props", t => {
  const node = new Node({ props: { title: "Vertex" }});
  const writeError = t.throws(() => {
    node.title = "Node";
  });
  t.truthy(writeError instanceof TypeError);
  t.regex(writeError.message, /Cannot assign to read only property/);
});
