import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CTA, MaskLines, Reveal, WHATSAPP } from "./motionKit";

/* Center image first: it grows to fill the screen. The rest fly outward. */
const pictures = [
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", alt: "Luxury bridal makeup by Aara Makeovers", w: "25vw", h: "25vh", top: "0vh", left: "0vw" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=900&q=85", alt: "Traditional bridal beauty inspiration", w: "35vw", h: "30vh", top: "-30vh", left: "5vw" },
    { src: "https://images.unsplash.com/photo-1594463750939-ebb28c3f7f75?auto=format&fit=crop&w=800&q=85", alt: "Elegant wedding makeup inspiration", w: "20vw", h: "45vh", top: "-10vh", left: "-25vw" },
    { src: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85", alt: "Wedding day details", w: "25vw", h: "25vh", top: "0vh", left: "27.5vw" },
    { src: "https://images.unsplash.com/photo-1523438885200-e635ba2c371e?auto=format&fit=crop&w=800&q=85", alt: "Romantic wedding style inspiration", w: "20vw", h: "25vh", top: "27.5vh", left: "5vw" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=900&q=85", alt: "South Indian bridal elegance", w: "30vw", h: "25vh", top: "27.5vh", left: "-22.5vw" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=85", alt: "Classic bridal beauty", w: "15vw", h: "15vh", top: "22.5vh", left: "25vw" },
];

export default function BridalGallery() {
    /* Heading drift */
    const headRef = useRef(null);
    const { scrollYProgress: headProgress } = useScroll({ target: headRef, offset: ["start end", "end start"] });
    const headingX = useTransform(headProgress, [0, 0.6], [-60, 0]);

    /* Zoom parallax */
    const zoomRef = useRef(null);
    const { scrollYProgress } = useScroll({ target: zoomRef, offset: ["start start", "end end"] });
    const s4 = useTransform(scrollYProgress, [0, 1], [1, 4]);
    const s5 = useTransform(scrollYProgress, [0, 1], [1, 5]);
    const s6 = useTransform(scrollYProgress, [0, 1], [1, 6]);
    const s8 = useTransform(scrollYProgress, [0, 1], [1, 8]);
    const s9 = useTransform(scrollYProgress, [0, 1], [1, 9]);
    const scales = [s4, s5, s6, s5, s6, s8, s9];

    const dim = useTransform(scrollYProgress, [0.6, 0.9], [0, 0.6]);
    const finaleOpacity = useTransform(scrollYProgress, [0.72, 0.92], [0, 1]);
    const finaleY = useTransform(scrollYProgress, [0.72, 0.92], [50, 0]);
    const finalePointer = useTransform(scrollYProgress, (v) => (v > 0.85 ? "auto" : "none"));

    return (
        <section id="gallery" className="relative bg-[#0E0B09] text-[#F4ECDF]">
            <div ref={headRef} className="mx-auto flex max-w-7xl flex-col justify-between gap-6 px-5 pb-16 pt-28 sm:px-8 md:flex-row md:items-end md:px-12 lg:px-20">
                <motion.div style={{ x: headingX }}>
                    <p className="mb-5 font-display text-xl italic text-[#F1CF8A]">The gallery</p>
                    <h2 className="font-display text-5xl font-medium leading-[1.02] sm:text-6xl lg:text-7xl">
                        <MaskLines lines={["Bridal looks,", { text: "up close", className: "italic text-gold-gradient" }]} />
                    </h2>
                </motion.div>
                <Reveal as="p" className="max-w-sm text-sm leading-7 text-[#F4ECDF]/55">
                    Every bride has her own story. Keep scrolling and step into the look.
                </Reveal>
            </div>

            <div ref={zoomRef} className="relative h-[300vh]">
                <div className="sticky top-0 h-[100svh] overflow-hidden">
                    {pictures.map((p, i) => (
                        <motion.div
                            key={p.src}
                            style={{ scale: scales[i] }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <div
                                className={`relative overflow-hidden ${i === 0 ? "" : "rounded-md"}`}
                                style={{ width: p.w, height: p.h, top: p.top, left: p.left }}
                            >
                                <img src={p.src} alt={p.alt} loading="lazy" className="h-full w-full object-cover" />
                            </div>
                        </motion.div>
                    ))}

                    <motion.div style={{ opacity: dim }} className="pointer-events-none absolute inset-0 bg-[#0E0B09]" />

                    <motion.div
                        style={{ opacity: finaleOpacity, y: finaleY, pointerEvents: finalePointer }}
                        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
                    >
                        <p className="font-display text-xl italic text-[#F1CF8A]">Aara Makeovers, Madurai</p>
                        <p className="mt-4 max-w-3xl font-display text-4xl leading-[1.1] sm:text-6xl">
                            Let’s create a look that is uniquely yours.
                        </p>
                        <div className="mt-10">
                            <CTA href={WHATSAPP}>Book your bridal look</CTA>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
