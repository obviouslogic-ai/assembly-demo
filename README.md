# council-demo

**The problem:** a good idea gets approved because nobody in the room argued with it. This demo puts an idea in front of five different viewpoints, lets them push back over a few rounds, and ends with one refined recommendation plus the dissent kept on record.

This repo is **replay only**. The debates in `debates/` are **sample content, hand-written for the demo**. The personas in `personas.json` are fictional and only *inspired by* historical thinkers (Kant, Carnegie, Tesla, Munger, Lovelace). Their lines are not quotes and are not attributed to real people.

## Run
```
python3 -m http.server 8000   # open http://localhost:8000 (add ?fast=1 to speed up)
```
No build step, no network calls, no API keys.

## Test
```
node --test
```
Checks that personas are labeled, every debate is labeled as sample, seats and stances are valid, convergence never goes down, and each debate ends with a recommendation and a dissent.

## Add a debate
Copy a file in `debates/`, keep `"sample": true` and the note, and add the path to `DEBATES` in `player.js`.
