// Offline Nova responder built from the product lineup. Used by the dev
// server when no Anthropic credentials are set, and by the static build.
export const PRODUCTS = [
  { match: ["orbit", "phone", "b3"], name: "Orbit B3", image: "/media/devices/halo-midnight-back-v4.jpg",
    text: "Orbit B3 comes in three models. Orbit B3 has a 6.1-inch screen and up to 22 hours of use. Orbit B3 Pro has a 6.7-inch screen and up to 32 hours. Orbit B3 Pro Max has a 6.9-inch screen, the largest of the three, and up to 40 hours. All three use an OLED display and the B5 chip, with Nova in the side button. Storage runs from 128 GB to 1 TB. It starts at $1,199." },
  { match: ["pad", "tablet", "draw"], name: "Beep Pad", image: "/media/devices/slate-starlight-back-v17.jpg",
    text: "Beep Pad is the drawing board. It has a 13-inch OLED display at 120 Hz, and the Beep Pencil draws right on the glass. Pick Day, Plus, or Max for up to 10, 14, or 18 hours. Storage runs from 128 GB to 1 TB. It starts at $1,099." },
  { match: ["book", "computer", "laptop", "school"], name: "Beep Book", image: "/media/devices/deck-charcoal-back-v18.jpg",
    text: "For school, pick Beep Book with 512 GB. It has a 14-inch OLED display, quiet keys with a Nova key, and up to 12 hours unplugged on Day. Plus gives you 18 hours, and Max gives you 24. It starts at $1,599." },
  { match: ["ping", "earbud", "music", "listen"], name: "Ping", image: "/media/devices/ping-white-case-v1.jpg",
    text: "For music, pick Ping. They are pebble earbuds with a soft glowing ring and no stem, and they sit in a small rounded case. White or black. $199." },
  { match: ["frame", "big screen", "monitor"], name: "Beep Frame", image: "/media/devices/canvas-silver-front-v1.jpg",
    text: "Beep Frame is a large computer that is only the screen. It stands on a thin metal foot, and the keyboard is not attached. Storage runs from 512 GB to 2 TB. It starts at $1,799." },
  { match: ["house", "home", "lights", "air", "pod", "lamp"], name: "Beep Home", image: "/media/devices/hub-ivory-front-v26.jpg",
    text: "For the house, start with Beep Pod at $199. It is the home brain and runs the lights, the air, and the music. Add Arc Light ($129) for a warm lamp, a Room Pod ($159) for each room you want music in, and Climate Fin ($549) on the wall to keep the air even." },
  { match: ["desk", "droid", "cucumber", "high desk"], name: "The High Desk", image: "/media/ceo-office.jpg",
    text: "The High Desk sits on Floor 4, the Crown. Five droids work there. Cucumber is level 7 and runs the desk. Lumen leads Nova, Ember leads consumer tech, Marin looks after Beep Home, and T6 leads product design. They are all level 5." },
  { match: ["photo", "camera"], name: "Orbit B3 Pro", image: "/media/devices/halo-midnight-side-v4.jpg",
    text: "For photos, pick Orbit B3 Pro with 256 GB. It has two lenses in one island, a 6.7-inch OLED display, and up to 32 hours of use. 256 GB leaves room for a big photo library." },
];


export function pickProduct(text) {
  const q = text.toLowerCase();
  return PRODUCTS.find((p) => p.match.some((m) => q.includes(m)));
}

export function localReply(messages) {
  const last = [...messages].reverse().find((m) => m.role === "user")?.content ?? "";
  const product = pickProduct(last);
  if (product) return { ok: true, text: product.text, image: product.image };
  return {
    ok: true,
    text: "I can help you pick a Beep Co setup. Ask me about Orbit B3, Beep Pad, Beep Book, Ping, Beep Frame, or Beep Home for the house.",
  };
}

