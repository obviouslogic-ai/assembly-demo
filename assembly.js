// Replay player for the Assembly demo. Scripted sample content only; nothing calls a model.
export const IDEAS = ["ideas/sample-refund-agent.json", "ideas/sample-four-day-week.json"];
export const GATES = ["Business value", "Feasibility", "Risk and safety", "Cost", "Human impact", "Clarity"];
const STANCES = ["support", "doubt", "refine"], STATUS = ["pass", "revise", "fail"];

export async function loadAll(f, base = "") {
  const get = async p => (await f(base + p)).json();
  return { personas: await get("personas.json"), ideas: await Promise.all(IDEAS.map(get)) };
}

// Flatten an idea into the ordered steps the page plays back.
export function timeline(idea) {
  const out = [{ kind: "card", version: 0, text: idea.idea }];
  idea.rounds.forEach((r, i) => {
    out.push({ kind: "round", n: i + 1, name: r.name });
    r.notes.forEach(([seat, stance, text]) => out.push({ kind: "note", round: i + 1, seat, stance, text }));
    out.push({ kind: "card", version: i + 1, text: r.card });
  });
  out.push({ kind: "vote", ...idea.vote });
  idea.gates.forEach((g, i) => out.push({ kind: "gate", n: i, ...g }));
  out.push({ kind: "final", text: idea.final, changed: idea.changed, dissent: idea.dissent, readiness: idea.readiness });
  return out;
}

export function validate(idea, personas) {
  const ids = new Set(personas.map(p => p.id)), err = [];
  if (idea.sample !== true || !/^Sample/.test(idea.title)) err.push("must be labeled as a sample");
  for (const r of idea.rounds) for (const [s, st] of r.notes) {
    if (!ids.has(s)) err.push(`unknown seat ${s}`);
    if (!STANCES.includes(st)) err.push(`bad stance ${st}`);
  }
  if (idea.gates.map(g => g.gate).join() !== GATES.join()) err.push("gates must be the six standard gates in order");
  for (const g of idea.gates) if (!STATUS.includes(g.status)) err.push(`bad gate status ${g.status}`);
  const v = idea.vote; if (v.proceed + v.revise + v.kill !== personas.length) err.push("vote must count every seat");
  if (!idea.final || !idea.changed?.length || !idea.dissent) err.push("final needs text, changes and dissent");
  return err;
}
