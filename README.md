![Status](https://img.shields.io/badge/status-active-success)
![Last Commit](https://img.shields.io/github/last-commit/Sukanto54cl/portfolio)
![Website](https://img.shields.io/badge/website-live-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-blue)
![Deploy](https://github.com/Sukanto54cl/portfolio/actions/workflows/deploy-pages.yml/badge.svg)
![Dependabot](https://img.shields.io/badge/dependabot-enabled-brightgreen)

# Sukanto Das — Portfolio

A **personal portfolio website** built with **React + Vite**, styled using **Tailwind CSS** and **shadcn/ui**, with subtle animations via **Framer Motion**.

This portfolio presents my background as a **Data Engineer** with a focus on **geospatial, climate, and environmental data**, highlighting selected projects, skills, education, and interests.  
Detailed professional experience is intentionally kept in the downloadable CV.

---

## 🔗 Live Demo

👉 https://sukanto54cl.github.io/portfolio/ 


---

## Features

- Responsive, mobile-first design
- Dark / Light mode
- Smooth animations with Framer Motion
- Downloadable resume
- Dockerized production build with Nginx
  
---

## Tech Stack

- **React (TypeScript)** — UI development
- **Vite** — fast build tool & dev server
- **Tailwind CSS** — utility-first styling
- **shadcn/ui** — accessible UI components
- **Framer Motion** — subtle animations
- **Lucide React** — icon set
- **Radix UI Icons** — UI icons
- Docker (Nginx, multi-stage build)

---
## Docker Development

Build the image

```bash
docker build -t portfolio .
```

Run the container

```bash
docker run -p 8080:80 portfolio
```

Open http://localhost:8080

---

## Local Development

Clone the repository and run:

```bash
npm install
npm run dev
```
The site will be available at:

http://localhost:5173


---

## Deloyment

This project is automatically deployed to **GitHub Pages** using **GitHub Actions**.

- On every push to `main`, a CI pipeline runs linting and build checks
- If successful, the site is built with the GitHub Pages base path and deployed automatically

---

## License

The **source code** of this project is licensed under the MIT License.

The **content** of this portfolio (text, CV, images, and project descriptions) is personal and may not be reused verbatim without permission.

## 📁 Project Structure

```text
portfolio/
├─ LICENSE
├─ index.html
├─ src/
│  ├─ Portfolio.tsx      # Main portfolio component
│  ├─ App.tsx            # Renders <Portfolio />
│  ├─ main.tsx           # React entry point
│  ├─ index.css          # Tailwind styles
│  └─ components/
│     └─ ui/             # shadcn/ui components
├─ public/
│  ├─ cv_sukanto_das.pdf # Resume (downloadable)
│  └─ sukanto_das.jpg    # Profile photo
├─ vite.config.ts
├─ tailwind.config.js
├─ tsconfig*.json
└─ package.json
