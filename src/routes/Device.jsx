import { useEffect, useRef, useState } from "react";
import { Link, getRouteApi, useNavigate } from "@tanstack/react-router";
import { carePrice, formatPrice, getDevice, goldPrice, priceFor } from "../data/lineup";
import { useCart } from "../stores";
import { cn } from "../lib/cn";

const route = getRouteApi("/device/$id");

export default function Device() {
  const { id } = route.useParams();
  const device = getDevice(id);
  const navigate = useNavigate();
  const addToCart = useCart((s) => s.add);
  const [finishId, setFinishId] = useState(device?.finishes[0]?.id ?? ``);
  const [storageId, setStorageId] = useState(device?.storage[1]?.id ?? device?.storage[0]?.id ?? ``);
  const [batteryId, setBatteryId] = useState(device?.battery[0]?.id ?? ``);
  const [chipId, setChipId] = useState(`pro`);
  const [care, setCare] = useState(false);
  const [shotIndex, setShotIndex] = useState(0);

  useEffect(() => {
    Promise.resolve(useCart.persist.rehydrate());
  }, []);

  useEffect(() => {
    if (device) {
      setFinishId(device.finishes[0].id);
      setStorageId(device.storage[1]?.id ?? device.storage[0].id);
      setBatteryId(device.battery[0].id);
      setChipId(`pro`);
      setCare(false);
      setShotIndex(0);
    }
  }, [device]);

  if (!device)
    return (
      <div className="px-5 pt-8">
        <h1 className="text-3xl font-medium">That device is not in the lineup.</h1>
        <Link to="/devices" className="mt-4 inline-flex min-h-11 items-center text-gold">
          Back to devices
        </Link>
      </div>
    );

  const finish = device.finishes.find((f) => f.id === finishId) ?? device.finishes[0];
  const storage = device.storage.find((s) => s.id === storageId) ?? device.storage[0];
  const battery = device.battery.find((b) => b.id === batteryId) ?? device.battery[0];
  const chips = [
    { id: `b5`, name: `B5 chip` },
    { id: `pro`, name: `B5 Pro chip` },
    { id: `max`, name: `B5 Max chip` },
  ];
  const chip = chips.find((c) => c.id === chipId) ?? chips[1];
  const shots = finish.images.length ? finish.images : [finish.image];
  const title = device.id === `glass` ? battery.name : device.name;
  const display =
    device.id === `glass`
      ? battery.id === `max`
        ? {
            line: `6.9-inch OLED display. Larger than the Orbit B3 and the Orbit B3 Pro.`,
            spec: `OLED, 6.9 inch, 120 Hz`,
          }
        : battery.id === `plus`
          ? { line: `6.7-inch OLED display.`, spec: `OLED, 6.7 inch, 120 Hz` }
          : { line: `6.1-inch OLED display.`, spec: `OLED, 6.1 inch, 120 Hz` }
      : null;
  const hasStorage = device.storage.some((s) => s.name);
  const hasBattery = device.battery.some((b) => b.name);
  const isHome = device.kind === `Beep Home`;
  const screenLine = display?.line ?? device.screen;

  return (
    <div className="px-5 pt-2 pb-8">
      <p className="text-xs tracking-meta text-gold uppercase">{device.kind}</p>
      <h1 className="mt-1 text-4xl font-medium">{title}</h1>
      <p className="mt-1 text-sm text-muted">{device.line}</p>
      <div className="card-glow mt-4 overflow-hidden rounded-3xl bg-surface">
        <Gallery
          shots={shots}
          labels={
            device.id === `deck`
              ? [`Back`, `Screen`, `How thin`]
              : device.id === `glass`
                ? [`Back`, `Screen`, `Side`, `Port`]
                : device.id === `slate`
                  ? [`Back`, `Screen`, `Side`]
                  : device.id === `hub`
                    ? [`Front`, `Top`, `Angle`]
                    : device.id === `ping`
                      ? [`Case`, `Angle`]
                      : device.id === `canvas`
                        ? [`Screen`, `Side`]
                        : shots.length > 1
                          ? [`Back`, `Screen`]
                          : []
          }
          index={shotIndex}
          onIndex={setShotIndex}
          alt={`${device.name} in ${finish.name}`}
        />
      </div>
      <p className="mt-3 text-center text-sm text-gold">
        {finish.name}
        {finish.limited ? ` · Limited` : ``}
        {finish.id === `gold` ? ` · ${formatPrice(goldPrice(device.id))} more` : ``}
      </p>
      <section className="mt-6">
        <h2 className="text-xs tracking-meta text-gold uppercase">Finish</h2>
        <div className="mt-3 flex flex-wrap gap-3">
          {device.finishes.map((f) => (
            <button
              key={f.id}
              type="button"
              aria-label={f.name}
              aria-pressed={f.id === finish.id}
              onClick={() => {
                setFinishId(f.id);
                setShotIndex(0);
              }}
              className={cn(
                `size-11 rounded-full border-2`,
                f.id === finish.id ? `border-gold` : `border-transparent`,
              )}
              style={{ background: f.swatch }}
            />
          ))}
        </div>
      </section>
      {hasStorage ? (
        <section className="mt-6">
          <h2 className="text-xs tracking-meta text-gold uppercase">Storage</h2>
          <div className="mt-3 grid grid-cols-2 gap-2">
            {device.storage.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setStorageId(s.id);
                }}
                className={cn(
                  `min-h-14 rounded-2xl border px-3 text-sm`,
                  s.id === storage.id
                    ? `card-glow border-gold bg-surface text-gold`
                    : `border-line text-muted`,
                )}
              >
                {s.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm leading-6 text-muted">{storage.detail}</p>
        </section>
      ) : null}
      {hasBattery ? (
        <section className="mt-6">
          <h2 className="text-xs tracking-meta text-gold uppercase">
            {device.id === `glass` ? `Model` : `Battery`}
          </h2>
          {device.id === `glass` ? (
            <p className="mt-2 text-sm leading-6 text-muted">
              Choose Orbit B3, Orbit B3 Pro, or Orbit B3 Pro Max.
            </p>
          ) : null}
          <div className={device.id === `glass` ? `mt-3 space-y-2` : `mt-3 grid grid-cols-3 gap-2`}>
            {device.battery.map((b) => (
              <button
                key={b.id}
                type="button"
                onClick={() => {
                  setBatteryId(b.id);
                }}
                className={cn(
                  `min-h-14 rounded-2xl border px-3 text-sm`,
                  device.id === `glass` ? `w-full text-left` : ``,
                  b.id === battery.id
                    ? `card-glow border-gold bg-surface text-gold`
                    : `border-line text-muted`,
                )}
              >
                {b.name}
              </button>
            ))}
          </div>
          <p className="mt-2 text-sm leading-6 text-muted">{battery.detail}</p>
        </section>
      ) : null}
      {device.id === `glass` ? (
        <Link to="/compare" className="mt-4 inline-flex min-h-11 items-center text-sm text-gold">
          Compare the three phones
        </Link>
      ) : null}
      {device.id === `glass` ? (
        <section className="mt-6">
          <h2 className="text-xs tracking-meta text-gold uppercase">Chip</h2>
          <p className="mt-2 text-sm leading-6 text-muted">
            Choose a B5 chip, a B5 Pro chip, or a B5 Max chip.
          </p>
          <div className="mt-3 space-y-2">
            {chips.map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setChipId(c.id)}
                className={cn(
                  `min-h-14 w-full rounded-2xl border px-3 text-left text-sm`,
                  c.id === chip.id
                    ? `card-glow border-gold bg-surface text-gold`
                    : `border-line text-muted`,
                )}
              >
                {c.name}
              </button>
            ))}
          </div>
        </section>
      ) : null}
      <section className="card-glow mt-6 rounded-3xl bg-surface p-4">
        <p className="text-xs tracking-meta text-gold uppercase">Your setup</p>
        <h2 className="mt-1 text-2xl font-medium">{title}</h2>
        <p className="mt-2 text-sm leading-6 text-muted">
          {isHome
            ? finish.name
            : [
                finish.name,
                storage.name,
                device.id === `glass`
                  ? `${battery.name}. ${chip.name}`
                  : battery.name
                    ? `${battery.name} battery`
                    : ``,
              ]
                .filter(Boolean)
                .join(`. `)}
          {`. `}
          {screenLine}
        </p>
        {hasStorage && storage.detail ? (
          <p className="mt-3 text-sm leading-6 text-fg">{storage.detail}</p>
        ) : null}
        {hasBattery && battery.detail ? (
          <p className="mt-2 text-sm leading-6 text-fg">{battery.detail}</p>
        ) : null}
      </section>
      <p className="mt-6 text-base leading-7 text-muted">{device.blurb}</p>
      <h2 className="mt-8 text-xs tracking-meta text-gold uppercase">What you get</h2>
      <dl className="mt-3 overflow-hidden rounded-2xl border border-line">
        {device.specs.map((spec) => (
          <div
            key={spec.k}
            className="flex items-center justify-between gap-4 border-b border-line bg-surface px-4 py-4"
          >
            <dt className="text-sm text-faint">{spec.k}</dt>
            <dd className="text-right text-sm text-fg">
              {spec.k === `Display` && display
                ? display.spec
                : spec.k === `Chip` && device.id === `glass`
                  ? chip.name
                  : spec.v}
            </dd>
          </div>
        ))}
        {hasStorage ? (
          <div className="flex items-center justify-between gap-4 border-b border-line bg-surface px-4 py-4">
            <dt className="text-sm text-faint">Storage</dt>
            <dd className="text-right text-sm text-fg">{storage.name}</dd>
          </div>
        ) : null}
        {hasBattery ? (
          <div className="flex items-center justify-between gap-4 bg-surface px-4 py-4">
            <dt className="text-sm text-faint">{device.id === `glass` ? `Model` : `Battery`}</dt>
            <dd className="text-right text-sm text-fg">{battery.name}</dd>
          </div>
        ) : null}
      </dl>
      <h2 className="mt-8 text-xs tracking-meta text-gold uppercase">In the box</h2>
      <img
        src={finish.box ?? device.box}
        alt={`Everything that comes with ${device.name}`}
        className="card-glow mt-3 aspect-square w-full rounded-3xl object-cover"
      />
      <ul className="mt-3 overflow-hidden rounded-2xl border border-line">
        {device.included.map((item) => (
          <li key={item} className="border-b border-line bg-surface px-4 py-4 text-sm last:border-b-0">
            {item}
          </li>
        ))}
      </ul>
      <section className="card-glow mt-6 rounded-3xl bg-surface p-4">
        <p className="text-xs tracking-meta text-gold uppercase">Beep Care Plus</p>
        <h2 className="mt-1 text-2xl font-medium">Two years of extra care</h2>
        <ul className="mt-3 space-y-2 text-sm leading-6 text-muted">
          <li>Help if the device gets a crack or a drop.</li>
          <li>A battery that gets tired can be looked after.</li>
          <li>Nova walks you through it, on any Beep Co device.</li>
        </ul>
        <button
          type="button"
          onClick={() => {
            setCare((c) => !c);
          }}
          className={cn(
            `mt-4 flex min-h-14 w-full items-center justify-center rounded-2xl text-base font-medium`,
            care ? `border border-gold text-gold` : `bg-gold text-ink`,
          )}
        >
          {care
            ? `Beep Care Plus added · ${formatPrice(carePrice(device.id))}`
            : `Add Beep Care Plus · ${formatPrice(carePrice(device.id))}`}
        </button>
      </section>
      <div className="mt-6 flex items-end justify-between">
        <span className="text-sm text-muted">Price</span>
        <span className="text-3xl font-medium">
          {formatPrice(
            priceFor(device.id, storage.id, battery.id, care, finish.id, device.id === `glass` ? chip.id : ``),
          )}
        </span>
      </div>
      <button
        type="button"
        onClick={() => {
          addToCart({
            deviceId: device.id,
            name: title,
            finish: finish.name,
            storage: isHome ? `` : storage.name,
            battery: isHome ? `` : battery.name,
            chip: device.id === `glass` ? chip.name : undefined,
            care,
            price: priceFor(
              device.id,
              storage.id,
              battery.id,
              care,
              finish.id,
              device.id === `glass` ? chip.id : ``,
            ),
            image: finish.image,
          });
          navigate({ to: `/cart` });
        }}
        className="card-glow mt-3 flex min-h-14 w-full items-center justify-center rounded-2xl bg-gold text-base font-medium text-ink"
      >
        Add to cart
      </button>
      <Link
        to="/signal"
        search={{ about: device.id === `glass` ? `${title} phone` : device.name }}
        className="font-aurora mt-4 flex min-h-14 items-center justify-center rounded-2xl border border-[#5ee7ff]/40 bg-surface text-sm"
      >
        Ask Nova about this
      </Link>
    </div>
  );
}

function Gallery({ shots, labels, index, onIndex, alt }) {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const indexRef = useRef(index);
  indexRef.current = index;

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    let startX = 0;
    let startY = 0;
    let deltaX = 0;
    let lastX = 0;
    let lastTime = 0;
    let velocity = 0;
    let dragging = false;
    let axis = null;
    let frame = 0;
    let framePending = false;
    let pendingOffset = 0;

    const apply = (animate, offset) => {
      const width = viewport.clientWidth || 1;
      const resisted =
        (indexRef.current === 0 && offset > 0) || (indexRef.current === shots.length - 1 && offset < 0)
          ? offset * 0.32
          : offset;
      track.style.transition = animate ? `transform 420ms cubic-bezier(0.22, 1, 0.36, 1)` : `none`;
      track.style.transform = `translate3d(${-indexRef.current * width + resisted}px,0,0)`;
    };

    const start = (x, y) => {
      dragging = true;
      axis = null;
      deltaX = 0;
      velocity = 0;
      startX = x;
      startY = y;
      lastX = x;
      lastTime = performance.now();
      if (frame) cancelAnimationFrame(frame);
      framePending = false;
      apply(false, 0);
    };

    const move = (x, y, event) => {
      if (!dragging) return;
      const dx = x - startX;
      const dy = y - startY;
      if (!axis) {
        if (Math.abs(dx) < 6 && Math.abs(dy) < 6) return;
        axis = Math.abs(dx) > Math.abs(dy) ? `x` : `y`;
      }
      if (axis !== `x` || shots.length < 2) return;
      event?.preventDefault();
      const now = performance.now();
      const elapsed = Math.max(now - lastTime, 8);
      velocity = (x - lastX) / elapsed;
      lastX = x;
      lastTime = now;
      deltaX = dx;
      pendingOffset = dx;
      if (!framePending) {
        framePending = true;
        frame = requestAnimationFrame(() => {
          framePending = false;
          if (dragging) apply(false, pendingOffset);
        });
      }
    };

    const end = () => {
      if (!dragging) return;
      dragging = false;
      if (axis === `x`) {
        const fling = velocity * 220;
        const projected = deltaX + fling;
        if (projected < -36) onIndex(Math.min(shots.length - 1, indexRef.current + 1));
        else if (projected > 36) onIndex(Math.max(0, indexRef.current - 1));
        else apply(true, 0);
      }
      axis = null;
    };

    apply(false, 0);
    const observer = new ResizeObserver(() => apply(false, 0));
    observer.observe(viewport);

    const onTouchStart = (e) => start(e.touches[0].clientX, e.touches[0].clientY);
    const onTouchMove = (e) => move(e.touches[0].clientX, e.touches[0].clientY, e);
    const onPointerDown = (e) => {
      if (e.pointerType !== `touch`) start(e.clientX, e.clientY);
    };
    const onPointerMove = (e) => {
      if (e.pointerType !== `touch`) move(e.clientX, e.clientY);
    };
    const onPointerUp = (e) => {
      if (e.pointerType !== `touch`) end();
    };

    viewport.addEventListener(`touchstart`, onTouchStart, { passive: true });
    viewport.addEventListener(`touchmove`, onTouchMove, { passive: false });
    viewport.addEventListener(`touchend`, end);
    viewport.addEventListener(`pointerdown`, onPointerDown);
    viewport.addEventListener(`pointermove`, onPointerMove);
    viewport.addEventListener(`pointerup`, onPointerUp);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect();
      viewport.removeEventListener(`touchstart`, onTouchStart);
      viewport.removeEventListener(`touchmove`, onTouchMove);
      viewport.removeEventListener(`touchend`, end);
      viewport.removeEventListener(`pointerdown`, onPointerDown);
      viewport.removeEventListener(`pointermove`, onPointerMove);
      viewport.removeEventListener(`pointerup`, onPointerUp);
    };
  }, [shots, onIndex]);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const width = viewport.clientWidth;
    track.style.transition = `transform 420ms cubic-bezier(0.22, 1, 0.36, 1)`;
    track.style.transform = `translate3d(${-index * width}px,0,0)`;
  }, [index]);

  return (
    <div>
      <div ref={viewportRef} className="overflow-hidden touch-pan-y">
        <div ref={trackRef} className="flex will-change-transform" style={{ width: `${shots.length * 100}%` }}>
          {shots.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={alt}
              draggable={false}
              decoding="async"
              loading={Math.abs(i - index) <= 1 ? `eager` : `lazy`}
              fetchPriority={i === index ? `high` : `low`}
              onError={(e) => {
                const img = e.currentTarget;
                if (img.dataset.retried === `1`) return;
                img.dataset.retried = `1`;
                const original = img.getAttribute(`src`) || ``;
                img.src = ``;
                img.src = original;
              }}
              style={{
                width: `${100 / shots.length}%`,
                minWidth: 0,
                flex: `0 0 ${100 / shots.length}%`,
              }}
              className="aspect-square shrink-0 object-cover select-none"
            />
          ))}
        </div>
      </div>
      {shots.length > 1 ? (
        <div className="flex items-center justify-center gap-3 py-3">
          {shots.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => onIndex(i)}
              className={cn(`text-xs`, i === index ? `text-gold` : `text-faint`)}
            >
              {labels[i] ?? i + 1}
            </button>
          ))}
        </div>
      ) : null}
    </div>
  );
}
