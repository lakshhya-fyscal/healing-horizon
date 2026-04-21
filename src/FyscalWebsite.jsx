import { useState, useEffect, useRef } from 'react';

/* ============================================================
   FYSCAL TECHNOLOGIES — Marketing Website
   Inspired by: naka.com design language
   ─────────────────────────────────────────────────────────────
   Aesthetic:  Near-black hero + clean white sections
   Accent:     Electric lime  #352EFF  (used sparingly)
   Fonts:      Outfit (display/headings) + DM Sans (body)
   Motion:     SVG dash-draw, float, stagger scroll-reveals,
               counter animations, animated grid background
   ============================================================ */

const CSS = `
@import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

/* ── TOKENS ── */
:root {
  --black:      #080808;
  --black-2:    #0F0F0F;
  --black-3:    #161616;
  --black-4:    #1E1E1E;
  --lime:       #352EFF;
  --lime-dim:   rgba(53,46,255,.12);
  --lime-dim2:  rgba(53,46,255,.06);
  --white:      #FFFFFF;
  --off-white:  #F7F7F7;
  --border-d:   rgba(255,255,255,.08);
  --border-d2:  rgba(255,255,255,.12);
  --border-l:   #E8E8E8;
  --border-l2:  #D0D0D0;
  --text-d:     #0A0A0A;
  --text-m:     #6B6B6B;
  --text-s:     #A0A0A0;
  --text-dw:    rgba(255,255,255,.85);
  --text-mw:    rgba(255,255,255,.45);
  --font-h:     'Outfit', sans-serif;
  --font-b:     'DM Sans', sans-serif;
  --r-xs:       4px;
  --r-sm:       8px;
  --r-md:       12px;
  --r-lg:       16px;
  --r-xl:       20px;
  --r-pill:     100px;
  --nav-h:      64px;
  --max-w:      1200px;
}

/* ── BASE ── */
.fw {
  background: var(--white);
  color: var(--text-d);
  font-family: var(--font-b);
  font-size: 1rem; line-height: 1.6; font-weight: 400;
  overflow-x: hidden;
  -webkit-font-smoothing: antialiased;
}
.fw h1,.fw h2,.fw h3,.fw h4 {
  font-family: var(--font-h);
  line-height: 1.05; letter-spacing: -.03em; font-weight: 700;
}
.fw a { text-decoration: none; color: inherit; }

/* ── KEYFRAMES ── */
@keyframes fw-float {
  0%,100% { transform: translateY(0px); }
  50%     { transform: translateY(-10px); }
}
@keyframes fw-rise {
  from { opacity: 0; transform: translateY(32px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fw-fade {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes fw-blink {
  0%,100% { opacity: 1; }
  50%     { opacity: .25; }
}
@keyframes fw-dash {
  to { stroke-dashoffset: 0; }
}
@keyframes fw-draw-right {
  from { stroke-dashoffset: 120; }
  to   { stroke-dashoffset: 0; }
}
@keyframes fw-draw-down {
  from { stroke-dashoffset: 80; }
  to   { stroke-dashoffset: 0; }
}
@keyframes fw-arrow-r {
  0%   { opacity: 0; transform: translateX(-6px); }
  60%  { opacity: 1; transform: translateX(0); }
  100% { opacity: 1; transform: translateX(0); }
}
@keyframes fw-arrow-d {
  0%   { opacity: 0; transform: translateY(-6px); }
  60%  { opacity: 1; transform: translateY(0); }
  100% { opacity: 1; transform: translateY(0); }
}
@keyframes fw-bar-in {
  from { transform: scaleY(0); }
  to   { transform: scaleY(1); }
}
@keyframes fw-lime-pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(53,46,255,.3); }
  50%     { box-shadow: 0 0 0 8px rgba(53,46,255,0); }
}
@keyframes fw-grid-drift {
  from { background-position: 0 0; }
  to   { background-position: 0 64px; }
}
@keyframes fw-count {
  from { opacity: 0; transform: translateY(12px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes fw-spin {
  from { transform: rotate(0deg); }
  to   { transform: rotate(360deg); }
}
@keyframes fw-marquee {
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
}
@keyframes fw-shimmer {
  0%   { background-position: -300% center; }
  100% { background-position: 300% center; }
}
@keyframes fw-glow-pulse {
  0%,100% { box-shadow: 0 0 0 0 rgba(53,46,255,.18), 0 4px 24px rgba(53,46,255,.08); }
  50%     { box-shadow: 0 0 0 6px rgba(53,46,255,0), 0 8px 32px rgba(53,46,255,.16); }
}
@keyframes fw-border-spin {
  from { --angle: 0deg; }
  to   { --angle: 360deg; }
}

/* ── SCROLL REVEAL ── */
.fw-r {
  opacity: 0; transform: translateY(26px);
  transition: opacity .75s cubic-bezier(.2,1,.3,1), transform .75s cubic-bezier(.2,1,.3,1);
}
.fw-r.fw-v { opacity: 1; transform: translateY(0); }
.fw-r.t1 { transition-delay: .06s; }
.fw-r.t2 { transition-delay: .12s; }
.fw-r.t3 { transition-delay: .18s; }
.fw-r.t4 { transition-delay: .24s; }
.fw-r.t5 { transition-delay: .30s; }
.fw-r.t6 { transition-delay: .36s; }

/* ═══════════════════════════════════════
   NAV
═══════════════════════════════════════ */
.fw-nav {
  position: fixed; top: 0; left: 0; right: 0; z-index: 999;
  height: var(--nav-h);
  display: flex; align-items: center; justify-content: space-between;
  padding: 0 40px;
  background: rgba(255,255,255,.85);
  border-bottom: 1px solid rgba(0,0,0,.06);
  backdrop-filter: blur(20px) saturate(1.8);
  -webkit-backdrop-filter: blur(20px) saturate(1.8);
  transition: box-shadow .3s;
}
.fw-nav.scrolled {
  box-shadow: 0 1px 24px rgba(0,0,0,.06);
}
.fw-nav.dark { }
.fw-nav.light { }
.fw-logo {
  display: flex; align-items: center; gap: 10px;
}
.fw-logo-mark {
  width: 32px; height: 32px; border-radius: var(--r-sm);
  background: linear-gradient(135deg, #352EFF 0%, #7B6FF8 100%);
  position: relative;
  display: flex; align-items: center; justify-content: center;
  flex-shrink: 0;
  box-shadow: 0 2px 8px rgba(53,46,255,.35);
}
.fw-logo-mark::after {
  content: 'F';
  font-family: var(--font-h); font-size: 16px; font-weight: 800;
  color: var(--white);
}
.fw-logo-name {
  font-family: var(--font-h); font-size: 17px; font-weight: 700;
  letter-spacing: -.03em;
}
.fw-nav.dark  .fw-logo-name { color: var(--white); }
.fw-nav.light .fw-logo-name { color: var(--text-d); }

.fw-nav-links { display: flex; gap: 4px; list-style: none; }
.fw-nav-link {
  font-size: .875rem; font-weight: 500;
  color: var(--text-m);
  padding: 6px 12px; border-radius: var(--r-pill);
  transition: color .2s, background .2s;
}
.fw-nav-link:hover { color: var(--text-d); background: rgba(0,0,0,.04); }

.fw-nav-end { display: flex; align-items: center; gap: 10px; }

/* ── BUTTONS ── */
.fw-btn {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 9px 20px; border-radius: var(--r-pill);
  font-family: var(--font-b); font-size: .875rem; font-weight: 500;
  cursor: pointer; border: none; transition: all .2s;
  text-decoration: none; white-space: nowrap; line-height: 1;
}
.fw-btn-lg { padding: 13px 28px; font-size: 1rem; }

.fw-btn-lime,
a.fw-btn-lime {
  background: var(--lime); color: #ffffff; font-weight: 600;
}
.fw-btn-lime:hover {
  background: #6A64FF; transform: translateY(-1px);
  box-shadow: 0 4px 16px rgba(53,46,255,.35);
}
.fw-btn-white {
  background: var(--white); color: var(--black); font-weight: 600;
}
.fw-btn-white:hover { background: #f0f0f0; transform: translateY(-1px); }

.fw-btn-ghost-dark {
  background: transparent; color: var(--text-mw);
  border: 1px solid var(--border-d2);
}
.fw-btn-ghost-dark:hover { color: var(--white); border-color: var(--border-d2); background: rgba(255,255,255,.06); }
.fw-btn-ghost-light {
  background: transparent; color: var(--text-m);
  border: 1px solid var(--border-l);
}
.fw-btn-ghost-light:hover { color: var(--text-d); border-color: var(--border-l2); }

/* ═══════════════════════════════════════
   HERO — centered light
═══════════════════════════════════════ */
.fw-hero {
  background:
    radial-gradient(ellipse 55% 65% at 12% 80%, rgba(80,75,225,.38) 0%, transparent 65%),
    radial-gradient(ellipse 55% 50% at 78% 15%, rgba(225,150,210,.35) 0%, transparent 60%),
    radial-gradient(ellipse 40% 40% at 55% 55%, rgba(180,160,240,.12) 0%, transparent 60%),
    #F7F7FB;
  min-height: 100vh;
  display: flex; align-items: center; justify-content: center;
  padding: calc(var(--nav-h) + 24px) 40px 40px;
  position: relative; overflow: hidden;
  text-align: center;
}
.fw-hero-grid { display: none; }
.fw-hero-noise { display: none; }
.fw-hero-inner {
  max-width: 780px; margin: 0 auto; width: 100%;
  display: flex; flex-direction: column; align-items: center;
  position: relative; z-index: 1;
}
.fw-hero-label {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 5px 14px 5px 6px;
  background: rgba(53,46,255,.07);
  border: 1px solid rgba(53,46,255,.18);
  border-radius: var(--r-pill);
  font-size: .7rem; font-weight: 600; letter-spacing: .1em;
  text-transform: uppercase; color: var(--lime);
  margin-bottom: 24px;
  animation: fw-rise .6s ease both;
}
.fw-label-dot {
  width: 18px; height: 18px;
  background: var(--lime);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 9px; color: white;
  flex-shrink: 0;
  animation: fw-glow-pulse 2.5s ease-in-out infinite;
}
.fw-hero h1 {
  font-size: clamp(2.8rem, 6vw, 5.2rem);
  font-weight: 350; letter-spacing: -.03em; line-height: 1.04;
  color: var(--text-d); margin-bottom: 8px;
  animation: fw-rise .65s .06s ease both;
}
.fw-hero h1 em {
  font-style: normal;
  color: var(--text-d);
}
.fw-hero-sub {
  font-size: clamp(.95rem, 1.4vw, 1.125rem);
  color: var(--text-m); line-height: 1.8;
  margin-bottom: 20px; font-weight: 300;
  max-width: 560px;
  animation: fw-rise .65s .12s ease both;
}
.fw-hero-acts {
  display: flex; gap: 12px; flex-wrap: wrap;
  justify-content: center;
  animation: fw-rise .65s .18s ease both;
}
.fw-hero-cta {
  display: inline-flex; align-items: center; gap: 16px;
  padding: 18px 32px;
  border: 1.5px solid var(--text-d);
  border-radius: 0;
  background: transparent;
  color: var(--text-d);
  font-family: var(--font-b);
  font-size: .8rem; font-weight: 500;
  letter-spacing: .15em; text-transform: uppercase;
  text-decoration: none;
  transition: background .25s, color .25s, border-color .25s;
  cursor: pointer;
}
.fw-hero-cta span {
  font-size: 1rem; transition: transform .25s ease;
}
.fw-hero-cta:hover {
  background: var(--text-d);
  color: var(--white);
}
.fw-hero-cta:hover span { transform: translateX(4px); }

/* ── hero inline client marquee ── */
.fw-hero-clients {
  display: flex; align-items: center; gap: 16px;
  margin-top: 20px; width: 100%; max-width: 600px;
  animation: fw-rise .65s .26s ease both;
}
.fw-hero-clients-lbl {
  font-size: .7rem; font-weight: 600; letter-spacing: .12em;
  text-transform: uppercase; color: var(--text-s);
  white-space: nowrap; flex-shrink: 0;
}
.fw-hero-marquee-outer {
  overflow: hidden; position: relative; flex: 1;
}
.fw-hero-marquee-outer::before,
.fw-hero-marquee-outer::after {
  content: ''; position: absolute; top: 0; bottom: 0; width: 40px; z-index: 2; pointer-events: none;
}
.fw-hero-marquee-outer::before { left: 0;  background: linear-gradient(to right, rgba(247,247,251,.9), transparent); }
.fw-hero-marquee-outer::after  { right: 0; background: linear-gradient(to left,  rgba(247,247,251,.9), transparent); }
.fw-hero-marquee-track {
  display: flex; width: max-content;
  animation: fw-marquee 22s linear infinite;
}
.fw-hero-marquee-track:hover { animation-play-state: paused; }
.fw-hero-marquee-item {
  display: inline-flex; align-items: center; gap: 10px;
  padding: 0 6px;
  font-family: var(--font-h); font-size: .85rem; font-weight: 600;
  color: var(--text-s); white-space: nowrap;
  transition: color .2s;
}
.fw-hero-marquee-item:hover { color: var(--text-d); }
.fw-hero-marquee-sep { color: var(--border-l2); font-size: .7rem; }

/* ── HERO FLOW VISUAL ── */
.fw-flow-vis {
  display: flex; flex-direction: column; align-items: center;
  gap: 0; position: relative;
  animation: fw-float 8s ease-in-out infinite, fw-fade .9s .35s ease both;
}
.fw-fcard {
  background: var(--white);
  border: 1px solid var(--border-l);
  border-radius: var(--r-lg);
  padding: 14px 18px;
  display: flex; align-items: center; gap: 12px;
  box-shadow: 0 2px 16px rgba(0,0,0,.06);
  position: relative; z-index: 2;
  min-width: 200px;
}
.fw-fcard.lime-accent {
  background: var(--lime-dim);
  border-color: rgba(53,46,255,.2);
}
.fw-fcard-icon {
  width: 36px; height: 36px; border-radius: var(--r-sm);
  display: flex; align-items: center; justify-content: center;
  font-size: 18px; background: var(--off-white);
  flex-shrink: 0; font-family: var(--font-h); font-weight: 800;
}
.fw-fcard-info strong {
  display: block; font-family: var(--font-h); font-size: 1rem;
  font-weight: 700; color: var(--text-d); letter-spacing: -.02em;
}
.fw-fcard-info span {
  font-size: .7rem; color: var(--text-m);
}

/* ── CENTER BADGE ── */
.fw-badge-wrap {
  position: relative; z-index: 2; margin: 0;
  display: flex; flex-direction: column; align-items: center;
}
.fw-center-badge {
  width: 68px; height: 68px;
  background: var(--white);
  border: 1px solid var(--border-l);
  border-radius: var(--r-md);
  display: flex; align-items: center; justify-content: center;
  position: relative;
  box-shadow: 0 4px 20px rgba(53,46,255,.15);
}
.fw-center-badge::before {
  content: '';
  position: absolute; top: 0; right: 0;
  width: 18px; height: 18px;
  background: var(--lime);
  border-radius: 0 var(--r-md) 0 var(--r-md);
}
.fw-center-badge-f {
  font-family: var(--font-h); font-size: 26px; font-weight: 800;
  color: var(--text-d); position: relative; z-index: 1;
}

/* ── SVG CONNECTOR ── */
.fw-connector {
  width: 2px; height: 48px; position: relative; overflow: visible;
}
.fw-connector svg {
  position: absolute; top: 0; left: 50%; transform: translateX(-50%);
  overflow: visible;
}
.fw-connector-h {
  width: 120px; height: 2px; position: relative;
}
.fw-connector-h svg { position: absolute; top: 50%; transform: translateY(-50%); }

/* ── HORIZONTAL FLOW (3 cards side by side) ── */
.fw-flow-row {
  display: flex; align-items: center; gap: 0;
  width: 100%;
}
.fw-flow-col {
  display: flex; flex-direction: column; align-items: center;
}
.fw-flow-mid {
  flex: 1; display: flex; flex-direction: column; align-items: center; gap: 0;
}

/* ═══════════════════════════════════════
   TRUST BAR — animated marquee
═══════════════════════════════════════ */
.fw-trust {
  border-top: 1px solid var(--border-l);
  border-bottom: 1px solid var(--border-l);
  background: var(--white);
  padding: 20px 0;
  overflow: hidden;
}
.fw-trust-header {
  text-align: center;
  font-size: .65rem; font-weight: 600; letter-spacing: .16em;
  text-transform: uppercase; color: var(--text-s);
  margin-bottom: 16px;
}
.fw-marquee-outer {
  overflow: hidden;
  position: relative;
}
.fw-marquee-outer::before,
.fw-marquee-outer::after {
  content: '';
  position: absolute; top: 0; bottom: 0; width: 80px; z-index: 2;
  pointer-events: none;
}
.fw-marquee-outer::before { left: 0;  background: linear-gradient(to right, white, transparent); }
.fw-marquee-outer::after  { right: 0; background: linear-gradient(to left,  white, transparent); }
.fw-marquee-track {
  display: flex; align-items: center; gap: 0;
  width: max-content;
  animation: fw-marquee 28s linear infinite;
}
.fw-marquee-track:hover { animation-play-state: paused; }
.fw-marquee-item {
  display: flex; align-items: center; gap: 8px;
  padding: 0 40px;
  font-family: var(--font-h); font-size: .95rem; font-weight: 700;
  color: var(--text-s);
  white-space: nowrap;
  transition: color .2s;
}
.fw-marquee-item:hover { color: var(--text-d); }
.fw-marquee-dot {
  width: 4px; height: 4px; border-radius: 50%;
  background: var(--border-l2); flex-shrink: 0;
}

/* ═══════════════════════════════════════
   SECTION COMMON
═══════════════════════════════════════ */
.fw-sec { padding: 100px 40px; }
.fw-sec-dark  { background: var(--black); color: white; }
.fw-sec-dark2 {
  background: linear-gradient(160deg, #080818 0%, #0E0A2A 50%, #080818 100%);
  color: white;
  position: relative; overflow: hidden;
}
.fw-sec-dark2::before {
  content: '';
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: radial-gradient(ellipse 70% 50% at 50% 0%, rgba(53,46,255,.08), transparent 70%);
  pointer-events: none;
}
.fw-sec-white { background: var(--white); }
.fw-sec-gray  { background: var(--off-white); }
.fw-wrap { max-width: var(--max-w); margin: 0 auto; }

.fw-sec-tag {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 4px 12px; border-radius: var(--r-pill);
  background: rgba(53,46,255,.07);
  border: 1px solid rgba(53,46,255,.15);
  font-size: .65rem; font-weight: 700; letter-spacing: .14em;
  text-transform: uppercase; color: var(--lime);
  margin-bottom: 16px;
}
.fw-sec-tag-dark {
  background: rgba(255,255,255,.06);
  border-color: rgba(255,255,255,.12);
  color: rgba(255,255,255,.5);
}
.fw-sec-h { font-size: clamp(1.9rem, 3.5vw, 3rem); font-weight: 800; margin-bottom: 16px; letter-spacing: -.04em; }
.fw-sec-p { font-size: 1.0625rem; color: var(--text-m); max-width: 520px; line-height: 1.75; }
.fw-sec-p-w { color: rgba(255,255,255,.5); }

/* ═══════════════════════════════════════
   VALUE PROPS (3-col rule)
═══════════════════════════════════════ */
.fw-props {
  display: grid; grid-template-columns: repeat(3,1fr);
  border: 1px solid var(--border-l); border-radius: var(--r-xl);
  overflow: hidden; margin-top: 60px;
}
.fw-prop {
  padding: 40px; border-right: 1px solid var(--border-l);
  transition: background .25s, transform .25s, box-shadow .25s;
  position: relative;
}
.fw-prop:last-child { border-right: none; }
.fw-prop:hover {
  background: var(--off-white);
  transform: translateY(-3px);
  box-shadow: 0 12px 32px rgba(53,46,255,.06);
  z-index: 1;
}
.fw-prop::after {
  content: '';
  position: absolute; bottom: 0; left: 0; right: 0; height: 2px;
  background: linear-gradient(90deg, #352EFF, #A78BFA);
  opacity: 0; transition: opacity .25s;
}
.fw-prop:hover::after { opacity: 1; }
.fw-prop-num {
  font-family: var(--font-h); font-size: 3.5rem; font-weight: 800;
  letter-spacing: -.06em; line-height: 1; margin-bottom: 10px;
  background: linear-gradient(135deg, #352EFF 0%, #7B6FF8 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}
.fw-prop-dark .fw-prop-num { color: var(--lime); }
.fw-prop-h { font-size: 1.0625rem; font-weight: 700; margin-bottom: 8px; }
.fw-prop-p { font-size: .875rem; color: var(--text-m); line-height: 1.65; }

/* ═══════════════════════════════════════
   PLATFORM TABS (dark section)
═══════════════════════════════════════ */
.fw-ptabs {
  display: flex; gap: 6px; margin: 40px 0 48px; flex-wrap: wrap;
}
.fw-ptab {
  padding: 8px 18px; border-radius: var(--r-pill);
  font-size: .8125rem; font-weight: 500;
  cursor: pointer; font-family: var(--font-b);
  border: 1px solid var(--border-d);
  background: transparent; color: var(--text-mw);
  transition: all .18s;
}
.fw-ptab:hover { color: var(--white); border-color: var(--border-d2); }
.fw-ptab.a {
  background: var(--lime); border-color: var(--lime);
  color: var(--white); font-weight: 700;
}
.fw-plat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 64px; align-items: start; }
.fw-plat-text h3 { font-size: clamp(1.5rem, 2.5vw, 2.25rem); font-weight: 700; letter-spacing: -.04em; margin-bottom: 14px; color: white; }
.fw-plat-text p { font-size: 1rem; color: rgba(255,255,255,.5); line-height: 1.75; margin-bottom: 28px; }
.fw-chklist { list-style: none; display: flex; flex-direction: column; gap: 10px; margin-bottom: 28px; }
.fw-chklist li { display: flex; align-items: flex-start; gap: 10px; font-size: .9375rem; color: rgba(255,255,255,.55); }
.fw-chk {
  width: 18px; height: 18px; border-radius: 50%; flex-shrink: 0; margin-top: 2px;
  background: var(--lime-dim); border: 1px solid rgba(53,46,255,.25);
  display: flex; align-items: center; justify-content: center;
  font-size: .6rem; color: var(--lime); font-weight: 800;
}

.fw-vis-box {
  background: var(--black-3); border: 1px solid var(--border-d);
  border-radius: var(--r-xl); padding: 28px; min-height: 280px;
  position: relative; overflow: hidden;
}
.fw-vis-box::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(53,46,255,.3), transparent);
}
.fw-vis-tag {
  font-size: .65rem; font-weight: 700; letter-spacing: .14em; text-transform: uppercase;
  color: rgba(255,255,255,.25); margin-bottom: 20px; display: block;
}
.fw-vis-grid { display: grid; grid-template-columns: repeat(3,1fr); gap: 8px; }
.fw-vis-node {
  background: var(--black-4); border: 1px solid var(--border-d);
  border-radius: var(--r-sm); padding: 10px 8px; text-align: center;
  font-size: .7rem; font-weight: 600; color: rgba(255,255,255,.35);
  transition: all .2s; cursor: default;
}
.fw-vis-node:hover { border-color: rgba(53,46,255,.3); color: var(--lime); }
.fw-vis-node.hi { border-color: rgba(53,46,255,.4); color: rgba(53,46,255,.9); background: var(--lime-dim2); }
.fw-vis-flow { display: flex; flex-direction: column; gap: 8px; }
.fw-vis-step {
  display: flex; align-items: center; gap: 12px;
  background: var(--black-4); border: 1px solid var(--border-d);
  border-radius: var(--r-sm); padding: 10px 14px;
}
.fw-vis-sn {
  width: 22px; height: 22px; border-radius: 50%;
  background: var(--lime); flex-shrink: 0;
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-h); font-size: .65rem; font-weight: 800; color: var(--white);
}
.fw-vis-step h5 { font-size: .8rem; font-weight: 600; color: white; }
.fw-vis-step p  { font-size: .7rem; color: rgba(255,255,255,.35); }
.fw-vis-svcs { display: flex; flex-direction: column; gap: 8px; }
.fw-vis-svc {
  display: flex; align-items: center; justify-content: space-between;
  background: var(--black-4); border: 1px solid var(--border-d);
  border-radius: var(--r-sm); padding: 10px 14px;
}
.fw-vis-svc-name { font-size: .8rem; font-weight: 500; color: rgba(255,255,255,.65); }
.fw-vis-svc-st { display: flex; align-items: center; gap: 5px; font-size: .7rem; font-weight: 600; color: #4ADE80; }
.fw-vis-svc-d { width: 5px; height: 5px; background: #4ADE80; border-radius: 50%; animation: fw-blink 1.4s ease-in-out infinite; }
.fw-vis-prods { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; }
.fw-vis-prod {
  background: var(--black-4); border: 1px solid var(--border-d);
  border-radius: var(--r-sm); padding: 12px;
  transition: border-color .18s;
}
.fw-vis-prod:hover { border-color: rgba(53,46,255,.3); }
.fw-vis-prod-n { font-size: .8rem; font-weight: 700; color: rgba(255,255,255,.7); margin-bottom: 3px; }
.fw-vis-prod-d { font-size: .65rem; color: rgba(255,255,255,.3); }

/* ═══════════════════════════════════════
   AI AGENTS
═══════════════════════════════════════ */
.fw-agents {
  display: grid; grid-template-columns: repeat(3,1fr);
  border: 1px solid var(--border-l); border-radius: var(--r-xl);
  overflow: hidden; margin-top: 60px;
}
.fw-agent {
  padding: 36px; border-right: 1px solid var(--border-l);
  border-bottom: 1px solid var(--border-l);
  transition: background .25s, box-shadow .25s, transform .25s; position: relative;
  overflow: hidden;
}
.fw-agent:nth-child(3), .fw-agent:nth-child(6) { border-right: none; }
.fw-agent:nth-child(4), .fw-agent:nth-child(5), .fw-agent:nth-child(6) { border-bottom: none; }
.fw-agent:hover {
  background: var(--white);
  box-shadow: 0 8px 32px rgba(53,46,255,.08);
  transform: translateY(-2px);
  z-index: 1;
}
.fw-agent::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 3px;
  background: var(--agent-color, var(--lime)); opacity: 0; transition: opacity .25s;
}
.fw-agent:hover::before { opacity: 1; }
.fw-agent-avatar {
  width: 44px; height: 44px; border-radius: var(--r-md);
  background: var(--agent-color, var(--lime));
  display: flex; align-items: center; justify-content: center;
  font-family: var(--font-h); font-size: 1rem; font-weight: 800; color: white;
  margin-bottom: 18px; flex-shrink: 0;
  box-shadow: 0 4px 12px color-mix(in srgb, var(--agent-color, #352EFF) 35%, transparent);
}
.fw-agent-tag {
  display: inline-block; padding: 3px 8px; border-radius: var(--r-xs);
  font-size: .65rem; font-weight: 700; letter-spacing: .1em; text-transform: uppercase;
  color: var(--text-m); background: var(--off-white);
  border: 1px solid var(--border-l); margin-bottom: 12px;
}
.fw-agent-name {
  font-family: var(--font-h); font-size: 1.5rem; font-weight: 800;
  letter-spacing: -.04em; color: var(--text-d); margin-bottom: 8px;
}
.fw-agent-desc { font-size: .875rem; color: var(--text-m); line-height: 1.6; }
.fw-agent-pill {
  display: inline-block; margin-top: 14px; padding: 3px 10px;
  background: rgba(53,46,255,.1); border: 1px solid rgba(53,46,255,.25);
  border-radius: var(--r-xs);
  font-size: .65rem; color: #352EFF; font-weight: 700; letter-spacing: .06em;
}

/* ═══════════════════════════════════════
   STATS SECTION (dark)
═══════════════════════════════════════ */
.fw-stats {
  display: grid; grid-template-columns: repeat(4,1fr);
  border: 1px solid var(--border-d); border-radius: var(--r-xl);
  overflow: hidden; margin-top: 60px;
}
.fw-stat {
  padding: 48px 36px; border-right: 1px solid var(--border-d); text-align: center;
}
.fw-stat:last-child { border-right: none; }
.fw-stat-val {
  font-family: var(--font-h); font-size: clamp(2.5rem, 4vw, 3.5rem);
  font-weight: 800; letter-spacing: -.06em; line-height: 1;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #ffffff 0%, rgba(255,255,255,.7) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  display: inline-block;
}
.fw-stat-val span {
  background: linear-gradient(135deg, #7B6FF8 0%, #A78BFA 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.fw-stat-lbl { font-size: .9375rem; color: rgba(255,255,255,.4); }
.fw-stat-sub { font-size: .75rem; color: rgba(255,255,255,.2); margin-top: 4px; }

/* ═══════════════════════════════════════
   HOW IT WORKS
═══════════════════════════════════════ */
.fw-steps {
  display: grid; grid-template-columns: repeat(3,1fr);
  gap: 0; border: 1px solid var(--border-l);
  border-radius: var(--r-xl); overflow: hidden;
  margin-top: 60px;
}
.fw-step {
  padding: 40px; border-right: 1px solid var(--border-l);
  position: relative;
}
.fw-step:last-child { border-right: none; }
.fw-step-num {
  font-family: var(--font-h); font-size: 3rem; font-weight: 800;
  letter-spacing: -.06em; color: var(--off-white);
  line-height: 1; margin-bottom: 20px;
}
.fw-step h4 { font-size: 1.0625rem; font-weight: 700; margin-bottom: 8px; }
.fw-step p { font-size: .875rem; color: var(--text-m); line-height: 1.65; }

/* ═══════════════════════════════════════
   COMPLIANCE
═══════════════════════════════════════ */
.fw-comps {
  display: flex; gap: 0;
  border: 1px solid var(--border-l); border-radius: var(--r-xl);
  overflow: hidden; margin-top: 60px;
}
.fw-comp {
  flex: 1; padding: 32px 20px; text-align: center;
  border-right: 1px solid var(--border-l);
  transition: background .2s;
}
.fw-comp:last-child { border-right: none; }
.fw-comp:hover { background: var(--off-white); }
.fw-comp-icon { font-size: 1.75rem; margin-bottom: 10px; }
.fw-comp-name { font-family: var(--font-h); font-size: .9375rem; font-weight: 700; margin-bottom: 4px; }
.fw-comp-desc { font-size: .75rem; color: var(--text-m); }

/* ═══════════════════════════════════════
   CTA — dark
═══════════════════════════════════════ */
.fw-cta-box {
  border: 1px solid rgba(53,46,255,.2); border-radius: var(--r-xl);
  padding: 80px 64px; text-align: center;
  background: linear-gradient(135deg, #0A0A1E 0%, #120E3A 40%, #0A0A1E 100%);
  position: relative; overflow: hidden;
}
.fw-cta-box::before {
  content: ''; position: absolute; top: 0; left: 0; right: 0; height: 1px;
  background: linear-gradient(90deg, transparent, rgba(123,111,248,.6), transparent);
}
.fw-cta-box::after {
  content: ''; position: absolute;
  top: 50%; left: 50%; transform: translate(-50%, -50%);
  width: 700px; height: 400px;
  background: radial-gradient(ellipse at 30% 40%, rgba(53,46,255,.12), transparent 60%),
              radial-gradient(ellipse at 70% 60%, rgba(167,139,250,.08), transparent 50%);
  pointer-events: none;
}
.fw-cta-box h2 { font-size: clamp(2rem, 4vw, 3rem); font-weight: 800; letter-spacing: -.05em; color: white; margin-bottom: 14px; position: relative; z-index: 1; }
.fw-cta-box p { font-size: 1.0625rem; color: rgba(255,255,255,.45); margin-bottom: 36px; position: relative; z-index: 1; }
.fw-cta-acts { display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; position: relative; z-index: 1; }

/* ═══════════════════════════════════════
   FOOTER
═══════════════════════════════════════ */
.fw-footer { border-top: 1px solid var(--border-l); padding: 64px 40px 32px; background: white; }
.fw-footer-inner { max-width: var(--max-w); margin: 0 auto; }
.fw-footer-top { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 60px; margin-bottom: 56px; }
.fw-footer-brand p { font-size: .875rem; color: var(--text-m); margin: 12px 0 20px; max-width: 240px; line-height: 1.65; }
.fw-footer-col h5 {
  font-family: var(--font-h); font-size: .7rem; font-weight: 700;
  letter-spacing: .12em; text-transform: uppercase; color: var(--text-s);
  margin-bottom: 16px;
}
.fw-footer-col ul { list-style: none; display: flex; flex-direction: column; gap: 10px; }
.fw-footer-col ul a { font-size: .875rem; color: var(--text-m); transition: color .18s; }
.fw-footer-col ul a:hover { color: var(--text-d); }
.fw-footer-btm {
  display: flex; align-items: center; justify-content: space-between;
  padding-top: 24px; border-top: 1px solid var(--border-l);
  font-size: .8125rem; color: var(--text-s);
}
.fw-footer-links { display: flex; gap: 24px; }
.fw-footer-links a { font-size: .8125rem; color: var(--text-s); transition: color .18s; }
.fw-footer-links a:hover { color: var(--text-m); }
.fw-socials { display: flex; gap: 8px; }
.fw-soc {
  width: 32px; height: 32px; border-radius: var(--r-sm);
  border: 1px solid var(--border-l); background: transparent;
  display: flex; align-items: center; justify-content: center;
  font-size: .75rem; color: var(--text-s); cursor: pointer;
  transition: all .18s; text-decoration: none;
}
.fw-soc:hover { border-color: var(--lime); color: var(--text-d); }

/* ═══════════════════════════════════════
   ENHANCED ANIMATIONS & TRANSITIONS
═══════════════════════════════════════ */

/* ── Scroll progress bar ── */
.fw-progress-bar {
  position: fixed; top: 0; left: 0; z-index: 1001;
  height: 2.5px; width: 0%;
  background: linear-gradient(90deg, #352EFF, #7B6FF8, #A78BFA);
  transition: width .08s linear;
  pointer-events: none;
}

/* ── Hero floating orbs ── */
@keyframes fw-orb-drift {
  0%,100% { transform: translate(0,0) scale(1); }
  30%     { transform: translate(30px,-25px) scale(1.04); }
  65%     { transform: translate(-18px,18px) scale(.97); }
}
.fw-hero-orb { display: none; }
.fw-hero-orb-1 {
  width: 520px; height: 520px;
  background: radial-gradient(circle, rgba(53,46,255,.09) 0%, transparent 65%);
  top: -10%; right: -6%;
  animation: fw-orb-drift 16s ease-in-out infinite;
}
.fw-hero-orb-2 {
  width: 360px; height: 360px;
  background: radial-gradient(circle, rgba(123,111,248,.07) 0%, transparent 65%);
  bottom: -2%; left: 2%;
  animation: fw-orb-drift 21s 5s ease-in-out infinite reverse;
}

/* ── Hero gradient text animation ── */
@keyframes fw-grad-anim {
  0%,100% { background-position: 0% 50%; }
  50%     { background-position: 100% 50%; }
}

/* ── Directional reveals ── */
.fw-r-left {
  opacity: 0; transform: translateX(-36px);
  transition: opacity .85s cubic-bezier(.2,1,.3,1), transform .85s cubic-bezier(.2,1,.3,1);
}
.fw-r-left.fw-v { opacity: 1; transform: translateX(0); }
.fw-r-right {
  opacity: 0; transform: translateX(36px);
  transition: opacity .85s cubic-bezier(.2,1,.3,1), transform .85s cubic-bezier(.2,1,.3,1);
}
.fw-r-right.fw-v { opacity: 1; transform: translateX(0); }
.fw-r-scale {
  opacity: 0; transform: scale(.93);
  transition: opacity .7s cubic-bezier(.2,1,.3,1), transform .7s cubic-bezier(.2,1,.3,1);
}
.fw-r-scale.fw-v { opacity: 1; transform: scale(1); }

/* ── Button shimmer ── */
.fw-btn-lime { position: relative; overflow: hidden; }
.fw-btn-lime::after {
  content: '';
  position: absolute; inset: 0; z-index: 1;
  background: linear-gradient(105deg, transparent 25%, rgba(255,255,255,.3) 50%, transparent 75%);
  transform: translateX(-130%);
  transition: transform .6s ease;
  pointer-events: none;
}
.fw-btn-lime:hover::after { transform: translateX(130%); }

/* ── Ghost button hover fill ── */
.fw-btn-ghost-light {
  position: relative; overflow: hidden;
  transition: color .2s, border-color .2s, background .2s;
}
.fw-btn-ghost-light:hover {
  background: rgba(53,46,255,.06);
  border-color: rgba(53,46,255,.3);
  color: var(--lime);
}

/* ── Logo mark hover ── */
.fw-logo-mark { transition: transform .35s cubic-bezier(.2,1,.3,1), box-shadow .35s; }
.fw-logo:hover .fw-logo-mark {
  transform: rotate(-8deg) scale(1.08);
  box-shadow: 0 4px 18px rgba(53,46,255,.5);
}

/* ── Nav link underline ── */
.fw-nav-link { position: relative; }
.fw-nav-link::after {
  content: '';
  position: absolute; bottom: 2px; left: 12px; right: 12px;
  height: 1.5px; background: var(--lime);
  transform: scaleX(0); transform-origin: center;
  transition: transform .25s ease;
}
.fw-nav-link:hover::after { transform: scaleX(1); }

/* ── Platform tab content transition ── */
@keyframes fw-tab-in {
  from { opacity: 0; transform: translateY(14px); }
  to   { opacity: 1; transform: translateY(0); }
}
.fw-plat-anim { animation: fw-tab-in .42s cubic-bezier(.2,1,.3,1) both; }

/* ── 3D Tilt card ── */
.fw-tilt-card { will-change: transform; }

/* ── Step cards hover ── */
.fw-step { transition: background .25s, transform .25s, box-shadow .25s; }
.fw-step:hover {
  background: white;
  transform: translateY(-3px);
  box-shadow: 0 10px 32px rgba(0,0,0,.07);
  z-index: 1;
}
.fw-step-num { transition: color .3s; }
.fw-step:hover .fw-step-num { color: rgba(53,46,255,.18); }

/* ── Compliance icon bounce ── */
@keyframes fw-bounce-icon {
  0%,100% { transform: scale(1) translateY(0); }
  40%     { transform: scale(1.2) translateY(-6px); }
  70%     { transform: scale(1.05) translateY(-2px); }
}
.fw-comp { transition: background .2s, transform .2s; }
.fw-comp:hover { background: var(--off-white); transform: translateY(-2px); }
.fw-comp:hover .fw-comp-icon { animation: fw-bounce-icon .45s ease both; }

/* ── Animated connector dot (SVG circle) ── */
@keyframes fw-dot-travel {
  0%   { transform: translateX(0px);  opacity: 0; }
  8%   { opacity: 1; }
  92%  { opacity: 1; }
  100% { transform: translateX(32px); opacity: 0; }
}

/* ── Stat row hover ── */
.fw-stat { transition: background .25s; }
.fw-stat:hover { background: rgba(53,46,255,.05); }

/* ── CTA button glow ── */
.fw-cta-acts .fw-btn-lime:hover {
  box-shadow: 0 6px 28px rgba(53,46,255,.5);
}


/* ─ Smooth footer link hover ── */
.fw-footer-col ul a { position: relative; display: inline-block; }
.fw-footer-col ul a::after {
  content: '';
  position: absolute; bottom: -1px; left: 0;
  width: 0; height: 1px;
  background: var(--lime); transition: width .25s ease;
}
.fw-footer-col ul a:hover::after { width: 100%; }

/* ── Social icon hover ── */
.fw-soc { transition: all .2s cubic-bezier(.2,1,.3,1); }
.fw-soc:hover {
  border-color: var(--lime);
  background: rgba(53,46,255,.06);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(53,46,255,.2);
}

/* ── RESPONSIVE ── */
@media(max-width:1024px){
  .fw-nav { padding: 0 24px; }
  .fw-sec { padding: 72px 24px; }
  .fw-trust { padding: 24px; }
}
@media(max-width:900px){
  .fw-nav-links { display: none; }
  .fw-hero-inner { grid-template-columns: 1fr; }
  .fw-flow-vis { display: none; }
  .fw-props { grid-template-columns: 1fr; }
  .fw-prop { border-right: none; border-bottom: 1px solid var(--border-l); }
  .fw-prop:last-child { border-bottom: none; }
  .fw-plat-grid { grid-template-columns: 1fr; }
  .fw-agents { grid-template-columns: 1fr 1fr; }
  .fw-agent:nth-child(3) { border-right: 1px solid var(--border-l); }
  .fw-agent:nth-child(4) { border-bottom: 1px solid var(--border-l); }
  .fw-agent:nth-child(2n) { border-right: none; }
  .fw-stats { grid-template-columns: 1fr 1fr; }
  .fw-stat:nth-child(2) { border-right: none; }
  .fw-stat:nth-child(1),.fw-stat:nth-child(2) { border-bottom: 1px solid var(--border-d); }
  .fw-steps { grid-template-columns: 1fr; }
  .fw-step { border-right: none; border-bottom: 1px solid var(--border-l); }
  .fw-step:last-child { border-bottom: none; }
  .fw-comps { flex-wrap: wrap; }
  .fw-comp { min-width: calc(50% - 1px); }
  .fw-footer-top { grid-template-columns: 1fr 1fr; }
  .fw-cta-box { padding: 48px 28px; }
  .fw-trust-inner { flex-direction: column; gap: 16px; }
}
@media(max-width:560px){
  .fw-agents { grid-template-columns: 1fr; }
  .fw-agent { border-right: none; }
  .fw-footer-top { grid-template-columns: 1fr; }
  .fw-hero-strip { flex-wrap: wrap; gap: 24px; }
}
`;

// ── DATA ──────────────────────────────────────────────────────
const TABS = [
  {
    label: 'Catalyst X', title: 'Middleware Built for Speed',
    desc: 'Pre-built connectors that link your legacy systems, cloud infrastructure, and partner ecosystem in days — not months. No custom glue code required.',
    features: ['200+ certified financial integrations', 'Real-time bidirectional data sync', 'Temenos, Mambu & Finacle ready', 'Event-driven microservices'],
    vis: 'connectors',
  },
  {
    label: 'VisionCraft', title: 'Strategy That Scales',
    desc: 'Digital transformation consulting backed by deep fintech domain expertise. We map your roadmap, enable your teams, and align stakeholders at every level.',
    features: ['End-to-end transformation roadmaps', 'Team upskilling & change management', 'Vendor-neutral architecture advisory', 'ROI-driven milestone planning'],
    vis: 'flow',
  },
  {
    label: 'RunSync', title: 'Managed Operations at Scale',
    desc: 'From real-time monitoring to automated incident response, RunSync keeps your fintech stack running at peak performance with SLA-backed guarantees.',
    features: ['24/7 managed platform operations', '99.99% uptime SLA guarantee', 'Automated detection & self-healing', 'Continuous performance optimisation'],
    vis: 'services',
  },
  {
    label: 'InnovateEdge', title: 'Custom Products, Fast',
    desc: 'Build proprietary fintech products with our composable component framework. Go from concept to production-grade in weeks, compliance built in from day one.',
    features: ['Composable product building blocks', 'Compliance-first architecture', 'White-label & multi-tenant ready', 'API-first, mobile-native'],
    vis: 'products',
  },
];

const AGENTS = [
  { name: 'NOVA',      tag: 'Credit Risk',     desc: 'AI-powered risk engine assessing borrower profiles with precision using alternative data beyond traditional bureau scores.',   pill: 'Alternative Data', color: '#352EFF', initial: 'N' },
  { name: 'GreyCells', tag: 'Underwriting',    desc: 'Automated underwriting that processes thousands of applications simultaneously with fully explainable AI-driven decisions.',    pill: 'Explainable AI',   color: '#7C3AED', initial: 'G' },
  { name: 'VISTA',     tag: 'Fraud Detection', desc: 'Real-time transaction monitoring that identifies fraudulent patterns before they impact your customers or portfolio.',           pill: 'Real-time',        color: '#0891B2', initial: 'V' },
  { name: 'AURA',      tag: 'Collections',     desc: 'Predictive collections intelligence that maximises recovery rates while preserving long-term customer relationships.',           pill: 'Predictive',       color: '#059669', initial: 'A' },
  { name: 'LUMA',      tag: 'Analytics',       desc: 'Portfolio analytics engine that surfaces hidden performance insights and forecasts credit trends before they become events.',    pill: 'Forecasting',      color: '#D97706', initial: 'L' },
  { name: 'MIND',      tag: 'Decisioning',     desc: 'Orchestration layer connecting all AI agents into one unified, real-time lending decisioning platform.',                        pill: 'Orchestration',    color: '#DB2777', initial: 'M' },
];

const COMPLIANCE = [
  { icon: '🔒', name: 'PCI DSS',      desc: 'Level 1 Certified' },
  { icon: '🛡️', name: 'ISO 27001',    desc: 'Information Security' },
  { icon: '☁️', name: 'SOC 2 Type II',desc: 'Trust Services' },
  { icon: '🇪🇺', name: 'GDPR',         desc: 'Data Protection' },
  { icon: '🇮🇳', name: 'DPDP',         desc: 'Digital Personal Data' },
];

// ── HERO FLOW DIAGRAM ─────────────────────────────────────────
// Mimics Naka's flow card visual: source → F-badge → destination
function FlowDiagram() {
  return (
    <div className="fw-flow-vis" style={{ width: '100%', maxWidth: 380 }}>
      {/* Row: [USDT card]  →→→  [F badge]  →→→  [Bank card] */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', justifyContent: 'center' }}>

        {/* LEFT CARD */}
        <div className="fw-fcard" style={{ animation: 'fw-rise .7s .4s ease both', opacity: 0, animationFillMode: 'both' }}>
          <div className="fw-fcard-icon" style={{ background: 'rgba(38,161,123,.15)', color: '#26A17B', fontSize: 20 }}>₮</div>
          <div className="fw-fcard-info">
            <strong>1,200 USDT</strong>
            <span>Stablecoin balance</span>
          </div>
        </div>

        {/* CONNECTOR LINE RIGHT */}
        <div style={{ flex: 1, position: 'relative', height: 12, minWidth: 24, maxWidth: 40 }}>
          <svg width="100%" height="12" viewBox="0 0 40 12" preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
            <line x1="0" y1="6" x2="36" y2="6"
              stroke="rgba(53,46,255,.5)" strokeWidth="1.5"
              strokeDasharray="4 3"
              style={{ animation: 'fw-draw-right 1s .9s ease both', strokeDashoffset: 120 }}
            />
            <polygon points="34,3 40,6 34,9" fill="rgba(53,46,255,.7)"
              style={{ animation: 'fw-arrow-r .3s 1.8s ease both', opacity: 0, animationFillMode: 'both' }}
            />
            <circle r="2.5" cy="6" cx="4" fill="#352EFF"
              style={{ animation: 'fw-dot-travel 2.2s 2s ease-in-out infinite', opacity: 0 }}
            />
          </svg>
        </div>

        {/* CENTER BADGE */}
        <div className="fw-center-badge" style={{ animation: 'fw-lime-pulse 3s ease-in-out infinite, fw-rise .6s .55s ease both', opacity: 0, animationFillMode: 'both' }}>
          <div className="fw-center-badge-f">F</div>
        </div>

        {/* CONNECTOR LINE RIGHT */}
        <div style={{ flex: 1, position: 'relative', height: 12, minWidth: 24, maxWidth: 40 }}>
          <svg width="100%" height="12" viewBox="0 0 40 12" preserveAspectRatio="none"
            style={{ position: 'absolute', top: 0, left: 0, overflow: 'visible' }}>
            <line x1="0" y1="6" x2="36" y2="6"
              stroke="rgba(53,46,255,.5)" strokeWidth="1.5"
              strokeDasharray="4 3"
              style={{ animation: 'fw-draw-right 1s 1.2s ease both', strokeDashoffset: 120 }}
            />
            <polygon points="34,3 40,6 34,9" fill="rgba(53,46,255,.7)"
              style={{ animation: 'fw-arrow-r .3s 2s ease both', opacity: 0, animationFillMode: 'both' }}
            />
            <circle r="2.5" cy="6" cx="4" fill="#352EFF"
              style={{ animation: 'fw-dot-travel 2.2s 2.5s ease-in-out infinite', opacity: 0 }}
            />
          </svg>
        </div>

        {/* RIGHT CARD */}
        <div className="fw-fcard fw-fcard-lime-accent"
          style={{ animation: 'fw-rise .7s .7s ease both', opacity: 0, animationFillMode: 'both',
            background: 'rgba(53,46,255,.06)', border: '1px solid rgba(53,46,255,.18)' }}>
          <div className="fw-fcard-icon" style={{ background: 'rgba(53,46,255,.1)', fontSize: 14, fontFamily: "'Outfit', sans-serif", fontWeight: 800, color: '#352EFF' }}>₹</div>
          <div className="fw-fcard-info">
            <strong style={{ color: '#352EFF' }}>₹1,01,000</strong>
            <span>Instant settlement</span>
          </div>
        </div>
      </div>

      {/* SECOND ROW — transaction card */}
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', animation: 'fw-rise .7s .85s ease both', opacity: 0, animationFillMode: 'both' }}>
        <div style={{
          background: '#ffffff', border: '1px solid #E8E8E8',
          borderRadius: 12, padding: '12px 20px', display: 'flex', alignItems: 'center', gap: 32,
          boxShadow: '0 2px 12px rgba(0,0,0,.06)'
        }}>
          {[
            { v: '4,230', l: 'Transactions today' },
            { v: '0.03%', l: 'Fraud rate' },
            { v: '< 2s',  l: 'Avg settlement' },
          ].map(s => (
            <div key={s.l} style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'var(--font-h)', fontSize: '1rem', fontWeight: 700, color: '#0A0A0A', letterSpacing: '-.03em', lineHeight: 1 }}>{s.v}</div>
              <div style={{ fontSize: '.65rem', color: '#6B6B6B', marginTop: 3 }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ── PLATFORM VISUALS ─────────────────────────────────────────
function VisConn() {
  const nodes = ['Temenos', 'Mambu', 'Finacle', 'AWS', 'Azure', 'Stripe', 'Plaid', 'Twilio', 'KYC API'];
  return <>
    <span className="fw-vis-tag">Integration Ecosystem</span>
    <div className="fw-vis-grid">
      {nodes.map((n, i) => <div key={n} className={`fw-vis-node${[0,2,6].includes(i) ? ' hi' : ''}`}>{n}</div>)}
    </div>
  </>;
}
function VisFlow() {
  return <>
    <span className="fw-vis-tag">Transformation Journey</span>
    <div className="fw-vis-flow">
      {[{ n: '1', t: 'Discovery & Assessment', d: 'Audit & gap analysis' },
        { n: '2', t: 'Roadmap Design', d: 'Milestones with ROI targets' },
        { n: '3', t: 'Build & Enable', d: 'Enablement + implementation' },
        { n: '4', t: 'Scale & Optimise', d: 'Continuous improvement' },
      ].map(s => (
        <div key={s.n} className="fw-vis-step">
          <div className="fw-vis-sn">{s.n}</div>
          <div><h5>{s.t}</h5><p>{s.d}</p></div>
        </div>
      ))}
    </div>
  </>;
}
function VisSvc() {
  return <>
    <span className="fw-vis-tag">Live Platform Status</span>
    <div className="fw-vis-svcs">
      {['Core Banking Gateway', 'Payments Processor', 'KYC Orchestrator', 'Fraud Engine', 'Reporting API', 'Notification Hub'].map(s => (
        <div key={s} className="fw-vis-svc">
          <span className="fw-vis-svc-name">{s}</span>
          <span className="fw-vis-svc-st"><span className="fw-vis-svc-d" />Operational</span>
        </div>
      ))}
    </div>
  </>;
}
function VisProd() {
  return <>
    <span className="fw-vis-tag">Composable Product Layer</span>
    <div className="fw-vis-prods">
      {[
        { n: 'Digital Wallet', d: 'Multi-currency' },
        { n: 'Lending Engine', d: 'End-to-end origination' },
        { n: 'KYC / AML', d: 'Automated compliance' },
        { n: 'Open Banking', d: 'PSD2 & AA ready' },
        { n: 'Treasury Mgmt', d: 'Liquidity & positions' },
        { n: 'Consent Hub', d: 'Privacy orchestration' },
      ].map(p => (
        <div key={p.n} className="fw-vis-prod">
          <div className="fw-vis-prod-n">{p.n}</div>
          <div className="fw-vis-prod-d">{p.d}</div>
        </div>
      ))}
    </div>
  </>;
}

// ── MAIN ──────────────────────────────────────────────────────
export default function FyscalWebsite() {
  const [scrolled, setScrolled] = useState(false);
  const [tab, setTab]     = useState(0);

  useEffect(() => {
    // ── Scroll: nav shadow + progress bar ──
    const progressBar = document.querySelector('.fw-progress-bar');
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      if (progressBar) {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        progressBar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });

    // ── Scroll reveals (all variants) ──
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('fw-v'); }),
      { threshold: .08, rootMargin: '0px 0px -30px 0px' }
    );
    document.querySelectorAll('.fw-r, .fw-r-left, .fw-r-right, .fw-r-scale').forEach(el => obs.observe(el));

    // ── Counter animation ──
    const counterObs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        const el = e.target;
        const target = parseFloat(el.dataset.count);
        const decimals = (String(target).split('.')[1] || '').length;
        const duration = 1600;
        const start = performance.now();
        const tick = now => {
          const t = Math.min((now - start) / duration, 1);
          const ease = 1 - Math.pow(1 - t, 4);
          const val = target * ease;
          el.textContent = decimals ? val.toFixed(decimals) : Math.floor(val);
          if (t < 1) requestAnimationFrame(tick);
          else el.textContent = decimals ? target.toFixed(decimals) : target;
        };
        requestAnimationFrame(tick);
        counterObs.unobserve(el);
      });
    }, { threshold: .6 });
    document.querySelectorAll('[data-count]').forEach(el => counterObs.observe(el));

    // ── 3D tilt on agent + prop cards ──
    const tiltCards = document.querySelectorAll('.fw-tilt-card');
    const tiltHandlers = [];
    tiltCards.forEach(card => {
      const onMove = e => {
        const r = card.getBoundingClientRect();
        const x = ((e.clientX - r.left) / r.width  - .5) * 10;
        const y = ((e.clientY - r.top)  / r.height - .5) * 10;
        card.style.transform = `perspective(700px) rotateY(${x}deg) rotateX(${-y}deg) translateZ(6px)`;
        card.style.boxShadow = `${-x * .8}px ${y * .8}px 28px rgba(53,46,255,.1)`;
        card.style.transition = 'transform .12s ease, box-shadow .12s ease';
      };
      const onLeave = () => {
        card.style.transform = '';
        card.style.boxShadow = '';
        card.style.transition = 'transform .45s cubic-bezier(.2,1,.3,1), box-shadow .45s';
      };
      card.addEventListener('mousemove', onMove);
      card.addEventListener('mouseleave', onLeave);
      tiltHandlers.push({ card, onMove, onLeave });
    });

    return () => {
      window.removeEventListener('scroll', onScroll);
      obs.disconnect();
      counterObs.disconnect();
      tiltHandlers.forEach(({ card, onMove, onLeave }) => {
        card.removeEventListener('mousemove', onMove);
        card.removeEventListener('mouseleave', onLeave);
      });
    };
  }, []);

  const t = TABS[tab];

  return (
    <div className="fw">
      <style>{CSS}</style>
      <div className="fw-progress-bar" />

      {/* ── NAV ── */}
      <nav className={`fw-nav light${scrolled ? ' scrolled' : ''}`}>
        <a href="#" className="fw-logo">
          <div className="fw-logo-mark" />
          <span className="fw-logo-name">FyscalTech</span>
        </a>
        <ul className="fw-nav-links">
          {['Platform', 'AI Agents', 'Solutions', 'Compliance', 'About'].map(l =>
            <li key={l}><a href="#" className="fw-nav-link">{l}</a></li>
          )}
        </ul>
        <div className="fw-nav-end">
          <a href="#" className="fw-btn fw-btn-ghost-light">Log in</a>
          <a href="#" className="fw-btn fw-btn-lime">Book a Demo →</a>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section className="fw-hero">
        <div className="fw-hero-orb fw-hero-orb-1" />
        <div className="fw-hero-orb fw-hero-orb-2" />
        <div className="fw-hero-grid" />
        <div className="fw-hero-noise" />
        <div className="fw-hero-inner">
          <h1>Build Smarter.<br /><em>Modernise Faster.</em></h1>
          <p className="fw-hero-sub">
            The AI-powered fintech platform that helps banks and financial
            institutions go from legacy to live — in weeks, not years.
            Zero vendor lock-in. Compliance built in.
          </p>
          <div className="fw-hero-acts">
            <a href="#" className="fw-hero-cta">BOOK A STRATEGY CALL <span>→</span></a>
          </div>
          <div className="fw-hero-clients">
            <div className="fw-hero-marquee-outer">
              <div className="fw-hero-marquee-track">
                {['HDFC Fintech', 'NeoBank India', 'PayCraft', 'Axis Finserv', 'LendFirst', 'ClearPay', 'FinEdge', 'NovaPay', 'CreditFlow', 'BankTech',
                  'HDFC Fintech', 'NeoBank India', 'PayCraft', 'Axis Finserv', 'LendFirst', 'ClearPay', 'FinEdge', 'NovaPay', 'CreditFlow', 'BankTech'].map((l, i) => (
                  <span key={i} className="fw-hero-marquee-item">
                    <span className="fw-hero-marquee-sep">·</span>{l}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── VALUE PROPS ── */}
      <section className="fw-sec fw-sec-white">
        <div className="fw-wrap">
          <div className="fw-r">
            <span className="fw-sec-tag">Why Fyscal</span>
            <h2 className="fw-sec-h">The unfair advantage<br />for modern finance</h2>
            <p className="fw-sec-p">Legacy platforms move at legacy speed. Fyscal is purpose-built for the velocity that today's financial markets demand.</p>
          </div>
          <div className="fw-props">
            {[
              { num: '80%', h: 'Faster Time-to-Market',  p: 'Go from RFP to production in weeks with pre-built components, certified connectors, and dedicated delivery support.' },
              { num: '0',   h: 'Zero Vendor Lock-in',    p: 'Modular API-first architecture means you own your stack entirely. Swap components or migrate — freely, always.' },
              { num: '5×',  h: 'Compliance Built-in',    p: 'PCI DSS, ISO 27001, SOC 2, GDPR, and DPDP compliance is architected in — not bolted on. Audit-ready from day one.' },
            ].map((p, i) => (
              <div key={p.num} className={`fw-prop fw-tilt-card fw-r t${i + 1}`}>
                <div className="fw-prop-num">{p.num}</div>
                <div className="fw-prop-h">{p.h}</div>
                <div className="fw-prop-p">{p.p}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── PLATFORM ── */}
      <section className="fw-sec fw-sec-dark">
        <div className="fw-wrap">
          <div className="fw-r">
            <span className="fw-sec-tag fw-sec-tag-dark">The Platform</span>
            <h2 className="fw-sec-h" style={{ color: 'white' }}>Four pillars.<br />One platform.</h2>
            <p className="fw-sec-p fw-sec-p-w">Every component works independently or together — giving you the right level of transformation for your organisation.</p>
          </div>
          <div className="fw-ptabs">
            {TABS.map((tb, i) =>
              <button key={tb.label} className={`fw-ptab${tab === i ? ' a' : ''}`} onClick={() => setTab(i)}>
                {tb.label}
              </button>
            )}
          </div>
          <div key={tab} className="fw-plat-grid fw-plat-anim">
            <div className="fw-plat-text">
              <h3>{t.title}</h3>
              <p>{t.desc}</p>
              <ul className="fw-chklist">
                {t.features.map(f => <li key={f}><span className="fw-chk">✓</span>{f}</li>)}
              </ul>
              <a href="#" className="fw-btn fw-btn-lime">Learn More →</a>
            </div>
            <div className="fw-vis-box">
              {t.vis === 'connectors' && <VisConn />}
              {t.vis === 'flow'       && <VisFlow />}
              {t.vis === 'services'   && <VisSvc />}
              {t.vis === 'products'   && <VisProd />}
            </div>
          </div>
        </div>
      </section>

      {/* ── AI AGENTS ── */}
      <section className="fw-sec fw-sec-white">
        <div className="fw-wrap">
          <div className="fw-r">
            <span className="fw-sec-tag">AI-Powered Lending</span>
            <h2 className="fw-sec-h">Meet your AI lending team</h2>
            <p className="fw-sec-p">Six purpose-built AI agents covering every stage of the lending lifecycle — from first application to final recovery.</p>
          </div>
          <div className="fw-agents">
            {AGENTS.map((a, i) => (
              <div key={a.name} className={`fw-agent fw-tilt-card fw-r t${(i % 3) + 1}`}
                style={{ '--agent-color': a.color }}>
                <div className="fw-agent-avatar" style={{ background: a.color }}>{a.initial}</div>
                <div className="fw-agent-tag">{a.tag}</div>
                <div className="fw-agent-name">{a.name}</div>
                <div className="fw-agent-desc">{a.desc}</div>
                <div className="fw-agent-pill" style={{ background: `${a.color}14`, borderColor: `${a.color}30`, color: a.color }}>{a.pill}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="fw-sec fw-sec-dark2">
        <div className="fw-wrap">
          <div className="fw-r">
            <span className="fw-sec-tag fw-sec-tag-dark">By the Numbers</span>
            <h2 className="fw-sec-h" style={{ color: 'white' }}>The results speak<br />for themselves</h2>
          </div>
          <div className="fw-stats">
            {[
              { pre: '$', v: '2', suf: 'B+', l: 'Loans Originated',    s: 'across all deployments',    count: 2,     dec: 0 },
              { pre: '',  v: '50',suf: '+',  l: 'Institutions Served',  s: 'banks, NBFCs & fintechs',   count: 50,    dec: 0 },
              { pre: '',  v: '12',suf: 'wk', l: 'Average Go-Live',      s: 'contract to production',    count: 12,    dec: 0 },
              { pre: '',  v: '99.99', suf: '%', l: 'Platform Uptime',   s: 'SLA-backed guarantee',      count: 99.99, dec: 2 },
            ].map((s, i) => (
              <div key={s.l} className={`fw-stat fw-r t${i + 1}`}>
                <div className="fw-stat-val">
                  {s.pre}<span data-count={s.count} style={{ display:'inline' }}>{s.v}</span><span>{s.suf}</span>
                </div>
                <div className="fw-stat-lbl">{s.l}</div>
                <div className="fw-stat-sub">{s.s}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="fw-sec fw-sec-gray">
        <div className="fw-wrap">
          <div className="fw-r">
            <span className="fw-sec-tag">Getting Started</span>
            <h2 className="fw-sec-h">From discovery to live<br />in 12 weeks</h2>
            <p className="fw-sec-p">A structured, low-friction onboarding that gets your team running on Fyscal — fast.</p>
          </div>
          <div className="fw-steps">
            {[
              { n: '01', h: 'Strategy Call',    p: 'A 60-minute deep dive into your current stack, your goals, and where Fyscal fits. No pitch decks — just honest discovery.' },
              { n: '02', h: 'Custom Blueprint', p: 'We design a tailored plan with milestones, integrations, and compliance coverage aligned to your timeline.' },
              { n: '03', h: 'Build & Go Live',  p: 'Our team deploys alongside yours, with dedicated support through launch and beyond. You go live with confidence.' },
            ].map((s, i) => (
              <div key={s.n} className={`fw-step fw-r t${i + 1}`}>
                <div className="fw-step-num">{s.n}</div>
                <h4>{s.h}</h4>
                <p>{s.p}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── COMPLIANCE ── */}
      <section className="fw-sec fw-sec-white">
        <div className="fw-wrap">
          <div className="fw-r" style={{ textAlign: 'center', maxWidth: 520, margin: '0 auto' }}>
            <span className="fw-sec-tag" style={{ display: 'block', textAlign: 'center' }}>Enterprise Security</span>
            <h2 className="fw-sec-h">Compliance isn't an afterthought</h2>
            <p className="fw-sec-p" style={{ maxWidth: '100%', margin: '0 auto' }}>Every layer of Fyscal is architected to the most rigorous global standards.</p>
          </div>
          <div className="fw-comps fw-r" style={{ marginTop: 48 }}>
            {COMPLIANCE.map(c => (
              <div key={c.name} className="fw-comp">
                <div className="fw-comp-icon">{c.icon}</div>
                <div className="fw-comp-name">{c.name}</div>
                <div className="fw-comp-desc">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="fw-sec fw-sec-dark">
        <div className="fw-wrap">
          <div className="fw-cta-box fw-r">
            <h2>Ready to modernise<br />your financial stack?</h2>
            <p>Join 50+ financial institutions who've cut deployment time by 80%.<br />Your strategy call is free.</p>
            <div className="fw-cta-acts">
              <a href="#" className="fw-btn fw-btn-lime fw-btn-lg">Book a Strategy Call →</a>
              <a href="#" className="fw-btn fw-btn-ghost-dark fw-btn-lg">View Case Studies</a>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="fw-footer">
        <div className="fw-footer-inner">
          <div className="fw-footer-top">
            <div className="fw-footer-brand">
              <a href="#" className="fw-logo" style={{ display: 'inline-flex' }}>
                <div className="fw-logo-mark" style={{ background: 'var(--lime)' }} />
                <span className="fw-logo-name" style={{ color: 'var(--text-d)' }}>FyscalTech</span>
              </a>
              <p>Composable fintech infrastructure for banks, NBFCs, and financial institutions building the next generation of financial products.</p>
              <div className="fw-socials">
                {['𝕏', 'in', '◆', '▲'].map((s, i) => <a key={i} href="#" className="fw-soc">{s}</a>)}
              </div>
            </div>
            <div className="fw-footer-col">
              <h5>Platform</h5>
              <ul>{['Catalyst X', 'VisionCraft', 'RunSync', 'InnovateEdge', 'AI Agents'].map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
            <div className="fw-footer-col">
              <h5>Solutions</h5>
              <ul>{['Digital Banking', 'Lending & Credit', 'Payments', 'KYC / AML', 'Open Banking'].map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
            <div className="fw-footer-col">
              <h5>Company</h5>
              <ul>{['About Us', 'Blog', 'Careers', 'Case Studies', 'Contact'].map(l => <li key={l}><a href="#">{l}</a></li>)}</ul>
            </div>
          </div>
          <div className="fw-footer-btm">
            <span>© 2026 Fyscal Technologies. All rights reserved.</span>
            <div className="fw-footer-links">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Security</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
