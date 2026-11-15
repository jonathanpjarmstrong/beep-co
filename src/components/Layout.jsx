import { useEffect } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Bot, Building2, ChevronLeft, House, ShoppingBag, Smartphone, Sparkles } from "./icons";
import { cn } from "../lib/cn";
import { useCart, useOrders } from "../stores";

const tabs = [
  { to: "/", label: "Home", icon: House },
  { to: "/devices", label: "Devices", icon: Smartphone },
  { to: "/signal", label: "AI", icon: Sparkles },
  { to: "/hq", label: "HQ", icon: Building2 },
  { to: "/ceo", label: "CEO", icon: Bot },
];

function isActive(pathname, to) {
  if (to === "/") return pathname === "/";
  if (to === "/devices") return pathname === "/devices" || pathname.startsWith("/device");
  return pathname === to || pathname.startsWith(`${to}/`);
}

export function Layout({ children }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const count = useCart((s) => s.lines.length);
  const showBack = pathname !== "/";

  useEffect(() => {
    useCart.persist.rehydrate();
    useOrders.persist.rehydrate();
  }, []);

  return (
    <div className="min-h-screen bg-bg text-fg">
      <div className="mx-auto flex min-h-screen w-full max-w-md flex-col border-x border-line">
        <header className="sticky top-0 z-30 flex items-center justify-between bg-bg/95 px-4 py-3 backdrop-blur-md">
          {showBack ? (
            <Link
              to="/"
              className="inline-flex min-h-12 items-center gap-1 rounded-full border border-gold bg-surface px-4 text-base font-medium text-gold"
            >
              <ChevronLeft className="size-6" />
              Back
            </Link>
          ) : (
            <span />
          )}
          <Link
            to="/cart"
            aria-label="Cart"
            className="relative flex h-12 items-center gap-2 rounded-full border border-gold bg-surface px-4 text-sm font-medium text-gold"
          >
            <ShoppingBag className="size-5" />
            Cart
            {count > 0 ? (
              <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-gold px-1 text-xs text-ink">
                {count}
              </span>
            ) : null}
          </Link>
        </header>
        <main className="flex-1 pb-24">{children}</main>
      </div>
      <nav className="fixed bottom-0 left-1/2 z-40 w-full max-w-md -translate-x-1/2 border-t border-gold/40 bg-bg/95 backdrop-blur-md">
        <ul className="grid grid-cols-5">
          {tabs.map((tab) => {
            const active = isActive(pathname, tab.to);
            const Icon = tab.icon;
            return (
              <li key={tab.to}>
                <Link
                  to={tab.to}
                  className={cn(
                    "flex min-h-16 flex-col items-center justify-center gap-1 text-xs transition-transform duration-200 ease-out active:scale-95",
                    active ? "text-gold" : "text-faint",
                  )}
                >
                  <Icon className={cn("size-6", active && "icon-glow")} strokeWidth={1.75} />
                  {tab.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
