import { Fragment, useRef } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

/* ------------------------------------------------------------------ */
/*  Brand tokens                                                       */
/* ------------------------------------------------------------------ */
export const EASE = [0.22, 1, 0.36, 1];
export const CURTAIN_EASE = [0.76, 0, 0.24, 1];
export const WHATSAPP = "https://wa.me/919363250028";
export const PHONE = "tel:+919363250028";

/*  Ink #0E0B09 · Silk #17120E · Temple gold #D5A653 · Gold light #F1CF8A
    Kumkum #7A1426 / #5A1020 · Jasmine #F4ECDF                          */

/* ------------------------------------------------------------------ */
/*  Global styles (fonts, grain, Lenis, gold sheen)                   */
/* ------------------------------------------------------------------ */
export function HomeStyles() {
  return (
    <style>{`
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=Jost:wght@300;400;500&display=swap');

.font-display { font-family: 'Cormorant Garamond', 'Times New Roman', serif; }
.font-body { font-family: 'Jost', system-ui, -apple-system, sans-serif; }

html.lenis, html.lenis body { height: auto; }
.lenis.lenis-smooth { scroll-behavior: auto !important; }
.lenis.lenis-smooth [data-lenis-prevent] { overscroll-behavior: contain; }
.lenis.lenis-stopped { overflow: hidden; }

::selection { background: #D5A653; color: #0E0B09; }

.text-gold-gradient {
  background-image: linear-gradient(100deg, #F1CF8A 0%, #D5A653 40%, #F7E2B5 55%, #C8963F 100%);
  background-size: 220% auto;
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  animation: aara-sheen 7s linear infinite;
}
@keyframes aara-sheen { to { background-position: -220% center; } }

.text-outline {
  color: transparent;
  -webkit-text-stroke: 1px rgba(213, 166, 83, 0.45);
}

.aara-grain::after {
  content: "";
  position: fixed;
  inset: 0;
  z-index: 70;
  pointer-events: none;
  opacity: 0.05;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='180' height='180'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}

@media (prefers-reduced-motion: reduce) {
  .text-gold-gradient { animation: none; }
}
`}</style>
  );
}

/* ------------------------------------------------------------------ */
/*  MaskLines – word-by-word masked reveal for headings               */
/*  mode: "inView" (default) | "mount" | "parent" (inherit variants)  */
/* ------------------------------------------------------------------ */
export function MaskLines({
  lines,
  mode = "inView",
  stagger = 0.07,
  delay = 0,
  amount = 0.5,
  className = "",
}) {
  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  const word = {
    hidden: { y: "115%", rotate: 5 },
    visible: { y: "0%", rotate: 0, transition: { duration: 1.05, ease: EASE } },
  };
  const trigger =
    mode === "inView"
      ? { initial: "hidden", whileInView: "visible", viewport: { once: true, amount } }
      : mode === "mount"
      ? { initial: "hidden", animate: "visible" }
      : {};

  return (
    // <motion.span variants={container} {...trigger} className={`block ${className}`}>
    //   {lines.map((line, li) => {
    //     const l = typeof line === "string" ? { text: line } : line;
    //     const words = l.text.split(" ");
    //     return (
    //       <span key={li} className="block">
    //         {words.map((w, wi) => (
    //           <Fragment key={wi}>
    //             <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] pr-[0.04em] align-top">
    //               <motion.span
    //                 variants={word}
    //                 className={`inline-block origin-bottom-left ${l.className ?? ""}`}
    //               >
    //                 {w}
    //               </motion.span>
    //             </span>
    //             {wi < words.length - 1 && " "}
    //           </Fragment>
    //         ))}
    //       </span>
    //     );
    //   })}
    // </motion.span>
    <motion.span
  variants={container}
  {...trigger}
  className={`block whitespace-nowrap ${className}`}
>
  {lines.map((line, li) => {
    const l = typeof line === "string" ? { text: line } : line;
    const words = l.text.split(" ");

    return (
      <span key={li} className="block whitespace-nowrap">
        {words.map((w, wi) => (
          <Fragment key={wi}>
            <span className="-mb-[0.14em] inline-block overflow-hidden pb-[0.14em] pr-[0.04em] align-top">
              <motion.span
                variants={word}
                className={`inline-block origin-bottom-left ${l.className ?? ""}`}
              >
                {w}
              </motion.span>
            </span>
            {wi < words.length - 1 && " "}
          </Fragment>
        ))}
      </span>
    );
  })}
</motion.span>
  );
}

/* ------------------------------------------------------------------ */
/*  Reveal – soft blur + rise for paragraphs and blocks               */
/* ------------------------------------------------------------------ */
export function Reveal({
  children,
  as = "div",
  className = "",
  delay = 0,
  y = 28,
  amount = 0.3,
}) {
  const Comp = motion[as];
  return (
    <Comp
      className={className}
      initial={{ opacity: 0, y, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, amount }}
      transition={{ duration: 0.95, delay, ease: EASE }}
    >
      {children}
    </Comp>
  );
}

/* ------------------------------------------------------------------ */
/*  Kicker – small italic intro line with a drawing gold rule         */
/* ------------------------------------------------------------------ */
export function Kicker({ children, center = false, className = "" }) {
  return (
    <motion.p
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.8 }}
      className={`mb-6 flex items-center gap-4 font-display text-lg italic text-[#F1CF8A] sm:text-xl ${
        center ? "justify-center" : ""
      } ${className}`}
    >
      <motion.span
        aria-hidden="true"
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE } } }}
        className="h-px w-10 origin-left bg-[#D5A653]"
      />
      <motion.span
        variants={{
          hidden: { opacity: 0, x: -12 },
          visible: { opacity: 1, x: 0, transition: { duration: 0.7, delay: 0.25, ease: EASE } },
        }}
      >
        {children}
      </motion.span>
      {center && (
        <motion.span
          aria-hidden="true"
          variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 0.9, ease: EASE } } }}
          className="h-px w-10 origin-right bg-[#D5A653]"
        />
      )}
    </motion.p>
  );
}

/* ------------------------------------------------------------------ */
/*  Magnetic – element leans toward the mouse                         */
/* ------------------------------------------------------------------ */
export function Magnetic({ children, strength = 0.3, className = "" }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.4 });

  const onMove = (e) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ x: sx, y: sy }}
      className={`inline-block ${className}`}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  CTA – magnetic pill button with rising fill + turning arrow       */
/* ------------------------------------------------------------------ */
export function CTA({ href, children, variant = "solid", className = "", onClick }) {
  const external = href?.startsWith("http");
  const solid = variant === "solid";

  return (
    <Magnetic>
      <motion.a
        href={href}
        onClick={onClick}
        target={external ? "_blank" : undefined}
        rel={external ? "noreferrer" : undefined}
        initial="rest"
        animate="rest"
        whileHover="hover"
        whileTap={{ scale: 0.96 }}
        className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full py-3 pl-7 pr-3 text-sm font-medium tracking-wide outline-none focus-visible:ring-2 focus-visible:ring-[#F1CF8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0E0B09] ${
          solid ? "bg-[#D5A653] text-[#0E0B09]" : "border border-[#D5A653]/60 text-[#F4ECDF]"
        } ${className}`}
      >
        <motion.span
          aria-hidden="true"
          variants={{ rest: { y: "102%" }, hover: { y: "0%" } }}
          transition={{ duration: 0.5, ease: EASE }}
          className={`absolute inset-0 rounded-full ${solid ? "bg-[#F4ECDF]" : "bg-[#D5A653]"}`}
        />
        <span
          className={`relative z-10 transition-colors duration-500 ${
            solid ? "" : "group-hover:text-[#0E0B09]"
          }`}
        >
          {children}
        </span>
        <span
          className={`relative z-10 flex h-8 w-8 items-center justify-center rounded-full transition-colors duration-500 ${
            solid
              ? "bg-[#0E0B09] text-[#F1CF8A]"
              : "bg-[#D5A653] text-[#0E0B09] group-hover:bg-[#0E0B09] group-hover:text-[#F1CF8A]"
          }`}
        >
          <motion.svg
            variants={{ rest: { rotate: 0 }, hover: { rotate: -45 } }}
            transition={{ duration: 0.4, ease: EASE }}
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M5 12h14M13 6l6 6-6 6" />
          </motion.svg>
        </span>
      </motion.a>
    </Magnetic>
  );
}

/* ------------------------------------------------------------------ */
/*  KolamMotif – line-drawn kolam that draws itself                   */
/*  progress: MotionValue 0→1 (scroll-linked)                          */
/*  play: boolean (draw when true) · neither: draw when in view        */
/* ------------------------------------------------------------------ */
const KOLAM_ANGLES = [0, 45, 90, 135, 180, 225, 270, 315];

export function KolamMotif({ className = "", progress, play, duration = 2.4, strokeWidth = 0.7 }) {
  let draw;
  if (progress) {
    draw = { style: { pathLength: progress } };
  } else if (play !== undefined) {
    draw = {
      initial: { pathLength: 0, opacity: 0 },
      animate: play ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
      transition: { duration, ease: "easeInOut" },
    };
  } else {
    draw = {
      initial: { pathLength: 0, opacity: 0 },
      whileInView: { pathLength: 1, opacity: 1 },
      viewport: { once: true, amount: 0.3 },
      transition: { duration, ease: "easeInOut" },
    };
  }

  return (
    <svg viewBox="0 0 200 200" fill="none" aria-hidden="true" className={className}>
      <g stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round">
        <motion.circle cx="100" cy="100" r="98" {...draw} />
        <motion.circle cx="100" cy="100" r="20" {...draw} />
        {KOLAM_ANGLES.map((a) => (
          <g key={a} transform={`rotate(${a} 100 100)`}>
            <motion.path d="M100 100 C 88 80, 90 48, 100 30 C 110 48, 112 80, 100 100 Z" {...draw} />
            <motion.path d="M100 30 C 114 -6, 170 16, 149.5 50.5" {...draw} />
          </g>
        ))}
      </g>
      <g fill="currentColor">
        {KOLAM_ANGLES.map((a) => (
          <circle key={a} cx="130.6" cy="26.1" r="1.8" transform={`rotate(${a} 100 100)`} />
        ))}
        <circle cx="100" cy="100" r="2.4" />
      </g>
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  DriftWord – giant outlined word that slides with scroll           */
/* ------------------------------------------------------------------ */
export function DriftWord({ children, className = "", from = "12%", to = "-28%" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], [from, to]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none select-none overflow-hidden whitespace-nowrap ${className}`}
    >
      <motion.div style={{ x }} className="text-outline font-display text-[22vw] italic leading-none md:text-[16vw]">
        {children}
      </motion.div>
    </div>
  );
}
