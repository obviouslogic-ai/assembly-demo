# council-demo

A replayed debate where differing viewpoints critique a big decision over rounds before it is made, with dissent kept on record.

**This is a scripted demo.** It represents the governance process I use in Palladium, my own agent framework. It is not a sample or excerpt of that system, and no Palladium code or data is in it.

- Live page: https://demos.obviouslogic.ai/council-demo/
- Source: https://github.com/obviouslogic-ai/council-demo

## How it fits Palladium governance

In Palladium, a high-stakes recommendation goes to a council of differing viewpoints before I act on it. This repo replays hand-written sample debates. Seats are fictional personas inspired by historical thinkers; their lines are written for the demo, not quotes. Nothing calls a paid model.

## Run the CLI

```sh
node -e 'import("./player.js").then(m=>console.log(m.DEBATES))'
```

Standard library only, no installs.

## Run the page locally

```sh
python3 -m http.server 8000   # from the folder that holds this repo
# open http://localhost:8000/council-demo/web/
```

Pick a sample idea and press **Play debate**. Add `?fast=1` to the URL to skip the pauses.

The page imports this repo's own JS module, so what you click is the same code the tests cover. Styling comes from `web/kit/`, shared across all five demos.

## Tests

```sh
node --test
```

## License

MIT
