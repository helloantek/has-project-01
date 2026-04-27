# Card

**Name:** Card  
**Category:** Layout / Container  
**Status:** Stable  
**CSS file:** `styles/components/card.css`

---

## Overview

**When to use:** Cards group related information into a self-contained surface. Use them for feature lists, user profiles, project previews, stat dashboards, and settings panels.

**When not to use:** Don't use a card just to add a background color. Inline sections of a page that are not independently scannable don't need card treatment. Avoid nesting cards more than one level deep.

---

## Anatomy

```
┌─────────────────────────────────────┐  ← .card
│ .card__header                       │
│  ┌─────────────────────────────┐    │
│  │ .card__title   [actions]    │    │
│  └─────────────────────────────┘    │
├─────────────────────────────────────┤
│ .card__body                         │
│  Content area                       │
├─────────────────────────────────────┤
│ .card__footer                       │
│  [metadata / action buttons]        │
└─────────────────────────────────────┘
```

Parts:
- **Root** (`.card`) — surface, border, shadow, radius
- **Header** (`.card__header`) — title + optional action row; bordered bottom
- **Body** (`.card__body`) — primary content area
- **Footer** (`.card__footer`) — secondary actions or metadata; subtle background
- **Title** (`.card__title`) — semibold heading inside header
- **Description** (`.card__description`) — optional subtext below title
- **Meta** (`.card__meta`) — xs secondary metadata (timestamps, authors)

---

## Tokens Used

| Property | Token |
|---|---|
| `background-color` | `--color-bg-surface` |
| `border` | `--color-border-default` |
| `border-radius` | `--radius-card` |
| `box-shadow` | `--elevation-card` |
| `padding` (body) | `--space-6` |
| `padding` (header) | `--space-5` `--space-6` |
| `padding` (footer) | `--space-4` `--space-6` |
| `background` (footer) | `--color-bg-subtle` |
| `border-color` (inner) | `--color-border-muted` |
| `font-size` (title) | `--font-size-lg` |
| `font-weight` (title) | `--font-weight-semibold` |
| `color` (title) | `--color-text-primary` |
| `color` (description) | `--color-text-secondary` |
| `color` (meta) | `--color-text-tertiary` |
| `transition` | `--transition-shadow` |

---

## Props / API

| Modifier | Description |
|---|---|
| `.card--interactive` | Adds hover lift + shadow animation |
| `.card--flat`        | Removes box-shadow |
| `.card--elevated`    | Stronger shadow, elevated bg |
| `.card--sm`          | Compact padding |
| `.card--lg`          | Generous padding |
| `.card--horizontal`  | Side-by-side image + content grid |
| `.card--feature`     | Subtle gradient background for highlighted cards |

Stat card sub-classes: `.card__stat-value`, `.card__stat-label`, `.card__stat-delta--up/down`

---

## States

| State | Visual |
|---|---|
| Default | `--elevation-card` shadow |
| Hover (interactive) | `--elevation-card-hover`, `translateY(-1px)` |
| Active (interactive) | `--elevation-card`, `translateY(0)` |
| Focus visible | Focus ring on the interactive card element |

---

## Code Example

```html
<!-- Standard card -->
<div class="card">
  <div class="card__header">
    <span class="card__title">Project Alpha</span>
  </div>
  <div class="card__body">
    <p class="card__description">Last deployed 2 hours ago.</p>
  </div>
  <div class="card__footer">
    <button class="btn btn--ghost btn--sm">View logs</button>
    <button class="btn btn--primary btn--sm">Deploy</button>
  </div>
</div>

<!-- Stat card -->
<div class="card card--flat">
  <div class="card__body">
    <p class="card__stat-label">Deployments today</p>
    <p class="card__stat-value">42</p>
    <p class="card__stat-delta card__stat-delta--up">↑ 12% from yesterday</p>
  </div>
</div>

<!-- Interactive card -->
<a href="/projects/1" class="card card--interactive">
  <div class="card__body">…</div>
</a>
```

---

## Cross-References

- [Button](./button.md) — used in `.card__footer` for actions
- [Badge](./badge.md) — used in `.card__header` for status tags
- [Avatar](./avatar.md) — used in `.card__header` for user identity
- [Table](./table.md) — for tabular data, prefer table over stacked cards
