# 🏝️ Danylo's Zoo Island Portfolio

A 3D interactive portfolio built with **Next.js** and **Three.js** — each zoo exhibit represents a career milestone with themed animals.

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![Three.js](https://img.shields.io/badge/Three.js-r162-orange?logo=three.js)
![React](https://img.shields.io/badge/React-18-blue?logo=react)

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ installed → [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**

### Setup

```bash
# 1. Navigate into the project
cd zoo-portfolio

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📦 Build for Production

```bash
# Build optimized production bundle
npm run build

# Start production server
npm start
```

## 🌐 Deploy to Vercel (Recommended)

The easiest way to deploy:

1. Push this project to a **GitHub** repository
2. Go to [vercel.com](https://vercel.com) and sign in with GitHub
3. Click **"New Project"** → Import your repo
4. Click **"Deploy"** — done!

Your site will be live at `https://your-project.vercel.app`

### Alternative: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## 🗂️ Project Structure

```
zoo-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.js        # Root layout with fonts & metadata
│   │   ├── page.js           # Home page (loads 3D portfolio)
│   │   └── globals.css       # Global styles
│   └── components/
│       └── ZooPortfolio.jsx   # Main 3D zoo island component
├── public/                    # Static assets
├── package.json
├── next.config.js
└── jsconfig.json
```

## 🎮 Controls

- **Drag** to orbit the island
- **Scroll** to zoom in/out
- **Click** glowing orbs to explore each exhibit
- **Bottom bar** to navigate between experiences
- **Top nav** for About, Skills, and Projects panels

## 🦁 Zoo Exhibits

| Exhibit | Animal | Company |
|---------|--------|---------|
| The Lion's Domain | 🦁 Lion | Costo AI |
| The Eagle's Perch | 🦅 Eagle | DazzleLabs |
| The Wolf's Trail | 🐺 Wolf | PXN Phantom Network |
| The Dolphin Lagoon | 🐬 Dolphin | Node Audio Ltd |
| The Fox's Den | 🦊 Fox | Fleamint |

## ✏️ Customization

Edit `src/components/ZooPortfolio.jsx` to update:

- **PROFILE** — your name, summary, email, location
- **EXPERIENCES** — work history, roles, highlights
- **SKILLS** — categorized skill tags
- **FEATURED_PROJECTS** — project showcase cards

---

Built with ❤️ using Next.js + Three.js
