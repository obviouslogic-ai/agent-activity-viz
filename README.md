# agent-activity-viz

**The problem:** when software agents do research work across a business, nobody can see where the time goes, which department leans on which data, or whether one agent is going in circles.

This is a small, dependency-free canvas view of that: simulated agents jump between data "clouds" (Invoices, Contracts, Tickets, ...) with trails, colored by department. You can follow one agent and toggle labels. All data is simulated; nothing is connected to a real system.

## Run
```
python3 -m http.server 8000   # then open http://localhost:8000
```
No build step, no network calls.

## Controls
- **Labels / Trails:** toggle on and off
- **Follow:** pick an agent (or click one) to zoom in and track it; others dim
- **Pause:** freeze the simulation

## Test
```
node --test
```
Covers determinism with a fixed seed, hopping between clouds, and capped trail length.

## Files
- `sim.js`: seeded simulation (pure functions, testable in Node)
- `index.html`: canvas renderer and controls
