# razyprofessional portfolio

A modern, zero-dependency, responsive personal portfolio built with semantic HTML5, CSS3 design tokens, and vanilla JavaScript.

## Files

- `index.html` — Page structure and accessible section landmarks
- `styles.css` — Dark/light themes, responsive grid layouts, modal, and print styles
- `data.js` — Centralized portfolio content (`window.PORTFOLIO_DATA`)
- `script.js` — Dynamic rendering, category filtering, case-study modal, theme persistence, and contact form handling

## Quick Preview

Open `index.html` directly in any browser, or serve the folder locally with any static HTTP server:

```bash
python3 -m http.server 8080
```

## Personalizing Your Content

Update `data.js` to customize:

1. `brand` — Name, monogram, role, availability status, location, and email address
2. `hero` — Headline, subheadline, calls-to-action, and key metrics
3. `about` & `skills` — Bio paragraphs, core principles, and grouped technical skills
4. `projects` — Project cards, categories (automatically turned into filter tabs), tech tags, impact notes, and live/repo links
5. `experience` & `socials` — Career timeline and social profiles
