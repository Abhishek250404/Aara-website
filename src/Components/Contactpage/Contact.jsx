import { useState } from "react";
import { AnimatePresence, motion, MotionConfig, useScroll, useSpring } from "motion/react";
import Navbar from "../Navbar/Navbar";

/* ==================================================================
   YOUR DETAILS: change these and the whole page updates
   ================================================================== */
const BUSINESS = "Aara Makeovers";

/* WhatsApp and phone: country code + number, no "+" or spaces */
const WHATSAPP_NUMBER = "919363250028";
const PHONE_DISPLAY = "+91 93632 50028";

/* Instagram: only the username, without @ (replace this) */
const INSTAGRAM_HANDLE = "your_instagram_id";

/* Optional email. Leave "" to hide it. */
const EMAIL = "";

/* Studio address, one line per row (add your full street address) */
const ADDRESS_LINES = ["Aara Makeovers", "Madurai, Tamil Nadu"];

/* Your Google Business listing (opens directions and reviews) */
const MAPS_LINK = "https://maps.google.com/?cid=10337987309168706478";

/* Map shown on the page. For an exact pin: open your listing in Google
   Maps, tap Share, then "Embed a map", and paste the src="…" link here. */
const MAP_EMBED = "https://maps.google.com/maps?q=Aara%20Makeovers%20Madurai&z=14&output=embed";

/* Opening hours. Leave the list empty to hide this block.
   Example: [{ days: "Mon – Sat", time: "10:00 am – 8:00 pm" }] */
const HOURS = [];

/* ------------------------------------------------------------------ */

const WHATSAPP = `https://wa.me/${WHATSAPP_NUMBER}`;
const PHONE = `tel:+${WHATSAPP_NUMBER}`;
const INSTAGRAM = `https://www.instagram.com/${INSTAGRAM_HANDLE}/`;

const OCCASIONS = ["Bridal", "Engagement", "Reception", "Party / event", "Other"];
const MAKEUP_TYPES = ["Not sure yet", "HD", "Advanced HD", "Airbrush", "Glossy / dewy", "Minimal / no-makeup look"];
const PEOPLE = ["Just me", "Me + 1–2 people", "Me + 3–5 people", "6 or more people"];

const FAQS = [
  {
    q: "How early should I book?",
    a: "Wedding dates fill up quickly in the season. Message us as soon as your date is fixed and we'll check availability for you.",
  },
  {
    q: "Can I have a trial first?",
    a: "Yes. A trial lets us plan your look around your outfit and jewellery, and fine-tune it before the big day.",
  },
  {
    q: "What should I share when I enquire?",
    a: "Your date, the venue and the occasion. Photos of your outfit, jewellery and looks you love help us plan even better.",
  },
  {
    q: "How is my booking confirmed?",
    a: "We reply on WhatsApp to talk through your look, plan your trial and confirm your date.",
  },
];

/* ----------------------- Shared style tokens ----------------------- */

const EASE = [0.22, 1, 0.36, 1];
const wrap = "mx-auto w-full max-w-7xl px-6 md:px-10";
const goldText =
  "italic text-transparent bg-clip-text bg-gradient-to-r from-[#F1CF8A] via-[#D5A653] to-[#B8862F]";

const fieldLabel = "font-body text-xs uppercase tracking-[0.2em] text-[#F1CF8A]";
const fieldBase =
  "w-full rounded-2xl border bg-[#0E0B09]/70 px-4 py-3 font-body text-base text-[#F4ECDF] outline-none transition-colors duration-300 placeholder:text-[#F4ECDF]/30 focus:border-[#D5A653] focus:ring-1 focus:ring-[#D5A653]";
const fieldOk = "border-[#D5A653]/25";
const fieldError = "border-[#C2465A]";

/* ------------------------------ Icons ------------------------------ */

const iconProps = {
  width: 22,
  height: 22,
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
  mail: (
    <svg {...iconProps}>
      <rect x="3" y="5" width="18" height="14" rx="3" />
      <path d="M4 7l8 6 8-6" />
    </svg>
  ),
  clock: (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="8.5" />
      <path d="M12 7.5V12l3 2" />
    </svg>
  ),
  arrow: (
    <svg {...iconProps} width={16} height={16} strokeWidth={1.8}>
      <path d="M7 17L17 7M9 7h8v8" />
    </svg>
  ),
  check: (
    <svg {...iconProps} width={28} height={28} strokeWidth={1.8}>
      <path d="M5 12.5l4.5 4.5L19 7.5" />
    </svg>
  ),
  chevron: (
    <svg {...iconProps} width={16} height={16} strokeWidth={1.8}>
      <path d="M6 9l6 6 6-6" />
    </svg>
  ),
};

/* ---------------------------- Helpers ---------------------------- */

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

function PillButton({ href, children, variant = "solid", target, rel, onClick, type }) {
  const solid = variant === "solid";
  const Tag = href ? "a" : "button";
  return (
    <Tag
      href={href}
      target={target}
      rel={rel}
      onClick={onClick}
      type={href ? undefined : type || "button"}
      className={`group inline-flex items-center justify-center gap-4 rounded-full px-7 py-3 font-body text-base no-underline transition-colors duration-300 ${
        solid
          ? "bg-[#D5A653] text-[#0E0B09] hover:bg-[#F1CF8A]"
          : "border border-[#D5A653]/70 text-[#F4ECDF] hover:border-[#F1CF8A] hover:text-[#F1CF8A]"
      }`}
    >
      <span>{children}</span>
      <span
        className={`flex h-9 w-9 flex-none items-center justify-center rounded-full transition-transform duration-300 group-hover:rotate-45 ${
          solid ? "bg-[#0E0B09] text-[#F1CF8A]" : "bg-[#D5A653] text-[#0E0B09]"
        }`}
      >
        {Icon.arrow}
      </span>
    </Tag>
  );
}

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

const todayISO = () => {
  const d = new Date();
  const pad = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const prettyDate = (iso) => {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  return new Date(y, m - 1, d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });
};

/* -------------------------- Enquiry form -------------------------- */
/* The form needs no server: on submit it opens WhatsApp with every
   detail already written, and the bride only has to press send. */

const emptyForm = {
  name: "",
  phone: "",
  occasion: "",
  date: "",
  venue: "",
  makeup: MAKEUP_TYPES[0],
  people: PEOPLE[0],
  message: "",
};

function validate(f) {
  const errors = {};
  if (f.name.trim().length < 2) errors.name = "Please enter your name.";
  const digits = f.phone.replace(/\D/g, "");
  if (!(digits.length === 10 || (digits.length === 12 && digits.startsWith("91")))) {
    errors.phone = "Please enter a 10-digit mobile number.";
  }
  if (!f.occasion) errors.occasion = "Please choose the occasion.";
  if (!f.date) errors.date = "Please choose your date.";
  return errors;
}

function buildMessage(f) {
  const lines = [
    `Hi ${BUSINESS}, I'd like to enquire about a booking.`,
    "",
    `Name: ${f.name.trim()}`,
    `Phone: ${f.phone.trim()}`,
    `Occasion: ${f.occasion}`,
    `Date: ${prettyDate(f.date)}`,
  ];
  if (f.venue.trim()) lines.push(`Venue / area: ${f.venue.trim()}`);
  lines.push(`Makeup: ${f.makeup}`, `People: ${f.people}`);
  if (f.message.trim()) lines.push("", `Message: ${f.message.trim()}`);
  return lines.join("\n");
}

function EnquiryForm() {
  const [form, setForm] = useState(emptyForm);
  const [errors, setErrors] = useState({});
  const [sentLink, setSentLink] = useState("");

  const set = (key) => (e) => {
    const value = e.target.value;
    setForm((f) => ({ ...f, [key]: value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: undefined }));
  };

  const submit = (e) => {
    e.preventDefault();
    const found = validate(form);
    setErrors(found);
    if (Object.keys(found).length) {
      document.getElementById(`field-${Object.keys(found)[0]}`)?.focus();
      return;
    }
    const link = `${WHATSAPP}?text=${encodeURIComponent(buildMessage(form))}`;
    window.open(link, "_blank", "noopener");
    setSentLink(link);
  };

  const errorText = (key) =>
    errors[key] ? (
      <p id={`error-${key}`} className="font-body text-xs text-[#E5899A]">
        {errors[key]}
      </p>
    ) : null;

  return (
    <div className="relative overflow-hidden rounded-[28px] border border-[#D5A653]/30 bg-[#17120E] p-6 shadow-2xl shadow-black/40 sm:p-8">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[#7A1426]/30 blur-[100px]" />

      <AnimatePresence mode="wait" initial={false}>
        {sentLink ? (
          <motion.div
            key="done"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative flex min-h-[420px] flex-col items-center justify-center gap-5 text-center"
            role="status"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-[#D5A653] text-[#0E0B09]">{Icon.check}</span>
            <h2 className="font-display text-4xl text-[#F4ECDF]">
              Almost <span className={goldText}>done.</span>
            </h2>
            <p className="max-w-sm font-body text-base leading-7 text-[#F4ECDF]/70">
              WhatsApp has opened with your details written in. Press send there and we'll reply to plan your look.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <PillButton href={sentLink} target="_blank" rel="noopener noreferrer">
                Open WhatsApp again
              </PillButton>
              <button
                type="button"
                onClick={() => setSentLink("")}
                className="font-body text-sm text-[#F1CF8A] underline underline-offset-4 hover:text-[#F4ECDF]"
              >
                Edit my details
              </button>
            </div>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            noValidate
            onSubmit={submit}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="relative flex flex-col gap-5"
            aria-label="Booking enquiry"
          >
            <div>
              <h2 className="font-display text-3xl text-[#F4ECDF] sm:text-4xl">
                Send an <span className={goldText}>enquiry</span>
              </h2>
              <p className="mt-1 font-body text-sm text-[#F4ECDF]/55">Takes a minute. We reply on WhatsApp.</p>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="field-name" className={fieldLabel}>
                  Your name *
                </label>
                <input
                  id="field-name"
                  type="text"
                  autoComplete="name"
                  placeholder="Priya"
                  value={form.name}
                  onChange={set("name")}
                  aria-invalid={Boolean(errors.name)}
                  aria-describedby={errors.name ? "error-name" : undefined}
                  className={`${fieldBase} ${errors.name ? fieldError : fieldOk}`}
                />
                {errorText("name")}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="field-phone" className={fieldLabel}>
                  Mobile number *
                </label>
                <input
                  id="field-phone"
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel"
                  placeholder="98765 43210"
                  value={form.phone}
                  onChange={set("phone")}
                  aria-invalid={Boolean(errors.phone)}
                  aria-describedby={errors.phone ? "error-phone" : undefined}
                  className={`${fieldBase} ${errors.phone ? fieldError : fieldOk}`}
                />
                {errorText("phone")}
              </div>
            </div>

            <fieldset className="flex flex-col gap-3" aria-describedby={errors.occasion ? "error-occasion" : undefined}>
              <legend className={`${fieldLabel} mb-3`}>Occasion *</legend>
              <div id="field-occasion" tabIndex={-1} className="flex flex-wrap gap-2 outline-none">
                {OCCASIONS.map((o) => (
                  <label key={o} className="cursor-pointer">
                    <input
                      type="radio"
                      name="occasion"
                      value={o}
                      checked={form.occasion === o}
                      onChange={set("occasion")}
                      className="peer sr-only"
                    />
                    <span className="inline-block rounded-full border border-[#D5A653]/35 px-4 py-2 font-body text-sm text-[#F4ECDF]/75 transition-colors duration-300 hover:border-[#D5A653] peer-checked:border-[#D5A653] peer-checked:bg-[#D5A653] peer-checked:text-[#0E0B09] peer-focus-visible:ring-2 peer-focus-visible:ring-[#F1CF8A]">
                      {o}
                    </span>
                  </label>
                ))}
              </div>
              {errorText("occasion")}
            </fieldset>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="field-date" className={fieldLabel}>
                  Event date *
                </label>
                <input
                  id="field-date"
                  type="date"
                  min={todayISO()}
                  value={form.date}
                  onChange={set("date")}
                  aria-invalid={Boolean(errors.date)}
                  aria-describedby={errors.date ? "error-date" : undefined}
                  className={`${fieldBase} [color-scheme:dark] ${errors.date ? fieldError : fieldOk}`}
                />
                {errorText("date")}
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="field-venue" className={fieldLabel}>
                  Venue or area
                </label>
                <input
                  id="field-venue"
                  type="text"
                  placeholder="Mahal name, area or city"
                  value={form.venue}
                  onChange={set("venue")}
                  className={`${fieldBase} ${fieldOk}`}
                />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="flex flex-col gap-2">
                <label htmlFor="field-makeup" className={fieldLabel}>
                  Makeup type
                </label>
                <div className="relative">
                  <select
                    id="field-makeup"
                    value={form.makeup}
                    onChange={set("makeup")}
                    className={`${fieldBase} ${fieldOk} appearance-none pr-10 [color-scheme:dark]`}
                  >
                    {MAKEUP_TYPES.map((m) => (
                      <option key={m} value={m}>
                        {m}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#F1CF8A]">{Icon.chevron}</span>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="field-people" className={fieldLabel}>
                  How many people
                </label>
                <div className="relative">
                  <select
                    id="field-people"
                    value={form.people}
                    onChange={set("people")}
                    className={`${fieldBase} ${fieldOk} appearance-none pr-10 [color-scheme:dark]`}
                  >
                    {PEOPLE.map((p) => (
                      <option key={p} value={p}>
                        {p}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[#F1CF8A]">{Icon.chevron}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="field-message" className={fieldLabel}>
                Anything else?
              </label>
              <textarea
                id="field-message"
                rows={3}
                placeholder="Outfit colour, jewellery, the look you have in mind…"
                value={form.message}
                onChange={set("message")}
                className={`${fieldBase} ${fieldOk} resize-none`}
              />
            </div>

            <div className="flex flex-col items-start gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
              <PillButton type="submit">Send on WhatsApp</PillButton>
              <p className="font-body text-xs text-[#F4ECDF]/45">Your details go only to us, through WhatsApp.</p>
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ------------------------------ Hero ------------------------------ */
/* Heading and quick contact cards on the left, the form on the right */

function ContactCard({ href, icon, label, value, external = false, delay = 0 }) {
  return (
    <motion.a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: EASE, delay }}
      className="group flex items-center gap-4 rounded-[22px] border border-[#D5A653]/20 bg-[#17120E]/70 p-4 no-underline transition-colors duration-300 hover:border-[#D5A653]/70"
    >
      <span className="flex h-12 w-12 flex-none items-center justify-center rounded-2xl border border-[#D5A653]/40 text-[#F1CF8A] transition-colors duration-300 group-hover:bg-[#D5A653] group-hover:text-[#0E0B09]">
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-body text-[11px] uppercase tracking-[0.2em] text-[#F4ECDF]/50">{label}</span>
        <span className="block truncate font-display text-lg text-[#F4ECDF]">{value}</span>
      </span>
      <span className="text-[#F1CF8A] opacity-40 transition-all duration-300 group-hover:rotate-45 group-hover:opacity-100">{Icon.arrow}</span>
    </motion.a>
  );
}

function Hero() {
  const cards = [
    { href: WHATSAPP, icon: Icon.whatsapp, label: "WhatsApp", value: PHONE_DISPLAY, external: true },
    { href: PHONE, icon: Icon.phone, label: "Call us", value: PHONE_DISPLAY },
    { href: INSTAGRAM, icon: Icon.instagram, label: "Instagram", value: `@${INSTAGRAM_HANDLE}`, external: true },
    { href: "#visit", icon: Icon.pin, label: "Studio", value: ADDRESS_LINES[ADDRESS_LINES.length - 1] },
  ];
  if (EMAIL) cards.push({ href: `mailto:${EMAIL}`, icon: Icon.mail, label: "Email", value: EMAIL });

  return (
    <section
      id="enquire"
      aria-labelledby="contact-title"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden pb-20 pt-28 lg:pb-16 lg:pt-28"
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-40 top-10 h-[520px] w-[520px] rounded-full bg-[#7A1426]/25 blur-[150px]" />
        <div className="absolute right-[-10%] top-1/3 h-[480px] w-[480px] rounded-full bg-[#D5A653]/[0.07] blur-[140px]" />
      </div>

      <div className={`${wrap} grid items-center gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16`}>
        <div className="flex flex-col gap-6">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, ease: EASE, delay: 0.1 }}>
            <Kicker>Contact {BUSINESS}</Kicker>
          </motion.div>

          <motion.h1
            id="contact-title"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, ease: EASE, delay: 0.2 }}
            className="font-display font-medium text-[length:clamp(3rem,min(6.4vw,10svh),6rem)] leading-[0.95] tracking-[-0.02em] text-[#F4ECDF]"
          >
            Let's plan <span className={goldText}>your look.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: EASE, delay: 0.4 }}
            className="max-w-md font-body text-lg font-light leading-8 text-[#F4ECDF]/70"
          >
            Tell us your date and the look you're dreaming of. Fill in the form, or reach us directly on any of these.
          </motion.p>

          <div className="grid gap-3 sm:grid-cols-2">
            {cards.map((c, i) => (
              <ContactCard key={c.label} {...c} delay={0.5 + i * 0.08} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: EASE, delay: 0.3 }}
        >
          <EnquiryForm />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------ Visit ------------------------------ */
/* Google map (tinted dark to match the site) and studio details */

function Visit() {
  return (
    <section id="visit" aria-labelledby="visit-title" className="relative flex min-h-[100svh] items-center bg-[#17120E] py-24 lg:py-16">
      <div className={`${wrap} grid items-center gap-10 lg:grid-cols-[1.25fr_0.75fr] lg:gap-14`}>
        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 1, ease: EASE }}
          className="relative order-2 lg:order-1"
        >
          <div aria-hidden="true" className="pointer-events-none absolute -inset-[7px] rounded-[35px] border border-[#D5A653]/70" />
          <div className="relative h-[min(70svh,600px)] min-h-[360px] overflow-hidden rounded-[28px] border border-[#D5A653]/20 bg-[#0E0B09]">
            <iframe
              title={`Map showing ${BUSINESS}`}
              src={MAP_EMBED}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              allowFullScreen
              className="h-full w-full border-0 [filter:invert(0.9)_hue-rotate(180deg)_saturate(0.55)_brightness(0.95)]"
            />
            <a
              href={MAPS_LINK}
              target="_blank"
              rel="noopener noreferrer"
              className="absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-[#D5A653]/60 bg-[#0E0B09]/85 px-4 py-2 font-body text-xs text-[#F1CF8A] backdrop-blur-sm transition-colors duration-300 hover:bg-[#D5A653] hover:text-[#0E0B09]"
            >
              Open in Google Maps {Icon.arrow}
            </a>
          </div>
        </motion.div>

        {/* Details */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1, ease: EASE, delay: 0.1 }}
          className="order-1 flex flex-col gap-7 lg:order-2"
        >
          <div className="flex flex-col gap-4">
            <Kicker>Visit the studio</Kicker>
            <h2 id="visit-title" className="font-display text-5xl font-medium leading-[1.02] text-[#F4ECDF] sm:text-6xl">
              Find <span className={goldText}>us</span>
            </h2>
          </div>

          <div className="flex gap-4 border-t border-[#D5A653]/20 pt-6">
            <span className="mt-1 text-[#F1CF8A]">{Icon.pin}</span>
            <address className="font-body text-base not-italic leading-7 text-[#F4ECDF]/80">
              {ADDRESS_LINES.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
          </div>

          {HOURS.length > 0 && (
            <div className="flex gap-4 border-t border-[#D5A653]/20 pt-6">
              <span className="mt-1 text-[#F1CF8A]">{Icon.clock}</span>
              <dl className="grid flex-1 grid-cols-[auto_1fr] gap-x-6 gap-y-2 font-body text-base">
                {HOURS.map((h) => (
                  <div key={h.days} className="contents">
                    <dt className="text-[#F4ECDF]/55">{h.days}</dt>
                    <dd className="text-[#F4ECDF]">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          )}

          <p className="border-t border-[#D5A653]/20 pt-6 font-body text-sm leading-7 text-[#F4ECDF]/60">
            Please message us before you visit, so we can keep time aside for you.
          </p>

          <div className="flex flex-wrap gap-4">
            <PillButton href={MAPS_LINK} target="_blank" rel="noopener noreferrer">
              Get directions
            </PillButton>
            <PillButton href={WHATSAPP} target="_blank" rel="noopener noreferrer" variant="outline">
              Message first
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------- FAQ ------------------------------- */
/* Every answer is visible; nothing to click open */

function Faq() {
  return (
    <section aria-labelledby="faq-title" className="relative flex min-h-[100svh] items-center py-24 lg:py-16">
      <div className={`${wrap} flex flex-col gap-12`}>
        <div className="flex flex-col items-center gap-4 text-center">
          <Kicker center>Good to know</Kicker>
          <h2 id="faq-title" className="font-display text-5xl font-medium leading-[1.02] text-[#F4ECDF] sm:text-6xl">
            Before you <span className={goldText}>book</span>
          </h2>
        </div>

        <ul className="grid gap-5 md:grid-cols-2">
          {FAQS.map((f, i) => (
            <motion.li
              key={f.q}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.8, ease: EASE, delay: i * 0.08 }}
              className="flex gap-5 rounded-[28px] border border-[#D5A653]/20 bg-[#17120E]/60 p-6 sm:p-8"
            >
              <span className="font-display text-2xl italic text-[#D5A653]">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <h3 className="font-display text-2xl leading-snug text-[#F4ECDF]">{f.q}</h3>
                <p className="mt-2 font-body text-sm leading-7 text-[#F4ECDF]/65">{f.a}</p>
              </div>
            </motion.li>
          ))}
        </ul>

        {/* Social band */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.9, ease: EASE }}
          className="flex flex-col items-center justify-between gap-6 rounded-[28px] border border-[#D5A653]/30 bg-gradient-to-br from-[#3A0E18] via-[#1E0C0E] to-[#17120E] p-8 text-center sm:p-10 md:flex-row md:text-left"
        >
          <div>
            <p className="font-display text-3xl text-[#F4ECDF] sm:text-4xl">
              See our latest brides on <span className={goldText}>Instagram</span>
            </p>
            <p className="mt-2 font-body text-sm text-[#F4ECDF]/60">New looks, behind the scenes and wedding-day moments.</p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <PillButton href={INSTAGRAM} target="_blank" rel="noopener noreferrer">
              @{INSTAGRAM_HANDLE}
            </PillButton>
            <PillButton href={WHATSAPP} target="_blank" rel="noopener noreferrer" variant="outline">
              WhatsApp us
            </PillButton>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------ Floating WhatsApp ------------------------ */

function FloatingWhatsApp() {
  return (
    <motion.a
      href={WHATSAPP}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      initial={{ opacity: 0, scale: 0.6 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: 1.2 }}
      whileHover={{ scale: 1.08 }}
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#D5A653] text-[#0E0B09] shadow-xl shadow-black/50 sm:bottom-8 sm:right-8"
    >
      <span aria-hidden="true" className="absolute inset-0 animate-ping rounded-full bg-[#D5A653]/40" />
      <span className="relative">{Icon.whatsapp}</span>
    </motion.a>
  );
}

/* ------------------------------ Page ------------------------------ */

function Contact() {
  return (
    <MotionConfig reducedMotion="user">
      <div className="overflow-x-clip bg-[#0E0B09] font-body text-[#F4ECDF] antialiased">
        <Navbar />
        <ScrollProgress />

        <main>
          <Hero />
          <Visit />
          <Faq />
        </main>

        <FloatingWhatsApp />
      </div>
    </MotionConfig>
  );
}

export default Contact;