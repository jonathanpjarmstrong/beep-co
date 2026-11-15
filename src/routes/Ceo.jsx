import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ChevronLeft, ChevronRight } from "../components/icons";
import { droids, highDesk } from "../data/lineup";
import { cn } from "../lib/cn";

const EASE = "transform 420ms cubic-bezier(0.22, 1, 0.36, 1)";

export default function Ceo() {
  const [index, setIndex] = useState(0);
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const indexRef = useRef(0);
  const layoutRef = useRef(() => {});

  layoutRef.current = (animate) => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const width = viewport.clientWidth;
    track.style.width = `${width * droids.length}px`;
    for (const child of track.children) child.style.width = `${width}px`;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.style.transition = animate && !reduced ? EASE : "none";
    track.style.transform = `translate3d(${-indexRef.current * width}px,0,0)`;
  };

  function goTo(next) {
    const clamped = Math.max(0, Math.min(droids.length - 1, next));
    indexRef.current = clamped;
    layoutRef.current(true);
    setIndex(clamped);
  }

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    let startX = 0;
    let startY = 0;
    let lastX = 0;
    let lastTime = 0;
    let offset = 0;
    let velocity = 0;
    let dragging = false;
    let axis = null;

    const layout = (animate, dx) => {
      const width = viewport.clientWidth;
      track.style.width = `${width * droids.length}px`;
      for (const child of track.children) child.style.width = `${width}px`;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      track.style.transition = animate && !reduced ? EASE : "none";
      track.style.transform = `translate3d(${-indexRef.current * width + dx}px,0,0)`;
    };

    const start = (x, y) => {
      dragging = true;
      axis = null;
      offset = 0;
      velocity = 0;
      startX = x;
      startY = y;
      lastX = x;
      lastTime = performance.now();
      layout(false, 0);
    };

    const move = (x, y, event) => {
      if (!dragging) return;
      const dx = x - startX;
      const dy = y - startY;
      if (!axis) {
        if (Math.abs(dx) < 8 && Math.abs(dy) < 8) return;
        axis = Math.abs(dx) > Math.abs(dy) ? "x" : "y";
      }
      if (axis !== "x") return;
      event?.preventDefault();
      const now = performance.now();
      const dt = now - lastTime;
      if (dt > 0) velocity = (x - lastX) / dt;
      lastX = x;
      lastTime = now;
      let shift = dx;
      if ((indexRef.current === 0 && shift > 0) || (indexRef.current === droids.length - 1 && shift < 0)) {
        shift *= 0.32;
      }
      offset = shift;
      layout(false, shift);
    };

    const end = () => {
      if (!dragging) return;
      dragging = false;
      if (axis === "x") {
        // eslint-disable-next-line no-unused-expressions
        viewport.clientWidth;
        if (offset < -48 || (offset < -12 && velocity < -0.45)) goTo(indexRef.current + 1);
        else if (offset > 48 || (offset > 12 && velocity > 0.45)) goTo(indexRef.current - 1);
        else layout(true, 0);
      }
      axis = null;
      offset = 0;
    };

    const onTouchStart = (e) => start(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e) => move(e.touches[0].clientX, e.touches[0].clientY, e);
    const onPointerDown = (e) => {
      if (e.pointerType !== "touch") start(e.clientX, e.clientY);
    };
    const onPointerMove = (e) => {
      if (e.pointerType !== "touch") move(e.clientX, e.clientY);
    };
    const onPointerUp = (e) => {
      if (e.pointerType !== "touch") end();
    };

    layout(false, 0);
    const observer = new ResizeObserver(() => layout(false, 0));
    observer.observe(viewport);
    viewport.addEventListener("touchstart", onTouchStart, { passive: true });
    viewport.addEventListener("touchmove", onTouchMove, { passive: false });
    viewport.addEventListener("touchend", end);
    viewport.addEventListener("touchcancel", end);
    viewport.addEventListener("pointerdown", onPointerDown);
    viewport.addEventListener("pointermove", onPointerMove);
    viewport.addEventListener("pointerup", onPointerUp);
    viewport.addEventListener("pointercancel", onPointerUp);
    return () => {
      observer.disconnect();
      viewport.removeEventListener("touchstart", onTouchStart);
      viewport.removeEventListener("touchmove", onTouchMove);
      viewport.removeEventListener("touchend", end);
      viewport.removeEventListener("touchcancel", end);
      viewport.removeEventListener("pointerdown", onPointerDown);
      viewport.removeEventListener("pointermove", onPointerMove);
      viewport.removeEventListener("pointerup", onPointerUp);
      viewport.removeEventListener("pointercancel", onPointerUp);
    };
  }, []);

  const droid = droids[index] ?? droids[0];

  return (
    <div className="relative min-h-[calc(100vh-4rem)]">
      <img
        src="/media/ceo-office.jpg"
        alt=""
        className="pointer-events-none absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-bg/78" />
      <div className="relative px-5 pt-8 pb-8">
        <p className="text-xs tracking-meta text-gold uppercase">CEO</p>
        <h1 className="mt-1 text-4xl font-medium">{highDesk.name}</h1>
        <p className="mt-2 text-sm leading-6 text-metal">
          {highDesk.line}
          {" Floor 4. Cucumber is the main droid."}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {droids.map((d, i) => (
            <button
              key={d.id}
              type="button"
              onClick={() => goTo(i)}
              className={cn(
                "flex w-[30%] flex-col items-center gap-1 rounded-2xl p-1",
                i === index ? "card-glow bg-surface" : "bg-bg/40",
              )}
            >
              <img
                src={d.photo}
                alt=""
                className="pointer-events-none aspect-square w-full rounded-xl object-cover"
              />
              <span className={cn("text-xs", i === index ? "text-gold" : "text-metal")}>{d.name}</span>
              <span className="pb-1 text-[10px] text-faint">Level {d.level}</span>
            </button>
          ))}
        </div>
        <section className="card-glow relative mt-4 overflow-hidden rounded-3xl bg-surface/90">
          <div ref={viewportRef} className="relative overflow-hidden touch-pan-y">
            <div ref={trackRef} className="flex will-change-transform">
              {droids.map((d) => (
                <img
                  key={d.id}
                  src={d.photo}
                  alt={`${d.name}, ${d.color}`}
                  draggable={false}
                  className="aspect-square shrink-0 object-cover select-none"
                />
              ))}
            </div>
          </div>
          <button
            type="button"
            aria-label="Previous"
            onClick={() => goTo(index - 1)}
            disabled={index === 0}
            className="absolute top-[28%] left-2 flex size-11 items-center justify-center rounded-full bg-bg/70 text-gold disabled:opacity-30"
          >
            <ChevronLeft className="size-6" />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={() => goTo(index + 1)}
            disabled={index === droids.length - 1}
            className="absolute top-[28%] right-2 flex size-11 items-center justify-center rounded-full bg-bg/70 text-gold disabled:opacity-30"
          >
            <ChevronRight className="size-6" />
          </button>
          <div className="p-4">
            <p className="text-xs tracking-meta text-gold uppercase">{droid.job}</p>
            <h2 className="mt-1 text-3xl font-medium">{droid.name}</h2>
            <p className="text-sm text-gold">Level {droid.level}</p>
            <p className="text-sm text-metal">{droid.color}</p>
            <p className="mt-2 text-sm leading-6 text-muted">{droid.note}</p>
          </div>
        </section>
        <p className="mt-4 text-sm leading-6 text-metal">
          The office behind them looks over the Pacific, off the coast of British Columbia. Five droids. One company.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link
            to="/hq"
            className="flex min-h-14 items-center justify-center rounded-2xl border border-gold/50 bg-bg/70 text-sm text-gold"
          >
            See the floors
          </Link>
          <Link
            to="/signal"
            search={{ about: "the High Desk" }}
            className="card-glow flex min-h-14 items-center justify-center rounded-2xl bg-gold text-sm font-medium text-ink"
          >
            Ask Nova
          </Link>
        </div>
      </div>
    </div>
  );
}
