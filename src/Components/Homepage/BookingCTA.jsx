import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import { CTA, MaskLines, PHONE, Reveal, WHATSAPP } from "./motionKit";

export default function BookingCTA() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });

  const clip = useTransform(
    scrollYProgress,
    [0, 0.7],
    ["inset(10% 6% 10% 6% round 48px)", "inset(0% 0% 0% 0% round 0px)"]
  );

  return (
    <section ref={ref} id="contact" className="relative bg-[#0E0B09] text-[#F4ECDF]">
      <motion.div
        style={{ clipPath: clip }}
        className="relative flex min-h-[100svh] items-center justify-center overflow-hidden bg-gradient-to-br from-[#5A1020] via-[#3E0B16] to-[#1E060B] px-6 py-28"
      >
        <div className="relative z-10 mx-auto max-w-4xl text-center">
          <Reveal as="p" className="font-display text-xl italic text-[#F1CF8A] sm:text-2xl">
            Now booking wedding dates
          </Reveal>
          <h2 className="mt-5 font-display text-[clamp(3rem,9vw,7.5rem)] font-medium leading-[0.98]">
            <MaskLines
              stagger={0.06}
              lines={["Let’s plan your", { text: "wedding look", className: "italic text-gold-gradient" }]}
            />
          </h2>
          <Reveal as="p" delay={0.2} className="mx-auto mt-8 max-w-lg leading-8 text-[#F4ECDF]/70">
            Tell us your date, your outfit and the look you dream of. We’ll reply on WhatsApp to plan your trial and confirm your booking.
          </Reveal>
          <Reveal delay={0.3} className="mt-11 flex flex-wrap items-center justify-center gap-4">
            <CTA href={WHATSAPP}>Message on WhatsApp</CTA>
            <CTA href={PHONE} variant="outline">
              Call 93632 50028
            </CTA>
          </Reveal>
        </div>
      </motion.div>
    </section>
  );
}
