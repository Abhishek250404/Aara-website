import { useCallback, useState } from "react";
import { MotionConfig } from "motion/react";
import { ReactLenis } from "lenis/react";

import Navbar from "../Navbar/Navbar";
import Preloader from "./Preloader";
import { Cursor, FloatingWhatsApp, ScrollProgress } from "./PageChrome";
import { HomeStyles } from "./motionKit";

import Hero from "./Hero";
import Marquee from "./Marquee";
import Portfolio from "./Portfolio";
import Services from "./Services";
import About from "./About";
import WhyChooseUs from "./WhyChooseUs";
import BridalGallery from "./BridalGallery";
import BookingCTA from "./BookingCTA";

function Home() {
  const [ready, setReady] = useState(false);
  const handleReveal = useCallback(() => setReady(true), []);

  return (
    <ReactLenis root options={{ lerp: 0.09, smoothWheel: true, anchors: true }}>
      <MotionConfig reducedMotion="user">
        <HomeStyles />
        <Preloader onReveal={handleReveal} />
        <ScrollProgress />
        <Cursor />

        <Navbar />

        <main className="aara-grain font-body overflow-x-clip bg-[#0E0B09] text-[#F4ECDF] antialiased">
          <Hero ready={ready} />
          {/* <Marquee /> */}
          <Portfolio />
          <Services />
          <About />
          <WhyChooseUs />
          <BridalGallery />
          <BookingCTA />
        </main>

        <FloatingWhatsApp />
      </MotionConfig>
    </ReactLenis>
  );
}

export default Home;
