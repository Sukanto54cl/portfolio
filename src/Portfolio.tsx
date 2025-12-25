import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
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
  Calendar,
  Globe2,
  Newspaper,
  Sparkles,
  Layers,
  Cpu,
  ChartLine,
} from "lucide-react";
import { motion } from "framer-motion";

// --- Editable data ---------------------------------------------------------
const BASE_URL = import.meta.env.BASE_URL;

const profile = {
  name: "Sukanto Das",
  tagline: "Data Engineer • Geospatial & Climate Data",
  summary:
    "Data engineer with the experience of building reliable, reproducible data pipelines across geospatial, environmental, and remote sensing domains. Strong background in Python and SQL, spatial ETL, and scalable data processing. Interested in applying data engineering practices to climate, urban systems, and sustainability-focused problems.",
  location: "Dresden, Germany",
  email: "sukantodas1993@gmail.com",
  phone: "+49 178 918 5535",
  github: "https://github.com/Sukanto54cl",
  linkedin: "https://www.linkedin.com/in/sukanto-das/",
  resumeUrl: `${BASE_URL}cv_sukanto_das.pdf`,
  photoUrl: `${BASE_URL}sukanto_das.jpg`,
};

const skills = {
  "Data Engineering (Python & SQL)": [
    "ETL pipelines",
    "Workflow automation",
    "Reproducible processing",
    "Data modeling",
    "Unit-tested analytics",
    "API ingestion",
  ],
  "Geospatial ETL & Operations": [
    "GeoPandas",
    "Rasterio",
    "Shapely",
    "GDAL",
    "PostGIS",
    "DuckDB",
    "Geospatial QA/QC",
    "Batch processing",
  ],
  "Remote Sensing": [
    "Sentinel-2",
    "Landsat",
    "LULC classification",
    "Change detection",
    "Preprocessing",
    "Feature extraction",
  ],
  "Feasibility & Operational Analysis": [
    "Spatial/temporal feasibility",
    "Accessibility analysis",
    "Pattern-of-life",
    "Mobility mapping",
    "Demand mapping",
  ],
  "Visualization & Monitoring": [
    "Streamlit",
    "Plotly",
    "Power BI",
    "ArcGIS Online",
    "Operational dashboards",
    "Decision support",
  ],
  "CI/CD & Version Control": [
    "Git",
    "GitHub Actions (familiar)",
    "Testing",
    "Documentation",
    "Reproducible workflows",
  ],
  "GIS Software & Tools": [
    "QGIS",
    "ArcGIS Pro / ModelBuilder",
    "OSMnx",
    "Overpy",
    "FAIR metadata",
    "SOP development",
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
  title: string;
  icon: ReactNode;
  children: ReactNode;
};

type PillProps = { children: ReactNode };

const Section = ({ id, title, icon, children }: SectionProps) => (
  <section id={id} className="scroll-mt-24 py-10">
    <div className="max-w-5xl mx-auto px-4">
      <div className="flex items-center gap-3 mb-6">
        {icon}
        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{title}</h2>
      </div>
      {children}
    </div>
  </section>
);

const Pill = ({ children }: PillProps) => (
  <Badge className="rounded-full px-3 py-1 text-sm" variant="secondary">{children}</Badge>
);

// --- Main component ---------------------------------------------------------
export default function Portfolio() {
  const { dark, setDark } = useDarkMode();

  return (
    <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-slate-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur border-b border-slate-200/60 dark:border-slate-800/60 bg-white/70 dark:bg-slate-950/60">
        <nav className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <a href="#home" className="font-semibold tracking-tight">Sukanto Das</a>
          <div className="flex items-center gap-2">
            <a href={profile.github} target="_blank" rel="noreferrer" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900" aria-label="GitHub">
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noreferrer" className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900" aria-label="LinkedIn">
              <LinkedInLogoIcon className="w-5 h-5" />
            </a>
            <button onClick={() => setDark(!dark)} className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-900" aria-label="Toggle theme">
              {dark ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
            </button>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section id="home" className="pt-12 pb-6">
        <div className="max-w-5xl mx-auto px-4 grid md:grid-cols-5 gap-8 items-center">
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="md:col-span-3">
            <h1 className="text-3xl md:text-5xl font-bold leading-tight">
              Hi! I'm <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Sukanto Das</span>
            </h1>
            <p className="mt-4 text-slate-600 dark:text-slate-300 max-w-2xl">
              {profile.summary}
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={`mailto:${profile.email}`}>
                <Button size="lg" className="rounded-2xl">
                  <Mail className="w-4 h-4 mr-2" /> Contact
                </Button>
              </a>
              <a href={profile.resumeUrl} target="_blank" rel="noreferrer">
                <Button size="lg" variant="secondary" className="rounded-2xl">
                  <Download className="w-4 h-4 mr-2" /> Download CV
                </Button>
              </a>
            </div>
            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1"><MapPin className="w-4 h-4" /> {profile.location}</span>
              <span className="inline-flex items-center gap-1"><Phone className="w-4 h-4" /> {profile.phone}</span>
              <span className="inline-flex items-center gap-1"><Globe2 className="w-4 h-4" /> Open to: Data/Geo roles</span>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }} className="md:col-span-2">
            <Card className="rounded-2xl overflow-hidden">
              <CardContent className="p-6">
                <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gradient-to-br from-emerald-500/20 to-cyan-500/10">
                  <img
                    src={profile.photoUrl}
                    alt="Sukanto Das"
                    className="w-full h-full object-contain bg-slate-900"
                  />
                </div>
                <p className="mt-4 text-sm text-slate-400 text-center">
                  Data Engineer focused on climate, geospatial, remote sensing, and sustainability
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Skills */}
      <Section id="skills" title="Skills" icon={<Cpu className="w-6 h-6" />}>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(skills).map(([cat, items]) => (
            <Card key={cat} className="rounded-2xl">
              <CardHeader className="pb-2"><CardTitle className="text-base">{cat}</CardTitle></CardHeader>
              <CardContent className="flex flex-wrap gap-2">
                {items.map((it) => (
                  <Pill key={it}>{it}</Pill>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* Projects */}
      <Section id="projects" title="Featured Projects" icon={<Layers className="w-6 h-6" />}>
        <div className="grid md:grid-cols-2 gap-4">
          {projects.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }}>
              <Card className="rounded-2xl h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center justify-between">
                    <span>{p.title}</span>
                    {p.link && (
                      <a href={p.link} target="_blank" rel="noreferrer" className="inline-flex items-center text-sm font-normal hover:underline">
                        View <ExternalLink className="w-4 h-4 ml-1" />
                      </a>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    <span className="inline-flex items-center gap-1"><Building2 className="w-4 h-4" /> {p.org}</span>
                    <span className="mx-2">•</span>
                    <span className="inline-flex items-center gap-1"><Calendar className="w-4 h-4" /> {p.dates}</span>
                  </div>
                  <p className="text-slate-700 dark:text-slate-300 mb-3">{p.blurb}</p>
                  <div className="flex flex-wrap gap-2">
                    {p.stack.map((t) => (
                      <Pill key={t}>{t}</Pill>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </Section>

      
      {/* Education & Interests */}
    <Section id="interests" title="Education & Interests" icon={<ChartLine className="w-6 h-6" />}>
    <Tabs defaultValue="edu" className="w-full">
        <TabsList className="rounded-2xl">
        <TabsTrigger value="edu">Education</TabsTrigger>
        <TabsTrigger value="interests">Interests</TabsTrigger>
        </TabsList>

        {/* Education FIRST */}
        <TabsContent value="edu" className="mt-4">
        <div className="grid md:grid-cols-2 gap-4">
            {education.map((ed) => (
            <Card key={ed.degree} className="rounded-2xl">
                <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-start gap-2">
                    <GraduationCap className="w-5 h-5 mt-0.5" />
                    {ed.degree}
                </CardTitle>
                </CardHeader>
                <CardContent>
                <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">
                    {ed.school}
                </div>
                <p>{ed.details}</p>
                </CardContent>
            </Card>
            ))}
        </div>
        </TabsContent>

        {/* Interests SECOND */}
        <TabsContent value="interests" className="mt-4">
        <Card className="rounded-2xl">
            <CardContent className="p-6">
            <div className="flex flex-wrap gap-2">
                {interests.map((it) => (
                <Pill key={it}>{it}</Pill>
                ))}
            </div>
            <p className="mt-4 text-sm text-slate-600 dark:text-slate-300">
                I enjoy building reliable data pipelines and spatial models that turn
                complex geospatial and Earth observation data into decision-ready insights.
            </p>
            </CardContent>
        </Card>
        </TabsContent>
    </Tabs>
    </Section>

      {/* Publications & Certifications */}
      <Section id="publications" title="Publications & Certifications" icon={<Newspaper className="w-6 h-6" />}>
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-lg">Publications</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {publications.map((p) => (
                  <li key={p.title} className="text-sm">
                    <div className="font-medium">{p.title}</div>
                    <div className="text-slate-500 dark:text-slate-400">{p.authors} • {p.venue} ({p.year})</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="rounded-2xl">
            <CardHeader className="pb-2"><CardTitle className="text-lg">Certifications</CardTitle></CardHeader>
            <CardContent>
              <ul className="space-y-3">
                {certs.map((c) => (
                  <li key={c.title} className="text-sm">
                    <div className="font-medium">{c.title}</div>
                    <div className="text-slate-500 dark:text-slate-400">{c.org} ({c.year}) — {c.note}</div>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </Section>

      {/* Contact */}
      <Section id="contact" title="Get in touch" icon={<Sparkles className="w-6 h-6" />}>
        <Card className="rounded-2xl">
          <CardContent className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold">Let’s build climate‑positive cities with data</h3>
                <p className="text-slate-600 dark:text-slate-300 mt-2">Email me or connect via LinkedIn/GitHub. I’m open to geospatial, data engineering, and urban sustainability roles.</p>
                <div className="mt-4 space-y-2 text-sm">
                  <div className="flex items-center gap-2"><Mail className="w-4 h-4" /><a className="hover:underline" href={`mailto:${profile.email}`}>{profile.email}</a></div>
                  <div className="flex items-center gap-2"><LinkedInLogoIcon className="w-4 h-4" /><a className="hover:underline" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a></div>
                  <div className="flex items-center gap-2"><GitHubLogoIcon className="w-4 h-4" /><a className="hover:underline" href={profile.github} target="_blank" rel="noreferrer">GitHub</a></div>
                </div>
              </div>
              <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-2 gap-3">
                  <Input placeholder="Name" required className="rounded-2xl" />
                  <Input type="email" placeholder="Email" required className="rounded-2xl" />
                </div>
                <Input placeholder="Subject" className="rounded-2xl" />
                <Textarea placeholder="Message" className="rounded-2xl min-h-[120px]" />
                <Button className="rounded-2xl">Send (disabled demo)</Button>
              </form>
            </div>
          </CardContent>
        </Card>
      </Section>

      {/* Footer */}
      <footer className="py-10 border-t border-slate-200/60 dark:border-slate-800/60">
        <div className="max-w-5xl mx-auto px-4 text-sm text-slate-500 dark:text-slate-400">
          © {new Date().getFullYear()} {profile.name}. Built with React, Tailwind, and shadcn/ui.
        </div>
      </footer>
    </div>
  );
}
