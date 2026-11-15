import { Link } from "@tanstack/react-router";
import { formatPrice, priceFor } from "../data/lineup";

const phones = [
  {
    id: "day",
    name: "Orbit B3",
    screen: "6.1-inch OLED",
    hours: "Up to 22 hours",
  },
  {
    id: "plus",
    name: "Orbit B3 Pro",
    screen: "6.7-inch OLED",
    hours: "Up to 32 hours",
  },
  {
    id: "max",
    name: "Orbit B3 Pro Max",
    screen: "6.9-inch OLED",
    hours: "Up to 40 hours",
  },
];

export default function Compare() {
  return (
    <div className="px-5 pt-2 pb-8">
      <p className="text-xs tracking-meta text-gold uppercase">Phones</p>
      <h1 className="mt-1 text-4xl font-medium">Compare</h1>
      <p className="mt-2 text-sm leading-6 text-muted">Starting price is 128 GB, with no Beep Care Plus.</p>
      <div className="mt-5 space-y-3">
        {phones.map((phone) => (
          <article key={phone.id} className="card-glow rounded-3xl bg-surface p-4">
            <h2 className="text-xl font-medium">{phone.name}</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <div className="flex justify-between gap-4">
                <dt className="text-faint">Screen</dt>
                <dd>{phone.screen}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-faint">Hours</dt>
                <dd>{phone.hours}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-faint">Starts at</dt>
                <dd className="text-gold">{formatPrice(priceFor("glass", "128", phone.id, false, ""))}</dd>
              </div>
            </dl>
          </article>
        ))}
      </div>
      <Link
        to="/device/$id"
        params={{ id: "glass" }}
        className="card-glow mt-5 flex min-h-14 items-center justify-center rounded-2xl bg-gold text-base font-medium text-ink"
      >
        Set up a phone
      </Link>
    </div>
  );
}
