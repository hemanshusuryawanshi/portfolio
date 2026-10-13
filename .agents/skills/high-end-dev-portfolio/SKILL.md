---
name: high-end-dev-portfolio
description: Guidelines, design engineering standards, anti-AI-slop rules, and actionable patterns to build high-end developer portfolios.
---

# High-End Design Engineering & Portfolio Craft (Anti-AI-Slop Guide)

## Core Philosophy: Craft Over Cliché
A high-end developer portfolio does not look like a template, an AI prompt output, or a generic boot-camp clone. It communicates **technical rigor**, **aesthetic precision**, and **attention to micro-details**.

---

## 1. Purging AI Slop (What to Exclude Immediately)

| Anti-Pattern (AI Slop / Cliché) | Why It Hurts Credibility | High-End Dev Replacement |
| :--- | :--- | :--- |
| `class Developer: def __init__(self): ...` | Overused snippet that screams generic template. | Interactive terminal output, raw JSON specs, or live interactive API responses. |
| "10,000+ Lines of Code" | Lines of code is an anti-metric for real engineers. | Highlighting real system metrics (e.g., "Sub-50ms Lambda execution", "99.9% uptime pipeline"). |
| Over-saturated cyan & purple glows | Typical lazy dark-mode template look. | Monochromatic dark space (#0a0a0c) with warm zinc/titanium accents and subtle spotlight shaders. |
| Generic floating physics balls / layout mess | Distracts from content and breaks alignment. | Precision Bento grids, tight layout grids, crisp typography, and purposeful WebGL shaders. |
| Buzzword bullet lists without proof | "Passionate ML engineer building intelligent systems" | Specific technical achievements: "Engineered real-time malicious URL inference using Scikit-Learn & FastAPI." |

---

## 2. Design System & Aesthetic Standards

### Typography & Hierarchy
- **Primary Font**: Modern sans-serif (e.g., *Inter*, *Outfit*, *Space Grotesk*, or system *-apple-system*).
- **Code/Mono Font**: *JetBrains Mono*, *Fira Code*, or *Geist Mono*.
- **Micro Labels**: Uppercase monospace, `10px - 11px`, `letter-spacing: 0.14em`, opacity `0.5 - 0.7`. Example: `01 // SYSTEM SPECIFICATIONS`.
- **Display Headings**: Clean, high-contrast, clamped sizes (`clamp(2.5rem, 6vw, 5rem)`), subtle text clip or solid off-white (`#f4f4f5`).

### Color & Texture
- **Background**: Depth through layering. Base `#08080a`, cards `#121215` with `1px solid rgba(255, 255, 255, 0.08)`.
- **Spotlight Cards**: Mouse-driven CSS gradient tracking `radial-gradient(600px circle at var(--mouse-x) var(--mouse-y), rgba(255, 255, 255, 0.06), transparent 40%)`.
- **Noise Texture**: Grainy opacity overlay (`opacity: 0.035`) to eliminate harsh banding.

---

## 3. High-End Developer Features & Micro-Interactions

### A. Command Palette (`Cmd + K` / `Ctrl + K`)
- Provide a global modal reachable via `Cmd+K` or a quick floating badge.
- Allows instant section jumping, downloading resume, toggling sound/theme, or copying email/API endpoint.

### B. Interactive Terminal / CLI Window
- A toggleable developer console showing real unix-like output:
  - `cat about.json`
  - `curl -X GET /api/v1/skills`
  - `ping hemanshu-aws-lambda.internal`

### C. Bento Grid Section Layouts
- Replace flat list items with a responsive Bento Grid (variable col/row spans).
- Combine live widgets (e.g., Spotify track, Pune tech hub map, live GitHub commit streak, AWS architecture card) in one harmonious grid.

### D. Magnetic Buttons & Cursor Effects
- Subtle magnetic attraction on interactive elements (`transform: translate(x, y)` on mousemove).
- Micro hover states with clean 150ms-200ms cubic-bezier transitions (`cubic-bezier(0.16, 1, 0.3, 1)`).

---

## 4. Curated Design Engineering Resources

### Inspiration & Benchmark Sites
- [Awwwards - Site of the Day (Developer Category)](https://www.awwwards.com/)
- [Godly Website Directory](https://godly.website/)
- [Rauno Freiberg Portfolio (Craft & Motion)](https://rauno.me/)
- [Paco Coursey Design Crafts](https://paco.me/)
- [Emil Kowalski Animations](https://emilkowal.si/)

### Component & Micro-Interaction Libraries
- **Lucide Icons**: Clean, lightweight SVG icon system.
- **GSAP + ScrollTrigger**: Smooth timeline scrubbing and pinned reveals.
- **Matter.js / Three.js**: Purposeful canvas shaders or constrained physics.
- **Canvas-Confetti / Web Audio API**: Subtle interactive feedback.

---

## 5. Implementation Checklist for Portfolio

- [ ] Replace `hemanshu.py` snippet with an interactive terminal/JSON data viewer.
- [ ] Remove anti-metrics like "10k lines of code"; replace with impactful metrics or remove.
- [ ] Refine "About" copy to read like a crisp design engineer / AI systems architect profile.
- [ ] Implement spotlight mouse-tracking effects on all cards (`.bento-card` or `.project-card`).
- [ ] Add `Cmd + K` shortcut command palette for instant navigation and actions.
- [ ] Elevate tech stack from simple floating pills to a categorized, interactive arsenal with live filter stats.
- [ ] Ensure mobile responsiveness, ARIA accessibility, and zero lag (60 FPS rendering).
