# assembly-demo

Twenty very different minds refine an idea over rounds, vote on it, and run it through a fixed set of gates. Out comes a better version, what changed, and the dissent on record.

**This is a scripted demo.** It represents the governance process I use in Palladium, my own agent framework. It is not a sample or excerpt of that system, and no Palladium code or data is in it.

- Live page: https://demos.obviouslogic.ai/assembly-demo/
- Source: https://github.com/obviouslogic-ai/assembly-demo

## How it fits Palladium governance

In Palladium, a contested idea goes to an assembly before it costs anything. Seats take blind positions, cross-examine each other and vote proceed, revise or kill. A surviving idea then passes six generic refinement gates (business value, feasibility, risk and safety, cost, human impact, clarity), each marked pass, revise or fail. The result is a readiness level, the refined idea, a list of what changed and the dissent.

This repo replays two hand-written samples. The 20 seats are fictional personas *inspired by* public-domain historical figures. Their lines were written for this demo and are not quotes. Nothing calls a model.

## Why I built this

> DRAFT, pending Dan's confirmation.
>
> An idea gets stress-tested by many perspectives and checked against set gates before it costs anything.

## Run the CLI

```sh
node -e 'import("./assembly.js").then(m=>console.log(m.IDEAS, m.GATES))'
```

No installs.

## Run the page locally

```sh
python3 -m http.server 8000   # from the folder that holds this repo
# open http://localhost:8000/assembly-demo/web/
```

The page fits one screen. Pick a sample idea and press **Submit idea to the Assembly**. Seats light up as they speak, the idea card evolves, the gates light pass or revise, and a final card shows the outcome. Press **Replay** to run it again. The explanation sits behind **About this demo** in the corner. Add `?fast=1` to skip the pauses.

The page imports this repo's own JS module, so what you see is the same code the tests cover. Styling comes from `web/kit/`, shared across all five demos.

## Files

- `personas.json`: the 20 seats, with name, inspired_by, field and lens.
- `ideas/*.json`: the two samples, each labeled `sample: true`.
- `assembly.js`: loads ideas, builds the replay timeline and validates each sample.

## Tests

```sh
node --test
```

Checks every sample is labeled, seats and stances are valid, the vote covers all 20 seats, gates are in order with valid statuses, and the final card has changes and dissent.

## License

MIT
