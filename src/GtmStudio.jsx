import { useState, useRef, useEffect } from "react";

const VALID_USERS = [
  { email: "demo@fyscaltech.com", password: "FyscalGTM2026", name: "Demo User", role: "Marketing Lead" },
  { email: "admin@fyscaltech.com", password: "Admin@123", name: "Admin", role: "Administrator" },
];

const COLLATERAL_TYPES = [
  { id: "product-launch", label: "Product launch" },
  { id: "case-study", label: "Case study" },
  { id: "white-paper", label: "White paper" },
  { id: "pitch-deck", label: "Pitch deck" },
  { id: "social-carousel", label: "Social Carousel" },
  { id: "social-static", label: "Social Static Post" },
  { id: "video-script", label: "Video Script" },
];

const FIELDS = {
  "product-launch": [
    { id: "productName", label: "Product name", placeholder: "e.g. Digital Wallet Infrastructure", type: "text" },
    { id: "tagline", label: "Tagline", placeholder: "One-line value prop", type: "text" },
    { id: "audience", label: "Target audience", placeholder: "e.g. CTOs at SEA banks", type: "text" },
    { id: "keyFeatures", label: "Key features", placeholder: "List top 3-5 features", type: "textarea" },
    { id: "differentiator", label: "Differentiator", placeholder: "What makes this different?", type: "text" },
    { id: "cta", label: "Call to action", placeholder: "e.g. Book a Strategy Call", type: "text" },
  ],
  "case-study": [
    { id: "customerName", label: "Customer name", placeholder: "Company name", type: "text" },
    { id: "industry", label: "Industry", placeholder: "e.g. Banking, FinTech", type: "text" },
    { id: "challenge", label: "The challenge", placeholder: "What problem did they face?", type: "textarea" },
    { id: "solution", label: "The solution", placeholder: "How did FyscalTech help?", type: "textarea" },
    { id: "results", label: "Key results", placeholder: "e.g. Launched in 3 months vs 18", type: "textarea" },
    { id: "quote", label: "Customer quote", placeholder: "Optional testimonial", type: "textarea" },
  ],
  "white-paper": [
    { id: "title", label: "Paper title", placeholder: "e.g. The Composable Banking Imperative", type: "text" },
    { id: "audience", label: "Target audience", placeholder: "Who will read this?", type: "text" },
    { id: "thesis", label: "Core thesis", placeholder: "The central argument", type: "textarea" },
    { id: "sections", label: "Key sections", placeholder: "List main topics to cover", type: "textarea" },
    { id: "dataPoints", label: "Supporting data", placeholder: "Stats, research, sources", type: "textarea" },
  ],
  "pitch-deck": [
    { id: "company", label: "Company name", placeholder: "Your company", type: "text" },
    { id: "problem", label: "The problem", placeholder: "Market gap or pain point", type: "textarea" },
    { id: "solution", label: "Your solution", placeholder: "How you solve it", type: "textarea" },
    { id: "market", label: "Market size", placeholder: "e.g. SEA digital banking market", type: "text" },
    { id: "traction", label: "Traction", placeholder: "Customers, deployments, metrics", type: "textarea" },
    { id: "ask", label: "The ask", placeholder: "What you want from the audience", type: "text" },
  ],
  "social-carousel": [
    { id: "topic", label: "Topic", placeholder: "What is the carousel about?", type: "text" },
    { id: "platform", label: "Platform", placeholder: "LinkedIn, Instagram, etc.", type: "text" },
    { id: "slides", label: "Number of slides", placeholder: "e.g. 5", type: "text" },
    { id: "hook", label: "Hook / cover angle", placeholder: "First slide hook?", type: "textarea" },
    { id: "keyPoints", label: "Key points per slide", placeholder: "List each slide core message", type: "textarea" },
    { id: "cta", label: "Call to action", placeholder: "e.g. Book a Strategy Call", type: "text" },
  ],
  "social-static": [
    { id: "topic", label: "Topic", placeholder: "What is the post about?", type: "text" },
    { id: "platform", label: "Platform", placeholder: "LinkedIn, Instagram, Twitter/X", type: "text" },
    { id: "tone", label: "Tone", placeholder: "e.g. Authoritative, Conversational", type: "text" },
    { id: "hook", label: "Hook or angle", placeholder: "Key message or angle", type: "textarea" },
    { id: "visualIdea", label: "Visual concept", placeholder: "Describe the image or graphic idea", type: "textarea" },
    { id: "cta", label: "Call to action", placeholder: "e.g. Book a Strategy Call", type: "text" },
  ],
  "video-script": [
    { id: "videoType", label: "Video type", placeholder: "Product Demo / Explainer / Launch", type: "text" },
    { id: "product", label: "Product / pillar focus", placeholder: "e.g. CatalystX, VisionCraft, InnovateEdge, RunSync", type: "text" },
    { id: "audience", label: "Primary audience", placeholder: "e.g. CTOs, Heads of Transaction Banking", type: "text" },
    { id: "coreProblem", label: "Core problem", placeholder: "What pain does the audience feel day-to-day?", type: "textarea" },
    { id: "usp", label: "USP / shift", placeholder: "FyscalTech key answer to this problem", type: "textarea" },
    { id: "keyFeatures", label: "Key capabilities", placeholder: "List 3-4 capabilities, one per sub-section", type: "textarea" },
    { id: "outcomes", label: "Business outcomes", placeholder: "e.g. Products launch in weeks not quarters", type: "textarea" },
    { id: "targetLength", label: "Target length", placeholder: "e.g. 1:40 or 2:00", type: "text" },
    { id: "cta", label: "Call to action", placeholder: "e.g. Book a Strategy Call", type: "text" },
  ],
};

const INTAKE_QUESTIONS = [
  { id: "targetPersona", label: "Who is the primary reader?", placeholder: "e.g. CTO at a mid-size SEA bank, skeptical of vendor promises" },
  { id: "mainMessage", label: "What is the single most important message?", placeholder: "e.g. You can launch a digital wallet in 12 weeks without replacing your core" },
  { id: "desiredAction", label: "What should they do after reading?", placeholder: "e.g. Book a strategy call, share with their team, remember FyscalTech for their next RFP" },
  { id: "toneNotes", label: "Any specific tone or angle notes?", placeholder: "e.g. Avoid technical jargon, lead with business outcomes, reference MAS compliance" },
  { id: "competitors", label: "Any competitors or alternatives to address?", placeholder: "e.g. We are often compared to Mambu and in-house builds" },
];

const BRAND_VOICES = [
  { id: "knowledgeable", label: "Knowledgeable", desc: "Deep fintech & regulatory expertise" },
  { id: "empowering", label: "Empowering", desc: "Partner, not vendor" },
  { id: "down-to-earth", label: "Down-to-earth", desc: "No hype, no jargon" },
  { id: "bold", label: "Bold", desc: "Confident, challenges orthodoxy" },
];

const SURFACE_TONES = {
  "product-launch": ["Bold", "Empowering", "Knowledgeable"],
  "case-study": ["Knowledgeable", "Down-to-earth", "Empowering"],
  "white-paper": ["Knowledgeable", "Down-to-earth", "Empowering"],
  "pitch-deck": ["Bold", "Empowering", "Knowledgeable"],
  "social-carousel": ["Bold", "Empowering", "Down-to-earth"],
  "social-static": ["Down-to-earth", "Bold", "Empowering"],
  "video-script": ["Bold", "Knowledgeable", "Empowering"],
};

const WORKFLOWS = ["Manual review", "Writer -> Editor", "Writer -> Editor -> Approver"];
const STATUSES = ["Draft", "In review", "Approved", "Published"];
const STATUS_STYLES = {
  "Draft":     { bg: "#EFEFEF", color: "#3533A7" },
  "In review": { bg: "#E6EEFF", color: "#0053FF" },
  "Approved":  { bg: "#E8F5E9", color: "#1B5E20" },
  "Published": { bg: "#030192", color: "#FFFFFF" },
};
const UPCOMING = [
  { campaign: "CATALYST X Launch", date: "Apr 2", assets: 4 },
  { campaign: "SEA Banking Summit", date: "Apr 15", assets: 6 },
  { campaign: "Composable Banking Report", date: "May 1", assets: 3 },
];
const FILE_ICONS = { pdf: "PDF", xlsx: "XLS", xls: "XLS", docx: "DOC", doc: "DOC", csv: "CSV", txt: "TXT" };

const PRODUCT = "FyscalTech is a composable modular fintech platform that lets banks launch and modernise digital finance products 80 percent faster without compromising compliance. API-first infrastructure modules including wallets, ledger, payments, KYC/AML, consent orchestration bridge legacy core banking with modern digital channels via pre-built connectors. Service frameworks: CATALYST X for middleware and connectors, VISIONCRAFT for strategy consulting, RUNSYNC for managed services, INNOVATEEDGE for new product development. Target: mid-to-large banks in Southeast Asia. Decision-makers: CTO, CIO, CDO, Head of Digital Banking, CFO. Core problem: banks trapped by legacy cores, build from scratch takes 18-36 months. Differentiators: compliance-ready for MAS/BNM/OJK/BSP, 80 percent faster via CATALYST X, vendor-neutral works with Temenos/Mambu/Finacle/AWS/GCP, PCI DSS/ISO/SOC 2/GDPR/DPDP certified. CTA: Book a Strategy Call at hello@fyscaltech.com. Use: composable, modular, API-first, compliance-ready, modernise, extend, accelerate, enterprise-grade. Avoid: disruptive, rip and replace, revolutionary.";
const STRATEGY = "Apply correct structure per type. Blog: Headline under 60 chars plus hook intro 100-150 words plus 3-5 H2 sections plus conclusion plus meta description. Social: hook first line plus body plus CTA plus hashtags. Case Study: challenge plus solution plus quantified results plus quote plus CTA. Writing: active voice, short paragraphs, lead with benefits not features, one primary CTA.";
const RESEARCH = "Marqeta 2024: 84 percent global card usage, 72 percent of satisfied users still apply for new cards, 31 percent say personalized rewards are need-to-have. Backbase: only 25 percent of SME owners feel supported by bank, beyond-banking services drive 30 percent more revenue per SME client. Marqeta Worker Pay: 72 percent of US consumers 18-50 say immediate pay increases employer interest.";
const CASES = "AT&T and Ericsson: 14B dollar modernization, 28M dollar annual savings, 22963 metric tons CO2 avoided. Giftbit and Marqeta: onboarding from months to days, zero commercial minimums. DataGrail 2025: DSRs up 43 percent YoY, manual DSR processing costs 1.26M dollars per 5M visitors.";
const VIDEO_GUIDE = "VIDEO SCRIPT RULES. Brand tone: Bold, Energetic, Authoritative, cinematic pacing, short declarative sentences. Four product pillars: VisionCraft is Strategy, CatalystX is Platform, InnovateEdge is Intelligence and AI, RunSync is Operations. Follow 4-Part arc: PART 1 THE PROBLEM 0:00-0:17 open with pain use tripling end with Beat Silence on-screen single pain words. PART 2 THE SHIFT 0:17-0:37 introduce FyscalTech as force use reframe question and contrast pairs. PART 3 THE SERVICE 0:37-1:25 break into 3-4 named sub-sections one per capability 15-20 seconds each. PART 4 THE OUTCOME 1:25-2:05 parallel outcomes. CLOSE 2:05-2:15 The future of banking belongs to institutions that move faster than complexity. FyscalTech. Build smarter. Modernise faster. OUTPUT: produce Hook plus CTA Structure, Scene-by-Scene Breakdown with timestamps, Full Narration Script with bold key lines, two-column On-Screen Text vs Voiceover table.";

// ─── Profile Dropdown ─────────────────────────────────────────────────────────
function ProfileMenu({ user, onSignOut }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const F = "'Urbanist','Inter',system-ui,sans-serif";
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);
  return (
    <div ref={ref} style={{ position: "relative" }}>
      <div onClick={() => setOpen(p => !p)} style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer", padding: "4px 10px 4px 4px", borderRadius: "100px", background: open ? "rgba(255,255,255,0.15)" : "rgba(255,255,255,0.08)", border: "1px solid rgba(255,255,255,0.12)" }}>
        <div style={{ width: "28px", height: "28px", background: "#352EFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ color: "#fff", fontWeight: 700, fontSize: "12px" }}>{user.name.charAt(0)}</span>
        </div>
        <span style={{ color: "#fff", fontSize: "12px", fontWeight: 600 }}>{user.name.split(" ")[0]}</span>
        <span style={{ color: "#7C9DFF", fontSize: "9px" }}>{open ? "▲" : "▼"}</span>
      </div>
      {open && (
        <div style={{ position: "absolute", top: "calc(100% + 10px)", right: 0, background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", minWidth: "220px", boxShadow: "0 12px 32px rgba(3,1,146,0.15)", zIndex: 9999, overflow: "hidden" }}>
          <div style={{ padding: "14px 16px", background: "#F8F9FF", borderBottom: "1px solid #F0F2FF" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <div style={{ width: "36px", height: "36px", background: "#352EFF", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>{user.name.charAt(0)}</span>
              </div>
              <div>
                <div style={{ fontSize: "13px", fontWeight: 700, color: "#030192" }}>{user.name}</div>
                <div style={{ fontSize: "11px", color: "#9A99D3", marginTop: "1px" }}>{user.email}</div>
                <div style={{ fontSize: "11px", color: "#6766BD", marginTop: "1px" }}>{user.role}</div>
              </div>
            </div>
          </div>
          <div style={{ padding: "6px" }}>
            <button onClick={() => { setOpen(false); onSignOut(); }} style={{ width: "100%", background: "none", border: "none", borderRadius: "8px", padding: "10px 12px", fontSize: "13px", fontWeight: 600, cursor: "pointer", color: "#E24B4A", textAlign: "left", fontFamily: F }}>Sign out</button>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── Login ─────────────────────────────────────────────────────────────────────
function LoginScreen({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const F = "'Urbanist','Inter',system-ui,sans-serif";
  const submit = () => {
    setError(""); setLoading(true);
    setTimeout(() => {
      const user = VALID_USERS.find(u => u.email === email.trim().toLowerCase() && u.password === password);
      if (user) { onLogin(user); } else { setError("Invalid email or password."); }
      setLoading(false);
    }, 700);
  };
  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#030192", display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem", fontFamily: F }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800;900&display=swap');*{box-sizing:border-box;}`}</style>
      <div style={{ position: "fixed", inset: 0, backgroundImage: "radial-gradient(circle at 20% 20%, rgba(53,46,255,0.4) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(124,157,255,0.2) 0%, transparent 50%)", pointerEvents: "none" }} />
      <div style={{ width: "100%", maxWidth: "420px", position: "relative", zIndex: 1 }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
            <div style={{ width: "44px", height: "44px", background: "#352EFF", borderRadius: "12px", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ color: "#fff", fontWeight: 800, fontSize: "16px" }}>FT</span>
            </div>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "22px", letterSpacing: "-0.02em" }}>FyscalTech</span>
          </div>
          <p style={{ color: "#7C9DFF", fontSize: "12px", margin: 0, letterSpacing: "0.06em", textTransform: "uppercase", fontWeight: 600 }}>GTM Collateral Studio</p>
        </div>
        <div style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "20px", padding: "2.5rem" }}>
          <h2 style={{ color: "#fff", fontSize: "22px", fontWeight: 700, margin: "0 0 6px" }}>Welcome back</h2>
          <p style={{ color: "#7C9DFF", fontSize: "13px", margin: "0 0 2rem" }}>Sign in to access your workspace</p>
          <div style={{ marginBottom: "16px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Email address</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder="you@fyscaltech.com" style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "11px 14px", fontSize: "14px", color: "#fff", outline: "none", fontFamily: F }} />
          </div>
          <div style={{ marginBottom: "8px" }}>
            <label style={{ display: "block", fontSize: "11px", fontWeight: 600, color: "rgba(255,255,255,0.5)", marginBottom: "6px", letterSpacing: "0.06em", textTransform: "uppercase" }}>Password</label>
            <div style={{ position: "relative" }}>
              <input type={showPw ? "text" : "password"} value={password} onChange={e => setPassword(e.target.value)} onKeyDown={e => e.key === "Enter" && submit()} placeholder="password" style={{ width: "100%", background: "rgba(255,255,255,0.07)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "10px", padding: "11px 48px 11px 14px", fontSize: "14px", color: "#fff", outline: "none", fontFamily: F }} />
              <button onClick={() => setShowPw(p => !p)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,0.4)", fontSize: "12px", fontFamily: F }}>{showPw ? "Hide" : "Show"}</button>
            </div>
          </div>
          {error && <div style={{ background: "rgba(226,75,74,0.15)", border: "1px solid rgba(226,75,74,0.3)", borderRadius: "8px", padding: "10px 14px", fontSize: "12px", color: "#F09595", marginTop: "12px" }}>{error}</div>}
          <button onClick={submit} disabled={loading || !email || !password} style={{ width: "100%", background: loading || !email || !password ? "rgba(53,46,255,0.4)" : "#352EFF", border: "none", borderRadius: "10px", padding: "13px", fontSize: "14px", fontWeight: 700, cursor: loading || !email || !password ? "not-allowed" : "pointer", color: "#fff", marginTop: "20px", fontFamily: F }}>
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </div>
        <p style={{ textAlign: "center", color: "rgba(255,255,255,0.25)", fontSize: "11px", marginTop: "1.5rem" }}>2026 FyscalTech GTM Studio</p>
      </div>
    </div>
  );
}

// ─── Main App ──────────────────────────────────────────────────────────────────
export default function GTMStudio() {
  const [currentUser, setCurrentUser] = useState(null);
  const [view, setView] = useState("dashboard");
  const [collateralType, setCollateralType] = useState("product-launch");
  const [formData, setFormData] = useState({});
  const [intakeData, setIntakeData] = useState({});
  const [intakeOpen, setIntakeOpen] = useState(false);
  const [selectedVoice, setSelectedVoice] = useState("bold");
  const [workflow, setWorkflow] = useState("Writer -> Editor");
  const [webSearch, setWebSearch] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [searchStatus, setSearchStatus] = useState("");
  const [generated, setGenerated] = useState("");
  const [assets, setAssets] = useState([]);
  const [viewingAsset, setViewingAsset] = useState(null);
  const [attachments, setAttachments] = useState([]);
  const [extractedContext, setExtractedContext] = useState("");
  const [extracting, setExtracting] = useState(false);
  const fileInputRef = useRef(null);
  const F = "'Urbanist','Inter',system-ui,sans-serif";

  if (!currentUser) return <LoginScreen onLogin={setCurrentUser} />;

  const hf = (id, v) => setFormData(p => ({ ...p, [id]: v }));
  const hi = (id, v) => setIntakeData(p => ({ ...p, [id]: v }));
  const reset = () => { setFormData({}); setIntakeData({}); setGenerated(""); setAttachments([]); setExtractedContext(""); setSearchStatus(""); setIntakeOpen(false); };

  const intakeFilled = Object.values(intakeData).filter(v => v && v.trim()).length;

  const readFile = (file) => new Promise(resolve => {
    const ext = file.name.split(".").pop().toLowerCase();
    if (["txt", "csv"].includes(ext)) { const r = new FileReader(); r.onload = e => resolve(e.target.result || ""); r.readAsText(file); }
    else resolve("Binary file: " + file.name + " size " + (file.size / 1024).toFixed(1) + "KB - use filename and type as context");
  });

  const handleFileAdd = async (e) => {
    const files = Array.from(e.target.files || []); if (!files.length) return;
    setExtracting(true);
    const added = [];
    for (const f of files) { const t = await readFile(f); added.push({ name: f.name, size: (f.size / 1024).toFixed(1), ext: f.name.split(".").pop().toLowerCase(), preview: t.slice(0, 3000) }); }
    setAttachments(p => [...p, ...added]);
    setExtractedContext(p => { const c = added.map(a => "FILE: " + a.name + "\n" + a.preview).join("\n\n---\n\n"); return p ? p + "\n\n" + c : c; });
    setExtracting(false); e.target.value = "";
  };

  const removeAttachment = (name) => {
    setAttachments(p => p.filter(a => a.name !== name));
    setExtractedContext(p => p.split("\n\n---\n\n").filter(s => !s.startsWith("FILE: " + name)).join("\n\n---\n\n"));
  };

  const buildPrompt = () => {
    const tn = (COLLATERAL_TYPES.find(t => t.id === collateralType) || {}).label || collateralType;
    const v = BRAND_VOICES.find(v => v.id === selectedVoice);
    const tones = (SURFACE_TONES[collateralType] || []).join(", ");
    const filled = (FIELDS[collateralType] || []).map(f => f.label + ": " + (formData[f.id] || "not provided")).join("\n");
    const intakeSummary = Object.keys(intakeData).filter(k => intakeData[k] && intakeData[k].trim()).length > 0
      ? "\n\nCONTENT BRIEF FROM INTAKE:\n" + INTAKE_QUESTIONS.map(q => q.label + ": " + (intakeData[q.id] || "not answered")).join("\n")
      : "";
    const att = extractedContext ? "\n\nREFERENCE FILES (use specific details, data, and context from these):\n" + extractedContext : "";
    const searchInstruction = webSearch ? "\n\nWEB SEARCH ENABLED: Before writing, use the web_search tool to find the latest relevant market data, statistics, news, and reports that strengthen this content. Search for current SEA fintech trends, recent regulatory updates, competitor news, and any live stats that support the narrative. Cite all searched sources with publication date." : "";
    const isCarousel = collateralType === "social-carousel";
    const isStatic = collateralType === "social-static";
    const isVideo = collateralType === "video-script";
    const socialCarousel = isCarousel ? "\n\nOUTPUT three sections: Caption (LinkedIn max 1300 chars), Hashtags (5-8), Carousel Creative Brief (slide-by-slide with cover, content slides, CTA slide using brand colors 030192 352EFF 7C9DFF)." : "";
    const socialStatic = isStatic ? "\n\nOUTPUT three sections: Caption (LinkedIn 1300/Instagram 2200/Twitter 280), Hashtags (4-6), Static Creative Brief (image headline, visual direction, brand colors)." : "";
    const videoScript = isVideo ? "\n\n" + VIDEO_GUIDE + "\n\nGenerate the complete video script with all four output sections." : "";
    return "You are a senior B2B marketing copywriter and creative director for FyscalTech.\n\n"
      + "PRODUCT: " + PRODUCT + "\n\n"
      + "Voice: " + (v ? v.label + " - " + v.desc : "") + "\nTone: " + tones + "\n\n"
      + "CONTENT STRATEGY: " + STRATEGY + "\n\n"
      + "RESEARCH: " + RESEARCH + "\n\n"
      + "CASE STUDIES: " + CASES
      + searchInstruction
      + intakeSummary
      + att + "\n\n"
      + "Generate a complete " + tn + " using:\n" + filled
      + socialCarousel + socialStatic + videoScript + "\n\n"
      + "Rules: correct structure, root in FyscalTech differentiators, lead with outcomes not features, CTA is Book a Strategy Call at hello@fyscaltech.com, cite all stats with source and date. Write the full complete piece now.";
  };

  const generate = async () => {
    setGenerating(true); setGenerated(""); setSearchStatus("");
    try {
      const body = {
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: buildPrompt() }],
      };
      if (webSearch) {
        body.tools = [{ type: "web_search_20250305", name: "web_search" }];
        setSearchStatus("Searching the web for live data...");
      }
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const d = await res.json();
      setSearchStatus("");
      if (d.content && d.content.length > 0) {
        const textBlock = d.content.find(b => b.type === "text");
        if (textBlock) {
          setGenerated(textBlock.text);
        } else {
          setGenerated("Content generated but no text found in response. Please try again.");
        }
      } else if (d.error) {
        setGenerated("Error: " + d.error.message);
      } else {
        setGenerated("Unexpected response. Please try again.");
      }
    } catch (e) { setSearchStatus(""); setGenerated("Error: " + e.message); }
    setGenerating(false);
  };

  const saveAsset = () => {
    const tn = (COLLATERAL_TYPES.find(t => t.id === collateralType) || {}).label || collateralType;
    const fk = Object.keys(formData)[0];
    setAssets(p => [{ id: Date.now(), name: (fk ? formData[fk] || "Untitled" : "Untitled") + " - " + tn, type: tn, status: "Draft", date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" }), content: generated }, ...p]);
    setView("assets"); setViewingAsset(null);
  };

  const exportContent = (content, ext) => {
    const c = ext === "txt" ? content.replace(/#{1,6}\s/g, "").replace(/\*\*/g, "") : content;
    const a = document.createElement("a"); a.href = URL.createObjectURL(new Blob([c], { type: "text/plain" })); a.download = "asset." + ext; a.click();
  };

  const renderMD = (md) => {
    if (!md) return "";
    return md
      .replace(/^### (.+)$/gm, '<h3 style="font-size:13px;font-weight:700;margin:1.2rem 0 0.3rem;color:#030192">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 style="font-size:15px;font-weight:700;margin:1.4rem 0 0.4rem;color:#030192">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 style="font-size:18px;font-weight:800;margin:0 0 1rem;color:#030192">$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong style="font-weight:700;color:#030192">$1</strong>')
      .replace(/^- (.+)$/gm, '<li style="margin:3px 0;color:#1a1a2e">$1</li>')
      .replace(/(<li[^>]*>.*?<\/li>\n?)+/g, m => '<ul style="padding-left:1.2rem;margin:0.4rem 0">' + m + '</ul>')
      .replace(/\n\n/g, '</p><p style="margin:0 0 0.7rem;line-height:1.65;color:#1a1a2e;font-size:13px">')
      .replace(/^/, '<p style="margin:0 0 0.7rem;line-height:1.65;color:#1a1a2e;font-size:13px">')
      .replace(/$/, '</p>');
  };

  const Badge = ({ status }) => {
    const s = STATUS_STYLES[status] || { bg: "#eee", color: "#333" };
    return <span style={{ fontSize: "11px", fontWeight: 700, padding: "3px 10px", borderRadius: "100px", background: s.bg, color: s.color, whiteSpace: "nowrap" }}>{status}</span>;
  };

  const ExportBar = ({ content }) => (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1rem" }}>
      {[["Markdown", () => exportContent(content, "md")], ["Plain text", () => exportContent(content, "txt")], ["Copy", () => navigator.clipboard && navigator.clipboard.writeText(content)]].map(([l, fn]) => (
        <button key={l} onClick={fn} style={{ background: "#fff", border: "1px solid #D6D9FF", borderRadius: "8px", padding: "7px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer", color: "#3533A7", fontFamily: F }}>{l}</button>
      ))}
      <button onClick={saveAsset} style={{ background: "#030192", border: "none", borderRadius: "8px", padding: "7px 18px", fontSize: "12px", fontWeight: 700, cursor: "pointer", color: "#fff", fontFamily: F }}>Save to library</button>
    </div>
  );

  return (
    <div style={{ fontFamily: F, width: "100%", minHeight: "100vh", background: "#F4F5FB", color: "#1a1a2e", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Urbanist:wght@300;400;500;600;700;800;900&display=swap');
        *{box-sizing:border-box;}
        .ft-input{width:100%;background:#fff;border:1px solid #D6D9FF;border-radius:8px;padding:9px 13px;font-size:13px;font-family:'Urbanist',sans-serif;color:#030192;outline:none;}
        .ft-input:focus{border-color:#352EFF;}
        .ft-ta{width:100%;background:#fff;border:1px solid #D6D9FF;border-radius:8px;padding:9px 13px;font-size:13px;font-family:'Urbanist',sans-serif;color:#030192;outline:none;resize:vertical;min-height:72px;}
        .ft-ta:focus{border-color:#352EFF;}
        .ft-sel{background:#fff;border:1px solid #D6D9FF;border-radius:8px;padding:9px 13px;font-size:13px;font-family:'Urbanist',sans-serif;color:#030192;outline:none;}
        @keyframes spin{to{transform:rotate(360deg);}}
        @keyframes pulse{0%,100%{opacity:1;}50%{opacity:0.5;}}
        .drop:hover{border-color:#352EFF!important;background:#F5F6FF!important;}
        .toggle-track{width:40px;height:22px;border-radius:100px;cursor:pointer;transition:background 0.2s;display:flex;align-items:center;padding:2px;}
        .toggle-thumb{width:18px;height:18px;border-radius:50%;background:#fff;transition:transform 0.2s;}
      `}</style>

      {/* NAV */}
      <div style={{ background: "#030192", padding: "0 2rem", display: "flex", alignItems: "center", justifyContent: "space-between", height: "56px", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "30px", height: "30px", background: "#352EFF", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "13px" }}>FT</span>
          </div>
          <span style={{ color: "#7C9DFF", fontSize: "11px", fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase" }}>GTM Studio</span>
        </div>
        <div style={{ display: "flex", gap: "2px" }}>
          {["dashboard", "create", "assets"].map(v => (
            <button key={v} onClick={() => { setView(v); setViewingAsset(null); }} style={{ background: view === v ? "rgba(255,255,255,0.13)" : "transparent", border: "none", borderRadius: "6px", padding: "6px 18px", fontSize: "12px", fontWeight: view === v ? 700 : 400, cursor: "pointer", color: view === v ? "#fff" : "#7C9DFF", textTransform: "capitalize" }}>{v}</button>
          ))}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <button onClick={() => { setView("create"); setViewingAsset(null); reset(); }} style={{ background: "#352EFF", border: "none", borderRadius: "8px", padding: "7px 16px", fontSize: "12px", fontWeight: 700, cursor: "pointer", color: "#fff" }}>+ New asset</button>
          <ProfileMenu user={currentUser} onSignOut={() => setCurrentUser(null)} />
        </div>
      </div>

      <div style={{ flex: 1, padding: "2rem", maxWidth: "1400px", width: "100%", margin: "0 auto" }}>

        {/* DASHBOARD */}
        {view === "dashboard" && (
          <>
            <div style={{ marginBottom: "2rem" }}>
              <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#030192", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Good day, {currentUser.name.split(" ")[0]}</h1>
              <p style={{ fontSize: "13px", color: "#6766BD", margin: 0 }}>Your FyscalTech GTM workspace.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "12px", marginBottom: "2rem" }}>
              {[["Total assets", assets.length, "#352EFF"], ["Published", assets.filter(a => a.status === "Published").length, "#030192"], ["In review", assets.filter(a => a.status === "In review").length, "#0053FF"], ["Drafts", assets.filter(a => a.status === "Draft").length, "#7C9DFF"]].map(([l, v, c]) => (
                <div key={l} style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", padding: "1.25rem 1.5rem" }}>
                  <div style={{ fontSize: "11px", fontWeight: 600, color: "#9A99D3", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>{l}</div>
                  <div style={{ fontSize: "36px", fontWeight: 800, color: c, lineHeight: 1 }}>{v}</div>
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: "1.5rem" }}>
              <div>
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#9A99D3", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Recent assets</div>
                <div style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", overflow: "hidden" }}>
                  {assets.length === 0 ? (
                    <div style={{ padding: "3rem", textAlign: "center" }}>
                      <div style={{ fontSize: "13px", color: "#B3B2DE", marginBottom: "14px" }}>No assets yet.</div>
                      <button onClick={() => setView("create")} style={{ background: "#352EFF", border: "none", borderRadius: "8px", padding: "9px 20px", fontSize: "12px", fontWeight: 700, cursor: "pointer", color: "#fff", fontFamily: F }}>Create your first asset</button>
                    </div>
                  ) : assets.slice(0, 6).map((a, i) => (
                    <div key={a.id} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "13px 18px", borderBottom: i < Math.min(assets.length, 6) - 1 ? "1px solid #F0F2FF" : "none" }}>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 600, color: "#030192", marginBottom: "2px" }}>{a.name}</div>
                        <div style={{ fontSize: "11px", color: "#9A99D3" }}>{a.type} · {a.date}</div>
                      </div>
                      <Badge status={a.status} />
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#9A99D3", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Upcoming campaigns</div>
                  <div style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", overflow: "hidden" }}>
                    {UPCOMING.map((c, i) => (
                      <div key={c.campaign} style={{ padding: "13px 18px", borderBottom: i < UPCOMING.length - 1 ? "1px solid #F0F2FF" : "none" }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <div style={{ fontSize: "13px", fontWeight: 600, color: "#030192" }}>{c.campaign}</div>
                          <span style={{ fontSize: "11px", color: "#352EFF", fontWeight: 700 }}>{c.date}</span>
                        </div>
                        <div style={{ fontSize: "11px", color: "#9A99D3", marginTop: "3px" }}>{c.assets} assets needed</div>
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ background: "#030192", borderRadius: "14px", padding: "1.25rem 1.5rem" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#7C9DFF", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Brand voice</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {["Knowledgeable", "Empowering", "Down-to-Earth", "Bold"].map(v => (
                      <span key={v} style={{ fontSize: "11px", fontWeight: 600, background: "rgba(255,255,255,0.1)", color: "#fff", padding: "4px 12px", borderRadius: "100px" }}>{v}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* CREATE */}
        {view === "create" && (
          <>
            <div style={{ marginBottom: "1.5rem" }}>
              <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#030192", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Create collateral</h1>
              <p style={{ fontSize: "13px", color: "#6766BD", margin: 0 }}>AI-powered. FyscalTech-branded. Ready to publish.</p>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", alignItems: "start" }}>

              {/* LEFT FORM */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>

                {/* Type selector */}
                <div style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", padding: "1.25rem 1.5rem" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#9A99D3", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Collateral type</div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "6px" }}>
                    {COLLATERAL_TYPES.map(t => (
                      <button key={t.id} onClick={() => { setCollateralType(t.id); reset(); }}
                        style={{ background: collateralType === t.id ? "#030192" : "#F4F5FB", border: collateralType === t.id ? "1px solid #030192" : "1px solid #E8EAFF", borderRadius: "8px", padding: "6px 14px", fontSize: "12px", fontWeight: collateralType === t.id ? 700 : 500, cursor: "pointer", color: collateralType === t.id ? "#fff" : "#6766BD" }}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", padding: "1.25rem 1.5rem" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#9A99D3", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>Content details</div>
                  {(FIELDS[collateralType] || []).map(f => (
                    <div key={f.id} style={{ marginBottom: "12px" }}>
                      <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#3533A7", marginBottom: "4px" }}>{f.label}</label>
                      {f.type === "textarea"
                        ? <textarea className="ft-ta" placeholder={f.placeholder} value={formData[f.id] || ""} onChange={e => hf(f.id, e.target.value)} rows={2} />
                        : <input className="ft-input" placeholder={f.placeholder} value={formData[f.id] || ""} onChange={e => hf(f.id, e.target.value)} />
                      }
                    </div>
                  ))}
                </div>

                {/* Content Brief / Intake */}
                <div style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", overflow: "hidden" }}>
                  <div onClick={() => setIntakeOpen(p => !p)} style={{ padding: "1rem 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <div style={{ width: "28px", height: "28px", background: intakeFilled > 0 ? "#E8F5E9" : "#F4F5FB", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <span style={{ fontSize: "14px" }}>{intakeFilled > 0 ? "✓" : "+"}</span>
                      </div>
                      <div>
                        <div style={{ fontSize: "13px", fontWeight: 700, color: "#030192" }}>Content brief</div>
                        <div style={{ fontSize: "11px", color: "#9A99D3", marginTop: "1px" }}>{intakeFilled > 0 ? intakeFilled + " of " + INTAKE_QUESTIONS.length + " questions answered" : "Answer 5 quick questions for sharper output"}</div>
                      </div>
                    </div>
                    <span style={{ color: "#9A99D3", fontSize: "11px" }}>{intakeOpen ? "▲" : "▼"}</span>
                  </div>
                  {intakeOpen && (
                    <div style={{ padding: "0 1.5rem 1.25rem", borderTop: "1px solid #F0F2FF" }}>
                      <div style={{ height: "12px" }} />
                      {INTAKE_QUESTIONS.map(q => (
                        <div key={q.id} style={{ marginBottom: "12px" }}>
                          <label style={{ display: "block", fontSize: "12px", fontWeight: 600, color: "#3533A7", marginBottom: "4px" }}>{q.label}</label>
                          <textarea className="ft-ta" placeholder={q.placeholder} value={intakeData[q.id] || ""} onChange={e => hi(q.id, e.target.value)} rows={2} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Reference material */}
                <div style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", padding: "1.25rem 1.5rem" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#9A99D3", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Reference material</div>
                  <input ref={fileInputRef} type="file" multiple accept=".pdf,.doc,.docx,.xls,.xlsx,.csv,.txt" onChange={handleFileAdd} style={{ display: "none" }} />
                  <div className="drop" onClick={() => fileInputRef.current && fileInputRef.current.click()}
                    style={{ border: "1.5px dashed #D6D9FF", borderRadius: "10px", padding: "12px 16px", cursor: "pointer", background: "#FAFBFF", display: "flex", alignItems: "center", gap: "10px" }}>
                    <div style={{ width: "30px", height: "30px", background: "#E8EAFF", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: "14px", fontWeight: 700, color: "#352EFF" }}>+</div>
                    <div>
                      <div style={{ fontSize: "12px", fontWeight: 600, color: "#3533A7" }}>{extracting ? "Reading files..." : "Attach reference files"}</div>
                      <div style={{ fontSize: "11px", color: "#9A99D3", marginTop: "2px" }}>PDF DOC DOCX XLS XLSX CSV TXT</div>
                    </div>
                  </div>
                  {attachments.length > 0 && (
                    <div style={{ marginTop: "8px", display: "flex", flexDirection: "column", gap: "6px" }}>
                      {attachments.map(a => (
                        <div key={a.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: "#F0F2FF", borderRadius: "8px", padding: "8px 12px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "8px", minWidth: 0 }}>
                            <span style={{ fontSize: "10px", fontWeight: 700, color: "#352EFF", background: "#E8EAFF", padding: "2px 6px", borderRadius: "4px" }}>{FILE_ICONS[a.ext] || "FILE"}</span>
                            <div style={{ minWidth: 0 }}>
                              <div style={{ fontSize: "12px", fontWeight: 600, color: "#030192", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: "200px" }}>{a.name}</div>
                              <div style={{ fontSize: "10px", color: "#9A99D3" }}>{a.size} KB</div>
                            </div>
                          </div>
                          <button onClick={() => removeAttachment(a.name)} style={{ background: "none", border: "none", cursor: "pointer", color: "#9A99D3", fontSize: "18px", lineHeight: 1, padding: "0 4px" }}>×</button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Voice + Workflow + Web Search */}
                <div style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", padding: "1.25rem 1.5rem" }}>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#9A99D3", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "10px" }}>Brand voice</div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6px", marginBottom: "1.25rem" }}>
                    {BRAND_VOICES.map(v => (
                      <button key={v.id} onClick={() => setSelectedVoice(v.id)}
                        style={{ background: selectedVoice === v.id ? "#352EFF" : "#F4F5FB", border: selectedVoice === v.id ? "1px solid #352EFF" : "1px solid #E8EAFF", borderRadius: "8px", padding: "8px 12px", cursor: "pointer", textAlign: "left" }}>
                        <div style={{ fontSize: "12px", fontWeight: 700, color: selectedVoice === v.id ? "#fff" : "#030192" }}>{v.label}</div>
                        <div style={{ fontSize: "10px", color: selectedVoice === v.id ? "rgba(255,255,255,0.7)" : "#9A99D3", marginTop: "2px" }}>{v.desc}</div>
                      </button>
                    ))}
                  </div>
                  <div style={{ fontSize: "11px", fontWeight: 700, color: "#9A99D3", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "8px" }}>Workflow</div>
                  <select className="ft-sel" style={{ width: "100%", marginBottom: "1.25rem" }} value={workflow} onChange={e => setWorkflow(e.target.value)}>
                    {WORKFLOWS.map(w => <option key={w}>{w}</option>)}
                  </select>

                  {/* Web Search Toggle */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: webSearch ? "#F0FFF8" : "#F4F5FB", border: webSearch ? "1px solid #1D9E75" : "1px solid #E8EAFF", borderRadius: "10px", padding: "12px 14px" }}>
                    <div>
                      <div style={{ fontSize: "13px", fontWeight: 700, color: webSearch ? "#0F6E56" : "#030192" }}>Live web research</div>
                      <div style={{ fontSize: "11px", color: webSearch ? "#1D9E75" : "#9A99D3", marginTop: "2px" }}>{webSearch ? "Claude will search the web before writing" : "Uses hardcoded knowledge base only"}</div>
                    </div>
                    <div className="toggle-track" style={{ background: webSearch ? "#1D9E75" : "#D6D9FF" }} onClick={() => setWebSearch(p => !p)}>
                      <div className="toggle-thumb" style={{ transform: webSearch ? "translateX(18px)" : "translateX(0)" }} />
                    </div>
                  </div>
                  {webSearch && (
                    <div style={{ marginTop: "8px", background: "#F0FFF8", borderRadius: "8px", padding: "10px 12px" }}>
                      <div style={{ fontSize: "11px", color: "#0F6E56", lineHeight: 1.6 }}>
                        Claude will search for live SEA fintech market data, regulatory updates, competitor news, and current stats before writing. Adds 5–10 seconds to generation.
                      </div>
                    </div>
                  )}
                </div>

                {/* Tone */}
                <div style={{ background: "#F5F6FF", borderRadius: "10px", padding: "10px 14px" }}>
                  <div style={{ fontSize: "10px", fontWeight: 700, color: "#6766BD", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "6px" }}>Recommended tone</div>
                  <div style={{ display: "flex", gap: "5px", flexWrap: "wrap" }}>
                    {(SURFACE_TONES[collateralType] || []).map(t => (
                      <span key={t} style={{ fontSize: "11px", fontWeight: 600, color: "#352EFF", background: "#E8EAFF", padding: "3px 10px", borderRadius: "100px" }}>{t}</span>
                    ))}
                  </div>
                </div>

                <button onClick={generate} disabled={generating}
                  style={{ width: "100%", background: generating ? "#9A99D3" : "#352EFF", border: "none", borderRadius: "10px", padding: "14px", fontSize: "14px", fontWeight: 700, cursor: generating ? "not-allowed" : "pointer", color: "#fff", fontFamily: F }}>
                  {generating ? "Generating..." : "Generate content"}
                </button>
              </div>

              {/* RIGHT PREVIEW */}
              <div style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", padding: "1.5rem", position: "relative", minHeight: "600px" }}>
                <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: "3px", background: "linear-gradient(90deg,#352EFF,#0053FF,#7C9DFF)", borderRadius: "14px 14px 0 0" }} />
                <div style={{ fontSize: "11px", fontWeight: 700, color: "#9A99D3", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "14px", paddingTop: "6px" }}>Preview</div>

                {generating && (
                  <div style={{ textAlign: "center", padding: "4rem 2rem" }}>
                    <div style={{ width: "32px", height: "32px", border: "3px solid #E8EAFF", borderTopColor: "#352EFF", borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 16px" }} />
                    <div style={{ fontSize: "13px", color: "#6766BD", animation: "pulse 1.5s ease-in-out infinite" }}>{searchStatus || "Generating content..."}</div>
                  </div>
                )}
                {!generating && !generated && (
                  <div style={{ textAlign: "center", padding: "4rem 2rem", color: "#B3B2DE" }}>
                    <div style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.4 }}>✦</div>
                    <div style={{ fontSize: "13px" }}>Fill in the form and click <strong style={{ color: "#352EFF" }}>Generate content</strong></div>
                  </div>
                )}
                {!generating && generated && (
                  <div>
                    <div style={{ fontSize: "13px", lineHeight: 1.7, color: "#1a1a2e", maxHeight: "600px", overflowY: "auto", paddingRight: "4px" }} dangerouslySetInnerHTML={{ __html: renderMD(generated) }} />
                    <ExportBar content={generated} />
                  </div>
                )}
              </div>
            </div>
          </>
        )}

        {/* ASSETS */}
        {view === "assets" && !viewingAsset && (
          <>
            <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <div>
                <h1 style={{ fontSize: "26px", fontWeight: 800, color: "#030192", margin: "0 0 4px", letterSpacing: "-0.02em" }}>Asset library</h1>
                <p style={{ fontSize: "13px", color: "#6766BD", margin: 0 }}>All your saved GTM collateral.</p>
              </div>
              <button onClick={() => { setView("create"); reset(); }} style={{ background: "#352EFF", border: "none", borderRadius: "8px", padding: "9px 20px", fontSize: "12px", fontWeight: 700, cursor: "pointer", color: "#fff", fontFamily: F }}>+ New asset</button>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", overflow: "hidden" }}>
              {assets.length === 0 ? (
                <div style={{ padding: "4rem", textAlign: "center" }}>
                  <div style={{ fontSize: "32px", marginBottom: "12px", opacity: 0.3 }}>◈</div>
                  <div style={{ fontSize: "13px", color: "#B3B2DE", marginBottom: "14px" }}>No assets saved yet. Generate and save your first piece of collateral.</div>
                  <button onClick={() => setView("create")} style={{ background: "#352EFF", border: "none", borderRadius: "8px", padding: "9px 20px", fontSize: "12px", fontWeight: 700, cursor: "pointer", color: "#fff", fontFamily: F }}>Create your first asset</button>
                </div>
              ) : (
                <>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "0", padding: "10px 18px", borderBottom: "1px solid #F0F2FF", fontSize: "10px", fontWeight: 700, color: "#9A99D3", textTransform: "uppercase", letterSpacing: "0.08em" }}>
                    <span>Asset name</span>
                    <span style={{ textAlign: "center", minWidth: "80px" }}>Type</span>
                    <span style={{ textAlign: "center", minWidth: "80px" }}>Date</span>
                    <span style={{ textAlign: "center", minWidth: "90px" }}>Status</span>
                  </div>
                  {assets.map((a, i) => (
                    <div key={a.id} onClick={() => setViewingAsset(a)}
                      style={{ display: "grid", gridTemplateColumns: "1fr auto auto auto", gap: "0", alignItems: "center", padding: "13px 18px", borderBottom: i < assets.length - 1 ? "1px solid #F0F2FF" : "none", cursor: "pointer", transition: "background 0.15s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#FAFBFF"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <div style={{ fontSize: "13px", fontWeight: 600, color: "#030192" }}>{a.name}</div>
                      <div style={{ fontSize: "11px", color: "#9A99D3", textAlign: "center", minWidth: "80px" }}>{a.type}</div>
                      <div style={{ fontSize: "11px", color: "#9A99D3", textAlign: "center", minWidth: "80px" }}>{a.date}</div>
                      <div style={{ textAlign: "center", minWidth: "90px" }}><Badge status={a.status} /></div>
                    </div>
                  ))}
                </>
              )}
            </div>
          </>
        )}

        {/* ASSET DETAIL */}
        {view === "assets" && viewingAsset && (
          <>
            <div style={{ marginBottom: "1.5rem", display: "flex", alignItems: "center", gap: "12px" }}>
              <button onClick={() => setViewingAsset(null)} style={{ background: "#F4F5FB", border: "1px solid #E8EAFF", borderRadius: "8px", padding: "7px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer", color: "#3533A7", fontFamily: F }}>← Back</button>
              <div>
                <h1 style={{ fontSize: "20px", fontWeight: 800, color: "#030192", margin: 0, letterSpacing: "-0.02em" }}>{viewingAsset.name}</h1>
                <div style={{ fontSize: "11px", color: "#9A99D3", marginTop: "2px" }}>{viewingAsset.type} · {viewingAsset.date}</div>
              </div>
              <div style={{ marginLeft: "auto" }}><Badge status={viewingAsset.status} /></div>
            </div>
            <div style={{ background: "#fff", border: "1px solid #E8EAFF", borderRadius: "14px", padding: "2rem" }}>
              <div dangerouslySetInnerHTML={{ __html: renderMD(viewingAsset.content) }} />
              <div style={{ display: "flex", flexWrap: "wrap", gap: "6px", marginTop: "1.5rem", paddingTop: "1rem", borderTop: "1px solid #F0F2FF" }}>
                {[["Markdown", () => exportContent(viewingAsset.content, "md")], ["Plain text", () => exportContent(viewingAsset.content, "txt")], ["Copy", () => navigator.clipboard && navigator.clipboard.writeText(viewingAsset.content)]].map(([l, fn]) => (
                  <button key={l} onClick={fn} style={{ background: "#fff", border: "1px solid #D6D9FF", borderRadius: "8px", padding: "7px 14px", fontSize: "12px", fontWeight: 600, cursor: "pointer", color: "#3533A7", fontFamily: F }}>{l}</button>
                ))}
              </div>
            </div>
          </>
        )}

      </div>
    </div>
  );
}
