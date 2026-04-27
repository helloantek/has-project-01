# Avatar

**Name:** Avatar  
**Category:** Identity  
**Status:** Stable  
**CSS file:** `styles/components/avatar.css`

---

## Overview

**When to use:** Avatars represent users or entities. Use an image avatar when the user has a profile photo; fall back to initials when no image is available.

**When not to use:** Don't use avatars for decorative icons or non-person entities (use a Badge or Icon instead). Don't display avatars without accessible alt text or aria-label.

---

## Anatomy

```
.avatar-wrapper
  .avatar                      ← image or initials
    .avatar__img               ← <img> if photo available
  .avatar__status              ← online/away/busy/offline dot
```

Group variant:
```
.avatar-group
  .avatar  .avatar  .avatar  .avatar-group__overflow
```

---

## Tokens Used

| Property | Token |
|---|---|
| `width` / `height` | `--space-6` … `--space-16` (size-dependent) |
| `border-radius` | `--radius-avatar` |
| `background-color` | `--color-interactive-primary-subtle` |
| `color` | `--color-interactive-primary` |
| `font-family` | `--font-family-body` |
| `font-weight` | `--font-weight-semibold` |
| `font-size` | `--font-size-xs` / `--font-size-sm` / `--font-size-base` / `--font-size-xl` |
| `border` | `--color-bg-surface` (outline separator) |
| `background` (status online) | `--color-status-success` |
| `background` (status away) | `--color-status-warning` |
| `background` (status busy) | `--color-status-error` |
| `background` (status offline) | `--color-text-disabled` |
| `transition` (group) | `--transition-transform` |

---

## Props / API

| Class modifier | Description |
|---|---|
| `.avatar--xs` | 24×24 |
| `.avatar--sm` | 32×32 |
| `.avatar--md` | 40×40 — default |
| `.avatar--lg` | 48×48 |
| `.avatar--xl` | 64×64 |
| `.avatar--square` | Rounded square instead of circle |
| `.avatar__status--online`  | Green status dot |
| `.avatar__status--away`    | Amber status dot |
| `.avatar__status--busy`    | Red status dot |
| `.avatar__status--offline` | Gray status dot |
| `.avatar-group` | Stacked group of avatars |
| `.avatar-group__overflow` | "+N more" overflow indicator |

---

## States

| State | Visual |
|---|---|
| Default | Circular, initials or image |
| Group hover | Individual avatar lifts `translateY(-4px)` |
| Focus | Focus ring (when avatar is a link/button) |

---

## Code Example

```html
<!-- Image avatar with status -->
<div class="avatar-wrapper">
  <div class="avatar avatar--md">
    <img class="avatar__img" src="/users/alex.jpg" alt="Alex Kim">
  </div>
  <span class="avatar__status avatar__status--online" aria-label="Online"></span>
</div>

<!-- Initials fallback -->
<div class="avatar avatar--sm" aria-label="Jordan Lee">JL</div>

<!-- Avatar group -->
<div class="avatar-group" aria-label="5 team members">
  <div class="avatar avatar--sm"><img src="/u1.jpg" alt="User 1"></div>
  <div class="avatar avatar--sm"><img src="/u2.jpg" alt="User 2"></div>
  <div class="avatar avatar--sm avatar-group__overflow">+3</div>
</div>
```

---

## Cross-References

- [Navigation](./navigation.md) — nav actions area includes user avatar
- [Card](./card.md) — card header for user/author cards
- [Badge](./badge.md) — status badges complement avatars in list items
- [Table](./table.md) — avatar used in user identity columns
