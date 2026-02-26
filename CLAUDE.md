# Portfolio - Claude Instructions

## Project Overview
Personal portfolio website for **Mohan Ruttala** — a Full Stack Developer based in Visakhapatnam, Andhra Pradesh.

## Tech Stack
- Pure HTML, CSS, JavaScript (no frameworks or build tools)
- Font Awesome 6.4.0 (CDN) for icons
- Google Fonts: Poppins (body), Raleway (headings)
- GitHub Pages for deployment (via GitHub Actions)

## File Structure
```
portifolio/
├── index.html      # Single-page app with all sections
├── styles.css      # All styles including responsive breakpoints
├── script.js       # Interactivity: nav, scroll, animations, form
├── myprofile.jpg   # Profile photo used in hero and about sections
└── .github/
    └── workflows/  # GitHub Actions for GitHub Pages deployment
```

## Sections in index.html
1. **Hero** — name, title, CTA buttons, profile photo
2. **About** — bio, info grid (name, email, location, status), CV button
3. **Skills** — animated progress bars (Frontend & Backend)
4. **Projects** — 3 project cards (AI Review Tool, Clothes Dryer Alert, AgriScan)
5. **Contact** — contact info, social links, contact form
6. **Footer** — logo, copyright, social links

## Key CSS Variables (styles.css)
```css
--primary-color: #2563eb
--secondary-color: #1e40af
--dark-color: #1e293b
--light-color: #f8fafc
--accent-color: #f97316
--gray-color: #94a3b8
```

## Responsive Breakpoints
- `992px` — stack hero/about/skills/contact columns
- `768px` — mobile nav (hamburger menu activates)
- `576px` — stack hero buttons, full-width buttons

## Owner Info
- **Name:** Mohan Ruttala
- **Email:** ruttalamohan23@gmail.com
- **GitHub:** https://github.com/Mohansaina
- **LinkedIn:** https://www.linkedin.com/in/ruttala-mohan-sai-nandakishore-a73484309/
- **Location:** Visakhapatnam, Andhra Pradesh, India

## Important Notes
- No build step or package manager — edit files directly
- The contact form logs to console only (no backend); update `script.js` if adding a real backend
- "Download CV" button in About section links to `#` — needs a real CV file path
- Twitter social link is a placeholder `#` — update if needed
- Deployment is automatic via GitHub Actions on push to `master`
