import { useCallback, useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useLenis } from "lenis/react";
import { CTA, DriftWord, EASE, Kicker, MaskLines, Reveal } from "./motionKit";

const categories = ["All looks", "Traditional", "HD Makeup", "Airbrush", "Reception"];

const bridalLooks = [
  {
    id: 1,
    title: "Traditional Bridal",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=85",
    description: "Timeless South Indian bridal elegance",
  },
  {
    id: 2,
    title: "Luxury HD Bridal",
    category: "HD Makeup",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
    description: "Refined makeup with a flawless finish",
  },
  {
    id: 3,
    title: "Elegant Reception",
    category: "Reception",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
    description: "Glamour for your special evening",
  },
  {
    id: 4,
    title: "Soft Bridal Glam",
    category: "Airbrush",
    image: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
    description: "Soft, radiant and beautifully balanced",
  },
  {
    id: 5,
    title: "Classic Bridal Beauty",
    category: "Traditional",
    image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
    description: "A graceful look with timeless appeal",
  },
  {
    id: 6,
    title: "Modern Bridal Look",
    category: "HD Makeup",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85",
    description: "Contemporary beauty with a luxury touch",
  },
];

const countFor = (c) => (c === "All looks" ? bridalLooks.length : bridalLooks.filter((l) => l.category === c).length);

/* ------------------------------------------------------------------ */
function LookCard({ look, index, onOpen }) {
  const ref = useRef(null);

  /* parallax inside the frame */
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-9%", "9%"]);

  /* 3D tilt + light that follows the mouse */
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const glow = useTransform(
    [gx, gy],
    ([x, y]) => `radial-gradient(circle at ${x}% ${y}%, rgba(241,207,138,0.28), transparent 55%)`
  );

  const onMove = (e) => {
    if (e.pointerType !== "mouse" || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    ry.set((px - 0.5) * 10);
    rx.set((0.5 - py) * 10);
    gx.set(px * 100);
    gy.set(py * 100);
  };
  const onLeave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.article
      ref={ref}
      layout
      initial={{ opacity: 0, y: 70 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.3 } }}
      transition={{ duration: 0.9, delay: (index % 3) * 0.12, ease: EASE }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={`group relative ${index % 3 === 1 ? "lg:mt-16" : ""}`}
    >
      <button
        type="button"
        data-cursor="view"
        onClick={() => onOpen(look)}
        aria-label={`View ${look.title}`}
        className="block w-full text-left outline-none focus-visible:ring-2 focus-visible:ring-[#F1CF8A] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0E0B09]"
        style={{ borderRadius: 28 }}
      >
        <motion.div
          layoutId={`look-${look.id}`}
          style={{ borderRadius: 28 }}
          className="relative aspect-square w-full overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#17120E]"
        >
          <motion.img
            style={{ y: imgY, scale: 1.2 }}
            src={look.image}
            alt={`${look.title} makeup inspiration`}
            loading="lazy"
            className="h-full w-full object-cover object-center transition-[filter] duration-700 group-hover:brightness-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B09] via-[#0E0B09]/10 to-transparent" />
          <motion.div
            aria-hidden="true"
            style={{ background: glow }}
            className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-3 border border-[#D5A653]/0 transition-colors duration-500 group-hover:border-[#D5A653]/50"
            style={{ borderRadius: 22 }}
          />

          <span className="absolute left-1/2 top-10 -translate-x-1/2 rounded-full border border-[#D5A653]/50 bg-[#0E0B09]/60 px-3 py-1 text-[11px] tracking-wide text-[#F1CF8A] backdrop-blur-sm">
            {look.category}
          </span>

          <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
            <h3 className="font-display text-3xl leading-tight text-[#F4ECDF] transition-transform duration-500 group-hover:-translate-y-1">
              {look.title}
            </h3>
            <p className="mt-2 text-sm leading-6 text-[#F4ECDF]/65">{look.description}</p>
            <div className="mt-4 h-px w-10 bg-[#D5A653] transition-all duration-500 group-hover:w-24" />
          </div>
        </motion.div>
      </button>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
function Lightbox({ look, onClose }) {
  const lenis = useLenis();

  useEffect(() => {
    lenis?.stop();
    const onKey = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      window.removeEventListener("keydown", onKey);
    };
  }, [lenis, onClose]);

  return (
    <motion.div
      data-lenis-prevent
      role="dialog"
      aria-modal="true"
      aria-label={look.title}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto p-4 sm:p-10"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0E0B09]/90 backdrop-blur-md"
      />

      <div className="relative z-10 grid w-full max-w-5xl items-center gap-8 md:grid-cols-[1.1fr_0.9fr]">
        <motion.div
          layoutId={`look-${look.id}`}
          style={{ borderRadius: 28 }}
          className="relative h-[52vh] overflow-hidden border border-[#D5A653]/30 md:h-[78vh]"
        >
          <img src={look.image} alt={`${look.title} makeup inspiration`} className="h-full w-full object-cover" />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0, transition: { delay: 0.25, duration: 0.7, ease: EASE } }}
          exit={{ opacity: 0, x: 20, transition: { duration: 0.2 } }}
          className="text-[#F4ECDF]"
        >
          <p className="font-display text-xl italic text-[#F1CF8A]">{look.category}</p>
          <h3 className="mt-2 font-display text-5xl leading-[1.05]">{look.title}</h3>
          <p className="mt-5 max-w-sm leading-7 text-[#F4ECDF]/70">
            {look.description}. Every look is planned around your outfit, jewellery and skin, then refined on a trial before the day.
          </p>
          <div className="mt-8">
            <CTA href="#contact" onClick={onClose}>
              Plan a look like this
            </CTA>
          </div>
        </motion.div>
      </div>

      <motion.button
        type="button"
        onClick={onClose}
        aria-label="Close"
        initial={{ opacity: 0, rotate: -90 }}
        animate={{ opacity: 1, rotate: 0 }}
        exit={{ opacity: 0, rotate: 90 }}
        whileHover={{ rotate: 90, scale: 1.08 }}
        className="fixed right-5 top-5 z-20 flex h-12 w-12 items-center justify-center rounded-full border border-[#D5A653]/60 bg-[#0E0B09]/70 text-[#F1CF8A] outline-none focus-visible:ring-2 focus-visible:ring-[#F1CF8A] sm:right-8 sm:top-8"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
          <path d="M6 6l12 12M18 6L6 18" />
        </svg>
      </motion.button>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All looks");
  const [openLook, setOpenLook] = useState(null);
  const closeLook = useCallback(() => setOpenLook(null), []);

  const filteredLooks =
    activeCategory === "All looks" ? bridalLooks : bridalLooks.filter((l) => l.category === activeCategory);

  return (
    <section id="portfolio" className="relative flex min-h-[100svh] flex-col justify-center bg-[#0E0B09] px-5 pb-28 text-[#F4ECDF] sm:px-8 lg:px-12">
      <DriftWord className="absolute inset-x-0 top-0 opacity-60">Portfolio Portfolio</DriftWord>

      <div className="relative z-10 mx-auto max-w-7xl">
        <div className="mx-auto mb-12 max-w-3xl pt-16 text-center sm:pt-24">
          <Kicker center>Our bridal portfolio</Kicker>
          <h2 className="font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">
            <MaskLines lines={["Looks we’ve", { text: "created with love", className: "italic text-gold-gradient" }]} />
          </h2>
          <Reveal as="p" delay={0.2} className="mx-auto mt-6 max-w-xl text-sm font-light leading-7 text-[#F4ECDF]/65 sm:text-base">
            Every bride has her own story. Filter by style and tap any look to see it up close.
          </Reveal>
        </div>

        {/* Filters with sliding pill */}
        <LayoutGroup id="portfolio-filters">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.6 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.07 } } }}
            className="mb-14 flex flex-wrap items-center justify-center gap-2 sm:gap-3"
          >
            {categories.map((category) => {
              const isActive = activeCategory === category;
              return (
                <motion.button
                  key={category}
                  type="button"
                  variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setActiveCategory(category)}
                  aria-pressed={isActive}
                  className={`relative rounded-full border px-5 py-2.5 text-xs outline-none transition-colors duration-300 focus-visible:ring-2 focus-visible:ring-[#F1CF8A] sm:text-sm ${
                    isActive ? "border-[#D5A653] text-[#0E0B09]" : "border-[#F4ECDF]/15 text-[#F4ECDF]/75 hover:border-[#D5A653]/70 hover:text-[#F1CF8A]"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="filter-pill"
                      className="absolute inset-0 rounded-full bg-[#D5A653]"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10">
                    {category}
                    <sup className="ml-1 text-[10px] opacity-70">{countFor(category)}</sup>
                  </span>
                </motion.button>
              );
            })}
          </motion.div>
        </LayoutGroup>

        {/* Gallery + lightbox share layoutIds */}
        <LayoutGroup id="portfolio-looks">
          <motion.div layout className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
            <AnimatePresence mode="popLayout">
              {filteredLooks.map((look, index) => (
                <LookCard key={look.id} look={look} index={index} onOpen={setOpenLook} />
              ))}
            </AnimatePresence>
          </motion.div>

          <AnimatePresence>
            {openLook && <Lightbox key="lightbox" look={openLook} onClose={closeLook} />}
          </AnimatePresence>
        </LayoutGroup>

        <Reveal className="mt-20 flex flex-col items-center text-center">
          <p className="mb-7 font-display text-2xl italic text-[#F4ECDF]/80 sm:text-3xl">
            Your wedding. Your beauty. Your signature look.
          </p>
          <CTA href="#contact">Plan your bridal look</CTA>
        </Reveal>
      </div>
    </section>
  );
}
