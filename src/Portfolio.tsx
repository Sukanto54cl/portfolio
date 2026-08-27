import { useEffect, useState, type ReactNode } from "react";
import emailjs from "@emailjs/browser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import {
  Mail,
  Phone,
  MapPin,
  Download,
  ExternalLink,
  Moon,
  Sun,
  GraduationCap,
  Building2,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Editable data ---------------------------------------------------------
const BASE_URL = import.meta.env.BASE_URL;

const profile = {
  name: "Sukanto Das",
  tagline: "Data Engineer · Geospatial & Climate Data",
  summary:
    "A Data engineer with the experience of building reliable, reproducible data pipelines across geospatial, environmental, and remote sensing domains. Strong background in Python and SQL, spatial ETL, and scalable data processing. Interested in applying data engineering practices to climate, urban systems, and sustainability-focused problems.",
  location: "Dresden, Germany",
  email: "sukantodas1993@gmail.com",
  phone: "+49 178 918 5535",
  github: "https://github.com/Sukanto54cl",
  linkedin: "https://www.linkedin.com/in/sukanto-das/",
  resumeUrl: `${BASE_URL}cv_sukanto_das.pdf`,
  photoUrl: `${BASE_URL}sukanto_das.jpg`,
};

const skills = {
  "Climate & Scientific Data Processing": [
    "Python (numpy, xarray, pandas, NetCDF4)",
    "CDO",
    "ERA5-Land",
    "CORDEX",
    "Climate extreme index computation",
    "Reproducible scientific workflows",
  ],
  "Geospatial & Environmental Analysis": [
    "GeoPandas",
    "GDAL",
    "Rasterio",
    "Shapely",
    "QGIS",
    "OSM",
    "WFS",
    "Sentinel-2",
    "Landsat",
    "Land-surface and land-use analysis",
    "Remote sensing",
  ],
  "HPC & Infrastructure": [
    "Linux/Bash",
    "HPC cluster exposure",
    "NetCDF I/O",
    "Large-volume batch processing",
    "Job automation",
  ],
  "Databases & Storage": [
    "PostgreSQL/PostGIS",
    "DuckDB",
    "GeoPackage",
    "Structured and spatial data integration",
    "FAIR-compliant data management",
  ],
  "Visualization & Reporting": [
    "Streamlit",
    "Plotly",
    "Data visualization",
    "Analytical storytelling",
    "Technical documentation for research and practice audiences",
  ],
  "Workflow Quality": [
    "Git",
    "GitHub Actions",
    "Testing",
    "QA/QC",
    "Metadata standards",
    "FAIR-aligned data publication",
  ],
};

const education = [
  {
    degree: "M.Sc. in Hydro Science & Engineering",
    school: "TUD | Dresden University of Technology, Germany",
    details:
      "Thesis: Modeling of Urban Fabrics to Activate Net‑Zero Intervention: A Geo‑Semantic Approach",
  },
  {
    degree: "Bachelor of Urban & Regional Planning (BURP)",
    school: "Khulna University of Engineering & Technology (KUET), Bangladesh",
    details:
      "Thesis: Investigating the Coastal Livelihood in relation to Land-use/Land-cover Change Modeling (LULCCM): A case study of Sharankhola, Bagerhat",
  },
];

const projects = [
  {
    title: "Tropical Nights across Europe (TR20, 1990–2025)",
    org: "Personal Project",
    dates: "Aug 2026",
    blurb:
      "Built a reproducible climate pipeline computing the TR20 tropical-nights index (Tmin > 20 °C) over Europe from AgERA5 daily grids on Google Earth Engine. Derived spell length, seasonal timing, 1991–2020 anomalies and per-cell trends, then published annual NetCDF grids, decade maps, per-country zonal statistics and an interactive D3 infographic.",
    stack: [
      "Google Earth Engine",
      "AgERA5",
      "xarray",
      "Dask",
      "NumPy",
      "GeoPandas",
      "Cartopy",
      "Matplotlib",
      "D3.js",
      "TopoJSON",
    ],
    link: "https://tropical-nights-europe.netlify.app/",
    linkLabel: "Demo",
    repo: "https://github.com/Sukanto54cl/tropical-nights-europe",
  },
  {
    title: "Urban Public Transit Frequency Indicator for Germany",
    org: "IOER Research Data Center",
    dates: "2022 – 2025",
    blurb:
      "Built an end-to-end geospatial ETL pipeline to generate nationwide public transit frequency indicators using GTFS, OSM, and INSPIRE grids. Implemented spatio-temporal aggregation, network-based accessibility modeling, and rigorous QA/QC.",
    stack: [
      "Python",
      "GTFS",
      "OSM",
      "INSPIRE grid",
      "GeoPandas",
      "PostGIS",
      "Network analysis",
      "ETL pipelines",
    ],
    link: "https://doi.org/10.71830/ABPCUS",
  },

  {
    title: "Geo‑Semantic Urban Fabrics for Net‑Zero Interventions",
    org: "Leibniz Institute of Ecological Urban and Regional Development (IOER)",
    dates: "May 2025 – Sep 2025",
    blurb:
      "Unsupervised NLP (LDA, Doc2Vec) on POIs to extract semantic patterns; classified Dresden by urban fabric theory; mapped intervention hotspots.",
    stack: ["OSMnx", "GeoPandas", "DuckDB", "Apache Sedona", "Gensim", "Matplotlib", "Plotly", "Git", "QGIS"],
    link: "#",
  },
  {
    title: "E‑learning Tool for Spatial Dynamics",
    org: "IOER",
    dates: "Jan 2025 – Apr 2025",
    blurb:
      "Read WFS via OWSLib, processed OSM via Overpy, tracked settlement & traffic area changes, integrated GHSL with GEE API.",
    stack: ["QGIS", "GeoPandas", "Rasterio", "Plotly", "Seaborn", "Matplotlib", "OWSLib", "OSMnx", "Overpy", "GEE"],
  },
  {
    title: "Transit Visualization & Processing (GTFS)",
    org: "IOER",
    dates: "Jun 2023 – Dec 2024",
    blurb:
      "Automated GTFS workflows (QGIS model builder), data cleaning with GeoPandas, Streamlit dashboard; OpenRouteService API integration.",
    stack: ["QGIS", "GeoPandas", "Plotly", "Streamlit", "OpenRouteService"],
  },
  {
    title: "Climate Extremes in Sudan (CORDEX Ensemble)",
    org: "TU Dresden",
    dates: "Apr 2023 – Sep 2023",
    blurb:
      "Analyzed downscaled CORDEX vs. ERA5 Land; computed climate extreme indices for RCP8.5 (2071–2100).",
    stack: ["CDO", "NetCDF4", "Pandas", "NumPy", "Matplotlib"],
  },
];

const interests = [
  "GeoAI & geo-semantic modeling",
  "AI for Earth observation",
  "Urban sustainability & net-zero interventions",
  "Remote sensing for climate risk",
  "Spatial data engineering & reproducible pipelines",
  "OpenStreetMap / open data ecosystems",
  "Public transport & accessibility analytics",
];

const publications = [
  {
    title:
      "Investigating the Coastal Livelihood in relation to Landuse Landcover Change Modelling: Sharankhola, Bagerhat, Bangladesh",
    authors: "Das, S.; Ashikuzzaman, M.; Esraz Ul‑Zannat, M.",
    year: "2016",
    venue: "Bangladesh Institute of Planners",
    link: "#",
  },
];

const certs = [
  {
    title: "AI School on Scalable Data Analytics & HPC",
    org: "ScaDS.AI Leipzig, Leibniz Association & IOM",
    year: "2023",
    note: "ML pipelines, visualization, and AI deployment on HPC clusters",
  },
  {
    title: "AI School on Deep Learning, Data Visualization & LLMs",
    org: "ScaDS.AI Leipzig, Leibniz Association & IOM",
    year: "2025",
    note: "Data wrangling, deep learning, LLMs, and visualization using JupyterHub on HPC",
  },
];

// --- Helpers ----------------------------------------------------------------
function useDarkMode() {
  const [dark, setDark] = useState(true);
  useEffect(() => {
    const root = window.document.documentElement;
    if (dark) root.classList.add("dark");
    else root.classList.remove("dark");
  }, [dark]);
  return { dark, setDark };
}

type SectionProps = {
  id: string;
  num: string;
  title: string;
  children: ReactNode;
};

const Section = ({ id, num, title, children }: SectionProps) => (
  <section id={id} className="scroll-mt-24 py-8">
    <div className="max-w-5xl mx-auto px-4">
      <div className="ds-sec-head">
        <span className="ds-sec-num">{num}</span>
        <h2 className="ds-sec-title">{title}</h2>
        <div className="ds-sec-line" />
      </div>
      {children}
    </div>
  </section>
);

// --- Main component ---------------------------------------------------------
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const motionDuration = (ms: number) => (reducedMotion ? 0 : ms);

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Portfolio() {
  const { dark, setDark } = useDarkMode();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  async function handleSubmit(e: React.SyntheticEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormStatus("sending");
    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        form,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      );
      setFormStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setFormStatus("error");
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ---- Header ---- */}
      <header
        className="sticky top-0 z-40 backdrop-blur-md border-b"
        style={{ background: "var(--glass)", borderColor: "var(--border-ds)" }}
      >
        <nav className="max-w-5xl mx-auto px-4 flex items-center justify-between h-16">
          <a href="#home" className="flex items-center gap-[11px] no-underline" style={{ textDecoration: "none" }}>
            <div className="ds-brand-mono">SD</div>
            <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "15px", letterSpacing: "-0.01em", color: "var(--text-ds)" }}>
              Sukanto Das
            </span>
          </a>

          <div className="hidden md:flex items-center gap-[2px]">
            {(["skills", "projects", "interests", "publications", "contact"] as const).map((id) => (
              <a key={id} href={`#${id}`} className="ds-navlink">
                {id === "interests" ? "Education" : id.charAt(0).toUpperCase() + id.slice(1)}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1">
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="w-[38px] h-[38px] grid place-items-center rounded-[10px] transition-colors hover:bg-[var(--surface-raised)]"
              aria-label="GitHub"
              style={{ color: "var(--text-muted)" }}
            >
              <GitHubLogoIcon className="w-[18px] h-[18px]" />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="w-[38px] h-[38px] grid place-items-center rounded-[10px] transition-colors hover:bg-[var(--surface-raised)]"
              aria-label="LinkedIn"
              style={{ color: "var(--text-muted)" }}
            >
              <LinkedInLogoIcon className="w-[18px] h-[18px]" />
            </a>
            <button
              onClick={() => setDark(!dark)}
              className="w-[38px] h-[38px] grid place-items-center rounded-[10px] transition-colors hover:bg-[var(--surface-raised)]"
              aria-label="Toggle theme"
              style={{ color: "var(--text-muted)", background: "transparent", border: "none", cursor: "pointer" }}
            >
              {dark ? <Sun className="w-[18px] h-[18px]" /> : <Moon className="w-[18px] h-[18px]" />}
            </button>
          </div>
        </nav>

        {/* Mobile nav strip — hidden on md+ */}
        <div
          className="md:hidden flex gap-1 px-3 py-1 overflow-x-auto border-t"
          style={{ borderColor: "var(--border-ds)", scrollbarWidth: "none" }}
        >
          {(["skills", "projects", "interests", "publications", "contact"] as const).map((id) => (
            <a key={id} href={`#${id}`} className="ds-navlink whitespace-nowrap flex-shrink-0">
              {id === "interests" ? "Education" : id.charAt(0).toUpperCase() + id.slice(1)}
            </a>
          ))}
        </div>
      </header>

      {/* ---- Hero ---- */}
      <section id="home" className="hero-contour scroll-mt-24" style={{ padding: "72px 0 56px" }}>
        <div className="max-w-5xl mx-auto px-4 relative z-10 grid md:grid-cols-[1.55fr_1fr] gap-[52px] items-center">

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration(0.6) }}
          >
            <span className="ds-status">
              <span className="ds-dot" />
              Open to data &amp; geospatial roles
            </span>

            <h1 className="ds-hero-title">
              Hi, I'm<br />
              <span className="ds-accent">Sukanto Das</span>.
            </h1>

            <p className="ds-hero-tagline">{profile.tagline}</p>

            <p className="ds-hero-summary">{profile.summary}</p>

            <div className="mt-7 flex flex-wrap gap-3">
              <a href="#contact">
                <Button
                  size="lg"
                  className="rounded-[11px] h-[50px] px-6 font-semibold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <Mail className="w-4 h-4 mr-2" /> Get in touch
                </Button>
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-[11px] h-[50px] px-6 font-semibold"
                  style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                >
                  <Download className="w-4 h-4 mr-2" /> Download CV
                </Button>
              </a>
            </div>

            <div className="ds-meta-row mt-[26px]">
              <span className="inline-flex items-center gap-[7px]">
                <MapPin className="w-[14px] h-[14px]" style={{ color: "var(--text-subtle)" }} />
                {profile.location}
              </span>
              <span className="inline-flex items-center gap-[7px]">
                <Phone className="w-[14px] h-[14px]" style={{ color: "var(--text-subtle)" }} />
                {profile.phone}
              </span>
              <span className="inline-flex items-center gap-[7px]">
                <GraduationCap className="w-[14px] h-[14px]" style={{ color: "var(--text-subtle)" }} />
                M.Sc. TU Dresden
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: motionDuration(0.6), delay: motionDuration(0.1) }}
          >
            <div className="ds-photo-card">
              <div className="ds-photo-frame">
                <img src={profile.photoUrl} alt="Sukanto Das" />
              </div>
              <div className="ds-photo-tagbar">
                <span className="ds-pill">Geo · Climate · RS</span>
                <span className="ds-pill">Dresden ◷ CET</span>
              </div>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ---- Skills ---- */}
      <Section id="skills" num="01" title="Skills">
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(skills).map(([cat, items]) => (
            <div key={cat} className="ds-card interactive">
              <span className="ds-eyebrow">{cat}</span>
              <div className="flex flex-wrap gap-2 mt-3">
                {items.map((it) => (
                  <span key={it} className="ds-tag">{it}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ---- Projects ---- */}
      <Section id="projects" num="02" title="Featured Projects">
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: motionDuration(0.4), delay: motionDuration(i * 0.05) }}
              className="ds-card interactive"
            >
              <div className="flex items-start justify-between gap-3">
                <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "18px", letterSpacing: "-0.015em", color: "var(--text-ds)", margin: 0 }}>
                  {p.title}
                </h3>
                <div className="flex items-center gap-3 shrink-0">
                  {p.link && p.link !== "#" && (
                    <a href={p.link} target="_blank" rel="noreferrer" className="ds-viewlink">
                      {p.linkLabel ?? "DOI"} <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {p.repo && (
                    <a href={p.repo} target="_blank" rel="noreferrer" className="ds-viewlink">
                      Code <GitHubLogoIcon className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>
              <div className="flex flex-wrap gap-[6px_16px] mt-2" style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11.5px", color: "var(--text-muted)" }}>
                <span className="inline-flex items-center gap-[6px]">
                  <Building2 className="w-3 h-3" style={{ color: "var(--text-subtle)" }} />
                  {p.org}
                </span>
                <span>{p.dates}</span>
              </div>
              <p className="mt-[10px] text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                {p.blurb}
              </p>
              <div className="flex flex-wrap gap-2 mt-[14px]">
                {p.stack.map((t) => (
                  <span key={t} className="ds-tag">{t}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ---- Education & Interests ---- */}
      <Section id="interests" num="03" title="Education & Interests">
        <Tabs defaultValue="edu" className="w-full">
          <TabsList
            className="rounded-[11px] p-1"
            style={{ background: "var(--surface-sunken)", border: "1px solid var(--border-ds)" }}
          >
            <TabsTrigger value="edu" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Education</TabsTrigger>
            <TabsTrigger value="interests" style={{ fontFamily: "'Space Grotesk', sans-serif" }}>Interests</TabsTrigger>
          </TabsList>

          <TabsContent value="edu" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              {education.map((ed) => (
                <div key={ed.degree} className="ds-card">
                  <span className="ds-eyebrow">
                    {ed.degree.startsWith("M.Sc") ? "M.Sc." : "B.URP"}
                  </span>
                  <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "18px", letterSpacing: "-0.015em", color: "var(--text-ds)", marginTop: "4px" }}>
                    {ed.degree.startsWith("M.Sc") ? "Hydro Science & Engineering" : "Urban & Regional Planning"}
                  </h3>
                  <p className="mt-[10px] text-sm" style={{ color: "var(--text-muted)" }}>{ed.school}</p>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{ed.details}</p>
                </div>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="interests" className="mt-4">
            <div className="ds-card">
              <div className="flex flex-wrap gap-2">
                {interests.map((it) => (
                  <span key={it} className="ds-tag">{it}</span>
                ))}
              </div>
              <p className="mt-[14px] text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                I enjoy building reliable data pipelines and spatial models that turn complex geospatial and Earth-observation data into decision-ready insight.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </Section>

      {/* ---- Publications & Certifications ---- */}
      <Section id="publications" num="04" title="Publications & Certifications">
        <div className="grid md:grid-cols-2 gap-4">
          <div className="ds-card">
            <span className="ds-eyebrow">Publications</span>
            <ul className="mt-3 space-y-3">
              {publications.map((p) => (
                <li key={p.title} className="text-sm" style={{ color: "var(--text-muted)" }}>
                  <div style={{ fontWeight: 500, color: "var(--text-ds)" }}>{p.title}</div>
                  <div className="mt-1">{p.authors} · {p.venue} ({p.year})</div>
                </li>
              ))}
            </ul>
          </div>

          <div className="ds-card">
            <span className="ds-eyebrow">Certifications</span>
            <ul className="mt-3 space-y-3">
              {certs.map((c) => (
                <li key={c.title} className="text-sm" style={{ color: "var(--text-muted)" }}>
                  <div style={{ fontWeight: 500, color: "var(--text-ds)" }}>{c.title}</div>
                  <div className="mt-1">{c.org} ({c.year}) — {c.note}</div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* ---- Contact ---- */}
      <Section id="contact" num="05" title="Get in touch">
        <div className="ds-card">
          <div className="grid md:grid-cols-2 gap-9">
            <div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 600, fontSize: "22px", letterSpacing: "-0.015em", color: "var(--text-ds)" }}>
                Let's build climate‑positive cities with data.
              </h3>
              <p className="mt-[10px] text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
                Open to geospatial, data-engineering and urban-sustainability roles. Email me or connect on LinkedIn / GitHub.
              </p>
              <div className="mt-[22px] flex flex-col gap-[13px]">
                <a className="ds-infolink" href={`mailto:${profile.email}`}>
                  <Mail className="w-[15px] h-[15px]" style={{ color: "var(--emerald-400)" }} />
                  {profile.email}
                </a>
                <a className="ds-infolink" href={profile.linkedin} target="_blank" rel="noreferrer">
                  <LinkedInLogoIcon className="w-[15px] h-[15px]" style={{ color: "var(--emerald-400)" }} />
                  linkedin.com/in/sukanto-das
                </a>
                <a className="ds-infolink" href={profile.github} target="_blank" rel="noreferrer">
                  <GitHubLogoIcon className="w-[15px] h-[15px]" style={{ color: "var(--emerald-400)" }} />
                  github.com/Sukanto54cl
                </a>
              </div>
            </div>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="grid grid-cols-2 gap-[14px]">
                <div className="flex flex-col gap-[7px]">
                  <label className="ds-field-label">Name</label>
                  <Input
                    aria-label="Name"
                    placeholder="Jane Mapper"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="rounded-[10px]"
                  />
                </div>
                <div className="flex flex-col gap-[7px]">
                  <label className="ds-field-label">Email</label>
                  <Input
                    aria-label="Email address"
                    type="email"
                    placeholder="you@domain.com"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="rounded-[10px]"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-[7px]">
                <label className="ds-field-label">Subject</label>
                <Input
                  aria-label="Subject"
                  placeholder="Collaboration on a climate pipeline"
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                  className="rounded-[10px]"
                />
              </div>
              <div className="flex flex-col gap-[7px]">
                <label className="ds-field-label">Message</label>
                <Textarea
                  aria-label="Message"
                  placeholder="Tell me about the role or project…"
                  required
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="rounded-[10px] min-h-[110px]"
                />
              </div>
              {formStatus === "success" ? (
                <p style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "13px", color: "var(--emerald-400)" }}>
                  ✓ Message sent — I'll get back to you soon.
                </p>
              ) : (
                <>
                  {formStatus === "error" && (
                    <p className="text-sm text-red-500">Something went wrong. Try emailing directly.</p>
                  )}
                  <Button
                    className="w-full rounded-[11px] h-[50px] font-semibold"
                    style={{ fontFamily: "'Space Grotesk', sans-serif" }}
                    disabled={formStatus === "sending"}
                  >
                    {formStatus === "sending" ? "Sending…" : "Send message"}
                  </Button>
                </>
              )}
            </form>
          </div>
        </div>
      </Section>

      {/* ---- Footer ---- */}
      <footer className="border-t mt-2 py-7" style={{ borderColor: "var(--border-ds)" }}>
        <div className="max-w-5xl mx-auto px-4">
          <div className="ds-foot">
            <span>© {new Date().getFullYear()} Sukanto Das</span>
            <span>Dresden · Built on the SD Design System</span>
          </div>
        </div>
      </footer>

    </div>
  );
}
