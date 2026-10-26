// import { useRef, useState } from "react";
// import {
//   AnimatePresence,
//   motion,
//   useMotionValueEvent,
//   useScroll,
//   useTransform,
// } from "motion/react";
// import { useLenis } from "lenis/react";
// import { CTA, EASE, Kicker, MaskLines, Reveal } from "./motionKit";

// const services = [
//   {
//     title: "Luxury Bridal Makeup",
//     subtitle: "The bride, in her finest light.",
//     description: "A personalised bridal look designed around your features, outfit, jewellery and wedding vision.",
//     image: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg",
//   },
//   {
//     title: "HD & Advanced HD",
//     subtitle: "Every detail, beautifully blended.",
//     description: "Refined makeup for a polished appearance in person and in your wedding photographs.",
//     image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     title: "Airbrush Makeup",
//     subtitle: "Light. Seamless. Elegant.",
//     description: "An even, lightweight-looking finish for a sophisticated bridal beauty experience.",
//     image: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     title: "Reception & Engagement",
//     subtitle: "A look for every celebration.",
//     description: "Makeup tailored to your event, outfit and personal style, from engagement to reception.",
//     image: "https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?auto=format&fit=crop&w=1000&q=85",
//   },
//   {
//     title: "Hair Styling & Saree Draping",
//     subtitle: "The finishing touches.",
//     description: "Complete your look with coordinated hairstyling and elegant saree draping.",
//     image: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=1000&q=85",
//   },
// ];

// const pad = (n) => String(n).padStart(2, "0");

// const panelVariants = {
//   enter: (dir) => ({ clipPath: dir > 0 ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 100% 0%)", zIndex: 2 }),
//   center: { clipPath: "inset(0% 0% 0% 0%)", zIndex: 2, transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } },
//   exit: { zIndex: 1, scale: 1.08, transition: { duration: 1, ease: EASE } },
// };

// /* ---------------- Desktop: pinned, scroll-driven ---------------- */
// function PinnedServices({ header }) {
//   const trackRef = useRef(null);
//   const [active, setActive] = useState(0);
//   const [direction, setDirection] = useState(1);
//   const lenis = useLenis();

//   const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
//   const rail = useTransform(scrollYProgress, [0, 1], [0, 1]);

//   const activeRef = useRef(0);
//   useMotionValueEvent(scrollYProgress, "change", (v) => {
//     const i = Math.min(services.length - 1, Math.max(0, Math.floor(v * services.length)));
//     if (i === activeRef.current) return;
//     setDirection(i > activeRef.current ? 1 : -1);
//     activeRef.current = i;
//     setActive(i);
//   });

//   const goTo = (i) => {
//     const el = trackRef.current;
//     if (!el) return;
//     const top = el.getBoundingClientRect().top + window.scrollY;
//     const distance = el.offsetHeight - window.innerHeight;
//     const target = top + distance * ((i + 0.5) / services.length);
//     if (lenis) lenis.scrollTo(target, { duration: 1.2 });
//     else window.scrollTo({ top: target, behavior: "smooth" });
//   };

//   const current = services[active];

//   return (
//     <div ref={trackRef} className="relative hidden lg:block" style={{ height: `${services.length * 75 + 25}vh` }}>
//       <div className="sticky top-0 flex h-screen flex-col justify-center gap-10 px-14">
//         {header}
//         <div className="mx-auto grid w-full max-w-7xl grid-cols-[0.9fr_1.1fr] items-center gap-16">
//           {/* List + progress rail */}
//           <div className="relative pl-8">
//             <div className="absolute bottom-0 left-0 top-0 w-px bg-[#D5A653]/15">
//               <motion.div style={{ scaleY: rail }} className="h-full w-full origin-top bg-[#D5A653]" />
//             </div>

//             {services.map((s, i) => {
//               const isActive = i === active;
//               return (
//                 <button
//                   key={s.title}
//                   type="button"
//                   onClick={() => goTo(i)}
//                   aria-current={isActive}
//                   className="group block w-full py-3 text-left outline-none focus-visible:ring-2 focus-visible:ring-[#F1CF8A]"
//                 >
//                   <motion.span
//                     animate={{ x: isActive ? 14 : 0, opacity: isActive ? 1 : 0.35 }}
//                     transition={{ duration: 0.6, ease: EASE }}
//                     className="flex items-baseline gap-4"
//                   >
//                     <span className="w-6 text-xs tabular-nums text-[#D5A653]">{pad(i + 1)}</span>
//                     <span
//                       className={`font-display text-3xl leading-tight transition-colors duration-500 xl:text-4xl ${
//                         isActive ? "text-[#F1CF8A]" : "text-[#F4ECDF] group-hover:text-[#F1CF8A]"
//                       }`}
//                     >
//                       {s.title}
//                     </span>
//                   </motion.span>
//                   <AnimatePresence initial={false}>
//                     {isActive && (
//                       <motion.span
//                         initial={{ height: 0, opacity: 0 }}
//                         animate={{ height: "auto", opacity: 1 }}
//                         exit={{ height: 0, opacity: 0 }}
//                         transition={{ duration: 0.5, ease: EASE }}
//                         className="block overflow-hidden pl-[3.4rem]"
//                       >
//                         <span className="block max-w-sm pt-3 text-sm font-light leading-7 text-[#F4ECDF]/65">
//                           {s.description}
//                         </span>
//                       </motion.span>
//                     )}
//                   </AnimatePresence>
//                 </button>
//               );
//             })}
//           </div>

//           {/* Image panel */}
//           <div className="relative h-[min(calc(100svh-20rem),600px,44vw)] w-[min(calc(100svh-20rem),600px,44vw)] justify-self-end overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#17120E]">
//             <AnimatePresence initial={false} custom={direction}>
//               <motion.div
//                 key={active}
//                 custom={direction}
//                 variants={panelVariants}
//                 initial="enter"
//                 animate="center"
//                 exit="exit"
//                 className="absolute inset-0"
//               >
//                 <motion.img
//                   initial={{ scale: 1.25 }}
//                   animate={{ scale: 1 }}
//                   transition={{ duration: 1.6, ease: EASE }}
//                   src={current.image}
//                   alt={current.title}
//                   className="h-full w-full object-cover object-center"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B09] via-[#0E0B09]/20 to-transparent" />
//                 <div className="absolute inset-x-0 bottom-0 p-10">
//                   <p className="font-display text-lg italic text-[#F1CF8A]">{current.subtitle}</p>
//                   <h3 className="mt-2 max-w-lg font-display text-5xl leading-[1.02]">
//                     <MaskLines mode="mount" delay={0.35} lines={[current.title]} />
//                   </h3>
//                   <motion.div
//                     initial={{ opacity: 0, y: 16 }}
//                     animate={{ opacity: 1, y: 0 }}
//                     transition={{ delay: 0.7, duration: 0.7, ease: EASE }}
//                     className="mt-7"
//                   >
//                     <CTA href="#contact" variant="outline">
//                       Enquire about this
//                     </CTA>
//                   </motion.div>
//                 </div>
//               </motion.div>
//             </AnimatePresence>

//             {/* Counter */}
//             <div className="absolute right-8 top-8 z-10 flex items-baseline gap-1 font-display text-[#F4ECDF]">
//               <span className="relative inline-block h-[3.2rem] w-[3.4rem] overflow-hidden text-5xl leading-none">
//                 <AnimatePresence initial={false} custom={direction}>
//                   <motion.span
//                     key={active}
//                     custom={direction}
//                     initial={{ y: direction > 0 ? "100%" : "-100%" }}
//                     animate={{ y: "0%" }}
//                     exit={{ y: direction > 0 ? "-100%" : "100%" }}
//                     transition={{ duration: 0.7, ease: EASE }}
//                     className="absolute inset-0 text-right"
//                   >
//                     {pad(active + 1)}
//                   </motion.span>
//                 </AnimatePresence>
//               </span>
//               <span className="text-lg text-[#F4ECDF]/50">/ {pad(services.length)}</span>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ---------------- Mobile / tablet: stacked reveals ---------------- */
// function ServiceCard({ service, index }) {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
//   const imgY = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

//   return (
//     <article ref={ref} className="relative">
//       <motion.div
//         initial={{ clipPath: "inset(18% 8% 18% 8% round 28px)" }}
//         whileInView={{ clipPath: "inset(0% 0% 0% 0% round 28px)" }}
//         viewport={{ once: true, amount: 0.3 }}
//         transition={{ duration: 1.1, ease: EASE }}
//         className="relative aspect-square w-full overflow-hidden rounded-[28px]"
//       >
//         <motion.img style={{ y: imgY, scale: 1.2 }} src={service.image} alt={service.title} loading="lazy" className="h-full w-full object-cover" />
//         <div className="absolute inset-0 bg-gradient-to-t from-[#0E0B09] via-[#0E0B09]/20 to-transparent" />
//         <span className="absolute right-5 top-5 font-display text-4xl text-[#F4ECDF]/80">{pad(index + 1)}</span>
//         <div className="absolute inset-x-0 bottom-0 p-6">
//           <p className="font-display text-lg italic text-[#F1CF8A]">{service.subtitle}</p>
//           <h3 className="mt-1 font-display text-4xl leading-tight">
//             <MaskLines lines={[service.title]} amount={0.8} />
//           </h3>
//         </div>
//       </motion.div>
//       <Reveal as="p" className="mt-5 text-sm font-light leading-7 text-[#F4ECDF]/65">
//         {service.description}
//       </Reveal>
//     </article>
//   );
// }

// /* ------------------------------------------------------------------ */
// function ServicesHeader({ className = "" }) {
//   return (
//     <div className={`grid gap-8 md:grid-cols-2 md:items-end ${className}`}>
//       <div>
//         <Kicker>The art of bridal beauty</Kicker>
//         <h2 className="font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">
//           <MaskLines lines={["Our makeup", { text: "services", className: "italic text-gold-gradient" }]} />
//         </h2>
//       </div>
//       <Reveal as="p" delay={0.15} className="max-w-md text-sm font-light leading-7 text-[#F4ECDF]/60 md:justify-self-end">
//         Every occasion deserves its own expression of beauty. Scroll through the experiences we create for your most memorable moments.
//       </Reveal>
//     </div>
//   );
// }

// /* ------------------------------------------------------------------ */
// export default function Services() {
//   return (
//     <section id="services" className="relative bg-[#17120E] pt-24 text-[#F4ECDF] sm:pt-32 lg:pt-0">
//       <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D5A653]/40 to-transparent" />

//       <PinnedServices header={<ServicesHeader className="mx-auto w-full max-w-7xl" />} />

//       <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-8 lg:hidden">
//         <ServicesHeader />
//       </div>

//       <div className="mx-auto max-w-2xl space-y-16 px-5 pb-24 sm:px-8 lg:hidden">
//         {services.map((s, i) => (
//           <ServiceCard key={s.title} service={s} index={i} />
//         ))}
//       </div>

//       <div className="mx-auto max-w-7xl px-5 pb-24 sm:px-8 lg:px-14">
//         <Reveal className="flex flex-col gap-6 border-t border-[#D5A653]/20 pt-10 sm:flex-row sm:items-center sm:justify-between">
//           <p className="font-display text-2xl italic text-[#F4ECDF]/75">Your occasion. Your style. Your signature look.</p>
//           <CTA href="#contact">Plan your bridal look</CTA>
//         </Reveal>
//       </div>
//     </section>
//   );
// }
import { useState } from "react";
import { MotionConfig, motion } from "motion/react";

/* =====================================================================
   EDITABLE DETAILS (change these, not the code below)
   ===================================================================== */

// WhatsApp number: country code + number, no "+" or spaces.
const WHATSAPP_NUMBER = "919363250028";

// Message for the main "Plan your bridal look" button.
const GENERAL_MESSAGE =
  "Hi Aara Makeovers, I'd like to plan my bridal look. My wedding date is ___ and the venue is in ___.";

// Message for each "Enquire" link. {service} is replaced with the service name.
const SERVICE_MESSAGE = "Hi Aara Makeovers, I'd like to enquire about {service}. My event date is ___.";

// Section text.
const COPY = {
  kicker: "The art of bridal beauty",
  heading: "Bridal makeup",
  headingAccent: "services",
  intro:
    "Every occasion deserves its own look. Choose the service that fits your day, and we'll shape it around your features, outfit and jewellery.",
  finishesLabel: "Finishes you can choose from",
  cta: "Plan your bridal look",
};

// Main services. Add a Cloudinary photo URL to each "image".
// Leave image as "" and an elegant gold monogram placeholder shows instead.
const SERVICES = [
  {
    title: "Bridal Makeup",
    description:
      "Your wedding look, built around your skin tone, features, saree and jewellery. Made for traditional South Indian weddings.",
    image: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg",
  },
  {
    title: "HD Bridal Makeup",
    description: "A smooth, natural-looking finish that keeps your skin fresh and photographs beautifully.",
    image: "", // ADD photo
  },
  {
    title: "Advanced HD Bridal Makeup",
    description: "Detailed skin preparation and custom complexion work for a refined, long-lasting bridal look.",
    image: "", // ADD photo
  },
  {
    title: "Airbrush Bridal Makeup",
    description: "A lightweight, even and camera-ready finish for a polished, premium bridal appearance.",
    image: "", // ADD photo
  },
  {
    title: "Reception & Party Makeovers",
    description: "Makeup and hairstyling for receptions, engagements, parties and special occasions.",
    image: "", // ADD photo
  },
  {
    title: "Bridesmaid Makeup",
    description: "Polished, elegant looks for your bridesmaids and bridal party, matched to the wedding theme.",
    image: "", // ADD photo
  },
];

// Makeup finishes shown as small chips. Set to [] to hide this row.
const FINISHES = [
  "Glossy",
  "Dewy",
  "Minimal",
  "No-makeup look",
  "Transfer-proof",
  "Water-resistant",
  "Long-lasting",
];

/* =====================================================================
   Helpers and shared pieces
   ===================================================================== */

const EASE = [0.22, 1, 0.36, 1];
const GOLD_TEXT =
  "italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]";

const waLink = (message) => `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

// Cloudinary: square crop, smart focus, auto format and quality.
function cld(url, width) {
  if (!url || !url.includes("res.cloudinary.com") || !url.includes("/upload/")) return url;
  return url.replace("/upload/", `/upload/c_fill,g_auto,ar_1:1,w_${width},f_auto,q_auto/`);
}

const fadeUp = {
  hidden: { opacity: 0, y: 26 },
  visible: (delay = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.9, delay, ease: EASE } }),
};
const maskWord = {
  hidden: { y: "110%" },
  visible: { y: "0%", transition: { duration: 1, ease: EASE } },
};

function ArrowIcon({ className = "h-3.5 w-3.5" }) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" className={className}>
      <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function PillButton({ href, children, variant = "solid", external = false }) {
  const solid = variant === "solid";
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`group/pill inline-flex items-center gap-3 rounded-full py-2 pl-6 pr-2 font-body text-sm font-medium tracking-wide transition-colors duration-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F1CF8A] focus-visible:ring-offset-2 focus-visible:ring-offset-[#17120E] ${solid
          ? "bg-[#D5A653] text-[#0E0B09] hover:bg-[#F1CF8A]"
          : "border border-[#D5A653]/60 text-[#F1CF8A] hover:border-[#F1CF8A] hover:bg-[#D5A653]/10"
        }`}
    >
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/pill:-rotate-45 group-hover/pill:translate-x-0.5 ${solid ? "bg-[#0E0B09] text-[#F1CF8A]" : "bg-[#D5A653] text-[#0E0B09]"
          }`}
      >
        <ArrowIcon />
      </span>
    </a>
  );
}

function Kicker({ children }) {
  return (
    <p className="mb-5 flex items-center gap-4 font-display text-lg italic text-[#F1CF8A] sm:text-xl">
      <motion.span
        aria-hidden="true"
        variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease: EASE } } }}
        className="h-px w-12 origin-left bg-[#D5A653]"
      />
      {children}
    </p>
  );
}

// Square image with a gold monogram fallback if there is no photo or it fails to load.
function SquareImg({ src, alt }) {
  const [failed, setFailed] = useState(!src);
  return (
    <div className="relative aspect-square w-28 shrink-0 overflow-hidden rounded-[28px] border border-[#D5A653]/30 transition-colors duration-500 group-hover:border-[#F1CF8A]/80 sm:w-32 xl:w-28 2xl:w-32">
      {failed ? (
        <div
          role="img"
          aria-label={alt}
          className="flex h-full w-full items-center justify-center bg-gradient-to-br from-[#3A0E18] via-[#17120E] to-[#0E0B09]"
        >
          <span className={`font-display text-4xl ${GOLD_TEXT}`}>A</span>
        </div>
      ) : (
        <img
          src={cld(src, 300)}
          srcSet={`${cld(src, 300)} 300w, ${cld(src, 600)} 600w`}
          sizes="128px"
          alt={alt}
          width="300"
          height="300"
          loading="lazy"
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-cover object-center transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
        />
      )}
    </div>
  );
}

/* =====================================================================
   Services
   ===================================================================== */

export default function Services() {
  return (
    <MotionConfig reducedMotion="user">
      <section
        id="services"
        aria-labelledby="services-title"
        className="relative isolate flex min-h-[100svh] flex-col justify-center overflow-hidden bg-[#17120E] py-24 font-body text-[#F4ECDF] lg:py-16"
      >
        {/* Soft glows + top hairline */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute right-[-12%] top-[30%] h-[520px] w-[520px] rounded-full bg-[#7A1426]/25 blur-[150px]" />
          <div className="absolute left-[-10%] top-[-10%] h-[420px] w-[420px] rounded-full bg-[#D5A653]/[0.06] blur-[130px]" />
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#D5A653]/40 to-transparent" />
        </div>

        <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
          {/* ---------------- Header ---------------- */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="grid gap-6 md:grid-cols-2 md:items-end"
          >
            <div>
              <Kicker>{COPY.kicker}</Kicker>
              <motion.h2
                id="services-title"
                variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
                className="font-display text-5xl font-medium leading-[1.02] tracking-[-0.01em] sm:text-6xl"
              >
                {COPY.heading.split(" ").map((word) => (
                  <span key={word} className="-mb-[0.12em] mr-[0.25em] inline-block overflow-hidden pb-[0.12em] align-bottom">
                    <motion.span variants={maskWord} className="inline-block">
                      {word}
                    </motion.span>
                  </span>
                ))}
                <span className="-mb-[0.12em] inline-block overflow-hidden pb-[0.12em] pr-[0.08em] align-bottom">
                  <motion.span variants={maskWord} className={`inline-block pr-[0.08em] ${GOLD_TEXT}`}>
                    {COPY.headingAccent}
                  </motion.span>
                </span>
              </motion.h2>
            </div>
            <motion.p
              variants={fadeUp}
              custom={0.2}
              className="max-w-md text-base font-light leading-7 text-[#F4ECDF]/65 md:justify-self-end"
            >
              {COPY.intro}
            </motion.p>
          </motion.div>

          {/* ---------------- Services list (everything visible, nothing behind clicks) ---------------- */}
          <ul className="mt-12 grid gap-x-12 lg:mt-10 lg:grid-cols-2 xl:grid-cols-3">
            {SERVICES.map((s, i) => (
              <motion.li
                key={s.title}
                variants={fadeUp}
                custom={(i % 3) * 0.08}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}
              >
                <article className="group flex h-full gap-5 border-t border-[#D5A653]/20 py-7 transition-colors duration-500 hover:border-[#D5A653]/60 sm:gap-6">
                  <SquareImg src={s.image} alt={`${s.title} by Aara Makeovers`} />
                  <div className="flex min-w-0 flex-col">
                    <h3 className="font-display text-2xl leading-tight transition-colors duration-500 group-hover:text-[#F1CF8A]">
                      {s.title}
                    </h3>
                    <p className="mt-2 text-sm font-light leading-6 text-[#F4ECDF]/65">{s.description}</p>
                    <a
                      href={waLink(SERVICE_MESSAGE.replace("{service}", s.title))}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Enquire about ${s.title} on WhatsApp`}
                      className="mt-auto inline-flex w-fit items-center gap-2.5 rounded-full pt-4 text-sm text-[#F1CF8A] transition-colors duration-500 hover:text-[#F4ECDF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#F1CF8A]"
                    >
                      Enquire
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-[#D5A653]/50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:-rotate-45 group-hover:border-[#F1CF8A]">
                        <ArrowIcon className="h-3 w-3" />
                      </span>
                    </a>
                  </div>
                </article>
              </motion.li>
            ))}
          </ul>

          {/* ---------------- Finishes + CTA ---------------- */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="flex flex-col gap-8 border-t border-[#D5A653]/20 pt-8 lg:flex-row lg:items-end lg:justify-between"
          >
            {FINISHES.length > 0 && (
              <div>
                <p className="font-display text-lg italic text-[#F1CF8A]">{COPY.finishesLabel}</p>
                <ul aria-label={COPY.finishesLabel} className="mt-4 flex flex-wrap gap-2">
                  {FINISHES.map((f) => (
                    <li
                      key={f}
                      className="rounded-full border border-[#D5A653]/30 px-4 py-1.5 text-sm tracking-wide text-[#F1CF8A]/90 transition-colors duration-500 hover:border-[#F1CF8A]/80"
                    >
                      {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="shrink-0">
              <PillButton href={waLink(GENERAL_MESSAGE)} external>
                {COPY.cta}
              </PillButton>
            </div>
          </motion.div>
        </div>
      </section>
    </MotionConfig>
  );
}