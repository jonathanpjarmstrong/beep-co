// Smoke-checks the GitHub Pages build served under /beep-co/.
import { chromium } from "@playwright/test";
const base = process.argv[2] ?? "http://localhost:4173/beep-co/";
const b = await chromium.launch(); const p = await b.newPage({ viewport: { width: 412, height: 900 } });
const bad = []; p.on("response", (r) => { if (r.status() >= 400 && !r.url().endsWith("/favicon.ico")) bad.push(`${r.status()} ${r.url()}`); });
for (const path of ["", "device/glass", "ceo", "hq", "devices?section=home"]) {
  await p.goto(base + path, { waitUntil: "networkidle" });
  const broken = await p.evaluate(() => [...document.images].filter((i) => !i.naturalWidth).map((i) => i.src));
  console.log(path || "/", "| h1:", await p.locator("h1").first().innerText().catch(() => "-"), "| broken images:", broken.length);
}
await p.goto(base + "signal", { waitUntil: "networkidle" });
await p.getByRole("button", { name: "Music" }).click();
await p.locator(".nova-reveal").first().waitFor({ timeout: 10000 });
console.log("nova reply:", (await p.locator(".nova-reveal").first().innerText()).slice(0, 60));
await p.getByRole("link", { name: "Home" }).click();
console.log("nav home url:", p.url());
console.log("failed requests:", bad.length ? bad : "none");
await b.close();
