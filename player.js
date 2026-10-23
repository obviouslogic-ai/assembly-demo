export const DEBATES = ["debates/sample-self-checkout.json", "debates/sample-four-day-week.json"];
export async function loadAll(f, base = "") {
  const get = async p => (await f(base + p)).json();
  return [await get("personas.json"), await Promise.all(DEBATES.map(get))];
}
// Flatten a debate into the events the player animates.
export function timeline(d) {
  const ev = [];
  for (const r of d.rounds) { ev.push({ type: "round", round: r.round, convergence: r.convergence }); for (const t of r.turns) ev.push({ type: "turn", ...t }); }
  ev.push({ type: "end", recommendation: d.recommendation, dissent: d.dissent, note: d.note });
  return ev;
}
export function validate(d, personaIds) {
  const errs = [];
  if (d.sample !== true || !/SAMPLE CONTENT/.test(d.note || "")) errs.push("not labeled as sample");
  if (!d.recommendation || !d.dissent) errs.push("missing recommendation or dissent");
  let last = -1;
  for (const r of d.rounds) { if (r.convergence < last) errs.push("convergence went down"); last = r.convergence;
    for (const t of r.turns) { if (!personaIds.includes(t.seat)) errs.push("unknown seat " + t.seat);
      if (!["for", "against", "refine", "dissent"].includes(t.stance)) errs.push("bad stance " + t.stance); } }
  return errs;
}
