import { useEffect, useRef, useState } from "react";
import { getRouteApi } from "@tanstack/react-router";
import { Send, Sparkles } from "../components/icons";
import { cn } from "../lib/cn";
import { askNova } from "../lib/nova";

const route = getRouteApi("/signal");

const prompts = [
  {
    label: "School",
    text: "Suggest one Beep Co setup for school. Name the product, the model if it is a phone, and the storage.",
  },
  { label: "Music", text: "Suggest one Beep Co setup for music. Name the product and why it fits." },
  { label: "Photos", text: "Suggest one Beep Co phone setup for photos. Name the model and the storage." },
  { label: "The house", text: "Suggest one Beep Home setup for lights, air, and music." },
];

const LOST = "Nova lost the line. Try once more.";

/** Height of the on-screen keyboard, so the composer stays visible on mobile. */
function useKeyboardInset() {
  const [inset, setInset] = useState(0);
  useEffect(() => {
    const vv = window.visualViewport;
    let last = 0;
    const update = () => {
      if (!vv) return;
      const next = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
      if (next !== last) {
        last = next;
        setInset(next > 80 ? next : 0);
      }
    };
    update();
    vv?.addEventListener("resize", update);
    window.addEventListener("resize", update);
    return () => {
      vv?.removeEventListener("resize", update);
      window.removeEventListener("resize", update);
    };
  }, []);
  return inset;
}

export default function Signal() {
  const { about = "" } = route.useSearch();
  const [messages, setMessages] = useState([]);
  const [draft, setDraft] = useState("");
  const [thinking, setThinking] = useState(false);
  const [error, setError] = useState("");
  const keyboardInset = useKeyboardInset();
  const scrollRef = useRef(null);

  useEffect(() => {
    if (!about) return;
    const content = about.toLowerCase().includes("phone")
      ? `Give an overview of the whole ${about}. Cover the models, the screen sizes in words, and the B5 chips.`
      : `Give an overview of the whole ${about}.`;
    setMessages([{ role: "user", content }]);
    setDraft("");
    setThinking(true);
    setError("");
    let cancelled = false;
    askNova({ data: { messages: [{ role: "user", content }] } })
      .then((res) => {
        if (cancelled) return;
        if (res.ok) {
          setMessages([
            { role: "user", content },
            { role: "assistant", content: res.text, image: res.image },
          ]);
        } else setError(res.error);
      })
      .catch(() => {
        if (!cancelled) setError(LOST);
      })
      .finally(() => {
        if (!cancelled) setThinking(false);
      });
    return () => {
      cancelled = true;
    };
  }, [about]);

  useEffect(() => {
    const el = scrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [messages, thinking, keyboardInset]);

  async function send(text) {
    const content = text.trim();
    if (!content || thinking) return;
    setError("");
    setDraft("");
    const next = [...messages, { role: "user", content }];
    setMessages(next);
    setThinking(true);
    try {
      const res = await askNova({ data: { messages: next } });
      if (res.ok) setMessages((m) => [...m, { role: "assistant", content: res.text, image: res.image }]);
      else setError(res.error);
    } catch {
      setError(LOST);
    } finally {
      setThinking(false);
    }
  }

  return (
    <div className="nova-page flex min-h-[calc(100dvh-6rem)] flex-col px-5 pt-8" style={{ paddingBottom: keyboardInset }}>
      <div className="flex items-center gap-3">
        <span className="card-glow flex size-12 items-center justify-center rounded-2xl bg-surface">
          <Sparkles className="icon-glow size-6 text-gold" />
        </span>
        <div>
          <h1 className="text-3xl font-medium">Nova</h1>
          <p className="text-sm text-muted">Most advanced AI on the brick market</p>
        </div>
      </div>
      <div ref={scrollRef} className="mt-5 min-h-0 flex-1 space-y-3 overflow-y-auto pb-3">
        {messages.length === 0 ? (
          <div className="grid grid-cols-2 gap-2">
            {prompts.map((p) => (
              <button
                key={p.label}
                type="button"
                onClick={() => void send(p.text)}
                className="min-h-12 rounded-2xl border border-gold/40 bg-surface px-4 text-left text-sm text-metal"
              >
                {p.label}
              </button>
            ))}
          </div>
        ) : (
          messages.map((m, i) => (
            <div key={`${i}-${m.role}`} className={cn("max-w-[92%]", m.role === "user" ? "ml-auto" : "")}>
              {m.content ? (
                <p
                  className={cn(
                    "rounded-2xl px-4 py-3 text-sm leading-6 whitespace-pre-wrap",
                    m.role === "user" ? "bg-gold text-ink" : "nova-reveal border border-gold/30 bg-surface text-fg",
                  )}
                >
                  {m.content}
                </p>
              ) : null}
              {m.image ? <img src={m.image} alt="" className="nova-reveal mt-2 w-full rounded-2xl object-cover" /> : null}
            </div>
          ))
        )}
        {thinking ? (
          <p className="flex items-center gap-2 text-sm text-gold">
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span className="nova-star" />
              <span className="nova-star nova-star-2" />
              <span className="nova-star nova-star-3" />
            </span>
            Nova is thinking…
          </p>
        ) : null}
        {error ? <p className="text-sm text-gold-hi">{error}</p> : null}
      </div>
      <form
        className="flex gap-2 bg-bg pt-2 pb-3"
        onSubmit={(e) => {
          e.preventDefault();
          send(draft);
        }}
      >
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Ask Nova"
          aria-label="Ask Nova"
          maxLength={500}
          className="h-12 min-w-0 flex-1 rounded-full border border-gold/40 bg-surface px-4 text-base text-[#f7f3ea] outline-none"
        />
        <button
          type="submit"
          disabled={thinking || !draft.trim()}
          aria-label="Send"
          className="flex h-12 shrink-0 items-center justify-center gap-1 rounded-full bg-gold px-4 text-sm font-medium text-ink disabled:opacity-40"
        >
          <Send className="size-4" />
          Send
        </button>
      </form>
    </div>
  );
}
