// // import React, { useEffect, useRef, useState } from "react";
// // import {
// //   motion,
// //   MotionConfig,
// //   useScroll,
// //   useTransform,
// //   useSpring,
// //   useMotionValue,
// //   useReducedMotion,
// // } from "framer-motion";

// // /* ------------------------------------------------------------------
// //    Replace these image paths with your own photos (inside /public).
// //    If a photo is missing, a gold placeholder shows instead.
// // ------------------------------------------------------------------- */
// // const IMAGES = {
// //   hero: "/images/bridal-hero.jpg",
// //   detail: "/images/bridal-detail.jpg",
// //   story: "/images/artist-at-work.jpg",
// // };

// // const looks = [
// //   {
// //     title: "Muhurtham bridal",
// //     text: "Traditional, radiant and long-wear, with hair, draping and jewellery setting.",
// //     src: "/images/look-muhurtham.jpg",
// //   },
// //   {
// //     title: "Reception glam",
// //     text: "A softer or bolder evening look, made for stage lights and photos.",
// //     src: "/images/look-reception.jpg",
// //   },
// //   {
// //     title: "Engagement",
// //     text: "Fresh and elegant, so you look like the best version of yourself.",
// //     src: "/images/look-engagement.jpg",
// //   },
// //   {
// //     title: "Haldi & mehendi",
// //     text: "Light, dewy and playful looks that survive turmeric and dancing.",
// //     src: "/images/look-haldi.jpg",
// //   },
// //   {
// //     title: "Family & bridesmaids",
// //     text: "Makeup and hair for the people standing beside you in every photo.",
// //     src: "/images/look-family.jpg",
// //   },
// // ];

// // const values = [
// //   {
// //     icon: "sparkle",
// //     title: "Your face, not a trend",
// //     text: "Every look is built around your features and the way your family sees you. No heavy mask that only works on camera.",
// //   },
// //   {
// //     icon: "sun",
// //     title: "Made to last all day",
// //     text: "Long muhurthams, humidity, garlands, hugs and happy tears. Your makeup holds from morning rituals to the last reception photo.",
// //   },
// //   {
// //     icon: "drop",
// //     title: "Skin before makeup",
// //     text: "You get a simple skin-prep routine weeks before the wedding, so on the day we enhance healthy skin instead of covering it.",
// //   },
// // ];

// // const steps = [
// //   {
// //     title: "Consultation",
// //     text: "We talk about your saree or lehenga, jewellery, hairstyle and the look you have in mind. Reference photos are welcome.",
// //   },
// //   {
// //     title: "Trial session",
// //     text: "A full trial of your bridal look, checked in daylight and indoor light, so we can fine-tune before the big day.",
// //   },
// //   {
// //     title: "Wedding morning",
// //     text: "I arrive early with a complete kit. Makeup, hair, draping and jewellery, done calmly and on time for the muhurtham.",
// //   },
// //   {
// //     title: "Reception refresh",
// //     text: "A new look or a quick touch-up for the evening, so you feel as fresh at night as you did in the morning.",
// //   },
// // ];

// // const marqueeItems = [
// //   "Muhurtham",
// //   "Reception",
// //   "Engagement",
// //   "Haldi",
// //   "Mehendi",
// //   "Sangeet",
// //   "Saree draping",
// //   "Bridal hair",
// // ];

// // const ease = [0.22, 1, 0.36, 1];

// // /* ---------------------------- Helpers ---------------------------- */

// // function Img({ src, alt, label }) {
// //   const [ok, setOk] = useState(true);
// //   if (!ok) {
// //     return (
// //       <div className="ab-ph" role="img" aria-label={alt}>
// //         <span>{label}</span>
// //         <code>public{src}</code>
// //       </div>
// //     );
// //   }
// //   return <img src={src} alt={alt} onError={() => setOk(false)} loading="lazy" />;
// // }

// // function Icon({ name }) {
// //   const common = {
// //     width: 28,
// //     height: 28,
// //     viewBox: "0 0 24 24",
// //     fill: "none",
// //     stroke: "currentColor",
// //     strokeWidth: 1.4,
// //     strokeLinecap: "round",
// //     strokeLinejoin: "round",
// //     "aria-hidden": true,
// //   };
// //   if (name === "sun")
// //     return (
// //       <svg {...common}>
// //         <circle cx="12" cy="12" r="4" />
// //         <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
// //       </svg>
// //     );
// //   if (name === "drop")
// //     return (
// //       <svg {...common}>
// //         <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z" />
// //         <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
// //       </svg>
// //     );
// //   return (
// //     <svg {...common}>
// //       <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
// //       <path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
// //     </svg>
// //   );
// // }

// // function Star() {
// //   return (
// //     <svg className="ab-star" viewBox="0 0 24 24" aria-hidden="true">
// //       <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
// //     </svg>
// //   );
// // }

// // /* ------------------------- Scroll progress ------------------------ */

// // function ScrollProgress() {
// //   const { scrollYProgress } = useScroll();
// //   const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
// //   return <motion.div className="ab-progress" style={{ scaleX }} aria-hidden="true" />;
// // }

// // /* ------------------------------ Hero ------------------------------ */

// // const headline = ["Bridal", "makeup", "that", "still", "looks", "like", "you."];

// // function Hero() {
// //   const ref = useRef(null);
// //   const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
// //   const yMain = useTransform(scrollYProgress, [0, 1], [0, 140]);
// //   const ySmall = useTransform(scrollYProgress, [0, 1], [0, -100]);
// //   const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
// //   const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
// //   const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

// //   return (
// //     <section ref={ref} className="ab-hero" aria-labelledby="about-title">
// //       <div className="ab-container ab-hero-grid">
// //         <motion.div className="ab-hero-text" style={{ y: textY, opacity: textOpacity }}>
// //           <h1 id="about-title" className="ab-h1" aria-label={headline.join(" ")}>
// //             {headline.map((word, i) => (
// //               <span className="ab-mask" key={word + i} aria-hidden="true">
// //                 <motion.span
// //                   className="ab-mask-inner"
// //                   initial={{ y: "115%" }}
// //                   animate={{ y: "0%" }}
// //                   transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.07 }}
// //                 >
// //                   {word}
// //                 </motion.span>
// //               </span>
// //             ))}
// //           </h1>

// //           <motion.p
// //             className="ab-lead"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 1, ease, delay: 0.8 }}
// //           >
// //             I'm [Your Name], a bridal makeup artist based in [City]. For [X] years
// //             I've been getting brides ready for muhurthams, receptions and every
// //             ritual in between, with makeup that lasts the whole day and never
// //             hides the face your family knows.
// //           </motion.p>

// //           <motion.div
// //             className="ab-actions"
// //             initial={{ opacity: 0, y: 20 }}
// //             animate={{ opacity: 1, y: 0 }}
// //             transition={{ duration: 1, ease, delay: 0.95 }}
// //           >
// //             <a className="ab-btn ab-btn-primary" href="/contact">
// //               Book a trial
// //             </a>
// //             <a className="ab-btn ab-btn-ghost" href="/portfolio">
// //               <span>See bridal looks</span>
// //             </a>
// //           </motion.div>
// //         </motion.div>

// //         <div className="ab-hero-visual">
// //           <motion.div className="ab-arch-wrap" style={{ y: yMain }}>
// //             <motion.div
// //               className="ab-arch ab-media"
// //               initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
// //               animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
// //               transition={{ duration: 1.5, ease, delay: 0.3 }}
// //             >
// //               <motion.div className="ab-fill" style={{ scale: imgScale }}>
// //                 <Img src={IMAGES.hero} alt="A bride in full bridal makeup" label="Hero bridal photo" />
// //               </motion.div>
// //             </motion.div>

// //             <svg className="ab-arch-line" viewBox="0 0 440 580" preserveAspectRatio="none" aria-hidden="true">
// //               <motion.path
// //                 d="M10 580 V220 A210 210 0 0 1 430 220 V580"
// //                 fill="none"
// //                 stroke="#D5A653"
// //                 strokeWidth="1.5"
// //                 vectorEffect="non-scaling-stroke"
// //                 initial={{ pathLength: 0 }}
// //                 animate={{ pathLength: 1 }}
// //                 transition={{ duration: 2.4, ease: "easeInOut", delay: 0.2 }}
// //               />
// //             </svg>
// //           </motion.div>

// //           <motion.div className="ab-arch-small-wrap" style={{ y: ySmall }}>
// //             <motion.div
// //               className="ab-arch-small ab-media"
// //               initial={{ opacity: 0, scale: 0.85 }}
// //               animate={{ opacity: 1, scale: 1 }}
// //               transition={{ duration: 1.2, ease, delay: 1 }}
// //             >
// //               <Img src={IMAGES.detail} alt="Close-up of bridal jewellery and makeup" label="Detail photo" />
// //             </motion.div>
// //           </motion.div>

// //           <motion.a
// //             href="/contact"
// //             className="ab-badge"
// //             aria-label="Book a bridal trial"
// //             initial={{ opacity: 0, scale: 0.5 }}
// //             animate={{ opacity: 1, scale: 1 }}
// //             whileHover={{ scale: 1.08 }}
// //             transition={{ duration: 0.8, ease, delay: 1.3 }}
// //           >
// //             <motion.svg
// //               viewBox="0 0 120 120"
// //               className="ab-badge-ring"
// //               animate={{ rotate: 360 }}
// //               transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
// //               aria-hidden="true"
// //             >
// //               <defs>
// //                 <path id="ab-circle-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
// //               </defs>
// //               <text>
// //                 <textPath href="#ab-circle-path" textLength="285" lengthAdjust="spacing">
// //                   Book a bridal trial ✦ Book a bridal trial ✦
// //                 </textPath>
// //               </text>
// //             </motion.svg>
// //             <svg className="ab-badge-arrow" viewBox="0 0 24 24" aria-hidden="true">
// //               <path d="M7 17L17 7M9 7h8v8" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
// //             </svg>
// //           </motion.a>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // /* ----------------------------- Marquee ---------------------------- */

// // function Marquee() {
// //   const row = [...marqueeItems, ...marqueeItems];
// //   return (
// //     <div className="ab-marquee" aria-hidden="true">
// //       <motion.div
// //         className="ab-marquee-track"
// //         animate={{ x: ["0%", "-50%"] }}
// //         transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
// //       >
// //         {row.map((item, i) => (
// //           <span className="ab-marquee-item" key={item + i}>
// //             <span className={i % 2 ? "ab-outline" : ""}>{item}</span>
// //             <Star />
// //           </span>
// //         ))}
// //       </motion.div>
// //     </div>
// //   );
// // }

// // /* -------------------- Statement (scroll-lit words) ------------------ */

// // const statement =
// //   "Every bride walks in with her own story, her own skin and her own idea of beautiful. My work is to listen first, then create a look that holds through the muhurtham, the tears and the dancing, and still feels like her in every photograph.";

// // function Word({ children, progress, range }) {
// //   const opacity = useTransform(progress, range, [0.15, 1]);
// //   return (
// //     <motion.span className="ab-lit-word" style={{ opacity }}>
// //       {children}{" "}
// //     </motion.span>
// //   );
// // }

// // function Statement() {
// //   const ref = useRef(null);
// //   const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
// //   const words = statement.split(" ");

// //   return (
// //     <section className="ab-section" aria-label="My approach">
// //       <div className="ab-container">
// //         <p ref={ref} className="ab-statement">
// //           {words.map((w, i) => {
// //             const start = i / words.length;
// //             return (
// //               <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
// //                 {w}
// //               </Word>
// //             );
// //           })}
// //         </p>
// //       </div>
// //     </section>
// //   );
// // }

// // /* ------------------------------ Story ------------------------------ */

// // function Story() {
// //   const ref = useRef(null);
// //   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
// //   const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

// //   return (
// //     <section ref={ref} className="ab-section ab-alt" aria-labelledby="story-title">
// //       <div className="ab-container ab-story">
// //         <motion.div
// //           className="ab-story-img ab-media"
// //           initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
// //           whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
// //           viewport={{ once: true, amount: 0.3 }}
// //           transition={{ duration: 1.4, ease }}
// //         >
// //           <motion.div className="ab-fill ab-fill-tall" style={{ y: imgY }}>
// //             <Img src={IMAGES.story} alt="[Your Name] doing a bride's makeup" label="Photo of you at work" />
// //           </motion.div>
// //         </motion.div>

// //         <motion.div
// //           className="ab-story-text"
// //           initial={{ opacity: 0, y: 40 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true, amount: 0.3 }}
// //           transition={{ duration: 1, ease, delay: 0.15 }}
// //         >
// //           <h2 id="story-title" className="ab-h2">How it started</h2>
// //           <p>
// //             [Write 2–3 sentences about how you began: a cousin's wedding, a course
// //             you took, the first bride you got ready. Real details make this
// //             section feel personal.]
// //           </p>
// //           <p>
// //             Since [Year], I've worked with brides across [cities or regions].
// //             Temple weddings at sunrise, beach receptions, family functions at
// //             home. Every wedding is different, but the goal stays the same: the
// //             bride should feel calm, comfortable and completely herself.
// //           </p>
// //           <p>
// //             I trained at [academy or certification] and keep learning new
// //             techniques every year. The best part of the work is still the moment
// //             a bride looks in the mirror and smiles.
// //           </p>
// //           <p className="ab-signature">[Your Name]</p>
// //         </motion.div>
// //       </div>
// //     </section>
// //   );
// // }

// // /* ----------------------- Horizontal gallery ----------------------- */

// // function Gallery() {
// //   const sectionRef = useRef(null);
// //   const trackRef = useRef(null);
// //   const reduce = useReducedMotion();
// //   const distance = useMotionValue(0);
// //   const [height, setHeight] = useState(null);

// //   useEffect(() => {
// //     const measure = () => {
// //       if (!trackRef.current) return;
// //       const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
// //       distance.set(d);
// //       setHeight(d + window.innerHeight);
// //     };
// //     measure();
// //     window.addEventListener("resize", measure);
// //     return () => window.removeEventListener("resize", measure);
// //   }, [distance]);

// //   const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
// //   const x = useTransform([scrollYProgress, distance], ([p, d]) => -p * d);
// //   const isStatic = reduce;

// //   return (
// //     <section
// //       ref={sectionRef}
// //       className={`ab-gallery${isStatic ? " is-static" : ""}`}
// //       style={{ height: isStatic || !height ? "auto" : height }}
// //       aria-labelledby="looks-title"
// //     >
// //       <div className="ab-gallery-sticky">
// //         <div className="ab-container ab-gallery-head">
// //           <h2 id="looks-title" className="ab-h2">Looks I create</h2>
// //           <p>From the first function to the last photo, each look is planned around your outfit, your skin and the time of day.</p>
// //         </div>

// //         <motion.ul ref={trackRef} className="ab-gallery-track" style={isStatic ? undefined : { x }}>
// //           {looks.map((look, i) => (
// //             <li className="ab-look" key={look.title}>
// //               <div className="ab-look-img ab-media">
// //                 <Img src={look.src} alt={`${look.title} makeup look`} label={look.title} />
// //               </div>
// //               <div className="ab-look-meta">
// //                 <span className="ab-look-num">{String(i + 1).padStart(2, "0")}</span>
// //                 <div>
// //                   <h3 className="ab-h3">{look.title}</h3>
// //                   <p>{look.text}</p>
// //                 </div>
// //               </div>
// //             </li>
// //           ))}
// //         </motion.ul>
// //       </div>
// //     </section>
// //   );
// // }

// // /* ------------------------------ Values ----------------------------- */

// // function SpotlightCard({ children, index }) {
// //   const ref = useRef(null);
// //   const onMove = (e) => {
// //     const r = ref.current.getBoundingClientRect();
// //     ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
// //     ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
// //   };
// //   return (
// //     <motion.li
// //       ref={ref}
// //       className="ab-card"
// //       onMouseMove={onMove}
// //       initial={{ opacity: 0, y: 50 }}
// //       whileInView={{ opacity: 1, y: 0 }}
// //       viewport={{ once: true, amount: 0.4 }}
// //       transition={{ duration: 0.9, ease, delay: index * 0.12 }}
// //     >
// //       {children}
// //     </motion.li>
// //   );
// // }

// // function Values() {
// //   return (
// //     <section className="ab-section" aria-labelledby="values-title">
// //       <div className="ab-container">
// //         <h2 id="values-title" className="ab-h2 ab-mb">What I care about</h2>
// //         <ul className="ab-cards">
// //           {values.map((v, i) => (
// //             <SpotlightCard key={v.title} index={i}>
// //               <span className="ab-card-icon"><Icon name={v.icon} /></span>
// //               <h3 className="ab-h3">{v.title}</h3>
// //               <p>{v.text}</p>
// //             </SpotlightCard>
// //           ))}
// //         </ul>
// //       </div>
// //     </section>
// //   );
// // }

// // /* ------------------------------ Process ---------------------------- */

// // function Process() {
// //   const ref = useRef(null);
// //   const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
// //   const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

// //   return (
// //     <section className="ab-section ab-alt" aria-labelledby="process-title">
// //       <div className="ab-container ab-split">
// //         <div className="ab-sticky">
// //           <h2 id="process-title" className="ab-h2">From first call to final touch-up</h2>
// //           <p className="ab-sub">
// //             Here's how working together looks, so nothing about your wedding
// //             morning is a surprise.
// //           </p>
// //         </div>

// //         <div className="ab-steps-wrap" ref={ref}>
// //           <span className="ab-steps-track" aria-hidden="true" />
// //           <motion.span className="ab-steps-fill" style={{ scaleY }} aria-hidden="true" />
// //           <ol className="ab-steps">
// //             {steps.map((s, i) => (
// //               <motion.li
// //                 key={s.title}
// //                 initial={{ opacity: 0.35 }}
// //                 whileInView={{ opacity: 1 }}
// //                 viewport={{ amount: 0.8, once: true }}
// //                 transition={{ duration: 0.6, ease }}
// //               >
// //                 <motion.span
// //                   className="ab-step-num"
// //                   aria-hidden="true"
// //                   initial={{ backgroundColor: "#171411", color: "#F3C477" }}
// //                   whileInView={{ backgroundColor: "#D5A653", color: "#0D0C0B" }}
// //                   viewport={{ amount: 0.8, once: true }}
// //                   transition={{ duration: 0.5 }}
// //                 >
// //                   {i + 1}
// //                 </motion.span>
// //                 <div>
// //                   <h3 className="ab-h3">{s.title}</h3>
// //                   <p>{s.text}</p>
// //                 </div>
// //               </motion.li>
// //             ))}
// //           </ol>
// //         </div>
// //       </div>
// //     </section>
// //   );
// // }

// // /* ------------------------------- CTA ------------------------------- */

// // function MagneticButton({ href, children }) {
// //   const ref = useRef(null);
// //   const reduce = useReducedMotion();
// //   const x = useMotionValue(0);
// //   const y = useMotionValue(0);
// //   const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
// //   const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

// //   const move = (e) => {
// //     if (reduce) return;
// //     const r = ref.current.getBoundingClientRect();
// //     x.set((e.clientX - r.left - r.width / 2) * 0.35);
// //     y.set((e.clientY - r.top - r.height / 2) * 0.35);
// //   };
// //   const leave = () => {
// //     x.set(0);
// //     y.set(0);
// //   };

// //   return (
// //     <motion.a
// //       ref={ref}
// //       href={href}
// //       className="ab-magnetic"
// //       style={{ x: sx, y: sy }}
// //       onMouseMove={move}
// //       onMouseLeave={leave}
// //       whileTap={{ scale: 0.94 }}
// //     >
// //       {children}
// //     </motion.a>
// //   );
// // }

// // function CTA() {
// //   return (
// //     <section className="ab-section ab-cta" aria-labelledby="cta-title">
// //       <svg className="ab-cta-arch" viewBox="0 0 440 580" preserveAspectRatio="none" aria-hidden="true">
// //         <motion.path
// //           d="M10 580 V220 A210 210 0 0 1 430 220 V580"
// //           fill="none"
// //           stroke="#D5A653"
// //           strokeOpacity="0.35"
// //           strokeWidth="1"
// //           vectorEffect="non-scaling-stroke"
// //           initial={{ pathLength: 0 }}
// //           whileInView={{ pathLength: 1 }}
// //           viewport={{ once: true, amount: 0.4 }}
// //           transition={{ duration: 2.2, ease: "easeInOut" }}
// //         />
// //       </svg>

// //       <div className="ab-container ab-cta-inner">
// //         <motion.div
// //           initial={{ opacity: 0, y: 40 }}
// //           whileInView={{ opacity: 1, y: 0 }}
// //           viewport={{ once: true, amount: 0.5 }}
// //           transition={{ duration: 1, ease }}
// //         >
// //           <h2 id="cta-title" className="ab-h2 ab-cta-title">
// //             Your wedding morning should feel calm. Let's plan it together.
// //           </h2>
// //           <p className="ab-sub">
// //             Dates fill up early in wedding season. Share your date and I'll
// //             confirm availability within a day.
// //           </p>
// //           <a className="ab-text-link" href="https://wa.me/[your-number]" target="_blank" rel="noreferrer">
// //             Message on WhatsApp
// //           </a>
// //         </motion.div>

// //         <MagneticButton href="/contact">Book a trial</MagneticButton>
// //       </div>
// //     </section>
// //   );
// // }

// // /* ------------------------------ Page ------------------------------ */

// // function About() {
// //   return (
// //     <MotionConfig reducedMotion="user">
// //       <style>{css}</style>
// //       <main className="ab">
// //         <ScrollProgress />
// //         <Hero />
// //         <Marquee />
// //         <Statement />
// //         <Story />
// //         <Gallery />
// //         <Values />
// //         <Process />
// //         <CTA />
// //       </main>
// //     </MotionConfig>
// //   );
// // }

// // export default About;

// // /* ------------------------------ Styles ----------------------------- */

// // const css = `
// // @import url('https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,opsz,wght@0,6..96,400..600;1,6..96,400..600&family=Jost:wght@400;500&display=swap');

// // .ab {
// //   --ab-bg: #0D0C0B;
// //   --ab-bg-2: #171411;
// //   --ab-gold: #D5A653;
// //   --ab-gold-light: #F3C477;
// //   --ab-text: #FFFFFF;
// //   --ab-muted: #B8B0A3;
// //   --ab-line: rgba(213, 166, 83, 0.22);
// //   --ab-serif: 'Bodoni Moda', 'Didot', 'Bodoni 72', Georgia, serif;
// //   --ab-sans: 'Jost', system-ui, -apple-system, 'Segoe UI', sans-serif;
// //   background: var(--ab-bg);
// //   color: var(--ab-text);
// //   font-family: var(--ab-sans);
// //   font-size: 1.0625rem;
// //   line-height: 1.7;
// //   overflow-x: clip;
// // }
// // .ab *, .ab *::before, .ab *::after { box-sizing: border-box; }
// // .ab p { margin: 0; color: var(--ab-muted); }
// // .ab ul, .ab ol { list-style: none; margin: 0; padding: 0; }
// // .ab a:focus-visible { outline: 2px solid var(--ab-gold-light); outline-offset: 4px; }

// // .ab-container { width: 100%; max-width: 1240px; margin: 0 auto; padding: 0 1.5rem; }

// // .ab-progress {
// //   position: fixed; top: 0; left: 0; right: 0; height: 2px; z-index: 60;
// //   background: var(--ab-gold-light); transform-origin: left;
// // }

// // /* Type */
// // .ab-h1, .ab-h2, .ab-h3 { font-family: var(--ab-serif); font-weight: 400; color: var(--ab-text); margin: 0; }
// // .ab-h1 { font-size: clamp(3rem, 6.8vw, 6rem); line-height: 1.02; letter-spacing: -0.02em; }
// // .ab-h2 { font-size: clamp(2.1rem, 4vw, 3.4rem); line-height: 1.1; letter-spacing: -0.01em; }
// // .ab-h3 { font-size: 1.45rem; line-height: 1.25; margin-bottom: 0.5rem; }
// // .ab-mb { margin-bottom: 3.5rem; }
// // .ab-sub { margin-top: 1.25rem; max-width: 36ch; }

// // .ab-mask { display: inline-block; overflow: hidden; vertical-align: top; padding-bottom: 0.12em; margin-bottom: -0.12em; margin-right: 0.24em; }
// // .ab-mask-inner { display: inline-block; }

// // /* Media + placeholders */
// // .ab-media { position: relative; overflow: hidden; background: var(--ab-bg-2); }
// // .ab-media img { width: 100%; height: 100%; object-fit: cover; display: block; }
// // .ab-fill { position: absolute; inset: 0; }
// // .ab-fill-tall { inset: -10% 0; }
// // .ab-ph {
// //   width: 100%; height: 100%; display: flex; flex-direction: column; gap: .4rem;
// //   align-items: center; justify-content: center; text-align: center; padding: 1.5rem;
// //   color: var(--ab-muted); font-size: .9rem;
// //   background:
// //     repeating-linear-gradient(135deg, rgba(213,166,83,.06) 0 1px, transparent 1px 14px),
// //     var(--ab-bg-2);
// // }
// // .ab-ph code { color: var(--ab-gold); font-size: .78rem; word-break: break-all; }

// // /* Buttons */
// // .ab-actions { display: flex; flex-wrap: wrap; gap: 0.875rem; }
// // .ab-btn {
// //   position: relative; display: inline-flex; align-items: center; justify-content: center;
// //   min-height: 52px; padding: 0 1.9rem; border-radius: 999px; border: 1px solid transparent;
// //   font: 500 1rem/1 var(--ab-sans); letter-spacing: 0.02em; text-decoration: none;
// //   overflow: hidden; isolation: isolate;
// //   transition: background-color .35s ease, color .35s ease, border-color .35s ease;
// // }
// // .ab-btn-primary { background: var(--ab-gold-light); color: var(--ab-bg); }
// // .ab-btn-primary:hover { background: var(--ab-gold); }
// // .ab-btn-ghost { border-color: var(--ab-gold); color: var(--ab-gold); }
// // .ab-btn-ghost::before {
// //   content: ""; position: absolute; inset: 0; z-index: -1; background: var(--ab-gold);
// //   transform: scaleX(0); transform-origin: right; transition: transform .55s cubic-bezier(.22,1,.36,1);
// // }
// // .ab-btn-ghost:hover { color: var(--ab-bg); }
// // .ab-btn-ghost:hover::before { transform: scaleX(1); transform-origin: left; }

// // /* Hero */
// // .ab-hero { padding: clamp(4.5rem, 10vw, 8rem) 0 clamp(5rem, 10vw, 8rem); }
// // .ab-hero-grid { display: grid; grid-template-columns: 1.1fr 0.9fr; gap: clamp(3rem, 7vw, 7rem); align-items: center; }
// // .ab-hero-text { display: flex; flex-direction: column; gap: 2rem; }
// // .ab-lead { max-width: 46ch; font-size: 1.125rem; }

// // .ab-hero-visual { position: relative; width: 100%; max-width: 460px; justify-self: end; }
// // .ab-arch-wrap { position: relative; width: 100%; aspect-ratio: 440 / 580; }
// // .ab-arch {
// //   position: absolute; top: 3.45%; left: 4.55%; right: 4.55%; bottom: 0;
// //   border-top-left-radius: 999px; border-top-right-radius: 999px;
// // }
// // .ab-arch-line { position: absolute; inset: 0; width: 100%; height: 100%; overflow: visible; }

// // .ab-arch-small-wrap { position: absolute; left: -16%; bottom: -10%; width: 40%; }
// // .ab-arch-small {
// //   aspect-ratio: 3 / 4; border-top-left-radius: 999px; border-top-right-radius: 999px;
// //   border: 6px solid var(--ab-bg); box-shadow: 0 0 0 1px var(--ab-gold);
// // }

// // .ab-badge {
// //   position: absolute; right: -8%; top: 6%; width: 124px; height: 124px; border-radius: 50%;
// //   display: grid; place-items: center; background: var(--ab-bg); color: var(--ab-gold-light);
// //   box-shadow: 0 0 0 1px var(--ab-line); text-decoration: none;
// // }
// // .ab-badge-ring { position: absolute; inset: 0; width: 100%; height: 100%; }
// // .ab-badge-ring text { fill: var(--ab-gold); font: 500 10.5px var(--ab-sans); }
// // .ab-badge-arrow { width: 26px; height: 26px; transition: transform .4s cubic-bezier(.22,1,.36,1); }
// // .ab-badge:hover .ab-badge-arrow { transform: rotate(45deg); }

// // /* Marquee */
// // .ab-marquee {
// //   overflow: hidden; border-top: 1px solid var(--ab-line); border-bottom: 1px solid var(--ab-line);
// //   padding: 1.6rem 0; background: var(--ab-bg-2);
// // }
// // .ab-marquee-track { display: flex; width: max-content; }
// // .ab-marquee-item {
// //   display: inline-flex; align-items: center; gap: 2.5rem; padding-right: 2.5rem;
// //   font-family: var(--ab-serif); font-size: clamp(2rem, 4.5vw, 3.75rem); line-height: 1; white-space: nowrap;
// // }
// // .ab-outline { color: transparent; -webkit-text-stroke: 1px var(--ab-gold); }
// // .ab-star { width: 22px; height: 22px; fill: var(--ab-gold-light); flex: none; }

// // /* Sections */
// // .ab-section { position: relative; padding: clamp(5rem, 10vw, 8.5rem) 0; }
// // .ab-alt { background: var(--ab-bg-2); }
// // .ab-split { display: grid; grid-template-columns: 0.85fr 1.15fr; gap: clamp(2.5rem, 7vw, 7rem); align-items: start; }
// // .ab-sticky { position: sticky; top: 6rem; }

// // /* Statement */
// // .ab-statement {
// //   font-family: var(--ab-serif); font-size: clamp(1.9rem, 3.9vw, 3.4rem); line-height: 1.22;
// //   letter-spacing: -0.01em; max-width: 30ch;
// // }
// // .ab .ab-statement { color: var(--ab-text); }
// // .ab-lit-word { display: inline; }

// // /* Story */
// // .ab-story { display: grid; grid-template-columns: 0.9fr 1.1fr; gap: clamp(2.5rem, 7vw, 7rem); align-items: center; }
// // .ab-story-img { aspect-ratio: 4 / 5; border-top-left-radius: 999px; border-top-right-radius: 999px; }
// // .ab-story-text { display: flex; flex-direction: column; gap: 1.25rem; max-width: 58ch; }
// // .ab-story-text .ab-h2 { margin-bottom: .5rem; }
// // .ab .ab-signature { font-family: var(--ab-serif); font-style: italic; font-size: 1.9rem; color: var(--ab-gold); margin-top: .5rem; }

// // /* Gallery */
// // .ab-gallery { position: relative; }
// // .ab-gallery-sticky {
// //   position: sticky; top: 0; height: 100vh; overflow: hidden;
// //   display: flex; flex-direction: column; justify-content: center; gap: 2.75rem;
// // }
// // .ab-gallery-head { display: flex; flex-wrap: wrap; align-items: end; justify-content: space-between; gap: 1.5rem; }
// // .ab-gallery-head p { max-width: 40ch; }
// // .ab-gallery-track {
// //   display: flex; gap: 1.75rem; width: max-content;
// //   padding: 0 max(1.5rem, calc((100vw - 1240px) / 2 + 1.5rem));
// // }
// // .ab-look { width: clamp(250px, 26vw, 360px); flex: none; }
// // .ab-look-img {
// //   aspect-ratio: 3 / 4; border-radius: 20px; border: 1px solid var(--ab-line);
// //   transition: border-color .4s ease;
// // }
// // .ab-look-img img { transition: transform 1s cubic-bezier(.22,1,.36,1); }
// // .ab-look:hover .ab-look-img { border-color: var(--ab-gold); }
// // .ab-look:hover .ab-look-img img { transform: scale(1.06); }
// // .ab-look-meta { display: grid; grid-template-columns: auto 1fr; gap: 1rem; padding-top: 1.25rem; }
// // .ab-look-num { font-family: var(--ab-serif); color: var(--ab-gold); font-size: 1rem; padding-top: .3rem; }
// // .ab-look-meta p { font-size: .98rem; }

// // .ab-gallery.is-static .ab-gallery-sticky { position: static; height: auto; overflow: visible; padding: 5rem 0; }
// // .ab-gallery.is-static .ab-gallery-track { width: auto; overflow-x: auto; padding-bottom: 1rem; }

// // /* Value cards */
// // .ab-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 1.5rem; }
// // .ab-card {
// //   position: relative; padding: 2.25rem 2rem 2.5rem; border-radius: 24px;
// //   background: var(--ab-bg-2); border: 1px solid var(--ab-line); overflow: hidden;
// //   transition: border-color .4s ease;
// // }
// // .ab-card::before {
// //   content: ""; position: absolute; inset: 0; pointer-events: none; opacity: 0; transition: opacity .4s ease;
// //   background: radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(243,196,119,.13), transparent 60%);
// // }
// // .ab-card:hover { border-color: rgba(213,166,83,.6); }
// // .ab-card:hover::before { opacity: 1; }
// // .ab-card > * { position: relative; }
// // .ab-card-icon {
// //   display: inline-grid; place-items: center; width: 56px; height: 56px; border-radius: 50%;
// //   border: 1px solid var(--ab-gold); color: var(--ab-gold-light); margin-bottom: 1.75rem;
// // }

// // /* Process */
// // .ab-steps-wrap { position: relative; }
// // .ab-steps-track, .ab-steps-fill { position: absolute; left: 23px; top: 24px; bottom: 24px; width: 1px; }
// // .ab-steps-track { background: var(--ab-line); }
// // .ab-steps-fill { background: var(--ab-gold); transform-origin: top; }
// // .ab-steps { display: flex; flex-direction: column; gap: 3.25rem; }
// // .ab-steps li { position: relative; display: grid; grid-template-columns: 48px 1fr; gap: 1.6rem; }
// // .ab-step-num {
// //   width: 48px; height: 48px; border-radius: 50%; border: 1px solid var(--ab-gold);
// //   display: grid; place-items: center; position: relative; z-index: 1;
// //   font-family: var(--ab-serif); font-size: 1.15rem;
// // }
// // .ab-steps p { max-width: 50ch; }

// // /* CTA */
// // .ab-cta { overflow: hidden; border-top: 1px solid var(--ab-line); }
// // .ab-cta-arch {
// //   position: absolute; right: -6%; top: 8%; width: min(520px, 60vw); height: 120%;
// //   pointer-events: none;
// // }
// // .ab-cta-inner { position: relative; display: flex; flex-wrap: wrap; align-items: center; justify-content: space-between; gap: 3rem; }
// // .ab-cta-title { max-width: 16ch; }
// // .ab-text-link {
// //   display: inline-block; margin-top: 1.75rem; color: var(--ab-gold); text-decoration: none;
// //   padding-bottom: 4px; background: linear-gradient(var(--ab-gold), var(--ab-gold)) left bottom / 100% 1px no-repeat;
// //   transition: background-size .5s cubic-bezier(.22,1,.36,1), color .3s ease;
// // }
// // .ab-text-link:hover { color: var(--ab-gold-light); background-size: 0% 1px; background-position: right bottom; }
// // .ab-magnetic {
// //   width: 176px; height: 176px; border-radius: 50%; flex: none;
// //   display: grid; place-items: center; text-align: center;
// //   background: var(--ab-gold-light); color: var(--ab-bg); text-decoration: none;
// //   font: 500 1.1rem/1.2 var(--ab-sans); letter-spacing: .02em;
// //   transition: background-color .35s ease;
// // }
// // .ab-magnetic:hover { background: var(--ab-gold); }

// // /* Responsive */
// // @media (max-width: 960px) {
// //   .ab-hero-grid, .ab-split, .ab-story { grid-template-columns: 1fr; }
// //   .ab-hero-visual { justify-self: center; max-width: 340px; margin: 1rem auto 3rem; }
// //   .ab-arch-small-wrap { left: -10%; }
// //   .ab-badge { right: -6%; width: 104px; height: 104px; }
// //   .ab-cards { grid-template-columns: 1fr; }
// //   .ab-sticky { position: static; }
// //   .ab-story-img { max-width: 420px; }
// // }
// // @media (max-width: 600px) {
// //   .ab-actions .ab-btn { flex: 1 1 auto; }
// //   .ab-magnetic { width: 148px; height: 148px; }
// //   .ab-look { width: 76vw; }
// // }
// // `;

// import React, { useEffect, useRef, useState } from "react";
// import {
//   motion,
//   MotionConfig,
//   useScroll,
//   useTransform,
//   useSpring,
//   useMotionValue,
//   useReducedMotion,
// } from "framer-motion";

// /* ------------------------------------------------------------------
//    Replace these image paths with your own photos (inside /public).
//    If a photo is missing, a gold placeholder shows instead.
// ------------------------------------------------------------------- */
// const IMAGES = {
//   hero: "/images/bridal-hero.jpg",
//   detail: "/images/bridal-detail.jpg",
//   story: "/images/artist-at-work.jpg",
// };

// const looks = [
//   {
//     title: "Muhurtham bridal",
//     text: "Traditional, radiant and long-wear, with hair, draping and jewellery setting.",
//     src: "/images/look-muhurtham.jpg",
//   },
//   {
//     title: "Reception glam",
//     text: "A softer or bolder evening look, made for stage lights and photos.",
//     src: "/images/look-reception.jpg",
//   },
//   {
//     title: "Engagement",
//     text: "Fresh and elegant, so you look like the best version of yourself.",
//     src: "/images/look-engagement.jpg",
//   },
//   {
//     title: "Haldi & mehendi",
//     text: "Light, dewy and playful looks that survive turmeric and dancing.",
//     src: "/images/look-haldi.jpg",
//   },
//   {
//     title: "Family & bridesmaids",
//     text: "Makeup and hair for the people standing beside you in every photo.",
//     src: "/images/look-family.jpg",
//   },
// ];

// const values = [
//   {
//     icon: "sparkle",
//     title: "Your face, not a trend",
//     text: "Every look is built around your features and the way your family sees you. No heavy mask that only works on camera.",
//   },
//   {
//     icon: "sun",
//     title: "Made to last all day",
//     text: "Long muhurthams, humidity, garlands, hugs and happy tears. Your makeup holds from morning rituals to the last reception photo.",
//   },
//   {
//     icon: "drop",
//     title: "Skin before makeup",
//     text: "You get a simple skin-prep routine weeks before the wedding, so on the day we enhance healthy skin instead of covering it.",
//   },
// ];

// const steps = [
//   {
//     title: "Consultation",
//     text: "We talk about your saree or lehenga, jewellery, hairstyle and the look you have in mind. Reference photos are welcome.",
//   },
//   {
//     title: "Trial session",
//     text: "A full trial of your bridal look, checked in daylight and indoor light, so we can fine-tune before the big day.",
//   },
//   {
//     title: "Wedding morning",
//     text: "I arrive early with a complete kit. Makeup, hair, draping and jewellery, done calmly and on time for the muhurtham.",
//   },
//   {
//     title: "Reception refresh",
//     text: "A new look or a quick touch-up for the evening, so you feel as fresh at night as you did in the morning.",
//   },
// ];

// const marqueeItems = [
//   "Muhurtham",
//   "Reception",
//   "Engagement",
//   "Haldi",
//   "Mehendi",
//   "Sangeet",
//   "Saree draping",
//   "Bridal hair",
// ];

// const headline = ["Bridal", "makeup", "that", "still", "looks", "like", "you."];

// const statement =
//   "Every bride walks in with her own story, her own skin and her own idea of beautiful. My work is to listen first, then create a look that holds through the muhurtham, the tears and the dancing, and still feels like her in every photograph.";

// const ease = [0.22, 1, 0.36, 1];

// /* ----------------------- Shared class strings ---------------------- */

// const container = "mx-auto w-full max-w-[1240px] px-6";

// const h2 =
//   "font-serif text-[clamp(2.1rem,4vw,3.4rem)] font-normal leading-[1.1] tracking-[-0.01em] text-white";

// const h3 = "mb-2 font-serif text-[1.45rem] font-normal leading-[1.25] text-white";

// const btnBase =
//   "relative isolate inline-flex min-h-[52px] items-center justify-center overflow-hidden rounded-full border px-8 font-sans text-base font-medium leading-none tracking-[0.02em] no-underline transition-colors duration-300";

// const btnPrimary = `${btnBase} border-transparent bg-goldlight text-ink hover:bg-gold`;

// const btnGhost = `${btnBase} border-gold text-gold hover:text-ink before:absolute before:inset-0 before:-z-10 before:origin-right before:scale-x-0 before:bg-gold before:transition-transform before:duration-500 before:ease-[cubic-bezier(.22,1,.36,1)] before:content-[''] hover:before:origin-left hover:before:scale-x-100`;

// const card =
//   "relative overflow-hidden rounded-3xl border border-line bg-ink2 px-8 pb-10 pt-9 transition-colors duration-[400ms] hover:border-gold/60 [&>*]:relative before:pointer-events-none before:absolute before:inset-0 before:opacity-0 before:transition-opacity before:duration-[400ms] before:content-[''] before:bg-[radial-gradient(340px_circle_at_var(--mx,50%)_var(--my,50%),rgba(243,196,119,0.13),transparent_60%)] hover:before:opacity-100";

// const magnetic =
//   "grid h-44 w-44 flex-none place-items-center rounded-full bg-goldlight text-center font-sans text-[1.1rem] font-medium leading-[1.2] tracking-[0.02em] text-ink no-underline transition-colors duration-300 hover:bg-gold max-[600px]:h-[148px] max-[600px]:w-[148px]";

// /* ---------------------------- Helpers ---------------------------- */

// function Img({ src, alt, label, className = "" }) {
//   const [ok, setOk] = useState(true);
//   if (!ok) {
//     return (
//       <div
//         role="img"
//         aria-label={alt}
//         className={`flex h-full w-full flex-col items-center justify-center gap-1.5 bg-ink2 bg-stripes p-6 text-center text-sm text-muted ${className}`}
//       >
//         <span>{label}</span>
//         <code className="break-all text-xs text-gold">public{src}</code>
//       </div>
//     );
//   }
//   return (
//     <img
//       src={src}
//       alt={alt}
//       onError={() => setOk(false)}
//       loading="lazy"
//       className={`block h-full w-full object-cover ${className}`}
//     />
//   );
// }

// function Icon({ name }) {
//   const common = {
//     width: 28,
//     height: 28,
//     viewBox: "0 0 24 24",
//     fill: "none",
//     stroke: "currentColor",
//     strokeWidth: 1.4,
//     strokeLinecap: "round",
//     strokeLinejoin: "round",
//     "aria-hidden": true,
//   };
//   if (name === "sun")
//     return (
//       <svg {...common}>
//         <circle cx="12" cy="12" r="4" />
//         <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
//       </svg>
//     );
//   if (name === "drop")
//     return (
//       <svg {...common}>
//         <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z" />
//         <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
//       </svg>
//     );
//   return (
//     <svg {...common}>
//       <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
//       <path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
//     </svg>
//   );
// }

// function Star() {
//   return (
//     <svg className="h-[22px] w-[22px] flex-none fill-goldlight" viewBox="0 0 24 24" aria-hidden="true">
//       <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
//     </svg>
//   );
// }

// /* ------------------------- Scroll progress ------------------------ */

// function ScrollProgress() {
//   const { scrollYProgress } = useScroll();
//   const scaleX = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });
//   return (
//     <motion.div
//       className="fixed inset-x-0 top-0 z-[60] h-0.5 origin-left bg-goldlight"
//       style={{ scaleX }}
//       aria-hidden="true"
//     />
//   );
// }

// /* ------------------------------ Hero ------------------------------ */

// function Hero() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
//   const yMain = useTransform(scrollYProgress, [0, 1], [0, 140]);
//   const ySmall = useTransform(scrollYProgress, [0, 1], [0, -100]);
//   const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
//   const textY = useTransform(scrollYProgress, [0, 1], [0, 90]);
//   const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

//   return (
//     <section
//       ref={ref}
//       aria-labelledby="about-title"
//       className="pb-[clamp(5rem,10vw,8rem)] pt-[clamp(4.5rem,10vw,8rem)]"
//     >
//       <div className={`${container} grid grid-cols-1 items-center gap-[clamp(3rem,7vw,7rem)] lg:grid-cols-[1.1fr_0.9fr]`}>
//         <motion.div className="flex flex-col gap-8" style={{ y: textY, opacity: textOpacity }}>
//           <h1
//             id="about-title"
//             aria-label={headline.join(" ")}
//             className="m-0 font-serif text-[clamp(3rem,6.8vw,6rem)] font-normal leading-[1.02] tracking-[-0.02em] text-white"
//           >
//             {headline.map((word, i) => (
//               <span
//                 key={word + i}
//                 aria-hidden="true"
//                 className="mr-[0.24em] -mb-[0.12em] inline-block align-top overflow-hidden pb-[0.12em]"
//               >
//                 <motion.span
//                   className="inline-block"
//                   initial={{ y: "115%" }}
//                   animate={{ y: "0%" }}
//                   transition={{ duration: 1.1, ease, delay: 0.15 + i * 0.07 }}
//                 >
//                   {word}
//                 </motion.span>
//               </span>
//             ))}
//           </h1>

//           <motion.p
//             className="max-w-[46ch] text-lg"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease, delay: 0.8 }}
//           >
//             I'm [Your Name], a bridal makeup artist based in [City]. For [X] years
//             I've been getting brides ready for muhurthams, receptions and every
//             ritual in between, with makeup that lasts the whole day and never
//             hides the face your family knows.
//           </motion.p>

//           <motion.div
//             className="flex flex-wrap gap-3.5"
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ duration: 1, ease, delay: 0.95 }}
//           >
//             <a className={btnPrimary} href="/contact">
//               Book a trial
//             </a>
//             <a className={btnGhost} href="/portfolio">
//               <span>See bridal looks</span>
//             </a>
//           </motion.div>
//         </motion.div>

//         <div className="relative mx-auto mb-12 mt-4 w-full max-w-[340px] justify-self-center lg:m-0 lg:max-w-[460px] lg:justify-self-end">
//           {/* Main square image */}
//           <motion.div className="relative w-full" style={{ y: yMain }}>
//             <div
//               aria-hidden="true"
//               className="pointer-events-none absolute inset-0 translate-x-4 translate-y-4 border border-gold"
//             />
//             <motion.div
//               className="relative aspect-square overflow-hidden bg-ink2"
//               initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
//               animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
//               transition={{ duration: 1.5, ease, delay: 0.3 }}
//             >
//               <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
//                 <Img src={IMAGES.hero} alt="A bride in full bridal makeup" label="Hero bridal photo" />
//               </motion.div>
//             </motion.div>
//           </motion.div>

//           {/* Small overlapping square image */}
//           <motion.div className="absolute -bottom-[10%] -left-[16%] w-2/5" style={{ y: ySmall }}>
//             <motion.div
//               className="relative aspect-square overflow-hidden border-[6px] border-ink bg-ink2 shadow-[0_0_0_1px_#D5A653]"
//               initial={{ opacity: 0, scale: 0.85 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ duration: 1.2, ease, delay: 1 }}
//             >
//               <Img src={IMAGES.detail} alt="Close-up of bridal jewellery and makeup" label="Detail photo" />
//             </motion.div>
//           </motion.div>

//           {/* Rotating badge */}
//           <motion.a
//             href="/contact"
//             aria-label="Book a bridal trial"
//             className="group absolute -right-[6%] top-[6%] grid h-[104px] w-[104px] place-items-center rounded-full bg-ink text-goldlight no-underline shadow-[0_0_0_1px_rgba(213,166,83,0.22)] lg:-right-[8%] lg:h-[124px] lg:w-[124px]"
//             initial={{ opacity: 0, scale: 0.5 }}
//             animate={{ opacity: 1, scale: 1 }}
//             whileHover={{ scale: 1.08 }}
//             transition={{ duration: 0.8, ease, delay: 1.3 }}
//           >
//             <motion.svg
//               viewBox="0 0 120 120"
//               className="absolute inset-0 h-full w-full"
//               animate={{ rotate: 360 }}
//               transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
//               aria-hidden="true"
//             >
//               <defs>
//                 <path id="ab-circle-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
//               </defs>
//               <text className="fill-gold font-sans text-[10.5px] font-medium">
//                 <textPath href="#ab-circle-path" textLength="285" lengthAdjust="spacing">
//                   Book a bridal trial ✦ Book a bridal trial ✦
//                 </textPath>
//               </text>
//             </motion.svg>
//             <svg
//               className="h-[26px] w-[26px] transition-transform duration-[400ms] ease-[cubic-bezier(.22,1,.36,1)] group-hover:rotate-45"
//               viewBox="0 0 24 24"
//               aria-hidden="true"
//             >
//               <path
//                 d="M7 17L17 7M9 7h8v8"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="1.6"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//               />
//             </svg>
//           </motion.a>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ----------------------------- Marquee ---------------------------- */

// function Marquee() {
//   const row = [...marqueeItems, ...marqueeItems];
//   return (
//     <div className="overflow-hidden border-y border-line bg-ink2 py-6" aria-hidden="true">
//       <motion.div
//         className="flex w-max"
//         animate={{ x: ["0%", "-50%"] }}
//         transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
//       >
//         {row.map((item, i) => (
//           <span
//             key={item + i}
//             className="inline-flex items-center gap-10 whitespace-nowrap pr-10 font-serif text-[clamp(2rem,4.5vw,3.75rem)] leading-none"
//           >
//             <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_#D5A653]" : ""}>
//               {item}
//             </span>
//             <Star />
//           </span>
//         ))}
//       </motion.div>
//     </div>
//   );
// }

// /* -------------------- Statement (scroll-lit words) ------------------ */

// function Word({ children, progress, range }) {
//   const opacity = useTransform(progress, range, [0.15, 1]);
//   return (
//     <motion.span className="inline" style={{ opacity }}>
//       {children}{" "}
//     </motion.span>
//   );
// }

// function Statement() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
//   const words = statement.split(" ");

//   return (
//     <section className="relative py-[clamp(5rem,10vw,8.5rem)]" aria-label="My approach">
//       <div className={container}>
//         <p
//           ref={ref}
//           className="max-w-[30ch] font-serif text-[clamp(1.9rem,3.9vw,3.4rem)] leading-[1.22] tracking-[-0.01em] text-white"
//         >
//           {words.map((w, i) => {
//             const start = i / words.length;
//             return (
//               <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
//                 {w}
//               </Word>
//             );
//           })}
//         </p>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------ Story ------------------------------ */

// function Story() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
//   const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

//   return (
//     <section
//       ref={ref}
//       aria-labelledby="story-title"
//       className="relative bg-ink2 py-[clamp(5rem,10vw,8.5rem)]"
//     >
//       <div className={`${container} grid grid-cols-1 items-center gap-[clamp(2.5rem,7vw,7rem)] lg:grid-cols-[0.9fr_1.1fr]`}>
//         <motion.div
//           className="relative aspect-square w-full max-w-[420px] overflow-hidden bg-ink2 lg:max-w-none"
//           initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
//           whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 1.4, ease }}
//         >
//           <motion.div className="absolute inset-x-0 -top-[10%] -bottom-[10%]" style={{ y: imgY }}>
//             <Img src={IMAGES.story} alt="[Your Name] doing a bride's makeup" label="Photo of you at work" />
//           </motion.div>
//         </motion.div>

//         <motion.div
//           className="flex max-w-[58ch] flex-col gap-5"
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.3 }}
//           transition={{ duration: 1, ease, delay: 0.15 }}
//         >
//           <h2 id="story-title" className={`${h2} mb-2`}>
//             How it started
//           </h2>
//           <p>
//             [Write 2–3 sentences about how you began: a cousin's wedding, a course
//             you took, the first bride you got ready. Real details make this
//             section feel personal.]
//           </p>
//           <p>
//             Since [Year], I've worked with brides across [cities or regions].
//             Temple weddings at sunrise, beach receptions, family functions at
//             home. Every wedding is different, but the goal stays the same: the
//             bride should feel calm, comfortable and completely herself.
//           </p>
//           <p>
//             I trained at [academy or certification] and keep learning new
//             techniques every year. The best part of the work is still the moment
//             a bride looks in the mirror and smiles.
//           </p>
//           <p className="mt-2 font-serif text-[1.9rem] italic text-gold">[Your Name]</p>
//         </motion.div>
//       </div>
//     </section>
//   );
// }

// /* ----------------------- Horizontal gallery ----------------------- */

// function Gallery() {
//   const sectionRef = useRef(null);
//   const trackRef = useRef(null);
//   const reduce = useReducedMotion();
//   const distance = useMotionValue(0);
//   const [height, setHeight] = useState(null);

//   useEffect(() => {
//     const measure = () => {
//       if (!trackRef.current) return;
//       const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
//       distance.set(d);
//       setHeight(d + window.innerHeight);
//     };
//     measure();
//     window.addEventListener("resize", measure);
//     return () => window.removeEventListener("resize", measure);
//   }, [distance]);

//   const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
//   const x = useTransform([scrollYProgress, distance], ([p, d]) => -p * d);
//   const isStatic = reduce;

//   const wrapClass = isStatic
//     ? "static h-auto overflow-visible py-20"
//     : "sticky top-0 h-screen overflow-hidden";

//   const trackClass = [
//     "flex gap-7 px-[max(1.5rem,calc((100vw-1240px)/2+1.5rem))]",
//     isStatic ? "overflow-x-auto pb-4" : "w-max",
//   ].join(" ");

//   return (
//     <section
//       ref={sectionRef}
//       aria-labelledby="looks-title"
//       className="relative"
//       style={{ height: isStatic || !height ? "auto" : height }}
//     >
//       <div className={`${wrapClass} flex flex-col justify-center gap-11`}>
//         <div className={`${container} flex flex-wrap items-end justify-between gap-6`}>
//           <h2 id="looks-title" className={h2}>
//             Looks I create
//           </h2>
//           <p className="max-w-[40ch]">
//             From the first function to the last photo, each look is planned around your outfit, your skin and the time of day.
//           </p>
//         </div>

//         <motion.ul ref={trackRef} className={trackClass} style={isStatic ? undefined : { x }}>
//           {looks.map((look, i) => (
//             <li
//               key={look.title}
//               className="group w-[clamp(250px,26vw,360px)] flex-none max-[600px]:w-[76vw]"
//             >
//               <div className="relative aspect-square overflow-hidden border border-line bg-ink2 transition-colors duration-[400ms] group-hover:border-gold">
//                 <Img
//                   src={look.src}
//                   alt={`${look.title} makeup look`}
//                   label={look.title}
//                   className="transition-transform duration-1000 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-[1.06]"
//                 />
//               </div>
//               <div className="grid grid-cols-[auto_1fr] gap-4 pt-5">
//                 <span className="pt-1 font-serif text-base text-gold">
//                   {String(i + 1).padStart(2, "0")}
//                 </span>
//                 <div>
//                   <h3 className={h3}>{look.title}</h3>
//                   <p className="text-[0.98rem]">{look.text}</p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </motion.ul>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------ Values ----------------------------- */

// function SpotlightCard({ children, index }) {
//   const ref = useRef(null);
//   const onMove = (e) => {
//     const r = ref.current.getBoundingClientRect();
//     ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
//     ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
//   };
//   return (
//     <motion.li
//       ref={ref}
//       className={card}
//       onMouseMove={onMove}
//       initial={{ opacity: 0, y: 50 }}
//       whileInView={{ opacity: 1, y: 0 }}
//       viewport={{ once: true, amount: 0.4 }}
//       transition={{ duration: 0.9, ease, delay: index * 0.12 }}
//     >
//       {children}
//     </motion.li>
//   );
// }

// function Values() {
//   return (
//     <section className="relative py-[clamp(5rem,10vw,8.5rem)]" aria-labelledby="values-title">
//       <div className={container}>
//         <h2 id="values-title" className={`${h2} mb-14`}>
//           What I care about
//         </h2>
//         <ul className="grid grid-cols-1 gap-6 lg:grid-cols-3">
//           {values.map((v, i) => (
//             <SpotlightCard key={v.title} index={i}>
//               <span className="mb-7 inline-grid h-14 w-14 place-items-center rounded-full border border-gold text-goldlight">
//                 <Icon name={v.icon} />
//               </span>
//               <h3 className={h3}>{v.title}</h3>
//               <p>{v.text}</p>
//             </SpotlightCard>
//           ))}
//         </ul>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------ Process ---------------------------- */

// function Process() {
//   const ref = useRef(null);
//   const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
//   const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

//   return (
//     <section className="relative bg-ink2 py-[clamp(5rem,10vw,8.5rem)]" aria-labelledby="process-title">
//       <div className={`${container} grid grid-cols-1 items-start gap-[clamp(2.5rem,7vw,7rem)] lg:grid-cols-[0.85fr_1.15fr]`}>
//         <div className="lg:sticky lg:top-24">
//           <h2 id="process-title" className={h2}>
//             From first call to final touch-up
//           </h2>
//           <p className="mt-5 max-w-[36ch]">
//             Here's how working together looks, so nothing about your wedding
//             morning is a surprise.
//           </p>
//         </div>

//         <div className="relative" ref={ref}>
//           <span aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-line" />
//           <motion.span
//             aria-hidden="true"
//             className="absolute bottom-6 left-[23px] top-6 w-px origin-top bg-gold"
//             style={{ scaleY }}
//           />
//           <ol className="flex flex-col gap-[3.25rem]">
//             {steps.map((s, i) => (
//               <motion.li
//                 key={s.title}
//                 className="relative grid grid-cols-[48px_1fr] gap-[1.6rem]"
//                 initial={{ opacity: 0.35 }}
//                 whileInView={{ opacity: 1 }}
//                 viewport={{ amount: 0.8, once: true }}
//                 transition={{ duration: 0.6, ease }}
//               >
//                 <motion.span
//                   aria-hidden="true"
//                   className="relative z-[1] grid h-12 w-12 place-items-center rounded-full border border-gold font-serif text-[1.15rem]"
//                   initial={{ backgroundColor: "#171411", color: "#F3C477" }}
//                   whileInView={{ backgroundColor: "#D5A653", color: "#0D0C0B" }}
//                   viewport={{ amount: 0.8, once: true }}
//                   transition={{ duration: 0.5 }}
//                 >
//                   {i + 1}
//                 </motion.span>
//                 <div>
//                   <h3 className={h3}>{s.title}</h3>
//                   <p className="max-w-[50ch]">{s.text}</p>
//                 </div>
//               </motion.li>
//             ))}
//           </ol>
//         </div>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------- CTA ------------------------------- */

// function MagneticButton({ href, children }) {
//   const ref = useRef(null);
//   const reduce = useReducedMotion();
//   const x = useMotionValue(0);
//   const y = useMotionValue(0);
//   const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
//   const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

//   const move = (e) => {
//     if (reduce) return;
//     const r = ref.current.getBoundingClientRect();
//     x.set((e.clientX - r.left - r.width / 2) * 0.35);
//     y.set((e.clientY - r.top - r.height / 2) * 0.35);
//   };
//   const leave = () => {
//     x.set(0);
//     y.set(0);
//   };

//   return (
//     <motion.a
//       ref={ref}
//       href={href}
//       className={magnetic}
//       style={{ x: sx, y: sy }}
//       onMouseMove={move}
//       onMouseLeave={leave}
//       whileTap={{ scale: 0.94 }}
//     >
//       {children}
//     </motion.a>
//   );
// }

// function CTA() {
//   return (
//     <section
//       className="relative overflow-hidden border-t border-line py-[clamp(5rem,10vw,8.5rem)]"
//       aria-labelledby="cta-title"
//     >
//       <svg
//         aria-hidden="true"
//         viewBox="0 0 440 440"
//         className="pointer-events-none absolute -right-[6%] top-[8%] aspect-square w-[min(520px,60vw)]"
//       >
//         <motion.rect
//           x="1"
//           y="1"
//           width="438"
//           height="438"
//           fill="none"
//           stroke="#D5A653"
//           strokeOpacity="0.35"
//           strokeWidth="1"
//           initial={{ pathLength: 0 }}
//           whileInView={{ pathLength: 1 }}
//           viewport={{ once: true, amount: 0.4 }}
//           transition={{ duration: 2.2, ease: "easeInOut" }}
//         />
//       </svg>

//       <div className={`${container} relative flex flex-wrap items-center justify-between gap-12`}>
//         <motion.div
//           initial={{ opacity: 0, y: 40 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true, amount: 0.5 }}
//           transition={{ duration: 1, ease }}
//         >
//           <h2 id="cta-title" className={`${h2} max-w-[16ch]`}>
//             Your wedding morning should feel calm. Let's plan it together.
//           </h2>
//           <p className="mt-5 max-w-[36ch]">
//             Dates fill up early in wedding season. Share your date and I'll
//             confirm availability within a day.
//           </p>
//           <a
//             className="mt-7 inline-block bg-[linear-gradient(#D5A653,#D5A653)] bg-left-bottom bg-no-repeat pb-1 text-gold no-underline transition-[background-size,color] duration-500 ease-[cubic-bezier(.22,1,.36,1)] [background-size:100%_1px] hover:bg-right-bottom hover:text-goldlight hover:[background-size:0%_1px]"
//             href="https://wa.me/[your-number]"
//             target="_blank"
//             rel="noreferrer"
//           >
//             Message on WhatsApp
//           </a>
//         </motion.div>

//         <MagneticButton href="/contact">Book a trial</MagneticButton>
//       </div>
//     </section>
//   );
// }

// /* ------------------------------ Page ------------------------------ */

// function About() {
//   return (
//     <MotionConfig reducedMotion="user">
//       <main className="overflow-x-clip bg-[#0E0B09]font-sans text-[1.0625rem] leading-[1.7] text-muted">
//         <ScrollProgress />
//         <Hero />
//         <Marquee />
//         <Statement />
//         <Story />
//         <Gallery />
//         <Values />
//         <Process />
//         <CTA />
//       </main>
//     </MotionConfig>
//   );
// }

// export default About;

import { useEffect, useRef, useState } from "react";
import {
  motion,
  MotionConfig,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import Navbar from "../Navbar/Navbar";

/* ------------------------------------------------------------------
   Photos: put your own files in /public/images and keep these paths.
   If a file is missing, a dark placeholder shows instead.
------------------------------------------------------------------- */
const IMAGES = {
  hero: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg",
  detail: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=900&q=85",
  story: "/images/artist-at-work.jpg",
};

/* Contact details, same as the homepage */
const WHATSAPP = "https://wa.me/919363250028";
const PHONE = "tel:+919363250028";
const PHONE_DISPLAY = "93632 50028";

const looks = [
  {
    title: "Traditional Bridal",
    category: "Traditional",
    text: "Timeless South Indian bridal elegance",
    src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Luxury HD Bridal",
    category: "HD Makeup",
    text: "Refined makeup with a flawless finish",
    src: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Elegant Reception",
    category: "Reception",
    text: "Glamour for your special evening",
    src: "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Soft Bridal Glam",
    category: "Airbrush",
    text: "Soft, radiant and beautifully balanced",
    src: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=900&q=85",
  },
  {
    title: "Modern Bridal Look",
    category: "HD Makeup",
    text: "Contemporary beauty with a luxury touch",
    src: "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=900&q=85",
  },
];

const values = [
  {
    icon: "sparkle",
    title: "Your face, not a trend",
    text: "Every look is built around your features and the way your family sees you. No heavy mask that only works on camera.",
  },
  {
    icon: "sun",
    title: "Made to last all day",
    text: "Long muhurthams, humidity, garlands, hugs and happy tears. Your makeup holds from morning rituals to the last reception photo.",
  },
  {
    icon: "drop",
    title: "Skin before makeup",
    text: "You get a simple skin-prep routine weeks before the wedding, so on the day we enhance healthy skin instead of covering it.",
  },
];

const steps = [
  {
    title: "Consultation",
    text: "We talk about your saree or lehenga, jewellery, hairstyle and the look you have in mind. Reference photos are welcome.",
  },
  {
    title: "Trial session",
    text: "A full trial of your bridal look, checked in daylight and indoor light, so we can fine-tune before the big day.",
  },
  {
    title: "Wedding morning",
    text: "I arrive early with a complete kit. Makeup, hair, draping and jewellery, done calmly and on time for the muhurtham.",
  },
  {
    title: "Reception refresh",
    text: "A new look or a quick touch-up for the evening, so you feel as fresh at night as you did in the morning.",
  },
];

const marqueeItems = [
  "Muhurtham",
  "Reception",
  "Engagement",
  "Haldi",
  "Mehendi",
  "Sangeet",
  "Saree draping",
  "Bridal hair",
];

const headlineWords = ["Bridal", "makeup", "that", "still", "looks", "like"];

const statement =
  "Every bride walks in with her own story, her own skin and her own idea of beautiful. My work is to listen first, then create a look that holds through the muhurtham, the tears and the dancing, and still feels like her in every photograph.";

/* ----------------------- Shared style tokens ----------------------- */

const EASE = [0.22, 1, 0.36, 1];

/* Same left/right edge as the max-w-7xl container, for the scrolling gallery */
const EDGE = "max(1.5rem, calc((100vw - 80rem) / 2 + 1.5rem))";

/* One full screen per section on desktop, at least one screen on mobile */
const frame =
  "relative isolate flex min-h-[100svh] items-center overflow-hidden py-24 lg:h-[100svh] lg:min-h-[600px] lg:py-16";

const wrap = "mx-auto w-full max-w-7xl px-6 md:px-10";

const h2 =
  "font-display text-5xl font-medium leading-[1.02] text-[#F4ECDF] sm:text-6xl lg:text-7xl";

const h3 = "mb-3 font-display text-3xl leading-[1.1] text-[#F4ECDF]";

const body = "font-body text-base leading-8 text-[#F4ECDF]/65";

/* ---------------------------- Helpers ---------------------------- */

function Img({ src, alt, label, className = "", priority = false }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#17120E] p-6 text-center font-body text-sm text-[#F4ECDF]/60"
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
      loading={priority ? "eager" : "lazy"}
      className={`block h-full w-full object-cover ${className}`}
    />
  );
}

function Icon({ name }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.4,
    strokeLinecap: "round",
    strokeLinejoin: "round",
    "aria-hidden": true,
  };
  if (name === "sun")
    return (
      <svg {...common}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    );
  if (name === "drop")
    return (
      <svg {...common}>
        <path d="M12 3s6 6.4 6 11a6 6 0 0 1-12 0c0-4.6 6-11 6-11z" />
        <path d="M9.5 14.5a2.5 2.5 0 0 0 2.5 2.5" />
      </svg>
    );
  return (
    <svg {...common}>
      <path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z" />
      <path d="M19 16l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" />
    </svg>
  );
}

function Star() {
  return (
    <svg className="h-[22px] w-[22px] flex-none fill-[#F1CF8A]" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 0c.8 6.4 5.6 11.2 12 12-6.4.8-11.2 5.6-12 12-.8-6.4-5.6-11.2-12-12C6.4 11.2 11.2 6.4 12 0z" />
    </svg>
  );
}

function Kicker({ children }) {
  return (
    <p className="flex items-center gap-4 font-display text-lg italic text-[#F1CF8A] sm:text-xl">
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
      className={`group inline-flex items-center gap-4 rounded-full px-7 py-3 font-body text-base no-underline transition-colors duration-300 ${solid
          ? "bg-[#D5A653] text-[#0E0B09] hover:bg-[#F1CF8A]"
          : "border border-[#D5A653]/70 text-[#F4ECDF] hover:border-[#F1CF8A] hover:text-[#F1CF8A]"
        }`}
    >
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 flex-none items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 ${solid ? "bg-[#0E0B09] text-[#F1CF8A]" : "bg-[#D5A653] text-[#0E0B09]"
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
        className={`inline-block ${accent ? "italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]" : ""}`}
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

function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const yMain = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const ySmall = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0]);

  return (
    <section ref={ref} aria-labelledby="about-title" className={frame}>
      {/* Ambient glows */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <motion.div
          animate={{ scale: [1, 1.12, 1], opacity: [0.7, 1, 0.7] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-[-15%] top-[5%] h-[640px] w-[640px] rounded-full bg-[#D5A653]/10 blur-[140px]"
        />
        <div className="absolute bottom-[-25%] left-[-15%] h-[560px] w-[560px] rounded-full bg-[#7A1426]/30 blur-[150px]" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0E0B09] to-transparent" />
      </div>

      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-10`}>
        {/* Copy */}
        <motion.div className="relative z-10 flex flex-col gap-6" style={{ y: textY, opacity: textOpacity }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
            <Kicker>About Aara Makeovers</Kicker>
          </motion.div>

          <h1
            id="about-title"
            aria-label="Bridal makeup that still looks like you."
            className="font-display font-medium text-[length:clamp(2.9rem,min(7.4vw,9svh),6.4rem)] leading-[0.98] tracking-[-0.02em] text-[#F4ECDF]"
          >
            {headlineWords.map((word, i) => (
              <MaskWord key={word} delay={0.2 + i * 0.07}>
                {word}
              </MaskWord>
            ))}
            <MaskWord delay={0.2 + headlineWords.length * 0.07} accent>
              you.
            </MaskWord>
          </h1>

          <motion.p
            className="max-w-lg font-body text-lg font-light leading-8 text-[#F4ECDF]/70 xl:text-xl xl:leading-9"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.8 }}
          >
            I'm the artist behind Aara Makeovers, a bridal makeup studio in Madurai. For [X] years I've been
            getting brides ready for muhurthams, receptions and every ritual in between, with makeup that lasts
            the whole day and never hides the face your family knows.
          </motion.p>

          <motion.div
            className="flex flex-wrap items-center gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.95 }}
          >
            <PillButton href="/contact">Book a trial</PillButton>
            <PillButton href="/portfolio" variant="outline">
              See bridal looks
            </PillButton>
          </motion.div>
        </motion.div>

        {/* Square image with gold frame, small overlapping photo and rotating badge */}
        <div className="relative mx-auto w-full max-w-[340px] lg:mx-0 lg:w-[min(calc(100svh-14rem),42vw,460px)] lg:max-w-none lg:justify-self-end">
          <motion.div className="relative w-full" style={{ y: yMain }}>
            <div aria-hidden="true" className="pointer-events-none absolute -inset-[7px] rounded-[35px] border border-[#D5A653]/80" />
            <motion.div
              className="relative aspect-square overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#17120E]"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.5, ease: EASE, delay: 0.3 }}
            >
              <motion.div className="absolute inset-0" style={{ scale: imgScale }}>
                <Img
                  src={IMAGES.hero}
                  alt="Bride in luxury bridal makeup by Aara Makeovers"
                  label="Hero bridal photo"
                  priority
                />
              </motion.div>
              <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0B09]/50 via-transparent to-transparent" />
            </motion.div>
          </motion.div>

          <motion.div className="absolute -bottom-[8%] -left-[12%] w-[42%]" style={{ y: ySmall }}>
            <motion.div
              className="relative aspect-square overflow-hidden rounded-[28px] border-[6px] border-[#0E0B09] bg-[#17120E] shadow-2xl shadow-black/50"
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: EASE, delay: 1 }}
            >
              <Img src={IMAGES.detail} alt="Close-up of bridal jewellery and makeup" label="Detail photo" />
            </motion.div>
          </motion.div>

          <motion.a
            href="/contact"
            aria-label="Book a bridal trial"
            className="group absolute -right-3 top-[6%] grid h-[104px] w-[104px] place-items-center rounded-full border border-[#D5A653]/40 bg-[#0E0B09] text-[#F1CF8A] no-underline lg:-right-[8%] lg:h-[124px] lg:w-[124px]"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.8, ease: EASE, delay: 1.3 }}
          >
            <motion.svg
              viewBox="0 0 120 120"
              className="absolute inset-0 h-full w-full"
              animate={{ rotate: 360 }}
              transition={{ repeat: Infinity, duration: 18, ease: "linear" }}
              aria-hidden="true"
            >
              <defs>
                <path id="about-badge-path" d="M60,60 m-46,0 a46,46 0 1,1 92,0 a46,46 0 1,1 -92,0" />
              </defs>
              <text className="fill-[#D5A653] font-body text-[10.5px] font-medium">
                <textPath href="#about-badge-path" textLength="285" lengthAdjust="spacing">
                  Book a bridal trial ✦ Book a bridal trial ✦
                </textPath>
              </text>
            </motion.svg>
            <svg
              className="h-[26px] w-[26px] transition-transform duration-500 group-hover:rotate-45"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                d="M7 17L17 7M9 7h8v8"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </motion.a>
        </div>
      </div>
    </section>
  );
}

/* ----------------------------- Marquee ---------------------------- */
/* A thin ticker band between the hero and the statement, not a full screen */

function Marquee() {
  const row = [...marqueeItems, ...marqueeItems];
  return (
    <div aria-hidden="true" className="overflow-hidden border-y border-[#D5A653]/20 bg-[#17120E] py-6">
      <motion.div
        className="flex w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 32 }}
      >
        {row.map((item, i) => (
          <span
            key={`${item}-${i}`}
            className="inline-flex items-center gap-10 whitespace-nowrap pr-10 font-display text-[length:clamp(2rem,4.5vw,3.75rem)] leading-none text-[#F4ECDF]"
          >
            <span className={i % 2 ? "text-transparent [-webkit-text-stroke:1px_#D5A653]" : ""}>{item}</span>
            <Star />
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/* -------------------- Statement (scroll-lit words) ------------------ */

function Word({ children, progress, range }) {
  const opacity = useTransform(progress, range, [0.15, 1]);
  return (
    <motion.span className="inline" style={{ opacity }}>
      {children}{" "}
    </motion.span>
  );
}

function Statement() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "end 50%"] });
  const words = statement.split(" ");

  return (
    <section aria-label="My approach" className={frame}>
      <div className={wrap}>
        <p
          ref={ref}
          className="max-w-[30ch] font-display text-[length:clamp(1.9rem,3.9vw,3.4rem)] leading-[1.22] tracking-[-0.01em] text-[#F4ECDF]"
        >
          {words.map((w, i) => {
            const start = i / words.length;
            return (
              <Word key={i} progress={scrollYProgress} range={[start, start + 1 / words.length]}>
                {w}
              </Word>
            );
          })}
        </p>
      </div>
    </section>
  );
}

/* ------------------------------ Story ------------------------------ */

function Story() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section ref={ref} aria-labelledby="story-title" className={`${frame} bg-[#17120E]`}>
      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20`}>
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-[7px] rounded-[35px] border border-[#D5A653]/80" />
          <motion.div
            className="relative aspect-square overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#0E0B09]"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 1.4, ease: EASE }}
          >
            <motion.div className="absolute inset-x-0 -top-[10%] -bottom-[10%]" style={{ y: imgY }}>
              <Img
                src={IMAGES.story}
                alt="Aara Makeovers artist doing a bride's makeup"
                label="Photo of the artist at work"
              />
            </motion.div>
          </motion.div>
        </div>

        <motion.div
          className="flex max-w-xl flex-col gap-4"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE, delay: 0.15 }}
        >
          <Kicker>Our story</Kicker>
          <h2 id="story-title" className={h2}>
            How it <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]">started</span>
          </h2>
          <p className={body}>
            [Add 2–3 sentences about how you began: a cousin's wedding, a course you took, or the first bride you got
            ready.]
          </p>
          <p className={body}>
            Since [year], I've worked with brides across [cities]. Temple weddings at sunrise, beach receptions,
            family functions at home. Every wedding is different, but the goal stays the same: the bride should feel
            calm, comfortable and completely herself.
          </p>
          <p className={body}>
            I trained at [academy or certification] and keep learning new techniques every year. The best part of the
            work is still the moment a bride looks in the mirror and smiles.
          </p>
          <p className="mt-2 font-display text-3xl italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]">Aara Makeovers, Madurai</p>
        </motion.div>
      </div>
    </section>
  );
}

/* ----------------------- Horizontal gallery ----------------------- */
/* Desktop: the section pins to the screen and scrolls the looks sideways.
   Reduced-motion users get a plain horizontal scroll instead. */

function Gallery() {
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const reduce = useReducedMotion();
  const distance = useMotionValue(0);
  const [height, setHeight] = useState(null);

  useEffect(() => {
    const measure = () => {
      if (!trackRef.current) return;
      const d = Math.max(0, trackRef.current.scrollWidth - window.innerWidth);
      distance.set(d);
      setHeight(d + window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [distance]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const x = useTransform([scrollYProgress, distance], ([p, d]) => -p * d);
  const isStatic = reduce;

  return (
    <section
      ref={sectionRef}
      aria-labelledby="looks-title"
      className="relative"
      style={{ height: isStatic || !height ? "auto" : height }}
    >
      <div
        className={`${isStatic ? "relative py-24" : "sticky top-0 h-[100svh] overflow-hidden"
          } flex flex-col justify-center gap-10`}
      >
        <div className={`${wrap} flex flex-wrap items-end justify-between gap-6`}>
          <div className="flex flex-col gap-5">
            <Kicker>The gallery</Kicker>
            <h2 id="looks-title" className={h2}>
              Looks I <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]">create</span>
            </h2>
          </div>
          <p className="max-w-sm font-body text-base leading-7 text-[#F4ECDF]/60">
            From the first function to the last photo, each look is planned around your outfit, your skin and the
            time of day.
          </p>
        </div>

        <motion.ul
          ref={trackRef}
          className={`flex gap-7 ${isStatic ? "overflow-x-auto pb-4" : "w-max"}`}
          style={isStatic ? { paddingLeft: EDGE, paddingRight: EDGE } : { x, paddingLeft: EDGE, paddingRight: EDGE }}
        >
          {looks.map((look, i) => (
            <li key={look.title} className="group w-[clamp(230px,22vw,300px)] flex-none max-[600px]:w-[72vw]">
              <div className="relative aspect-square overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#17120E] transition-colors duration-500 group-hover:border-[#D5A653]/70">
                <Img
                  src={look.src}
                  alt={`${look.title} makeup look`}
                  label={look.title}
                  className="transition-transform duration-1000 ease-out group-hover:scale-[1.05]"
                />
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0E0B09]/80 via-transparent to-transparent" />
                <span className="absolute left-5 top-5 rounded-full border border-[#D5A653]/50 bg-[#0E0B09]/60 px-3 py-1 font-body text-[11px] tracking-wide text-[#F1CF8A] backdrop-blur-sm">
                  {look.category}
                </span>
              </div>
              <div className="grid grid-cols-[auto_1fr] gap-4 pt-5">
                <span className="pt-1 font-display text-lg italic text-[#F1CF8A]">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-display text-2xl leading-tight text-[#F4ECDF]">{look.title}</h3>
                  <p className="mt-1 font-body text-sm leading-6 text-[#F4ECDF]/60">{look.text}</p>
                </div>
              </div>
            </li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}

/* ------------------------------ Values ----------------------------- */

function SpotlightCard({ children, index }) {
  const ref = useRef(null);
  const onMove = (e) => {
    const r = ref.current.getBoundingClientRect();
    ref.current.style.setProperty("--mx", `${e.clientX - r.left}px`);
    ref.current.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <motion.li
      ref={ref}
      onMouseMove={onMove}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.4 }}
      transition={{ duration: 0.9, ease: EASE, delay: index * 0.12 }}
      className="group relative overflow-hidden rounded-[28px] border border-[#D5A653]/25 bg-[#0E0B09] p-8 transition-colors duration-500 hover:border-[#D5A653]/60 sm:p-9"
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(340px circle at var(--mx, 50%) var(--my, 50%), rgba(241,207,138,0.14), transparent 60%)",
        }}
      />
      <div className="relative">{children}</div>
    </motion.li>
  );
}

function Values() {
  return (
    <section aria-labelledby="values-title" className={`${frame} bg-[#17120E]`}>
      <div className={wrap}>
        <div className="flex flex-col gap-5">
          <Kicker>Our values</Kicker>
          <h2 id="values-title" className={h2}>
            What I <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]">care about</span>
          </h2>
        </div>

        <ul className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {values.map((v, i) => (
            <SpotlightCard key={v.title} index={i}>
              <span className="mb-7 inline-grid h-14 w-14 place-items-center rounded-full border border-[#D5A653]/50 text-[#F1CF8A]">
                <Icon name={v.icon} />
              </span>
              <h3 className={h3}>{v.title}</h3>
              <p className="font-body text-base leading-7 text-[#F4ECDF]/60">{v.text}</p>
            </SpotlightCard>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ------------------------------ Process ---------------------------- */

function Process() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 70%", "end 55%"] });
  const scaleY = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section aria-labelledby="process-title" className={frame}>
      <div className={`${wrap} grid items-start gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20`}>
        <div className="flex flex-col gap-5">
          <Kicker>How we work</Kicker>
          <h2 id="process-title" className={h2}>
            From first call to <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]">final touch-up</span>
          </h2>
          <p className="max-w-[36ch] font-body text-base leading-8 text-[#F4ECDF]/65">
            Here's how working together looks, so nothing about your wedding morning is a surprise.
          </p>
        </div>

        <div ref={ref} className="relative">
          <span aria-hidden="true" className="absolute bottom-6 left-[23px] top-6 w-px bg-[#D5A653]/20" />
          <motion.span
            aria-hidden="true"
            className="absolute bottom-6 left-[23px] top-6 w-px origin-top bg-[#D5A653]"
            style={{ scaleY }}
          />
          <ol className="flex flex-col gap-8">
            {steps.map((s, i) => (
              <motion.li
                key={s.title}
                className="relative grid grid-cols-[48px_1fr] gap-6"
                initial={{ opacity: 0.35 }}
                whileInView={{ opacity: 1 }}
                viewport={{ amount: 0.8, once: true }}
                transition={{ duration: 0.6, ease: EASE }}
              >
                <motion.span
                  aria-hidden="true"
                  className="relative z-[1] grid h-12 w-12 place-items-center rounded-full border border-[#D5A653] font-display text-lg"
                  initial={{ backgroundColor: "#0E0B09", color: "#F1CF8A" }}
                  whileInView={{ backgroundColor: "#D5A653", color: "#0E0B09" }}
                  viewport={{ amount: 0.8, once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {i + 1}
                </motion.span>
                <div>
                  <h3 className={h3}>{s.title}</h3>
                  <p className="max-w-[50ch] font-body text-base leading-7 text-[#F4ECDF]/60">{s.text}</p>
                </div>
              </motion.li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------- CTA ------------------------------- */

function MagneticButton({ href, children }) {
  const ref = useRef(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });

  const move = (e) => {
    if (reduce) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * 0.35);
    y.set((e.clientY - r.top - r.height / 2) * 0.35);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={href}
      onMouseMove={move}
      onMouseLeave={leave}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.94 }}
      className="grid h-44 w-44 flex-none place-items-center rounded-full bg-[#F1CF8A] text-center font-body text-lg font-medium leading-tight text-[#0E0B09] no-underline transition-colors duration-300 hover:bg-[#D5A653] max-[600px]:h-[148px] max-[600px]:w-[148px]"
    >
      {children}
    </motion.a>
  );
}

function BookingCTA() {
  return (
    <section
      aria-labelledby="cta-title"
      className={`${frame} bg-gradient-to-br from-[#5A1020] via-[#3E0B16] to-[#1E060B]`}
    >
      {/* Rounded square outline, drawn as you scroll in */}
      <svg
        aria-hidden="true"
        viewBox="0 0 440 440"
        className="pointer-events-none absolute -right-[6%] top-1/2 h-[min(520px,80svh)] w-[min(520px,80svh)] -translate-y-1/2 text-[#D5A653]/30"
      >
        <motion.rect
          x="1"
          y="1"
          width="438"
          height="438"
          rx="27"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 2.2, ease: "easeInOut" }}
        />
      </svg>

      <div className={`${wrap} relative flex flex-wrap items-center justify-between gap-12`}>
        <motion.div
          className="flex max-w-3xl flex-col gap-6"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: EASE }}
        >
          <Kicker>Now booking wedding dates</Kicker>
          <h2
            id="cta-title"
            className="font-display text-[length:clamp(2.6rem,6vw,5.5rem)] font-medium leading-[0.98] text-[#F4ECDF]"
          >
            Your wedding morning should feel calm.{" "}
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]">Let's plan it together.</span>
          </h2>
          <p className="max-w-[40ch] font-body text-base leading-8 text-[#F4ECDF]/70">
            Dates fill up early in wedding season. Share your date and I'll confirm availability within a day.
          </p>
          <div className="flex flex-wrap items-center gap-6">
            <PillButton href={WHATSAPP} target="_blank" rel="noreferrer">
              Message on WhatsApp
            </PillButton>
            <a href={PHONE} className="font-body text-[#F1CF8A] underline-offset-4 hover:underline">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </motion.div>

        <MagneticButton href="/contact">Book a trial</MagneticButton>
      </div>
    </section>
  );
}

/* ------------------------------ Page ------------------------------ */

export default function About() {
  return (
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main className="overflow-x-clip bg-[#0E0B09] font-body text-[#F4ECDF] antialiased">

        <ScrollProgress />
        <Hero />
        <Marquee />
        <Statement />
        <Story />
        <Gallery />
        <Values />
        <Process />
        <BookingCTA />
      </main>
    </MotionConfig>
  );
}