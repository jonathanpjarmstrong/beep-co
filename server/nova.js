// Nova chat backend. Mirrors the original server function contract:
//   POST { messages: [{ role, content }] } -> { ok: true, text, image? } | { ok: false, error }
// Uses Claude when Anthropic credentials are available, otherwise a local
// responder built from the product lineup so the app works offline.
import Anthropic from "@anthropic-ai/sdk";

import { localReply, pickProduct } from "../src/lib/novaLocal.js";

const SYSTEM = `You are Nova, the AI built into Beep Co Technologies devices. Beep Co is based off the coast of British Columbia.
Speak in short, plain sentences. No markdown, no lists, no emojis. Keep replies under 90 words.
Products: Orbit B3 phone (Orbit B3 6.1-inch 22h, Orbit B3 Pro 6.7-inch 32h, Orbit B3 Pro Max 6.9-inch 40h; OLED; B5 chips; Nova in the side button; 128 GB to 1 TB; from $1,199).
Beep Pad tablet (13-inch OLED 120 Hz, Beep Pencil, Day/Plus/Max 10/14/18h, 128 GB to 1 TB, from $1,099).
Beep Book computer (14-inch OLED, Nova key, Day/Plus/Max 12/18/24h, 512 GB to 2 TB, from $1,599).
Ping earbuds (glowing ring, no stem, white or black, $199). Beep Frame (screen-only computer on a thin foot, from $1,799).
Beep Home: Beep Pod home brain $199, BeepView kitchen island display $349, Arc Light lamp and drive $129, Room Pod speaker $159, Climate Fin $549.
HQ has 4 floors: Gate, Works, Hearth, Crown. The High Desk on Floor 4: Cucumber (level 7, runs the desk), Lumen (AI chief), Ember (consumer tech chief), Marin (Beep Home), T6 (head of product design), all level 5.
Only talk about Beep Co. If asked about something else, steer back to Beep Co products.`;

function hasCredentials() {
  return Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);
}

export async function novaReply(body) {
  const messages = Array.isArray(body?.messages)
    ? body.messages
        .filter((m) => (m.role === "user" || m.role === "assistant") && typeof m.content === "string" && m.content)
        .slice(-20)
        .map((m) => ({ role: m.role, content: m.content.slice(0, 2000) }))
    : [];
  if (!messages.length || messages[0].role !== "user") return { ok: false, error: "Ask Nova something first." };
  if (!hasCredentials()) return localReply(messages);

  try {
    const client = new Anthropic();
    const response = await client.beta.messages.create({
      model: "claude-opus-5-5",
      max_tokens: 16000,
      output_config: { effort: "low" },
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      system: SYSTEM,
      messages,
    });
    if (response.stop_reason === "refusal") return { ok: false, error: "Nova can only help with Beep Co." };
    const text = response.content
      .filter((b) => b.type === "text")
      .map((b) => b.text)
      .join("")
      .trim();
    if (!text) return { ok: false, error: "Nova lost the line. Try once more." };
    const last = messages[messages.length - 1].content;
    return { ok: true, text, image: pickProduct(`${last} ${text}`)?.image };
  } catch (error) {
    if (error instanceof Anthropic.RateLimitError) return { ok: false, error: "Nova is busy. Try again in a moment." };
    if (error instanceof Anthropic.AuthenticationError) return localReply(messages);
    console.error("[nova]", error instanceof Anthropic.APIError ? `${error.status} ${error.message}` : error);
    return { ok: false, error: "Nova lost the line. Try once more." };
  }
}

/** Vite plugin exposing POST /api/nova in dev and preview. */
export function novaPlugin() {
  const handler = async (req, res, next) => {
    if (req.url !== "/api/nova" || req.method !== "POST") return next();
    let raw = "";
    for await (const chunk of req) raw += chunk;
    let body;
    try {
      body = JSON.parse(raw || "{}");
    } catch {
      body = {};
    }
    const result = await novaReply(body);
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(result));
  };
  return {
    name: "beep-nova",
    configureServer(server) {
      server.middlewares.use(handler);
    },
    configurePreviewServer(server) {
      server.middlewares.use(handler);
    },
  };
}
