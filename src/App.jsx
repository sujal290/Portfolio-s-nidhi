import React, { useEffect, useRef, useState } from "react";
import { Download, Mail, CheckCircle2, ArrowUpRight, Menu, X, MapPin } from "lucide-react";

/* ----------------------------------------------------------------------
   DATA
---------------------------------------------------------------------- */

const TAGLINES = [
  "Program Management",
  "Strategic Planning",
  "Business Operations",
  "International Leadership Programs",
];

const ACHIEVEMENTS = [
  { prefix: "\u20B9", value: 9, suffix: " Cr", label: "Annual budgets managed" },
  { prefix: "", value: 1000, suffix: "+", label: "Participants delivered" },
  { prefix: "", value: 14, suffix: "+", label: "Global destinations" },
  { prefix: "\u20B9", value: 34, suffix: " L", label: "Cost savings, CDO Forum" },
  { prefix: "", value: 3, suffix: "", label: "Leadership awards" },
];

const EXPERIENCE = [
  {
    role: "Senior Manager",
    company: "Life Insurance Company",
    period: "Apr 2026 \u2014 Present",
    points: [
      "Promoted to Senior Manager after 4 years as Regional Manager.",
      "Own end-to-end strategic planning with expanded scope and budget ownership beyond \u20B99 Cr.",
      "Primary stakeholder for cross-functional approvals across Finance, Taxation, Procurement and Business.",
    ],
  },
  {
    role: "Regional Manager",
    company: "Life Insurance Company",
    period: "Apr 2022 \u2014 Mar 2026",
    points: [
      "Led end-to-end planning and execution of international & domestic leadership programs, R&R events and Shikhar Contests for 1,000+ participants.",
      "Owned the complete RFP lifecycle \u2014 vendor sourcing, negotiation, procurement \u2014 across 14+ international destinations.",
      "Executed 4 CEO Forums across Seoul, Paris, London and Adelaide; delivered \u20B934 lakh in cost savings.",
    ],
  },
  {
    role: "Associate Regional Manager",
    company: "Life Insurance Company",
    period: "Apr 2020 \u2014 Mar 2022",
    points: [
      "Owned Grievance Management for a 2-year tenure \u2014 led the end-to-end complaint lifecycle.",
      "Prepared governance dashboards and MIS reports, driving process improvements.",
      "Supported operational execution of leadership programs and R&R initiatives.",
    ],
  },
  {
    role: "Assistant Manager \u2013 Administration & Persistency",
    company: "Life Insurance Company",
    period: "Aug 2018 \u2014 Mar 2020",
    points: [
      "Ran administration operations and tracked persistency performance.",
      "Delivered MIS reports and dashboards for real-time operational visibility.",
      "Supported leadership program and event execution through logistical coordination.",
    ],
  },
  {
    role: "Assistant Manager \u2013 Audit, Governance & Fraud Prevention",
    company: "YES BANK",
    period: "Sep 2016 \u2014 Mar 2018",
    points: [
      "Administered governance MIS, fraud reporting and audit coordination.",
      "Prepared executive dashboards and monitored audit observations through to closure.",
    ],
  },
  {
    role: "Administration",
    company: "YES BANK",
    period: "Apr 2014 \u2014 Aug 2016",
    points: [
      "Directed branch administration and service complaints.",
      "Coordinated vendors, facilities, procurement and operational support.",
    ],
  },
];

const DESTINATIONS = [
  "Dubai", "Greece", "Amsterdam", "Sydney", "Gold Coast", "Kuala Lumpur",
  "Baku", "Almaty", "Beijing", "Prague", "Langkawi", "Phuket", "Bangkok", "Pattaya",
];

const SKILLS = [
  "Strategic Planning", "Program Management", "Business Operations", "Budget Management",
  "Procurement", "Vendor Management", "Contract Negotiation", "Stakeholder Management",
  "Governance & Compliance", "Audit Management", "Risk Management", "Cross-functional Leadership",
  "International Event Execution", "MIS & Analytics",
];

const EDUCATION = [
  { degree: "MBA", school: "GGSIPU", period: "2012\u20132014" },
  { degree: "Diploma in International Business", school: "", period: "2011\u20132012" },
  { degree: "BBA", school: "GGSIPU", period: "2008\u20132011" },
  { degree: "Class XII, CBSE", school: "St. Xavier's School \u2014 Distinction", period: "2008" },
  { degree: "Class X, CBSE", school: "St. Xavier's School \u2014 Distinction", period: "2006" },
];

const AWARDS = [
  { name: "Lead Mindset Award", year: "2026" },
  { name: "Outstanding Contribution", year: "2026" },
  { name: "Lead Collaboration Award", year: "2025" },
  { name: "Star Awards", year: "2022\u20132025" },
];

/* ----------------------------------------------------------------------
   HOOKS
---------------------------------------------------------------------- */

function useInView(threshold = 0.18) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, inView];
}

function useCountUp(target, inView, duration = 1400) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let raf;
    let start = null;
    function step(ts) {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    }
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, duration]);
  return val;
}

/* ----------------------------------------------------------------------
   SMALL COMPONENTS
---------------------------------------------------------------------- */

function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const [ref, inView] = useInView(0.15);
  const Tag = as;
  return (
    <Tag
      ref={ref}
      className={`reveal ${inView ? "reveal-in" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}

function Eyebrow({ children }) {
  return <div className="eyebrow">{children}</div>;
}

function RotatingTagline() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setIdx((i) => (i + 1) % TAGLINES.length), 2600);
    return () => clearInterval(id);
  }, []);
  return (
    <div className="tagline-slot">
      <span key={idx} className="tagline-word">
        {TAGLINES[idx]}
      </span>
    </div>
  );
}

function StatCard({ item, delay }) {
  const [ref, inView] = useInView(0.3);
  const val = useCountUp(item.value, inView);
  return (
    <div ref={ref} className={`stat-card reveal ${inView ? "reveal-in" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
      <div className="stat-value">
        {item.prefix}
        {val.toLocaleString("en-IN")}
        {item.suffix}
      </div>
      <div className="stat-label">{item.label}</div>
    </div>
  );
}

function FlapChar({ ch, delay, active }) {
  return (
    <span className="flap-cell">
      <span className={`flap-char ${active ? "flap-active" : ""}`} style={{ transitionDelay: `${delay}ms` }}>
        {ch}
      </span>
    </span>
  );
}

function FlapRow({ city, index, active }) {
  const padded = city.toUpperCase().padEnd(13, "\u00A0").slice(0, 13);
  const chars = padded.split("");
  return (
    <div className="flap-row">
      <span className="flap-row-index">{String(index + 1).padStart(2, "0")}</span>
      <div className="flap-row-chars">
        {chars.map((ch, i) => (
          <FlapChar key={i} ch={ch} delay={index * 70 + i * 16} active={active} />
        ))}
      </div>
      <div className="flap-status">
        <CheckCircle2 size={13} className="flap-status-icon" />
        DELIVERED
      </div>
    </div>
  );
}

function GlobalBoard() {
  const [ref, inView] = useInView(0.08);
  return (
    <div ref={ref} className="flap-board">
      <div className="flap-board-head">
        <span>PROGRAM</span>
        <span>DESTINATION</span>
        <span>STATUS</span>
      </div>
      {DESTINATIONS.map((c, i) => (
        <FlapRow key={c} city={c} index={i} active={inView} />
      ))}
    </div>
  );
}

/* Ambient hero network */
function HeroNetwork() {
  const nodes = [
    [150, 220], [340, 120], [520, 190], [700, 90], [860, 230],
    [1030, 150], [250, 430], [480, 500], [760, 460], [980, 520],
  ];
  const arcs = [
    "M150,220 Q260,60 340,120",
    "M340,120 Q430,40 520,190",
    "M520,190 Q610,60 700,90",
    "M700,90 Q790,180 860,230",
    "M860,230 Q950,120 1030,150",
    "M150,220 Q210,340 250,430",
    "M250,430 Q360,380 480,500",
    "M480,500 Q600,420 760,460",
    "M760,460 Q870,380 980,520",
    "M520,190 Q600,330 480,500",
  ];
  return (
    <svg className="hero-network" viewBox="0 0 1200 620" preserveAspectRatio="xMidYMid slice">
      <defs>
        <pattern id="dotgrid" width="34" height="34" patternUnits="userSpaceOnUse">
          <circle cx="1" cy="1" r="1" fill="rgba(198,161,91,0.16)" />
        </pattern>
      </defs>
      <rect width="1200" height="620" fill="url(#dotgrid)" />
      {arcs.map((d, i) => (
        <path key={i} d={d} className={`hero-arc ${i % 2 === 0 ? "hero-arc-a" : "hero-arc-b"}`} />
      ))}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          <circle cx={x} cy={y} r="9" className="hero-node-pulse" style={{ animationDelay: `${i * 0.4}s` }} />
          <circle cx={x} cy={y} r="3" className="hero-node-dot" />
        </g>
      ))}
    </svg>
  );
}

/* ----------------------------------------------------------------------
   MAIN COMPONENT
---------------------------------------------------------------------- */

export default function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);

  const scrollTo = (id) => {
    setNavOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const navItems = [
    ["summary", "Summary"],
    ["experience", "Experience"],
    ["footprint", "Global Footprint"],
    ["skills", "Skills"],
    ["contact", "Contact"],
  ];

  return (
    <div className="portfolio-root">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap');

        .portfolio-root {
          --ink: #0A1526;
          --ink2: #101F38;
          --ink3: #0D1A30;
          --brass: #C6A15B;
          --brass-soft: #E3C888;
          --ice: #6FA3C7;
          --paper: #F3EFE4;
          --muted: #8FA0BE;
          --line: rgba(198,161,91,0.18);
          background: var(--ink);
          color: var(--paper);
          font-family: 'IBM Plex Sans', sans-serif;
          -webkit-font-smoothing: antialiased;
          overflow-x: hidden;
        }
        .font-display { font-family: 'Fraunces', serif; }
        .font-mono { font-family: 'IBM Plex Mono', monospace; }

        .eyebrow {
          font-family: 'IBM Plex Mono', monospace;
          font-size: 12px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--brass);
          margin-bottom: 14px;
        }

        /* reveal on scroll */
        .reveal { opacity: 0; transform: translateY(22px); transition: opacity 0.7s ease, transform 0.7s ease; }
        .reveal-in { opacity: 1; transform: translateY(0); }

        /* nav */
        .nav-wrap {
          position: sticky; top: 0; z-index: 50;
          background: rgba(10,21,38,0.82);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid var(--line);
        }

        /* hero */
        .hero-section {
          position: relative;
          min-height: 92vh;
          display: flex;
          align-items: center;
          overflow: hidden;
          background: radial-gradient(120% 90% at 15% 10%, rgba(198,161,91,0.10) 0%, rgba(10,21,38,0) 55%),
                      radial-gradient(90% 70% at 90% 90%, rgba(111,163,199,0.10) 0%, rgba(10,21,38,0) 55%),
                      linear-gradient(180deg, #0A1526 0%, #0B1830 55%, #0A1526 100%);
        }
        .hero-network { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.9; }
        .hero-arc { fill: none; stroke-width: 1.4; stroke-dasharray: 5 9; }
        .hero-arc-a { stroke: rgba(198,161,91,0.55); animation: dashflow 7s linear infinite; }
        .hero-arc-b { stroke: rgba(111,163,199,0.45); animation: dashflow 9s linear infinite reverse; }
        @keyframes dashflow { to { stroke-dashoffset: -240; } }
        .hero-node-dot { fill: var(--brass-soft); }
        .hero-node-pulse { fill: none; stroke: var(--brass); stroke-width: 1.2; opacity: 0.7; transform-origin: center; transform-box: fill-box; animation: nodepulse 3.2s ease-out infinite; }
        @keyframes nodepulse { 0% { transform: scale(1); opacity: 0.7; } 100% { transform: scale(2.6); opacity: 0; } }

        .tagline-slot { height: 1.6em; overflow: hidden; position: relative; }
        .tagline-word { display: inline-block; animation: taglineIn 0.6s ease; }
        @keyframes taglineIn { from { opacity: 0; transform: translateY(14px);} to { opacity: 1; transform: translateY(0);} }

        .hero-name { animation: heroFade 1s ease 0.1s both; }
        .hero-sub { animation: heroFade 1s ease 0.35s both; }
        .hero-cta { animation: heroFade 1s ease 0.6s both; }
        @keyframes heroFade { from { opacity: 0; transform: translateY(16px);} to { opacity: 1; transform: translateY(0);} }

        .btn-primary {
          background: var(--brass);
          color: var(--ink);
          font-weight: 600;
        }
        .btn-primary:hover { background: var(--brass-soft); }
        .btn-ghost {
          border: 1px solid var(--line);
          color: var(--paper);
        }
        .btn-ghost:hover { border-color: var(--brass); color: var(--brass-soft); }

        /* stat cards */
        .stat-card {
          border: 1px solid var(--line);
          background: linear-gradient(180deg, rgba(198,161,91,0.05), rgba(198,161,91,0));
          border-radius: 4px;
          padding: 28px 20px;
          transition: border-color 0.3s ease, transform 0.3s ease;
        }
        .stat-card:hover { border-color: var(--brass); transform: translateY(-4px); }
        .stat-value { font-family: 'Fraunces', serif; font-weight: 600; font-size: 2.4rem; color: var(--brass-soft); line-height: 1; }
        .stat-label { margin-top: 10px; font-size: 0.82rem; color: var(--muted); letter-spacing: 0.02em; }

        /* timeline */
        .timeline-rail { position: relative; border-left: 1px solid var(--line); }
        .timeline-dot {
          position: absolute; left: -6px; top: 6px;
          width: 11px; height: 11px; border-radius: 50%;
          background: var(--ink); border: 2px solid var(--brass);
        }
        .timeline-item:hover .timeline-dot { background: var(--brass); }

        /* flap board */
        .flap-board {
          border: 1px solid var(--line);
          border-radius: 4px;
          background: var(--ink3);
          overflow: hidden;
        }
        .flap-board-head {
          display: flex; justify-content: space-between;
          padding: 10px 16px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; letter-spacing: 0.14em;
          color: var(--muted); text-transform: uppercase;
          border-bottom: 1px solid var(--line);
        }
        .flap-row {
          display: flex; align-items: center; gap: 14px;
          padding: 9px 16px;
          border-bottom: 1px solid rgba(198,161,91,0.10);
        }
        .flap-row:last-child { border-bottom: none; }
        .flap-row-index { font-family: 'IBM Plex Mono', monospace; font-size: 11px; color: var(--muted); width: 18px; }
        .flap-row-chars { display: flex; gap: 3px; perspective: 240px; flex: 1; flex-wrap: wrap; }
        .flap-cell { display: inline-block; }
        .flap-char {
          display: flex; align-items: center; justify-content: center;
          width: 15px; height: 20px;
          background: #0F1D33;
          border: 1px solid rgba(198,161,91,0.14);
          border-radius: 2px;
          font-family: 'IBM Plex Mono', monospace;
          font-size: 11px; color: var(--paper);
          transform: rotateX(-90deg); opacity: 0;
          transition: transform 0.55s cubic-bezier(.2,.8,.2,1), opacity 0.35s ease;
        }
        .flap-char.flap-active { transform: rotateX(0deg); opacity: 1; }
        .flap-status {
          font-family: 'IBM Plex Mono', monospace; font-size: 10.5px; letter-spacing: 0.1em;
          color: var(--brass); display: flex; align-items: center; white-space: nowrap;
        }
        .flap-status-icon { margin-right: 5px; }

        /* skill pills */
        .pill {
          border: 1px solid var(--line);
          color: var(--paper);
          font-size: 0.86rem;
          transition: border-color 0.25s ease, color 0.25s ease, background 0.25s ease;
        }
        .pill:hover { border-color: var(--brass); color: var(--brass-soft); background: rgba(198,161,91,0.06); }

        /* section divider label */
        .section-label { color: var(--muted); }

        @media (prefers-reduced-motion: reduce) {
          .reveal, .hero-name, .hero-sub, .hero-cta, .tagline-word { animation: none !important; transition: none !important; opacity: 1 !important; transform: none !important; }
          .hero-arc, .hero-node-pulse { animation: none !important; }
        }
      `}</style>

      {/* NAV */}
      <div className="nav-wrap">
        <div className="max-w-6xl mx-auto px-6 md:px-10 h-16 flex items-center justify-between">
          <span className="font-display text-lg tracking-wide" style={{ color: "var(--brass-soft)" }}>
            NIDHI
          </span>
          <nav className="hidden md:flex items-center gap-8 font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
            {navItems.map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="hover:text-[var(--brass-soft)] transition-colors" style={{ color: "inherit" }}>
                {label}
              </button>
            ))}
          </nav>
          <button className="md:hidden" style={{ color: "var(--brass-soft)" }} onClick={() => setNavOpen((o) => !o)} aria-label="Menu">
            {navOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
        {navOpen && (
          <div className="md:hidden px-6 pb-5 flex flex-col gap-4 font-mono text-xs tracking-widest uppercase" style={{ color: "var(--muted)" }}>
            {navItems.map(([id, label]) => (
              <button key={id} onClick={() => scrollTo(id)} className="text-left">
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* HERO */}
      <section className="hero-section">
        <HeroNetwork />
        <div className="relative max-w-6xl mx-auto px-6 md:px-10 py-24 w-full">
          <Eyebrow>Program Management &middot; Life Insurance &amp; Banking</Eyebrow>
          <h1 className="hero-name font-display" style={{ fontSize: "clamp(3.2rem, 9vw, 6.5rem)", lineHeight: 0.95, fontWeight: 600 }}>
            Nidhi
          </h1>
          <div className="hero-sub mt-5 flex items-baseline gap-3 flex-wrap">
            <span className="font-mono text-sm" style={{ color: "var(--muted)" }}>Focused on</span>
            <RotatingTagline />
          </div>
          <p className="hero-sub mt-8 max-w-xl text-base md:text-lg" style={{ color: "var(--muted)" }}>
            11+ years leading Analytics, Finance, Governance and Audit before taking
            end-to-end ownership of strategic planning and execution for international
            leadership programs, R&amp;R events and Shikhar Contests.
          </p>
          <div className="hero-cta mt-10 flex flex-wrap gap-4">
            <button onClick={() => scrollTo("contact")} className="btn-primary px-7 py-3 rounded-sm inline-flex items-center gap-2 text-sm">
              Get in touch <ArrowUpRight size={16} />
            </button>
            <button onClick={() => scrollTo("experience")} className="btn-ghost px-7 py-3 rounded-sm inline-flex items-center gap-2 text-sm">
              View experience
            </button>
          </div>
        </div>
      </section>

      {/* SUMMARY */}
      <section id="summary" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal>
          <Eyebrow>Profile</Eyebrow>
          <p className="font-display" style={{ fontSize: "clamp(1.4rem, 2.6vw, 2rem)", lineHeight: 1.5, color: "var(--paper)" }}>
            A results-driven Program Management and Business Operations leader across
            the Life Insurance and Banking sectors &mdash; skilled in vendor negotiation,
            cost optimization and cross-functional governance, with a record of
            delivering premium experiences for 1,000+ participants across 14+ global
            destinations while partnering directly with CEOs and CXOs.
          </p>
        </Reveal>

        <div className="mt-16 grid grid-cols-2 md:grid-cols-5 gap-4 md:gap-6">
          {ACHIEVEMENTS.map((item, i) => (
            <StatCard key={item.label} item={item} delay={i * 90} />
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal>
          <Eyebrow>Career Progression</Eyebrow>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
            Experience
          </h2>
        </Reveal>

        <div className="mt-16 timeline-rail pl-10 md:pl-14">
          {EXPERIENCE.map((job, i) => (
            <Reveal key={job.role + job.period} delay={i * 60} className="timeline-item relative pb-14 last:pb-0">
              <span className="timeline-dot" />
              <div className="font-mono text-xs tracking-widest uppercase mb-2" style={{ color: "var(--brass)" }}>
                {job.period}
              </div>
              <h3 className="font-display text-xl md:text-2xl" style={{ color: "var(--paper)" }}>
                {job.role}
              </h3>
              <div className="text-sm mt-1 mb-4" style={{ color: "var(--muted)" }}>{job.company}</div>
              <ul className="space-y-2 max-w-2xl">
                {job.points.map((pt, j) => (
                  <li key={j} className="text-sm md:text-[15px] leading-relaxed flex gap-3" style={{ color: "#C9D2E0" }}>
                    <span style={{ color: "var(--brass)" }}>&mdash;</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* GLOBAL FOOTPRINT */}
      <section id="footprint" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal>
          <Eyebrow>Global Footprint</Eyebrow>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
            Programs delivered worldwide
          </h2>
          <p className="mt-4 max-w-xl text-sm md:text-base" style={{ color: "var(--muted)" }}>
            End-to-end execution &mdash; from destination feasibility and RFPs to
            embassy coordination and on-ground delivery &mdash; across 14+ international
            destinations.
          </p>
        </Reveal>
        <div className="mt-12">
          <GlobalBoard />
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal>
          <Eyebrow>Core Skills</Eyebrow>
          <h2 className="font-display" style={{ fontSize: "clamp(2rem, 4vw, 2.8rem)" }}>
            What I bring to the table
          </h2>
        </Reveal>
        <Reveal delay={100} className="mt-10 flex flex-wrap gap-3">
          {SKILLS.map((s) => (
            <span key={s} className="pill px-4 py-2 rounded-full">
              {s}
            </span>
          ))}
        </Reveal>

        <div className="mt-20 grid md:grid-cols-2 gap-16">
          <Reveal>
            <Eyebrow>Education</Eyebrow>
            <ul className="space-y-4">
              {EDUCATION.map((e) => (
                <li key={e.degree} className="flex justify-between gap-4 border-b pb-3" style={{ borderColor: "var(--line)" }}>
                  <div>
                    <div className="text-sm md:text-[15px]" style={{ color: "var(--paper)" }}>{e.degree}</div>
                    {e.school && <div className="text-xs mt-1" style={{ color: "var(--muted)" }}>{e.school}</div>}
                  </div>
                  <div className="font-mono text-xs whitespace-nowrap pt-1" style={{ color: "var(--brass)" }}>{e.period}</div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={100}>
            <Eyebrow>Awards</Eyebrow>
            <ul className="space-y-4">
              {AWARDS.map((a) => (
                <li key={a.name} className="flex justify-between gap-4 border-b pb-3" style={{ borderColor: "var(--line)" }}>
                  <div className="text-sm md:text-[15px]" style={{ color: "var(--paper)" }}>{a.name}</div>
                  <div className="font-mono text-xs whitespace-nowrap pt-0.5" style={{ color: "var(--brass)" }}>{a.year}</div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 md:px-10 py-24 md:py-32">
        <Reveal className="border-t pt-16" style={{ borderColor: "var(--line)" }}>
          <Eyebrow>Get in touch</Eyebrow>
          <h2 className="font-display" style={{ fontSize: "clamp(2.2rem, 5vw, 3.4rem)", maxWidth: "18ch" }}>
            Open to Program Management &amp; Strategic Planning opportunities.
          </h2>
          <div className="mt-10 flex flex-wrap gap-4">
            <a href="mailto:hello@nidhi-profile.example" className="btn-primary px-7 py-3 rounded-sm inline-flex items-center gap-2 text-sm">
              <Mail size={16} /> Email me
            </a>
            <button className="btn-ghost px-7 py-3 rounded-sm inline-flex items-center gap-2 text-sm">
              <Download size={16} /> Download r\u00e9sum\u00e9
            </button>
          </div>
          <div className="mt-16 flex items-center gap-2 text-xs font-mono" style={{ color: "var(--muted)" }}>
            <MapPin size={13} /> Based in India &middot; Available for domestic &amp; international roles
          </div>
        </Reveal>
      </section>

      <footer className="max-w-6xl mx-auto px-6 md:px-10 pb-10 pt-6 text-xs font-mono flex justify-between" style={{ color: "var(--muted)", borderTop: "1px solid var(--line)" }}>
        <span>&copy; Nidhi</span>
        <span>Program Management &middot; Strategic Planning &middot; Business Operations</span>
      </footer>
    </div>
  );
}