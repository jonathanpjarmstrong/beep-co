import { Link } from "@tanstack/react-router";

const tableItems = [
  { id: "deck", name: "Beep Book", note: "Gold, open at the top" },
  { id: "slate", name: "Beep Pad", note: "Blue, lying flat" },
  { id: "glass", name: "Orbit B3", note: "Silver, lying flat" },
  { id: "arc", name: "Arc Light", note: "The warm lamp" },
  { id: "hub", name: "Beep Pod", note: "The round speaker" },
];

export default function Desk() {
  return (
    <div className="px-5 pt-2 pb-8">
      <p className="text-xs tracking-meta text-gold uppercase">Top down</p>
      <h1 className="mt-1 text-4xl font-medium">On the table</h1>
      <p className="mt-2 text-sm leading-6 text-muted">
        A gold computer, a blue pad, a silver phone lying flat, the Arc Light, and a Beep Pod. Each one is a different color.
      </p>
      <img
        src="/media/desk-v2.jpg"
        alt="A top-down view of Beep Co devices on a table"
        className="card-glow mt-5 w-full rounded-3xl object-cover"
      />
      <ul className="mt-4 space-y-2">
        {tableItems.map((item) => (
          <li key={item.id}>
            <Link
              to="/device/$id"
              params={{ id: item.id }}
              className="flex items-center justify-between rounded-2xl border border-line bg-surface px-4 py-4"
            >
              <span>
                <span className="block text-base font-medium">{item.name}</span>
                <span className="block text-sm text-muted">{item.note}</span>
              </span>
              <span className="text-sm text-gold">Open</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
