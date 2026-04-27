# Typography

**Category:** Foundation  
**Status:** Stable

## Overview

The devl.dev type system uses two typefaces:
- **Inter** — UI sans-serif for all body, UI labels, and headings
- **JetBrains Mono** — monospace for all code, terminals, and technical identifiers

All font sizes, weights, and line heights must be referenced through `--font-*` aliases. Never use `px` values for typography.

---

## Font Families

| Token | Value | Use |
|---|---|---|
| `--font-family-body`    | `Inter, system-ui, sans-serif`       | All UI text, paragraphs, labels |
| `--font-family-heading` | `Inter, system-ui, sans-serif`       | Page headings, display text |
| `--font-family-code`    | `JetBrains Mono, Fira Code, monospace` | Code, terminals, file names |

---

## Font Size Scale

| Token | rem | px | Typical use |
|---|---|---|---|
| `--font-size-xs`   | `0.75rem`  | 12 | Captions, meta, badge labels |
| `--font-size-sm`   | `0.875rem` | 14 | Body (compact), labels, table cells |
| `--font-size-base` | `1rem`     | 16 | Default body text |
| `--font-size-lg`   | `1.125rem` | 18 | Card titles, emphasized body |
| `--font-size-xl`   | `1.25rem`  | 20 | Sub-headings, h5 |
| `--font-size-2xl`  | `1.5rem`   | 24 | h4 |
| `--font-size-3xl`  | `1.875rem` | 30 | h3 |
| `--font-size-4xl`  | `2.25rem`  | 36 | h2, stat values |
| `--font-size-5xl`  | `3rem`     | 48 | h1 |
| `--font-size-6xl`  | `3.75rem`  | 60 | Display/hero headings |

---

## Font Weights

| Token | Value | Use |
|---|---|---|
| `--font-weight-normal`   | `400` | Body copy, descriptions |
| `--font-weight-medium`   | `500` | Labels, nav links, buttons |
| `--font-weight-semibold` | `600` | Card titles, section headings |
| `--font-weight-bold`     | `700` | Page headings, hero text |

---

## Line Heights

| Token | Value | Use |
|---|---|---|
| `--line-height-tight`   | `1.25` | Headings (h1–h3), stat values |
| `--line-height-snug`    | `1.375` | Subheadings, card titles, labels |
| `--line-height-normal`  | `1.5`   | UI body text, buttons |
| `--line-height-relaxed` | `1.625` | Long-form paragraphs, docs |

---

## Letter Spacing

| Token | Value | Use |
|---|---|---|
| `--letter-spacing-tight`  | `-0.025em` | Large headings (h1, h2) |
| `--letter-spacing-normal` | `0`         | Default |
| `--letter-spacing-wide`   | `0.025em`  | Buttons (optional) |

---

## Heading Scale (defaults set in base.css)

| Element | Size | Weight | Line height | Letter spacing |
|---|---|---|---|---|
| h1 | `--font-size-5xl` | bold | tight | tight |
| h2 | `--font-size-4xl` | bold | tight | tight |
| h3 | `--font-size-3xl` | bold | tight | tight |
| h4 | `--font-size-2xl` | bold | tight | — |
| h5 | `--font-size-xl`  | bold | snug  | — |
| h6 | `--font-size-lg`  | bold | snug  | — |

---

## Code Typography

All code elements inherit `--font-family-code`. The default size within prose is `0.9em` relative to the surrounding text (dimensionless, so no px value appears).

Standalone code blocks use `--font-size-sm` (14px) with `--line-height-relaxed`.

---

## Do / Don't

| Do | Don't |
|---|---|
| `font-size: var(--font-size-sm)` | `font-size: 14px` |
| `font-weight: var(--font-weight-semibold)` | `font-weight: 600` |
| `font-family: var(--font-family-code)` | `font-family: monospace` |
| `line-height: var(--line-height-normal)` | `line-height: 1.5` |
