// Simulated agent research activity. No real data: agents, departments and topics are invented.
export const DEPARTMENTS = { Operations: "#E4572E", Finance: "#2563EB", Sales: "#17BEBB", People: "#C33C8C", Engineering: "#76B041", Support: "#FFB400" };
export const TOPICS = ["Invoices", "Contracts", "Tickets", "Schedules", "Policies", "Pipeline", "Inventory", "Onboarding"];

export function rng(seed) { let s = seed >>> 0 || 1; return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296); }

export function createWorld({ seed = 7, agents = 18, width = 1000, height = 640 } = {}) {
  const r = rng(seed), depts = Object.keys(DEPARTMENTS);
  const clouds = TOPICS.map((name, i) => {
    const a = (i / TOPICS.length) * Math.PI * 2, cx = width / 2 + Math.cos(a) * width * 0.34, cy = height / 2 + Math.sin(a) * height * 0.34;
    return { name, x: cx, y: cy, points: Array.from({ length: 60 }, () => ({ x: cx + (r() - 0.5) * 90 * (0.4 + r()), y: cy + (r() - 0.5) * 70 * (0.4 + r()) })) };
  });
  const list = Array.from({ length: agents }, (_, i) => {
    const c = Math.floor(r() * clouds.length);
    return { id: `agent-${String(i + 1).padStart(2, "0")}`, dept: depts[i % depts.length], x: clouds[c].x, y: clouds[c].y, from: c, to: c, t: 1, dwell: r() * 2, trail: [], hops: 0 };
  });
  return { r, clouds, agents: list, time: 0, hops: 0 };
}

export function step(world, dt) {
  world.time += dt;
  for (const a of world.agents) {
    if (a.t >= 1) {
      a.dwell -= dt;
      if (a.dwell <= 0) { // jump to a new data cloud
        a.from = a.to; do { a.to = Math.floor(world.r() * world.clouds.length); } while (a.to === a.from);
        a.t = 0; a.hops++; world.hops++;
      }
    } else {
      a.t = Math.min(1, a.t + dt * 0.6);
      const f = world.clouds[a.from], g = world.clouds[a.to], e = a.t < 0.5 ? 2 * a.t * a.t : 1 - (-2 * a.t + 2) ** 2 / 2;
      const lift = Math.sin(Math.PI * a.t) * 60; // arc
      a.x = f.x + (g.x - f.x) * e; a.y = f.y + (g.y - f.y) * e - lift;
      if (a.t >= 1) a.dwell = 1 + world.r() * 3;
    }
    a.trail.push([a.x, a.y]); if (a.trail.length > 40) a.trail.shift();
  }
  return world;
}
