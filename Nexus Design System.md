# Nexus Design System v1.0
**P.A.C.T. Platform Visual Language**

---

## Introduction

Nexus is the design system for P.A.C.T., translating complex multi-chain legal technology into a clear, authoritative visual language. This system bridges traditional legal industry gravitas with cutting-edge AI and blockchain innovation.

### Design Philosophy: Trustworthy Disruption

We reject flashy Web3 aesthetics in favor of minimalist, high-contrast sophistication. Every element builds trust and conveys intelligence, positioning P.A.C.T. as inevitable foundational technology rather than speculative startup.

**Core Principles:**
- **Clarity Over Complexity** – Simplify without dumbing down
- **Authority Through Restraint** – Let whitespace and hierarchy do the work
- **Trust Through Consistency** – Every interaction reinforces reliability
- **Intelligence Through Precision** – Details matter at every scale

---

## Color System

### Foundation Colors

| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Base** | White | `#FFFFFF` | Primary background, creates open, clean canvas |
| **Primary Text** | Charcoal | `#1A1A1A` | All headings and body text for maximum readability |
| **Secondary Text** | Medium Gray | `#6B7280` | Subheadings, captions, supporting content |
| **Dark Surface** | Near Black | `#111111` | Dark mode backgrounds, code blocks, elevated surfaces |

### Accent Colors

Strategic use only. These represent P.A.C.T.'s four-chain ecosystem and should never dominate layouts.

| Chain Layer | Color | Hex | Application |
|-------------|-------|-----|-------------|
| **Value Layer (Primary CTA)** | Bitcoin Orange | `#F7931A` | Primary buttons, critical actions, key highlights |
| **Intelligence Layer** | ICP Blue | `#29ABE2` | AI features, "Create It" pillar, innovation messaging |
| **IP Layer** | Story Purple | `#8B5CF6` | Ownership features, "Own It" pillar, rights management |
| **Trust Layer** | Constellation Green | `#10B981` | Verification features, "Prove It" pillar, security elements |

### Usage Guidelines

**Do:**
- Use white backgrounds as default for maximum clarity
- Reserve Bitcoin Orange for primary CTAs only
- Apply chain colors to icons, diagrams, and feature-specific elements
- Maintain 4.5:1 minimum contrast ratio for accessibility

**Don't:**
- Use multiple accent colors in the same component
- Apply gradients or color overlays to text
- Use accent colors as large background fills
- Mix chain colors arbitrarily

---

## Typography

### Font Stack

```css
/* Display Headings */
font-family: 'Monument Extended', 'Druk Wide', system-ui, sans-serif;

/* Body & Interface */
font-family: 'Inter', 'Manrope', 'Roboto', system-ui, sans-serif;

/* Code */
font-family: 'JetBrains Mono', 'Fira Code', 'Courier New', monospace;
```

### Type Scale

| Level | Font | Size | Weight | Transform | Line Height | Usage |
|-------|------|------|--------|-----------|-------------|-------|
| **H1 Display** | Monument Extended | 64px / 4rem | Bold | UPPERCASE | 1.1 | Hero headlines, major section breaks |
| **H2 Display** | Monument Extended | 48px / 3rem | Bold | UPPERCASE | 1.2 | Section headings, key statements |
| **H3 Section** | Inter | 32px / 2rem | Semibold | Sentence case | 1.3 | Subsection headings |
| **H4 Subsection** | Inter | 24px / 1.5rem | Semibold | Sentence case | 1.4 | Card titles, component headings |
| **Body Large** | Inter | 18px / 1.125rem | Regular | Sentence case | 1.6 | Lead paragraphs, key descriptions |
| **Body** | Inter | 16px / 1rem | Regular | Sentence case | 1.6 | Standard body text |
| **Body Small** | Inter | 14px / 0.875rem | Regular | Sentence case | 1.5 | Captions, labels, metadata |
| **Code** | JetBrains Mono | 14px / 0.875rem | Regular | As written | 1.5 | Code samples, technical data |

### Typography Best Practices

**Display Headings (Monument Extended):**
- Use sparingly for maximum impact
- Always all-caps with generous letter spacing (0.05em)
- Pair with substantial whitespace (minimum 80px top/bottom padding)
- Never exceed 2-3 lines of text

**Body Text (Inter):**
- Optimal line length: 60-80 characters
- Paragraph spacing: 1.5em between paragraphs
- Use medium weight (500) for emphasis instead of bold
- Maintain consistent hierarchy throughout pages

---

## Components

### Buttons

#### Primary Button
```css
background: #F7931A;
color: #FFFFFF;
padding: 16px 32px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
border-radius: 4px;
transition: all 0.2s ease;
```

**States:**
- Default: Bitcoin Orange background
- Hover: Darken 10% (`#DF8415`)
- Active: Darken 15% (`#C7741A`)
- Disabled: 40% opacity

**Icon:** Right-aligned arrow (→) with 8px left margin

#### Secondary Button
```css
background: transparent;
color: #1A1A1A;
border: 1px solid #1A1A1A;
padding: 16px 32px;
font-weight: 600;
text-transform: uppercase;
letter-spacing: 0.05em;
border-radius: 4px;
```

**Usage:** Less critical actions like "View Documentation," "Learn More"

#### Tertiary Button
Text-only button for minimal actions:
```css
color: #1A1A1A;
text-decoration: underline;
font-weight: 500;
```

### Iconography

**Style Guidelines:**
- Stroke width: 2px
- Size: 24px × 24px standard, 32px × 32px for feature icons
- Style: Minimalist line icons, no fills
- Corner radius: 2px for rounded elements

**The Four Pillars:**

| Pillar | Icon | Color | Description |
|--------|------|-------|-------------|
| Create It | Brain circuit | ICP Blue | AI-powered document generation |
| Own It | Certificate with ribbon | Story Purple | IP registration and ownership |
| Prove It | Shield with checkmark | Constellation Green | Blockchain verification |
| Monetize It | Bitcoin symbol | Bitcoin Orange | Value capture and licensing |

**Implementation:** Use inline SVG with currentColor for flexible theming

### Cards

```css
background: #FFFFFF;
border: 1px solid #E5E7EB;
border-radius: 8px;
padding: 32px;
box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
transition: box-shadow 0.2s ease;
```

**Hover state:** Elevate with `box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1)`

**Content hierarchy:**
1. Icon (if applicable) – 32px, accent color
2. Heading – H4 style, 16px margin-bottom
3. Description – Body text, Medium Gray
4. Action link (optional) – Tertiary button style

### Input Fields

```css
border: 1px solid #D1D5DB;
border-radius: 4px;
padding: 12px 16px;
font-size: 16px;
color: #1A1A1A;
background: #FFFFFF;
transition: border-color 0.2s ease;
```

**Focus state:** Border changes to Bitcoin Orange, add subtle shadow

### Navigation

**Top Navigation:**
- Background: White with 1px bottom border (#E5E7EB)
- Height: 72px
- Logo: Left-aligned, 40px height
- Links: Inter Medium, 16px, Charcoal
- CTA: Primary button, right-aligned

**Mobile Navigation:**
- Hamburger menu (three horizontal lines, 24px)
- Full-screen overlay with centered menu items
- Close icon (X) in top right

---

## Layout System

### Grid

**Desktop:** 12-column grid
- Container max-width: 1280px
- Gutter: 32px
- Margin: 80px (left/right)

**Tablet:** 8-column grid
- Container max-width: 768px
- Gutter: 24px
- Margin: 40px

**Mobile:** 4-column grid
- Container max-width: 100%
- Gutter: 16px
- Margin: 20px

### Spacing Scale

Use a consistent 8px base unit:

```
4px   (0.25rem)  – Micro spacing
8px   (0.5rem)   – Tiny spacing
16px  (1rem)     – Small spacing
24px  (1.5rem)   – Medium spacing
32px  (2rem)     – Large spacing
48px  (3rem)     – XL spacing
64px  (4rem)     – 2XL spacing
96px  (6rem)     – 3XL spacing
128px (8rem)     – 4XL spacing
```

### Section Patterns

#### Hero Section
- Center-aligned text
- Padding: 128px top/bottom (desktop), 80px (mobile)
- H1 Display + Body Large description
- Primary CTA below with 32px top margin
- Optional: Subtle background gradient or abstract shape

#### Feature Grid
- 3-column grid (desktop), 1-column (mobile)
- Equal-height cards with consistent padding
- Icons centered above card content
- 32px gap between cards

#### Content Section
- Max-width: 800px for optimal readability
- Left-aligned text for body content
- 64px padding top/bottom
- Alternating image/text layouts for variety

---

## Imagery

### Photography

**Style:**
- High-quality, professional studio shots
- Clean backgrounds (white or subtle gradients)
- Proper lighting with soft shadows
- No stock photos with artificial expressions

**Subject Matter:**
- Product interfaces and dashboards
- Abstract technology concepts (circuits, nodes, networks)
- Professional office environments
- Hands interacting with interfaces (diverse representation)

### Illustrations & Graphics

**Banned:**
- Animated GIFs
- Pixelated or low-resolution assets
- Clipart or cartoony illustrations
- Overly complex 3D renders

**Encouraged:**
- Subtle 3D icons (isometric or flat perspective)
- Clean SVG diagrams and flowcharts
- Minimal animated SVGs (subtle fades, slides)
- Abstract geometric patterns

### The Ultimate Legal Nexus Diagram

Replace ASCII art with professional SVG flowchart:
- Clean boxes with 8px border-radius
- Chain colors for layer identification
- Directional arrows showing data flow
- Labels in Inter Regular, 14px
- White background, subtle drop shadows

---

## Animation & Motion

### Principles

- **Purposeful:** Every animation serves a function
- **Subtle:** Movements should feel natural, never distracting
- **Fast:** Durations between 150-300ms for most interactions
- **Consistent:** Use same easing functions throughout

### Easing Functions

```css
/* Standard easing for most interactions */
transition-timing-function: cubic-bezier(0.4, 0.0, 0.2, 1);

/* Emphasized easing for attention-grabbing elements */
transition-timing-function: cubic-bezier(0.0, 0.0, 0.2, 1);

/* Decelerated easing for exits */
transition-timing-function: cubic-bezier(0.4, 0.0, 1, 1);
```

### Common Animations

**Button Hover:** 200ms color transition
**Card Elevation:** 250ms shadow transition
**Page Transitions:** 300ms fade
**Modal Appearance:** 250ms scale from 0.95 to 1.0 + fade
**Loading States:** Subtle pulse animation, 1.5s duration

---

## Accessibility

### Color Contrast

All text must meet WCAG AA standards:
- Normal text: 4.5:1 minimum contrast
- Large text (18px+): 3:1 minimum contrast
- UI components: 3:1 minimum contrast

### Keyboard Navigation

- All interactive elements must be keyboard accessible
- Visible focus indicators (2px Bitcoin Orange outline)
- Logical tab order following visual hierarchy
- Skip navigation links for long pages

### Screen Readers

- Semantic HTML (header, nav, main, footer, article, section)
- Alt text for all meaningful images
- ARIA labels for icon-only buttons
- Proper heading hierarchy (no skipped levels)

---

## Implementation Guidelines

### File Organization

```
/design-system
  /tokens
    colors.json
    typography.json
    spacing.json
  /components
    button.css
    card.css
    input.css
  /assets
    /icons
    /images
    /logos
  /examples
    hero-section.html
    feature-grid.html
```

### CSS Architecture

Use BEM methodology for maintainability:

```css
/* Block */
.card { }

/* Element */
.card__header { }
.card__body { }

/* Modifier */
.card--elevated { }
.card--featured { }
```

### Design Tokens

Export design system values as CSS custom properties:

```css
:root {
  /* Colors */
  --color-base: #FFFFFF;
  --color-text-primary: #1A1A1A;
  --color-accent-orange: #F7931A;
  
  /* Typography */
  --font-display: 'Monument Extended', system-ui;
  --font-body: 'Inter', system-ui;
  
  /* Spacing */
  --space-sm: 16px;
  --space-md: 32px;
  --space-lg: 64px;
  
  /* Breakpoints */
  --breakpoint-mobile: 640px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1024px;
}
```

---

## Brand Voice & Messaging

### Tone

**Confident, Not Arrogant**
We know P.A.C.T. is revolutionary, but we let the technology speak for itself.

✅ "The first multi-chain legal intelligence platform"
❌ "The BEST and ONLY solution you'll EVER need!!!"

**Intelligent, Not Academic**
We simplify complexity without condescension.

✅ "P.A.C.T. secures your IP across four blockchain networks"
❌ "Leveraging distributed ledger technology to facilitate cross-chain IP tokenization..."

**Trustworthy, Not Corporate**
We're professional but approachable.

✅ "Protect your creative work from the moment you create it"
❌ "Pursuant to our service level agreement, intellectual property rights..."

### Messaging Framework

**Headlines:** Bold claims backed by technology (Monument Extended, all-caps)
**Subheads:** Clear explanations of value (Inter Semibold, sentence case)
**Body:** Detailed but digestible information (Inter Regular)
**CTAs:** Action-oriented, specific commands (Inter Semibold, uppercase)

---

## Examples

### Hero Section Code

```html
<section class="hero">
  <h1 class="hero__title">REVOLUTIONIZING LEGAL TECH</h1>
  <p class="hero__subtitle">
    The world's first multi-chain legal intelligence platform.
    Create, protect, and monetize your intellectual property with AI-powered precision.
  </p>
  <button class="btn btn--primary">
    GET STARTED →
  </button>
</section>
```

### Feature Card Code

```html
<div class="card">
  <svg class="card__icon" style="color: #29ABE2;">
    <!-- Brain icon -->
  </svg>
  <h4 class="card__title">Create It</h4>
  <p class="card__description">
    Generate professional legal documents in seconds using
    advanced AI trained on millions of legal precedents.
  </p>
</div>
```

---

## Version History

- **v1.0** (Current) – Initial Nexus design system release
- System covers: color, typography, components, layout, accessibility
- Status: Ready for implementation

---

## Support & Contribution

For questions, clarifications, or design system updates:
1. Review this documentation thoroughly
2. Check existing component examples in `/examples`
3. Submit design proposals with clear rationale
4. Maintain consistency with core principles

**Remember:** Every pixel serves the mission of making P.A.C.T. feel inevitable, trustworthy, and intelligent.