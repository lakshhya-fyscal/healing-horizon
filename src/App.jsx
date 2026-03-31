import { useState, useEffect, useRef, useCallback } from "react";

// ─── API ────────────────────────────────────────────────────────────────────
const API = "http://localhost:3001/api";
const authHeaders = (token) => ({
  "Content-Type": "application/json",
  Authorization: `Bearer ${token}`,
});

async function apiFetch(path, token, opts = {}) {
  const res = await fetch(API + path, {
    ...opts,
    headers: { ...authHeaders(token), ...(opts.headers || {}) },
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: res.statusText }));
    throw new Error(err.error || res.statusText);
  }
  return res.json();
}

// ─── CONSTANTS ───────────────────────────────────────────────────────────────
const ASSET_TYPES = [
  "Sales One-Pager",
  "Email Sequence",
  "Social Post",
  "Battle Card",
  "Case Study",
  "Press Release",
  "Blog Post",
  "Ad Copy",
  "Landing Page Copy",
  "Product Brief",
];

const STATUS_COLORS = {
  Draft: { bg: "#F0F4FF", text: "#3B5BDB" },
  Review: { bg: "#FFF3CD", text: "#856404" },
  Approved: { bg: "#D1FAE5", text: "#065F46" },
  Published: { bg: "#E0F2FE", text: "#0369A1" },
};

const STATUSES = Object.keys(STATUS_COLORS);

// ─── GLOBAL STYLES ──────────────────────────────────────────────────────────
function GlobalStyle() {
  return (
    <style>{`
      *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
      :root {
        --sidebar-w: 240px;
        --navy: #0F172A;
        --navy2: #1E293B;
        --navy3: #334155;
        --slate: #64748B;
        --slate-lt: #94A3B8;
        --border: #E2E8F0;
        --bg: #F8FAFC;
        --white: #FFFFFF;
        --accent: #6366F1;
        --accent-lt: #EEF2FF;
        --accent-dark: #4F46E5;
        --green: #10B981;
        --green-lt: #D1FAE5;
        --amber: #F59E0B;
        --amber-lt: #FEF3C7;
        --red: #EF4444;
        --red-lt: #FEE2E2;
        --text: #0F172A;
        --text2: #475569;
      }
      html, body, #root { height: 100%; }
      body {
        font-family: 'Inter', 'DM Sans', system-ui, -apple-system, sans-serif;
        background: var(--bg);
        color: var(--text);
        -webkit-font-smoothing: antialiased;
        line-height: 1.6;
      }
      button { cursor: pointer; border: none; background: none; font: inherit; }
      input, textarea, select { font: inherit; }
      ::-webkit-scrollbar { width: 4px; height: 4px; }
      ::-webkit-scrollbar-track { background: transparent; }
      ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 99px; }

      @keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: none; } }
      @keyframes slideIn { from { opacity: 0; transform: translateX(20px); } to { opacity: 1; transform: none; } }
      @keyframes spin { to { transform: rotate(360deg); } }

      .fade-in { animation: fadeIn .25s ease both; }
      .slide-in { animation: slideIn .3s ease both; }
      .truncate { overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
    `}</style>
  );
}

// ─── COMPONENTS ─────────────────────────────────────────────────────────────

function Badge({ status }) {
  const c = STATUS_COLORS[status] || { bg: "#F1F5F9", text: "#64748B" };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      padding: "2px 10px", borderRadius: 99,
      background: c.bg, color: c.text,
      fontSize: 11, fontWeight: 600, letterSpacing: ".04em",
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: c.text, flexShrink: 0 }} />
      {status}
    </span>
  );
}

function Btn({ children, variant = "primary", size = "md", loading, style: s, ...props }) {
  const base = {
    display: "inline-flex", alignItems: "center", justifyContent: "center",
    gap: 7, fontWeight: 500, borderRadius: 8,
    transition: "all .15s ease", outline: "none",
    padding: size === "sm" ? "6px 14px" : size === "lg" ? "12px 24px" : "9px 18px",
    fontSize: size === "sm" ? 13 : size === "lg" ? 15 : 14,
    cursor: loading ? "not-allowed" : "pointer", opacity: loading ? .7 : 1,
  };
  const variants = {
    primary: { background: "var(--accent)", color: "#fff" },
    danger: { background: "var(--red)", color: "#fff" },
    ghost: { background: "transparent", color: "var(--text2)", border: "1px solid var(--border)" },
    outline: { background: "transparent", color: "var(--accent)", border: "1px solid var(--accent)" },
  };
  return (
    <button style={{ ...base, ...variants[variant], ...s }} disabled={loading} {...props}>
      {loading
        ? <span style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.3)", borderTop: "2px solid #fff", borderRadius: "50%", animation: "spin .7s linear infinite", display: "inline-block" }} />
        : children}
    </button>
  );
}

function Avatar({ name, size = 32 }) {
  const initials = name?.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase() || "?";
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
      color: "#fff", fontSize: size * .38, fontWeight: 700,
      display: "flex", alignItems: "center", justifyContent: "center",
      flexShrink: 0,
    }}>{initials}</div>
  );
}

// ─── LOGIN ───────────────────────────────────────────────────────────────────
function LoginPage({ onLogin }) {
  const [email, setEmail] = useState("demo@fyscaltech.com");
  const [password, setPassword] = useState("FyscalGTM2026");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      const res = await fetch(`${API}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      onLogin(data.token, data.user);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const fieldStyle = {
    width: "100%", padding: "10px 14px",
    border: "1px solid rgba(255,255,255,.1)", borderRadius: 8,
    fontSize: 14, background: "rgba(255,255,255,.05)", color: "#fff",
    outline: "none", transition: "border-color .15s",
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      background: "linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #0F172A 100%)",
      padding: 24,
    }}>
      <div style={{
        position: "fixed", inset: 0, pointerEvents: "none",
        backgroundImage: "linear-gradient(rgba(99,102,241,.05) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,.05) 1px, transparent 1px)",
        backgroundSize: "40px 40px",
      }} />

      <div className="fade-in" style={{
        width: "100%", maxWidth: 400,
        background: "rgba(255,255,255,.03)", backdropFilter: "blur(20px)",
        border: "1px solid rgba(255,255,255,.08)",
        borderRadius: 20, padding: "44px 40px",
        position: "relative", zIndex: 1,
      }}>
        <div style={{ marginBottom: 36, textAlign: "center" }}>
          <div style={{
            display: "inline-flex", alignItems: "center", justifyContent: "center",
            width: 52, height: 52, borderRadius: 14,
            background: "linear-gradient(135deg, #6366F1, #8B5CF6)",
            marginBottom: 16, boxShadow: "0 8px 24px rgba(99,102,241,.4)",
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div style={{ color: "#fff", fontSize: 22, fontWeight: 700, letterSpacing: "-.02em" }}>
            GTM Collateral Studio
          </div>
          <div style={{ color: "rgba(255,255,255,.45)", fontSize: 13, marginTop: 4 }}>
            Fyscal Tech · Marketing OS
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div>
              <label style={{ color: "rgba(255,255,255,.6)", fontSize: 12, fontWeight: 500, letterSpacing: ".04em", display: "block", marginBottom: 6 }}>EMAIL</label>
              <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={fieldStyle}
                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"} />
            </div>
            <div>
              <label style={{ color: "rgba(255,255,255,.6)", fontSize: 12, fontWeight: 500, letterSpacing: ".04em", display: "block", marginBottom: 6 }}>PASSWORD</label>
              <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={fieldStyle}
                onFocus={e => e.target.style.borderColor = "rgba(99,102,241,.6)"}
                onBlur={e => e.target.style.borderColor = "rgba(255,255,255,.1)"} />
            </div>
            {error && (
              <div style={{ background: "rgba(239,68,68,.12)", border: "1px solid rgba(239,68,68,.25)", color: "#FCA5A5", padding: "10px 14px", borderRadius: 8, fontSize: 13 }}>
                {error}
              </div>
            )}
            <Btn type="submit" loading={loading} size="lg" style={{ marginTop: 4, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", boxShadow: "0 4px 16px rgba(99,102,241,.4)" }}>
              Sign In
            </Btn>
          </div>
        </form>

        <div style={{ marginTop: 28, padding: 16, background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 10 }}>
          <div style={{ color: "rgba(255,255,255,.4)", fontSize: 11, fontWeight: 600, letterSpacing: ".05em", marginBottom: 8 }}>DEMO CREDENTIALS</div>
          <div style={{ color: "rgba(255,255,255,.55)", fontSize: 12, lineHeight: 1.9 }}>
            <div>demo@fyscaltech.com · FyscalGTM2026</div>
            <div>admin@fyscaltech.com · Admin@123</div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── SIDEBAR ─────────────────────────────────────────────────────────────────
function Sidebar({ user, activeView, setActiveView, onLogout }) {
  const nav = [
    {
      id: "dashboard", label: "Dashboard",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="14" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/><rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="2"/></svg>,
    },
    {
      id: "assets", label: "Collateral",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="currentColor" strokeWidth="2"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2"/></svg>,
    },
    {
      id: "generate", label: "AI Generate",
      icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/></svg>,
    },
  ];

  return (
    <aside style={{
      width: "var(--sidebar-w)", flexShrink: 0,
      background: "var(--navy)", display: "flex", flexDirection: "column",
      height: "100vh", position: "fixed", left: 0, top: 0, zIndex: 100,
    }}>
      <div style={{ padding: "20px 20px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 34, height: 34, borderRadius: 9, background: "linear-gradient(135deg, #6366F1, #8B5CF6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ color: "#fff", fontSize: 13, fontWeight: 700 }}>GTM Studio</div>
            <div style={{ color: "rgba(255,255,255,.3)", fontSize: 10 }}>Fyscal Tech</div>
          </div>
        </div>
      </div>

      <nav style={{ padding: "12px 10px", flex: 1 }}>
        <div style={{ color: "rgba(255,255,255,.25)", fontSize: 10, fontWeight: 600, letterSpacing: ".07em", padding: "8px 10px 6px" }}>WORKSPACE</div>
        {nav.map(item => {
          const active = activeView === item.id;
          return (
            <button key={item.id} onClick={() => setActiveView(item.id)} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 10,
              padding: "9px 10px", borderRadius: 8, marginBottom: 2,
              background: active ? "rgba(99,102,241,.15)" : "transparent",
              color: active ? "#A5B4FC" : "rgba(255,255,255,.5)",
              fontSize: 13, fontWeight: active ? 600 : 400,
              transition: "all .15s", textAlign: "left",
              border: active ? "1px solid rgba(99,102,241,.2)" : "1px solid transparent",
            }}>
              <span style={{ color: active ? "#818CF8" : "rgba(255,255,255,.3)" }}>{item.icon}</span>
              {item.label}
              {item.id === "generate" && (
                <span style={{ marginLeft: "auto", background: "rgba(99,102,241,.3)", color: "#A5B4FC", fontSize: 9, fontWeight: 700, padding: "1px 6px", borderRadius: 99 }}>AI</span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <Avatar name={user?.name} size={32} />
          <div style={{ flex: 1, minWidth: 0 }}>
            <div className="truncate" style={{ color: "rgba(255,255,255,.85)", fontSize: 12, fontWeight: 500 }}>{user?.name}</div>
            <div className="truncate" style={{ color: "rgba(255,255,255,.35)", fontSize: 10 }}>{user?.role}</div>
          </div>
          <button onClick={onLogout} title="Sign out"
            style={{ color: "rgba(255,255,255,.25)", padding: 4, borderRadius: 6, display: "flex" }}
            onMouseEnter={e => e.currentTarget.style.color = "rgba(255,255,255,.6)"}
            onMouseLeave={e => e.currentTarget.style.color = "rgba(255,255,255,.25)"}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </aside>
  );
}

// ─── DASHBOARD ───────────────────────────────────────────────────────────────
function Dashboard({ assets, user, setActiveView }) {
  const byStatus = STATUSES.map(s => ({ status: s, count: assets.filter(a => a.status === s).length }));
  const recent = [...assets].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)).slice(0, 5);

  const stats = [
    { label: "Total Assets", value: assets.length, icon: "📦", color: "#6366F1" },
    { label: "In Review", value: byStatus.find(s => s.status === "Review")?.count || 0, icon: "👁", color: "#F59E0B" },
    { label: "Approved", value: byStatus.find(s => s.status === "Approved")?.count || 0, icon: "✅", color: "#10B981" },
    { label: "Published", value: byStatus.find(s => s.status === "Published")?.count || 0, icon: "🚀", color: "#3B82F6" },
  ];

  const hour = new Date().getHours();
  const greeting = hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";

  return (
    <div className="fade-in">
      <div style={{ marginBottom: 28 }}>
        <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.02em" }}>
          Good {greeting}, {user?.name?.split(" ")[0]} 👋
        </div>
        <div style={{ color: "var(--slate)", fontSize: 14, marginTop: 4 }}>
          {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 28 }}>
        {stats.map(s => (
          <div key={s.label} style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: "20px" }}>
            <div style={{ fontSize: 22, marginBottom: 10 }}>{s.icon}</div>
            <div style={{ fontSize: 28, fontWeight: 700, color: s.color, letterSpacing: "-.03em" }}>{s.value}</div>
            <div style={{ fontSize: 12, color: "var(--slate)", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, overflow: "hidden" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>Recent Collateral</div>
          <Btn variant="ghost" size="sm" onClick={() => setActiveView("assets")}>View all →</Btn>
        </div>
        {recent.length === 0 ? (
          <div style={{ padding: 40, textAlign: "center", color: "var(--slate)", fontSize: 14 }}>
            No assets yet.{" "}
            <button onClick={() => setActiveView("generate")} style={{ color: "var(--accent)", fontWeight: 500 }}>Generate your first →</button>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg)" }}>
                {["Name", "Type", "Status", "Date"].map(h => (
                  <th key={h} style={{ padding: "10px 20px", textAlign: "left", fontSize: 11, fontWeight: 600, color: "var(--slate)", letterSpacing: ".05em" }}>{h.toUpperCase()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((a, i) => (
                <tr key={a.id} style={{ borderTop: "1px solid var(--border)" }}>
                  <td style={{ padding: "12px 20px", fontSize: 14, fontWeight: 500, maxWidth: 260 }}>
                    <span className="truncate" style={{ display: "block" }}>{a.name}</span>
                  </td>
                  <td style={{ padding: "12px 20px" }}>
                    <span style={{ fontSize: 12, color: "var(--slate)", background: "var(--bg)", border: "1px solid var(--border)", padding: "3px 8px", borderRadius: 6 }}>{a.type}</span>
                  </td>
                  <td style={{ padding: "12px 20px" }}><Badge status={a.status} /></td>
                  <td style={{ padding: "12px 20px", fontSize: 13, color: "var(--slate)" }}>
                    {a.date || new Date(a.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

// ─── ASSET DETAIL MODAL ───────────────────────────────────────────────────────
function AssetModal({ asset, token, onClose, onUpdate, onDelete }) {
  const [status, setStatus] = useState(asset.status);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  async function saveStatus(newStatus) {
    setSaving(true);
    try {
      await apiFetch(`/assets/${asset.id}`, token, {
        method: "PUT",
        body: JSON.stringify({ status: newStatus }),
      });
      setStatus(newStatus);
      onUpdate({ ...asset, status: newStatus });
    } finally {
      setSaving(false);
    }
  }

  async function deleteAsset() {
    setDeleting(true);
    try {
      await apiFetch(`/assets/${asset.id}`, token, { method: "DELETE" });
      onDelete(asset.id);
      onClose();
    } finally {
      setDeleting(false);
    }
  }

  function renderContent(text) {
    if (!text) return <div style={{ color: "var(--slate)", fontStyle: "italic", fontSize: 14 }}>No content yet.</div>;
    return text.split("\n").map((line, i) => {
      if (line.startsWith("# ")) return <h1 key={i} style={{ fontSize: "1.4rem", fontWeight: 700, margin: "1rem 0 .4rem", color: "var(--text)" }}>{line.slice(2)}</h1>;
      if (line.startsWith("## ")) return <h2 key={i} style={{ fontSize: "1.15rem", fontWeight: 600, margin: ".9rem 0 .3rem", color: "var(--text)" }}>{line.slice(3)}</h2>;
      if (line.startsWith("### ")) return <h3 key={i} style={{ fontSize: "1rem", fontWeight: 600, margin: ".7rem 0 .25rem", color: "var(--text)" }}>{line.slice(4)}</h3>;
      if (line.startsWith("- ") || line.startsWith("* ")) return <li key={i} style={{ marginLeft: 20, marginBottom: 4, fontSize: 14, color: "var(--text2)" }}>{line.slice(2)}</li>;
      if (line === "") return <div key={i} style={{ height: 8 }} />;
      return <p key={i} style={{ margin: ".25rem 0", fontSize: 14, color: "var(--text2)", lineHeight: 1.7 }}>{line}</p>;
    });
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 200,
      background: "rgba(0,0,0,.5)", backdropFilter: "blur(4px)",
      display: "flex", alignItems: "flex-start", justifyContent: "flex-end",
    }} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="slide-in" style={{
        width: "min(700px, 90vw)", height: "100vh",
        background: "var(--white)", display: "flex", flexDirection: "column",
        boxShadow: "-20px 0 60px rgba(0,0,0,.15)",
      }}>
        <div style={{ padding: "20px 28px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "flex-start", gap: 16 }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 11, color: "var(--slate)", fontWeight: 600, letterSpacing: ".05em", marginBottom: 4 }}>{asset.type.toUpperCase()}</div>
            <div style={{ fontSize: 18, fontWeight: 700, letterSpacing: "-.02em" }}>{asset.name}</div>
          </div>
          <button onClick={onClose} style={{ color: "var(--slate)", padding: 6, borderRadius: 8, background: "var(--bg)", border: "1px solid var(--border)", display: "flex" }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        <div style={{ padding: "12px 28px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", gap: 12, background: "var(--bg)" }}>
          <span style={{ fontSize: 12, color: "var(--slate)", fontWeight: 500 }}>Status:</span>
          <div style={{ display: "flex", gap: 6 }}>
            {STATUSES.map(s => (
              <button key={s} onClick={() => saveStatus(s)} disabled={saving} style={{
                padding: "4px 12px", borderRadius: 99, fontSize: 11, fontWeight: 600,
                border: "1px solid",
                borderColor: status === s ? STATUS_COLORS[s].text : "var(--border)",
                background: status === s ? STATUS_COLORS[s].bg : "transparent",
                color: status === s ? STATUS_COLORS[s].text : "var(--slate)",
                cursor: "pointer", transition: "all .15s",
              }}>{s}</button>
            ))}
          </div>
          <div style={{ marginLeft: "auto", fontSize: 12, color: "var(--slate)" }}>
            {asset.date || new Date(asset.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "24px 28px" }}>
          {renderContent(asset.content)}
        </div>

        <div style={{ padding: "16px 28px", borderTop: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          {confirmDelete ? (
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 13, color: "var(--red)" }}>Delete this asset?</span>
              <Btn variant="danger" size="sm" loading={deleting} onClick={deleteAsset}>Confirm</Btn>
              <Btn variant="ghost" size="sm" onClick={() => setConfirmDelete(false)}>Cancel</Btn>
            </div>
          ) : (
            <Btn variant="ghost" size="sm" onClick={() => setConfirmDelete(true)} style={{ color: "var(--red)", borderColor: "#FECACA" }}>
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="2"/></svg>
              Delete
            </Btn>
          )}
          <Btn variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(asset.content || "")}>
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><rect x="9" y="9" width="13" height="13" rx="2" stroke="currentColor" strokeWidth="2"/><path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" stroke="currentColor" strokeWidth="2"/></svg>
            Copy content
          </Btn>
        </div>
      </div>
    </div>
  );
}

// ─── ASSETS VIEW ─────────────────────────────────────────────────────────────
function AssetsView({ assets, setAssets, token, setActiveView }) {
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("All");
  const [filterStatus, setFilterStatus] = useState("All");
  const [selected, setSelected] = useState(null);

  const types = ["All", ...new Set(assets.map(a => a.type))];
  const filtered = assets.filter(a => {
    const q = search.toLowerCase();
    return (
      (a.name.toLowerCase().includes(q) || a.type.toLowerCase().includes(q)) &&
      (filterType === "All" || a.type === filterType) &&
      (filterStatus === "All" || a.status === filterStatus)
    );
  });

  function handleUpdate(updated) { setAssets(prev => prev.map(a => a.id === updated.id ? updated : a)); }
  function handleDelete(id) { setAssets(prev => prev.filter(a => a.id !== id)); }

  const selStyle = { padding: "9px 14px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13, background: "var(--white)", color: "var(--text)", outline: "none" };

  return (
    <div className="fade-in">
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.02em" }}>Collateral</div>
          <div style={{ color: "var(--slate)", fontSize: 14, marginTop: 2 }}>{assets.length} assets</div>
        </div>
        <Btn onClick={() => setActiveView("generate")} style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/></svg>
          Generate new
        </Btn>
      </div>

      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
        <div style={{ position: "relative", flex: "1 1 200px" }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--slate)" }}>
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2"/>
          </svg>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search collateral…"
            style={{ width: "100%", padding: "9px 14px 9px 36px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 13, background: "var(--white)", outline: "none" }} />
        </div>
        <select value={filterType} onChange={e => setFilterType(e.target.value)} style={selStyle}>
          {types.map(t => <option key={t}>{t}</option>)}
        </select>
        <select value={filterStatus} onChange={e => setFilterStatus(e.target.value)} style={selStyle}>
          {["All", ...STATUSES].map(s => <option key={s}>{s}</option>)}
        </select>
      </div>

      {filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "60px 20px", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12 }}>
          <div style={{ fontSize: 32, marginBottom: 12 }}>📭</div>
          <div style={{ fontWeight: 600, marginBottom: 6 }}>No assets found</div>
          <div style={{ color: "var(--slate)", fontSize: 14, marginBottom: 20 }}>Try adjusting filters or generate new collateral.</div>
          <Btn onClick={() => setActiveView("generate")}>Generate collateral</Btn>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 14 }}>
          {filtered.map(a => (
            <div key={a.id} onClick={() => setSelected(a)} style={{
              background: "var(--white)", border: "1px solid var(--border)",
              borderRadius: 12, padding: "18px 20px", cursor: "pointer", transition: "all .15s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--accent)"; e.currentTarget.style.boxShadow = "0 4px 20px rgba(99,102,241,.1)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.boxShadow = "none"; }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 11, background: "var(--accent-lt)", color: "var(--accent)", padding: "3px 8px", borderRadius: 6, fontWeight: 600 }}>{a.type}</span>
                <Badge status={a.status} />
              </div>
              <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 8, lineHeight: 1.4 }}>{a.name}</div>
              {a.content && (
                <div style={{ fontSize: 12, color: "var(--slate)", overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", lineHeight: 1.6 }}>
                  {a.content.replace(/[#*_]/g, "").trim()}
                </div>
              )}
              <div style={{ marginTop: 12, fontSize: 11, color: "var(--slate-lt)" }}>
                {a.date || new Date(a.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </div>
            </div>
          ))}
        </div>
      )}

      {selected && (
        <AssetModal asset={selected} token={token} onClose={() => setSelected(null)} onUpdate={handleUpdate} onDelete={handleDelete} />
      )}
    </div>
  );
}

// ─── GENERATE VIEW ───────────────────────────────────────────────────────────
function GenerateView({ token, onAssetCreated }) {
  const [name, setName] = useState("");
  const [type, setType] = useState(ASSET_TYPES[0]);
  const [prompt, setPrompt] = useState("");
  const [webSearch, setWebSearch] = useState(false);
  const [generating, setGenerating] = useState(false);
  const [saving, setSaving] = useState(false);
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const TEMPLATES = {
    "Sales One-Pager": "Write a compelling sales one-pager for [PRODUCT/SERVICE]. Include: headline, key pain points, solution overview, 3 key benefits, social proof placeholder, and a clear CTA.",
    "Email Sequence": "Write a 3-email nurture sequence for [AUDIENCE]. Email 1: awareness & value. Email 2: case study/proof. Email 3: offer & CTA. Each email needs subject line, preview text, and body.",
    "Battle Card": "Create a competitive battle card: [OUR PRODUCT] vs [COMPETITOR]. Include: positioning, key differentiators, objection handling, win themes, and talk tracks.",
    "Social Post": "Write 5 LinkedIn post variations promoting [TOPIC]. Mix formats: thought leadership, storytelling, listicle, question, data-driven. Include hooks and CTAs.",
    "Case Study": "Write a customer case study for [CUSTOMER/INDUSTRY]. Structure: challenge, solution, implementation, results with metrics, and a compelling quote.",
  };

  async function generate() {
    if (!prompt.trim()) { setError("Please enter a prompt"); return; }
    setGenerating(true); setError(""); setResult(""); setSaved(false);
    try {
      const data = await apiFetch("/generate", token, {
        method: "POST",
        body: JSON.stringify({ prompt, webSearch }),
      });
      setResult(data.text);
    } catch (err) {
      setError(err.message);
    } finally {
      setGenerating(false);
    }
  }

  async function save() {
    if (!name.trim()) { setError("Please enter a name to save"); return; }
    setSaving(true); setError("");
    try {
      const asset = await apiFetch("/assets", token, {
        method: "POST",
        body: JSON.stringify({
          name, type, content: result,
          date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        }),
      });
      onAssetCreated(asset);
      setSaved(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  const inputStyle = { width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: 8, fontSize: 14, background: "var(--white)", color: "var(--text)", outline: "none", transition: "border-color .15s" };

  return (
    <div className="fade-in" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, height: "calc(100vh - 80px)" }}>
      {/* Input panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 16, overflowY: "auto" }}>
        <div>
          <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: "-.02em" }}>AI Generate</div>
          <div style={{ color: "var(--slate)", fontSize: 14, marginTop: 2 }}>Describe what you need — Claude will write it.</div>
        </div>

        <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: 20, display: "flex", flexDirection: "column", gap: 14 }}>
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: "var(--slate)", display: "block", marginBottom: 6 }}>ASSET TYPE</label>
            <select value={type} onChange={e => setType(e.target.value)} style={inputStyle}>
              {ASSET_TYPES.map(t => <option key={t}>{t}</option>)}
            </select>
          </div>

          <div>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 6 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: "var(--slate)" }}>PROMPT</label>
              {TEMPLATES[type] && (
                <button onClick={() => setPrompt(TEMPLATES[type])} style={{ fontSize: 11, color: "var(--accent)", fontWeight: 500 }}>
                  Use template ↗
                </button>
              )}
            </div>
            <textarea value={prompt} onChange={e => setPrompt(e.target.value)}
              placeholder={`Describe the ${type} you want…`}
              rows={8} style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }}
              onFocus={e => e.target.style.borderColor = "var(--accent)"}
              onBlur={e => e.target.style.borderColor = "var(--border)"} />
          </div>

          <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}>
            <input type="checkbox" checked={webSearch} onChange={e => setWebSearch(e.target.checked)}
              style={{ width: 16, height: 16, accentColor: "var(--accent)" }} />
            <div>
              <div style={{ fontSize: 13, fontWeight: 500 }}>Enable web search</div>
              <div style={{ fontSize: 11, color: "var(--slate)" }}>Claude searches the web for current information</div>
            </div>
          </label>

          {error && <div style={{ background: "var(--red-lt)", color: "var(--red)", padding: "10px 14px", borderRadius: 8, fontSize: 13 }}>{error}</div>}

          <Btn loading={generating} onClick={generate} size="lg" style={{ background: "linear-gradient(135deg, #6366F1, #8B5CF6)" }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="#fff" strokeWidth="2" strokeLinejoin="round"/></svg>
            {generating ? "Generating…" : "Generate with Claude"}
          </Btn>
        </div>
      </div>

      {/* Output panel */}
      <div style={{ display: "flex", flexDirection: "column", gap: 12, overflowY: "auto" }}>
        {generating ? (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12 }}>
            <div style={{ width: 40, height: 40, border: "3px solid var(--accent-lt)", borderTop: "3px solid var(--accent)", borderRadius: "50%", animation: "spin .8s linear infinite", marginBottom: 16 }} />
            <div style={{ fontWeight: 600 }}>Claude is writing…</div>
            <div style={{ color: "var(--slate)", fontSize: 13, marginTop: 4 }}>Usually takes 5–15 seconds</div>
          </div>
        ) : result ? (
          <>
            <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
              <div style={{ padding: "14px 20px", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between", background: "var(--bg)" }}>
                <div style={{ fontSize: 12, fontWeight: 600, color: "var(--slate)" }}>GENERATED OUTPUT</div>
                <button onClick={() => navigator.clipboard.writeText(result)} style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>Copy</button>
              </div>
              <div style={{ flex: 1, overflowY: "auto", padding: 20, fontSize: 14, lineHeight: 1.75, color: "var(--text2)", whiteSpace: "pre-wrap" }}>
                {result}
              </div>
            </div>

            {!saved ? (
              <div style={{ background: "var(--white)", border: "1px solid var(--border)", borderRadius: 12, padding: 16, display: "flex", gap: 10 }}>
                <input value={name} onChange={e => setName(e.target.value)} placeholder="Name this asset to save…"
                  style={{ ...inputStyle, flex: 1 }} />
                <Btn loading={saving} onClick={save} style={{ flexShrink: 0 }}>Save asset</Btn>
              </div>
            ) : (
              <div style={{ background: "var(--green-lt)", border: "1px solid var(--green)", borderRadius: 12, padding: "14px 18px", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 18 }}>✅</span>
                <div>
                  <div style={{ fontWeight: 600, color: "#065F46", fontSize: 13 }}>Saved to Collateral</div>
                  <button onClick={() => { setResult(""); setPrompt(""); setName(""); setSaved(false); }}
                    style={{ fontSize: 12, color: "#065F46", opacity: .7 }}>Generate another →</button>
                </div>
              </div>
            )}
          </>
        ) : (
          <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "var(--white)", border: "2px dashed var(--border)", borderRadius: 12, color: "var(--slate)" }}>
            <div style={{ fontSize: 40, marginBottom: 12 }}>✨</div>
            <div style={{ fontWeight: 600, marginBottom: 4 }}>Output will appear here</div>
            <div style={{ fontSize: 13, textAlign: "center", maxWidth: 240 }}>Fill in the prompt on the left and click Generate</div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── APP SHELL ───────────────────────────────────────────────────────────────
function AppShell({ token, user, onLogout }) {
  const [activeView, setActiveView] = useState("dashboard");
  const [assets, setAssets] = useState([]);
  const [loadingAssets, setLoadingAssets] = useState(true);

  useEffect(() => {
    apiFetch("/assets", token)
      .then(setAssets)
      .catch(console.error)
      .finally(() => setLoadingAssets(false));
  }, [token]);

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar user={user} activeView={activeView} setActiveView={setActiveView} onLogout={onLogout} />
      <main style={{ marginLeft: "var(--sidebar-w)", flex: 1, padding: "32px 36px", overflowY: "auto", minHeight: "100vh" }}>
        {loadingAssets ? (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "60vh" }}>
            <div style={{ width: 32, height: 32, border: "3px solid var(--border)", borderTop: "3px solid var(--accent)", borderRadius: "50%", animation: "spin .8s linear infinite" }} />
          </div>
        ) : (
          <>
            {activeView === "dashboard" && <Dashboard assets={assets} user={user} setActiveView={setActiveView} />}
            {activeView === "assets" && <AssetsView assets={assets} setAssets={setAssets} token={token} setActiveView={setActiveView} />}
            {activeView === "generate" && <GenerateView token={token} onAssetCreated={a => setAssets(prev => [a, ...prev])} />}
          </>
        )}
      </main>
    </div>
  );
}

// ─── ROOT ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [token, setToken] = useState(() => localStorage.getItem("gtm_token"));
  const [user, setUser] = useState(() => {
    try { return JSON.parse(localStorage.getItem("gtm_user")); } catch { return null; }
  });

  function handleLogin(tok, usr) {
    localStorage.setItem("gtm_token", tok);
    localStorage.setItem("gtm_user", JSON.stringify(usr));
    setToken(tok); setUser(usr);
  }

  function handleLogout() {
    fetch(`${API}/auth/logout`, { method: "POST", headers: authHeaders(token) }).catch(() => {});
    localStorage.removeItem("gtm_token");
    localStorage.removeItem("gtm_user");
    setToken(null); setUser(null);
  }

  return (
    <>
      <GlobalStyle />
      {token && user
        ? <AppShell token={token} user={user} onLogout={handleLogout} />
        : <LoginPage onLogin={handleLogin} />}
    </>
  );
}
