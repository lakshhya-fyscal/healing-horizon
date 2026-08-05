import { useState } from "react";
import {
  CREAM, CREAM2, FOREST, SAGE, SAGE_LT, SAGE_MD, TERRA, TERRA_LT, GOLD,
  MUTED, WHITE, BORDER,
  D, B,
  BotanicalRight, BotanicalLeft,
  GlobalStyle, useReveal, useDocumentMeta, Navbar, Footer,
} from "./theme.jsx";

/* ─────────────────────────────────────────────────────────────────────────────
   PHOTO PLACEHOLDER — used where a real photo will eventually go
───────────────────────────────────────────────────────────────────────────── */
function PhotoPlaceholder({ label, height = 220, radius = 18 }) {
  return (
    <div style={{
      height, borderRadius: radius,
      background: `linear-gradient(145deg, ${CREAM2} 0%, ${SAGE_LT} 100%)`,
      border: `1px dashed ${SAGE_MD}`,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      gap: 8, textAlign: "center", padding: "16px 20px",
    }}>
      <span style={{ fontSize: 22 }}>🖼️</span>
      <span style={{ fontFamily: B, fontSize: 12, color: SAGE, fontWeight: 500, lineHeight: 1.5 }}>{label}</span>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WORKSHOP BANNER — illustrated cover used on workshop cards instead of photos
───────────────────────────────────────────────────────────────────────────── */
function WorkshopBanner({ icon, accent, tint, height = 170 }) {
  return (
    <div style={{
      height, position: "relative", overflow: "hidden",
      background: `linear-gradient(135deg, ${tint} 0%, ${WHITE} 130%)`,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ position: "absolute", top: -20, right: -20, opacity: 0.3, pointerEvents: "none" }}>
        <BotanicalRight />
      </div>
      <div style={{ position: "absolute", bottom: -30, left: -20, opacity: 0.18, pointerEvents: "none" }}>
        <BotanicalLeft />
      </div>
      <div style={{
        width: 60, height: 60, borderRadius: "50%",
        background: WHITE, border: `1.5px solid ${accent}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 28, position: "relative", zIndex: 1,
        boxShadow: "0 8px 24px rgba(24,38,28,0.08)",
      }}>{icon}</div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────────────────────── */
function WorkshopsHero() {
  return (
    <section style={{
      minHeight: "92vh", position: "relative",
      display: "flex", alignItems: "center",
      overflow: "hidden", paddingTop: 72,
      background: `linear-gradient(155deg, ${CREAM} 0%, ${CREAM2} 55%, #E8DCCF 100%)`,
    }}>
      <div style={{ position: "absolute", top: 60, right: 0, pointerEvents: "none", zIndex: 0 }}>
        <BotanicalRight />
      </div>
      <div style={{ position: "absolute", bottom: 80, left: 0, pointerEvents: "none", zIndex: 0 }}>
        <BotanicalLeft />
      </div>

      <div style={{
        position: "absolute", top: "50%", left: "50%",
        transform: "translate(-50%, -50%)",
        fontFamily: D, fontSize: "clamp(120px, 20vw, 240px)",
        fontWeight: 300, color: "rgba(79,115,88,0.04)",
        letterSpacing: "-8px", lineHeight: 1,
        pointerEvents: "none", userSelect: "none", whiteSpace: "nowrap", zIndex: 0,
      }}>Gather</div>

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
            📍 India · UK · Workshops &amp; Group Sessions
          </div>

          <h1 className="fade-up" style={{
            fontFamily: D, fontWeight: 400, lineHeight: 1.08,
            fontSize: "clamp(30px, 4vw, 46px)",
            color: FOREST, letterSpacing: "-1px", marginBottom: 26,
          }}>
            Healing doesn't only happen
            <br />
            <span className="accent-underline" style={{ fontStyle: "italic", color: SAGE, fontWeight: 300 }}>one room at a time.</span>
          </h1>

          <p className="fade-up" style={{
            fontFamily: B, fontSize: 17, color: MUTED, lineHeight: 1.78,
            maxWidth: 480, marginBottom: 38, animationDelay: "0.12s", fontWeight: 300,
          }}>
            I hold in-person workshops on EFT, mindfulness, and emotional resilience for groups, communities, and organisations — from India to the UK.
            Some people first meet me in a session; others first meet me in a room full of people learning to feel lighter together.
          </p>

          <div className="fade-up" style={{ display: "flex", gap: 12, flexWrap: "wrap", animationDelay: "0.22s" }}>
            <a href="#contact" className="btn-primary">Get in Touch About a Workshop</a>
            <a href="#past-workshops" className="btn-outline">See Past Workshops</a>
          </div>
        </div>

        {/* RIGHT: Photo */}
        <div className="hide-mobile fade-in" style={{
          display: "flex", justifyContent: "center", alignItems: "center",
          position: "relative", animationDelay: "0.1s",
        }}>
          <div style={{
            position: "absolute", width: 400, height: 400, borderRadius: "50%",
            border: `1.5px dashed ${SAGE_MD}`, opacity: 0.4,
            animation: "breathe 9s ease-in-out infinite",
          }} />
          <div style={{
            position: "absolute", width: 340, height: 480, borderRadius: 28,
            border: `1px solid rgba(79,115,88,0.18)`, transform: "rotate(3deg)",
          }} />

          <div style={{
            width: 320, height: 460, borderRadius: 24, overflow: "hidden", position: "relative",
            boxShadow: "0 28px 72px rgba(24,38,28,0.16)", border: `1px solid ${BORDER}`,
            animation: "float 7s ease-in-out infinite",
          }}>
            <img
              src="/workshops/gallery-1.jpg"
              alt="Vrinda in a quiet, grounded moment of mindfulness practice"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center 20%", display: "block" }}
            />
            <div style={{
              position: "absolute", bottom: 0, left: 0, right: 0,
              background: "linear-gradient(to top, rgba(24,38,28,0.85) 0%, rgba(24,38,28,0.3) 50%, transparent 100%)",
              padding: "44px 22px 22px",
            }}>
              <div style={{ fontFamily: D, fontSize: 21, fontWeight: 500, color: WHITE, letterSpacing: "-0.3px" }}>Workshops &amp; Group Sessions</div>
              <div style={{ fontFamily: B, fontSize: 12, color: "rgba(255,255,255,0.7)", marginTop: 3 }}>with Vrinda Goel</div>
            </div>
          </div>

          <div style={{
            position: "absolute", bottom: 108, left: -24,
            background: WHITE, borderRadius: 14, padding: "11px 16px",
            boxShadow: "0 8px 32px rgba(24,38,28,0.12)", border: `1px solid ${BORDER}`,
            animation: "float 6s ease-in-out infinite 2s",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <span style={{ fontSize: 18 }}>🌍</span>
            <div style={{ fontFamily: B, fontSize: 13, fontWeight: 600, color: FOREST }}>Workshops held across 2 countries</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   CREDIBILITY STAT ROW
───────────────────────────────────────────────────────────────────────────── */
const STATS = [
  { n: "3", label: "Workshops held across India" },
  { n: "10+", label: "Workshops held across the UK" },
  { n: "2", label: "Countries" },
  { n: "150+", label: "People reached through group sessions" },
];

function StatRow() {
  return (
    <section style={{ background: WHITE, padding: "56px 28px", borderBottom: `1px solid ${BORDER}` }}>
      <div className="stat-row" style={{
        maxWidth: 1200, margin: "0 auto",
        display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 24,
      }}>
        {STATS.map((s, i) => (
          <div key={i} className="reveal" style={{
            textAlign: "center", paddingLeft: i > 0 ? 24 : 0,
            borderLeft: i > 0 ? `1px solid ${BORDER}` : "none",
            animationDelay: `${i * 0.06}s`,
          }}>
            <div style={{ fontFamily: D, fontSize: "clamp(30px, 4vw, 42px)", fontWeight: 500, color: FOREST, letterSpacing: "-1px" }}>{s.n}</div>
            <div style={{
              fontFamily: B, fontSize: 11, color: MUTED, marginTop: 6,
              textTransform: "uppercase", letterSpacing: "0.08em", lineHeight: 1.5,
            }}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WHY WORKSHOPS
───────────────────────────────────────────────────────────────────────────── */
function WhyWorkshops() {
  return (
    <section className="section-pad" style={{ padding: "110px 28px", background: WHITE, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", top: "50%", right: -40, transform: "translateY(-50%)",
        fontFamily: D, fontSize: 220, fontWeight: 300, color: "rgba(79,115,88,0.04)",
        lineHeight: 1, pointerEvents: "none", userSelect: "none", letterSpacing: -8,
      }}>Together</div>

      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "center" }} className="mobile-grid-1">
          <div className="reveal-left">
            <span className="section-label">Why Workshops</span>
            <div className="rule" />
            <h2 style={{
              fontFamily: D, fontSize: "clamp(26px, 3.5vw, 42px)",
              fontWeight: 400, color: FOREST, lineHeight: 1.18,
              marginBottom: 22, letterSpacing: "-0.5px",
            }}>
              Some things are easier to learn <em style={{ fontStyle: "italic", color: SAGE }}>in a room with other people.</em>
            </h2>
            <p style={{ fontFamily: B, fontSize: 16, color: MUTED, lineHeight: 1.82, marginBottom: 16, fontWeight: 300 }}>
              One-on-one work is where the deepest healing happens for most people, but it's not the only door in.
              Workshops let me teach the same tools I use in sessions — EFT tapping, grounding, nervous-system regulation, mindfulness — to a group at once,
              in a format that's accessible, less intimidating than a first therapy session, and often the first step someone takes before deciding they're ready for individual support.
            </p>
            <p style={{ fontFamily: B, fontSize: 16, color: MUTED, lineHeight: 1.82, marginBottom: 36, fontWeight: 300 }}>
              I've run workshops for individuals and organisations across India and the UK, and I keep coming back to the same thing: healing is less lonely
              when you realise the person next to you is carrying something heavy too.
            </p>
            <a href="/#services" className="btn-primary">Work With Me</a>
          </div>

          <div className="reveal-right" style={{ position: "relative", borderRadius: 24, overflow: "hidden", height: 420, border: `1px solid ${BORDER}` }}>
            <img
              src="/workshops/gallery-3.jpg"
              alt="Journal & Sip workshop group, Delhi"
              style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   MINI MAP
───────────────────────────────────────────────────────────────────────────── */
function MiniMap() {
  return (
    <div style={{ display: "flex", justifyContent: "center", marginBottom: 48 }}>
      <svg width="280" height="110" viewBox="0 0 280 110" fill="none">
        <path d="M8 90 C40 20 90 30 130 55 C170 80 220 20 272 40" stroke={SAGE_MD} strokeWidth="1.5" strokeDasharray="3 6" opacity="0.6"/>
        {/* UK pin */}
        <g transform="translate(52,26)">
          <path d="M0 0 C10 0 18 8 18 18 C18 30 0 46 0 46 C0 46 -18 30 -18 18 C-18 8 -10 0 0 0Z" fill={SAGE} opacity="0.15"/>
          <circle cx="0" cy="18" r="7" fill={SAGE}/>
        </g>
        <text x="52" y="94" textAnchor="middle" fontFamily={B} fontSize="11" fontWeight="600" fill={FOREST}>UK</text>
        {/* India pin */}
        <g transform="translate(222,20)">
          <path d="M0 0 C10 0 18 8 18 18 C18 30 0 46 0 46 C0 46 -18 30 -18 18 C-18 8 -10 0 0 0Z" fill={TERRA} opacity="0.15"/>
          <circle cx="0" cy="18" r="7" fill={TERRA}/>
        </g>
        <text x="222" y="88" textAnchor="middle" fontFamily={B} fontSize="11" fontWeight="600" fill={FOREST}>India</text>
      </svg>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PAST WORKSHOPS
───────────────────────────────────────────────────────────────────────────── */
const INDIA_WORKSHOPS = [
  { city: "Delhi, India", date: "June, 2026", title: "Journal & Sip", desc: "For those wanting to start journaling or build a consistent habit, covering 3 journaling styles with in-session practice.", people: "9 participants", icon: "📓", accent: SAGE, tint: SAGE_LT },
  { city: "Gurgaon, India", date: "April, 2026", title: "How To Manage Negative Thoughts", desc: "A practical session on identifying negative thought loops and using tapping and reframing to work through them.", people: "12 participants", icon: "🧠", accent: GOLD, tint: CREAM2 },
  { city: "Remote", date: "December, 2025", title: "People Pleasing", desc: "Exploring the roots of people-pleasing patterns and building tools to set boundaries without guilt.", people: "10 participants", icon: "🛡️", accent: TERRA, tint: TERRA_LT },
];

const UK_WORKSHOPS = [
  { city: "Storrington, West Sussex", date: "August, 2024", title: "Sleep Hygiene", desc: "A guided session on the habits and mindset shifts that support consistent, restful sleep.", people: "11 participants", icon: "🌙", accent: SAGE, tint: SAGE_LT },
  { city: "Brighton, UK", date: "January, 2024", title: "Mental Health Plan", desc: "Helping participants build a personal, practical mental health maintenance plan they can return to.", people: "14 participants", icon: "🗺️", accent: GOLD, tint: CREAM2 },
];

function WorkshopCard({ w }) {
  return (
    <div className="card reveal" style={{
      background: WHITE, borderRadius: 20, border: `1px solid ${BORDER}`,
      overflow: "hidden", flex: "1 1 0", minWidth: 260,
    }}>
      <WorkshopBanner icon={w.icon} accent={w.accent} tint={w.tint} />
      <div style={{ padding: "22px 24px 26px" }}>
        <div style={{ fontFamily: B, fontSize: 12, color: MUTED, marginBottom: 10 }}>
          📍 {w.city} · {w.date}
        </div>
        <h3 style={{ fontFamily: D, fontSize: 21, fontWeight: 500, color: FOREST, marginBottom: 10, letterSpacing: "-0.2px" }}>
          "{w.title}"
        </h3>
        <p style={{ fontFamily: B, fontSize: 13.5, color: MUTED, lineHeight: 1.7, marginBottom: 16, fontWeight: 300 }}>
          {w.desc}
        </p>
        <div style={{
          borderTop: `1px solid ${BORDER}`, paddingTop: 14,
          fontFamily: B, fontSize: 13, fontWeight: 600, color: SAGE,
          display: "flex", alignItems: "center", gap: 6,
        }}>
          👥 {w.people}
        </div>
      </div>
    </div>
  );
}

function PastWorkshops() {
  return (
    <section id="past-workshops" className="section-pad" style={{ padding: "110px 28px", background: CREAM2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", maxWidth: 640, margin: "0 auto 40px" }}>
          <span className="section-label reveal">Where I've Taught</span>
          <div className="rule rule-center reveal" />
          <h2 className="reveal" style={{
            fontFamily: D, fontSize: "clamp(28px, 3.5vw, 46px)",
            fontWeight: 400, color: FOREST, letterSpacing: "-0.6px", lineHeight: 1.15, marginBottom: 14,
          }}>
            A look back at the <em style={{ fontStyle: "italic", color: SAGE }}>rooms we've filled.</em>
          </h2>
          <p className="reveal" style={{ fontFamily: B, fontSize: 15.5, color: MUTED, lineHeight: 1.8, fontWeight: 300 }}>
            A selection of the workshops I've held so far, with more on the way.
          </p>
        </div>

        <MiniMap />

        {/* India group */}
        <div style={{ marginBottom: 48 }}>
          <h3 style={{ fontFamily: D, fontSize: 20, fontWeight: 500, color: FOREST, marginBottom: 18, letterSpacing: "-0.2px" }}>
            🇮🇳 India — {INDIA_WORKSHOPS.length} workshops
          </h3>
          <div className="workshop-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {INDIA_WORKSHOPS.map((w, i) => <WorkshopCard key={i} w={w} />)}
          </div>
        </div>

        {/* UK group */}
        <div>
          <h3 style={{ fontFamily: D, fontSize: 20, fontWeight: 500, color: FOREST, marginBottom: 18, letterSpacing: "-0.2px" }}>
            🇬🇧 United Kingdom — multiple workshops
          </h3>
          <div className="hscroll workshop-row" style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {UK_WORKSHOPS.map((w, i) => <WorkshopCard key={i} w={w} />)}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WHAT I TEACH
───────────────────────────────────────────────────────────────────────────── */
const WHAT_I_TEACH = [
  { icon: "🫀", title: "EFT Tapping", desc: "An introduction to tapping and how it can be used to manage anxiety.", color: SAGE_LT, accent: SAGE },
  { icon: "🧘", title: "Journal & Sip", desc: "Different ways to journal, and how to find the style that works for you.", color: CREAM2, accent: GOLD },
  { icon: "🛡️", title: "Emotional Regulation", desc: "Building habits to recognise what you're feeling and work through it, rather than suppressing or dismissing it.", color: TERRA_LT, accent: TERRA },
];

function WhatITeach() {
  return (
    <section className="section-pad" style={{ padding: "110px 28px", background: WHITE }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span className="section-label reveal">What I Teach</span>
          <div className="rule rule-center reveal" />
          <h2 className="reveal" style={{
            fontFamily: D, fontSize: "clamp(28px, 3.5vw, 46px)",
            fontWeight: 400, color: FOREST, letterSpacing: "-0.6px", lineHeight: 1.15,
          }}>
            Tools that work as well in a group as they do <em style={{ fontStyle: "italic", color: SAGE }}>one-on-one.</em>
          </h2>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 20 }}>
          {WHAT_I_TEACH.map((a, i) => (
            <div key={i} className="card reveal" style={{
              background: WHITE, borderRadius: 22, padding: "34px 28px",
              border: `1px solid ${BORDER}`, animationDelay: `${i * 0.08}s`,
            }}>
              <div style={{
                width: 50, height: 50, borderRadius: 14, background: a.color,
                display: "flex", alignItems: "center", justifyContent: "center",
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
   WORKSHOP TESTIMONIALS
───────────────────────────────────────────────────────────────────────────── */
const WORKSHOP_TESTIMONIALS = [
  {
    text: "It was a really beautiful morning — you keep making the day even better! Sending Vrinda and the whole team lots and lots of love, and hoping to see each other even sooner.",
    name: "Dr. Mahalakshmi Manoharan",
    role: "Journal & Sip — Delhi",
    initials: "MM",
  },
  {
    text: "Best Sunday anyone can ever spend — the best 2 hours of my life. Thank you, Vrinda. You are the best. Loved all the participants too. Organise another one soon!",
    name: "Ruchi",
    role: "Journal & Sip — Delhi",
    initials: "R",
  },
  {
    text: "Thank you for the phenomenal workshop and for creating the space. Loved meeting everyone.",
    name: "Sujata",
    role: "Journal & Sip — Delhi",
    initials: "S",
  },
];

function WorkshopTestimonials() {
  const [active, setActive] = useState(0);
  const hasTestimonials = WORKSHOP_TESTIMONIALS.length > 0;

  return (
    <section className="section-pad" style={{ padding: "110px 28px", background: FOREST, position: "relative", overflow: "hidden" }}>
      <div style={{
        position: "absolute", bottom: -40, right: -20,
        fontFamily: D, fontSize: 240, fontWeight: 300,
        color: "rgba(255,255,255,0.03)", lineHeight: 1,
        pointerEvents: "none", userSelect: "none", letterSpacing: -8,
      }}>Room</div>

      <div style={{ maxWidth: 900, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <span style={{ fontFamily: B, fontSize: 11, fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase", color: SAGE_MD }}>
            Voices From The Room
          </span>
          <div style={{ width: 40, height: 2, background: `linear-gradient(90deg, ${TERRA}, ${GOLD})`, borderRadius: 2, margin: "14px auto 22px" }} />
          <h2 style={{
            fontFamily: D, fontSize: "clamp(26px, 3.5vw, 44px)",
            fontWeight: 400, color: WHITE, letterSpacing: "-0.8px", fontStyle: "italic",
          }}>
            What it feels like in the room
          </h2>
        </div>

        {hasTestimonials && (
          <div className="testi-card" style={{
            background: "rgba(255,255,255,0.05)", borderRadius: 28,
            padding: "52px 52px 44px", border: "1px solid rgba(255,255,255,0.08)",
            backdropFilter: "blur(20px)",
          }}>
            <div style={{ fontFamily: D, fontSize: 100, lineHeight: 0.5, color: SAGE_MD, opacity: 0.4, marginBottom: 16, fontWeight: 600 }}>"</div>

            <p style={{
              fontFamily: D, fontSize: "clamp(18px, 2.2vw, 26px)", fontWeight: 300, fontStyle: "italic",
              color: "rgba(255,255,255,0.88)", lineHeight: 1.65, marginBottom: 36,
            }}>{WORKSHOP_TESTIMONIALS[active].text}</p>

            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 46, height: 46, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${SAGE} 0%, ${SAGE_MD} 100%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontFamily: D, fontSize: 17, color: WHITE, fontWeight: 600,
                }}>{WORKSHOP_TESTIMONIALS[active].initials}</div>
                <div>
                  <div style={{ fontFamily: B, fontWeight: 600, color: WHITE, fontSize: 15 }}>{WORKSHOP_TESTIMONIALS[active].name}</div>
                  <div style={{ fontFamily: B, fontSize: 13, color: SAGE_MD }}>{WORKSHOP_TESTIMONIALS[active].role}</div>
                </div>
              </div>

              {WORKSHOP_TESTIMONIALS.length > 1 && (
                <div style={{ display: "flex", gap: 8 }}>
                  {WORKSHOP_TESTIMONIALS.map((_, i) => (
                    <button key={i} onClick={() => setActive(i)} style={{
                      width: i === active ? 28 : 8, height: 8, borderRadius: 100,
                      background: i === active ? SAGE_MD : "rgba(255,255,255,0.15)",
                      border: "none", cursor: "pointer", transition: "all 0.28s", padding: 0,
                    }} />
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Real, unedited feedback */}
        <div style={{ marginTop: 56 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <span style={{ fontFamily: B, fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "rgba(255,255,255,0.4)" }}>
              📋 Straight from the source — unedited
            </span>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }} className="mobile-grid-1">
            <GoogleFormFeedback />
            <WhatsAppFeedback />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   GOOGLE FORM FEEDBACK — recreation of the "People Pleasing" workshop
   feedback form response, styled after Google Forms' response viewer
───────────────────────────────────────────────────────────────────────────── */
function GoogleFormFeedback() {
  const qa = [
    {
      q: "How was your overall experience of attending the workshop?",
      a: "Overall, it was a really engaging and insightful experience. The workshop gave me a clearer understanding of my own people-pleasing patterns and practical tools I can start applying right away. I especially appreciated the safe and supportive environment you created for open sharing.",
    },
    {
      q: "What was your most significant learning from the workshop?",
      a: "I realised how often I compromise my own needs to avoid disappointing others, and that this pattern has long-term emotional costs. Understanding this has made me more determined to prioritise my own wellbeing.",
    },
  ];

  return (
    <div style={{ background: "#EDEBFB", borderRadius: 16, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
      <div style={{ fontFamily: B, fontSize: 11, fontWeight: 600, color: "#5C3EBF", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2 }}>
        Google Forms · People Pleasing Workshop
      </div>
      {qa.map((item, i) => (
        <div key={i} style={{ background: WHITE, borderRadius: 10, padding: "18px 20px", boxShadow: "0 1px 2px rgba(0,0,0,0.06)" }}>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 14.5, color: "#202124", marginBottom: 6, lineHeight: 1.4 }}>{item.q}</div>
          <div style={{ fontFamily: "Arial, sans-serif", fontSize: 12, color: "#5f6368", marginBottom: 10 }}>1 response</div>
          <div style={{ background: "#f8f9fa", borderRadius: 6, padding: "12px 14px", fontFamily: "Arial, sans-serif", fontSize: 13, color: "#3c4043", lineHeight: 1.55 }}>
            {item.a}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WHATSAPP FEEDBACK — recreation of thank-you messages after the
   Journal & Sip workshop, styled after WhatsApp chat bubbles
───────────────────────────────────────────────────────────────────────────── */
function WhatsAppFeedback() {
  const messages = [
    { name: "Dr Mahalakshmi Manoharan", nameColor: "#c0392b", avatar: "D", avatarBg: "#f3c6c6",
      text: "Thank you, Team Guiding Koi. Was a realllyy beautiful morning today and you keep making the day get even betterrrr! Sending Vrinda and the whole team lots and lots of love — and hoping to see each other even sooner",
      time: "6:07 PM", reaction: "❤️", count: 2 },
    { name: "Ruchi journal & Sip", nameColor: "#c2185b", avatar: "🪷", avatarBg: "#3a2a20",
      text: "Best Sunday, anyone can ever spend. Best 2 hours of my life. Thank you Vrinda. You are the best. Loved all the participants too. Organise other one soon! Tc",
      time: "6:09 PM", reaction: "❤️", count: 1 },
    { name: "Sujata", nameColor: "#2e7d32", avatar: "S", avatarBg: "#c8e6c9",
      text: "Thank u for the phenomenal workshop 💗💗💗 and for creating the space. Loved meeting everyone 💗💗",
      time: "6:09 PM", reaction: "❤️", count: 2 },
  ];
  const quoted = "Thank you, everyone, for being a part of our Journal & Sip Workshop today. 💙 We hope you left with a better understanding of what journaling can look like and, more importantly, the confidence to ma…";

  return (
    <div style={{
      background: "#E9DFD3", borderRadius: 16, padding: "16px 14px",
      display: "flex", flexDirection: "column", gap: 12,
      backgroundImage: "radial-gradient(rgba(0,0,0,0.03) 1px, transparent 1px)",
      backgroundSize: "14px 14px",
    }}>
      <div style={{ fontFamily: B, fontSize: 11, fontWeight: 600, color: "#6b5b4a", letterSpacing: "0.06em", textTransform: "uppercase", marginBottom: 2, paddingLeft: 2 }}>
        WhatsApp · Journal & Sip Workshop Group
      </div>
      {messages.map((m, i) => (
        <div key={i} style={{ display: "flex", gap: 8, alignItems: "flex-start" }}>
          <div style={{
            width: 28, height: 28, borderRadius: "50%", background: m.avatarBg, flexShrink: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 13, fontWeight: 700, color: FOREST, marginTop: 2,
          }}>{m.avatar}</div>
          <div style={{ flex: 1 }}>
            <div style={{ background: WHITE, borderRadius: "2px 12px 12px 12px", padding: "8px 10px", boxShadow: "0 1px 2px rgba(0,0,0,0.08)" }}>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 13, fontWeight: 600, color: m.nameColor, marginBottom: 4 }}>~{m.name}</div>
              <div style={{ background: "#f0f0f0", borderLeft: "3px solid #a08a70", borderRadius: 4, padding: "6px 8px", marginBottom: 6 }}>
                <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 11, fontWeight: 600, color: "#8a6d3b" }}>~Guiding Koi</div>
                <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 11, color: "#555", lineHeight: 1.4 }}>{quoted}</div>
              </div>
              <div style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 13, color: "#111", lineHeight: 1.45 }}>{m.text}</div>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 4 }}>
                <span style={{ fontFamily: "Helvetica, Arial, sans-serif", fontSize: 10.5, color: "#999" }}>{m.time}</span>
              </div>
            </div>
            <div style={{
              display: "inline-flex", alignItems: "center", gap: 4, marginTop: 4,
              background: WHITE, borderRadius: 100, padding: "2px 8px", boxShadow: "0 1px 2px rgba(0,0,0,0.08)",
            }}>
              <span style={{ fontSize: 12 }}>{m.reaction}</span>
              {m.count > 1 && <span style={{ fontSize: 11, color: "#666" }}>{m.count}</span>}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   PHOTO GALLERY STRIP
───────────────────────────────────────────────────────────────────────────── */
const GALLERY_PHOTOS = [
  { src: "/workshops/gallery-3.jpg", alt: "Journal & Sip workshop group, Delhi" },
  { src: "/workshops/gallery-2.jpg", alt: "Participants writing during a prompt-based journaling exercise" },
  { src: "/workshops/gallery-4.jpg", alt: "Managing Negative Thoughts workshop, opening slide" },
  { src: "/workshops/gallery-1.jpg", alt: "A quiet, grounded moment between sessions" },
];

function PhotoGallery() {
  return (
    <section className="section-pad" style={{ padding: "90px 28px", background: CREAM2 }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ marginBottom: 36 }}>
          <span className="section-label reveal">A Few Moments</span>
          <div className="rule reveal" />
        </div>
        <div className="hscroll">
          {GALLERY_PHOTOS.map((p, i) => (
            <div key={i} style={{ minWidth: 220, width: 220, height: 220, flexShrink: 0, borderRadius: 16, overflow: "hidden", border: `1px solid ${BORDER}` }}>
              <img src={p.src} alt={p.alt} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   WORKSHOP FAQ
───────────────────────────────────────────────────────────────────────────── */
const WORKSHOP_FAQS = [
  { q: "Do I need any experience with EFT or therapy to attend?", a: "No. Workshops are designed to be a first introduction. No prior experience needed." },
  { q: "Are workshops in-person, online, or both?", a: "The workshop format is pre-decided. I conduct online and offline workshops." },
  { q: "How large are the groups?", a: "Typically 10–15 participants, kept small enough for a personal experience." },
  { q: "Can I book a private workshop for my organisation, team, or community?", a: "Yes. I run custom workshops for companies, schools, and community groups. Get in touch with your group size and what you'd like to focus on." },
  { q: "Is a workshop a replacement for individual therapy?", a: "No. Workshops are a starting point and a complement, not a substitute for one-on-one work. Many participants go on to book individual sessions afterwards." },
];

function WorkshopFAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section className="section-pad" style={{ padding: "110px 28px", background: WHITE }}>
      <div style={{ maxWidth: 760, margin: "0 auto" }}>
        <div style={{ textAlign: "center", marginBottom: 60 }}>
          <span className="section-label reveal">FAQ</span>
          <div className="rule rule-center reveal" />
          <h2 className="reveal" style={{
            fontFamily: D, fontSize: "clamp(28px, 3.5vw, 50px)",
            fontWeight: 400, color: FOREST, letterSpacing: "-0.8px",
          }}>
            Questions about workshops
          </h2>
        </div>

        <div className="reveal" style={{ background: CREAM2, borderRadius: 24, overflow: "hidden", border: `1px solid ${BORDER}` }}>
          {WORKSHOP_FAQS.map((f, i) => (
            <div key={i} className="accordion-item">
              <button className="accordion-btn" onClick={() => setOpen(open === i ? null : i)} style={{ padding: "22px 28px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontFamily: D, fontSize: 13, fontStyle: "italic", color: open === i ? SAGE : MUTED, fontWeight: 400, minWidth: 26 }}>0{i + 1}</span>
                  <span style={{ fontFamily: B, fontSize: 15, fontWeight: 500, color: open === i ? SAGE : FOREST }}>{f.q}</span>
                </div>
                <span style={{
                  width: 30, height: 30, borderRadius: "50%",
                  background: open === i ? SAGE_LT : WHITE,
                  display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
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
   CLOSING CTA / CONTACT
───────────────────────────────────────────────────────────────────────────── */
function WorkshopContact() {
  const [form, setForm] = useState({ name: "", email: "", org: "", location: "", interest: "", message: "" });
  const [sent, setSent] = useState(false);

  const inputStyle = {
    width: "100%", padding: "13px 16px",
    border: `1.5px solid ${BORDER}`, borderRadius: 12,
    fontSize: 14, color: FOREST, background: CREAM,
    fontFamily: B, outline: "none", transition: "border-color 0.2s, box-shadow 0.2s", fontWeight: 300,
  };

  return (
    <section id="contact" className="section-pad" style={{ padding: "110px 28px", background: CREAM2, position: "relative", overflow: "hidden" }}>
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
              Want a workshop in your <em style={{ fontStyle: "italic", color: SAGE }}>city or organisation?</em>
            </h2>
            <p style={{ fontFamily: B, fontSize: 15, color: MUTED, lineHeight: 1.82, marginBottom: 36, fontWeight: 300 }}>
              Whether you're an individual who'd like to know about future workshops, or an organisation looking to bring one to your team or community,
              I'd love to hear from you.
            </p>

            <div style={{
              background: WHITE, borderRadius: 16, padding: "20px 22px", border: `1px solid ${BORDER}`,
            }}>
              <p style={{ fontFamily: B, fontSize: 13, color: SAGE, fontWeight: 600, marginBottom: 5 }}>🌱 Prefer 1:1 support?</p>
              <p style={{ fontFamily: B, fontSize: 13, color: MUTED, lineHeight: 1.68, fontWeight: 300 }}>
                If you're looking to book an individual session instead, visit the{" "}
                <a href="/#services" style={{ color: SAGE, fontWeight: 500, textDecoration: "underline" }}>Services</a> page.
              </p>
            </div>
          </div>

          {/* RIGHT: Form */}
          <div className="reveal-right">
            {sent ? (
              <div style={{ background: WHITE, borderRadius: 24, padding: "64px 40px", textAlign: "center", border: `1px solid ${BORDER}` }}>
                <div style={{ fontSize: 52, marginBottom: 20 }}>🌱</div>
                <h3 style={{ fontFamily: D, fontSize: 32, fontWeight: 400, color: FOREST, marginBottom: 12, letterSpacing: "-0.5px" }}>
                  Thank you, {form.name || "friend"}
                </h3>
                <p style={{ fontFamily: B, fontSize: 15, color: MUTED, lineHeight: 1.75, fontWeight: 300 }}>
                  Your message has been received. I'll be in touch within 24 hours.
                </p>
              </div>
            ) : (
              <form
                name="workshops-contact"
                method="POST"
                data-netlify="true"
                netlify-honeypot="bot-field"
                onSubmit={async e => {
                  e.preventDefault();
                  const data = new FormData(e.target);
                  await fetch("/", { method: "POST", headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(data).toString() });
                  setSent(true);
                }}
                style={{ background: WHITE, borderRadius: 24, padding: "40px", border: `1px solid ${BORDER}` }}
              >
                <input type="hidden" name="form-name" value="workshops-contact" />
                <p style={{ display: "none" }}><input name="bot-field" /></p>
                <h3 style={{ fontFamily: D, fontSize: 28, fontWeight: 400, color: FOREST, marginBottom: 28, letterSpacing: "-0.3px" }}>
                  Send a message
                </h3>

                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: "block", fontFamily: B, fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 7, letterSpacing: "0.04em" }}>Full Name</label>
                    <input type="text" name="name" placeholder="Your name" required
                      value={form.name} onChange={e => setForm(v => ({ ...v, name: e.target.value }))} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: B, fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 7, letterSpacing: "0.04em" }}>Email</label>
                    <input type="email" name="email" placeholder="your@email.com" required
                      value={form.email} onChange={e => setForm(v => ({ ...v, email: e.target.value }))} style={inputStyle} />
                  </div>
                </div>

                <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                  <div>
                    <label style={{ display: "block", fontFamily: B, fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 7, letterSpacing: "0.04em" }}>
                      Organisation / Community <span style={{ color: MUTED, fontWeight: 400 }}>(optional)</span>
                    </label>
                    <input type="text" name="org" placeholder="Company, school, community…"
                      value={form.org} onChange={e => setForm(v => ({ ...v, org: e.target.value }))} style={inputStyle} />
                  </div>
                  <div>
                    <label style={{ display: "block", fontFamily: B, fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 7, letterSpacing: "0.04em" }}>City / Country</label>
                    <input type="text" name="location" placeholder="e.g. Mumbai, India"
                      value={form.location} onChange={e => setForm(v => ({ ...v, location: e.target.value }))} style={inputStyle} />
                  </div>
                </div>

                <div style={{ marginBottom: 14 }}>
                  <label style={{ display: "block", fontFamily: B, fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 7, letterSpacing: "0.04em" }}>What are you interested in?</label>
                  <select name="interest" value={form.interest} onChange={e => setForm(v => ({ ...v, interest: e.target.value }))}
                    style={{ ...inputStyle, cursor: "pointer", color: form.interest ? FOREST : MUTED }}>
                    <option value="">Select an option…</option>
                    <option>Attending a future workshop</option>
                    <option>Hosting a workshop for my organisation</option>
                    <option>Just curious — tell me more</option>
                  </select>
                </div>

                <div style={{ marginBottom: 24 }}>
                  <label style={{ display: "block", fontFamily: B, fontSize: 12, fontWeight: 600, color: FOREST, marginBottom: 7, letterSpacing: "0.04em" }}>Message</label>
                  <textarea rows={4} name="message" placeholder="Tell me a little about what you have in mind…"
                    value={form.message} onChange={e => setForm(v => ({ ...v, message: e.target.value }))}
                    style={{ ...inputStyle, resize: "vertical", lineHeight: 1.65 }} />
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
   WORKSHOPS PAGE
───────────────────────────────────────────────────────────────────────────── */
export default function Workshops() {
  useReveal();
  useDocumentMeta(
    "Workshops — Healing Horizon | Vrinda Goel",
    "In-person workshops on EFT, mindfulness, and emotional resilience for groups, communities, and organisations across India and the UK."
  );

  return (
    <>
      <GlobalStyle />
      <Navbar />
      <main>
        <WorkshopsHero />
        <StatRow />
        <WhyWorkshops />
        <PastWorkshops />
        <WhatITeach />
        <WorkshopTestimonials />
        <PhotoGallery />
        <WorkshopFAQ />
        <WorkshopContact />
      </main>
      <Footer />
    </>
  );
}
