import { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "motion/react";

const items = [
  "Bridal makeup",
  "HD & Advanced HD",
  "Airbrush finish",
  "Engagement looks",
  "Reception glam",
  "Hair styling",
  "Saree draping",
];

const wrap = (min, max, v) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/* Speeds up and flips direction with your scroll velocity */
function VelocityRow({ baseVelocity, children, className = "" }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 4], { clamp: false });
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);
  const direction = useRef(1);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = velocityFactor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="flex overflow-hidden">
      <motion.div style={{ x }} className={`flex shrink-0 whitespace-nowrap ${className}`}>
        {[0, 1, 2, 3].map((i) => (
          <div key={i} aria-hidden={i > 0} className="flex shrink-0 items-center">
            {children}
          </div>
        ))}
      </motion.div>
    </div>
  );
}

function Row({ starClass }) {
  return items.map((t) => (
    <span key={t} className="flex items-center">
      <span className="px-6 sm:px-10">{t}</span>
      <span aria-hidden="true" className={`text-[0.5em] ${starClass}`}>
        ✦
      </span>
    </span>
  ));
}

export default function Marquee() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const rotateA = useTransform(scrollYProgress, [0, 1], [-5, 1]);
  const rotateB = useTransform(scrollYProgress, [0, 1], [4, -1]);

  return (
    <section ref={ref} aria-label="Services at a glance" className="relative z-10 overflow-hidden bg-[#0E0B09] py-16 sm:py-24">
      <motion.div
        style={{ rotate: rotateB }}
        className="-mx-[6%] border-y border-[#D5A653]/20 bg-[#0E0B09] py-4"
      >
        <VelocityRow baseVelocity={2} className="text-outline font-display text-4xl sm:text-6xl lg:text-7xl">
          <Row starClass="text-[#D5A653]/50" />
        </VelocityRow>
      </motion.div>

      <motion.div
        style={{ rotate: rotateA }}
        className="relative -mx-[6%] -mt-6 border-y border-[#D5A653]/40 bg-gradient-to-r from-[#4A0D1A] via-[#6B1424] to-[#4A0D1A] py-5 shadow-2xl shadow-black/60 sm:-mt-10"
      >
        <VelocityRow baseVelocity={-2.4} className="font-display text-4xl italic text-[#F4ECDF] sm:text-6xl lg:text-7xl">
          <Row starClass="text-[#F1CF8A]" />
        </VelocityRow>
      </motion.div>
    </section>
  );
}
