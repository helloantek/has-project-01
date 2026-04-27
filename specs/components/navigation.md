# Navigation

**Name:** Navigation  
**Category:** Layout / Wayfinding  
**Status:** Stable  
**CSS file:** `styles/components/navigation.css`

---

## Overview

**When to use:** The top navigation bar (`.nav`) is present on every page and provides global wayfinding, the logo/wordmark, primary links, and user actions. The sidebar navigation (`.sidebar-nav`) is used in dashboard/docs layouts with persistent secondary navigation.

**When not to use:** Don't put non-navigation content in the nav bar. Don't duplicate top-nav links in the sidebar.

---

## Anatomy

```
┌──────────────────────────────────────────────────────────┐ ← .nav
│  .nav__logo    .nav__links (list of .nav__link)  .nav__actions │
└──────────────────────────────────────────────────────────┘

.sidebar-nav
  .sidebar-nav__section
    .sidebar-nav__label  ("Docs")
    .sidebar-nav__list
      li → .sidebar-nav__link [.sidebar-nav__icon] label [.sidebar-nav__badge]
```

Parts:
- **Nav** (`.nav`) — fixed bar at top, full width
- **Nav inner** (`.nav__inner`) — max-width constrained inner flex row
- **Logo** (`.nav__logo`) — brand identity link
- **Links** (`.nav__links`) — primary navigation links list
- **Nav link** (`.nav__link`) — individual link; `.--active` for current page
- **Actions** (`.nav__actions`) — right-aligned action area (buttons, avatar)
- **Hamburger** (`.nav__hamburger`) — mobile menu toggle
- **Breadcrumb** (`.breadcrumb`) — page path hierarchy below nav
- **Sidebar nav** (`.sidebar-nav`) — secondary persistent nav
- **Sidebar link** (`.sidebar-nav__link`) — with active, icon, badge slots

---

## Tokens Used

| Property | Token |
|---|---|
| `height` | `--layout-nav-height` |
| `max-width` | `--layout-max-width` |
| `background-color` | `--color-bg-surface` |
| `border-bottom` | `--color-border-default` |
| `z-index` | `--z-sticky` |
| `color` (links) | `--color-text-secondary` |
| `color` (active) | `--color-interactive-primary` |
| `background` (link hover) | `--color-interactive-ghost-hover` |
| `background` (link active) | `--color-interactive-primary-subtle` |
| `font-size` (links) | `--font-size-sm` |
| `font-weight` (links) | `--font-weight-medium` |
| `border-radius` (links) | `--radius-md` |
| `padding` (links) | `--space-2` `--space-3` |
| `gap` | `--space-1` `--space-2` `--space-6` |
| `transition` | `--transition-colors` |
| `width` (sidebar) | `--layout-sidebar-width` |
| `box-shadow` (mobile) | `--elevation-lg` |

---

## Props / API

| Class modifier | Description |
|---|---|
| `.nav__link--active` | Marks the current page link |
| `.nav__links--open` | Mobile expanded state |
| `.sidebar-nav__link--active` | Active sidebar link |

---

## States

| Element | State | Visual |
|---|---|---|
| `.nav__link` | Default | `--color-text-secondary` |
| `.nav__link` | Hover | `--color-text-primary` + `--color-interactive-ghost-hover` bg |
| `.nav__link` | Active page | `--color-interactive-primary` + `--color-interactive-primary-subtle` bg |
| `.nav__link` | Focus | Focus ring |
| `.sidebar-nav__link` | Same pattern | Same pattern |

---

## Code Example

```html
<nav class="nav" aria-label="Main navigation">
  <div class="nav__inner">
    <a href="/" class="nav__logo" aria-label="devl.dev home">
      <span class="nav__logo-mark">D</span>
      devl.dev
    </a>

    <ul class="nav__links" role="list">
      <li><a href="/docs"     class="nav__link nav__link--active">Docs</a></li>
      <li><a href="/projects" class="nav__link">Projects</a></li>
      <li><a href="/pricing"  class="nav__link">Pricing</a></li>
    </ul>

    <div class="nav__actions">
      <a href="/login"    class="btn btn--ghost btn--sm">Log in</a>
      <a href="/signup"   class="btn btn--primary btn--sm">Sign up</a>
    </div>

    <button class="nav__hamburger" aria-expanded="false" aria-controls="mobile-nav">
      <span class="nav__hamburger-line"></span>
      <span class="nav__hamburger-line"></span>
      <span class="nav__hamburger-line"></span>
    </button>
  </div>
</nav>

<!-- Breadcrumb -->
<nav class="breadcrumb" aria-label="Breadcrumb">
  <span class="breadcrumb__item">
    <a href="/" class="breadcrumb__link">Home</a>
    <span class="breadcrumb__separator" aria-hidden="true">/</span>
  </span>
  <span class="breadcrumb__item">
    <span class="breadcrumb__current" aria-current="page">Docs</span>
  </span>
</nav>
```

---

## Cross-References

- [Button](./button.md) — used in `.nav__actions`
- [Avatar](./avatar.md) — used in `.nav__actions` for signed-in user
- [Badge](./badge.md) — used in `.sidebar-nav__badge` for counts
