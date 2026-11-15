// End-to-end behaviour of the local app (no network calls to the reference site).
import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
  await page.evaluate(() => localStorage.clear());
});

test("bottom nav routes and highlights the active tab", async ({ page }) => {
  const nav = page.locator("nav");
  for (const [label, path] of [["Devices", "/devices"], ["AI", "/signal"], ["HQ", "/hq"], ["CEO", "/ceo"], ["Home", "/"]]) {
    await nav.getByRole("link", { name: label }).click();
    await expect(page).toHaveURL(new RegExp(`${path.replace("/", "\\/")}$`));
    await expect(nav.getByRole("link", { name: label })).toHaveClass(/text-gold/);
  }
});

test("home tiles open the right pages", async ({ page }) => {
  await page.getByRole("link", { name: "Orbit B3" }).click();
  await expect(page).toHaveURL(/\/device\/glass$/);
  await page.getByRole("link", { name: "Back" }).click();
  await page.getByRole("link", { name: "Beep Home" }).click();
  await expect(page).toHaveURL(/\/devices\?section=home$/);
});

test("configure, add to cart, check out, and track the order", async ({ page }) => {
  await page.goto("/device/glass");
  const price = await page.locator("text=Price").locator("..").locator("span").last().innerText();
  expect(price).toMatch(/^\$[\d,]+$/);

  await page.getByRole("button", { name: "Add to cart" }).click();
  await expect(page).toHaveURL(/\/cart$/);
  await expect(page.getByRole("link", { name: "Cart" })).toContainText("1");

  await page.getByRole("button", { name: "Checkout" }).click();
  await page.getByRole("button", { name: "Overview" }).click();
  await expect(page.getByText("Nothing is charged. This is a practice order.")).toBeVisible();
  await page.getByRole("button", { name: /Place order/ }).click();
  await expect(page.getByText("Order placed")).toBeVisible();
  await expect(page.getByRole("link", { name: "Cart" })).not.toContainText("1");
  await expect(page.getByText("Packed").first()).toBeVisible();

  await page.goto("/orders");
  await expect(page.getByText(price).first()).toBeVisible();
  await page.goto("/mine");
  await expect(page.getByRole("link", { name: /Orbit B3/ }).first()).toBeVisible();

  // Cart and orders survive a reload (persisted to localStorage).
  await page.reload();
  await expect(page.getByRole("link", { name: /Orbit B3/ }).first()).toBeVisible();
});

test("Nova answers a prompt chip", async ({ page }) => {
  await page.goto("/signal");
  await page.getByRole("button", { name: "School" }).click();
  await expect(page.getByText("Nova is thinking…")).toBeHidden({ timeout: 30_000 });
  await expect(page.locator(".nova-reveal").first()).toBeVisible();
});

test("Ask Nova about a device starts an overview", async ({ page }) => {
  await page.goto("/device/slate");
  await page.getByRole("link", { name: "Ask Nova about this" }).click();
  await expect(page).toHaveURL(/\/signal\?about=Beep\+Pad$/);
  await expect(page.getByText("Give an overview of the whole Beep Pad.")).toBeVisible();
  await expect(page.locator(".nova-reveal").first()).toBeVisible({ timeout: 30_000 });
});

test("Nova composer sends typed questions", async ({ page }) => {
  await page.goto("/signal");
  const send = page.getByRole("button", { name: "Send" });
  await expect(send).toBeDisabled();
  await page.getByLabel("Ask Nova").fill("Tell me about Ping");
  await send.click();
  await expect(page.getByText("Tell me about Ping")).toBeVisible();
  await expect(page.locator(".nova-reveal").first()).toBeVisible({ timeout: 30_000 });
});
