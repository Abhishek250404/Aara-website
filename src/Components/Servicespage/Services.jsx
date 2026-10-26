// import { useState } from "react";
// import { motion, MotionConfig, useScroll, useSpring } from "motion/react";
// import Navbar from "../Navbar/Navbar";

// /* ------------------------------------------------------------------
//    Contact details and photos, same as the homepage and About page.
//    Swap any photo by changing its URL or path. If a file is missing,
//    a dark placeholder shows instead.
// ------------------------------------------------------------------- */
// const WHATSAPP = "https://wa.me/919363250028";
// const PHONE = "tel:+919363250028";
// const PHONE_DISPLAY = "93632 50028";

// const IMAGES = {
//   hero: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg",
//   bridal: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=85",
//   makeover: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?auto=format&fit=crop&w=900&q=85",
//   occasion: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
//   longWear: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
// };

// /* Quick links shown in the hero */
// const categories = [
//   { id: "bridal", label: "Bridal" },
//   { id: "makeover", label: "Beauty makeover" },
//   { id: "occasion", label: "Occasion looks" },
//   { id: "long-wear", label: "Long-wear" },
// ];

// /* Services from the Google Business listing, grouped by type */
// const bridalItems = [
//   { name: "Bridal Makeup", text: "Tailored to your skin tone, features, outfit and jewellery." },
//   { name: "HD Bridal Makeup", text: "Smooth, natural, camera-friendly skin with a fresh finish." },
//   { name: "Advanced HD Bridal Makeup", text: "Premium skin prep and refined finishing for a lasting look." },
//   { name: "Airbrush Bridal Makeup", text: "A lightweight, even finish that looks polished in photos." },
//   { name: "Wedding Makeup", text: "Polished and elegant, matched to your outfit and style." },
//   { name: "Bridesmaid Makeup", text: "Complements the wedding theme for the whole bridal party." },
// ];

// const makeoverItems = [
//   { name: "Beauty Makeover", text: "Makeup and hairstyling together for a complete, polished look." },
//   { name: "Hairstyling", text: "Styles that complete your makeup, outfit and occasion." },
// ];

// const occasionItems = [
//   { name: "HD Makeup", text: "Smooth, refined and camera-ready, enhancing your natural features." },
//   { name: "Advanced HD Makeup", text: "Detailed application for a refined, camera-ready finish." },
//   { name: "Glossy Makeup", text: "A radiant, luminous finish for receptions and engagements." },
//   { name: "Dewy Makeup", text: "A fresh, glowing look built around your features and outfit." },
//   { name: "Minimal Makeup", text: "Clean, soft and naturally elegant with lightweight makeup." },
//   { name: "No Makeup Look", text: "A subtle, effortless look that highlights your natural beauty." },
// ];

// const longWearItems = [
//   { name: "Transfer Proof Makeup", text: "Neat, comfortable makeup that stays beautiful all event long." },
//   { name: "Water Resistant Makeup", text: "A durable finish for weddings, receptions and long events." },
//   { name: "Long Lasting Makeup", text: "An elegant, lasting finish tailored to your features and style." },
// ];

// const headlineWords = ["Makeup", "for", "every"];

// /* ----------------------- Shared style tokens ----------------------- */

// const EASE = [0.22, 1, 0.36, 1];

// /* One full screen per section on desktop, at least one screen on mobile */
// const frame =
//   "relative isolate flex min-h-[100svh] items-center overflow-hidden py-24 lg:h-[100svh] lg:min-h-[600px] lg:py-16";

// const wrap = "mx-auto w-full max-w-7xl px-6 md:px-10";

// const h2 =
//   "font-display text-5xl font-medium leading-[1.02] text-[#F4ECDF] sm:text-6xl lg:text-6xl";

// const goldText =
//   "italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]";

// /* ---------------------------- Helpers ---------------------------- */

// function Img({ src, alt, label }) {
//   const [ok, setOk] = useState(true);
//   if (!ok) {
//     return (
//       <div
//         role="img"
//         aria-label={alt}
//         className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#17120E] p-6 text-center font-body text-sm text-[#F4ECDF]/60"
//       >
//         <span>{label}</span>
//         <code className="break-all text-xs text-[#D5A653]">public{src}</code>
//       </div>
//     );
//   }
//   return (
//     <img
//       src={src}
//       alt={alt}
//       onError={() => setOk(false)}
//       loading="lazy"
//       className="block h-full w-full object-cover"
//     />
//   );
// }

// function Kicker({ children }) {
//   return (
//     <p className="flex items-center gap-4 font-display text-lg italic text-[#F1CF8A] sm:text-xl">
//       <span aria-hidden="true" className="h-px w-12 bg-[#D5A653]" />
//       {children}
//     </p>
//   );
// }

// /* Gold text button, same look as the homepage buttons */
// function PillButton({ href, children, variant = "solid", target, rel }) {
//   const solid = variant === "solid";
//   return (
//     <a
//       href={href}
//       target={target}
//       rel={rel}
//       className={`group inline-flex items-center gap-4 rounded-full px-7 py-3 font-body text-base no-underline transition-colors duration-300 ${
//         solid
//           ? "bg-[#D5A653] text-[#0E0B09] hover:bg-[#F1CF8A]"
//           : "border border-[#D5A653]/70 text-[#F4ECDF] hover:border-[#F1CF8A] hover:text-[#F1CF8A]"
//       }`}
//     >
//       <span>{children}</span>
//       <span
//         className={`flex h-9 w-9 flex-none items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${
//           solid ? "bg-[#0E0B09] text-[#F1CF8A]" : "bg-[#D5A653] text-[#0E0B09]"
//         }`}
//       >
//         <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
//           <path d="M5 12h14M13 6l6 6-6 6" />
//         </svg>
//       </span>
//     </a>
//   );
// }

// /* Headline word that slides up from a mask */
// function MaskWord({ children, delay, accent = false }) {
//   return (
//     <span aria-hidden="true" className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-top">
//       <motion.span
//         className={`inline-block ${accent ? goldText : ""}`}
//         initial={{ y: "115%" }}
//         animate={{ y: "0%" }}
//         transition={{ duration: 1.1, ease: EASE, delay }}
//       >
//         {children}
//       </motion.span>
//     </span>
//   );
// }

// /* ------------------------- Scroll progress ------------------------ */

// function ScrollProgress() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
//   return (
//     <motion.div
//       aria-hidden="true"
//       style={{ scaleX }}
//       className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-[#7A1426] via-[#D5A653] to-[#F1CF8A]"
//     />
//   );
// }

// /* ------------------------------ Hero ------------------------------ */

// function Hero() {
//   return (
//     <section aria-labelledby="services-title" className={frame}>
//       {/* Ambient glows */}
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
//         <div className="absolute right-[-15%] top-[5%] h-[640px] w-[640px] rounded-full bg-[#D5A653]/10 blur-[140px]" />
//         <div className="absolute bottom-[-25%] left-[-15%] h-[560px] w-[560px] rounded-full bg-[#7A1426]/30 blur-[150px]" />
//         <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0E0B09] to-transparent" />
//       </div>

//       <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10`}>
//         <div className="flex flex-col gap-6">
//           <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
//             <Kicker>Makeup services in Madurai</Kicker>
//           </motion.div>

//           <h1
//             id="services-title"
//             aria-label="Makeup for every celebration."
//             className="font-display font-medium text-[length:clamp(2.9rem,min(7.4vw,9svh),6.4rem)] leading-[0.98] tracking-[-0.02em] text-[#F4ECDF]"
//           >
//             {headlineWords.map((w, i) => (
//               <MaskWord key={w} delay={0.2 + i * 0.07}>
//                 {w}
//               </MaskWord>
//             ))}
//             <MaskWord delay={0.41} accent>
//               celebration.
//             </MaskWord>
//           </h1>

//           <motion.p
//             className="max-w-lg font-body text-lg font-light leading-8 text-[#F4ECDF]/70 xl:text-xl xl:leading-9"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: EASE, delay: 0.8 }}
//           >
//             From bridal looks to beauty makeovers, every service is customised to your skin tone, features, outfit
//             and the occasion.
//           </motion.p>

//           <motion.div
//             className="flex flex-wrap items-center gap-4"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: EASE, delay: 0.95 }}
//           >
//             <PillButton href="/contact">Book a trial</PillButton>
//             <PillButton href="#bridal" variant="outline">
//               Explore services
//             </PillButton>
//           </motion.div>

//           <motion.nav
//             aria-label="Service categories"
//             className="flex flex-wrap gap-2"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease: EASE, delay: 1.05 }}
//           >
//             {categories.map((c) => (
//               <a
//                 key={c.id}
//                 href={`#${c.id}`}
//                 className="rounded-full border border-[#D5A653]/40 px-4 py-1.5 font-body text-sm text-[#E9C98C] transition-colors duration-300 hover:border-[#F1CF8A] hover:text-[#F1CF8A]"
//               >
//                 {c.label}
//               </a>
//             ))}
//           </motion.nav>
//         </div>

//         {/* Square image with gold frame */}
//         <div className="relative mx-auto w-full max-w-[340px] lg:mx-0 lg:w-[min(calc(100svh-14rem),42vw,460px)] lg:max-w-none lg:justify-self-end">
//           <div aria-hidden="true" className="pointer-events-none absolute -inset-[7px] rounded-[35px] border border-[#D5A653]/80" />
//           <motion.div
//             className="relative aspect-square overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#17120E]"
//             initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
//             animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
//             transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
//           >
//             <Img src={IMAGES.hero} alt="Bride in luxury bridal makeup by Aara Makeovers" label="Hero bridal photo" />
//           </motion.div>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------- Service cards -------------------------- */

// function ServiceCard({ name, text, index }) {
//   return (
//     <motion.li
//       initial={{ opacity: 0, y: 30 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.3 }}
//       transition={{ duration: 0.7, ease: EASE, delay: index * 0.07 }}
//       className="group flex flex-col gap-2 rounded-[28px] border border-[#D5A653]/25 bg-[#17120E] p-5 transition-colors duration-500 hover:border-[#D5A653]/70 sm:p-6"
//     >
//       <div className="flex items-baseline justify-between gap-3">
//         <h3 className="font-display text-xl leading-tight text-[#F4ECDF] sm:text-2xl">{name}</h3>
//         <span className="flex-none font-display text-base italic text-[#F1CF8A]">
//           {String(index + 1).padStart(2, "0")}
//         </span>
//       </div>
//       <p className="font-body text-sm leading-6 text-[#F4ECDF]/60">{text}</p>
//     </motion.li>
//   );
// }

// /* --------------------------- Service section ---------------------------- */

// function ServiceSection({ id, kicker, title, accent, text, image, alt, reverse = false, bg = "", tags, items }) {
//   const titleId = `${id}-title`;
//   return (
//     <section id={id} aria-labelledby={titleId} className={`${frame} ${bg}`}>
//       <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16`}>
//         <div className={`relative mx-auto w-full max-w-[400px] lg:max-w-[440px] ${reverse ? "lg:order-2" : ""}`}>
//           <div aria-hidden="true" className="pointer-events-none absolute -inset-[7px] rounded-[35px] border border-[#D5A653]/80" />
//           <div className="relative aspect-square overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#17120E]">
//             <Img src={image} alt={alt} label={title} />
//           </div>
//         </div>

//         <div className={`flex flex-col gap-5 ${reverse ? "lg:order-1" : ""}`}>
//           <Kicker>{kicker}</Kicker>
//           <h2 id={titleId} className={h2}>
//             {title} <span className={goldText}>{accent}</span>
//           </h2>
//           <p className="max-w-xl font-body text-base leading-7 text-[#F4ECDF]/65">{text}</p>

//           {tags && (
//             <ul className="flex flex-wrap gap-2">
//               {tags.map((t) => (
//                 <li key={t} className="rounded-full border border-[#D5A653]/40 px-4 py-1.5 font-body text-sm text-[#E9C98C]">
//                   {t}
//                 </li>
//               ))}
//             </ul>
//           )}

//           <ul className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2">
//             {items.map((item, i) => (
//               <ServiceCard key={item.name} name={item.name} text={item.text} index={i} />
//             ))}
//           </ul>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------ Booking ---------------------------- */

// function BookingCTA() {
//   return (
//     <section
//       id="book"
//       aria-labelledby="book-title"
//       className={`${frame} bg-gradient-to-br from-[#5A1020] via-[#3E0B16] to-[#1E060B]`}
//     >
//       {/* Rounded square outline, drawn as you scroll in */}
//       <svg
//         aria-hidden="true"
//         viewBox="0 0 440 440"
//         className="pointer-events-none absolute -right-[6%] top-1/2 h-[min(520px,80svh)] w-[min(520px,80svh)] -translate-y-1/2 text-[#D5A653]/30"
//       >
//         <motion.rect
//           x="1"
//           y="1"
//           width="438"
//           height="438"
//           rx="27"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="1"
//           initial={{ pathLength: 0 }}
//           whileInView={{ pathLength: 1 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 2.2, ease: "easeInOut" }}
//         />
//       </svg>

//       <motion.div
//         className={`${wrap} relative`}
//         initial={{ opacity: 0, y: 40 }}
//         whileInView={{ opacity: 1, y: 0 }}
//         viewport={{ once: true, amount: 0.5 }}
//         transition={{ duration: 1, ease: EASE }}
//       >
//         <div className="flex max-w-3xl flex-col gap-6">
//           <Kicker>Now booking</Kicker>
//           <h2
//             id="book-title"
//             className="font-display text-[length:clamp(2.6rem,6vw,5.5rem)] font-medium leading-[0.98] text-[#F4ECDF]"
//           >
//             Let's find your <span className={goldText}>look.</span>
//           </h2>
//           <p className="max-w-[44ch] font-body text-base leading-8 text-[#F4ECDF]/70">
//             Share your date, the occasion and the look you're imagining. We'll reply on WhatsApp to plan your trial
//             and confirm your booking.
//           </p>
//           <div className="flex flex-wrap items-center gap-6">
//             <PillButton href={WHATSAPP} target="_blank" rel="noreferrer">
//               Message on WhatsApp
//             </PillButton>
//             <a href={PHONE} className="font-body text-[#F1CF8A] underline-offset-4 hover:underline">
//               Call {PHONE_DISPLAY}
//             </a>
//           </div>
//         </div>
//       </motion.div>
//     </section>
//   );
// }

// /* ------------------------------ Page ------------------------------ */

// export default function Services() {
//   return (
//     <MotionConfig reducedMotion="user">
//       <div className="overflow-x-clip bg-[#0E0B09] font-body text-[#F4ECDF] antialiased">
//         <Navbar />
//         <ScrollProgress />

//         <main>
//           <Hero />

//           <ServiceSection
//             id="bridal"
//             kicker="Bridal services"
//             title="Bridal"
//             accent="makeup"
//             text="Your wedding look, planned around your skin, outfit and jewellery, so you feel like yourself from the first ritual to the last photo."
//             image={IMAGES.bridal}
//             alt="Traditional bridal makeup look"
//             items={bridalItems}
//           />

//           <ServiceSection
//             id="makeover"
//             kicker="Beauty makeover"
//             title="Complete"
//             accent="makeovers"
//             text="From makeup to hairstyling, we finish the whole look, customised for every occasion."
//             image={IMAGES.makeover}
//             alt="Beauty makeover in progress"
//             reverse
//             bg="bg-[#17120E]"
//             tags={["Brides", "Receptions", "Engagements", "Parties", "Special occasions"]}
//             items={makeoverItems}
//           />

//           <ServiceSection
//             id="occasion"
//             kicker="Everyday & occasion"
//             title="Looks for"
//             accent="every occasion"
//             text="For engagements, receptions, parties and celebrations, from soft and natural to glossy and glamorous."
//             image={IMAGES.occasion}
//             alt="HD makeup look for a special occasion"
//             items={occasionItems}
//           />

//           <ServiceSection
//             id="long-wear"
//             kicker="Long-wear"
//             title="Makeup that"
//             accent="lasts"
//             text="For long wedding days, looks that stay fresh and comfortable from the morning rituals to the last dance."
//             image={IMAGES.longWear}
//             alt="Long-lasting bridal makeup look"
//             reverse
//             bg="bg-[#17120E]"
//             items={longWearItems}
//           />

//           <BookingCTA />
//         </main>
//       </div>
//     </MotionConfig>
//   );
// }

import { useState } from "react";
import { motion, MotionConfig, useScroll, useSpring } from "motion/react";
import Navbar from "../Navbar/Navbar";

/* ------------------------------------------------------------------
   Same dark and gold style as the homepage, with a different layout:
   a centred hero, one bento-grid screen per collection (square tiles,
   every service visible), and a booking card.
   Swap any photo by changing its URL or path. If a file is missing,
   a placeholder shows instead.
------------------------------------------------------------------- */
const WHATSAPP = "https://wa.me/919363250028";
const PHONE = "tel:+919363250028";
const PHONE_DISPLAY = "93632 50028";

const IMAGES = {
  hero: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg",
  bridal: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=85",
  makeover: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?auto=format&fit=crop&w=900&q=85",
  occasion: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
  longWear: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
};

/* Services from the Google Business listing, grouped by type */
const bridalItems = [
  { name: "Bridal Makeup", text: "Tailored to your skin tone, features, outfit and jewellery." },
  { name: "HD Bridal Makeup", text: "Smooth, natural, camera-friendly skin with a fresh finish." },
  { name: "Advanced HD Bridal Makeup", text: "Premium skin prep and refined finishing for a lasting look." },
  { name: "Airbrush Bridal Makeup", text: "A lightweight, even finish that looks polished in photos." },
  { name: "Wedding Makeup", text: "Polished and elegant, matched to your outfit and style." },
  { name: "Bridesmaid Makeup", text: "Complements the wedding theme for the whole bridal party." },
];

const makeoverItems = [
  { name: "Beauty Makeover", text: "Makeup and hairstyling together for a complete, polished look." },
  { name: "Hairstyling", text: "Styles that complete your makeup, outfit and occasion." },
];

const occasionItems = [
  { name: "HD Makeup", text: "Smooth, refined and camera-ready, enhancing your natural features." },
  { name: "Advanced HD Makeup", text: "Detailed application for a refined, camera-ready finish." },
  { name: "Glossy Makeup", text: "A radiant, luminous finish for receptions and engagements." },
  { name: "Dewy Makeup", text: "A fresh, glowing look built around your features and outfit." },
  { name: "Minimal Makeup", text: "Clean, soft and naturally elegant with lightweight makeup." },
  { name: "No Makeup Look", text: "A subtle, effortless look that highlights your natural beauty." },
];

const longWearItems = [
  { name: "Transfer Proof Makeup", text: "Neat, comfortable makeup that stays beautiful all event long." },
  { name: "Water Resistant Makeup", text: "A durable finish for weddings, receptions and long events." },
  { name: "Long Lasting Makeup", text: "An elegant, lasting finish tailored to your features and style." },
];

/* The four service groups shown in the panels */
const categoriesData = [
  {
    id: "bridal",
    short: "Planned around your skin, outfit and jewellery, from the first ritual to the last photo.",
    label: "Bridal",
    kicker: "Bridal services",
    title: "Bridal",
    accent: "makeup",
    text: "Your wedding look, planned around your skin, outfit and jewellery, so you feel like yourself from the first ritual to the last photo.",
    image: IMAGES.bridal,
    alt: "Traditional bridal makeup look",
    items: bridalItems,
  },
  {
    id: "makeover",
    short: "Makeup and hairstyling together, for brides, receptions, engagements and parties.",
    label: "Beauty makeover",
    kicker: "Beauty makeover",
    title: "Complete",
    accent: "makeovers",
    text: "From makeup to hairstyling, we finish the whole look, customised for every occasion.",
    tags: ["Brides", "Receptions", "Engagements", "Parties", "Special occasions"],
    image: IMAGES.makeover,
    alt: "Beauty makeover in progress",
    items: makeoverItems,
  },
  {
    id: "occasion",
    short: "From soft and natural to glossy and glamorous, for every celebration.",
    label: "Occasion looks",
    kicker: "Everyday & occasion",
    title: "Looks for",
    accent: "every occasion",
    text: "For engagements, receptions, parties and celebrations, from soft and natural to glossy and glamorous.",
    image: IMAGES.occasion,
    alt: "HD makeup look for a special occasion",
    items: occasionItems,
  },
  {
    id: "long-wear",
    short: "Fresh and comfortable from the morning rituals to the last dance.",
    label: "Long-wear",
    kicker: "Long-wear",
    title: "Makeup that",
    accent: "lasts",
    text: "For long wedding days, looks that stay fresh and comfortable from the morning rituals to the last dance.",
    image: IMAGES.longWear,
    alt: "Long-lasting bridal makeup look",
    items: longWearItems,
  },
];

const bookingSteps = [
  { title: "Share your date", text: "Tell us the day, the occasion and the look you have in mind." },
  { title: "Book a trial", text: "Try your look and fine-tune it before the big day." },
  { title: "On the day", text: "We arrive early with a complete kit and finish calmly, on time." },
];

const headlineWords = ["Makeup", "for", "every"];

/* ----------------------- Shared style tokens ----------------------- */

const EASE = [0.22, 1, 0.36, 1];
const pad = (n) => String(n).padStart(2, "0");

/* One screen per section on desktop, at least one screen on mobile */
const frame =
  "relative flex min-h-[100svh] items-center overflow-hidden py-24 lg:h-[100svh] lg:min-h-[640px] lg:py-14";

const wrap = "mx-auto w-full max-w-7xl px-6 md:px-10";

const goldText =
  "italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]";

/* ---------------------------- Helpers ---------------------------- */

function Img({ src, alt, label }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#17120E] p-4 text-center font-body text-sm text-[#F4ECDF]/60"
      >
        <span>{label}</span>
        <code className="break-all text-xs text-[#D5A653]">public{src}</code>
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      onError={() => setOk(false)}
      loading="lazy"
      className="block h-full w-full object-cover"
    />
  );
}

function Kicker({ children, center = false }) {
  return (
    <p
      className={`flex items-center gap-4 font-display text-lg italic text-[#F1CF8A] sm:text-xl ${
        center ? "justify-center" : ""
      }`}
    >
      <span aria-hidden="true" className="h-px w-12 bg-[#D5A653]" />
      {children}
    </p>
  );
}

/* Gold text button, same look as the homepage buttons */
function PillButton({ href, children, variant = "solid", target, rel }) {
  const solid = variant === "solid";
  return (
    <a
      href={href}
      target={target}
      rel={rel}
      className={`group inline-flex items-center gap-4 rounded-full px-7 py-3 font-body text-base no-underline transition-colors duration-300 ${
        solid
          ? "bg-[#D5A653] text-[#0E0B09] hover:bg-[#F1CF8A]"
          : "border border-[#D5A653]/70 text-[#F4ECDF] hover:border-[#F1CF8A] hover:text-[#F1CF8A]"
      }`}
    >
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 flex-none items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${
          solid ? "bg-[#0E0B09] text-[#F1CF8A]" : "bg-[#D5A653] text-[#0E0B09]"
        }`}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      </span>
    </a>
  );
}

/* Headline word that slides up from a mask */
function MaskWord({ children, delay, accent = false }) {
  return (
    <span aria-hidden="true" className="mr-[0.22em] inline-block overflow-hidden pb-[0.12em] align-top">
      <motion.span
        className={`inline-block ${accent ? goldText : ""}`}
        initial={{ y: "115%" }}
        animate={{ y: "0%" }}
        transition={{ duration: 1.1, ease: EASE, delay }}
      >
        {children}
      </motion.span>
    </span>
  );
}

/* ------------------------- Scroll progress ------------------------ */

function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
  return (
    <motion.div
      aria-hidden="true"
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-gradient-to-r from-[#7A1426] via-[#D5A653] to-[#F1CF8A]"
    />
  );
}

/* ------------------------------ Hero ------------------------------ */
/* Centred composition: no split layout, the headline carries the page */

function Hero() {
  const stats = [
    { value: "17", label: "services" },
    { value: "4", label: "categories" },
    { value: "Madurai", label: "studio" },
  ];

  return (
    <section aria-labelledby="services-title" className={`${frame} isolate`}>
      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-20%] h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-[#7A1426]/25 blur-[150px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0E0B09] to-transparent" />
      </div>

      <div className={`${wrap} flex flex-col items-center gap-8 text-center`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
          <Kicker center>Makeup services</Kicker>
        </motion.div>

        <h1
          id="services-title"
          aria-label="Makeup for every celebration."
          className="max-w-5xl font-display font-medium text-[length:clamp(3rem,min(8.2vw,12svh),7.6rem)] leading-[0.95] tracking-[-0.02em] text-[#F4ECDF]"
        >
          {headlineWords.map((w, i) => (
            <MaskWord key={w} delay={0.2 + i * 0.07}>
              {w}
            </MaskWord>
          ))}
          <MaskWord delay={0.41} accent>
            celebration.
          </MaskWord>
        </h1>

        <motion.p
          className="max-w-2xl font-body text-lg font-light leading-8 text-[#F4ECDF]/70 xl:text-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.8 }}
        >
          Every service is customised to your skin tone, features, outfit and the occasion, so you feel like yourself
          from morning to the last photograph.
        </motion.p>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.95 }}
        >
          <PillButton href="/contact">Book a trial</PillButton>
          <PillButton href="#bridal" variant="outline">
            Explore services
          </PillButton>
        </motion.div>

        <motion.ul
          className="mt-4 flex flex-wrap items-center justify-center gap-x-10 gap-y-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.2 }}
        >
          {stats.map((s) => (
            <li key={s.label} className="flex items-baseline gap-2">
              <span className="font-display text-3xl text-[#F1CF8A]">{s.value}</span>
              <span className="font-body text-xs uppercase tracking-[0.2em] text-[#F4ECDF]/50">{s.label}</span>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* --------------------------- Collections --------------------------- */
/* One screen per collection, laid out as a bento grid of square tiles:
   a large photo, a title tile and one tile per service. Every service
   is visible; nothing opens or closes. */

/* Tile size: four columns and three rows of squares that fit the screen */
const TILE = "max(11rem, calc((min(72rem, (100svh - 9rem) * 4 / 3, 100vw - 5rem) - 3rem) / 4))";

const ctaSpan = { 1: "lg:col-span-1", 2: "lg:col-span-2", 3: "lg:col-span-3" };

const arrow = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M7 17L17 7M9 7h8v8" />
  </svg>
);

function enquireLink(label) {
  const msg = `Hi Aara Makeovers, I'd like to enquire about ${label.toLowerCase()} makeup.`;
  return `${WHATSAPP}?text=${encodeURIComponent(msg)}`;
}

function Collection({ c, index, total }) {
  const odd = index % 2 === 1;
  const n = c.items.length;
  /* Empty cells left in the grid after the services; a gold tile fills them */
  const free = n <= 2 ? 2 - n : (4 - ((n - 2) % 4)) % 4;

  const tile = (i) => ({
    initial: { opacity: 0, y: 30 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.3 },
    transition: { duration: 0.8, ease: EASE, delay: i * 0.06 },
  });

  return (
    <section
      id={c.id}
      aria-labelledby={`${c.id}-title`}
      className={`relative flex min-h-[100svh] items-center overflow-hidden px-6 py-20 md:px-10 lg:py-10 ${
        odd ? "bg-[#17120E]" : "bg-[#0E0B09]"
      }`}
    >
      <div
        className="mx-auto flex w-full max-w-2xl flex-col gap-4 lg:w-[calc(var(--tile)*4+3rem)] lg:max-w-none"
        style={{ "--tile": TILE }}
      >
        {/* Collection nav: where you are, and the other three */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-body text-xs uppercase tracking-[0.3em] text-[#F4ECDF]/50">
            Collection <span className="text-[#F1CF8A]">{pad(index + 1)}</span> / {pad(total)}
          </p>
          <nav aria-label="Collections" className="flex flex-wrap gap-2">
            {categoriesData.map((o) => (
              <a
                key={o.id}
                href={`#${o.id}`}
                aria-current={o.id === c.id ? "true" : undefined}
                className={`rounded-full border px-3 py-1 font-body text-xs transition-colors duration-300 ${
                  o.id === c.id
                    ? "border-[#D5A653] bg-[#D5A653] text-[#0E0B09]"
                    : "border-[#D5A653]/25 text-[#F4ECDF]/60 hover:border-[#D5A653]/60 hover:text-[#F1CF8A]"
                }`}
              >
                {o.label}
              </a>
            ))}
          </nav>
        </div>

        {/* Bento grid */}
        <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:auto-rows-[minmax(var(--tile),auto)] lg:grid-flow-dense lg:grid-cols-4">
          {/* Photo, 2 x 2 */}
          <motion.li
            {...tile(0)}
            className={`group relative col-span-2 aspect-square overflow-hidden rounded-[28px] border border-[#D5A653]/25 bg-[#17120E] lg:row-span-2 lg:row-start-1 lg:aspect-auto ${
              odd ? "lg:col-start-3" : "lg:col-start-1"
            }`}
          >
            <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-[1.05]">
              <Img src={c.image} alt={c.alt} label={c.label} />
            </div>
            <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-[#0E0B09]/90 via-[#0E0B09]/10 to-transparent" />
            <a
              href={enquireLink(c.label)}
              target="_blank"
              rel="noreferrer"
              className="absolute right-4 top-4 flex items-center gap-2 rounded-full border border-[#D5A653]/60 bg-[#0E0B09]/60 px-4 py-2 font-body text-xs text-[#F1CF8A] backdrop-blur-sm transition-colors duration-300 hover:bg-[#D5A653] hover:text-[#0E0B09] sm:right-5 sm:top-5"
            >
              Enquire {arrow}
            </a>
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-7">
              <p className="font-display text-3xl italic leading-none text-[#F4ECDF] sm:text-4xl">{c.label}</p>
              <p className="font-body text-xs uppercase tracking-[0.2em] text-[#F1CF8A]">
                {n} {n === 1 ? "service" : "services"}
              </p>
            </div>
          </motion.li>

          {/* Title, 2 x 1 */}
          <motion.li
            {...tile(1)}
            className={`col-span-2 flex flex-col justify-between gap-4 rounded-[28px] border border-[#D5A653]/25 bg-gradient-to-br from-[#3A0E18] via-[#1E0C0E] to-[#17120E] p-6 lg:row-start-1 lg:p-7 ${
              odd ? "lg:col-start-1" : "lg:col-start-3"
            }`}
          >
            <p className="font-display text-base italic text-[#F1CF8A] sm:text-lg">{c.kicker}</p>
            <h2 id={`${c.id}-title`} className="font-display text-4xl font-medium leading-[1.02] text-[#F4ECDF] xl:text-5xl">
              {c.title} <span className={goldText}>{c.accent}</span>
            </h2>
            <p className="max-w-md font-body text-sm leading-6 text-[#F4ECDF]/65">{c.short}</p>
          </motion.li>

          {/* Services, 1 x 1 each */}
          {c.items.map((item, j) => (
            <motion.li
              key={item.name}
              {...tile(j + 2)}
              className="group relative flex min-h-[160px] flex-col justify-between gap-3 overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#0E0B09]/60 p-5 transition-colors duration-500 hover:border-[#D5A653]/70 lg:min-h-0"
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-br from-[#D5A653]/15 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              />
              <div className="relative flex items-center justify-between">
                <span className="font-display text-base italic text-[#D5A653]">{pad(j + 1)}</span>
                <span className="text-[#F1CF8A] opacity-40 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">
                  {arrow}
                </span>
              </div>
              <div className="relative">
                <h3 className="font-display text-xl leading-tight text-[#F4ECDF] transition-colors duration-300 group-hover:text-[#F1CF8A] xl:text-2xl">
                  {item.name}
                </h3>
                <p className="mt-2 font-body text-[13px] leading-5 text-[#F4ECDF]/55">{item.text}</p>
              </div>
            </motion.li>
          ))}

          {/* Gold tile that fills any empty cells */}
          {free > 0 && (
            <motion.li {...tile(n + 2)} className={`col-span-2 ${ctaSpan[free]}`}>
              <a
                href={enquireLink(c.label)}
                target="_blank"
                rel="noreferrer"
                className="group flex h-full min-h-[160px] flex-col justify-between gap-4 rounded-[28px] bg-gradient-to-br from-[#F1CF8A] via-[#D5A653] to-[#B8862F] p-6 text-[#0E0B09] lg:min-h-0 lg:p-7"
              >
                <p className="font-body text-xs uppercase tracking-[0.25em]">Not sure which finish?</p>
                <div className="flex items-end justify-between gap-4">
                  <p className="font-display text-3xl leading-tight xl:text-4xl">Ask us on WhatsApp</p>
                  <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-[#0E0B09] text-[#F1CF8A] transition-transform duration-300 group-hover:rotate-45">
                    {arrow}
                  </span>
                </div>
              </a>
            </motion.li>
          )}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ Booking ---------------------------- */
/* A single card rather than a full-bleed band */

function Booking() {
  return (
    <section id="book" aria-labelledby="book-title" className="relative flex min-h-[100svh] items-center bg-[#0E0B09] py-20 lg:h-[100svh] lg:min-h-[640px] lg:py-14">
      <div className={`${wrap} w-full`}>
        <div className="relative grid gap-10 overflow-hidden rounded-[28px] border border-[#D5A653]/30 bg-[#17120E] p-8 sm:p-12 lg:grid-cols-2 lg:gap-16 lg:p-16">
          <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-[#7A1426]/35 blur-[110px]" />

          <div className="relative flex flex-col gap-6">
            <Kicker>Now booking</Kicker>
            <h2 id="book-title" className="font-display text-[length:clamp(2.6rem,5vw,4.5rem)] font-medium leading-[1] text-[#F4ECDF]">
              Let's plan your <span className={goldText}>look.</span>
            </h2>
            <p className="max-w-md font-body text-base leading-8 text-[#F4ECDF]/70">
              Share your date and the look you're imagining. We'll reply on WhatsApp to plan your trial and confirm
              your booking.
            </p>
            <div className="flex flex-wrap items-center gap-6">
              <PillButton href={WHATSAPP} target="_blank" rel="noreferrer">
                Message on WhatsApp
              </PillButton>
              <a href={PHONE} className="font-body text-[#F1CF8A] underline-offset-4 hover:underline">
                Call {PHONE_DISPLAY}
              </a>
            </div>
          </div>

          <ol className="relative flex flex-col gap-6">
            {bookingSteps.map((s, i) => (
              <li key={s.title} className="grid grid-cols-[56px_1fr] gap-5 border-t border-[#D5A653]/20 pt-6">
                <span className="font-display text-3xl italic text-[#F1CF8A]">{pad(i + 1)}</span>
                <div>
                  <h3 className="font-display text-2xl text-[#F4ECDF]">{s.title}</h3>
                  <p className="mt-1 font-body text-sm leading-6 text-[#F4ECDF]/60">{s.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Page ------------------------------ */

export default function Services() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip bg-[#0E0B09] font-body text-[#F4ECDF] antialiased">
        <Navbar />
        <ScrollProgress />

        <main>
          <Hero />
          {categoriesData.map((c, i) => (
            <Collection key={c.id} c={c} index={i} total={categoriesData.length} />
          ))}
          <Booking />
        </main>
      </div>
    </MotionConfig>
  );
}