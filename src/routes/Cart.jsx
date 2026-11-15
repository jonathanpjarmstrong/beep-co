import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { formatPrice, getDevice } from "../data/lineup";
import { useCart, useOrders } from "../stores";
import { OrderTrack } from "../components/OrderTrack";

export default function Cart() {
  const lines = useCart((s) => s.lines);
  const remove = useCart((s) => s.remove);
  const clear = useCart((s) => s.clear);
  const orders = useOrders((s) => s.orders);
  const place = useOrders((s) => s.place);
  const [hydrated, setHydrated] = useState(false);
  const [step, setStep] = useState("bag");
  const [showOverview, setShowOverview] = useState(false);

  useEffect(() => {
    Promise.all([useCart.persist.rehydrate(), useOrders.persist.rehydrate()]).then(() =>
      setHydrated(true),
    );
  }, []);

  const total = lines.reduce((sum, line) => sum + line.price, 0);

  return (
    <div className="px-5 pt-2 pb-8">
      <h1 className="text-4xl font-medium">
        {step === "done" ? "Order placed" : step === "pay" ? "Checkout" : "Cart"}
      </h1>
      {hydrated ? (
        step === "done" ? (
          <>
            <p className="mt-4 text-sm leading-6 text-muted">
              The Works will pack this. It is a practice checkout, so nothing is charged. Your devices are saved.
            </p>
            <OrderTrack placedAt={orders[0]?.placedAt} />
            <div className="mt-5 grid grid-cols-2 gap-2">
              <Link
                to="/mine"
                className="flex min-h-12 items-center justify-center rounded-2xl bg-gold text-sm font-medium text-ink"
              >
                My devices
              </Link>
              <Link
                to="/orders"
                className="flex min-h-12 items-center justify-center rounded-2xl border border-gold text-sm text-gold"
              >
                Orders
              </Link>
            </div>
          </>
        ) : lines.length === 0 ? (
          <p className="mt-4 text-sm leading-6 text-muted">Your cart is empty.</p>
        ) : (
          <>
            <ul className="mt-5 space-y-3">
              {lines.map((line) => (
                <li key={line.key} className="flex gap-3 rounded-2xl border border-line bg-surface p-3">
                  <img src={line.image} alt="" className="size-16 shrink-0 rounded-xl object-cover" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-base font-medium">{line.name}</span>
                    <span className="block text-sm text-muted">
                      {[line.finish, line.storage, line.battery, line.chip, line.care ? "Beep Care Plus" : ""]
                        .filter(Boolean)
                        .join(". ")}
                    </span>
                    <span className="mt-1 block text-sm text-gold">{formatPrice(line.price)}</span>
                    {step === "bag" ? (
                      <button type="button" onClick={() => remove(line.key)} className="mt-1 text-xs text-faint">
                        Remove
                      </button>
                    ) : null}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-muted">Total</span>
              <span className="text-2xl font-medium">{formatPrice(total)}</span>
            </div>
            <p className="mt-2 text-xs text-faint">Practice checkout. No real charge.</p>
            {step === "bag" ? (
              <button
                type="button"
                onClick={() => setStep("pay")}
                className="card-glow mt-5 flex min-h-14 w-full items-center justify-center rounded-2xl bg-gold text-base font-medium text-ink"
              >
                Checkout
              </button>
            ) : (
              <>
                <button
                  type="button"
                  onClick={() => setShowOverview((v) => !v)}
                  className="mt-5 flex min-h-14 w-full items-center justify-center rounded-2xl border border-gold text-base font-medium text-gold"
                >
                  Overview
                </button>
                {showOverview ? (
                  <div className="card-glow mt-3 rounded-3xl bg-surface p-4">
                    <p className="text-xs tracking-meta text-gold uppercase">Your cart</p>
                    <ul className="mt-3 space-y-3">
                      {lines.map((line) => {
                        const options = [
                          line.finish,
                          line.storage,
                          line.battery,
                          line.chip,
                          line.care ? "Beep Care Plus" : "",
                        ]
                          .filter(Boolean)
                          .join(", ");
                        return (
                          <li key={line.key}>
                            <p className="text-base font-medium">{line.name}</p>
                            <p className="mt-1 text-sm leading-6 text-muted">
                              {options ? `${line.name} in ${options}. ` : ""}
                              {getDevice(line.deviceId)?.blurb}
                            </p>
                            <p className="mt-1 text-sm text-gold">{formatPrice(line.price)}</p>
                          </li>
                        );
                      })}
                    </ul>
                    <p className="mt-4 text-sm text-fg">
                      Total {formatPrice(total)}. Nothing is charged. This is a practice order.
                    </p>
                  </div>
                ) : null}
                <button
                  type="button"
                  onClick={() => {
                    place(lines, total);
                    clear();
                    setStep("done");
                  }}
                  className="card-glow mt-3 flex min-h-14 w-full items-center justify-center rounded-2xl bg-gold text-base font-medium text-ink"
                >
                  Place order · {formatPrice(total)}
                </button>
              </>
            )}
          </>
        )
      ) : null}
    </div>
  );
}
