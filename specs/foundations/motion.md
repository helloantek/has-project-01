# Motion

**Category:** Foundation  
**Status:** Stable

## Overview

Motion in devl.dev is **functional, not decorative**. Transitions confirm state changes and guide attention. Animations must respect `prefers-reduced-motion` — `base.css` resets all durations to `0ms` when the user opts out.

All `transition`, `animation-duration`, and timing function values must come from `--duration-*` and `--ease-*` tokens.

---

## Duration Scale

| Token | Value | When to use |
|---|---|---|
| `--duration-instant` | `0ms`   | Immediate toggle (reduced-motion fallback) |
| `--duration-fast`    | `100ms` | Micro-interactions: button press, checkbox tick |
| `--duration-normal`  | `150ms` | **Default** — color, opacity, border transitions |
| `--duration-slow`    | `300ms` | Layout shifts, modal entry, drawer slide |
| `--duration-slower`  | `500ms` | Loading spinners, complex route transitions |

---

## Easing Functions

| Token | Value | When to use |
|---|---|---|
| `--ease-default`  | `cubic-bezier(0.4, 0, 0.2, 1)` | General-purpose — matches Material / Tailwind default |
| `--ease-in`       | `cubic-bezier(0.4, 0, 1, 1)`   | Elements leaving the screen |
| `--ease-out`      | `cubic-bezier(0, 0, 0.2, 1)`   | Elements entering the screen |
| `--ease-spring`   | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Bouncy entry: modals, toasts |

---

## Transition Shorthands

Pre-composed `transition` values for common use cases — prefer these over writing `transition` longhand:

| Token | Covers |
|---|---|
| `--transition-colors`   | `color`, `background-color`, `border-color`, `fill` |
| `--transition-opacity`  | `opacity` |
| `--transition-shadow`   | `box-shadow` |
| `--transition-transform`| `transform` |
| `--transition-all`      | All properties (use sparingly) |

**Usage:**
```css
.btn { transition: var(--transition-colors), var(--transition-shadow); }
```

---

## Reduced Motion

`base.css` handles reduced motion globally:
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration:        var(--duration-instant) !important;
    animation-iteration-count: 1 !important;
    transition-duration:       var(--duration-instant) !important;
  }
}
```

Components **do not** need to add their own reduced-motion overrides unless they define keyframe animations that must be replaced with a static alternative (e.g., a fade instead of a fly-in).

---

## Rules

1. `transition-duration` and `animation-duration` must use `--duration-*` tokens.
2. `timing-function` must use `--ease-*` tokens.
3. Prefer `--transition-*` shorthands over writing `transition` longhand.
4. Avoid `transition: all` — it causes repaints on layout properties.
5. Keyframe animations (`@keyframes`) may use `transform` and `opacity` directly (no token equivalent for end-state values). Only duration and easing must be tokenized.

---

## Do / Don't

| Do | Don't |
|---|---|
| `transition: var(--transition-colors)` | `transition: all 0.2s ease` |
| `animation: spin var(--duration-slower) linear infinite` | `animation: spin 0.5s linear infinite` |
| `transition-duration: var(--duration-normal)` | `transition-duration: 150ms` |
