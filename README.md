# agent-activity-viz

A live map of simulated agents moving between departments and the sources they read.

**This is a scripted demo.** It represents the governance process I use in Palladium, my own agent framework. It is not a sample or excerpt of that system, and no Palladium code or data is in it.

- Live page: https://demos.obviouslogic.ai/agent-activity-viz/
- Source: https://github.com/obviouslogic-ai/agent-activity-viz

## How it fits Palladium governance

Palladium records what every agent reads and does, and I watch that as a live map. This repo acts that view out with a seeded simulation. Every agent, topic and number is invented.

## Run the CLI

```sh
node -e 'import("./sim.js").then(m=>{const w=m.createWorld(1);m.step(w);console.log(w.agents.length,"agents")})'
```

Standard library only, no installs.

## Run the page locally

```sh
python3 -m http.server 8000   # from the folder that holds this repo
# open http://localhost:8000/agent-activity-viz/web/
```

The page fits one screen. Press **Start the agents**: 20 simulated seconds of agents reading from data sources, with live read counts and a feed, then a summary. Press **Replay** for a new run. The explanation sits behind **About this demo** in the corner. Add `?fast=1` to skip the pauses.

The page imports this repo's own JS module, so what you click is the same code the tests cover. Styling comes from `web/kit/`, shared across all five demos.

## Tests

```sh
node --test
```

## License

MIT
