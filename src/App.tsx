import React from "react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { DividerHorizontalIcon, GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import { Mail, Phone, MapPin, Download, ExternalLink, Moon, Sun, GraduationCap, Building2, Calendar, Globe2, Newspaper, Sparkles, Layers, Database, GitBranch, Cpu, ChartLine } from "lucide-react";
import { motion } from "framer-motion";

// --- Editable data ---------------------------------------------------------
const profile = {
  name: "Sukanto Das",
  tagline: "Geospatial Programmer • Environmental Data Analyst",
  summary:
    "Spatial data analyst & researcher with 6+ years across geospatial processing, Earth observation, and scalable environmental modeling. Currently finishing an MSc in Hydro Science & Engineering (TU Dresden). Thesis explores geo-semantic urban classification with NLP and topic modeling to support net‑zero interventions.",
  location: "Dresden, Germany",
  email: "sukantodas1993@gmail.com",
  phone: "+49 178 918 5535",
  github: "https://github.com/Sukanto54cl",
  linkedin: "https://www.linkedin.com/in/sukanto-das/",
  resumeUrl: "#", // replace with actual PDF link
};

const skills = {
  "Programming & Analysis": ["Python", "R", "SQL", "bash", "CDO"],
  "Big Data & Systems": ["PySpark", "Apache Sedona", "DuckDB", "PostgreSQL"],
  "ML & NLP": ["Topic Modeling (LDA)", "Doc2Vec", "Gensim", "scikit-learn"],
  "Remote Sensing & GIS": ["ArcGIS", "QGIS", "ENVI", "ERDAS Imagine", "ILWIS", "Google Earth Engine"],
  "Visualization": ["Matplotlib", "Seaborn", "Plotly", "Folium", "Streamlit", "Power BI"],
  "Geospatial Python": ["GeoPandas", "Rasterio", "Shapely", "OSMnx", "Overpy"],
  "Tools": ["Git & GitHub", "VS Code", "Spyder", "Jupyter", "Adobe Illustrator"],
};

const education = [
  {
    degree: "M.Sc. Hydro Science & Engineering (expected Dec 2025)",
    school: "TU Dresden",
    details:
      "Thesis: Modeling of Urban Fabrics to Activate Net‑Zero Intervention: A Geo‑Semantic Approach (Supervisor: Dr. Sujit Kumar Sikder, IOER).",
  },
  {
    degree: "B.URP Urban & Regional Planning (2016)",
    school: "KUET, Bangladesh",
    details:
      "Thesis: Coastal Livelihood vs. Landuse/Landcover Change Modeling (Sharankhola, Bagerhat).",
  },
];

const projects = [
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

const experience = [
  {
    role: "Wissenschaftliche Hilfskraft (Working Student)",
    org: "IOER, Dresden",
    dates: "Jun 2023 – Apr 2025",
    bullets: [
      "Large geospatial data analysis and automated model building",
      "Geospatial statistics with Python; dashboards; Git repo hygiene",
    ],
  },
  {
    role: "Water Data Visualization (Volunteer)",
    org: "Water Science Policy, Munich",
    dates: "Jan 2023 – May 2023",
    bullets: ["Story development, data cleaning/analysis/visualization, geospatial mapping"],
  },
  {
    role: "Data Management Officer",
    org: "Wildlife Conservation Society, Dhaka",
    dates: "Apr 2022 – Sep 2022",
    bullets: [
      "Data collection and quality checks, tool development, statistical reporting",
      "DB maintenance and spatial mapping",
    ],
  },
  {
    role: "Senior Information Management Officer",
    org: "iMMAP, Cox’s Bazar",
    dates: "May 2021 – Dec 2021",
    bullets: [
      "Produced info products (reports, maps), coverage analysis, data viz, DB management",
    ],
  },
  {
    role: "GIS Officer",
    org: "Danish Refugee Council, Cox’s Bazar",
    dates: "Oct 2020 – May 2021",
    bullets: [
      "Map design, data tools, DB admin, trainings, LULC mapping, reporting",
    ],
  },
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
    title: "AI School on Scalable Data Analytics and HPC",
    org: "ScaDS.AI Leipzig, Leibniz Association & IOM",
    year: "2024",
    note: "ML pipelines, AI on HPC clusters, hackathon geospatial analysis",
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

const Section = ({ id, title, icon, children }) => (
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

const Pill = ({ children }) => (
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
              Geospatial Programming for <span className="bg-gradient-to-r from-emerald-500 to-cyan-500 bg-clip-text text-transparent">Urban Sustainability</span>
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
                <div className="aspect-square rounded-2xl bg-gradient-to-br from-emerald-500/20 to-cyan-500/10 grid place-items-center text-6xl font-black">
                  SD
                </div>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Python", "GeoPandas", "OSMnx", "Gensim", "DuckDB", "Sedona", "QGIS"].map((s) => (
                    <Pill key={s}>{s}</Pill>
                  ))}
                </div>
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
      <Section id="projects" title="Selected Projects" icon={<Layers className="w-6 h-6" />}>
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

      {/* Experience & Education */}
      <Section id="experience" title="Experience & Education" icon={<ChartLine className="w-6 h-6" />}>
        <Tabs defaultValue="exp" className="w-full">
          <TabsList className="rounded-2xl">
            <TabsTrigger value="exp">Experience</TabsTrigger>
            <TabsTrigger value="edu">Education</TabsTrigger>
          </TabsList>
          <TabsContent value="exp" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              {experience.map((e) => (
                <Card key={e.role} className="rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{e.role}</CardTitle>
                    <div className="text-sm text-slate-500 dark:text-slate-400">{e.org} • {e.dates}</div>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 space-y-1">
                      {e.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="edu" className="mt-4">
            <div className="grid md:grid-cols-2 gap-4">
              {education.map((ed) => (
                <Card key={ed.degree} className="rounded-2xl">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-start gap-2"><GraduationCap className="w-5 h-5 mt-0.5" />{ed.degree}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-sm text-slate-500 dark:text-slate-400 mb-2">{ed.school}</div>
                    <p>{ed.details}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
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
                <p className="text-slate-600 dark:text-slate-300 mt-2">Email me or connect via LinkedIn/GitHub. I’m open to geospatial, data science, and urban sustainability roles.</p>
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
