# Button

**Name:** Button  
**Category:** Action  
**Status:** Stable  
**CSS file:** `styles/components/button.css`

---

## Overview

**When to use:** Buttons trigger an immediate action or navigation. Use them for form submission, confirming dialogs, creating records, and triggering commands.

**When not to use:** For navigation between pages, prefer a styled `<a>` tag. For destructive actions without confirmation, show a confirmation dialog first. Don't use a button when a link communicates the intent better.

---

## Anatomy

```
┌──────────────────────────────┐
│  [icon?]  Label  [spinner?]  │
└──────────────────────────────┘
   ^                      ^
   .btn__spinner (loading) .btn
```

Parts:
- **Root** (`.btn`) — handles all state, sizing, and variant tokens
- **Icon** — optional leading/trailing icon; uses `currentColor`
- **Label** — text content; never truncated in a button
- **Spinner** (`.btn__spinner`) — visible only during `.btn--loading`

---

## Tokens Used

| Property | Token |
|---|---|
| `padding` | `--space-1` … `--space-8` (size-dependent) |
| `font-family` | `--font-family-body` |
| `font-size` | `--font-size-xs` / `--font-size-sm` / `--font-size-base` / `--font-size-lg` |
| `font-weight` | `--font-weight-medium` / `--font-weight-semibold` |
| `border-radius` | `--radius-button` |
| `background-color` | `--color-interactive-primary` / `--color-interactive-secondary` / `--color-interactive-danger` |
| `color` | `--color-interactive-primary-fg` / `--color-interactive-ghost-fg` |
| `border-color` | `--color-interactive-primary-border` / `--color-interactive-secondary-border` |
| `box-shadow` | `--elevation-xs` |
| `transition` | `--transition-colors`, `--transition-shadow` |
| `outline` | `--focus-ring-width`, `--focus-ring-color`, `--focus-ring-offset` |

---

## Props / API

| Class modifier | Description |
|---|---|
| `.btn--primary`      | Filled indigo — default CTA |
| `.btn--secondary`    | White/bordered — secondary action |
| `.btn--ghost`        | No background — tertiary/nav action |
| `.btn--danger`       | Red filled — destructive action |
| `.btn--danger-ghost` | Red text, no background |
| `.btn--link`         | Underlined link style |
| `.btn--xs`           | Extra small (12px text) |
| `.btn--sm`           | Small (14px) |
| `.btn--md`           | Medium — default |
| `.btn--lg`           | Large (16px) |
| `.btn--xl`           | Extra large (18px) |
| `.btn--icon`         | Square icon-only button |
| `.btn--block`        | Full width |
| `.btn--loading`      | Loading state (spinner visible) |

---

## States

| State | Visual |
|---|---|
| Default | Base variant color |
| Hover | Darker background (`-hover` alias) |
| Active / pressed | Darkest background (`-active` alias) |
| Focus visible | `--focus-ring-width` outline with `--focus-ring-color` |
| Disabled | 50% opacity, `cursor: not-allowed` |
| Loading | Spinner replaces/appends icon, `cursor: wait` |

---

## Code Example

```html
<!-- Primary CTA -->
<button class="btn btn--primary btn--md">
  Deploy now
</button>

<!-- Secondary with icon -->
<button class="btn btn--secondary btn--sm">
  <svg …></svg>
  Download
</button>

<!-- Danger destructive -->
<button class="btn btn--danger btn--md">
  Delete project
</button>

<!-- Ghost icon-only -->
<button class="btn btn--ghost btn--icon btn--sm" aria-label="More options">
  <svg …></svg>
</button>

<!-- Loading state -->
<button class="btn btn--primary btn--loading" disabled aria-disabled="true">
  <span class="btn__spinner" aria-hidden="true"></span>
  Deploying…
</button>
```

---

## Cross-References

- [Badge](./badge.md) — for read-only status labels (not clickable)
- [Alert](./alert.md) — for inline action buttons within alerts
- [Modal](./modal.md) — modal footers use `.btn` pairs
- [Input](./input.md) — input groups may append a `.btn`
