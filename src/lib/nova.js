import { localReply } from "./novaLocal";

// Static hosting (GitHub Pages) has no server, so Nova answers in the browser.
const OFFLINE = import.meta.env.VITE_NOVA_OFFLINE === "1";

/** Client for the Nova chat endpoint. Resolves to { ok, text, image } or { ok: false, error }. */
export async function askNova({ data }) {
  if (OFFLINE) {
    await new Promise((r) => setTimeout(r, 700));
    return localReply(data.messages);
  }
  const res = await fetch(`${import.meta.env.BASE_URL}api/nova`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error(`Nova HTTP ${res.status}`);
  return res.json();
}
