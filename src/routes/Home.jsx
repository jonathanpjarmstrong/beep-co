import { Link } from "@tanstack/react-router";
import { Box, Building2, Columns2, Headphones, Lamp, Laptop, LayoutGrid, Monitor, ScrollText, Smartphone, Sparkles, Tablet } from "../components/icons";
import { droids } from "../data/lineup";

export default function Home() {
  return (
    <div className="px-5 pt-8">
      <div className="flex items-center gap-3">
        <img src="/media/mark.jpg" alt="" className="size-12 rounded-full object-cover soft-glow" />
        <div>
          <p className="font-mark text-xs tracking-mark text-gold">BEEP</p>
          <p className="text-sm text-muted">British Columbia</p>
        </div>
      </div>
      <h1 className="mt-8 text-4xl font-medium text-fg">Good evening.</h1>
      <p className="mt-3 text-base leading-7 text-muted">
        Phones, tablets, computers, and Beep Home. Nova is the most advanced AI on the brick market.
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3">
        <Link to="/hq" className="card-glow rounded-2xl bg-surface p-4">
          <Building2 className="icon-glow size-7 text-gold" />
          <p className="mt-6 text-sm text-muted">Headquarters</p>
          <p className="text-lg font-medium">4 floors</p>
          <p className="text-xs text-faint">Off the B.C. coast</p>
        </Link>
        <Link to="/ceo" className="card-glow rounded-2xl bg-surface p-4">
          <span className="flex">
            {droids.map((droid) => (
              <img
                key={droid.id}
                src={droid.photo}
                alt=""
                className="-ml-2 size-9 rounded-full border border-gold object-cover first:ml-0"
              />
            ))}
          </span>
          <p className="mt-4 text-sm text-muted">Droids</p>
          <p className="text-lg font-medium">High Desk</p>
          <p className="text-xs text-faint">Floor 4</p>
        </Link>
      </div>
      <p className="mt-8 text-xs tracking-meta text-gold uppercase">Open</p>
      <div className="mt-3 grid grid-cols-4 gap-y-4">
        <AppTile to="/device/$id" params={{ id: "glass" }} label="Orbit B3" icon={Smartphone} />
        <AppTile to="/device/$id" params={{ id: "slate" }} label="Beep Pad" icon={Tablet} />
        <AppTile to="/device/$id" params={{ id: "deck" }} label="Beep Book" icon={Laptop} />
        <AppTile to="/devices" search={{ section: "home" }} label="Beep Home" icon={Lamp} />
        <AppTile to="/signal" label="Nova" icon={Sparkles} />
        <AppTile to="/compare" label="Compare" icon={Columns2} />
        <AppTile to="/mine" label="Mine" icon={Box} />
        <AppTile to="/orders" label="Orders" icon={ScrollText} />
        <AppTile to="/device/$id" params={{ id: "ping" }} label="Ping" icon={Headphones} />
        <AppTile to="/device/$id" params={{ id: "canvas" }} label="Frame" icon={Monitor} />
        <AppTile to="/desk" label="Table" icon={LayoutGrid} />
      </div>
      <img src="/media/wordmark.jpg" alt="Beep Co Technologies" className="card-glow mt-8 w-full rounded-2xl object-contain" />
    </div>
  );
}

function AppTile({ to, label, icon: Icon, params, search }) {
  return (
    <Link to={to} params={params} search={search} className="flex flex-col items-center gap-2">
      <span className="card-glow flex size-16 items-center justify-center rounded-2xl border border-gold/50 bg-surface">
        <Icon className="icon-glow size-7 text-gold" strokeWidth={1.75} />
      </span>
      <span className="text-xs text-metal">{label}</span>
    </Link>
  );
}
