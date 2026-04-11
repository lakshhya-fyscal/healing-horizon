import { useState, useEffect, useRef } from "react";

/* ─────────────────────────────────────────────────────────────────────────────
   DESIGN TOKENS — Warm Editorial Wellness
───────────────────────────────────────────────────────────────────────────── */
const CREAM   = "#FBF7F1";
const CREAM2  = "#F3EBE0";
const CREAM3  = "#E8DCCF";
const FOREST  = "#18261C";
const SAGE    = "#4F7358";
const SAGE_LT = "#E8F2EA";
const SAGE_MD = "#89AF92";
const TERRA   = "#BF6E4E";
const TERRA_LT= "#FAF0EB";
const GOLD    = "#C4945A";
const MUTED   = "#7E8C80";
const WHITE   = "#FFFFFF";
const BORDER  = "rgba(79,115,88,0.14)";
const SHADOW  = "0 6px 40px rgba(24,38,28,0.09)";
const D = "'Fraunces', Georgia, serif";   // display
const B = "'DM Sans', system-ui, sans-serif"; // body

/* ─────────────────────────────────────────────────────────────────────────────
   SVG ACCENTS
───────────────────────────────────────────────────────────────────────────── */
const BotanicalRight = () => (
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

const BotanicalLeft = () => (
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

const WaveDivider = ({ flip = false, fill = WHITE }) => (
  <div style={{ lineHeight: 0, overflow:"hidden", transform: flip ? "rotate(180deg)" : "none" }}>
    <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" style={{ display:"block", width:"100%" }}>
      <path d="M0,30 C240,60 480,0 720,30 C960,60 1200,0 1440,30 L1440,60 L0,60 Z" fill={fill}/>
    </svg>
  </div>
);

/* ─────────────────────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────────────────────── */
const GlobalStyle = () => (
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

    /* Mobile */
    @media (max-width: 768px) {
      .hide-mobile { display: none !important; }
      .show-mobile { display: block !important; }
      .mobile-col { flex-direction: column !important; }
      .mobile-full { width: 100% !important; }
      .mobile-center { text-align: center !important; }
      .mobile-grid-1 { grid-template-columns: 1fr !important; }

      /* Section padding */
      .section-pad { padding: 72px 20px !important; }
      .section-pad-b0 { padding: 72px 20px 0 !important; }

      /* Hero */
      .hero-inner {
        grid-template-columns: 1fr !important;
        padding: 40px 20px 60px !important;
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
      .testi-card { padding: 28px 20px 24px !important; }

      /* FAQ */
      .faq-answer { padding: 0 20px 20px 20px !important; }

      /* Footer */
      .footer-grid { grid-template-columns: 1fr !important; gap: 32px !important; }

      /* Contact form */
      .form-row { grid-template-columns: 1fr !important; }
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
function useReveal() {
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

/* ─────────────────────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["About", "Approach", "Services", "Pricing", "FAQ", "Contact"];

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
        <a href="#" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
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
          {links.map((l, i) => (
            <a key={i} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>
          ))}
        </div>

        <a href="#contact" className="btn-primary hide-mobile" style={{ padding: "10px 24px", fontSize: 13 }}>
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
          {links.map((l, i) => (
            <a key={i} href={`#${l.toLowerCase()}`} onClick={() => setMenuOpen(false)} style={{
              display: "block", padding: "13px 0", fontSize: 16, color: FOREST,
              borderBottom: `1px solid ${BORDER}`, fontFamily: B,
            }}>{l}</a>
          ))}
          <a href="#contact" className="btn-primary" style={{ marginTop: 20, textAlign: "center", display: "block" }}>
            Book a Session
          </a>
        </div>
      )}
    </nav>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section style={{
      minHeight: "100vh", position: "relative",
      display: "flex", alignItems: "center",
      overflow: "hidden", paddingTop: 72,
      background: `linear-gradient(155deg, ${CREAM} 0%, ${CREAM2} 55%, ${CREAM3} 100%)`,
    }}>
      {/* Botanical accents */}
      <div style={{ position: "absolute", top: 60, right: 0, pointerEvents: "none", zIndex: 0 }}>
        <BotanicalRight />
      </div>
      <div style={{ position: "absolute", bottom: 80, left: 0, pointerEvents: "none", zIndex: 0 }}>
        <BotanicalLeft />
      </div>

      {/* Large decorative text watermark */}
      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: D, fontSize: "clamp(140px, 22vw, 280px)",
        fontWeight: 300, color: "rgba(79,115,88,0.04)",
        letterSpacing: "-8px", lineHeight: 1,
        pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap",
        zIndex: 0,
      }}>Heal</div>

      <div className="hero-inner" style={{
        maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1,
        padding: "60px 28px 80px",
        display: "grid", gridTemplateColumns: "1.1fr 0.9fr",
        gap: 64, alignItems: "center",
      }}>
        {/* LEFT */}
        <div>
          <div className="pill fade-in" style={{ marginBottom: 28 }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill={SAGE}>
              <path d="M5 0 C7 2 8 4 5 10 C2 4 3 2 5 0Z"/>
            </svg>
            EFT · CBT · Mindfulness · Trauma-Informed
          </div>

          <h1 className="fade-up" style={{
            fontFamily: D, fontWeight: 400, lineHeight: 1.08,
            fontSize: "clamp(46px, 5.8vw, 76px)",
            color: FOREST, letterSpacing: "-1.5px",
            marginBottom: 26,
          }}>
            A space to{" "}
            <span style={{ fontStyle: "italic", color: SAGE, fontWeight: 300 }}>reflect</span>
            ,<br/>heal &{" "}
            <span className="accent-underline" style={{ fontStyle: "italic", color: TERRA, fontWeight: 300 }}>grow</span>
          </h1>

          <p className="fade-up" style={{
            fontFamily: B, fontSize: 17, color: MUTED, lineHeight: 1.78,
            maxWidth: 460, marginBottom: 38, animationDelay: "0.12s",
            fontWeight: 300,
          }}>
            I am Vrinda — EFT Practitioner & Counselling Psychologist. If you've been carrying something heavy for a while, wondering if it'll ever actually shift, I want you to know: it can. I help people untangle what's keeping them stuck.
          </p>

          <div className="fade-up" style={{ display: "flex", gap: 12, flexWrap: "wrap", animationDelay: "0.22s" }}>
            <a href="#contact" className="btn-primary">Book a Free Consultation</a>
            <a href="#about" className="btn-outline">Meet Vrinda</a>
          </div>

          {/* Stats row */}
          <div className="fade-up" style={{
            display: "flex", gap: 0, marginTop: 52, animationDelay: "0.32s",
            borderTop: `1px solid ${BORDER}`, paddingTop: 28,
          }}>
            {[
              { n: "M.Sc", label: "Clinical Psychology, Southampton" },
              { n: "EFT", label: "Practitioner, EFTMRA" },
              { n: "CBT", label: "Mindfulness · Trauma-Informed" },
            ].map((s, i) => (
              <div key={i} style={{
                flex: 1, paddingRight: 24,
                borderRight: i < 2 ? `1px solid ${BORDER}` : "none",
                marginRight: i < 2 ? 24 : 0,
              }}>
                <div style={{ fontFamily: D, fontSize: 28, fontWeight: 500, color: FOREST, lineHeight: 1, letterSpacing: "-0.5px" }}>{s.n}</div>
                <div style={{ fontFamily: B, fontSize: 12, color: MUTED, marginTop: 4 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div className="hide-mobile fade-in" style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          position: "relative", animationDelay: "0.1s",
        }}>
          {/* Dashed circle ring behind photo */}
          <div style={{
            position: "absolute",
            width: 400, height: 400,
            borderRadius: "50%",
            border: `1.5px dashed ${SAGE_MD}`,
            opacity: 0.4,
            animation: "breathe 9s ease-in-out infinite",
          }} />
          {/* Solid outer ring */}
          <div style={{
            position: "absolute",
            width: 340, height: 480,
            borderRadius: 28,
            border: `1px solid rgba(79,115,88,0.18)`,
            transform: "rotate(3deg)",
          }} />

          {/* Photo card */}
          <div style={{
            width: 320, height: 460,
            borderRadius: 24,
            overflow: "hidden",
            position: "relative",
            boxShadow: "0 28px 72px rgba(24,38,28,0.16)",
            border: `1px solid ${BORDER}`,
            animation: "float 7s ease-in-out infinite",
          }}>
            <img
              src="/vrinda.jpeg"
              alt="Vrinda Goel"
              style={{
                width: "100%", height: "100%",
                objectFit: "cover", objectPosition: "center top",
                display: "block",
              }}
            />
            {/* Gradient name overlay */}
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, rgba(24,38,28,0.85) 0%, rgba(24,38,28,0.3) 50%, transparent 100%)",
              padding: "44px 22px 22px",
            }}>
              <div style={{ fontFamily: D, fontSize: 21, fontWeight: 500, color: WHITE, letterSpacing: "-0.3px" }}>Vrinda Goel</div>
              <div style={{ fontFamily: B, fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>EFT Practitioner · Counselling Psychologist</div>
            </div>
          </div>

          {/* Floating badge 1 — Approach */}
          <div style={{
            position: "absolute", top: 20, right: -10,
            background: WHITE, borderRadius: 14, padding: "11px 16px",
            boxShadow: "0 8px 32px rgba(24,38,28,0.12)",
            border: `1px solid ${BORDER}`,
            animation: "float 5s ease-in-out infinite 0.8s",
          }}>
            <div style={{ fontFamily: B, fontSize: 10, color: MUTED, letterSpacing: "0.1em", textTransform: "uppercase" }}>Approach</div>
            <div style={{ fontFamily: B, fontSize: 13, fontWeight: 600, color: FOREST, marginTop: 2 }}>Trauma-Informed</div>
          </div>

          {/* Floating badge 2 — Grow (above name overlay) */}
          <div style={{
            position: "absolute", bottom: 108, left: -24,
            background: WHITE, borderRadius: 14, padding: "11px 16px",
            boxShadow: "0 8px 32px rgba(24,38,28,0.12)",
            border: `1px solid ${BORDER}`,
            animation: "float 6s ease-in-out infinite 2s",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 18 }}>🌱</span>
            <div style={{ fontFamily: B, fontSize: 13, fontWeight: 600, color: FOREST }}>Grow at your pace</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: "absolute", bottom: 32, left: "50%", transform: "translateX(-50%)",
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
        opacity: 0.4,
      }}>
        <div style={{ fontFamily: B, fontSize: 10, letterSpacing: "0.15em", textTransform: "uppercase", color: MUTED }}>Scroll</div>
        <div style={{
          width: 1, height: 36,
          background: `linear-gradient(to bottom, ${SAGE}, transparent)`,
        }} />
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MARQUEE STRIP
───────────────────────────────────────────────────────────────────────────── */
function MarqueeStrip() {
  const items = ["Anxiety Relief", "Trauma Healing", "EFT Tapping", "Inner Peace", "Counselling", "Self-Discovery", "Emotional Freedom", "Growth", "Clarity", "Resilience"];
  const doubled = [...items, ...items];

  return (
    <div style={{
      background: FOREST, overflow: "hidden",
      padding: "16px 0", borderTop: `1px solid rgba(255,255,255,0.04)`,
    }}>
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} style={{
            fontFamily: D, fontSize: 16, fontWeight: 300, fontStyle: "italic",
            color: "rgba(255,255,255,0.7)", padding: "0 28px", whiteSpace: "nowrap",
          }}>
            {item}
            <span style={{ marginLeft: 28, color: SAGE_MD, fontStyle: "normal", fontSize: 12 }}>✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   ABOUT
───────────────────────────────────────────────────────────────────────────── */
function About() {
  return (
    <section id="about" className="section-pad" style={{ padding: "110px 28px", background: WHITE, position: "relative", overflow: "hidden" }}>
      {/* Background text watermark */}
      <div style={{
        position: "absolute", top: "50%", right: -40, transform: "translateY(-50%)",
        fontFamily: D, fontSize: 240, fontWeight: 300, color: "rgba(79,115,88,0.04)",
        lineHeight: 1, pointerEvents: "none", userSelect: "none",
        letterSpacing: -8,
      }}>Grow</div>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="mobile-grid-1">

          {/* LEFT: Quote card */}
          <div className="reveal-left">
            <div style={{
              background: `linear-gradient(145deg, ${CREAM} 0%, ${CREAM2} 100%)`,
              borderRadius: 28, padding: "44px 40px 80px",
              border: `1px solid ${BORDER}`,
              position: "relative", overflow: "visible",
            }}>
              <div style={{ position:"absolute", inset:0, borderRadius:28, overflow:"hidden", pointerEvents:"none" }}>
                <BotanicalLeft />
              </div>
              {/* Giant decorative quote */}
              <div style={{
                fontFamily: D, fontSize: 120, lineHeight: 0.7, color: SAGE_LT,
                marginBottom: 16, fontWeight: 600,
              }}>"</div>

              <blockquote style={{
                fontFamily: D, fontSize: "clamp(20px, 2.2vw, 26px)",
                fontWeight: 300, fontStyle: "italic",
                color: FOREST, lineHeight: 1.55,
                borderLeft: `3px solid ${TERRA}`,
                paddingLeft: 22, marginBottom: 32,
              }}>
                The shift I see most often isn't dramatic. It's the session where someone says — 'I actually feel okay today.'
              </blockquote>

              <div style={{ display: "flex", flexDirection: "column", gap: 13 }}>
                {[
                  { icon: "💪", text: "Empowerment — you lead the way" },
                  { icon: "🌍", text: "Inclusivity — a space for everyone" },
                  { icon: "🧘", text: "Mindfulness & present-moment awareness" },
                  { icon: "🤝", text: "Trauma-informed, non-judgmental care" },
                ].map((item, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <span style={{ fontSize: 16 }}>{item.icon}</span>
                    <span style={{ fontFamily: B, fontSize: 14, color: MUTED }}>{item.text}</span>
                  </div>
                ))}
              </div>

              {/* Credential tag */}
              <div style={{
                position: "absolute", bottom: -1, right: -1,
                background: FOREST, borderRadius: "28px 0 28px 0",
                padding: "12px 20px",
              }}>
                <div style={{ fontFamily: B, fontSize: 10, color: "rgba(255,255,255,0.5)", textTransform: "uppercase", letterSpacing: "0.1em" }}>Qualified in</div>
                <div style={{ fontFamily: B, fontSize: 13, fontWeight: 600, color: WHITE, marginTop: 2 }}>M.Sc Clinical Psychology · EFT Practitioner</div>
              </div>
            </div>
          </div>

          {/* RIGHT: Bio */}
          <div className="reveal-right">
            <span className="section-label">About</span>
            <div className="rule" />
            <h2 style={{
              fontFamily: D, fontSize: "clamp(30px, 3.5vw, 48px)",
              fontWeight: 400, color: FOREST, lineHeight: 1.15,
              marginBottom: 22, letterSpacing: "-0.5px",
            }}>
              Compassionate support for your{" "}
              <em style={{ fontStyle: "italic", color: SAGE }}>mental wellness</em>{" "}journey
            </h2>

            <p style={{ fontFamily: B, fontSize: 16, color: MUTED, lineHeight: 1.82, marginBottom: 16, fontWeight: 300 }}>
              I am <strong style={{ color: FOREST, fontWeight: 500 }}>Vrinda Goel</strong> — an EFT Practitioner and Clinical
              Psychologist holding an <strong style={{ color: FOREST, fontWeight: 500 }}>M.Sc in Clinical Psychology from the
              University of Southampton</strong> and a B.A. (Hons) in Applied Psychology from Amity University. I am also a
              certified practitioner through the <strong style={{ color: FOREST, fontWeight: 500 }}>EFT & Matrix Reimprinting
              Academy (EFTMRA)</strong>.
            </p>
            <p style={{ fontFamily: B, fontSize: 16, color: MUTED, lineHeight: 1.82, marginBottom: 16, fontWeight: 300 }}>
              My practice is guided by two core values: <strong style={{ color: FOREST, fontWeight: 500 }}>Empowerment</strong> and{" "}
              <strong style={{ color: FOREST, fontWeight: 500 }}>Inclusivity</strong>. I believe every person deserves a space where
              they feel seen, heard, and capable of change — regardless of background or identity.
            </p>
            <p style={{ fontFamily: B, fontSize: 16, color: MUTED, lineHeight: 1.82, marginBottom: 36, fontWeight: 300 }}>
              Drawing on <strong style={{ color: FOREST, fontWeight: 500 }}>EFT, Mindfulness, CBT, and a trauma-informed
              approach</strong>, I tailor every session to your unique needs — because no two journeys are the same.
            </p>
            <a href="#contact" className="btn-primary">Work with Me</a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WHAT IS EFT
───────────────────────────────────────────────────────────────────────────── */
const EFT_STEPS = [
  { n: "01", title: "Identify the Issue", desc: "We begin by naming what you're experiencing — a feeling, a memory, a belief. There's no rush; this is your space." },
  { n: "02", title: "Acknowledge & Accept", desc: "EFT begins with a setup phrase that acknowledges the problem while affirming deep self-acceptance — a powerful foundation." },
  { n: "03", title: "Tap the Meridian Points", desc: "Gently tapping on specific acupressure points while focusing on the issue calms the nervous system and shifts emotional charge." },
  { n: "04", title: "Release & Integrate", desc: "As emotional intensity decreases, you gain clarity, calm, and new perspectives — creating lasting, embodied change." },
];

function WhatIsEFT() {
  return (
    <section id="approach" className="section-pad-b0" style={{ padding: "110px 28px 0", background: CREAM, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 72 }}>
          <span className="section-label reveal">The Method</span>
          <div className="rule rule-center reveal" />
          <h2 className="reveal" style={{
            fontFamily: D, fontSize: "clamp(32px, 4.5vw, 58px)",
            fontWeight: 400, color: FOREST, lineHeight: 1.1,
            letterSpacing: "-1px", marginBottom: 18,
          }}>
            What is <em style={{ fontStyle: "italic", color: SAGE }}>EFT Tapping</em>?
          </h2>
          <p className="reveal" style={{
            fontFamily: B, fontSize: 17, color: MUTED, lineHeight: 1.8,
            maxWidth: 580, margin: "0 auto", fontWeight: 300,
          }}>
            Emotional Freedom Techniques — a research-backed, mind-body healing tool that combines
            cognitive therapy with acupressure to resolve emotional and psychological challenges.
          </p>
        </div>

        {/* Steps — stacked with giant number backgrounds */}
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {EFT_STEPS.map((s, i) => (
            <div key={i} className={`eft-step-row ${i % 2 === 0 ? "reveal-left" : "reveal-right"}`} style={{
              display: "grid", gridTemplateColumns: i % 2 === 0 ? "1fr 1fr" : "1fr 1fr",
              gap: 0,
              background: i % 2 === 0 ? WHITE : CREAM2,
              borderRadius: i === 0 ? "20px 20px 0 0" : i === 3 ? "0 0 0 0" : "0",
              overflow: "hidden",
            }}>
              {/* Number side */}
              <div className="eft-step-num" style={{
                order: i % 2 === 0 ? 0 : 1,
                background: i % 2 === 0 ? SAGE_LT : CREAM3,
                display: "flex", alignItems: "center", justifyContent: "center",
                padding: "60px 40px", position: "relative", overflow: "hidden",
                minHeight: 200,
              }}>
                <div style={{
                  fontFamily: D, fontSize: 160, fontWeight: 600,
                  color: i % 2 === 0 ? "rgba(79,115,88,0.12)" : "rgba(196,148,90,0.1)",
                  lineHeight: 1, userSelect: "none", position: "absolute",
                  right: i % 2 === 0 ? -10 : "auto", left: i % 2 === 0 ? "auto" : -10,
                }}>{s.n}</div>
                <div style={{
                  fontFamily: D, fontSize: 72, fontWeight: 500,
                  color: i % 2 === 0 ? SAGE : GOLD,
                  opacity: 0.6, position: "relative", zIndex: 1,
                }}>{s.n}</div>
              </div>
              {/* Text side */}
              <div className="eft-step-text" style={{
                order: i % 2 === 0 ? 1 : 0,
                padding: "56px 48px",
                display: "flex", flexDirection: "column", justifyContent: "center",
              }}>
                <h3 style={{
                  fontFamily: D, fontSize: "clamp(22px, 2.2vw, 30px)",
                  fontWeight: 500, color: FOREST, marginBottom: 14, letterSpacing: "-0.3px",
                }}>{s.title}</h3>
                <p style={{ fontFamily: B, fontSize: 15, color: MUTED, lineHeight: 1.78, fontWeight: 300 }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* EFT benefits */}
        <div className="reveal eft-benefits" style={{
          background: FOREST, borderRadius: "0 0 24px 24px",
          padding: "56px 48px",
          display: "flex", flexWrap: "wrap", gap: 40,
          alignItems: "center", justifyContent: "space-between",
        }}>
          <div style={{ maxWidth: 360 }}>
            <h3 style={{ fontFamily: D, fontSize: "clamp(24px, 2.5vw, 34px)", fontWeight: 400, color: WHITE, marginBottom: 10, fontStyle: "italic" }}>
              EFT can help with
            </h3>
            <p style={{ fontFamily: B, fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.75, fontWeight: 300 }}>
              Research shows EFT is effective across a wide range of challenges — often faster than traditional therapy alone.
            </p>
          </div>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 9, flex: 1, minWidth: 280 }}>
            {["Anxiety & Stress", "Trauma & PTSD", "Phobias", "Depression", "Grief & Loss", "Self-Esteem", "Relationship Issues", "Performance Blocks", "Chronic Pain"].map((tag, i) => (
              <span key={i} style={{
                background: "rgba(255,255,255,0.08)", color: "rgba(255,255,255,0.82)",
                fontFamily: B, fontSize: 13, fontWeight: 400,
                padding: "7px 16px", borderRadius: 100,
                border: "1px solid rgba(255,255,255,0.12)",
              }}>{tag}</span>
            ))}
          </div>
        </div>
      </div>

      <WaveDivider flip={false} fill={WHITE} />
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SERVICES
───────────────────────────────────────────────────────────────────────────── */
const SERVICES = [
  {
    icon: "🫀",
    title: "EFT Tapping Sessions",
    desc: "One-on-one sessions using Emotional Freedom Techniques to process and release emotional blocks, fears, trauma, and limiting beliefs.",
    tags: ["Anxiety", "Trauma", "Stress", "Phobias"],
    duration: "60 min",
    format: "Online",
    color: SAGE_LT,
    accent: SAGE,
  },
  {
    icon: "🧠",
    title: "Counselling & Psychotherapy",
    desc: "Integrative talk therapy drawing on person-centred approaches to explore patterns, build resilience, and find direction.",
    tags: ["Depression", "Relationships", "Grief", "Life Transitions"],
    duration: "60 min",
    format: "Online",
    color: CREAM2,
    accent: GOLD,
  },
  {
    icon: "✨",
    title: "Integrative Therapy",
    desc: "A bespoke blend of EFT and counselling tailored to your specific needs — combining both modalities for deeper transformation.",
    tags: ["Complex Needs", "Long-term Support"],
    duration: "60 min",
    format: "Online",
    color: CREAM2,
    accent: FOREST,
  },
  {
    icon: "🌿",
    title: "Free Discovery Call",
    desc: "Not sure if therapy is for you, or if I am the right person? That's exactly what this call is for. No pressure — just a real conversation to understand the process.",
    tags: ["First Step", "No Commitment"],
    duration: "20 min",
    format: "Online",
    color: TERRA_LT,
    accent: TERRA,
    featured: true,
  },
];

function Services() {
  return (
    <section id="services" className="section-pad" style={{ padding: "110px 28px", background: WHITE }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ maxWidth: 560, marginBottom: 64 }}>
          <span className="section-label reveal">Services</span>
          <div className="rule reveal" />
          <h2 className="reveal" style={{
            fontFamily: D, fontSize: "clamp(30px, 4vw, 52px)",
            fontWeight: 400, color: FOREST, lineHeight: 1.12,
            letterSpacing: "-0.8px", marginBottom: 16,
          }}>
            How I can <em style={{ fontStyle: "italic", color: SAGE }}>support you</em>
          </h2>
          <p className="reveal" style={{ fontFamily: B, fontSize: 16, color: MUTED, lineHeight: 1.8, fontWeight: 300 }}>
            Every offering is crafted to meet you where you are, with care, expertise, and full presence.
          </p>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(270px, 1fr))",
          gap: 20,
        }}>
          {SERVICES.map((s, i) => (
            <div key={i} className={`card reveal`} style={{
              background: WHITE,
              border: s.featured ? `2px solid ${TERRA}` : `1px solid ${BORDER}`,
              borderRadius: 22, padding: "36px 30px",
              position: "relative", overflow: "visible",
              animationDelay: `${i * 0.08}s`,
            }}>
              {s.featured && (
                <div style={{
                  position: "absolute", top: -13, left: 26,
                  background: TERRA, color: WHITE,
                  fontFamily: B, fontSize: 10, fontWeight: 700,
                  padding: "4px 14px", borderRadius: 100,
                  letterSpacing: "0.1em", textTransform: "uppercase",
                }}>Start here</div>
              )}

              {/* Icon in pill */}
              <div style={{
                width: 52, height: 52, borderRadius: 14,
                background: s.color, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 24, marginBottom: 22,
                border: `1px solid ${BORDER}`,
              }}>{s.icon}</div>

              <h3 style={{
                fontFamily: D, fontSize: "clamp(20px, 1.8vw, 24px)",
                fontWeight: 500, color: FOREST, marginBottom: 10,
                letterSpacing: "-0.2px",
              }}>{s.title}</h3>

              <p style={{ fontFamily: B, fontSize: 14, color: MUTED, lineHeight: 1.72, marginBottom: 20, fontWeight: 300 }}>
                {s.desc}
              </p>

              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 22 }}>
                {s.tags.map((tag, j) => (
                  <span key={j} style={{
                    background: s.featured ? TERRA_LT : SAGE_LT,
                    color: s.featured ? TERRA : SAGE,
                    fontFamily: B, fontSize: 12, fontWeight: 500,
                    padding: "4px 11px", borderRadius: 100,
                  }}>{tag}</span>
                ))}
              </div>

              <div style={{
                borderTop: `1px solid ${BORDER}`, paddingTop: 18,
                display: "flex", justifyContent: "space-between",
              }}>
                <div>
                  <div style={{ fontFamily: B, fontSize: 10, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em" }}>Duration</div>
                  <div style={{ fontFamily: B, fontSize: 13, fontWeight: 600, color: FOREST, marginTop: 2 }}>{s.duration}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontFamily: B, fontSize: 10, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em" }}>Format</div>
                  <div style={{ fontFamily: B, fontSize: 13, fontWeight: 600, color: FOREST, marginTop: 2 }}>{s.format}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────────────────────────────────── */
const TESTIMONIALS = [
  {
    text: "Working with Vrinda has been truly transformative. After just a few EFT sessions, I noticed a significant shift in how I was handling my anxiety. She creates such a safe, warm space — I never felt judged, only supported.",
    name: "Priya S.",
    role: "Anxiety & Stress",
    initials: "PS",
  },
  {
    text: "I came to Vrinda feeling completely stuck after a painful breakup. Through our counselling sessions, I not only healed but rediscovered who I am. Her approach is gentle yet incredibly effective.",
    name: "Arjun M.",
    role: "Relationship Healing",
    initials: "AM",
  },
  {
    text: "The integrative approach — combining EFT with talk therapy — was exactly what I needed. I finally feel free from the weight I'd been carrying for years. Vrinda is an exceptional therapist.",
    name: "Rhea K.",
    role: "Trauma Recovery",
    initials: "RK",
  },
];

/* ─────────────────────────────────────────────────────────────────────────────
   APPROACHES
───────────────────────────────────────────────────────────────────────────── */
const APPROACHES = [
  {
    icon: "🧘",
    title: "Mindfulness",
    desc: "Cultivating present-moment awareness to observe thoughts and feelings without judgement — reducing anxiety and building emotional resilience.",
    color: SAGE_LT,
    accent: SAGE,
  },
  {
    icon: "🫀",
    title: "EFT (Tapping)",
    desc: "Combining acupressure with cognitive techniques to release emotional blocks at their root — often providing rapid, lasting relief.",
    color: CREAM2,
    accent: GOLD,
  },
  {
    icon: "🧠",
    title: "CBT",
    desc: "Identifying and reframing unhelpful thought patterns and behaviours — a structured, evidence-based approach with proven results.",
    color: CREAM2,
    accent: FOREST,
  },
  {
    icon: "🛡️",
    title: "Trauma-Informed",
    desc: "Every session centres safety, trust, and your autonomy. I work with an understanding of how trauma shapes the mind and body.",
    color: TERRA_LT,
    accent: TERRA,
  },
];

function Approaches() {
  return (
    <section className="section-pad" style={{ padding: "110px 28px", background: CREAM2, position: "relative", overflow: "hidden" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <span className="section-label reveal">How I Work</span>
          <div className="rule rule-center reveal" />
          <h2 className="reveal" style={{
            fontFamily: D, fontSize: "clamp(30px, 4vw, 52px)",
            fontWeight: 400, color: FOREST, letterSpacing: "-0.8px", lineHeight: 1.12,
            marginBottom: 16,
          }}>
            My therapeutic <em style={{ fontStyle: "italic", color: SAGE }}>approaches</em>
          </h2>
          <p className="reveal" style={{ fontFamily: B, fontSize: 16, color: MUTED, lineHeight: 1.8, maxWidth: 520, margin: "0 auto", fontWeight: 300 }}>
            I draw on multiple evidence-based modalities, weaving them together into a personalised approach that serves <em>you</em>.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {APPROACHES.map((a, i) => (
            <div key={i} className="card reveal" style={{
              background: WHITE, borderRadius: 22, padding: "34px 28px",
              border: `1px solid ${BORDER}`,
              animationDelay: `${i * 0.08}s`,
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14,
                background: a.color, display: "flex",
                alignItems: "center", justifyContent: "center",
                fontSize: 22, marginBottom: 20, border: `1px solid ${BORDER}`,
              }}>{a.icon}</div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
                <h3 style={{ fontFamily: D, fontSize: 22, fontWeight: 500, color: FOREST, letterSpacing: "-0.2px" }}>{a.title}</h3>
                <div style={{ height: 2, flex: 1, background: `linear-gradient(90deg, ${a.accent}, transparent)`, borderRadius: 2, opacity: 0.5 }} />
              </div>
              <p style={{ fontFamily: B, fontSize: 14, color: MUTED, lineHeight: 1.75, fontWeight: 300 }}>{a.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PRICING
───────────────────────────────────────────────────────────────────────────── */
function Pricing() {
  const [currency, setCurrency] = useState("INR");

  const plans = [
    {
      name: "Individual Session",
      desc: "A single 50-minute session — ideal to get started or to continue at your own pace.",
      prices: { INR: "₹5,000", USD: "$60", GBP: "£50" },
      includes: ["50-minute session", "EFT, CBT or Counselling", "Online or in-person", "Follow-up resources"],
      cta: "Book a Session",
      featured: false,
    },
    {
      name: "Bundle of 5",
      desc: "Commit to your journey with five sessions — the most effective way to create lasting change.",
      prices: { INR: "₹20,000", USD: "$211", GBP: "£200" },
      includes: ["5 × 50-minute sessions", "Full therapeutic flexibility", "Priority scheduling", "Save vs. individual rate", "Ongoing session notes"],
      cta: "Get the Bundle",
      featured: true,
      saving: { INR: "Save ₹5,000", USD: "Save $89", GBP: "Save £50" },
    },
    {
      name: "Free Discovery Call",
      desc: "Not sure if therapy is for you, or if I am the right person? That's exactly what this call is for. No pressure — just a real conversation to understand the process.",
      prices: { INR: "Free", USD: "Free", GBP: "Free" },
      includes: ["20-minute video call", "Q&A with Vrinda", "No commitment required"],
      cta: "Book Free Call",
      featured: false,
    },
  ];

  const currencies = [
    { code: "INR", label: "₹ INR" },
    { code: "USD", label: "$ USD" },
    { code: "GBP", label: "£ GBP" },
  ];

  return (
    <section id="pricing" className="section-pad" style={{ padding: "110px 28px", background: WHITE, position: "relative", overflow: "hidden" }}>
      {/* BG watermark */}
      <div style={{
        position: "absolute", top: "50%", left: "50%", transform: "translate(-50%, -50%)",
        fontFamily: D, fontSize: 240, fontWeight: 300,
        color: "rgba(79,115,88,0.03)", lineHeight: 1,
        pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", letterSpacing: -8,
      }}>Invest</div>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <span className="section-label reveal">Investment</span>
          <div className="rule rule-center reveal" />
          <h2 className="reveal" style={{
            fontFamily: D, fontSize: "clamp(30px, 4vw, 52px)",
            fontWeight: 400, color: FOREST, letterSpacing: "-0.8px", lineHeight: 1.12, marginBottom: 14,
          }}>
            Simple, <em style={{ fontStyle: "italic", color: SAGE }}>transparent</em> pricing
          </h2>
          <p className="reveal" style={{ fontFamily: B, fontSize: 16, color: MUTED, lineHeight: 1.8, maxWidth: 480, margin: "0 auto 28px", fontWeight: 300 }}>
            Investing in your mental health is one of the most meaningful things you can do for yourself.
          </p>

          {/* Currency toggle */}
          <div className="reveal" style={{
            display: "inline-flex", background: CREAM2, borderRadius: 100,
            padding: 4, border: `1px solid ${BORDER}`,
          }}>
            {currencies.map(c => (
              <button key={c.code} onClick={() => setCurrency(c.code)} style={{
                padding: "8px 22px", borderRadius: 100, border: "none", cursor: "pointer",
                fontFamily: B, fontSize: 13, fontWeight: 500,
                background: currency === c.code ? FOREST : "transparent",
                color: currency === c.code ? WHITE : MUTED,
                transition: "all 0.22s",
              }}>{c.label}</button>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
          {plans.map((p, i) => (
            <div key={i} className="reveal" style={{
              borderRadius: 24, padding: "36px 32px",
              background: p.featured ? FOREST : WHITE,
              border: p.featured ? "none" : `1.5px solid ${BORDER}`,
              position: "relative", overflow: "hidden",
              transition: "transform 0.28s cubic-bezier(0.22,1,0.36,1), box-shadow 0.28s",
              animationDelay: `${i * 0.1}s`,
            }}
              onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-5px)"; e.currentTarget.style.boxShadow = p.featured ? "0 24px 60px rgba(24,38,28,0.25)" : "0 20px 48px rgba(24,38,28,0.1)"; }}
              onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {p.featured && (
                <>
                  {/* Botanical watermark on featured card */}
                  <div style={{ position:"absolute", bottom:0, right:0, opacity:0.07, pointerEvents:"none" }}>
                    <BotanicalRight />
                  </div>
                  <div style={{
                    position: "absolute", top: 20, right: 20,
                    background: TERRA, color: WHITE,
                    fontFamily: B, fontSize: 10, fontWeight: 700,
                    padding: "4px 12px", borderRadius: 100, letterSpacing: "0.1em", textTransform: "uppercase",
                  }}>Most Popular</div>
                </>
              )}

              <p style={{ fontFamily: B, fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: p.featured ? SAGE_MD : MUTED, marginBottom: 10 }}>{p.name}</p>

              {/* Price */}
              <div style={{ marginBottom: 6 }}>
                <span style={{
                  fontFamily: D, fontSize: 52, fontWeight: 500, letterSpacing: "-2px",
                  color: p.featured ? WHITE : FOREST, lineHeight: 1,
                }}>
                  {p.prices[currency] === "Free" ? (
                    <em style={{ fontStyle: "italic" }}>Free</em>
                  ) : p.prices[currency]}
                </span>
                {p.prices[currency] !== "Free" && (
                  <span style={{ fontFamily: B, fontSize: 13, color: p.featured ? "rgba(255,255,255,0.5)" : MUTED, marginLeft: 6 }}>/ session</span>
                )}
              </div>

              {p.saving && (
                <div style={{
                  display: "inline-flex", alignItems: "center", gap: 5,
                  background: "rgba(196,148,90,0.15)", color: GOLD,
                  fontFamily: B, fontSize: 12, fontWeight: 600,
                  padding: "4px 12px", borderRadius: 100, marginBottom: 14,
                }}>{p.saving[currency]}</div>
              )}

              <p style={{ fontFamily: B, fontSize: 14, color: p.featured ? "rgba(255,255,255,0.6)" : MUTED, lineHeight: 1.7, marginBottom: 24, fontWeight: 300 }}>
                {p.desc}
              </p>

              <div style={{ marginBottom: 28, display: "flex", flexDirection: "column", gap: 10 }}>
                {p.includes.map((item, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "center", gap: 10 }}>
                    <div style={{
                      width: 18, height: 18, borderRadius: "50%", flexShrink: 0,
                      background: p.featured ? "rgba(255,255,255,0.1)" : SAGE_LT,
                      display: "flex", alignItems: "center", justifyContent: "center",
                    }}>
                      <svg width="8" height="8" viewBox="0 0 8 8" fill="none">
                        <path d="M1.5 4L3 5.5L6.5 2" stroke={p.featured ? SAGE_MD : SAGE} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                    <span style={{ fontFamily: B, fontSize: 13, color: p.featured ? "rgba(255,255,255,0.8)" : FOREST, fontWeight: 300 }}>{item}</span>
                  </div>
                ))}
              </div>

              <a href="#contact" style={{
                display: "block", textAlign: "center",
                padding: "13px 24px", borderRadius: 100,
                fontFamily: B, fontSize: 14, fontWeight: 500, cursor: "pointer",
                background: p.featured ? WHITE : "transparent",
                color: p.featured ? FOREST : SAGE,
                border: p.featured ? "none" : `1.5px solid ${BORDER}`,
                transition: "all 0.2s",
              }}
                onMouseEnter={e => {
                  if (!p.featured) { e.currentTarget.style.borderColor = SAGE; e.currentTarget.style.background = SAGE_LT; }
                  else { e.currentTarget.style.background = CREAM; }
                }}
                onMouseLeave={e => {
                  if (!p.featured) { e.currentTarget.style.borderColor = BORDER; e.currentTarget.style.background = "transparent"; }
                  else { e.currentTarget.style.background = WHITE; }
                }}
              >{p.cta} →</a>
            </div>
          ))}
        </div>

        <p className="reveal" style={{ fontFamily: B, fontSize: 13, color: MUTED, textAlign: "center", marginTop: 28, fontWeight: 300 }}>
          All prices include VAT where applicable. Bundle sessions are valid for 3 months from purchase.
        </p>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   TESTIMONIALS
───────────────────────────────────────────────────────────────────────────── */
function Testimonials() {
  const [active, setActive] = useState(0);

  return (
    <section className="section-pad" style={{
      padding: "110px 28px",
      background: FOREST, position: "relative", overflow: "hidden",
    }}>
      {/* Background decorative text */}
      <div style={{
        position: "absolute", bottom: -40, right: -20,
        fontFamily: D, fontSize: 260, fontWeight: 300,
        color: "rgba(255,255,255,0.03)", lineHeight: 1,
        pointerEvents: "none", userSelect: "none", letterSpacing: -8,
      }}>Heal</div>

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontFamily: B, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: SAGE_MD }}>
            Testimonials
          </span>
          <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${TERRA}, ${GOLD})`, borderRadius: 2, margin: "14px auto 22px" }} />
          <h2 style={{
            fontFamily: D, fontSize: "clamp(28px, 3.5vw, 48px)",
            fontWeight: 400, color: WHITE, letterSpacing: "-0.8px",
            fontStyle: "italic",
          }}>
            Voices from the journey
          </h2>
        </div>

        <div className="testi-card" style={{
          background: "rgba(255,255,255,0.05)", borderRadius: 28,
          padding: "52px 52px 44px", border: "1px solid rgba(255,255,255,0.08)",
          backdropFilter: "blur(20px)",
        }}>
          {/* Giant quote mark */}
          <div style={{
            fontFamily: D, fontSize: 100, lineHeight: 0.5,
            color: SAGE_MD, opacity: 0.4, marginBottom: 16, fontWeight: 600,
          }}>"</div>

          <p style={{
            fontFamily: D, fontSize: "clamp(18px, 2.2vw, 26px)",
            fontWeight: 300, fontStyle: "italic",
            color: "rgba(255,255,255,0.88)", lineHeight: 1.65,
            marginBottom: 36,
          }}>{TESTIMONIALS[active].text}</p>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
              <div style={{
                width: 46, height: 46, borderRadius: "50%",
                background: `linear-gradient(135deg, ${SAGE} 0%, ${SAGE_MD} 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: D, fontSize: 17, color: WHITE, fontWeight: 600,
              }}>{TESTIMONIALS[active].initials}</div>
              <div>
                <div style={{ fontFamily: B, fontWeight: 600, color: WHITE, fontSize: 15 }}>{TESTIMONIALS[active].name}</div>
                <div style={{ fontFamily: B, fontSize: 13, color: SAGE_MD }}>{TESTIMONIALS[active].role}</div>
              </div>
            </div>

            {/* Dots */}
            <div style={{ display: "flex", gap: 8 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setActive(i)} style={{
                  width: i === active ? 28 : 8, height: 8,
                  borderRadius: 100,
                  background: i === active ? SAGE_MD : "rgba(255,255,255,0.15)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.28s",
                  padding: 0,
                }} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FAQ
───────────────────────────────────────────────────────────────────────────── */
const FAQS = [
  { q: "What can I expect from my first session?", a: "Your first session is a safe space to share what's brought you here. We'll discuss your goals, explore your history at whatever pace feels comfortable, and begin building our therapeutic relationship. There's no pressure — we go at your pace." },
  { q: "How is EFT different from regular counselling?", a: "EFT (Emotional Freedom Techniques or 'tapping') works directly with the body's energy system alongside the mind. While counselling explores thoughts and feelings through conversation, EFT adds a physical element — tapping on acupressure points — which can accelerate emotional release and shift deeply held patterns more quickly." },
  { q: "How many sessions will I need?", a: "This varies greatly depending on your goals. Some people experience significant shifts in 3–5 sessions; others benefit from longer-term support. We'll discuss this together and review regularly as we progress." },
  { q: "Are sessions available online?", a: "Yes — all services are available via secure video call, making therapy accessible wherever you are. In-person sessions are also available; please enquire for location details." },
  { q: "Is everything I share confidential?", a: "Absolutely. Everything shared is held in strict confidence. The only exceptions are standard legal and ethical obligations (such as risk of serious harm), which I will always explain clearly before we begin." },
  { q: "What if I'm not sure therapy is right for me?", a: "That's completely okay. I offer a free 20-minute discovery call where you can ask questions, share a little about what you're experiencing, and see if we feel like a good fit. No commitment required." },
];

function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="section-pad" style={{ padding: "110px 28px", background: CREAM2 }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-label reveal">FAQ</span>
          <div className="rule rule-center reveal" />
          <h2 className="reveal" style={{
            fontFamily: D, fontSize: "clamp(28px, 3.5vw, 50px)",
            fontWeight: 400, color: FOREST, letterSpacing: "-0.8px",
          }}>
            Questions you might have
          </h2>
        </div>

        <div className="reveal" style={{ background: WHITE, borderRadius: 24, overflow: "hidden", border: `1px solid ${BORDER}` }}>
          {FAQS.map((f, i) => (
            <div key={i} className="accordion-item">
              <button className="accordion-btn" onClick={() => setOpen(open === i ? null : i)}
                style={{ padding: "22px 28px" }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{
                    fontFamily: D, fontSize: 13, fontStyle: "italic",
                    color: open === i ? SAGE : MUTED, fontWeight: 400, minWidth: 26,
                  }}>0{i + 1}</span>
                  <span style={{
                    fontFamily: B, fontSize: 15, fontWeight: 500,
                    color: open === i ? SAGE : FOREST,
                  }}>{f.q}</span>
                </div>
                <span style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: open === i ? SAGE_LT : CREAM2,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexShrink: 0,
                  transition: "transform 0.28s, background 0.2s",
                  transform: open === i ? "rotate(45deg)" : "rotate(0deg)",
                }}>
                  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                    <line x1="5.5" y1="1" x2="5.5" y2="10" stroke={SAGE} strokeWidth="1.8" strokeLinecap="round"/>
                    <line x1="1" y1="5.5" x2="10" y2="5.5" stroke={SAGE} strokeWidth="1.8" strokeLinecap="round"/>
                  </svg>
                </span>
              </button>
              {open === i && (
                <div className="faq-answer" style={{ padding: "0 28px 24px 68px", animation: "fadeIn 0.2s ease" }}>
                  <p style={{ fontFamily: B, fontSize: 14, color: MUTED, lineHeight: 1.78, fontWeight: 300 }}>{f.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name: "", email: "", phone: "", service: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    border: `1.5px solid ${BORDER}`, borderRadius: 12,
    fontSize: 14, color: FOREST, background: CREAM,
    fontFamily: B, outline: "none", transition: "border-color 0.2s, box-shadow 0.2s",
    fontWeight: 300,
  };

  return (
    <section id="contact" className="section-pad" style={{ padding: "110px 28px", background: WHITE, position: "relative", overflow: "hidden" }}>
      {/* BG decoration */}
      <div style={{
        position: "absolute", top: 0, right: 0, width: 400, height: 400,
        borderRadius: "0 0 0 100%",
        background: `linear-gradient(135deg, ${SAGE_LT} 0%, transparent 70%)`,
        opacity: 0.5, pointerEvents: "none",
      }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 72, alignItems: "start" }} className="mobile-grid-1">

          {/* LEFT */}
          <div className="reveal-left">
            <span className="section-label">Get in Touch</span>
            <div className="rule" />
            <h2 style={{
              fontFamily: D, fontSize: "clamp(28px, 3.5vw, 48px)",
              fontWeight: 400, color: FOREST, lineHeight: 1.12,
              letterSpacing: "-0.5px", marginBottom: 18,
            }}>
              Begin your <em style={{ fontStyle: "italic", color: SAGE }}>healing</em>{" "}journey today
            </h2>
            <p style={{ fontFamily: B, fontSize: 15, color: MUTED, lineHeight: 1.82, marginBottom: 36, fontWeight: 300 }}>
              Reaching out is the first and often the hardest step. Whether you're ready to book or simply have
              questions, I'd love to hear from you.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 36 }}>
              {[
                { icon: "📧", label: "Email", value: "vrinda@healinghorizon.com" },
                { icon: "📱", label: "Phone / WhatsApp", value: "+91 00000 00000" },
                { icon: "🕐", label: "Response Time", value: "Within 24 hours" },
                { icon: "🌐", label: "Sessions", value: "Online" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <div style={{
                    width: 42, height: 42, borderRadius: 12,
                    background: CREAM2, border: `1px solid ${BORDER}`,
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: 18, flexShrink: 0,
                  }}>{c.icon}</div>
                  <div>
                    <div style={{ fontFamily: B, fontSize: 11, color: MUTED, textTransform: "uppercase", letterSpacing: "0.1em" }}>{c.label}</div>
                    <div style={{ fontFamily: B, fontSize: 14, fontWeight: 500, color: FOREST, marginTop: 2 }}>{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{
              background: SAGE_LT, borderRadius: 16, padding: "20px 22px",
              border: `1px solid rgba(79,115,88,0.18)`,
            }}>
              <p style={{ fontFamily: B, fontSize: 13, color: SAGE, fontWeight: 600, marginBottom: 5 }}>🌿 First time?</p>
              <p style={{ fontFamily: B, fontSize: 13, color: MUTED, lineHeight: 1.68, fontWeight: 300 }}>
                Book a free 20-minute discovery call — no pressure, no commitment.
                Just a gentle conversation to see if we're a good fit.
              </p>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="reveal-right">
            {sent ? (
              <div style={{
                background: CREAM, borderRadius: 24, padding: "64px 40px",
                textAlign: "center", border: `1px solid ${BORDER}`,
              }}>
                <div style={{ fontSize: 52, marginBottom: 20 }}>🌱</div>
                <h3 style={{ fontFamily: D, fontSize: 32, fontWeight: 400, color: FOREST, marginBottom: 12, letterSpacing: "-0.5px" }}>
                  Thank you, {form.name || "friend"}
                </h3>
                <p style={{ fontFamily: B, fontSize: 15, color: MUTED, lineHeight: 1.75, fontWeight: 300 }}>
                  Your message has been received. I'll be in touch within 24 hours.
                  Take a breath — you've taken a beautiful step.
                </p>
              </div>
            ) : (
              <form
                name="contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={async e => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data).toString() });
                  setSent(true);
                }}
                style={{ background: CREAM, borderRadius: 24, padding: "40px", border: `1px solid ${BORDER}` }}
              >
                <input type="hidden" name="form-name" value="contact" />
                <p style={{ display: "none" }}><input name="bot-field" /></p>
                <h3 style={{ fontFamily: D, fontSize: 28, fontWeight: 400, color: FOREST, marginBottom: 28, letterSpacing: "-0.3px" }}>
                  Book a Session
                </h3>

                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  {[
                    { name: "name", label: "Full Name", placeholder: "Your name", type: "text" },
                    { name: "email", label: "Email", placeholder: "your@email.com", type: "email" },
                  ].map(f => (
                    <div key={f.name}>
                      <label style={{ display: "block", fontFamily: B, fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 7, letterSpacing: "0.04em" }}>{f.label}</label>
                      <input type={f.type} name={f.name} placeholder={f.placeholder} required
                        value={form[f.name]}
                        onChange={e => setForm(v => ({ ...v, [f.name]: e.target.value }))}
                        style={inputStyle}
                      />
                    </div>
                  ))}
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontFamily: B, fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 7, letterSpacing: "0.04em" }}>Phone / WhatsApp <span style={{ color: MUTED, fontWeight: 400 }}>(optional)</span></label>
                  <input type="tel" name="phone" placeholder="+91 ..."
                    value={form.phone}
                    onChange={e => setForm(v => ({ ...v, phone: e.target.value }))}
                    style={inputStyle}
                  />
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontFamily: B, fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 7, letterSpacing: "0.04em" }}>What are you looking for?</label>
                  <select name="service" value={form.service} onChange={e => setForm(v => ({ ...v, service: e.target.value }))}
                    style={{ ...inputStyle, cursor: "pointer", color: form.service ? FOREST : MUTED }}>
                    <option value="">Select a service…</option>
                    <option>Free Discovery Call (20 min)</option>
                    <option>EFT Tapping Session</option>
                    <option>Counselling & Psychotherapy</option>
                    <option>Integrative Therapy</option>
                    <option>Not sure yet</option>
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontFamily: B, fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 7, letterSpacing: "0.04em" }}>Tell me a little about what's brought you here</label>
                  <textarea rows={4} name="message" placeholder="Share as much or as little as you'd like…"
                    value={form.message}
                    onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65 }}
                  />
                </div>

                <button type="submit" className="btn-primary" style={{ width: "100%", textAlign: "center", fontSize: 14, padding: "15px 32px" }}>
                  Send Message →
                </button>
                <p style={{ fontFamily: B, fontSize: 11, color: MUTED, textAlign: "center", marginTop: 12, fontWeight: 300 }}>
                  Fully confidential · I respond within 24 hours
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────────────────────── */
function Footer() {
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
            <p style={{ fontFamily: B, fontSize: 13, color: SAGE_MD }}>vrinda@healinghorizon.com</p>
          </div>

          {/* Navigate */}
          <div>
            <p style={{ fontFamily: B, fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>Navigate</p>
            {["About", "Approach", "Services", "FAQ", "Contact"].map((l, i) => (
              <a key={i} href={`#${l.toLowerCase()}`} style={{
                display: "block", fontFamily: B, fontSize: 14, fontWeight: 300,
                color: "rgba(255,255,255,0.6)", marginBottom: 10, transition: "color 0.15s",
              }}
                onMouseEnter={e => e.currentTarget.style.color = WHITE}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,0.6)"}
              >{l}</a>
            ))}
          </div>

          {/* Services */}
          <div>
            <p style={{ fontFamily: B, fontSize: 10, color: "rgba(255,255,255,0.35)", letterSpacing: "0.14em", textTransform: "uppercase", marginBottom: 18 }}>Services</p>
            {["EFT Tapping Sessions", "Counselling & Psychotherapy", "Integrative Therapy", "Free Discovery Call"].map((l, i) => (
              <a key={i} href="#services" style={{
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

/* ─────────────────────────────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────────────────────────────── */
export default function App() {
  useReveal();

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main>
        <Hero />
        <MarqueeStrip />
        <About />
        <WhatIsEFT />
        <Approaches />
        <Services />
        <Pricing />
        <Testimonials />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
