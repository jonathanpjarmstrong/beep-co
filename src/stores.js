import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export const useCart = create(
  persist(
    (set) => ({
      lines: [],
      add: (line) =>
        set((s) => ({
          lines: [...s.lines, { ...line, key: `${line.deviceId}-${Date.now()}` }],
        })),
      remove: (key) => set((s) => ({ lines: s.lines.filter((l) => l.key !== key) })),
      clear: () => set({ lines: [] }),
    }),
    { name: "beep-cart", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);

/** Order status is derived from elapsed time since the order was placed. */
export function orderStatus(placedAt, now = Date.now()) {
  if (!placedAt) return "delivered";
  const elapsed = now - placedAt;
  return elapsed < 20000 ? "packed" : elapsed < 50000 ? "way" : "delivered";
}

export const useOrders = create(
  persist(
    (set) => ({
      orders: [],
      place: (lines, total) =>
        set((s) => ({
          orders: [
            {
              id: `order-${Date.now()}`,
              placed: new Date().toLocaleDateString("en-CA", {
                month: "short",
                day: "numeric",
                year: "numeric",
              }),
              placedAt: Date.now(),
              total,
              lines,
            },
            ...s.orders,
          ],
        })),
    }),
    { name: "beep-orders", storage: createJSONStorage(() => localStorage), skipHydration: true },
  ),
);
