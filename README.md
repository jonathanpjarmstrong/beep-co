# Beep Co

Local rebuild of the Beep Co Technologies app (reference: https://swift-olive-island-shale.grok.me/).

## Run

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # visual parity vs. the reference site + end-to-end flows
```

## Stack

Vite, React 19, Tailwind v4, TanStack Router, zustand (cart and orders persist to localStorage), lucide icons pinned to the reference geometry in `src/components/icons.js`.

## Nova (AI tab)

`POST /api/nova` is served by a Vite plugin (`server/nova.js`) in dev and preview.

- With `ANTHROPIC_API_KEY` set, replies come from Claude (`claude-opus-5-5`).
- Without it, a local responder answers from the product lineup, so the app works offline.

## Routes

`/`, `/devices` (`?section=home`), `/device/:id` (glass, slate, deck, ping, canvas, hub, view, arc, pod, fin), `/signal` (`?about=`), `/hq`, `/ceo`, `/desk`, `/compare`, `/cart`, `/orders`, `/mine`.
