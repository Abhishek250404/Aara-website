// // import { useEffect, useState } from "react";
// // import { AnimatePresence, motion } from "motion/react";
// // import { useLenis } from "lenis/react";
// // import { CURTAIN_EASE, EASE, KolamMotif } from "./motionKit";

// // const LETTERS = ["A", "a", "r", "a"];

// // export default function Preloader({ onReveal }) {
// //   const [show, setShow] = useState(true);
// //   const lenis = useLenis();

// //   useEffect(() => {
// //     window.scrollTo(0, 0);
// //     const t = setTimeout(() => {
// //       setShow(false);
// //       onReveal?.();
// //     }, 2100);
// //     return () => clearTimeout(t);
// //     // eslint-disable-next-line react-hooks/exhaustive-deps
// //   }, []);

// //   useEffect(() => {
// //     if (!lenis) return;
// //     if (show) lenis.stop();
// //     else lenis.start();
// //   }, [lenis, show]);

// //   return (
// //     <AnimatePresence>
// //       {show && (
// //         <motion.div
// //           key="curtain-back"
// //           aria-hidden="true"
// //           className="fixed inset-0 z-[119] bg-[#5A1020]"
// //           exit={{ y: "-100%", transition: { duration: 1.05, ease: CURTAIN_EASE, delay: 0.14 } }}
// //         />
// //       )}

// //       {show && (
// //         <motion.div
// //           key="curtain-front"
// //           role="status"
// //           aria-label="Loading Aara Makeovers"
// //           className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#0E0B09] text-[#F4ECDF]"
// //           exit={{ y: "-100%", transition: { duration: 0.95, ease: CURTAIN_EASE } }}
// //         >
// //           <motion.div
// //             initial={{ rotate: -40, scale: 0.85 }}
// //             animate={{ rotate: 0, scale: 1 }}
// //             transition={{ duration: 2, ease: EASE }}
// //             className="absolute h-[70vmin] w-[70vmin] text-[#D5A653]/25"
// //           >
// //             <KolamMotif play duration={1.8} className="h-full w-full" />
// //           </motion.div>

// //           <div className="relative flex font-display text-[clamp(4.5rem,16vw,10rem)] font-medium leading-none">
// //             {LETTERS.map((l, i) => (
// //               <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
// //                 <motion.span
// //                   className="inline-block text-gold-gradient"
// //                   initial={{ y: "110%" }}
// //                   animate={{ y: "0%" }}
// //                   transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: EASE }}
// //                 >
// //                   {l}
// //                 </motion.span>
// //               </span>
// //             ))}
// //           </div>

// //           <motion.p
// //             initial={{ opacity: 0, letterSpacing: "0.6em" }}
// //             animate={{ opacity: 1, letterSpacing: "0.32em" }}
// //             transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
// //             className="relative mt-1 font-display text-lg italic text-[#F4ECDF]/70 sm:text-xl"
// //           >
// //             makeovers
// //           </motion.p>

// //           <div className="relative mt-10 h-px w-40 overflow-hidden bg-[#F4ECDF]/10">
// //             <motion.span
// //               className="absolute inset-0 origin-left bg-[#D5A653]"
// //               initial={{ scaleX: 0 }}
// //               animate={{ scaleX: 1 }}
// //               transition={{ duration: 1.7, ease: [0.65, 0, 0.35, 1] }}
// //             />
// //           </div>
// //         </motion.div>
// //       )}
// //     </AnimatePresence>
// //   );
// // }
// import { useEffect, useState } from "react";
// import { AnimatePresence, motion, useReducedMotion } from "motion/react";
// import { useLenis } from "lenis/react";
// import { CURTAIN_EASE, EASE } from "./motionKit";

// const LETTERS = ["A", "a", "r", "a"];
// const TOTAL_MS = 2600;

// /* ─────────────────────────────────────────────
//    Geometry: upper eyelid = quadratic curve
//    P0 (outer-left corner) → P1 (control) → P2 (outer-right corner)
//    viewBox 600 × 360, centre of the screen = (300, 180)
//    ───────────────────────────────────────────── */
// const P0 = [90, 200];
// const P1 = [300, 40];
// const P2 = [510, 200];

// const f = (n) => n.toFixed(1);
// const qp = (t) => [
//   (1 - t) ** 2 * P0[0] + 2 * (1 - t) * t * P1[0] + t * t * P2[0],
//   (1 - t) ** 2 * P0[1] + 2 * (1 - t) * t * P1[1] + t * t * P2[1],
// ];
// const qd = (t) => [
//   2 * (1 - t) * (P1[0] - P0[0]) + 2 * t * (P2[0] - P1[0]),
//   2 * (1 - t) * (P1[1] - P0[1]) + 2 * t * (P2[1] - P1[1]),
// ];

// // Lashes: grow outward from the lid, outer lashes longer and curling sideways.
// // Each path starts at the TIP (where a kolam dot lands) and ends on the lid,
// // so drawing it looks like the dot "shooting in" and joining the eye.
// const LASH_COUNT = 11;
// const LASHES = Array.from({ length: LASH_COUNT }, (_, i) => {
//   const t = 0.12 + (i * 0.76) / (LASH_COUNT - 1);
//   const [bx, by] = qp(t);
//   const [dx, dy] = qd(t);
//   const len = Math.hypot(dx, dy);
//   const ux = dx / len;
//   const uy = dy / len;
//   const nx = uy; // outward (upward) normal
//   const ny = -ux;
//   const s = t - 0.5;
//   const L = 34 + 70 * Math.abs(s);
//   const tip = [bx + nx * L + ux * s * L * 1.6, by + ny * L + uy * s * L * 1.6];
//   const c = [bx + nx * L * 0.8, by + ny * L * 0.8];
//   return {
//     tip,
//     d: `M${f(tip[0])} ${f(tip[1])} Q${f(c[0])} ${f(c[1])} ${f(bx)} ${f(by)}`,
//   };
// });

// // Kolam pulli grid: 13 dots in a diamond (1-3-5-3-1)
// const GRID = [];
// for (let gy = -2; gy <= 2; gy++) {
//   for (let gx = -2; gx <= 2; gx++) {
//     if (Math.abs(gx) + Math.abs(gy) <= 2) GRID.push([300 + gx * 28, 180 + gy * 28]);
//   }
// }
// GRID.sort((a, b) => a[0] - b[0] || a[1] - b[1]);

// // 13 targets: left corner, 11 lash tips, right corner
// const TARGETS = [P0, ...LASHES.map((l) => l.tip), P2];

// // Outer dots travel first so the lid can start drawing from the corners
// const moveDelay = (i) => 0.95 + (6 - Math.abs(i - 6)) * 0.03;
// const MOVE_DUR = 0.75;
// const LID_START = 1.6;
// const LID_DUR = 0.6;
// const MEET = LID_START + LID_DUR; // when both lid halves meet in the centre

// const MID = qp(0.5); // (300, 120)
// const LID_LEFT = `M${P0[0]} ${P0[1]} Q${(P0[0] + P1[0]) / 2} ${(P0[1] + P1[1]) / 2} ${MID[0]} ${MID[1]}`;
// const LID_RIGHT = `M${P2[0]} ${P2[1]} Q${(P2[0] + P1[0]) / 2} ${(P2[1] + P1[1]) / 2} ${MID[0]} ${MID[1]}`;
// const LOW_LEFT = "M90 200 Q195 245 300 245";
// const LOW_RIGHT = "M510 200 Q405 245 300 245";

// function KolamLash({ reduced }) {
//   const draw = (delay, duration) => ({
//     initial: { pathLength: reduced ? 1 : 0 },
//     animate: { pathLength: 1 },
//     transition: { duration: reduced ? 0 : duration, delay: reduced ? 0 : delay, ease: EASE },
//   });

//   return (
//     <svg viewBox="0 0 600 360" fill="none" className="h-full w-full" aria-hidden="true">
//       {/* 1 · Kolam frame around the dots — draws, then dissolves */}
//       {!reduced && (
//         <motion.g
//           initial={{ opacity: 0 }}
//           animate={{ opacity: [0, 0.55, 0.55, 0] }}
//           transition={{ duration: 1.45, delay: 0.1, times: [0, 0.1, 0.6, 1] }}
//           stroke="currentColor"
//           strokeWidth="1.6"
//           strokeLinecap="round"
//         >
//           <g transform="rotate(45 300 180)">
//             <motion.rect x="244.85" y="124.85" width="110.3" height="110.3" rx="22" {...draw(0.15, 0.8)} />
//           </g>
//           {[
//             [210, 180],
//             [390, 180],
//             [300, 90],
//             [300, 270],
//           ].map(([cx, cy], i) => (
//             <motion.circle key={i} cx={cx} cy={cy} r="12" {...draw(0.35 + i * 0.06, 0.55)} />
//           ))}
//         </motion.g>
//       )}

//       {/* 2 · Lid + lower lid: two halves draw from the corners and join in the middle */}
//       <g stroke="currentColor" strokeLinecap="round">
//         <motion.path d={LID_LEFT} strokeWidth="2.6" strokeOpacity="0.85" {...draw(LID_START, LID_DUR)} />
//         <motion.path d={LID_RIGHT} strokeWidth="2.6" strokeOpacity="0.85" {...draw(LID_START, LID_DUR)} />
//         <motion.path d={LOW_LEFT} strokeWidth="1.4" strokeOpacity="0.35" {...draw(LID_START + 0.1, LID_DUR)} />
//         <motion.path d={LOW_RIGHT} strokeWidth="1.4" strokeOpacity="0.35" {...draw(LID_START + 0.1, LID_DUR)} />
//       </g>

//       {/* 3 · Lashes: shoot from each landed dot into the lid */}
//       <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeOpacity="0.75">
//         {LASHES.map((lash, i) => (
//           <motion.path
//             key={i}
//             d={lash.d}
//             {...draw(moveDelay(i + 1) + MOVE_DUR - 0.15, 0.45)}
//           />
//         ))}
//       </g>

//       {/* 4 · Kolam dots: pop in as a pulli grid, then travel to the lash tips */}
//       <g fill="currentColor">
//         {GRID.map((from, i) => {
//           const to = TARGETS[i];
//           const popDelay = 0.05 + (Math.abs(from[0] - 300) + Math.abs(from[1] - 180)) * 0.003;
//           if (reduced) return <circle key={i} cx={to[0]} cy={to[1]} r="3" />;
//           return (
//             <motion.circle
//               key={i}
//               initial={{ cx: from[0], cy: from[1], r: 0 }}
//               animate={{ cx: to[0], cy: to[1], r: [0, 4.5, 4.5, 3] }}
//               transition={{
//                 r: { duration: 2, delay: popDelay, times: [0, 0.15, 0.8, 1] },
//                 cx: { duration: MOVE_DUR, delay: moveDelay(i), ease: EASE },
//                 cy: { duration: MOVE_DUR, delay: moveDelay(i), ease: EASE },
//               }}
//             />
//           );
//         })}
//       </g>

//       {/* 5 · Glint where the lid halves meet */}
//       {!reduced && (
//         <motion.circle
//           cx={MID[0]}
//           cy={MID[1]}
//           fill="currentColor"
//           initial={{ r: 0, opacity: 0 }}
//           animate={{ r: [0, 8, 0], opacity: [0, 1, 0] }}
//           transition={{ duration: 0.55, delay: MEET - 0.05, ease: "easeOut" }}
//         />
//       )}
//     </svg>
//   );
// }

// export default function Preloader({ onReveal }) {
//   const [show, setShow] = useState(true);
//   const lenis = useLenis();
//   const reduced = useReducedMotion();

//   useEffect(() => {
//     window.scrollTo(0, 0);
//     const t = setTimeout(() => {
//       setShow(false);
//       onReveal?.();
//     }, TOTAL_MS);
//     return () => clearTimeout(t);
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   useEffect(() => {
//     if (!lenis) return;
//     if (show) lenis.stop();
//     else lenis.start();
//   }, [lenis, show]);

//   return (
//     <AnimatePresence>
//       {show && (
//         <motion.div
//           key="curtain-back"
//           aria-hidden="true"
//           className="fixed inset-0 z-[119] bg-[#5A1020]"
//           exit={{ y: "-100%", transition: { duration: 1.05, ease: CURTAIN_EASE, delay: 0.14 } }}
//         />
//       )}

//       {show && (
//         <motion.div
//           key="curtain-front"
//           role="status"
//           aria-label="Loading Aara Makeovers"
//           className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#0E0B09] text-[#F4ECDF]"
//           exit={{ y: "-100%", transition: { duration: 0.95, ease: CURTAIN_EASE } }}
//         >
//           {/* Kolam → eyelash, centred behind the wordmark */}
//           <motion.div
//             initial={{ scale: 0.94 }}
//             animate={{ scale: 1 }}
//             transition={{ duration: 2.4, ease: EASE }}
//             className="pointer-events-none absolute left-1/2 top-1/2 aspect-[600/360] w-[min(96vw,820px)] -translate-x-1/2 -translate-y-1/2 text-[#D5A653]/60"
//           >
//             <KolamLash reduced={reduced} />
//           </motion.div>

//           <div className="relative flex font-display text-[clamp(4.5rem,16vw,10rem)] font-medium leading-none">
//             {LETTERS.map((l, i) => (
//               <span key={i} className="inline-block overflow-hidden pb-[0.1em]">
//                 <motion.span
//                   className="inline-block text-gold-gradient"
//                   initial={{ y: "110%" }}
//                   animate={{ y: "0%" }}
//                   transition={{ duration: 1, delay: 0.2 + i * 0.08, ease: EASE }}
//                 >
//                   {l}
//                 </motion.span>
//               </span>
//             ))}
//           </div>

//           <motion.p
//             initial={{ opacity: 0, letterSpacing: "0.6em" }}
//             animate={{ opacity: 1, letterSpacing: "0.32em" }}
//             transition={{ duration: 1.2, delay: 0.6, ease: EASE }}
//             className="relative mt-1 font-display text-lg italic text-[#F4ECDF]/70 sm:text-xl"
//           >
//             makeovers
//           </motion.p>

//           <div className="relative mt-10 h-px w-40 overflow-hidden bg-[#F4ECDF]/10">
//             <motion.span
//               className="absolute inset-0 origin-left bg-[#D5A653]"
//               initial={{ scaleX: 0 }}
//               animate={{ scaleX: 1 }}
//               transition={{ duration: (TOTAL_MS - 300) / 1000, ease: [0.65, 0, 0.35, 1] }}
//             />
//           </div>
//         </motion.div>
//       )}
//     </AnimatePresence>
//   );
// }


import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useLenis } from "lenis/react";
import { CURTAIN_EASE, EASE } from "./motionKit";

/*  Aara Makeovers — preloader
    Story: pulli dots + kolam  →  dots glide to the lash tips  →  lid, lashes and brow
    draw in and "join" the dots  →  "Aara" is written in script  →  gold sheen  →  curtain.
    The mark is redrawn from the Aara logo: closed eye, feathered brow, sweeping lashes,
    double gold ring on a smoky disc.                                                     */

// Script face for "Aara". Swap for the logo's exact font if you have it.
// Load it once in index.html:
// <link href="https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap" rel="stylesheet">
const SCRIPT_FONT = '"Great Vibes", "Allura", cursive';

/* GEO-START */
// 1 = default pace. 0.8 = 20% faster, 1.2 = slower. Everything scales together.
const SPEED = 1;
const BASE = {
  disc: 0.05,
  ring: 0.1,
  ringDur: 1.4,
  dotsIn: 0.25,
  kolam: 0.35,
  kolamDur: 0.7,
  kolamOut: 1.2,
  travel: 1.25,
  travelDur: 0.75,
  lid: 1.9,
  lidDur: 0.6,
  lashSweep: 0.55,
  lashDur: 0.5,
  brow: 2.05,
  browSweep: 0.75,
  hairDur: 0.35,
  word: 2.75,
  wordDur: 1.0,
  sheen: 3.2,
  sheenDur: 0.9,
  sparkle: 3.5,
  exit: 4.1,
};
const T = Object.fromEntries(Object.entries(BASE).map(([k, v]) => [k, v * SPEED]));
const SILK = [0.65, 0, 0.35, 1];

// viewBox 600 × 600, badge centre (300, 300)
const f = (n) => n.toFixed(1);
const P = (p) => `${f(p[0])} ${f(p[1])}`;
const lerp = (a, b, k) => [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k];
const q = (a, c, b, t) => [
  (1 - t) ** 2 * a[0] + 2 * (1 - t) * t * c[0] + t * t * b[0],
  (1 - t) ** 2 * a[1] + 2 * (1 - t) * t * c[1] + t * t * b[1],
];
const qd = (a, c, b, t) => [
  2 * (1 - t) * (c[0] - a[0]) + 2 * t * (b[0] - c[0]),
  2 * (1 - t) * (c[1] - a[1]) + 2 * t * (b[1] - c[1]),
];
let seed = 11;
const rand = () => (seed = (seed * 16807) % 2147483647) / 2147483647;

// Tapered stroke: thick root, needle tip
const tapered = (root, c, tip, hw) => {
  const vx = c[0] - root[0];
  const vy = c[1] - root[1];
  const vl = Math.hypot(vx, vy) || 1;
  const px = -vy / vl;
  const py = vx / vl;
  return (
    `M${f(root[0] + px * hw)} ${f(root[1] + py * hw)} ` +
    `Q${f(c[0] + px * hw * 0.55)} ${f(c[1] + py * hw * 0.55)} ${P(tip)} ` +
    `Q${f(c[0] - px * hw * 0.55)} ${f(c[1] - py * hw * 0.55)} ${f(root[0] - px * hw)} ${f(root[1] - py * hw)} Z`
  );
};

/* Closed lid: a solid gold band, blunt at the inner corner, tapering to the outer corner */
const LID_TOP = [[160, 240], [292, 222], [432, 284]];
const LASH_LINE = [[164, 268], [290, 314], [432, 284]];
const LID = `M${P(LID_TOP[0])} Q${P(LID_TOP[1])} ${P(LID_TOP[2])} Q${P(LASH_LINE[1])} ${P(LASH_LINE[0])} Z`;
const LID_SPINE = "M148 254 Q292 268 446 284";

/* Lashes hang from the lash line, short at the inner corner, long and sweeping right outside */
const lashStart = (t) => T.lid + T.lashSweep * t;
const makeLash = (t, scaleL, dA, hw) => {
  const b = q(...LASH_LINE, t);
  const [dx, dy] = qd(...LASH_LINE, t);
  const len = Math.hypot(dx, dy);
  const ux = dx / len;
  const uy = dy / len;
  const nx = -uy; // downward normal
  const ny = ux;
  const L = (32 + 84 * Math.exp(-(((t - 0.7) / 0.36) ** 2))) * scaleL;
  const a = ((-30 + 105 * t ** 1.3 + dA) * Math.PI) / 180;
  const dirx = nx * Math.cos(a) + ux * Math.sin(a);
  const diry = ny * Math.cos(a) + uy * Math.sin(a);
  const tip = [b[0] + dirx * L, b[1] + diry * L];
  const c = [b[0] + nx * L * 0.6, b[1] + ny * L * 0.6];
  const root = [b[0] - nx * 3, b[1] - ny * 3];
  return { t, tip, spine: `M${P(root)} Q${P(c)} ${P(tip)}`, shape: tapered(root, c, tip, hw) };
};
const MAIN_LASHES = Array.from({ length: 13 }, (_, i) => makeLash(0.03 + (i * 0.94) / 12, 1, 0, 2.3));
const FINE_LASHES = MAIN_LASHES.map((l) => ({ ...makeLash(Math.min(0.99, l.t + 0.025), 0.8, 7, 1.3), t: l.t }));
const WISP_LASHES = MAIN_LASHES.map((l) => ({ ...makeLash(Math.max(0.01, l.t - 0.015), 0.66, -6, 1), t: l.t }));
const ALL_LASHES = [
  ...WISP_LASHES.map((l) => ({ ...l, delay: lashStart(l.t) + 0.06 * SPEED })),
  ...FINE_LASHES.map((l) => ({ ...l, delay: lashStart(l.t) + 0.04 * SPEED })),
  ...MAIN_LASHES.map((l) => ({ ...l, delay: lashStart(l.t) })),
];

/* Brow: a soft body plus 92 hair strokes feathered along the arch */
const BROW_UP = [[166, 190], [340, 76], [460, 208]];
const BROW_LO = [[164, 238], [330, 130], [460, 208]];
const BROW_BODY = `M${P(BROW_UP[0])} Q${P(BROW_UP[1])} ${P(BROW_UP[2])} Q${P(BROW_LO[1])} ${P(BROW_LO[0])} Z`;
const HAIR_COUNT = 92;
const HAIRS = Array.from({ length: HAIR_COUNT }, (_, k) => {
  const u = Math.min(0.995, Math.max(0, k / (HAIR_COUNT - 1) + (rand() - 0.5) * 0.01));
  const ut = Math.min(1, u + 0.015 + 0.07 * Math.min(1, u / 0.3));
  const base = lerp(q(...BROW_LO, u), q(...BROW_UP, u), rand() * 0.35);
  const tip = lerp(q(...BROW_UP, ut), q(...BROW_LO, ut), rand() * 0.18);
  const vx = tip[0] - base[0];
  const vy = tip[1] - base[1];
  const vl = Math.hypot(vx, vy) || 1;
  const c = [(base[0] + tip[0]) / 2 + (vy / vl) * 3, (base[1] + tip[1]) / 2 - (vx / vl) * 3];
  return {
    d: `M${P(base)} Q${P(c)} ${P(tip)}`,
    w: 0.9 + 1.9 * (1 - u) ** 0.8,
    delay: T.brow + u * T.browSweep + rand() * 0.06 * SPEED,
  };
});

/* Kolam: 13-dot pulli diamond with three weaving loops */
const KC = [300, 292];
const GAP = 34;
const GRID = [];
for (let gy = -2; gy <= 2; gy++) {
  for (let gx = -2; gx <= 2; gx++) {
    const ring = Math.abs(gx) + Math.abs(gy);
    if (ring <= 2) GRID.push({ p: [KC[0] + gx * GAP, KC[1] + gy * GAP], pop: T.dotsIn + ring * 0.07 * SPEED });
  }
}
GRID.sort((a, b) => a.p[0] - b.p[0] || a.p[1] - b.p[1]);
const polar = (fn, n = 260) => {
  let d = "";
  for (let k = 0; k <= n; k++) {
    const th = (k / n) * Math.PI * 2;
    const r = fn(th);
    d += `${k ? "L" : "M"}${f(KC[0] + r * Math.cos(th))} ${f(KC[1] + r * Math.sin(th))}`;
  }
  return `${d}Z`;
};
const KOLAM = [
  polar(() => 8, 48),
  polar((th) => 27 + 14 * Math.cos(4 * th)),
  polar((th) => 58 + 10 * Math.cos(4 * th) + 17 * Math.cos(8 * th)),
];

/* Each pulli dot travels to one lash tip, then melts in when that lash reaches it */
const DOTS = GRID.map(({ p: from, pop }, i) => {
  const lash = MAIN_LASHES[i];
  const to = lash.tip;
  const vx = to[0] - from[0];
  const vy = to[1] - from[1];
  const vl = Math.hypot(vx, vy) || 1;
  const bend = Math.min(70, vl * 0.4);
  const mid = [(from[0] + to[0]) / 2 - (vy / vl) * bend, (from[1] + to[1]) / 2 + (vx / vl) * bend];
  const start = T.travel + (6 - Math.abs(i - 6)) * 0.03 * SPEED;
  const end = start + T.travelDur;
  const merge = lashStart(lash.t) + T.lashDur;
  const k = [pop, pop + 0.35 * SPEED, end, Math.max(end + 0.01, merge - 0.08), merge + 0.15];
  const span = k[4] - k[0];
  return { from, to, mid, start, rDelay: pop, rDur: span, rTimes: k.map((v) => (v - k[0]) / span) };
});

const SPARK_AT = MAIN_LASHES[MAIN_LASHES.length - 1].tip;
/* GEO-END */

const STAR = "M0 -10 C1 -2 2 -1 10 0 C2 1 1 2 0 10 C-1 2 -2 1 -10 0 C-2 -1 -1 -2 0 -10 Z";
const GRAIN =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")";

/* ─────────────────────────────────────────────
   The mark
   ───────────────────────────────────────────── */
function AaraMark({ reduced }) {
  const draw = (delay, duration, ease = EASE) =>
    reduced
      ? { initial: false, animate: { pathLength: 1 } }
      : { initial: { pathLength: 0 }, animate: { pathLength: 1 }, transition: { duration, delay, ease } };
  const fadeIn = (delay, duration, to = 1) =>
    reduced
      ? { initial: false, animate: { opacity: to } }
      : { initial: { opacity: 0 }, animate: { opacity: to }, transition: { duration, delay, ease: EASE } };

  return (
    <svg viewBox="0 0 600 600" fill="none" overflow="visible" className="h-full w-full" aria-hidden="true">
      <defs>
        <linearGradient id="aara-gold" gradientUnits="userSpaceOnUse" x1="140" y1="110" x2="470" y2="500">
          <stop offset="0" stopColor="#8A5A17" />
          <stop offset="0.3" stopColor="#E9C25A" />
          <stop offset="0.5" stopColor="#FFF0A8" />
          <stop offset="0.72" stopColor="#D4A23A" />
          <stop offset="1" stopColor="#7A4E14" />
        </linearGradient>
        <linearGradient id="aara-ring" gradientUnits="userSpaceOnUse" x1="20" y1="20" x2="580" y2="580">
          <stop offset="0" stopColor="#F7DC86" />
          <stop offset="0.25" stopColor="#A9741F" />
          <stop offset="0.5" stopColor="#FCE9A4" />
          <stop offset="0.75" stopColor="#9A6619" />
          <stop offset="1" stopColor="#EBC768" />
        </linearGradient>
        <radialGradient id="aara-disc" cx="0.5" cy="0.45" r="0.6">
          <stop offset="0" stopColor="#2B2825" />
          <stop offset="1" stopColor="#100E0C" />
        </radialGradient>
        <linearGradient id="aara-band" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" stopOpacity="0" />
          <stop offset="0.5" stopColor="#fff" stopOpacity="1" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="aara-feather" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#fff" />
          <stop offset="0.86" stopColor="#fff" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </linearGradient>

        <clipPath id="aara-disc-clip">
          <circle cx="300" cy="300" r="266" />
        </clipPath>

        {/* Smoke like the logo's background */}
        <filter id="aara-smoke" x="0" y="0" width="100%" height="100%">
          <feTurbulence type="fractalNoise" baseFrequency="0.007 0.011" numOctaves="4" seed="7" />
          <feColorMatrix type="matrix" values="0 0 0 0 0.62  0 0 0 0 0.6  0 0 0 0 0.58  0 0 0 1.7 -0.68" />
        </filter>

        <filter id="aara-glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        <mask id="aara-lid" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
          <motion.path
            d={LID_SPINE}
            stroke="#fff"
            strokeWidth="72"
            strokeLinecap="butt"
            fill="none"
            {...draw(T.lid, T.lidDur, SILK)}
          />
        </mask>

        {ALL_LASHES.map((l, i) => (
          <mask key={i} id={`aara-lash-${i}`} maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
            <motion.path
              d={l.spine}
              stroke="#fff"
              strokeWidth="12"
              strokeLinecap="butt"
              fill="none"
              {...draw(l.delay, T.lashDur)}
            />
          </mask>
        ))}

        {/* "Aara" is written left → right with a feathered edge */}
        <mask id="aara-write" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
          <motion.rect
            x="130"
            y="370"
            width="340"
            height="160"
            fill="url(#aara-feather)"
            style={{ originX: 0 }}
            {...(reduced
              ? { initial: false, animate: { scaleX: 1 } }
              : {
                  initial: { scaleX: 0 },
                  animate: { scaleX: 1 },
                  transition: { duration: T.wordDur, delay: T.word, ease: [0.45, 0, 0.25, 1] },
                })}
          />
        </mask>

        <mask id="aara-sheen" maskUnits="userSpaceOnUse" x="0" y="0" width="600" height="600">
          {!reduced && (
            <g transform="rotate(18 300 300)">
              <motion.rect
                y="-150"
                width="120"
                height="900"
                fill="url(#aara-band)"
                initial={{ x: -260 }}
                animate={{ x: 760 }}
                transition={{ duration: T.sheenDur, delay: T.sheen, ease: SILK }}
              />
            </g>
          )}
        </mask>
      </defs>

      {/* Smoky disc */}
      <motion.g {...fadeIn(T.disc, 1.2 * SPEED)}>
        <circle cx="300" cy="300" r="268" fill="url(#aara-disc)" />
        <g clipPath="url(#aara-disc-clip)" opacity="0.38">
          <rect x="0" y="0" width="600" height="600" filter="url(#aara-smoke)" />
        </g>
      </motion.g>

      {/* Double ring: outer draws clockwise, inner counter-clockwise, both meet at the top */}
      <g transform="translate(300 300) rotate(-90)">
        <motion.circle r="281" stroke="url(#aara-ring)" strokeWidth="3.2" {...draw(T.ring, T.ringDur, SILK)} />
      </g>
      <g transform="translate(297 303) rotate(-90) scale(1 -1)">
        <motion.circle r="267" stroke="url(#aara-ring)" strokeWidth="1.6" {...draw(T.ring + 0.12 * SPEED, T.ringDur, SILK)} />
      </g>

      {/* Kolam loops — draw, breathe out, dissolve */}
      {!reduced && (
        <motion.g
          initial={{ opacity: 1, scale: 1 }}
          animate={{ opacity: 0, scale: 1.14 }}
          transition={{ duration: 0.5 * SPEED, delay: T.kolamOut, ease: EASE }}
          stroke="url(#aara-gold)"
          strokeWidth="1.4"
          strokeOpacity="0.8"
          strokeLinecap="round"
        >
          {KOLAM.map((d, i) => (
            <motion.path key={i} d={d} {...draw(T.kolam + i * 0.12 * SPEED, T.kolamDur, SILK)} />
          ))}
        </motion.g>
      )}

      {/* Eye + brow */}
      <g filter="url(#aara-glow)">
        <motion.path d={BROW_BODY} fill="url(#aara-gold)" {...fadeIn(T.brow + 0.2 * SPEED, T.browSweep, 0.3)} />
        <g stroke="url(#aara-gold)" strokeLinecap="round">
          {HAIRS.map((h, i) => (
            <motion.path key={i} d={h.d} strokeWidth={f(h.w)} {...draw(h.delay, T.hairDur)} />
          ))}
        </g>

        <path d={LID} fill="url(#aara-gold)" mask="url(#aara-lid)" />

        {ALL_LASHES.map((l, i) => (
          <path key={i} d={l.shape} fill="url(#aara-gold)" mask={`url(#aara-lash-${i})`} />
        ))}
      </g>

      {/* Pulli dots: grid → arc glide → melt into the lash tips */}
      {!reduced && (
        <g fill="#F2D27E">
          {DOTS.map((d, i) => (
            <motion.circle
              key={i}
              initial={{ cx: d.from[0], cy: d.from[1], r: 0 }}
              animate={{
                cx: [d.from[0], d.mid[0], d.to[0]],
                cy: [d.from[1], d.mid[1], d.to[1]],
                r: [0, 4.6, 3.2, 3.2, 0],
              }}
              transition={{
                cx: { duration: T.travelDur, delay: d.start, ease: "easeInOut" },
                cy: { duration: T.travelDur, delay: d.start, ease: "easeInOut" },
                r: { duration: d.rDur, delay: d.rDelay, times: d.rTimes, ease: "easeInOut" },
              }}
            />
          ))}
        </g>
      )}

      {/* Script wordmark */}
      <text
        x="300"
        y="486"
        textAnchor="middle"
        fontFamily={SCRIPT_FONT}
        fontSize="98"
        fill="url(#aara-gold)"
        mask="url(#aara-write)"
      >
        Aara
      </text>

      {/* Gold sheen across everything */}
      <g fill="#FFF7E0" stroke="#FFF7E0" fillOpacity="0.85" strokeOpacity="0.85" mask="url(#aara-sheen)">
        <path d={LID} stroke="none" />
        {ALL_LASHES.map((l, i) => (
          <path key={i} d={l.shape} stroke="none" />
        ))}
        {HAIRS.map((h, i) => (
          <path key={i} d={h.d} fill="none" strokeWidth={f(h.w)} strokeLinecap="round" />
        ))}
        <text x="300" y="486" textAnchor="middle" fontFamily={SCRIPT_FONT} fontSize="98" stroke="none">
          Aara
        </text>
      </g>

      {/* One sparkle on the longest outer lash */}
      {!reduced && (
        <g transform={`translate(${P(SPARK_AT)})`}>
          <motion.path
            d={STAR}
            fill="#FFF3D6"
            initial={{ scale: 0, rotate: -45, opacity: 0 }}
            animate={{ scale: [0, 1.3, 0], rotate: [-45, 0, 45], opacity: [0, 1, 0] }}
            transition={{ duration: 0.9 * SPEED, delay: T.sparkle, ease: "easeInOut" }}
          />
        </g>
      )}
    </svg>
  );
}

/* ─────────────────────────────────────────────
   Preloader
   ───────────────────────────────────────────── */
export default function Preloader({ onReveal }) {
  const [show, setShow] = useState(true);
  const lenis = useLenis();
  const reduced = useReducedMotion();
  const total = reduced ? 1400 : T.exit * 1000;

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => {
      setShow(false);
      onReveal?.();
    }, total);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!lenis) return;
    if (show) lenis.stop();
    else lenis.start();
  }, [lenis, show]);

  const enter = (from, to, transition) =>
    reduced ? { initial: false, animate: to } : { initial: from, animate: to, transition };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          key="curtain-back"
          aria-hidden="true"
          className="fixed inset-0 z-[119] bg-[#5A1020]"
          exit={{ y: "-100%", transition: { duration: 1.05, ease: CURTAIN_EASE, delay: 0.14 } }}
        />
      )}

      {show && (
        <motion.div
          key="curtain-front"
          role="status"
          aria-label="Loading Aara Makeovers"
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center overflow-hidden bg-[#0B0907] text-[#F4ECDF]"
          exit={{ y: "-100%", transition: { duration: 0.95, ease: CURTAIN_EASE } }}
        >
          {/* Warm halo behind the badge */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(circle at 50% 46%, rgba(233,194,90,0.13), rgba(90,16,32,0.10) 38%, transparent 68%)",
            }}
            {...enter({ opacity: 0 }, { opacity: 1 }, { duration: 2.4, delay: 0.2, ease: EASE })}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0"
            style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.6) 100%)" }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.06]"
            style={{ backgroundImage: GRAIN }}
          />

          <motion.div
            className="relative aspect-square w-[min(82vmin,540px)]"
            {...enter({ scale: 0.95 }, { scale: 1 }, { duration: T.exit, ease: EASE })}
          >
            <AaraMark reduced={reduced} />
          </motion.div>

          <motion.p
            className="relative mt-3 font-display text-base italic text-[#F4ECDF]/70 sm:text-lg"
            {...enter(
              { opacity: 0, letterSpacing: "0.6em" },
              { opacity: 1, letterSpacing: "0.34em" },
              { duration: 1.2, delay: T.word + 0.4 * SPEED, ease: EASE }
            )}
          >
            makeovers
          </motion.p>

          <div className="relative mt-7 h-px w-36 overflow-hidden bg-[#F4ECDF]/10">
            <motion.span
              className="absolute inset-0 origin-left bg-gradient-to-r from-[#8A5A17] via-[#FFF0A8] to-[#D4A23A]"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: (total - 300) / 1000, ease: SILK }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}