import { useEffect, useMemo, useState } from "react";
import { Link, getRouteApi } from "@tanstack/react-router";
import { ChevronRight } from "../components/icons";
import { kinds, lineup } from "../data/lineup";
import { cn } from "../lib/cn";

const devicesRoute = getRouteApi("/devices");

export default function Devices() {
  const { section } = devicesRoute.useSearch();
  const isHome = section === "home";
  const [kind, setKind] = useState(isHome ? "Beep Home" : "All");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const reloadBrokenImages = () => {
      if (document.visibilityState === "visible") {
        document.querySelectorAll("[data-lineup]").forEach((img) => {
          if (img.naturalWidth > 0) return;
          const src = img.getAttribute("src");
          if (src) {
            img.src = "";
            img.src = src;
          }
        });
      }
    };
    document.addEventListener("visibilitychange", reloadBrokenImages);
    window.addEventListener("pageshow", reloadBrokenImages);
    return () => {
      document.removeEventListener("visibilitychange", reloadBrokenImages);
      window.removeEventListener("pageshow", reloadBrokenImages);
    };
  }, []);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return lineup.filter((device) =>
      (isHome && device.kind !== "Beep Home") || (!isHome && kind !== "All" && device.kind !== kind)
        ? false
        : !q || `${device.name} ${device.kind} ${device.line}`.toLowerCase().includes(q),
    );
  }, [isHome, kind, query]);

  return (
    <div className="px-5 pt-8">
      <p className="text-xs tracking-meta text-gold uppercase">Lineup</p>
      <h1 className="mt-1 text-4xl font-medium">{isHome ? "Beep Home" : "Devices"}</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        {isHome
          ? "Only the home stuff. Lights, sound, air, and the island display."
          : "Phones, tablets, computers, and Beep Home."}
      </p>
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search"
        aria-label="Search devices"
        className="mt-5 h-12 w-full rounded-2xl border border-line bg-surface px-4 text-base outline-none focus:border-gold"
      />
      {isHome ? null : (
        <div className="mt-4 flex gap-2 overflow-x-auto pb-1">
          {kinds.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={cn(
                "min-h-11 shrink-0 rounded-full px-4 text-sm",
                kind === k ? "card-glow bg-gold text-ink" : "border border-line text-muted",
              )}
            >
              {k}
            </button>
          ))}
        </div>
      )}
      <ul className="mt-4 space-y-3">
        {results.length === 0 ? (
          <li className="py-8 text-sm text-muted">Nothing matches that.</li>
        ) : (
          results.map((device) => (
            <li key={device.id}>
              <Link
                to="/device/$id"
                params={{ id: device.id }}
                className="flex items-center gap-3 rounded-2xl border border-line bg-surface p-3"
              >
                <img
                  src={device.finishes[0].image}
                  alt=""
                  decoding="sync"
                  loading="eager"
                  data-lineup=""
                  className="size-14 shrink-0 rounded-2xl bg-bg object-cover"
                  onError={(e) => {
                    const img = e.currentTarget;
                    if (img.dataset.retried === "1") return;
                    img.dataset.retried = "1";
                    const src = img.src;
                    img.src = "";
                    img.src = src;
                  }}
                />
                <span className="min-w-0 flex-1">
                  <span className="block text-xs text-gold">{device.kind}</span>
                  <span className="block text-lg font-medium">{device.name}</span>
                  <span className="block truncate text-sm text-muted">{device.line}</span>
                </span>
                <ChevronRight className="size-5 text-gold" />
              </Link>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
