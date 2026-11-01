import assert from "node:assert/strict";
import test from "node:test";
import { nextSearchMatch } from "./searchNavigation.js";

const nodes = [
  { id: "host", type: "host", data: { dimmed: false } },
  { id: "stack", type: "stack", data: { dimmed: false } },
  { id: "hidden", type: "container", data: { dimmed: true } },
  { id: "first", type: "container", data: { dimmed: false } },
  { id: "second", type: "container", data: { dimmed: false } },
];

test("Enter starts on the first matching container, cycles, and wraps", () => {
  assert.equal(nextSearchMatch(nodes, null, "redis"), "first");
  assert.equal(nextSearchMatch(nodes, "first", "redis"), "second");
  assert.equal(nextSearchMatch(nodes, "second", "redis"), "first");
});

test("non-container nodes and dimmed containers are skipped", () => {
  assert.equal(nextSearchMatch(nodes, "host", "redis"), "first");
  assert.equal(nextSearchMatch(nodes, "hidden", "redis"), "first");
});

test("empty search, no matches, and unavailable results do not navigate", () => {
  assert.equal(nextSearchMatch(nodes, null, "  "), null);
  assert.equal(nextSearchMatch(nodes.filter((node) => node.data.dimmed || node.type !== "container"), null, "redis"), null);
  assert.equal(nextSearchMatch([], null, "redis"), null);
});

test("a previous match removed by a filter resets to the first result", () => {
  const remaining = nodes.filter((node) => node.id !== "second");
  assert.equal(nextSearchMatch(remaining, "second", "redis"), "first");
});
