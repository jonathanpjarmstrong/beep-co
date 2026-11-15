import {
  AirVent,
  Building2,
  Cpu,
  Headphones,
  Lamp,
  Laptop,
  Monitor,
  Smartphone,
  Sparkles,
  Speaker,
  Tablet,
} from "../components/icons";

const i = AirVent,
  a = Cpu,
  o = Headphones,
  s = Lamp,
  c = Laptop,
  l = Monitor,
  u = Speaker,
  d = Tablet,
  n = Smartphone,
  r = Building2,
  t = Sparkles;

var f = {
    midnight: { name: `Midnight`, swatch: `#1a1c1f` },
    gold: { name: `Gold`, swatch: `#c6a15b` },
    silver: { name: `Silver`, swatch: `#d7d9de` },
    blue: { name: `Ocean`, swatch: `#1e4e86` },
    sand: { name: `Sand`, swatch: `#c4b49a` },
    forest: { name: `Forest`, swatch: `#1f4d3a` },
    coral: { name: `Coral`, swatch: `#e07a5f` },
    violet: { name: `Violet`, swatch: `#5c3d86` },
    graphite: { name: `Graphite`, swatch: `#4a4e54` },
    starlight: { name: `Starlight`, swatch: `#f0e7d8` },
    stone: { name: `Stone`, swatch: `#9a958c` },
    cloud: { name: `Cloud`, swatch: `#d7dbe0` },
    copper: { name: `Copper`, swatch: `#b56a3a` },
    ice: { name: `Ice`, swatch: `#d5e1e6` },
    navy: { name: `Navy`, swatch: `#10243f` },
    amber: { name: `Amber`, swatch: `#e08a2c` },
    lilac: { name: `Lilac`, swatch: `#b7a0d4` },
    charcoal: { name: `Charcoal`, swatch: `#3c3a38` },
    cream: { name: `Cream`, swatch: `#f3ead8` },
    taupe: { name: `Taupe`, swatch: `#8c8175` },
    mist: { name: `Mist`, swatch: `#c5c9cc` },
    ivory: { name: `Ivory`, swatch: `#f3ead7` },
    winter: { name: `Winter`, swatch: `#d7e8ea` },
    orange: { name: `Nova Orange`, swatch: `#f05a12` },
    aurora: {
      name: `Aurora`,
      swatch: `linear-gradient(135deg, #7CFFB2, #5ee7ff, #7a4de0, #e2b4ff)`,
    },
    white: { name: `White`, swatch: `#f5f5f5` },
    black: { name: `Black`, swatch: `#161616` },
  };
function p(e, t, n, r = `v4`) {
  return t.map((t) => {
    let i = n
      ? n.map((n) => `/media/devices/${e}-${t}-${n}-${r}.jpg`)
      : [`/media/devices/${e}-${t}-${r}.jpg`];
    return {
      id: t,
      name: f[t].name,
      swatch: f[t].swatch,
      image: i[0],
      images: i,
    };
  });
}
var m = [`midnight`, `gold`, `silver`, `blue`, `orange`, `aurora`].map((e) => {
    let t =
        e === `blue`
          ? [
              `/media/devices/halo-blue-back-v23.jpg`,
              `/media/devices/halo-blue-screen-v23.jpg`,
              `/media/devices/halo-blue-side-v23.jpg`,
              `/media/devices/halo-blue-port-v23.jpg`,
            ]
          : e === `orange`
            ? [
                `/media/devices/halo-orange-back-v27.jpg`,
                `/media/devices/halo-orange-screen-v27.jpg`,
                `/media/devices/halo-orange-side-v27.jpg`,
                `/media/devices/halo-orange-port-v27.jpg`,
              ]
            : e === `aurora`
              ? [
                  `/media/devices/halo-aurora-back-v30.jpg`,
                  `/media/devices/halo-aurora-screen-v30.jpg`,
                  `/media/devices/halo-aurora-side-v30.jpg`,
                  `/media/devices/halo-aurora-port-v30.jpg`,
                ]
              : [
                  `/media/devices/halo-${e}-back-v4.jpg`,
                  `/media/devices/halo-${e}-screen-v15.jpg`,
                  `/media/devices/halo-${e}-side-v4.jpg`,
                  `/media/devices/halo-${e}-port-v6.jpg`,
                ],
      n =
        e === `orange`
          ? `/media/devices/halo-orange-box-v27.jpg`
          : e === `aurora`
            ? `/media/devices/halo-aurora-box-v30.jpg`
            : `/media/devices/halo-${e}-box-v18.jpg`;
    return {
      id: e,
      name: f[e].name,
      swatch: f[e].swatch,
      image: t[0],
      images: t,
      box: n,
      limited: e === `aurora`,
    };
  }),
  h = [`starlight`, `sand`, `stone`, `cloud`, `graphite`, `gold`].map((e) => {
    let t = [
      `/media/devices/slate-${e}-back-v17.jpg`,
      `/media/devices/slate-${e}-screen-v17.jpg`,
      `/media/devices/slate-${e}-side-v17.jpg`,
    ];
    return {
      id: e,
      name: f[e].name,
      swatch: f[e].swatch,
      image: t[0],
      images: t,
      box: `/media/devices/slate-${e}-box-v18.jpg`,
    };
  }),
  g = [`charcoal`, `cream`, `taupe`, `mist`, `ice`, `gold`].map((e) => {
    let t = [
      `/media/devices/deck-${e}-back-v18.jpg`,
      `/media/devices/deck-${e}-screen-v17.jpg`,
      `/media/devices/deck-${e}-thin-v17.jpg`,
    ];
    return {
      id: e,
      name: f[e].name,
      swatch: f[e].swatch,
      image: t[0],
      images: t,
      box: `/media/devices/deck-${e}-box-v18.jpg`,
    };
  }),
  _ = (e) => p(e, [`midnight`, `gold`, `silver`]),
  v = [`All`, `Consumer tech`, `Tablet`, `Computer`, `Beep Home`],
  y = [
    {
      id: `glass`,
      kind: `Consumer tech`,
      name: `Orbit B3`,
      line: `Third generation`,
      blurb: `Beep Co’s third phone. Choose Orbit B3, Orbit B3 Pro, or Orbit B3 Pro Max. The Orbit B3 Pro Max screen is larger than the Orbit B3 and the Orbit B3 Pro. Ember leads consumer tech. The screen is an OLED display, and Nova sits in the side button.`,
      icon: n,
      screen: `6.7-inch OLED display. True black. 120 times a second. Up to 2000 nits in the sun.`,
      finishes: m,
      storage: [
        {
          id: `128`,
          name: `128 GB`,
          detail: `Photos, school, music, and the apps you open every day.`,
        },
        {
          id: `256`,
          name: `256 GB`,
          detail: `Room for films, brick-build photos, and a big offline library.`,
        },
        {
          id: `512`,
          name: `512 GB`,
          detail: `A full year of video and every build you want to keep.`,
        },
        {
          id: `1024`,
          name: `1 TB`,
          detail: `The long archive. Films, photos, and projects stay on the phone.`,
        },
      ],
      battery: [
        {
          id: `day`,
          name: `Orbit B3`,
          detail: `Orbit B3. 6.1-inch screen. Up to 22 hours of use.`,
        },
        {
          id: `plus`,
          name: `Orbit B3 Pro`,
          detail: `Orbit B3 Pro. 6.7-inch screen. Up to 32 hours of use.`,
        },
        {
          id: `max`,
          name: `Orbit B3 Pro Max`,
          detail: `Orbit B3 Pro Max. 6.9-inch screen, larger than the Orbit B3 and the Orbit B3 Pro. Up to 40 hours of use.`,
        },
      ],
      included: [
        `Orbit B3`,
        `USB-C cable`,
        `Soft sleeve`,
        `Quick card from Ember`,
      ],
      box: `/media/devices/halo-box-v4.jpg`,
      specs: [
        { k: `Display`, v: `OLED, size depends on the model` },
        { k: `Brightness`, v: `2000 nits peak` },
        { k: `Chip`, v: `Nova, on the phone` },
        { k: `Camera`, v: `Two lenses in one island` },
        { k: `Back`, v: `Flowing lines and the Beep Co mark` },
        { k: `Side button`, v: `Hold to ask Nova` },
        { k: `Lead`, v: `Ember, consumer tech chief` },
        { k: `Body`, v: `Glass back, metal edge` },
      ],
    },
    {
      id: `slate`,
      kind: `Tablet`,
      name: `Beep Pad`,
      line: `The drawing board`,
      blurb: `A tablet for plans, photos, and brick builds. The screen is an OLED display. The pencil draws on the glass.`,
      icon: d,
      screen: `13-inch OLED display. Wide, bright, and true black when the page is dark. 120 times a second.`,
      finishes: h,
      storage: [
        {
          id: `128`,
          name: `128 GB`,
          detail: `Sketches, class notes, and a few films.`,
        },
        {
          id: `256`,
          name: `256 GB`,
          detail: `Build photos, plans, and a stack of reference films.`,
        },
        {
          id: `512`,
          name: `512 GB`,
          detail: `Whole projects stay on the slate, even offline.`,
        },
        { id: `1024`, name: `1 TB`, detail: `A studio archive in one slab.` },
      ],
      battery: [
        {
          id: `day`,
          name: `Day`,
          detail: `Up to 10 hours of drawing and reading.`,
        },
        {
          id: `plus`,
          name: `Plus`,
          detail: `Up to 14 hours. A long studio day.`,
        },
        {
          id: `max`,
          name: `Max`,
          detail: `Up to 18 hours with the larger cell.`,
        },
      ],
      included: [`Beep Pad`, `Beep Pencil`, `USB-C cable`, `Fold-flat cover`],
      box: `/media/devices/slate-box-v2.jpg`,
      specs: [
        { k: `Display`, v: `OLED, 13 inch, 120 Hz` },
        { k: `Pencil`, v: `Draws on the glass, low lag` },
        { k: `Camera`, v: `One lens on the back` },
        { k: `Chip`, v: `Nova for builds` },
        { k: `Cameras`, v: `Back camera and front camera` },
        { k: `Sound`, v: `Four quiet speakers` },
        { k: `Body`, v: `One thin metal frame` },
      ],
    },
    {
      id: `deck`,
      kind: `Computer`,
      name: `Beep Book`,
      line: `The desk computer`,
      blurb: `A quiet computer for films, school, and the company book. The screen is an OLED display. Nova sits in the keyboard row.`,
      icon: c,
      screen: `14-inch OLED display. Deep black for films. Bright enough for a sunny desk. 120 times a second.`,
      finishes: g,
      storage: [
        {
          id: `512`,
          name: `512 GB`,
          detail: `School, films, and the company book.`,
        },
        {
          id: `1024`,
          name: `1 TB`,
          detail: `A full edit bay of video on the desk.`,
        },
        {
          id: `2048`,
          name: `2 TB`,
          detail: `Years of projects without a second drive.`,
        },
      ],
      battery: [
        { id: `day`, name: `Day`, detail: `Up to 12 hours unplugged.` },
        {
          id: `plus`,
          name: `Plus`,
          detail: `Up to 18 hours. A work day and the evening.`,
        },
        {
          id: `max`,
          name: `Max`,
          detail: `Up to 24 hours with the larger cell.`,
        },
      ],
      included: [`Beep Book`, `USB-C cable`, `Desk cloth`, `Keyboard guide`],
      box: `/media/devices/deck-box-v2.jpg`,
      specs: [
        { k: `Display`, v: `OLED, 14 inch, 120 Hz` },
        { k: `Chip`, v: `Nova, full size` },
        { k: `Keys`, v: `Quiet, with a Nova key` },
        { k: `Fans`, v: `Nearly silent` },
        { k: `Ports`, v: `Two USB-C, one headphone` },
        { k: `Body`, v: `One slim metal slab` },
      ],
    },
    {
      id: `ping`,
      kind: `Consumer tech`,
      name: `Ping`,
      line: `The little pair`,
      blurb: `Earbuds with a glowing ring and no stem. They sit in a small case. White or black.`,
      icon: o,
      screen: `No screen. A light ring on each bud shows they are on.`,
      finishes: [`white`, `black`].map((e) => {
        let t = [
          `/media/devices/ping-${e}-case-v1.jpg`,
          `/media/devices/ping-${e}-angle-v1.jpg`,
        ];
        return {
          id: e,
          name: f[e].name,
          swatch: f[e].swatch,
          image: t[0],
          images: t,
          box: t[0],
        };
      }),
      storage: [{ id: `one`, name: ``, detail: `` }],
      battery: [{ id: `set`, name: ``, detail: `` }],
      included: [`Ping`, `Charge case`, `USB-C cable`],
      box: `/media/devices/ping-white-case-v1.jpg`,
      specs: [
        { k: `Buds`, v: `Pebble shape, no stem` },
        { k: `Ring`, v: `A soft glow` },
        { k: `Case`, v: `Rounded, in white or black` },
        { k: `Fit`, v: `Sits in the ear` },
      ],
    },
    {
      id: `canvas`,
      kind: `Computer`,
      name: `Beep Frame`,
      line: `The big screen`,
      blurb: `A large computer that is only the screen. It stands on a thin foot. There is no keyboard attached.`,
      icon: l,
      screen: `A big OLED display. Films fill the glass. The stand keeps it on the desk.`,
      finishes: [`silver`, `midnight`, `gold`].map((e) => {
        let t = [
          `/media/devices/canvas-${e}-front-v1.jpg`,
          `/media/devices/canvas-${e}-side-v1.jpg`,
        ];
        return {
          id: e,
          name: f[e].name,
          swatch: f[e].swatch,
          image: t[0],
          images: t,
          box: t[0],
        };
      }),
      storage: [
        {
          id: `512`,
          name: `512 GB`,
          detail: `School, films, and the company book.`,
        },
        {
          id: `1024`,
          name: `1 TB`,
          detail: `A full desk of video and photos.`,
        },
        {
          id: `2048`,
          name: `2 TB`,
          detail: `Years of projects on the screen.`,
        },
      ],
      battery: [{ id: `set`, name: ``, detail: `` }],
      included: [`Beep Frame`, `Power cord`, `Setup card`],
      box: `/media/devices/canvas-silver-front-v1.jpg`,
      specs: [
        { k: `Display`, v: `Large OLED screen` },
        { k: `Stand`, v: `A thin metal foot` },
        { k: `Keyboard`, v: `Not attached` },
        { k: `Chip`, v: `Nova, full size` },
      ],
    },
    {
      id: `hub`,
      kind: `Beep Home`,
      name: `Beep Pod`,
      line: `The home brain`,
      blurb: `A speaker that runs the house. You can put more than one in a home. The round screen shows your music, and the mesh stays around it. Plus and minus buttons match the speaker color. Winter is a limited edition.`,
      icon: u,
      screen: `A round screen on the front shows your music. It does not cover the whole speaker. Plus and minus sit below it, in the same color.`,
      finishes: p(
        `hub`,
        [`ivory`, `ice`, `winter`],
        [`front`, `top`, `angle`],
        `v26`,
      ).map((e) => ({
        ...e,
        name: e.id === `winter` ? `Winter edition` : e.name,
        box: `/media/devices/hub-${e.id}-box-v26.jpg`,
      })),
      storage: [{ id: `one`, name: ``, detail: `` }],
      battery: [{ id: `set`, name: ``, detail: `` }],
      included: [`Beep Pod`, `USB-C cable`, `Setup card`],
      box: `/media/devices/hub-box-v2.jpg`,
      specs: [
        { k: `Display`, v: `Round music screen` },
        { k: `Buttons`, v: `Plus and minus, same color` },
        { k: `Body`, v: `All speaker` },
        { k: `Runs`, v: `Lights, air, and quiet` },
        { k: `More`, v: `You can use more than one` },
        { k: `Does not`, v: `Watch or film you` },
        { k: `Speaks`, v: `Only if you ask Nova` },
        { k: `Lead`, v: `Marin, Beep Home` },
      ],
    },
    {
      id: `view`,
      kind: `Beep Home`,
      name: `BeepView`,
      line: `On the island`,
      blurb: `Sits on the kitchen island. The screen shows your rooms. The speaker beside it plays music, and you can ask it to change the lights, the air, or the song.`,
      icon: l,
      screen: `OLED display. It shows the rooms, the lights, and the sound. The speaker is right beside the screen.`,
      finishes: _(`view`),
      storage: [{ id: `one`, name: ``, detail: `` }],
      battery: [{ id: `set`, name: ``, detail: `` }],
      included: [`BeepView`, `Island cord`, `Quick card`],
      box: `/media/devices/view-box-v4.jpg`,
      specs: [
        { k: `Display`, v: `OLED, on the island` },
        { k: `Speaker`, v: `Built in, beside the screen` },
        { k: `Runs`, v: `Lights, air, and music` },
        { k: `Place`, v: `Kitchen island` },
        { k: `Lead`, v: `Marin, Beep Home` },
      ],
    },
    {
      id: `arc`,
      kind: `Beep Home`,
      name: `Arc Light`,
      line: `Smart lamp and drive`,
      blurb: `A warm smart lamp. Tap your phone to the metal. A scanner is set into the lamp, so files move onto it like a hard drive. The light still glows.`,
      icon: s,
      screen: `A warm lamp, not a big screen. A small mark shows how bright it is. The scanner is in the metal, where you tap the phone.`,
      finishes: _(`arc`),
      storage: [{ id: `one`, name: ``, detail: `` }],
      battery: [{ id: `set`, name: ``, detail: `` }],
      included: [`Arc Light`, `Desk cord`, `Felt pad`],
      box: `/media/devices/arc-box-v2.jpg`,
      specs: [
        { k: `Light`, v: `Warm glow you can dim` },
        { k: `Drive`, v: `Tap your phone to move files` },
        { k: `Scanner`, v: `Set into the metal` },
        { k: `Body`, v: `One piece of metal` },
      ],
    },
    {
      id: `pod`,
      kind: `Beep Home`,
      name: `Room Pod`,
      line: `Sound that docks`,
      blurb: `A small speaker for one room. Click two of them together when you want the same song in both places. The music stays in the room you picked.`,
      icon: u,
      screen: `A small OLED dot. It glows when the pod is awake. No words on the face.`,
      finishes: _(`pod`),
      storage: [{ id: `one`, name: ``, detail: `` }],
      battery: [{ id: `set`, name: ``, detail: `` }],
      included: [`Room Pod`, `Dock ring`, `Short cord`],
      box: `/media/devices/pod-box-v2.jpg`,
      specs: [
        { k: `Display`, v: `OLED status dot` },
        { k: `Sound`, v: `Clear, not shouty` },
        { k: `Dock`, v: `Pods lock in a row` },
        { k: `Ask`, v: `Nova picks the room` },
      ],
    },
    {
      id: `fin`,
      kind: `Beep Home`,
      name: `Climate Fin`,
      line: `Air, kept even`,
      blurb: `A slim piece on the wall. It holds the room at the temperature you set, and a thin light shows that it is working.`,
      icon: i,
      screen: `A thin OLED line along the edge. It glows softly while the fin is on.`,
      finishes: _(`fin`),
      storage: [{ id: `one`, name: ``, detail: `` }],
      battery: [{ id: `set`, name: ``, detail: `` }],
      included: [`Climate Fin`, `Wall plate`, `Setup card`],
      box: `/media/devices/fin-box-v2.jpg`,
      specs: [
        { k: `Display`, v: `OLED edge line` },
        { k: `Job`, v: `Keeps the air even` },
        { k: `Look`, v: `A thin metal fin` },
        { k: `Brain`, v: `Beep Pod` },
      ],
    },
  ];
function b(e) {
  return y.find((t) => t.id === e);
}
var x = [
    {
      id: `gate`,
      level: `01`,
      name: `Gate`,
      line: `Where the coast meets the building`,
      note: `The first floor opens onto the water. Visitors come in here. The light is low and gold.`,
      rooms: [
        { icon: r, name: `Water hall`, note: `Glass walls. Pacific outside.` },
        { icon: t, name: `Welcome desk`, note: `A quiet hello. No rush.` },
        { icon: s, name: `Lookout`, note: `A long window on the coast.` },
      ],
    },
    {
      id: `works`,
      level: `02`,
      name: `Works`,
      line: `Phones, tablets, computers`,
      note: `This floor builds Orbit B3, Beep Pad, and Beep Book. Benches are quiet and bright.`,
      rooms: [
        {
          icon: n,
          name: `Phone line`,
          note: `Ember is the consumer tech chief.`,
        },
        { icon: d, name: `Pad studio`, note: `Big drawings, real tablets.` },
        { icon: c, name: `Book lab`, note: `Computers, tested all day.` },
      ],
    },
    {
      id: `hearth`,
      level: `03`,
      name: `Hearth`,
      line: `Beep Home`,
      note: `Lamps, pods, and the hub that runs a house. Nothing here watches people.`,
      rooms: [
        { icon: s, name: `Light room`, note: `Arc Lights in a row.` },
        { icon: u, name: `Sound bay`, note: `Pods click together.` },
        { icon: a, name: `Hub bench`, note: `The home brain, tested.` },
        {
          icon: l,
          name: `Island bench`,
          note: `BeepView, display and speaker.`,
        },
      ],
    },
    {
      id: `crown`,
      level: `04`,
      name: `Crown`,
      line: `Nova and the High Desk`,
      note: `The top floor. Lumen leads Nova here. Cucumber runs the High Desk. Ember is the consumer tech chief.`,
      rooms: [
        { icon: t, name: `Nova core`, note: `Lumen is the AI chief.` },
        {
          icon: c,
          name: `High Desk`,
          note: `Cucumber is level 7. The other droids are level 5.`,
        },
        { icon: r, name: `Map room`, note: `All four floors, on one wall.` },
      ],
    },
  ],
  S = {
    name: `The High Desk`,
    line: `Five droids at one desk.`,
    place: `Floor 4, the Crown`,
    coast: `Off the coast of British Columbia, Canada`,
  },
  C = [
    {
      id: `cucumber`,
      name: `Cucumber`,
      color: `White, blue, and gold`,
      job: `The desk`,
      photo: `/media/droid-cucumber-main.jpg`,
      level: 7,
      note: `Level 7. He runs the High Desk. The phones are not his.`,
    },
    {
      id: `lumen`,
      name: `Lumen`,
      color: `Silver and black`,
      job: `AI chief`,
      photo: `/media/droid-lumen-angle.jpg`,
      level: 5,
      note: `Level 5. He leads Nova.`,
    },
    {
      id: `ember`,
      name: `Ember`,
      color: `Copper and gold`,
      job: `Consumer tech chief`,
      photo: `/media/droid-ember-clear.jpg`,
      level: 5,
      note: `Level 5. He leads the phones.`,
    },
    {
      id: `marin`,
      name: `Marin`,
      color: `Ocean blue`,
      job: `Beep Home`,
      photo: `/media/droid-marin-angle.jpg`,
      level: 5,
      note: `Level 5. He looks after Beep Home.`,
    },
    {
      id: `t6`,
      name: `T6`,
      color: `Red head, white and blue body`,
      job: `Head of product design`,
      photo: `/media/droid-scarlet.jpg`,
      level: 5,
      note: `Level 5. He leads product design.`,
    },
  ],
  w = {
    glass: {
      storage: { 128: 1199, 256: 1299, 512: 1499, 1024: 1699 },
      battery: { day: 0, plus: 200, max: 400 },
      care: 149,
      gold: 100,
    },
    slate: {
      storage: { 128: 1099, 256: 1299, 512: 1499, 1024: 1899 },
      battery: { day: 0, plus: 80, max: 120 },
      care: 129,
      gold: 100,
    },
    deck: {
      storage: { 512: 1599, 1024: 1899, 2048: 2299 },
      battery: { day: 0, plus: 100, max: 200 },
      care: 199,
      gold: 200,
    },
    hub: { storage: { one: 199 }, battery: { set: 0 }, care: 29, gold: 0 },
    arc: { storage: { one: 129 }, battery: { set: 0 }, care: 19, gold: 0 },
    pod: { storage: { one: 159 }, battery: { set: 0 }, care: 19, gold: 0 },
    fin: { storage: { one: 549 }, battery: { set: 0 }, care: 49, gold: 40 },
    view: { storage: { one: 349 }, battery: { set: 0 }, care: 39, gold: 0 },
    ping: { storage: { one: 199 }, battery: { set: 0 }, care: 29, gold: 0 },
    canvas: {
      storage: { 512: 1799, 1024: 2099, 2048: 2499 },
      battery: { set: 0 },
      care: 199,
      gold: 150,
    },
  };
function T(e) {
  return `$${e.toLocaleString(`en-US`)}`;
}
function E(e) {
  return w[e]?.care ?? 0;
}
function D(e) {
  return w[e]?.gold ?? 0;
}
var O = { b5: 0, pro: 200, max: 400 };
function k(e, t, n, r, i = ``, a = ``) {
  let o = w[e];
  if (!o) return 0;
  let s = i === `gold` ? o.gold : 0,
    c = e === `glass` ? (O[a] ?? 0) : 0;
  return (o.storage[t] ?? 0) + (o.battery[n] ?? 0) + (r ? o.care : 0) + s + c;
}

export const finishColors = f;
export const kinds = v;
export const lineup = y;
export const getDevice = b;
export const floors = x;
export const highDesk = S;
export const droids = C;
export const prices = w;
export const formatPrice = T;
export const carePrice = E;
export const goldPrice = D;
export const priceFor = k;
export {
  d as TabletIcon,
  l as MonitorIcon,
  o as HeadphonesIcon,
  s as LampIcon,
  c as LaptopIcon,
};
