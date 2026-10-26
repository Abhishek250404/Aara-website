import { useState } from "react";
import { motion } from "motion/react";

/* ==================================================================
   YOUR DETAILS: same values as the Contact page
   ================================================================== */
const BUSINESS = "Aara Makeovers";

/* Put your logo in /public and keep this path, e.g. public/logo.png.
   If the file is missing, the business name shows in gold instead. */
const LOGO_SRC = "/logo.png";

const WHATSAPP_NUMBER = "919363250028";
const PHONE_DISPLAY = "+91 93632 50028";
const INSTAGRAM_HANDLE = "your_instagram_id"; /* replace with your username, no @ */
const CITY = "Madurai, Tamil Nadu";
const MAPS_LINK = "https://maps.google.com/?cid=10337987309168706478";

/* Page links. If your site uses react-router, these still work;
   swap <a> for <Link> later if you want no page reload. */
const PAGES = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Gallery", href: "/gallery" },
  { label: "Contact", href: "/contact" },
];

const SERVICES = [
  { label: "Bridal makeup", href: "/services#bridal" },
  { label: "HD & Advanced HD", href: "/services#bridal" },
  { label: "Airbrush makeup", href: "/services#bridal" },
  { label: "Beauty makeover", href: "/services#makeover" },
  { label: "Occasion looks", href: "/services#occasion" },
  { label: "Long-wear makeup", href: "/services#long-wear" },
];

/* ------------------------------------------------------------------ */

const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE = `tel:+${WHATSAPP_NUMBER}`;
const INSTAGRAM = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;
const EASE = [0.22, 1, 0.36, 1];

const goldText =
  "italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]";

/* ------------------------------ Icons ------------------------------ */

const iconProps = {
  width: 18,
  height: 18,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.6,
  strokeLinecap: "round",
  strokeLinejoin: "round",
  "aria-hidden": true,
};

const Icon = {
  whatsapp: (
    <svg {...iconProps}>
      <path d="M3.5 20.5l1.3-4.2A8.5 8.5 0 1 1 8 19.4z" />
      <path d="M9 8.6c.2-.5.5-.6.8-.6h.5c.2 0 .4.1.5.4l.7 1.6c.1.3 0 .5-.1.7l-.5.6c.6 1.2 1.5 2.1 2.7 2.7l.6-.5c.2-.2.5-.2.7-.1l1.6.7c.3.1.4.3.4.5v.5c0 .3-.1.6-.6.8-.6.3-1.6.4-3-.3a8.6 8.6 0 0 1-3.6-3.6c-.6-1.3-.6-2.3-.2-3z" />
    </svg>
  ),
  phone: (
    <svg {...iconProps}>
      <path d="M5 4h3l1.5 4-2 1.3a11 11 0 0 0 7.2 7.2L16 14.5l4 1.5v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z" />
    </svg>
  ),
  instagram: (
    <svg {...iconProps}>
      <rect x="3.5" y="3.5" width="17" height="17" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.2" cy="6.8" r="0.6" fill="currentColor" />
    </svg>
  ),
  pin: (
    <svg {...iconProps}>
      <path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" />
      <circle cx="12" cy="9.5" r="2.5" />
    </svg>
  ),
  arrow: (
    <svg {...iconProps} width={16} height={16} strokeWidth={1.8}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  ),
  up: (
    <svg {...iconProps} width={18} height={18} strokeWidth={1.8}>
      <path d="M12 19V5M6 11l6-6 6 6" />
    </svg>
  ),
};

/* ---------------------------- Pieces ---------------------------- */

function Logo() {
  const [ok, setOk] = useState(true);
  return (
    <a href="/" aria-label={`${BUSINESS} home`} className="inline-flex items-center">
      {ok ? (
        <img
          src={LOGO_SRC}
          alt={BUSINESS}
          onError={() => setOk(false)}
          className="h-16 w-auto max-w-[220px] object-contain sm:h-20"
        />
      ) : (
        <span className="font-display text-4xl leading-none text-[#F4ECDF]">
          Aara <span className={goldText}>Makeovers</span>
        </span>
      )}
    </a>
  );
}

function ColumnTitle({ children }) {
  return <h3 className="mb-5 font-body text-xs uppercase tracking-[0.25em] text-[#F1CF8A]">{children}</h3>;
}

function FooterLink({ href, children, external = false }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="group inline-flex items-center gap-2 font-body text-[15px] text-[#F4ECDF]/65 transition-colors duration-300 hover:text-[#F1CF8A]"
    >
      <span aria-hidden="true" className="h-px w-0 bg-[#D5A653] transition-all duration-300 group-hover:w-4" />
      {children}
    </a>
  );
}

function SocialButton({ href, label, icon, external = true }) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      aria-label={label}
      className="flex h-11 w-11 items-center justify-center rounded-full border border-[#D5A653]/40 text-[#F1CF8A] transition-colors duration-300 hover:border-[#D5A653] hover:bg-[#D5A653] hover:text-[#0E0B09]"
    >
      {icon}
    </a>
  );
}

/* ------------------------------ Footer ------------------------------ */

function Footer() {
  const year = new Date().getFullYear();
  const toTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative isolate overflow-hidden border-t border-[#D5A653]/20 bg-[#0E0B09] font-body text-[#F4ECDF]">
      {/* Soft glow */}
      <div aria-hidden="true" className="pointer-events-none absolute -left-40 top-0 -z-10 h-[420px] w-[420px] rounded-full bg-[#7A1426]/20 blur-[140px]" />

      <div className="mx-auto w-full max-w-7xl px-6 md:px-10">
        {/* Call to action band */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col items-start justify-between gap-6 border-b border-[#D5A653]/15 py-14 md:flex-row md:items-center"
        >
          <p className="max-w-2xl font-display text-4xl leading-[1.05] text-[#F4ECDF] sm:text-5xl">
            Ready for your <span className={goldText}>big day?</span>
          </p>
          <a
            href="/contact"
            className="group inline-flex flex-none items-center gap-4 rounded-full bg-[#D5A653] px-7 py-3 font-body text-base text-[#0E0B09] transition-colors duration-300 hover:bg-[#F1CF8A]"
          >
            Book a trial
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0E0B09] text-[#F1CF8A] transition-transform duration-300 group-hover:rotate-45">
              {Icon.arrow}
            </span>
          </a>
        </motion.div>

        {/* Main grid: logo on the left, then three columns */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-[1.5fr_0.8fr_1fr_1.2fr] lg:gap-10">
          {/* Brand */}
          <div className="flex flex-col items-start gap-6 sm:col-span-2 lg:col-span-1">
            <Logo />
            <p className="max-w-xs font-body text-sm leading-7 text-[#F4ECDF]/60">
              Luxury bridal and occasion makeup in Madurai. Every look is planned around your skin, your outfit and
              your jewellery.
            </p>
            <div className="flex gap-3">
              <SocialButton href={WHATSAPP} label="WhatsApp" icon={Icon.whatsapp} />
              <SocialButton href={INSTAGRAM} label="Instagram" icon={Icon.instagram} />
              <SocialButton href={PHONE} label="Call" icon={Icon.phone} external={false} />
              <SocialButton href={MAPS_LINK} label="Google Maps" icon={Icon.pin} />
            </div>
          </div>

          {/* Pages */}
          <nav aria-label="Footer">
            <ColumnTitle>Explore</ColumnTitle>
            <ul className="flex flex-col gap-3">
              {PAGES.map((p) => (
                <li key={p.label}>
                  <FooterLink href={p.href}>{p.label}</FooterLink>
                </li>
              ))}
            </ul>
          </nav>

          {/* Services */}
          <div>
            <ColumnTitle>Services</ColumnTitle>
            <ul className="flex flex-col gap-3">
              {SERVICES.map((s) => (
                <li key={s.label}>
                  <FooterLink href={s.href}>{s.label}</FooterLink>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <ColumnTitle>Get in touch</ColumnTitle>
            <ul className="flex flex-col gap-4">
              <li>
                <a href={WHATSAPP} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
                  <span className="mt-0.5 text-[#D5A653]">{Icon.whatsapp}</span>
                  <span>
                    <span className="block font-body text-[11px] uppercase tracking-[0.2em] text-[#F4ECDF]/45">WhatsApp</span>
                    <span className="font-display text-lg text-[#F4ECDF] transition-colors duration-300 group-hover:text-[#F1CF8A]">
                      {PHONE_DISPLAY}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
                  <span className="mt-0.5 text-[#D5A653]">{Icon.instagram}</span>
                  <span>
                    <span className="block font-body text-[11px] uppercase tracking-[0.2em] text-[#F4ECDF]/45">Instagram</span>
                    <span className="font-display text-lg text-[#F4ECDF] transition-colors duration-300 group-hover:text-[#F1CF8A]">
                      @{INSTAGRAM_HANDLE}
                    </span>
                  </span>
                </a>
              </li>
              <li>
                <a href={MAPS_LINK} target="_blank" rel="noopener noreferrer" className="group flex items-start gap-3">
                  <span className="mt-0.5 text-[#D5A653]">{Icon.pin}</span>
                  <span>
                    <span className="block font-body text-[11px] uppercase tracking-[0.2em] text-[#F4ECDF]/45">Studio</span>
                    <span className="font-display text-lg text-[#F4ECDF] transition-colors duration-300 group-hover:text-[#F1CF8A]">
                      {CITY}
                    </span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col-reverse items-start justify-between gap-5 border-t border-[#D5A653]/15 py-7 sm:flex-row sm:items-center">
          <p className="font-body text-xs text-[#F4ECDF]/45">
            © {year} {BUSINESS}. All rights reserved.
          </p>
          <button
            type="button"
            onClick={toTop}
            className="group inline-flex items-center gap-3 font-body text-xs uppercase tracking-[0.2em] text-[#F4ECDF]/55 transition-colors duration-300 hover:text-[#F1CF8A]"
          >
            Back to top
            <span className="flex h-9 w-9 items-center justify-center rounded-full border border-[#D5A653]/40 text-[#F1CF8A] transition-transform duration-300 group-hover:-translate-y-1">
              {Icon.up}
            </span>
          </button>
        </div>
      </div>

      {/* Large outlined name along the bottom edge */}
      <div aria-hidden="true" className="pointer-events-none select-none overflow-hidden">
        <p className="-mb-[0.22em] whitespace-nowrap text-center font-display text-[length:clamp(5rem,19vw,17rem)] italic leading-none text-transparent [-webkit-text-stroke:1px_rgba(213,166,83,0.18)]">
          Aara Makeovers
        </p>
      </div>
    </footer>
  );
}

export default Footer;