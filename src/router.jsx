import { createRootRoute, createRoute, createRouter, Outlet, HeadContent } from "@tanstack/react-router";
import { Layout } from "./components/Layout";
import Home from "./routes/Home";
import Cart from "./routes/Cart";
import Ceo from "./routes/Ceo";
import Compare from "./routes/Compare";
import Desk from "./routes/Desk";
import Devices from "./routes/Devices";
import Hq from "./routes/Hq";
import Mine from "./routes/Mine";
import Orders from "./routes/Orders";
import Signal from "./routes/Signal";
import Device from "./routes/Device";

const rootRoute = createRootRoute({
  head: () => ({ meta: [{ title: "Beep Co Technologies" }] }),
  component: () => (
    <>
      <HeadContent />
      <Layout>
        <Outlet />
      </Layout>
    </>
  ),
});

const page = (path, component, title, extra = {}) =>
  createRoute({
    getParentRoute: () => rootRoute,
    path,
    component,
    head: title ? () => ({ meta: [{ title }] }) : undefined,
    ...extra,
  });

const routeTree = rootRoute.addChildren([
  page("/", Home),
  page("/cart", Cart, "Cart — Beep Co"),
  page("/ceo", Ceo, "The High Desk — Beep Co"),
  page("/compare", Compare, "Compare — Beep Co"),
  page("/desk", Desk, "Desk — Beep Co"),
  page("/devices", Devices, "Devices — Beep Co", {
    validateSearch: (s) => (s.section === "home" ? { section: "home" } : {}),
  }),
  page("/hq", Hq, "Headquarters — Beep Co"),
  page("/mine", Mine, "My devices — Beep Co"),
  page("/orders", Orders, "Orders — Beep Co"),
  page("/signal", Signal, "Nova — Beep Co", {
    validateSearch: (s) => {
      const about = typeof s.about === "string" ? s.about.slice(0, 40) : "";
      return about ? { about } : {};
    },
  }),
  page("/device/$id", Device, "Device — Beep Co"),
]);

export const router = createRouter({
  routeTree,
  scrollRestoration: true,
  basepath: import.meta.env.BASE_URL.replace(/\/$/, "") || "/",
});
