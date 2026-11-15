// Pixel-compares every route against the live reference site.
// Run with: npx playwright test tests/visual.spec.js
import { test, expect } from "@playwright/test";
import fs from "node:fs";
import { PNG } from "pngjs";
import pixelmatch from "pixelmatch";

const LIVE = process.env.BEEP_REFERENCE_URL ?? "https://swift-olive-island-shale.grok.me";
const OUT = "test-results/visual";
const MAX_DIFF_RATIO = Number(process.env.BEEP_MAX_DIFF ?? 0.01);

const routes = [
  "/",
  "/devices",
  "/devices?section=home",
  "/signal",
  "/hq",
  "/ceo",
  "/compare",
  "/desk",
  "/cart",
  "/mine",
  "/orders",
  ...["glass", "slate", "deck", "ping", "canvas", "hub", "view", "arc", "pod", "fin"].map((id) => `/device/${id}`),
];

async function capture(page, url) {
  await page.goto(url, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  // Hide host-injected overlays on the reference site and pause any animation.
  await page.addStyleTag({
    content: `*,*::before,*::after{animation:none!important;transition:none!important;caret-color:transparent!important}
      body > :not(.min-h-screen):not(#root){display:none!important}`,
  });
  await page.evaluate(async () => {
    await Promise.all([...document.images].map((img) => (img.complete ? null : new Promise((r) => (img.onload = img.onerror = r)))));
    window.scrollTo(0, 0);
  });
  return PNG.sync.read(await page.screenshot({ fullPage: true }));
}

function diff(a, b) {
  const width = Math.max(a.width, b.width);
  const height = Math.max(a.height, b.height);
  const pad = (img) => {
    if (img.width === width && img.height === height) return img;
    const out = new PNG({ width, height });
    PNG.bitblt(img, out, 0, 0, img.width, img.height, 0, 0);
    return out;
  };
  const pa = pad(a);
  const pb = pad(b);
  const out = new PNG({ width, height });
  const pixels = pixelmatch(pa.data, pb.data, out.data, width, height, { threshold: 0.1 });
  return { pixels, ratio: pixels / (width * height), out, sizeMatch: a.width === b.width && a.height === b.height };
}

async function compare(name, live, local) {
  const result = diff(live, local);
  fs.mkdirSync(OUT, { recursive: true });
  fs.writeFileSync(`${OUT}/${name}.diff.png`, PNG.sync.write(result.out));
  console.log(`${name}: ${(result.ratio * 100).toFixed(3)}% differ`);
  expect(result.sizeMatch, `page size for ${name}`).toBe(true);
  expect(result.ratio, `pixel diff ratio for ${name}`).toBeLessThan(MAX_DIFF_RATIO);
}

test.describe("matches the reference interface with state", () => {
  const flows = {
    "cart-with-item": async (page, base) => {
      await page.goto(base + "/device/deck", { waitUntil: "networkidle" });
      await page.getByRole("button", { name: "Add to cart" }).click();
      await page.waitForURL(/\/cart$/);
    },
    "checkout-overview": async (page, base) => {
      await flows["cart-with-item"](page, base);
      await page.getByRole("button", { name: "Checkout" }).click();
      await page.getByRole("button", { name: "Overview" }).click();
    },
  };
  for (const [name, run] of Object.entries(flows)) {
    test(name, async ({ browser }) => {
      const shots = [];
      for (const base of [LIVE, ""]) {
        const ctx = await browser.newContext({ baseURL: "http://localhost:5173", viewport: { width: 412, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
        const page = await ctx.newPage();
        await run(page, base);
        shots.push(await capture(page, page.url()));
        await ctx.close();
      }
      await compare(name, ...shots);
    });
  }
});

test.describe("matches the reference interface on desktop", () => {
  for (const route of ["/", "/device/glass", "/ceo", "/signal"]) {
    test(route, async ({ browser }) => {
      const ctx = await browser.newContext({ baseURL: "http://localhost:5173", viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
      const live = await capture(await ctx.newPage(), LIVE + route);
      const local = await capture(await ctx.newPage(), route);
      await ctx.close();
      await compare(`desktop${route.replace(/\//g, "_")}`, live, local);
    });
  }
});

test.describe("matches the reference interface", () => {
  for (const route of routes) {
    test(route, async ({ browser }) => {
      const ctx = await browser.newContext({ viewport: { width: 412, height: 900 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
      const livePage = await ctx.newPage();
      const localPage = await ctx.newPage();
      const live = await capture(livePage, LIVE + route);
      const local = await capture(localPage, route);
      await ctx.close();

      const result = diff(live, local);
      const name = route.replace(/[^a-z0-9]+/gi, "_") || "home";
      fs.mkdirSync(OUT, { recursive: true });
      fs.writeFileSync(`${OUT}/${name}.live.png`, PNG.sync.write(live));
      fs.writeFileSync(`${OUT}/${name}.local.png`, PNG.sync.write(local));
      fs.writeFileSync(`${OUT}/${name}.diff.png`, PNG.sync.write(result.out));
      console.log(`${route}: ${(result.ratio * 100).toFixed(3)}% differ, live ${live.width}x${live.height}, local ${local.width}x${local.height}`);
      expect(result.sizeMatch, `page size for ${route}`).toBe(true);
      expect(result.ratio, `pixel diff ratio for ${route}`).toBeLessThan(MAX_DIFF_RATIO);
    });
  }
});
