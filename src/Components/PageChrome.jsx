import { useEffect, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useSpring,
} from "motion/react";
import { WHATSAPP } from "./motionKit";

/* Gold thread across the top that fills as you scroll */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[95] h-[2px] origin-left bg-gradient-to-r from-[#7A1426] via-[#D5A653] to-[#F1CF8A]"
    />
  );
}

/* Soft gold ring that follows the mouse (desktop only) */
export function Cursor() {
  const [enabled, setEnabled] = useState(false);
  const [mode, setMode] = useState("default");
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 500, damping: 40, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 500, damping: 40, mass: 0.4 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const move = (e) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    const over = (e) => {
      const t = e.target;
      if (!(t instanceof Element)) return;
      if (t.closest("[data-cursor='view']")) setMode("view");
      else if (t.closest("a, button")) setMode("link");
      else setMode("default");
    };

    window.addEventListener("pointermove", move);
    window.addEventListener("pointerover", over);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerover", over);
    };
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div aria-hidden="true" style={{ x: sx, y: sy }} className="pointer-events-none fixed left-0 top-0 z-[110]">
      <motion.div
        style={{ translateX: "-50%", translateY: "-50%" }}
        animate={mode}
        variants={{
          default: { width: 14, height: 14, backgroundColor: "rgba(213,166,83,0)", borderColor: "rgba(241,207,138,0.9)" },
          link: { width: 54, height: 54, backgroundColor: "rgba(213,166,83,0.12)", borderColor: "rgba(241,207,138,0.6)" },
          view: { width: 92, height: 92, backgroundColor: "rgba(213,166,83,0.92)", borderColor: "rgba(213,166,83,0)" },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 26 }}
        className="flex items-center justify-center rounded-full border"
      >
        <AnimatePresence>
          {mode === "view" && (
            <motion.span
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.6 }}
              className="font-display text-lg italic text-[#0E0B09]"
            >
              View
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

/* WhatsApp pill that floats in after the hero */
export function FloatingWhatsApp() {
  const { scrollY } = useScroll();
  const [visible, setVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    setVisible(v > window.innerHeight * 0.8);
  });

  return (
    <AnimatePresence>
      {visible && (
        <motion.a
          key="wa"
          href={WHATSAPP}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat with Aara Makeovers on WhatsApp"
          initial={{ opacity: 0, scale: 0.6, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.6, y: 30 }}
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          transition={{ type: "spring", stiffness: 300, damping: 22 }}
          className="fixed bottom-5 right-5 z-[85] flex items-center gap-3 rounded-full bg-[#D5A653] py-2.5 pl-2.5 pr-5 text-sm font-medium text-[#0E0B09] shadow-2xl shadow-black/50 outline-none focus-visible:ring-2 focus-visible:ring-[#F4ECDF] sm:bottom-8 sm:right-8"
        >
          <span className="relative flex h-9 w-9 items-center justify-center rounded-full bg-[#0E0B09] text-[#F1CF8A]">
            <motion.span
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-[#0E0B09]"
              animate={{ scale: [1, 1.7], opacity: [0.7, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeOut" }}
            />
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 11.5a8.4 8.4 0 0 1-12.4 7.4L3 21l2.1-5.4A8.4 8.4 0 1 1 21 11.5z" />
            </svg>
          </span>
          WhatsApp
        </motion.a>
      )}
    </AnimatePresence>
  );
}
