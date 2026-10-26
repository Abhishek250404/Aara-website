import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CTA, EASE, Kicker, KolamMotif, MaskLines, Reveal, WHATSAPP } from "./motionKit";

const brideImage =
  "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg";

const pillars = [
  { title: "Personalised looks", text: "Planned around your features and outfit" },
  { title: "Elegant details", text: "Skin, eyes and finish refined with care" },
  { title: "Bridal beauty", text: "A look that photographs and feels right" },
];

/* Each word lights up as you scroll through the paragraph */
function ScrollWords({ text, className = "" }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((w, i) => {
        const start = i / words.length;
        return (
          <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
            {w}
          </Word>
        );
      })}
    </p>
  );
}

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <>
      <motion.span style={{ opacity }}>{children}</motion.span>{" "}
    </>
  );
}

export default function About() {
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start end", "end start"] });
  const photoY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const frameY = useTransform(scrollYProgress, [0, 1], [50, -50]);
  const kolamRotate = useTransform(scrollYProgress, [0, 1], [-50, 90]);
  const tagX = useTransform(scrollYProgress, [0.15, 0.45], [-80, 0]);
  const tagOpacity = useTransform(scrollYProgress, [0.15, 0.4], [0, 1]);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative overflow-hidden bg-[#0E0B09] px-6 py-24 text-[#F4ECDF] md:px-12 md:py-36 lg:px-20"
    >
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-24 h-96 w-96 rounded-full bg-[#7A1426]/25 blur-[120px]" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-20 lg:grid-cols-[0.95fr_1.05fr] lg:gap-24">
        {/* ---------------- Portrait ---------------- */}
        <div className="relative mx-auto w-full max-w-[460px]">
          <motion.div
            aria-hidden="true"
            style={{ rotate: kolamRotate }}
            className="pointer-events-none absolute -inset-16 -z-0 text-[#D5A653]/20"
          >
            <KolamMotif duration={3} className="h-full w-full" />
          </motion.div>

          <motion.div
            aria-hidden="true"
            style={{ y: frameY }}
            className="absolute -right-4 -top-4 h-full w-full rounded-t-[999px] border border-[#D5A653]/60 md:-right-6 md:-top-6"
          />

          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1] }}
            className="relative aspect-[4/5] overflow-hidden rounded-t-[999px]"
          >
            <motion.img
              style={{ y: photoY, scale: 1.22 }}
              src={brideImage}
              alt="Bride styled by Aara Makeovers"
              loading="lazy"
              className="h-full w-full object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B09]/40 to-transparent" />
          </motion.div>

          <motion.div
            style={{ x: tagX, opacity: tagOpacity }}
            className="absolute -bottom-6 -left-3 bg-gradient-to-br from-[#F1CF8A] to-[#C8963F] px-6 py-4 text-[#0E0B09] shadow-2xl shadow-black/50 md:-left-8 md:px-8"
          >
            <p className="font-display text-3xl leading-none">Aara Makeovers</p>
            <p className="mt-1.5 font-display text-base italic">Beauty with elegance</p>
          </motion.div>
        </div>

        {/* ---------------- Story ---------------- */}
        <div className="pt-6 lg:pt-0">
          <Kicker>Our story</Kicker>
          <h2 className="font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">
            <MaskLines lines={["About", { text: "Aara Makeovers", className: "italic text-gold-gradient" }]} />
          </h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: EASE }}
            className="my-8 h-px w-full origin-left bg-gradient-to-r from-[#D5A653] to-transparent"
          />

          <ScrollWords
            className="font-display text-2xl leading-[1.45] sm:text-3xl"
            text="We believe every bride deserves to feel confident, beautiful and truly herself on her special day."
          />

          <Reveal as="p" delay={0.1} className="mt-8 max-w-xl text-sm leading-8 text-[#F4ECDF]/65 sm:text-base">
            Our approach combines elegance, attention to detail and a look tailored to you. From luxury bridal makeup to HD, Advanced HD and airbrush, we create a harmonious look that complements your features, wedding attire, jewellery and occasion.
          </Reveal>

          <motion.ul
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.4 }}
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.14 } } }}
            className="mt-10 grid gap-6 border-y border-[#F4ECDF]/10 py-8 sm:grid-cols-3"
          >
            {pillars.map((p) => (
              <motion.li
                key={p.title}
                variants={{
                  hidden: { opacity: 0, y: 24, rotate: -2 },
                  visible: { opacity: 1, y: 0, rotate: 0, transition: { duration: 0.8, ease: EASE } },
                }}
              >
                <motion.span
                  variants={{
                    hidden: { scale: 0, rotate: -90 },
                    visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200, damping: 14 } },
                  }}
                  className="mb-4 flex h-9 w-9 items-center justify-center rounded-full border border-[#D5A653]/50 text-[#D5A653]"
                  aria-hidden="true"
                >
                  ✦
                </motion.span>
                <p className="font-display text-xl text-[#F1CF8A]">{p.title}</p>
                <p className="mt-1 text-xs leading-6 text-[#F4ECDF]/55 sm:text-sm">{p.text}</p>
              </motion.li>
            ))}
          </motion.ul>

          <Reveal className="mt-10">
            <CTA href={WHATSAPP} variant="outline">
              Discover your bridal look
            </CTA>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
