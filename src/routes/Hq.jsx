import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { floors } from "../data/lineup";
import { cn } from "../lib/cn";

export default function Hq() {
  const [floorId, setFloorId] = useState(floors[3].id);
  const floor = floors.find((f) => f.id === floorId) ?? floors[0];

  return (
    <div className="px-5 pt-8">
      <p className="text-xs tracking-meta text-gold uppercase">Canada</p>
      <h1 className="mt-1 text-4xl font-medium">Headquarters</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        Four floors. Huge. Just off the coast of British Columbia.
      </p>
      <img
        src="/media/hq.jpg"
        alt="Beep Co headquarters at night, four glowing floors over dark water"
        className="card-glow mt-5 w-full rounded-2xl object-cover"
      />
      <div className="mt-5 grid grid-cols-4 gap-2">
        {floors.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFloorId(f.id)}
            className={cn(
              "min-h-16 rounded-2xl border text-sm",
              floorId === f.id ? "card-glow border-gold bg-surface text-gold" : "border-line text-muted",
            )}
          >
            <span className="block text-xs">{f.level}</span>
            <span className="font-medium">{f.name}</span>
          </button>
        ))}
      </div>
      <section className="card-glow mt-4 rounded-2xl bg-surface p-4">
        <p className="text-xs tracking-meta text-gold uppercase">Floor {floor.level}</p>
        <h2 className="mt-1 text-2xl font-medium">{floor.name}</h2>
        <p className="text-sm text-gold">{floor.line}</p>
        <p className="mt-2 text-sm leading-6 text-muted">{floor.note}</p>
        <ul className="mt-4 space-y-3">
          {floor.rooms.map((room) => {
            const RoomIcon = room.icon;
            return (
              <li key={room.name} className="flex items-start gap-3">
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl border border-gold/40 bg-bg">
                  <RoomIcon className="icon-glow size-5 text-gold" />
                </span>
                <span>
                  <span className="block text-sm font-medium">{room.name}</span>
                  <span className="block text-sm text-muted">{room.note}</span>
                </span>
              </li>
            );
          })}
        </ul>
        {floor.id === "crown" ? (
          <Link to="/ceo" className="mt-4 inline-flex min-h-11 items-center text-sm text-gold">
            Visit the High Desk
          </Link>
        ) : null}
      </section>
    </div>
  );
}
