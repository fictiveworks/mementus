import test from "ava";
import Edge from "../src/edge.js";
import Node from "../src/node.js";

test("should initialize with integer ids", t => {
  const edge = new Edge({ from: 1, to: 2 });

  t.true(edge.from instanceof Node);
  t.is(edge.from.id, 1);

  t.true(edge.to instanceof Node);
  t.is(edge.to.id, 2);
});

test("should initialize with node instances", t => {
  const edge = new Edge({ from: new Node({id: 1}), to: new Node({id: 2})});

  t.true(edge.from instanceof Node);
  t.is(edge.from.id, 1);

  t.true(edge.to instanceof Node);
  t.is(edge.to.id, 2);
});

test("should initialize with label given", t => {
  const edge = new Edge({ from: 1, to: 2, label: "relationship" });
  t.is(edge.label, "relationship");
});

test("returns undefined when missing prop is accessed", t => {
  const edge = new Edge({ from: 1, to: 2 });
  t.is(edge.title, undefined);
  t.is(edge.props.title, undefined);
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
