import { useState, useEffect } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS — Warm Editorial Wellness
   Shared across all pages (App.jsx, Workshops.jsx, …)
───────────────────────────────────────────────────────────────────────────── */
export const CREAM   = "#FBF7F1";
export const CREAM2  = "#F3EBE0";
export const CREAM3  = "#E8DCCF";
export const FOREST  = "#18261C";
export const SAGE    = "#4F7358";
export const SAGE_LT = "#E8F2EA";
export const SAGE_MD = "#89AF92";
export const TERRA   = "#BF6E4E";
export const TERRA_LT= "#FAF0EB";
export const GOLD    = "#C4945A";
export const MUTED   = "#7E8C80";
export const WHITE   = "#FFFFFF";
export const BORDER  = "rgba(79,115,88,0.14)";
export const SHADOW  = "0 6px 40px rgba(24,38,28,0.09)";
export const D = "'Fraunces', Georgia, serif";   // display
export const B = "'DM Sans', system-ui, sans-serif"; // body

/* ─────────────────────────────────────────────────────────────────────────────
   NAVIGATION — single source of truth for nav + footer links
───────────────────────────────────────────────────────────────────────────── */
export const NAV_LINKS = [
  { label: "About", href: "/#about" },
  { label: "Approach", href: "/#approach" },
  { label: "Workshops", href: "/workshops" },
  { label: "Services", href: "/#services" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

/* ─────────────────────────────────────────────────────────────────────────────
   SVG ACCENTS
───────────────────────────────────────────────────────────────────────────── */
export const BotanicalRight = () => (
  <svg width="160" height="280" viewBox="0 0 160 280" fill="none" style={{ position:"absolute", top:0, right:0, opacity:0.18, pointerEvents:"none" }}>
    <path d="M80 280 C80 220 80 140 80 20" stroke={SAGE_MD} strokeWidth="1.5"/>
    <path d="M80 240 C80 240 40 210 18 185" stroke={SAGE_MD} strokeWidth="1.5"/>
    <path d="M80 190 C80 190 120 165 138 140" stroke={SAGE_MD} strokeWidth="1.5"/>
    <path d="M80 140 C80 140 42 115 28 88" stroke={SAGE_MD} strokeWidth="1.5"/>
    <path d="M80 95 C80 95 115 72 128 48" stroke={SAGE_MD} strokeWidth="1.5"/>
    <ellipse cx="18" cy="185" rx="24" ry="14" transform="rotate(-35 18 185)" fill={SAGE_LT} stroke={SAGE_MD} strokeWidth="0.8"/>
    <ellipse cx="138" cy="140" rx="24" ry="14" transform="rotate(25 138 140)" fill={SAGE_LT} stroke={SAGE_MD} strokeWidth="0.8"/>
    <ellipse cx="28" cy="88" rx="22" ry="13" transform="rotate(-45 28 88)" fill={SAGE_LT} stroke={SAGE_MD} strokeWidth="0.8"/>
    <ellipse cx="128" cy="48" rx="20" ry="12" transform="rotate(20 128 48)" fill={SAGE_LT} stroke={SAGE_MD} strokeWidth="0.8"/>
  </svg>
);

export const BotanicalLeft = () => (
  <svg width="120" height="220" viewBox="0 0 120 220" fill="none" style={{ position:"absolute", bottom:0, left:0, opacity:0.15, pointerEvents:"none", transform:"scaleX(-1)" }}>
    <path d="M60 220 C60 170 60 100 60 15" stroke={SAGE_MD} strokeWidth="1.5"/>
    <path d="M60 185 C60 185 28 160 12 138" stroke={SAGE_MD} strokeWidth="1.5"/>
    <path d="M60 140 C60 140 95 118 108 96" stroke={SAGE_MD} strokeWidth="1.5"/>
    <path d="M60 95 C60 95 32 74 20 52" stroke={SAGE_MD} strokeWidth="1.5"/>
    <ellipse cx="12" cy="138" rx="20" ry="12" transform="rotate(-32 12 138)" fill={SAGE_LT} stroke={SAGE_MD} strokeWidth="0.8"/>
    <ellipse cx="108" cy="96" rx="20" ry="12" transform="rotate(22 108 96)" fill={SAGE_LT} stroke={SAGE_MD} strokeWidth="0.8"/>
    <ellipse cx="20" cy="52" rx="18" ry="11" transform="rotate(-42 20 52)" fill={SAGE_LT} stroke={SAGE_MD} strokeWidth="0.8"/>
  </svg>
);

export const WaveDivider = ({ flip = false, fill = WHITE }) => (
  <div style={{ lineHeight: 0, overflow:"hidden", transform: flip ? "rotate(180deg)" : "none" }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", width:"100%" }}>
      <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill={fill}/>
    </svg>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────────────────────── */
export const GlobalStyle = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,400;0,9..144,500;0,9..144,600;1,9..144,300;1,9..144,400;1,9..144,500&family=DM+Sans:wght@300;400;500;600&display=swap');

    *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
    html { scroll-behavior: smooth; }
    body {
      font-family: ${B};
      background: ${CREAM};
      color: ${FOREST};
      -webkit-font-smoothing: antialiased;
      overflow-x: hidden;
    }
    a { color: inherit; text-decoration: none; }
    button { cursor: pointer; font-family: inherit; border: none; }

    /* Grain overlay */
    body::after {
      content: '';
      position: fixed; inset: 0;
      background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
      opacity: 0.028;
      pointer-events: none;
      z-index: 9999;
    }

    /* Animations */
    @keyframes fadeUp {
      from { opacity: 0; transform: translateY(36px); }
      to   { opacity: 1; transform: translateY(0); }
    }
    @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
    @keyframes float {
      0%,100% { transform: translateY(0); }
      50%      { transform: translateY(-10px); }
    }
    @keyframes marqueeScroll {
      from { transform: translateX(0); }
      to   { transform: translateX(-50%); }
    }
    @keyframes breathe {
      0%,100% { transform: scale(1) rotate(0deg); }
      50%      { transform: scale(1.06) rotate(1deg); }
    }
    @keyframes underlineGrow {
      from { width: 0; }
      to   { width: 100%; }
    }
    @keyframes slideRight {
      from { opacity:0; transform:translateX(-20px); }
      to   { opacity:1; transform:translateX(0); }
    }

    .fade-up { animation: fadeUp 0.85s cubic-bezier(0.22,1,0.36,1) both; }
    .fade-in { animation: fadeIn 0.6s ease both; }

    .reveal {
      opacity: 0;
      transform: translateY(30px);
      transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
    }
    .reveal.visible { opacity: 1; transform: translateY(0); }
    .reveal-left {
      opacity: 0; transform: translateX(-30px);
      transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
    }
    .reveal-left.visible { opacity:1; transform: translateX(0); }
    .reveal-right {
      opacity: 0; transform: translateX(30px);
      transition: opacity 0.9s cubic-bezier(0.22,1,0.36,1), transform 0.9s cubic-bezier(0.22,1,0.36,1);
    }
    .reveal-right.visible { opacity:1; transform: translateX(0); }

    /* Pill badge */
    .pill {
      display: inline-flex; align-items: center; gap: 7px;
      background: ${SAGE_LT}; color: ${SAGE};
      font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
      text-transform: uppercase; padding: 6px 14px; border-radius: 100px;
      font-family: ${B};
    }
    .pill-terra {
      display: inline-flex; align-items: center; gap: 7px;
      background: ${TERRA_LT}; color: ${TERRA};
      font-size: 11px; font-weight: 600; letter-spacing: 0.1em;
      text-transform: uppercase; padding: 6px 14px; border-radius: 100px;
      font-family: ${B};
    }

    /* Buttons */
    .btn-primary {
      background: ${FOREST}; color: ${WHITE};
      padding: 14px 32px; border-radius: 100px;
      font-size: 14px; font-weight: 500; font-family: ${B};
      letter-spacing: 0.03em;
      transition: background 0.2s, transform 0.18s, box-shadow 0.2s;
      display: inline-block; cursor: pointer; border: none;
    }
    .btn-primary:hover {
      background: ${SAGE}; transform: translateY(-2px);
      box-shadow: 0 10px 28px rgba(79,115,88,0.28);
    }
    .btn-outline {
      background: transparent; color: ${FOREST};
      padding: 13px 32px; border-radius: 100px;
      font-size: 14px; font-weight: 500; font-family: ${B};
      letter-spacing: 0.03em;
      border: 1.5px solid rgba(24,38,28,0.25);
      transition: all 0.2s; display: inline-block; cursor: pointer;
    }
    .btn-outline:hover {
      border-color: ${SAGE}; color: ${SAGE};
      background: ${SAGE_LT}; transform: translateY(-2px);
    }

    /* Decorative rule */
    .rule {
      width: 40px; height: 2px;
      background: linear-gradient(90deg, ${TERRA}, ${GOLD});
      border-radius: 2px; margin: 14px 0 22px;
    }
    .rule-center { margin: 14px auto 22px; }

    /* Underline accent */
    .accent-underline {
      position: relative; display: inline-block;
    }
    .accent-underline::after {
      content: '';
      position: absolute; bottom: -4px; left: 0;
      height: 3px; width: 100%;
      background: linear-gradient(90deg, ${TERRA}, ${GOLD});
      border-radius: 2px;
    }

    /* Card */
    .card {
      background: ${WHITE}; border-radius: 20px;
      border: 1px solid ${BORDER};
      transition: transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s;
      overflow: hidden;
    }
    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 20px 48px rgba(24,38,28,0.1);
    }

    /* Nav link */
    .nav-link {
      font-size: 14px; font-weight: 400; color: ${MUTED};
      padding: 7px 14px; border-radius: 6px;
      transition: color 0.15s, background 0.15s; font-family: ${B};
    }
    .nav-link:hover { color: ${FOREST}; background: ${SAGE_LT}; }

    /* Marquee */
    .marquee-track {
      display: flex; width: max-content;
      animation: marqueeScroll 28s linear infinite;
    }
    .marquee-track:hover { animation-play-state: paused; }

    /* Section label */
    .section-label {
      font-family: ${B}; font-size: 11px; font-weight: 600;
      letter-spacing: 0.15em; text-transform: uppercase; color: ${MUTED};
    }

    /* Horizontal scroll row (workshop cards on mobile) */
    .hscroll {
      display: flex; gap: 20px; overflow-x: auto;
      scroll-snap-type: x mandatory; -webkit-overflow-scrolling: touch;
      padding-bottom: 4px;
    }
    .hscroll::-webkit-scrollbar { height: 6px; }
    .hscroll::-webkit-scrollbar-thumb { background: ${BORDER}; border-radius: 10px; }
    .hscroll > * { scroll-snap-align: start; }

    /* Mobile */
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: block !important; }
      .mobile-col { flex-direction: column !important; }
      .mobile-full { width: 100% !important; }
      .mobile-center { text-align: center !important; }
      .mobile-grid-1 { grid-template-columns: 1fr !important; }

      /* Section padding */
      .section-pad { padding: 48px 20px !important; }
      .section-pad-b0 { padding: 48px 20px 0 !important; }

      /* Hero */
      .hero-inner {
        grid-template-columns: 1fr !important;
        padding: 28px 20px 44px !important;
        gap: 0 !important;
      }

      /* EFT steps */
      .eft-step-row { grid-template-columns: 1fr !important; }
      .eft-step-row > div { order: 0 !important; }
      .eft-step-num { min-height: 80px !important; padding: 20px !important; }
      .eft-step-text { padding: 28px 24px !important; }
      .eft-benefits {
        padding: 36px 24px !important;
        flex-direction: column !important;
        flex-wrap: nowrap !important;
        gap: 24px !important;
      }

      /* Testimonials */
      .testi-card { padding: 24px 18px 20px !important; }

      /* FAQ */
      .faq-answer { padding: 0 20px 16px 20px !important; }

      /* Footer */
      .footer-grid { grid-template-columns: 1fr !important; gap: 24px !important; }

      /* Contact form */
      .form-row { grid-template-columns: 1fr !important; }

      /* Tighten internal spacing on mobile */
      .mobile-tight-mb { margin-bottom: 32px !important; }
      .imagine-grid { grid-template-columns: 1fr !important; gap: 32px !important; }
      .pricing-grid { gap: 14px !important; }
      .services-grid { gap: 14px !important; }

      /* Workshops page */
      .workshop-row { grid-template-columns: 1fr !important; }
      .stat-row { grid-template-columns: 1fr 1fr !important; row-gap: 24px !important; }
    }

    /* Accordion */
    .accordion-btn {
      width: 100%; text-align: left; background: none; border: none;
      padding: 22px 0; display: flex; justify-content: space-between;
      align-items: center; gap: 16px; cursor: pointer;
    }
    .accordion-item { border-bottom: 1px solid ${BORDER}; }
    .accordion-item:last-child { border-bottom: none; }

    /* Input focus */
    input:focus, textarea:focus, select:focus {
      outline: none;
      border-color: ${SAGE} !important;
      box-shadow: 0 0 0 3px ${SAGE_LT};
    }
  `}</style>
);

/* ─────────────────────────────────────────────────────────────────────────────
   HOOKS
───────────────────────────────────────────────────────────────────────────── */
export function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.1 }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  });
}

export function useDocumentMeta(title, description) {
  useEffect(() => {
    if (title) document.title = title;
    if (description) {
      let tag = document.querySelector('meta[name="description"]');
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute("name", "description");
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", description);
    }
  }, [title, description]);
}

/* ─────────────────────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────────────────────── */
export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
      background: scrolled ? "rgba(251,247,241,0.94)" : "transparent",
      backdropFilter: scrolled ? "blur(20px)" : "none",
      borderBottom: scrolled ? `1px solid ${BORDER}` : "1px solid transparent",
      transition: "all 0.35s ease",
    }}>
      <div style={{
        maxWidth: 1200, margin: "0 auto", padding: "0 28px",
        height: 72, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <a href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{
            width: 34, height: 34, borderRadius: "50%",
            background: `linear-gradient(145deg, ${SAGE} 0%, ${SAGE_MD} 100%)`,
            display: "flex", alignItems: "center", justifyContent: "center",
            flexShrink: 0,
          }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M12 3C9 3 5 6.5 5 11c0 5.5 7 11 7 11s7-5.5 7-11c0-4.5-4-8-7-8z" fill="white"/>
              <circle cx="12" cy="11" r="2.5" fill={SAGE}/>
            </svg>
          </div>
          <div>
            <div style={{ fontFamily: D, fontSize: 19, fontWeight: 500, color: FOREST, lineHeight: 1, letterSpacing: "-0.2px" }}>
              Healing Horizon
            </div>
            <div style={{ fontFamily: B, fontSize: 9.5, color: MUTED, letterSpacing: "0.14em", textTransform: "uppercase", marginTop: 1 }}>
              Vrinda Goel
            </div>
          </div>
        </a>

        {/* Desktop links */}
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: 2 }}>
          {NAV_LINKS.map((l, i) => (
            <a key={i} href={l.href} className="nav-link">{l.label}</a>
          ))}
        </div>

        <a href="https://cal.id/healing-horizon/discovery-call" target="_blank" rel="noopener noreferrer" className="btn-primary hide-mobile" style={{ padding: "10px 24px", fontSize: 13 }}>
          Book a Session
        </a>

        <button onClick={() => setMenuOpen(v => !v)} className="show-mobile" style={{
          background: "none", border: "none", padding: 4, cursor: "pointer",
          display: "none",
        }}>
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke={FOREST} strokeWidth="1.8">
            {menuOpen
              ? <><line x1="17" y1="5" x2="5" y2="17"/><line x1="5" y1="5" x2="17" y2="17"/></>
              : <><line x1="2" y1="7" x2="20" y2="7"/><line x1="2" y1="15" x2="20" y2="15"/></>}
          </svg>
        </button>
      </div>

      {menuOpen && (
        <div style={{ background: WHITE, borderTop: `1px solid ${BORDER}`, padding: "16px 28px 28px" }}>
          {NAV_LINKS.map((l, i) => (
            <a key={i} href={l.href} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "13px 0", fontSize: 16, color: FOREST,
              borderBottom: `1px solid ${BORDER}`, fontFamily: B,
            }}>{l.label}</a>
          ))}
          <a href="https://cal.id/healing-horizon/discovery-call" target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ marginTop: 20, textAlign: "center", display: "block" }}>
            Book a Session
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────────────────── */
export function Footer() {
  const footerLinks = NAV_LINKS.filter(l => l.label !== "Pricing");

  return (
    <footer style={{ background: FOREST, color: WHITE, padding: "68px 28px 36px" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="footer-grid" style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr", gap: 48, marginBottom: 52 }}>
          {/* Brand */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
              <div style={{
                width: 34, height: 34, borderRadius: "50%",
                background: `linear-gradient(145deg, ${SAGE} 0%, ${SAGE_MD} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 3C9 3 5 6.5 5 11c0 5.5 7 11 7 11s7-5.5 7-11c0-4.5-4-8-7-8z" fill="white"/>
                  <circle cx="12" cy="11" r="2.5" fill={SAGE}/>
                </svg>
              </div>
              <div>
                <div style={{ fontFamily: D, fontSize: 18, fontWeight: 500 }}>Healing Horizon</div>
                <div style={{ fontFamily: B, fontSize: 9.5, color: SAGE_MD, letterSpacing: "0.12em", textTransform: "uppercase" }}>with Vrinda Goel</div>
              </div>
            </div>
            <p style={{ fontFamily: B, fontSize: 14, color: "rgba(255,255,255,0.5)", lineHeight: 1.8, maxWidth: 300, fontWeight: 300, marginBottom: 20 }}>
              A compassionate space for reflection, growth, and meaningful action toward better mental health.
            </p>
            <div style={{ display: "flex", gap: 12, marginTop: 4 }}>
              <a href="https://www.instagram.com/healing_horizon_?igsh=MWNsbmdzamJyZTA5aA==" target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, borderRadius: 10,
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={SAGE_MD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill={SAGE_MD} stroke="none"/>
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/vrinda-goel09/" target="_blank" rel="noopener noreferrer" style={{
                display: "flex", alignItems: "center", justifyContent: "center",
                width: 38, height: 38, borderRadius: 10,
                background: "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)",
                transition: "background 0.2s",
              }}
                onMouseEnter={e => e.currentTarget.style.background = "rgba(255,255,255,0.16)"}
                onMouseLeave={e => e.currentTarget.style.background = "rgba(255,255,255,0.08)"}
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke={SAGE_MD} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
                  <rect x="2" y="9" width="4" height="12"/>
                  <circle cx="4" cy="4" r="2"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Navigate */}
          <div>
            <p style={{ fontFamily: B, fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>Navigate</p>
            {footerLinks.map((l, i) => (
              <a key={i} href={l.href} style={{
                display: "block", fontFamily: B, fontSize: 14, fontWeight: 300,
                color: "rgba(255,255,255,0.6)", marginBottom: 10, transition: "color 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = WHITE}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
              >{l.label}</a>
            ))}
          </div>

          {/* Services */}
          <div>
            <p style={{ fontFamily: B, fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>Services</p>
            {["EFT Tapping Sessions", "Counselling", "Free Discovery Call"].map((l, i) => (
              <a key={i} href="/#services" style={{
                display: "block", fontFamily: B, fontSize: 14, fontWeight: 300,
                color: "rgba(255,255,255,0.6)", marginBottom: 10, transition: "color 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = WHITE}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
              >{l}</a>
            ))}
          </div>
        </div>

        <div style={{
          borderTop: "1px solid rgba(255,255,255,0.07)",
          paddingTop: 24,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          flexWrap: "wrap", gap: 12,
        }}>
          <p style={{ fontFamily: B, fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>
            © 2026 Healing Horizon · Vrinda Goel. All rights reserved.
          </p>
          <p style={{ fontFamily: B, fontSize: 12, color: "rgba(255,255,255,0.3)", fontWeight: 300 }}>
            M.Sc Clinical Psychology · EFT Practitioner (EFTMRA)
          </p>
        </div>
      </div>
    </footer>
  );
}
