import { useEffect, useState } from "react";
import { formatPrice } from "../data/lineup";
import { useOrders } from "../stores";
import { OrderTrack } from "../components/OrderTrack";

export default function Orders() {
  const orders = useOrders((s) => s.orders);
  const [hydrated, setHydrated] = useState(false);
  const [openId, setOpenId] = useState("");

  useEffect(() => {
    Promise.resolve(useOrders.persist.rehydrate()).then(() => setHydrated(true));
  }, []);

  return (
    <div className="px-5 pt-2 pb-8">
      <p className="text-xs tracking-meta text-gold uppercase">Practice</p>
      <h1 className="mt-1 text-4xl font-medium">Orders</h1>
      {hydrated ? (
        orders.length === 0 ? (
          <p className="mt-4 text-sm leading-6 text-muted">No orders yet. Nothing is ever charged.</p>
        ) : (
          <ul className="mt-5 space-y-3">
            {orders.map((order) => (
              <li key={order.id} className="rounded-2xl border border-line bg-surface p-4">
                <button
                  type="button"
                  onClick={() => setOpenId(openId === order.id ? "" : order.id)}
                  className="w-full text-left"
                >
                  <span className="block text-base font-medium">{order.placed}</span>
                  <span className="block text-sm text-muted">
                    {order.lines.length} {order.lines.length === 1 ? "thing" : "things"} · {formatPrice(order.total)}
                  </span>
                </button>
                <OrderTrack placedAt={order.placedAt} />
                {openId === order.id ? (
                  <ul className="mt-3 space-y-2">
                    {order.lines.map((line) => (
                      <li key={line.key} className="flex gap-3">
                        <img src={line.image} alt="" className="size-12 shrink-0 rounded-lg object-cover" />
                        <span>
                          <span className="block text-sm font-medium">{line.name}</span>
                          <span className="block text-xs text-muted">
                            {[line.finish, line.storage, line.battery, line.chip].filter(Boolean).join(". ")}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
            ))}
          </ul>
        )
      ) : null}
    </div>
  );
}
