// import { useRef } from "react";
// import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
// import { CTA, EASE, KolamMotif, MaskLines, WHATSAPP } from "./motionKit";

// const brideImage =
//   "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg";

// const tags = ["HD makeup", "Advanced HD", "Airbrush", "Hair & saree draping"];

// const container = {
//   hidden: {},
//   visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
// };
// const item = {
//   hidden: { opacity: 0, y: 26 },
//   visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
// };

// export default function Hero({ ready = true }) {
//   const sectionRef = useRef(null);

//   /* Scroll-out choreography */
//   const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
//   const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
//   const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
//   const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
//   const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
//   const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
//   const kolamRotate = useTransform(scrollYProgress, [0, 1], [0, 120]);
//   const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 280]);
//   const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

//   /* Mouse tilt on the arch */
//   const mx = useMotionValue(0);
//   const my = useMotionValue(0);
//   const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 20 });
//   const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 20 });

//   const handleMove = (e) => {
//     if (e.pointerType !== "mouse" || !sectionRef.current) return;
//     const r = sectionRef.current.getBoundingClientRect();
//     mx.set((e.clientX - r.left) / r.width - 0.5);
//     my.set((e.clientY - r.top) / r.height - 0.5);
//   };
//   const resetTilt = () => {
//     mx.set(0);
//     my.set(0);
//   };

//   return (
//     <section
//       ref={sectionRef}
//       id="home"
//       onPointerMove={handleMove}
//       onPointerLeave={resetTilt}
//       className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#0E0B09] pb-24 pt-28 text-[#F4ECDF] lg:pt-24"
//     >
//       {/* Ambient glows */}
//       <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
//         <motion.div
//           animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
//           transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
//           className="absolute right-[-15%] top-[5%] h-[640px] w-[640px] rounded-full bg-[#D5A653]/[0.10] blur-[140px]"
//         />
//         <div className="absolute bottom-[-25%] left-[-15%] h-[560px] w-[560px] rounded-full bg-[#7A1426]/30 blur-[150px]" />
//         <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0E0B09] to-transparent" />
//       </div>

//       <motion.div
//         style={{ opacity: contentOpacity, scale: contentScale }}
//         className="mx-auto grid w-full max-w-7xl items-center gap-16 px-6 md:px-10 lg:grid-cols-[1.08fr_0.92fr] lg:gap-10"
//       >
//         {/* ---------------- Copy ---------------- */}
//         <motion.div
//           style={{ y: textY }}
//           variants={container}
//           initial="hidden"
//           animate={ready ? "visible" : "hidden"}
//           className="relative z-10 order-2 lg:order-1"
//         >
//           <motion.p variants={item} className="mb-7 flex items-center gap-4 font-display text-lg italic text-[#F1CF8A] sm:text-xl">
//             <motion.span
//               aria-hidden="true"
//               variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease: EASE } } }}
//               className="h-px w-12 origin-left bg-[#D5A653]"
//             />
//             Luxury bridal makeup in Madurai
//           </motion.p>

//           <h1 className="font-display text-[clamp(3.1rem,7.4vw,6.4rem)] font-medium leading-[0.98] tracking-[-0.02em]">
//             <MaskLines
//               mode="parent"
//               stagger={0.08}
//               lines={[
//                 "Your dream",
//                 "bridal look,",
//                 { text: "beautifully you.", className: "italic text-gold-gradient" },
//               ]}
//             />
//           </h1>

//           <motion.p variants={item} className="mt-8 max-w-md text-base font-light leading-8 text-[#F4ECDF]/70 sm:text-lg">
//             Elegant bridal looks tailored to your style, your outfit and your jewellery, so you feel like yourself on the biggest day.
//           </motion.p>

//           <motion.div variants={item} className="mt-10 flex flex-wrap items-center gap-4">
//             <CTA href="#contact">Book your bridal date</CTA>
//             <CTA href={WHATSAPP} variant="outline">
//               WhatsApp us
//             </CTA>
//           </motion.div>

//           <motion.ul
//             variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
//             className="mt-10 flex flex-wrap gap-2"
//           >
//             {tags.map((t) => (
//               <motion.li
//                 key={t}
//                 variants={item}
//                 whileHover={{ y: -3, borderColor: "rgba(241,207,138,0.8)" }}
//                 className="rounded-full border border-[#D5A653]/30 px-4 py-1.5 text-xs tracking-wide text-[#E9C98C]"
//               >
//                 {t}
//               </motion.li>
//             ))}
//           </motion.ul>
//         </motion.div>

//         {/* ---------------- Arch image ---------------- */}
//         <div
//           className="relative order-1 mx-auto w-full max-w-[360px] sm:max-w-[430px] lg:order-2 lg:max-w-[470px]"
//           style={{ perspective: 1200 }}
//         >
//           <motion.div
//             aria-hidden="true"
//             style={{ rotate: kolamRotate }}
//             className="pointer-events-none absolute -inset-12 -z-10 text-[#D5A653]/30 sm:-inset-20"
//           >
//             <KolamMotif play={ready} duration={2.8} className="h-full w-full" />
//           </motion.div>

//           <motion.div style={{ rotateX: tiltX, rotateY: tiltY }} className="relative">
//             {/* Gold outline arch */}
//             <motion.div
//               aria-hidden="true"
//               initial={{ opacity: 0, scale: 0.94 }}
//               animate={ready ? { opacity: 1, scale: 1 } : {}}
//               transition={{ duration: 1.4, delay: 0.7, ease: EASE }}
//               className="absolute -inset-[7px] rounded-b-2xl rounded-t-[260px] border border-[#D5A653]/80"
//             />

//             {/* Image with curtain reveal + parallax */}
//             <motion.div
//               initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
//               animate={ready ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
//               transition={{ duration: 1.5, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
//               className="relative h-[440px] overflow-hidden rounded-b-xl rounded-t-[260px] sm:h-[540px] lg:h-[600px]"
//             >
//               <motion.img
//                 style={{ y: imageY, scale: imageScale }}
//                 src={brideImage}
//                 alt="Bride with luxury bridal makeup by Aara Makeovers, Madurai"
//                 className="h-full w-full object-cover object-center"
//                 fetchPriority="high"
//               />
//               <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0B09]/50 via-transparent to-transparent" />
//             </motion.div>

//             {/* Rotating seal */}
//             <motion.div
//               initial={{ opacity: 0, scale: 0.4 }}
//               animate={ready ? { opacity: 1, scale: 1 } : {}}
//               transition={{ duration: 1, delay: 1.1, ease: EASE }}
//               className="absolute -right-3 top-16 h-28 w-28 sm:-right-12 sm:h-32 sm:w-32"
//             >
//               <motion.div style={{ rotate: badgeRotate }} className="h-full w-full">
//                 <motion.svg
//                   viewBox="0 0 100 100"
//                   className="h-full w-full"
//                   animate={{ rotate: 360 }}
//                   transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
//                   aria-hidden="true"
//                 >
//                   <defs>
//                     <path id="aara-seal-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
//                   </defs>
//                   <circle cx="50" cy="50" r="49" fill="#0E0B09" fillOpacity="0.85" stroke="#D5A653" strokeOpacity="0.6" strokeWidth="0.6" />
//                   <text fill="#F1CF8A" fontSize="8.4" letterSpacing="2.2" className="font-body">
//                     <textPath href="#aara-seal-circle">AARA MAKEOVERS ✦ BRIDAL ARTISTRY ✦ MADURAI ✦</textPath>
//                   </text>
//                 </motion.svg>
//               </motion.div>
//               <span className="absolute inset-0 flex items-center justify-center font-display text-3xl italic text-[#D5A653]">A</span>
//             </motion.div>

//             {/* Floating card */}
//             <motion.div
//               initial={{ opacity: 0, x: -30 }}
//               animate={ready ? { opacity: 1, x: 0 } : {}}
//               transition={{ duration: 1, delay: 1.25, ease: EASE }}
//               className="absolute -left-3 bottom-10 sm:-left-14"
//             >
//               <motion.div
//                 animate={{ y: [0, -9, 0] }}
//                 transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut" }}
//                 className="flex items-center gap-3 rounded-2xl border border-[#D5A653]/60 bg-[#17120E]/90 px-4 py-3.5 shadow-2xl shadow-black/50 backdrop-blur-md sm:px-5"
//               >
//                 <span className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-[#F1CF8A] to-[#B8862F] font-display text-xl text-[#0E0B09]">
//                   ✧
//                 </span>
//                 <span>
//                   <span className="block font-display text-lg leading-tight">Luxury bridal beauty</span>
//                   <span className="mt-0.5 block text-xs text-[#F1CF8A]/90">HD, Advanced HD and Airbrush</span>
//                 </span>
//               </motion.div>
//             </motion.div>
//           </motion.div>
//         </div>
//       </motion.div>

//       {/* Scroll cue */}
//       <motion.div style={{ opacity: cueOpacity }} className="absolute bottom-7 left-1/2 -translate-x-1/2">
//         <motion.div
//           initial={{ opacity: 0, y: 10 }}
//           animate={ready ? { opacity: 1, y: 0 } : {}}
//           transition={{ delay: 1.6, duration: 0.8 }}
//           className="flex flex-col items-center gap-3"
//         >
//           <span className="font-display text-sm italic text-[#F4ECDF]/50">Scroll</span>
//           <span className="relative h-12 w-px overflow-hidden bg-[#F4ECDF]/15">
//             <motion.span
//               className="absolute inset-x-0 top-0 h-1/2 bg-[#D5A653]"
//               animate={{ y: ["-100%", "200%"] }}
//               transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
//             />
//           </span>
//         </motion.div>
//       </motion.div>
//     </section>
//   );
// }

import { useRef } from "react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "motion/react";
import { CTA, EASE, MaskLines, WHATSAPP } from "./motionKit";

const brideImage =
  "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg";

const tags = ["HD makeup", "Advanced HD", "Airbrush", "Hair & saree draping"];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.35 } },
};
const item = {
  hidden: { opacity: 0, y: 26 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: EASE } },
};

export default function Hero({ ready = true }) {
  const sectionRef = useRef(null);

  /* Scroll-out choreography */
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.25]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 280]);
  const cueOpacity = useTransform(scrollYProgress, [0, 0.15], [1, 0]);

  /* Mouse tilt on the arch */
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const tiltX = useSpring(useTransform(my, [-0.5, 0.5], [7, -7]), { stiffness: 120, damping: 20 });
  const tiltY = useSpring(useTransform(mx, [-0.5, 0.5], [-9, 9]), { stiffness: 120, damping: 20 });

  const handleMove = (e) => {
    if (e.pointerType !== "mouse" || !sectionRef.current) return;
    const r = sectionRef.current.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };
  const resetTilt = () => {
    mx.set(0);
    my.set(0);
  };

  return (
    <section
      ref={sectionRef}
      id="home"
      onPointerMove={handleMove}
      onPointerLeave={resetTilt}
      /* Desktop: exactly one screen tall. Mobile: at least one screen. */
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-[#0E0B09] pb-16 pt-2! text-[#F4ECDF] lg:h-[100svh] lg:min-h-[600px] lg:pb-10 lg:pt-28"
    >
      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-15%] top-[5%] h-[640px] w-[640px] rounded-full bg-[#D5A653]/[0.10] blur-[140px]"
        />
        <div className="absolute bottom-[-25%] left-[-15%] h-[560px] w-[560px] rounded-full bg-[#7A1426]/30 blur-[150px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0E0B09] to-transparent" />
      </div>

      <motion.div
        style={{ opacity: contentOpacity, scale: contentScale }}
        className="mx-auto grid w-full max-w-7xl items-center gap-10 px-6 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10"
      >
        {/* ---------------- Copy (moved up with lg:-mt-12) ---------------- */}
        <motion.div
          style={{ y: textY }}
          variants={container}
          initial="hidden"
          animate={ready ? "visible" : "hidden"}
          className="relative z-10 order-2 lg:order-1 lg:-mt-12"
        >
          <motion.p
            variants={item}
            className="mb-[2.4svh] flex items-center gap-4 font-display text-lg italic text-[#F1CF8A] sm:text-xl xl:text-2xl"
          >
            <motion.span
              aria-hidden="true"
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1, transition: { duration: 1, ease: EASE } } }}
              className="h-px w-12 origin-left bg-[#D5A653]"
            />
            Luxury bridal makeup in Madurai
          </motion.p>

          {/* Bigger on desktop; phone minimum kept safe so "beautifully you." stays on one line */}
          <h1 className="font-display text-[length:clamp(2.9rem,min(8vw,9.6svh),7.4rem)] font-medium leading-[0.98] tracking-[-0.02em]">
            <MaskLines
              mode="parent"
              stagger={0.08}
              lines={[
                "Your dream",
                "bridal look,",
                { text: "beautifully you.", className: "italic text-gold-gradient" },
              ]}
            />
          </h1>

          <motion.p
            variants={item}
            className="mt-[3svh] max-w-lg text-lg font-light leading-8 text-[#F4ECDF]/70 xl:text-xl xl:leading-9"
          >
            Elegant bridal looks tailored to your style, your outfit and your jewellery, so you feel like yourself on the biggest day.
          </motion.p>

          <motion.div variants={item} className="mt-[3.5svh] flex flex-wrap items-center gap-4">
            <CTA href="#contact">Book your bridal date</CTA>
            <CTA href={WHATSAPP} variant="outline">
              WhatsApp us
            </CTA>
          </motion.div>

          <motion.ul
            variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.08 } } }}
            className="mt-[3.2svh] flex flex-wrap gap-2"
          >
            {tags.map((t) => (
              <motion.li
                key={t}
                variants={item}
                whileHover={{ y: -3, borderColor: "rgba(241,207,138,0.8)" }}
                className="rounded-full border border-[#D5A653]/30 px-4 py-1.5 text-sm tracking-wide text-[#E9C98C]"
              >
                {t}
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>

        {/* ---------------- Arch image ---------------- */}
        <div className="relative order-1 mx-auto w-fit lg:order-2 lg:-mt-16" style={{ perspective: 1200 }}>
          <motion.div style={{ rotateX: tiltX, rotateY: tiltY }} className="relative">
            {/* Gold outline arch */}
            <motion.div
              aria-hidden="true"
              initial={{ opacity: 0, scale: 0.94 }}
              animate={ready ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 1.4, delay: 0.7, ease: EASE }}
              className="absolute -inset-[7px] rounded-b-2xl rounded-t-[260px] border border-[#D5A653]/80"
            />

            {/* Image: height comes from the screen height, width follows a 4:5 ratio */}
            <motion.div
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={ready ? { clipPath: "inset(0% 0% 0% 0%)" } : {}}
              transition={{ duration: 1.5, delay: 0.15, ease: [0.76, 0, 0.24, 1] }}
              className="relative aspect-[4/5] h-[clamp(300px,46svh,440px)] overflow-hidden rounded-b-xl rounded-t-[260px] lg:h-[clamp(380px,calc(100svh-12rem),620px)]"
            >
              <motion.img
                style={{ y: imageY, scale: imageScale }}
                src={brideImage}
                alt="Bride with luxury bridal makeup by Aara Makeovers, Madurai"
                className="h-full w-full object-cover object-center"
                fetchPriority="high"
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0B09]/50 via-transparent to-transparent" />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue (desktop only, so it never sits on top of the buttons on mobile) */}
      <motion.div style={{ opacity: cueOpacity }} className="absolute bottom-4 left-1/2 hidden -translate-x-1/2 lg:block">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={ready ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.6, duration: 0.8 }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-display text-sm italic text-[#F4ECDF]/50">Scroll</span>
          <span className="relative h-8 w-px overflow-hidden bg-[#F4ECDF]/15">
            <motion.span
              className="absolute inset-x-0 top-0 h-1/2 bg-[#D5A653]"
              animate={{ y: ["-100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            />
          </span>
        </motion.div>
      </motion.div>
    </section>
  );
}

