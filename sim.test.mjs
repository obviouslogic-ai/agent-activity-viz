import { createWorld, step, TOPICS } from "./sim.js"; import assert from "node:assert/strict"; import test from "node:test";
test("same seed gives same world", () => { const a = createWorld({ seed: 3 }), b = createWorld({ seed: 3 }); for (let i = 0; i < 300; i++) { step(a, 0.05); step(b, 0.05); } assert.deepEqual(a.agents.map(x => [x.x, x.y]), b.agents.map(x => [x.x, x.y])); });
test("agents hop between different clouds", () => { const w = createWorld(); for (let i = 0; i < 600; i++) step(w, 0.05); assert.ok(w.hops > 10); for (const a of w.agents) assert.ok(a.to >= 0 && a.to < TOPICS.length); });
test("trails are capped", () => { const w = createWorld(); for (let i = 0; i < 200; i++) step(w, 0.05); for (const a of w.agents) assert.ok(a.trail.length <= 40); });
