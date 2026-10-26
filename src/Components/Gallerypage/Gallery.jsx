import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, LayoutGroup, motion, MotionConfig, useScroll, useSpring } from "motion/react";
import Navbar from "../Navbar/Navbar";

/* ==================================================================
   ADD YOUR PHOTOS HERE
   ------------------------------------------------------------------
   Each photo is one link inside quotes, followed by a comma.
   Paste a link between the quotes. There is no limit: every photo
   you add here is shown on the page.

       "https://res.cloudinary.com/qjezmjh9/image/upload/v123/photo.jpg",

   Empty slots ("") are skipped. Need more? Add more lines. Need a new tab? Add a new group, for
   example  Haldi: [ "link", "link" ],

   Optional: write a photo as { src: "link", title: "Muhurtham look" }
   to give it a name, or add featured: true / false to choose whether
   it shows twice as big. Without that, about one photo in seven is
   shown big automatically.
   ================================================================== */
const GALLERY = {
  Bridal: [
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
  ],

  Reception: [
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
  ],

  Engagement: [
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
  ],

  "HD & Airbrush": [
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
  ],

  Details: [
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
    { src: "https://res.cloudinary.com/qjezmjh9/image/upload/v1792750755/IMG_9525.JPG.jpg", title: "Luxury bridal" },
    { src: "https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?auto=format&fit=crop&w=1000&q=85", title: "Traditional bridal" },
    { src: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1000&q=85", title: "Classic bridal beauty" },
    { src: "https://images.unsplash.com/photo-1583391733958-d6b2e6c0b2b4?auto=format&fit=crop&w=1000&q=85", title: "Bridal portrait" },
  ],
};

/* ------------------------------------------------------------------ */

const WHATSAPP = "https://wa.me/919363250028";
const PHONE = "tel:+919363250028";
const PHONE_DISPLAY = "93632 50028";

const pad = (n) => String(n).padStart(2, "0");

/* Turn the lists above into one photo list:
   empty slots are skipped, each photo gets a name, and the
   categories are mixed so the "All" tab feels varied. */
const groups = Object.entries(GALLERY).map(([category, list]) =>
  list
    .map((item) => (typeof item === "string" ? { src: item } : item))
    .filter((item) => item && typeof item.src === "string" && item.src.trim() !== "")
    .map((item, i) => ({ ...item, src: item.src.trim(), category, title: item.title || `${category} look ${pad(i + 1)}` }))
);

const mixed = [];
const longest = Math.max(0, ...groups.map((g) => g.length));
for (let i = 0; i < longest; i += 1) {
  groups.forEach((g) => {
    if (g[i]) mixed.push(g[i]);
  });
}

const photos = mixed.map((p, i) => ({
  ...p,
  id: i + 1,
  featured: p.featured ?? i % 7 === 0,
}));

const categories = ["All", ...groups.filter((g) => g.length > 0).map((g) => g[0].category)];
const countFor = (c) => (c === "All" ? photos.length : photos.filter((p) => p.category === c).length);

/* Cloudinary photos are cropped to a square and resized for each place
   they appear, so even large camera files load quickly. Unsplash links
   are resized too. Any other link is used as it is. */
function sized(src, px) {
  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/c_fill,g_auto,w_${px},h_${px},f_auto,q_auto/`);
  }
  if (src.includes("images.unsplash.com")) {
    const base = src.replace(/([?&])(w|h)=\d+&?/g, "$1").replace(/[?&]$/, "");
    return `${base}${base.includes("?") ? "&" : "?"}w=${px}&h=${px}&fit=crop`;
  }
  return src;
}

/* ----------------------- Shared style tokens ----------------------- */

const EASE = [0.22, 1, 0.36, 1];
const wrap = "mx-auto w-full max-w-7xl px-6 md:px-10";
const goldText =
  "italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]";

const enquireLink = (title) =>
  `${WHATSAPP}?text=${encodeURIComponent(`Hi Aara Makeovers, I loved the "${title}" look in your gallery. Can we talk about it?`)}`;

/* ---------------------------- Helpers ---------------------------- */

function Img({ src, size = 800, alt, label, eager = false, className = "" }) {
  const [ok, setOk] = useState(true);
  if (!ok) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="flex h-full w-full flex-col items-center justify-center gap-2 bg-[#17120E] p-4 text-center font-body text-sm text-[#F4ECDF]/60"
      >
        <span>{label}</span>
      </div>
    );
  }
  return (
    <img
      src={sized(src, size)}
      alt={alt}
      onError={() => setOk(false)}
      loading={eager ? "eager" : "lazy"}
      decoding="async"
      draggable="false"
      className={`block h-full w-full select-none object-cover ${className}`}
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

function PillButton({ href, children, variant = "solid", target, rel, onClick, as = "a" }) {
  const solid = variant === "solid";
  const Tag = as;
  return (
    <Tag
      href={as === "a" ? href : undefined}
      type={as === "button" ? "button" : undefined}
      target={target}
      rel={rel}
      onClick={onClick}
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
    </Tag>
  );
}

function Chevron({ dir = "right" }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d={dir === "right" ? "M9 6l6 6-6 6" : "M15 6l-6 6 6 6"} />
    </svg>
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
/* A slowly moving wall of square photos behind a centred title.
   It uses the first 18 photos, spread across three rows. */

const fillRow = (arr) => {
  let out = [...arr];
  while (out.length > 0 && out.length < 6) out = [...out, ...arr];
  return out;
};

const wallSource = photos.slice(0, 18);
const wallRows = [0, 1, 2].map((r) => ({
  items: fillRow(wallSource.filter((_, i) => i % 3 === r)),
  dir: r === 1 ? -1 : 1,
  duration: 70 + r * 6,
}));

function Hero() {
  return (
    <section
      aria-labelledby="gallery-title"
      className="relative isolate flex h-[100svh] min-h-[600px] items-center justify-center overflow-hidden"
    >
      {/* Photo wall */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 flex -rotate-6 scale-125 flex-col justify-center gap-4 opacity-70"
      >
        {wallRows.map((row, r) => (
          <motion.div
            key={r}
            className="flex w-max"
            animate={{ x: row.dir > 0 ? ["0%", "-50%"] : ["-50%", "0%"] }}
            transition={{ duration: row.duration, repeat: Infinity, ease: "linear" }}
          >
            {[...row.items, ...row.items].map((p, i) => (
              <div key={`${p.id}-${i}`} className="pr-4">
                <div className="aspect-square w-[clamp(130px,24svh,250px)] overflow-hidden rounded-[24px] border border-[#D5A653]/20 bg-[#17120E]">
                  <Img src={p.src} size={320} alt="" label="" eager={r === 0} />
                </div>
              </div>
            ))}
          </motion.div>
        ))}
      </div>

      {/* Darkening so the title stays readable */}
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(14,11,9,0.94)_0%,rgba(14,11,9,0.82)_40%,rgba(14,11,9,0.45)_100%)]"
      />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-[#0E0B09] to-transparent" />

      <div className={`${wrap} flex flex-col items-center gap-7 text-center`}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
          <Kicker center>The Aara gallery</Kicker>
        </motion.div>

        <motion.h1
          id="gallery-title"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
          className="max-w-5xl font-display font-medium text-[length:clamp(3rem,min(8vw,12svh),7.4rem)] leading-[0.95] tracking-[-0.02em] text-[#F4ECDF]"
        >
          Moments we've <span className={goldText}>made beautiful.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.5 }}
          className="max-w-xl font-body text-lg font-light leading-8 text-[#F4ECDF]/75"
        >
          Brides, receptions and celebrations from our studio in Madurai. Tap any photo to see it up close.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: EASE, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <PillButton href="#gallery">View the gallery</PillButton>
          <PillButton href="/contact" variant="outline">
            Book a trial
          </PillButton>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="font-body text-xs uppercase tracking-[0.3em] text-[#F4ECDF]/50"
        >
          <span className="text-[#F1CF8A]">{photos.length}</span> looks ·{" "}
          <span className="text-[#F1CF8A]">{categories.length - 1}</span> collections
        </motion.p>
      </div>
    </section>
  );
}

/* ---------------------------- Gallery grid ---------------------------- */

function Tile({ photo, onOpen }) {
  return (
    <motion.li
      layout
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.94, transition: { duration: 0.25 } }}
      transition={{ duration: 0.6, ease: EASE }}
      className={photo.featured ? "col-span-2 row-span-2" : ""}
    >
      <button
        type="button"
        onClick={onOpen}
        aria-label={`Open ${photo.title}`}
        className="group relative block aspect-square w-full overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#17120E] text-left outline-none transition-colors duration-500 hover:border-[#D5A653]/70 focus-visible:ring-2 focus-visible:ring-[#F1CF8A]"
      >
        <div className="absolute inset-0 transition-transform duration-1000 ease-out group-hover:scale-[1.07]">
          <Img src={photo.src} size={photo.featured ? 1100 : 640} alt={`${photo.title} by Aara Makeovers`} label={photo.title} />
        </div>

        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-t from-[#0E0B09]/90 via-[#0E0B09]/20 to-transparent transition-opacity duration-500 lg:opacity-0 lg:group-hover:opacity-100"
        />

        <span
          aria-hidden="true"
          className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-[#D5A653]/60 bg-[#0E0B09]/60 text-[#F1CF8A] backdrop-blur-sm transition-all duration-500 lg:scale-75 lg:opacity-0 lg:group-hover:scale-100 lg:group-hover:opacity-100"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M12 5v14M5 12h14" />
          </svg>
        </span>

        <div className="absolute inset-x-0 bottom-0 p-4 transition-all duration-500 sm:p-5 lg:translate-y-3 lg:opacity-0 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <p className="font-body text-[10px] uppercase tracking-[0.25em] text-[#F1CF8A] sm:text-xs">{photo.category}</p>
          <p className={`mt-1 font-display leading-tight text-[#F4ECDF] ${photo.featured ? "text-2xl sm:text-4xl" : "text-lg sm:text-2xl"}`}>
            {photo.title}
          </p>
        </div>
      </button>
    </motion.li>
  );
}

/* --------------------------- Lightbox --------------------------- */
/* Steps through every photo in the current filter. */

function Lightbox({ items, index, direction, onClose, onStep, onSelect }) {
  const photo = items[index];
  const thumbs = useRef([]);

  /* Keyboard and scroll lock */
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") onStep(1);
      if (e.key === "ArrowLeft") onStep(-1);
    };
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose, onStep]);

  /* Keep the active thumbnail in view, and preload the next and previous photos */
  useEffect(() => {
    thumbs.current[index]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    [1, -1].forEach((d) => {
      const p = items[(index + d + items.length) % items.length];
      if (p) new Image().src = sized(p.src, 1400);
    });
  }, [index, items]);

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={photo.title}
      data-lenis-prevent
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] flex flex-col bg-[#0E0B09]/95 backdrop-blur-md"
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <p className="font-display text-lg italic text-[#F4ECDF]/60">
          <span className="text-[#F1CF8A]">{pad(index + 1)}</span> / {pad(items.length)}
        </p>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D5A653]/60 text-[#F1CF8A] transition-colors hover:bg-[#D5A653] hover:text-[#0E0B09]"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" aria-hidden="true">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>
      </div>

      {/* Photo */}
      <div className="relative flex min-h-0 flex-1 items-center justify-center px-4">
        <button
          type="button"
          onClick={() => onStep(-1)}
          aria-label="Previous photo"
          className="absolute left-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#D5A653]/50 bg-[#0E0B09]/60 text-[#F1CF8A] transition-colors hover:bg-[#D5A653] hover:text-[#0E0B09] sm:flex sm:left-8"
        >
          <Chevron dir="left" />
        </button>

        <div className="relative aspect-square w-[min(92vw,calc(100svh-17rem))] max-w-[760px]">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={photo.id}
              custom={direction}
              initial={{ opacity: 0, x: direction * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: direction * -60 }}
              transition={{ duration: 0.45, ease: EASE }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.5}
              onDragEnd={(_, info) => {
                if (info.offset.x < -70) onStep(1);
                else if (info.offset.x > 70) onStep(-1);
              }}
              className="absolute inset-0 cursor-grab overflow-hidden rounded-[28px] border border-[#D5A653]/40 bg-[#17120E] active:cursor-grabbing"
            >
              <Img src={photo.src} size={1400} alt={`${photo.title} by Aara Makeovers`} label={photo.title} eager />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          type="button"
          onClick={() => onStep(1)}
          aria-label="Next photo"
          className="absolute right-3 top-1/2 z-10 hidden h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-[#D5A653]/50 bg-[#0E0B09]/60 text-[#F1CF8A] transition-colors hover:bg-[#D5A653] hover:text-[#0E0B09] sm:flex sm:right-8"
        >
          <Chevron />
        </button>
      </div>

      {/* Caption + thumbnails */}
      <div className="flex flex-col items-center gap-4 px-5 pb-5 pt-4 sm:pb-7">
        <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-center">
          <p className="font-body text-xs uppercase tracking-[0.25em] text-[#F1CF8A]">{photo.category}</p>
          <p className="font-display text-2xl text-[#F4ECDF] sm:text-3xl">{photo.title}</p>
          <a
            href={enquireLink(photo.title)}
            target="_blank"
            rel="noreferrer"
            className="font-body text-sm text-[#F1CF8A] underline underline-offset-4 hover:text-[#F4ECDF]"
          >
            Enquire about this look
          </a>
        </div>

        <div className="flex max-w-full gap-2 overflow-x-auto px-1 pb-1">
          {items.map((p, i) => (
            <button
              key={p.id}
              ref={(el) => (thumbs.current[i] = el)}
              type="button"
              onClick={() => onSelect(i)}
              aria-label={`Show ${p.title}`}
              aria-current={i === index ? "true" : undefined}
              className={`h-14 w-14 flex-none overflow-hidden rounded-xl border-2 transition-all duration-300 ${
                i === index ? "border-[#D5A653] opacity-100" : "border-transparent opacity-45 hover:opacity-80"
              }`}
            >
              <Img src={p.src} size={140} alt="" label="" />
            </button>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

function GalleryGrid() {
  const [active, setActive] = useState("All");
  const [open, setOpen] = useState(null);
  const [direction, setDirection] = useState(1);

  const items = useMemo(
    () => (active === "All" ? photos : photos.filter((p) => p.category === active)),
    [active]
  );
  const changeFilter = (c) => {
    setActive(c);
    setOpen(null);
  };

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (d) => {
      setDirection(d);
      setOpen((i) => (i === null ? i : (i + d + items.length) % items.length));
    },
    [items.length]
  );
  const select = useCallback(
    (i) => {
      setDirection(open === null || i > open ? 1 : -1);
      setOpen(i);
    },
    [open]
  );

  return (
    <section id="gallery" aria-labelledby="grid-title" className="relative bg-[#0E0B09] py-24 lg:py-28">
      <div className={wrap}>
        {/* Header + filters */}
        <div className="mb-10 flex flex-col gap-8 lg:mb-14 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex flex-col gap-4">
            <Kicker>Our work</Kicker>
            <h2 id="grid-title" className="font-display text-5xl font-medium leading-[1.02] text-[#F4ECDF] sm:text-6xl">
              The <span className={goldText}>collection</span>
            </h2>
          </div>

          <LayoutGroup id="gallery-filters">
            <div role="tablist" aria-label="Filter photos" className="-mx-6 flex gap-6 overflow-x-auto px-6 pb-1 sm:gap-8 lg:mx-0 lg:px-0">
              {categories.map((c) => {
                const on = c === active;
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={on}
                    onClick={() => changeFilter(c)}
                    className={`relative flex-none pb-3 font-display text-lg transition-colors duration-300 sm:text-xl ${
                      on ? "text-[#F1CF8A]" : "text-[#F4ECDF]/55 hover:text-[#F4ECDF]"
                    }`}
                  >
                    {c}
                    <sup className="ml-1 font-body text-[10px] text-[#D5A653]">{countFor(c)}</sup>
                    {on && (
                      <motion.span
                        layoutId="gallery-tab-line"
                        className="absolute inset-x-0 bottom-0 h-px bg-[#D5A653]"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </div>

        {/* Grid */}
        <LayoutGroup id="gallery-grid">
          <motion.ul layout className="grid grid-flow-dense grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:gap-5">
            <AnimatePresence mode="popLayout">
              {items.map((p, i) => (
                <Tile key={p.id} photo={p} onOpen={() => select(i)} />
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        {/* Photo count */}
        <p className="mt-12 text-center font-body text-xs uppercase tracking-[0.25em] text-[#F4ECDF]/45">
          <span className="text-[#F1CF8A]">{items.length}</span> {items.length === 1 ? "photo" : "photos"}
          {active !== "All" && <> in {active}</>}
        </p>
      </div>

      <AnimatePresence>
        {open !== null && items[open] && (
          <Lightbox
            key="lightbox"
            items={items}
            index={open}
            direction={direction}
            onClose={close}
            onStep={step}
            onSelect={select}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

/* ------------------------------- CTA ------------------------------- */
/* Three fanned square photos above a centred invitation */

const pick = (i) => photos[i % photos.length];
const fan = [
  { photo: pick(1), rotate: -10, x: "-62%", y: "10%" },
  { photo: pick(0), rotate: 0, x: "0%", y: "0%" },
  { photo: pick(4), rotate: 10, x: "62%", y: "10%" },
];

function CTA() {
  return (
    <section
      id="book"
      aria-labelledby="cta-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden bg-gradient-to-b from-[#0E0B09] via-[#1E0A10] to-[#0E0B09] py-24"
    >
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#7A1426]/30 blur-[140px]" />

      <div className={`${wrap} flex flex-col items-center gap-10 text-center`}>
        {/* Fanned photos */}
        <div className="relative h-[clamp(150px,26svh,240px)] w-[clamp(150px,26svh,240px)]">
          {fan.map((f, i) => (
            <motion.div
              key={`${f.photo.id}-${i}`}
              initial={{ opacity: 0, x: "0%", y: "20%", rotate: 0 }}
              whileInView={{ opacity: 1, x: f.x, y: f.y, rotate: f.rotate }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 1, ease: EASE, delay: 0.1 + i * 0.1 }}
              className={`absolute inset-0 overflow-hidden rounded-[24px] border border-[#D5A653]/40 bg-[#17120E] shadow-2xl shadow-black/60 ${
                i === 1 ? "z-10" : ""
              }`}
            >
              <Img src={f.photo.src} size={500} alt="" label="" />
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1, ease: EASE, delay: 0.3 }}
          className="flex flex-col items-center gap-6"
        >
          <Kicker center>Now booking</Kicker>
          <h2
            id="cta-title"
            className="max-w-3xl font-display text-[length:clamp(2.6rem,6vw,5.5rem)] font-medium leading-[0.98] text-[#F4ECDF]"
          >
            Your look could be <span className={goldText}>the next one here.</span>
          </h2>
          <p className="max-w-lg font-body text-base leading-8 text-[#F4ECDF]/70">
            Share your date and a photo you love. We'll reply on WhatsApp to plan your trial and confirm your booking.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-6">
            <PillButton href={WHATSAPP} target="_blank" rel="noreferrer">
              Message on WhatsApp
            </PillButton>
            <a href={PHONE} className="font-body text-[#F1CF8A] underline-offset-4 hover:underline">
              Call {PHONE_DISPLAY}
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ Page ------------------------------ */

function Gallery() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip bg-[#0E0B09] font-body text-[#F4ECDF] antialiased">
        <Navbar />
        <ScrollProgress />

        <main>
          <Hero />
          <GalleryGrid />
          <CTA />
        </main>
      </div>
    </MotionConfig>
  );
}

export default Gallery;