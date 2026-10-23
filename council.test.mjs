import test from "node:test"; import assert from "node:assert/strict"; import { readFile } from "node:fs/promises";
import { loadAll, timeline, validate } from "./player.js";
const f = async p => ({ json: async () => JSON.parse(await readFile(new URL(p, import.meta.url))) });
const [personas, debates] = await loadAll(f);
test("personas are labeled inspired-by", () => { for (const p of personas) assert.ok(p.inspired_by && p.lens); });
test("every sample debate is valid and labeled", () => { for (const d of debates) assert.deepEqual(validate(d, personas.map(p => p.id)), []); });
test("timeline ends with recommendation and dissent", () => { for (const d of debates) { const t = timeline(d), e = t.at(-1); assert.equal(e.type, "end"); assert.ok(e.dissent); } });
test("no quote marks attributing lines to real people", () => { for (const d of debates) for (const r of d.rounds) for (const t of r.turns) assert.ok(!/["\u201c]/.test(t.text)); });
