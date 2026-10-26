import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CTA, EASE, MaskLines, WHATSAPP } from "./motionKit";

const reasons = [
  { title: "Personalised bridal looks", description: "Every bridal look is thoughtfully customised to complement your features, outfit, jewellery and personal style.", icon: "✳" },
  { title: "A luxury makeup experience", description: "A carefully planned experience focused on elegance, attention to detail and your bridal vision.", icon: "✧" },
  { title: "Advanced makeup techniques", description: "Choose from HD, Advanced HD and airbrush makeup to suit your occasion and preferred finish.", icon: "◇" },
  { title: "Beauty that feels like you", description: "From soft and natural to glamorous bridal styles, we work towards a look that reflects your personality.", icon: "♡" },
  { title: "Complete bridal styling", description: "Coordinate your makeup with hairstyling and saree draping for a polished bridal appearance.", icon: "❋" },
  { title: "Your special day matters", description: "We focus on your preferences and the details that help you feel prepared for every moment.", icon: "∞" },
];

const tones = [
  "border-[#D5A653]/25 bg-[#17120E]",
  "border-[#D5A653]/30 bg-gradient-to-br from-[#5A1020] to-[#2E0810]",
  "border-[#D5A653]/40 bg-transparent",
];

function ReasonCard({ reason, index, progress }) {
  const iconRotate = useTransform(progress, [0, 1], [0, 360 + index * 30]);

  return (
    <motion.article
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.9, delay: index * 0.06, ease: EASE }}
      whileHover={{ y: -10 }}
      className={`group relative flex h-[min(60svh,470px)] w-[78vw] shrink-0 flex-col justify-between overflow-hidden rounded-[28px] border p-7 sm:w-[400px] sm:p-9 ${
        tones[index % 3]
      } ${index % 2 === 1 ? "md:mt-10" : ""}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-[#D5A653]/10 blur-3xl transition-opacity duration-700 group-hover:opacity-100 md:opacity-0"
      />

      <motion.span
        style={{ rotate: iconRotate }}
        aria-hidden="true"
        className="flex h-14 w-14 items-center justify-center rounded-full border border-[#D5A653]/50 text-2xl text-[#F1CF8A] transition-colors duration-500 group-hover:bg-[#D5A653] group-hover:text-[#0E0B09]"
      >
        {reason.icon}
      </motion.span>

      <div className="relative">
        <h3 className="font-display text-3xl leading-[1.1] text-[#F4ECDF] transition-colors duration-500 group-hover:text-[#F1CF8A] sm:text-4xl">
          {reason.title}
        </h3>
        <p className="mt-4 text-sm leading-7 text-[#F4ECDF]/60">{reason.description}</p>
        <div className="mt-6 h-px w-14 bg-[#D5A653] transition-all duration-500 group-hover:w-28" />
      </div>
    </motion.article>
  );
}

export default function WhyChooseUs() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const distanceRef = useRef(0);
  const [distance, setDistance] = useState(0);

  useEffect(() => {
    const measure = () => {
      const track = trackRef.current;
      if (!track) return;
      const d = Math.max(0, track.scrollWidth - window.innerWidth);
      distanceRef.current = d;
      setDistance(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    window.addEventListener("resize", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform(scrollYProgress, (v) => -v * distanceRef.current);
  const headingOpacity = useTransform(scrollYProgress, [0.75, 1], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      id="why-choose-us"
      className="relative bg-[#0E0B09] text-[#F4ECDF]"
      style={{ height: `calc(100svh + ${distance}px)` }}
    >
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center gap-10 overflow-hidden py-16 md:gap-14">
        <motion.div
          aria-hidden="true"
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-[#D5A653]/[0.07] blur-[110px]"
        />

        <motion.div
          style={{ opacity: headingOpacity }}
          className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 md:flex-row md:items-end md:justify-between md:px-12 lg:px-20"
        >
          <h2 className="font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">
            <MaskLines lines={["Why brides", { text: "choose Aara", className: "italic text-gold-gradient" }]} />
          </h2>
          <div className="max-w-sm">
            <p className="text-sm leading-7 text-[#F4ECDF]/60">
              Your bridal look should feel as special as your occasion. Keep scrolling to see what makes the experience yours.
            </p>
            <div className="mt-5 h-px w-full bg-[#F4ECDF]/10">
              <motion.div style={{ scaleX: scrollYProgress }} className="h-full origin-left bg-[#D5A653]" />
            </div>
          </div>
        </motion.div>

        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex w-max items-start gap-5 pl-6 pr-6 md:gap-7 md:pl-12 lg:pl-[max(5rem,calc((100vw-80rem)/2+5rem))] lg:pr-20"
        >
          {reasons.map((r, i) => (
            <ReasonCard key={r.title} reason={r} index={i} progress={scrollYProgress} />
          ))}

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: EASE }}
            className="flex h-[min(60svh,470px)] w-[78vw] shrink-0 flex-col justify-center rounded-[28px] border border-dashed border-[#D5A653]/40 p-8 sm:w-[400px] sm:p-10"
          >
            <p className="font-display text-4xl italic leading-tight text-[#F4ECDF]/90">
              Your day. Your beauty. Your signature look.
            </p>
            <div className="mt-8">
              <CTA href={WHATSAPP}>Discuss your look</CTA>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
