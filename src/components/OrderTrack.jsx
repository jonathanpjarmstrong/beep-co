import { useEffect, useState } from "react";
import { orderStatus } from "../stores";
import { cn } from "../lib/cn";

const steps = [
  { id: `packed`, label: `Packed` },
  { id: `way`, label: `On the way` },
  { id: `delivered`, label: `Delivered` },
];

export function OrderTrack({ placedAt }) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 1e3);
    return () => window.clearInterval(timer);
  }, []);
  const status = orderStatus(placedAt, now);
  const current = steps.findIndex((step) => step.id === status);
  return (
    <ol className="mt-3 grid grid-cols-3 gap-2">
      {steps.map((step, index) => (
        <li
          key={step.id}
          className={cn(
            `rounded-2xl border px-2 py-3 text-center text-xs`,
            index <= current ? `border-gold bg-surface text-gold` : `border-line text-faint`,
          )}
        >
          {step.label}
        </li>
      ))}
    </ol>
  );
}
