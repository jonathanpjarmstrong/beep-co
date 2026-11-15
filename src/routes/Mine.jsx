import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useOrders } from "../stores";

export default function Mine() {
  const orders = useOrders((s) => s.orders);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    Promise.resolve(useOrders.persist.rehydrate()).then(() => setHydrated(true));
  }, []);

  const devices = orders.flatMap((order) => order.lines);

  return (
    <div className="px-5 pt-2 pb-8">
      <p className="text-xs tracking-meta text-gold uppercase">Yours</p>
      <h1 className="mt-1 text-4xl font-medium">My devices</h1>
      {hydrated ? (
        devices.length === 0 ? (
          <p className="mt-4 text-sm leading-6 text-muted">
            Nothing here yet. Place a practice order and it will show up.
          </p>
        ) : (
          <ul className="mt-5 space-y-3">
            {devices.map((line) => (
              <li key={line.key}>
                <Link
                  to="/device/$id"
                  params={{ id: line.deviceId }}
                  className="flex gap-3 rounded-2xl border border-line bg-surface p-3"
                >
                  <img src={line.image} alt="" className="size-16 shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0">
                    <span className="block text-base font-medium">{line.name}</span>
                    <span className="block text-sm text-muted">
                      {[line.finish, line.storage, line.battery, line.chip, line.care ? "Beep Care Plus" : ""]
                        .filter(Boolean)
                        .join(". ")}
                    </span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )
      ) : null}
    </div>
  );
}
