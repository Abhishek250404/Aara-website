
// import React, { useState } from "react";

// const navLinks = [
//   { name: "Home", href: "#home" },
//   { name: "About", href: "#about" },
//   { name: "Services", href: "#services" },
//   { name: "Gallery", href: "#gallery" },
//   { name: "Blog", href: "#blog" },
//   { name: "Contact", href: "#contact" },
// ];

// function Navbar() {
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <nav className="sticky top-0 z-50 border-b border-[#D5A653]/25 bg-[#0D0C0B]/95 text-white shadow-lg shadow-black/20 backdrop-blur-md">
//       <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3 md:px-8">

//         {/* Brand Logo */}
//         <a
//           href="#home"
//           className="group flex shrink-0 items-center"
//           onClick={() => setMenuOpen(false)}
//           aria-label="Aara Makeovers Home"
//         >
//           <img
//             src="https://res.cloudinary.com/qjezmjh9/image/upload/v1792667345/aara-removebg-preview.png"
//             alt="Aara Makeovers"
//             className="h-20 w-auto max-w-[230px] object-contain transition-transform duration-300 group-hover:scale-[1.03] md:h-24"
//           />
//         </a>

//         {/* Desktop Navigation */}
//         <div className="hidden items-center gap-7 lg:flex xl:gap-9">
//           {navLinks.map((link, index) => (
//             <a
//               key={link.name}
//               href={link.href}
//               className={`group relative py-3 font-sans text-sm tracking-wide transition-colors duration-300 hover:text-[#F3C477] ${
//                 index === 0
//                   ? "text-[#F3C477]"
//                   : "text-white/80"
//               }`}
//             >
//               {link.name}
//               <span
//                 className={`absolute bottom-1 left-0 h-px bg-gradient-to-r from-[#D5A653] to-[#F3C477] transition-all duration-300 ${
//                   index === 0
//                     ? "w-full"
//                     : "w-0 group-hover:w-full"
//                 }`}
//               />
//             </a>
//           ))}
//         </div>

//         {/* Desktop CTA */}
//         <a
//           href="#contact"
//           className="hidden items-center gap-3 rounded-full border border-[#F3C477]/70 bg-gradient-to-r from-[#F3C477] via-[#E7B765] to-[#D5A653] px-5 py-3 font-sans text-sm font-semibold text-[#17110A] shadow-md shadow-[#D5A653]/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-[#D5A653]/20 xl:px-6 lg:inline-flex"
//         >
//           Check Your Date
//           <span className="text-base transition-transform duration-300 group-hover:translate-x-1">
//             →
//           </span>
//         </a>

//         {/* Mobile Menu Button */}
//         <button
//           type="button"
//           onClick={() => setMenuOpen(!menuOpen)}
//           className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D5A653]/50 text-[#F3C477] transition-colors hover:bg-[#D5A653]/10 lg:hidden"
//           aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
//           aria-expanded={menuOpen}
//         >
//           {menuOpen ? (
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.7"
//               className="h-6 w-6"
//             >
//               <path d="M6 6l12 12M18 6L6 18" />
//             </svg>
//           ) : (
//             <svg
//               viewBox="0 0 24 24"
//               fill="none"
//               stroke="currentColor"
//               strokeWidth="1.7"
//               className="h-6 w-6"
//             >
//               <path d="M4 7h16M4 12h16M4 17h16" />
//             </svg>
//           )}
//         </button>
//       </div>

//       {/* Mobile Navigation */}
//       {menuOpen && (
//         <div className="border-t border-[#D5A653]/20 bg-[#11100E] px-6 pb-6 pt-3 lg:hidden">
//           <div className="mx-auto flex max-w-7xl flex-col">
//             {navLinks.map((link) => (
//               <a
//                 key={link.name}
//                 href={link.href}
//                 onClick={() => setMenuOpen(false)}
//                 className="border-b border-white/[0.07] py-4 font-sans text-sm tracking-wide text-white/85 transition-colors hover:text-[#F3C477]"
//               >
//                 {link.name}
//               </a>
//             ))}

//             <a
//               href="#contact"
//               onClick={() => setMenuOpen(false)}
//               className="mt-5 flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-[#F3C477] to-[#D5A653] px-5 py-3.5 font-sans text-sm font-semibold text-[#17110A] transition-transform hover:scale-[1.02]"
//             >
//               Check Your Date <span>→</span>
//             </a>
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// }

// export default Navbar;
import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LOGO_URL =
  "https://res.cloudinary.com/qjezmjh9/image/upload/v1792667345/aara-removebg-preview.png";

const navLinks = [
  { name: "Home", id: "home", href: "/home" },
  { name: "About", id: "about", href: "/about" },
  { name: "Services", id: "services", href: "/service" },
  { name: "Gallery", id: "gallery", href: "/gallery" },
  { name: "Blog", id: "blog", href: "/blog" },
  { name: "Contact", id: "contact", href: "/contact" },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("home");

  // Shrink the bar and add a shadow after scrolling.
  // At the very bottom of the page, highlight the last section.
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);

      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;

      if (atBottom) {
        const last = [...navLinks].reverse().find((l) => document.getElementById(l.id));
        if (last) setActiveId(last.id);
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link for the section currently in view.
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter(Boolean);
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  // Lock page scroll while the mobile menu is open, and close on Escape.
  useEffect(() => {
    if (!menuOpen) return;

    document.body.style.overflow = "hidden";
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  // Close the mobile menu if the screen grows to desktop size.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    const onChange = (e) => {
      if (e.matches) setMenuOpen(false);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const closeMenu = (id) => {
    if (id) setActiveId(id);
    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-ink/90 backdrop-blur-md transition-all duration-500 ${scrolled
          ? "border-line shadow-[0_12px_40px_-12px_rgba(0,0,0,0.7)]"
          : "border-transparent"
        }`}
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-5 transition-all duration-500 md:px-8 ${scrolled ? "py-2" : "py-4"
          }`}
      >
        {/* Brand */}
        <a href="/" onClick={() => closeMenu("")} className="group shrink-0">
          <img
            src={LOGO_URL}
            alt="Aara Makeovers"
            className={`w-auto max-w-[230px] object-contain transition-all duration-500 group-hover:scale-[1.03] ${scrolled ? "h-12 md:h-14" : "h-16 md:h-20"
              }`}
          />
        </a>

        {/* Desktop navigation */}
        <nav aria-label="Main" className="hidden items-center gap-8 xl:flex">
          {navLinks.map((link) => {
            const isActive = activeId === link.id;
            return (
              <a
                key={link.id}
                href={link.href}
                onClick={() => closeMenu(link.id)}
                aria-current={isActive ? "location" : undefined}
                className={`group relative py-2 font-sans text-[13px] font-medium uppercase tracking-[0.2em] transition-colors duration-300 ${isActive ? "text-goldlight" : "text-white/75 hover:text-goldlight"
                  }`}
              >
                {link.name}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-0.5 left-0 h-px bg-gradient-to-r from-gold to-goldlight transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"
                    }`}
                />
              </a>
            );
          })}
        </nav>

        {/* Desktop CTA */}
        <a
          href="/contact"
          onClick={() => closeMenu("contact")}
          className="group hidden items-center gap-3 rounded-full bg-gradient-to-r from-goldlight via-[#E7B765] to-gold px-6 py-3 font-sans text-[13px] font-semibold uppercase tracking-[0.14em] text-ink shadow-lg shadow-gold/10 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-gold/30 xl:inline-flex"
        >
          Check Your Date
          <span
            aria-hidden="true"
            className="text-base transition-transform duration-300 group-hover:translate-x-1"
          >
            →
          </span>
        </a>

        {/* Mobile menu toggle */}
        <button
          type="button"
          onClick={() => setMenuOpen((open) => !open)}
          aria-expanded={menuOpen}
          aria-controls="mobile-menu"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          className="grid h-11 w-11 place-items-center rounded-full border border-gold/50 text-goldlight transition-colors hover:bg-gold/10 xl:hidden"
        >
          <svg
            viewBox="0 0 24 24"
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="M6 6l12 12M18 6L6 18" />
            ) : (
              <path d="M4 7h16M4 12h16M4 17h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-line bg-ink2 xl:hidden"
          >
            <nav aria-label="Mobile" className="mx-auto flex max-w-7xl flex-col px-6 pb-8 pt-2">
              {navLinks.map((link) => {
                const isActive = activeId === link.id;
                return (
                  <a
                    key={link.id}
                    href={link.href}
                    onClick={() => closeMenu(link.id)}
                    aria-current={isActive ? "location" : undefined}
                    className={`flex items-center justify-between border-b border-white/[0.07] py-4 font-serif text-2xl transition-colors hover:text-goldlight ${isActive ? "text-goldlight" : "text-white/85"
                      }`}
                  >
                    {link.name}
                    <span aria-hidden="true" className="text-gold/70">
                      →
                    </span>
                  </a>
                );
              })}

              <a
                href="#contact"
                onClick={() => closeMenu("contact")}
                className="mt-6 flex items-center justify-center gap-3 rounded-full bg-gradient-to-r from-goldlight to-gold px-5 py-4 font-sans text-sm font-semibold uppercase tracking-[0.14em] text-ink"
              >
                Check Your Date <span aria-hidden="true">→</span>
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

export default Navbar;