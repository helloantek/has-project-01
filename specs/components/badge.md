# Badge

**Name:** Badge  
**Category:** Indicator  
**Status:** Stable  
**CSS file:** `styles/components/badge.css`

---

## Overview

**When to use:** Badges communicate status, category, or count. Use them as read-only labels attached to other elements — never as interactive controls.

**When not to use:** Don't make badges clickable (use a Button instead). Don't use badges to replace meaningful body text.

---

## Anatomy

```
.badge
  [.badge__dot]  label text
```

Parts:
- **Root** (`.badge`) — pill container with color, border, text
- **Dot** (`.badge__dot`) — optional colored circle indicator
- **Count badge** (`.badge-count`) — numeric bubble for notification counts
- **Tag** (`.tag`) — removable badge with close button (`.tag__remove`)

---

## Tokens Used

| Property | Token |
|---|---|
| `padding` | `--space-1` `--space-2` |
| `font-size` | `--font-size-xs` |
| `font-weight` | `--font-weight-medium` |
| `border-radius` | `--radius-badge` |
| `background-color` | `--color-status-*-subtle` / `--color-interactive-primary-subtle` |
| `color` | `--color-status-*-text` / `--color-interactive-primary` |
| `border-color` | `--color-status-*-border` |

---

## Props / API

| Class modifier | Description |
|---|---|
| `.badge--default`  | Neutral gray |
| `.badge--primary`  | Indigo brand |
| `.badge--success`  | Green |
| `.badge--warning`  | Amber |
| `.badge--error`    | Red |
| `.badge--info`     | Indigo info |
| `.badge--solid-*`  | Filled (no subtle) variant for each color |
| `.badge--sm`       | Extra compact |
| `.badge--lg`       | Larger pill |
| `.badge-count`     | Numeric bubble |
| `.tag`             | Removable tag |
| `.tag__remove`     | Close button inside tag |

---

## States

Badges are static. `.tag__remove` has hover/focus states:

| State | Visual |
|---|---|
| Default | Status color set |
| Tag remove hover | `--color-interactive-ghost-hover` bg |
| Tag remove focus | Focus ring |

---

## Code Example

```html
<!-- Status badge -->
<span class="badge badge--success">
  <span class="badge__dot"></span>
  Live
</span>

<!-- Warning -->
<span class="badge badge--warning">Pending review</span>

<!-- Count bubble -->
<span class="badge-count">12</span>

<!-- Removable tag -->
<span class="tag">
  TypeScript
  <button class="tag__remove" aria-label="Remove TypeScript">×</button>
</span>
```

---

## Cross-References

- [Alert](./alert.md) — for full-width status messages
- [Button](./button.md) — for interactive triggers
- [Navigation](./navigation.md) — sidebar uses `.badge` for counts
- [Card](./card.md) — card headers often include a badge for status
