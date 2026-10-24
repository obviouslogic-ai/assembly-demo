import test from "node:test"; import assert from "node:assert/strict"; import { readFile } from "node:fs/promises";
import { loadAll, timeline, validate, GATES } from "./assembly.js";
const fsFetch = async p => ({ json: async () => JSON.parse(await readFile(new URL(p, import.meta.url))) });
const { personas, ideas } = await loadAll(fsFetch);
test("20 distinct personas, each labeled inspired-by, across six fields", () => {
  assert.equal(personas.length, 20); assert.equal(new Set(personas.map(p => p.id)).size, 20);
  assert.ok(personas.every(p => p.inspired_by && p.lens));
  assert.deepEqual([...new Set(personas.map(p => p.field))].sort(), ["arts", "business", "design", "ethics", "operations", "science"]);
});
test("both sample ideas validate", () => { for (const i of ideas) assert.deepEqual(validate(i, personas), []); });
test("timeline: card evolves each round, six gates, ends on final", () => {
  for (const i of ideas) {
    const t = timeline(i), cards = t.filter(e => e.kind === "card");
    assert.equal(cards.length, i.rounds.length + 1); assert.notEqual(cards[0].text, cards.at(-1).text);
    assert.deepEqual(t.filter(e => e.kind === "gate").map(e => e.gate), GATES); assert.equal(t.at(-1).kind, "final");
  }
});
test("validate catches unlabeled samples, unknown seats and missing gates", () => {
  const bad = structuredClone(ideas[0]); bad.sample = false; bad.rounds[0].notes[0][0] = "nobody"; bad.gates.pop();
  const e = validate(bad, personas).join(" ");
  assert.match(e, /sample/); assert.match(e, /unknown seat/); assert.match(e, /six standard gates/);
});
test("no quote marks attributed to real people in notes", () => {
  for (const i of ideas) for (const r of i.rounds) for (const n of r.notes) assert.ok(!/[“”"]/.test(n[2]));
});
