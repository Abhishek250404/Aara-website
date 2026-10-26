import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useScroll,
  useTransform,
} from "motion/react";
import { useLenis } from "lenis/react";
import { CTA, EASE, Kicker, MaskLines, Reveal } from "./motionKit";

const services = [
  {
    title: "Luxury Bridal Makeup",
    subtitle: "The bride, in her finest light.",
    description: "A personalised bridal look designed around your features, outfit, jewellery and wedding vision.",
    image: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg",
  },
  {
    title: "HD & Advanced HD",
    subtitle: "Every detail, beautifully blended.",
    description: "Refined makeup for a polished appearance in person and in your wedding photographs.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Airbrush Makeup",
    subtitle: "Light. Seamless. Elegant.",
    description: "An even, lightweight-looking finish for a sophisticated bridal beauty experience.",
    image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Reception & Engagement",
    subtitle: "A look for every celebration.",
    description: "Makeup tailored to your event, outfit and personal style, from engagement to reception.",
    image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1000&q=85",
  },
  {
    title: "Hair Styling & Saree Draping",
    subtitle: "The finishing touches.",
    description: "Complete your look with coordinated hairstyling and elegant saree draping.",
    image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=85",
  },
];

const pad = (n) => String(n).padStart(2, "0");

const panelVariants = {
  enter: (dir) => ({ clipPath: dir > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", zIndex: 2 }),
  center: { clipPath: "inset(0% 0% 0% 0%)", zIndex: 2, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
  exit: { zIndex: 1, scale: 1.08, transition: { duration: 1, ease: EASE } },
};

/* ---------------- Desktop: pinned, scroll-driven ---------------- */
function PinnedServices() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const lenis = useLenis();

  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const rail = useTransform(scrollYProgress, [0, 1], [0, 1]);

  const activeRef = useRef(0);
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const i = Math.min(services.length - 1, Math.max(0, Math.floor(v * services.length)));
    if (i === activeRef.current) return;
    setDirection(i > activeRef.current ? 1 : -1);
    activeRef.current = i;
    setActive(i);
  });

  const goTo = (i) => {
    const el = trackRef.current;
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY;
    const distance = el.offsetHeight - window.innerHeight;
    const target = top + distance * ((i + 0.5) / services.length);
    if (lenis) lenis.scrollTo(target, { duration: 1.2 });
    else window.scrollTo({ top: target, behavior: "smooth" });
  };

  const current = services[active];

  return (
    <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${services.length * 75 + 25}vh` }}>
      <div className="sticky top-0 flex h-screen items-center">
        <div className="mx-auto grid w-full max-w-7xl grid-cols-[0.9fr_1.1fr] items-center gap-16 px-14">
          {/* List + progress rail */}
          <div className="relative pl-8">
            <div className="absolute bottom-0 left-0 top-0 w-px bg-[#D5A653]/15">
              <motion.div style={{ scaleY: rail }} className="h-full w-full origin-top bg-[#D5A653]" />
            </div>

            {services.map((s, i) => {
              const isActive = i === active;
              return (
                <button
                  key={s.title}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-current={isActive}
                  className="group block w-full py-5 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#F1CF8A]"
                >
                  <motion.span
                    animate={{ x: isActive ? 14 : 0, opacity: isActive ? 1 : 0.35 }}
                    transition={{ duration: 0.6, ease: EASE }}
                    className="flex items-baseline gap-4"
                  >
                    <span className="w-6 text-xs tabular-nums text-[#D5A653]">{pad(i + 1)}</span>
                    <span
                      className={`font-display text-3xl leading-tight transition-colors duration-500 xl:text-4xl ${
                        isActive ? "text-[#F1CF8A]" : "text-[#F4ECDF] group-hover:text-[#F1CF8A]"
                      }`}
                    >
                      {s.title}
                    </span>
                  </motion.span>
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.5, ease: EASE }}
                        className="block overflow-hidden pl-[3.4rem]"
                      >
                        <span className="block max-w-sm pt-3 text-sm font-light leading-7 text-[#F4ECDF]/65">
                          {s.description}
                        </span>
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

          {/* Image panel */}
          <div className="relative h-[76vh] overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#17120E]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={panelVariants}
                initial="enter"
                animate="center"
                exit="exit"
                className="absolute inset-0"
              >
                <motion.img
                  initial={{ scale: 1.25 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 1.6, ease: EASE }}
                  src={current.image}
                  alt={current.title}
                  className="h-full w-full object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B09] via-[#0E0B09]/20 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-10">
                  <p className="font-display text-lg italic text-[#F1CF8A]">{current.subtitle}</p>
                  <h3 className="mt-2 max-w-lg font-display text-5xl leading-[1.02]">
                    <MaskLines mode="mount" delay={0.35} lines={[current.title]} />
                  </h3>
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
                    className="mt-7"
                  >
                    <CTA href="#contact" variant="outline">
                      Enquire about this
                    </CTA>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Counter */}
            <div className="absolute right-8 top-8 z-10 flex items-baseline gap-1 font-display text-[#F4ECDF]">
              <span className="relative inline-block h-[3.2rem] w-[3.4rem] overflow-hidden text-5xl leading-none">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.span
                    key={active}
                    custom={direction}
                    initial={{ y: direction > 0 ? "100%" : "-100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: direction > 0 ? "-100%" : "100%" }}
                    transition={{ duration: 0.7, ease: EASE }}
                    className="absolute inset-0 text-right"
                  >
                    {pad(active + 1)}
                  </motion.span>
                </AnimatePresence>
              </span>
              <span className="text-lg text-[#F4ECDF]/50">/ {pad(services.length)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ---------------- Mobile / tablet: stacked reveals ---------------- */
function ServiceCard({ service, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <article ref={ref} className="relative">
      <motion.div
        initial={{ clipPath: "inset(18% 8% 18% 8% round 28px)" }}
        whileInView={{ clipPath: "inset(0% 0% 0% 0% round 24px)" }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 1.1, ease: EASE }}
        className="relative h-[60vh] min-h-[380px] overflow-hidden"
      >
        <motion.img style={{ y: imgY, scale: 1.2 }} src={service.image} alt={service.title} loading="lazy" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B09] via-[#0E0B09]/20 to-transparent" />
        <span className="absolute right-5 top-5 font-display text-4xl text-[#F4ECDF]/80">{pad(index + 1)}</span>
        <div className="absolute inset-x-0 bottom-0 p-6">
          <p className="font-display text-lg italic text-[#F1CF8A]">{service.subtitle}</p>
          <h3 className="mt-1 font-display text-4xl leading-tight">
            <MaskLines lines={[service.title]} amount={0.8} />
          </h3>
        </div>
      </motion.div>
      <Reveal as="p" className="mt-5 text-sm font-light leading-7 text-[#F4ECDF]/65">
        {service.description}
      </Reveal>
    </article>
  );
}

/* ------------------------------------------------------------------ */
export default function Services() {
  return (
    <section id="services" className="relative bg-[#17120E] pt-24 text-[#F4ECDF] sm:pt-32">
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D5A653]/40 to-transparent" />

      <div className="mx-auto mb-10 grid max-w-7xl gap-8 px-5 sm:px-8 md:grid-cols-2 md:items-end lg:mb-0 lg:px-14">
        <div>
          <Kicker>The art of bridal beauty</Kicker>
          <h2 className="font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">
            <MaskLines lines={["Our makeup", { text: "services", className: "italic text-gold-gradient" }]} />
          </h2>
        </div>
        <Reveal as="p" delay={0.15} className="max-w-md text-sm font-light leading-7 text-[#F4ECDF]/60 md:justify-self-end">
          Every occasion deserves its own expression of beauty. Scroll through the experiences we create for your most memorable moments.
        </Reveal>
      </div>

      <PinnedServices />

      <div className="mx-auto max-w-2xl space-y-16 px-5 pb-24 sm:px-8 lg:hidden">
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
      </div>

      <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-14">
        <Reveal className="flex flex-col gap-6 border-t border-[#D5A653]/20 pt-10 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-display text-2xl italic text-[#F4ECDF]/75">Your occasion. Your style. Your signature look.</p>
          <CTA href="#contact">Plan your bridal look</CTA>
        </Reveal>
      </div>
    </section>
  );
}
