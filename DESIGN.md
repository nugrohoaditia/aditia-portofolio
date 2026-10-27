# Design System & Direction: Aditia Nugroho Portfolio

> Design Direction and Anti-Slop Specification for `aditia-portfolio`.

## 1. Identity & Mood

- **Product / Subject**: Personal engineering portfolio & independent software lab for **Aditia Nugroho**, Senior Software Engineer (8+ years experience in high-traffic media, React, PHP, and enterprise web architecture).
- **Target Audience**: Engineering hiring managers, tech leads, VP/CTO recruiters, and developer peers who evaluate craftsmanship, speed, reliability, and code hygiene.
- **Personality**: Grounded, authoritative, engineered, modern, crisp, and authentic. No startup buzzword fluff or generic AI template aesthetics.
- **Dial Declaration**: `ENERGY 2 / RHYTHM 2 / MOTION 2`
  - **ENERGY 2 (Balanced)**: Confident and vibrant without being chaotic or gimmicky.
  - **RHYTHM 2 (Varied)**: Alternates asymmetrical focal points, structured enterprise timelines, tactile skill cards, and editorial project previews.
  - **MOTION 2 (Purposeful)**: Polished entrance transitions, spring hover feedback, accessible reduced-motion support, and zero endless decorative loops.

## 2. Design Read

> Reading this as: Senior Software Engineer portfolio & showcase for technical decision-makers and hiring leaders, in an architectural modern editorial style, dial ENERGY 2 / RHYTHM 2 / MOTION 2.

## 3. Color Architecture

Aditia's palette is grounded in deep editorial contrast with disciplined accent restraint (Rule R-29):

| Token | Hex (Light Mode) | Hex (Dark Mode) | Purpose (Rule R-31) |
|---|---|---|---|
| **Base Surface** | `#ffffff` / `#f8fafc` | `#0b1120` / `#0f172a` | Clean, crisp editorial canvas with comfortable readability |
| **Ink Text (Primary)** | `#0f172a` | `#f1f5f9` | High contrast (12:1+) meeting WCAG AAA standard |
| **Muted Text (Secondary)** | `#475569` | `#94a3b8` | Supporting details with verified 4.8:1+ contrast |
| **Border / Dividers** | `#e2e8f0` | `#1e293b` | Subtle structural division without visual noise |
| **Brand Core (Marine)** | `#0d7490` | `#38bdf8` | Professional engineering signature across active states and links |
| **Focal Accent (Mint)** | `#0f766e` | `#2dd4bf` | Deliberate focal highlight for metrics, tags, and verified badges |
| **Action Accent (Ember)** | `#ea580c` | `#fb923c` | Direct contact action highlight (Email CTA) |

### Anti-Slop Color Rules:
- No generic AI blue-to-purple or purple-to-pink gradient backgrounds (R-01).
- No glowing radial orbs behind the hero (R-01, R-13).
- Dose cap: Glassmorphism (`backdrop-blur`) is strictly limited to the sticky navbar and floating image badge (R-10).

## 4. Typography

- **Font Family**: Inter (`sans-serif`), clean humanist grotesque with high legibility.
- **Scale**:
  - Hero Display: `text-4xl sm:text-5xl lg:text-6xl`, font weight 900, tight letter tracking (`tracking-tight`).
  - Section Headings: `text-3xl sm:text-4xl lg:text-5xl`, font weight 900.
  - Eyebrows: `text-xs sm:text-sm`, font weight 800, uppercase with deliberate tracking (`tracking-wider`).
  - Body Text: `text-base sm:text-lg`, line height 1.75 (`leading-relaxed`), font weight 400 to 500.
- **Anti-Slop Typography Rules**:
  - Monospace is reserved exclusively for code snippets or tech badges (R-06).
  - No decorative uppercase labels with extreme letter-spacing (R-06).

## 5. Layout & Rhythm

- **Hero**: Asymmetrical two-column composition with primary callouts, verified metrics (8+ years, 460+ tickets), and authentic professional photo.
- **Experience**: Timeline architecture with company identity badges, clear date-range markers, and impact-focused bullet points.
- **Skills**: Domain-grouped cards (Frontend Delivery, Core Languages & Systems, Media Operations & Architecture) with scannable skill chips.
- **Projects**: High-contrast cards featuring real media platforms (Detikcom, InsertLive, CNN Indonesia, CNBC Indonesia) with direct live links.
- **Independent Projects (App Hub)**: Showcase of custom tools and apps built with React and modern tech.
- **Contact**: Direct communication hub (WhatsApp and Email) with clear touch targets.

## 6. Motion & Accessibility

- **Framer Motion**: Spring transitions (`stiffness: 260, damping: 20`) for tactile hover states.
- **Reduced Motion**: Full support for `useReducedMotion()`. If user enables reduced motion, all position and scale transforms are disabled immediately.
- **Keyboard Navigation**: Logical tab index, visible focus rings (`focus-visible:ring-2 focus-visible:ring-marine`), Enter/Space triggers (R-32).
- **Touch Targets**: All mobile buttons and links exceed the minimum 44px tap target size (R-03).

## 7. Decision Log (Rule R-31)

1. **Why this color palette?** Navy ink and slate paired with marine and mint evoke engineering precision and trust without falling into the generic purple AI trend.
2. **Why an asymmetrical hero?** Placing high-priority CV actions beside real photography anchors the person behind the code immediately.
3. **Why timeline structure for experience?** Chronological progression from Detikcom back to IBM demonstrates consistent career growth in high-traffic engineering.
4. **Why chip-style tags for technologies?** Enables fast scanning of tech competencies without visual clutter.
5. **Why keep Framer Motion subtle?** Micro-interactions provide tactile polish without delaying page usability or distracting the reader.
