# Typography Skill

## Purpose

Teach the agent to choose typography intentionally for every landing page. Never default to Inter, Roboto, Arial, or system-ui.

## Font Selection Process

Before choosing fonts, analyze:

1. **Brand personality** — What does the brand represent?
2. **Audience** — Who visits this website?
3. **Product category** — What industry/domain?
4. **Desired emotional response** — What should the visitor feel?
5. **Visual density** — How much content on screen?
6. **Readability** — What sizes and weights are needed?
7. **Desktop behavior** — Large screens, precise rendering?
8. **Mobile behavior** — Small screens, fast loading?

Then compare at least 3 suitable font directions before choosing.

## Font Categories

### Primary Typeface

The main typeface must reflect brand personality. Consider:

- **Grotesk** — Neutral, versatile, professional (e.g., Space Grotesk, DM Sans)
- **Neo-grotesk** — Technical, precise, modern (e.g., IBM Plex Sans, Instrument Sans)
- **Geometric** — Clean, contemporary, structured (e.g., Outfit, Manrope)
- **Humanist** — Warm, readable, approachable (e.g., Source Sans, Nunito)
- **Editorial** — Sophisticated, high-contrast, newspaper feel (e.g., Playfair Display)
- **Condensed** — Space-efficient, impactful, editorial (e.g., Barlow Condensed)
- **Technical** — Code-like, precise, developer-oriented (e.g., JetBrains Mono, Fira Code)

### Secondary Typeface

Use a second font only when it creates meaningful contrast:

- Display sans + neutral body sans
- Technical mono + readable sans
- Editorial serif + clean sans

Do NOT use two fonts simply because professional websites use font pairs.

### Monospaced Font

Required for:
- Code blocks
- Data/statistics
- Technical specifications
- Terminal-like UI elements

## Typography Scale

### Display Typography

- Hero size: 3.5rem–6rem desktop, 2.5rem–4rem mobile
- Section headings: 2rem–3rem desktop, 1.5rem–2.5rem mobile
- Line height: 1.05–1.15 for display
- Letter spacing: -0.02em to -0.04em for large text
- Maximum line length: 12–15 words

### Body Typography

- Body size: 1rem–1.125rem
- Line height: 1.6–1.75
- Paragraph width: 60–75 characters
- Readable contrast: minimum 4.5:1 against background

### UI Typography

- Navigation: 0.875rem, medium weight
- Buttons: 0.875rem–1rem, medium/semibold weight
- Labels: 0.75rem, uppercase, letter-spaced
- Metadata: 0.75rem–0.875rem
- Captions: 0.75rem

## Font Performance

- Use variable fonts when available
- Load only necessary weights
- Use `display=swap` for Google Fonts
- Preconnect to font origins
- Consider self-hosting for production

## Anti-Patterns

- Do NOT default to Inter/Roboto/Arial
- Do NOT load 5+ font families
- Do NOT use decorative fonts for body text
- Do NOT sacrifice readability for style
- Do NOT load fonts you don't use
