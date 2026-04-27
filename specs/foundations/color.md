# Color

**Category:** Foundation  
**Status:** Stable

## Overview

The devl.dev color system is built on a three-layer model: primitive values, semantic aliases, and component-level usage. Components must never reference raw hex values — they always use Layer 2 aliases so that theming, dark mode, and future rebranding requires only changes to aliases, not to component code.

The palette uses **Slate** for neutrals and **Indigo** as the primary brand color, complemented by semantic status colors (green/amber/red) and dark-mode support via `@media (prefers-color-scheme: dark)` and `[data-theme="dark"]`.

---

## Primitive Palette

### Slate (neutrals)
| Token | Value | Usage |
|---|---|---|
| `--primitive-slate-50`  | `#F8FAFC` | Light backgrounds |
| `--primitive-slate-100` | `#F1F5F9` | Inset/subtle areas |
| `--primitive-slate-200` | `#E2E8F0` | Default borders |
| `--primitive-slate-300` | `#CBD5E1` | Strong borders |
| `--primitive-slate-400` | `#94A3B8` | Tertiary text |
| `--primitive-slate-500` | `#64748B` | Secondary text (dark) |
| `--primitive-slate-600` | `#475569` | Secondary text (light) |
| `--primitive-slate-700` | `#334155` | Ghost fg |
| `--primitive-slate-800` | `#1E293B` | Dark elevated surface |
| `--primitive-slate-900` | `#0F172A` | Dark base surface |
| `--primitive-slate-950` | `#020617` | Dark canvas |

### Indigo (brand / primary)
| Token | Value | Usage |
|---|---|---|
| `--primitive-indigo-50`  | `#EEF2FF` | Primary subtle bg |
| `--primitive-indigo-100` | `#E0E7FF` | — |
| `--primitive-indigo-200` | `#C7D2FE` | — |
| `--primitive-indigo-300` | `#A5B4FC` | Code text (dark mode) |
| `--primitive-indigo-400` | `#818CF8` | Links (dark mode) |
| `--primitive-indigo-500` | `#6366F1` | Focus ring, info status |
| `--primitive-indigo-600` | `#4F46E5` | Primary interactive |
| `--primitive-indigo-700` | `#4338CA` | Primary hover |
| `--primitive-indigo-800` | `#3730A3` | Primary active |
| `--primitive-indigo-900` | `#312E81` | — |

### Status
| Token | Value |
|---|---|
| `--primitive-green-500`  | `#22C55E` |
| `--primitive-amber-500`  | `#F59E0B` |
| `--primitive-red-500`    | `#EF4444` |

---

## Semantic Aliases (Layer 2)

### Backgrounds
| Token | Light | Dark | When to use |
|---|---|---|---|
| `--color-bg-canvas`   | `slate-50`  | `slate-950` | Page background |
| `--color-bg-surface`  | `white`     | `slate-900` | Cards, panels |
| `--color-bg-elevated` | `white`     | `slate-800` | Dropdowns, tooltips |
| `--color-bg-inset`    | `slate-100` | `slate-800` | Inputs, code, inset areas |
| `--color-bg-subtle`   | `slate-50`  | `slate-900` | Footer of cards |
| `--color-bg-overlay`  | `rgb(15 23 42/0.6)` | `rgb(2 6 23/0.7)` | Modal backdrop |
| `--color-bg-code`     | `slate-900` | `slate-950` | Code block background |

### Text
| Token | When to use |
|---|---|
| `--color-text-primary`   | Body copy, headings |
| `--color-text-secondary` | Supporting text, metadata |
| `--color-text-tertiary`  | Placeholders, captions |
| `--color-text-disabled`  | Disabled state copy |
| `--color-text-inverse`   | Text on dark/colored backgrounds |
| `--color-text-code`      | Inline code snippets |
| `--color-text-on-code`   | Text inside dark code blocks |

### Links
| Token | When to use |
|---|---|
| `--color-link-default` | Standard hyperlinks |
| `--color-link-hover`   | Link on hover |
| `--color-link-active`  | Link on click |
| `--color-link-visited` | Visited links |

### Borders
| Token | When to use |
|---|---|
| `--color-border-default` | Default dividers, card outlines |
| `--color-border-strong`  | Emphasized borders |
| `--color-border-muted`   | Subtle separators |
| `--color-border-focus`   | Focus rings |
| `--color-border-error`   | Invalid input state |
| `--color-border-success` | Valid input state |

### Interactive (primary)
| Token | When to use |
|---|---|
| `--color-interactive-primary`        | Primary button background |
| `--color-interactive-primary-hover`  | Primary button hover |
| `--color-interactive-primary-active` | Primary button active |
| `--color-interactive-primary-subtle` | Subtle highlight, selected state |
| `--color-interactive-primary-fg`     | Text on primary backgrounds |

### Status
| Prefix | Tokens | When to use |
|---|---|---|
| `--color-status-success-*` | `success`, `success-fg`, `success-subtle`, `success-text`, `success-border` | Positive / completed |
| `--color-status-warning-*` | same pattern | Caution / pending |
| `--color-status-error-*`   | same pattern | Failure / destructive |
| `--color-status-info-*`    | same pattern | Neutral information |

---

## Dark Mode

Dark mode is applied via two mechanisms (whichever comes first wins):
1. `@media (prefers-color-scheme: dark)` — OS preference
2. `[data-theme="dark"]` attribute on `<html>` — manual toggle

All overrides modify only Layer 2 alias values. Components do not change.

---

## Do / Don't

| Do | Don't |
|---|---|
| `color: var(--color-text-primary)` | `color: #0F172A` |
| `background: var(--color-bg-surface)` | `background: white` |
| `border-color: var(--color-border-focus)` | `border-color: #6366F1` |
