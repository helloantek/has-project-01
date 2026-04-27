# Spacing

**Category:** Foundation  
**Status:** Stable

## Overview

Spacing uses an **8-point grid** derived from `--primitive-space-*` primitives, surfaced as `--space-*` aliases. All padding, margin, gap, and layout dimensions must reference these tokens. Arbitrary pixel values are errors.

The scale doubles at larger steps and has fine-grained 4px increments at the small end for compact components.

---

## Scale

| Token | Value | Pixels | When to use |
|---|---|---|---|
| `--space-1`  | `4px`  | 4   | Micro gaps (icon + label, badge padding) |
| `--space-2`  | `8px`  | 8   | Tight padding (button xs, chip) |
| `--space-3`  | `12px` | 12  | Small component padding (button sm, input sm) |
| `--space-4`  | `16px` | 16  | Default padding (button md, card sm body) |
| `--space-5`  | `20px` | 20  | Card header vertical |
| `--space-6`  | `24px` | 24  | Card body default, container padding |
| `--space-8`  | `32px` | 32  | Section-level gaps |
| `--space-10` | `40px` | 40  | Sidebar width at min, icon-only button lg |
| `--space-12` | `48px` | 48  | Section vertical padding (sm) |
| `--space-16` | `64px` | 64  | Navigation height, section md |
| `--space-20` | `80px` | 80  | Section lg |
| `--space-24` | `96px` | 96  | Section xl, modal max-width md |
| `--space-32` | `128px` | 128 | Sidebar width, max-width sm |

---

## Component Shortcuts

These aliases map spacing roles to scale values, making intent clear:

| Token | Resolves to | Use case |
|---|---|---|
| `--space-component-xs` | `--space-1` | Minimal intra-component gap |
| `--space-component-sm` | `--space-2` | Compact component internal spacing |
| `--space-component-md` | `--space-3` | Standard component inner spacing |
| `--space-component-lg` | `--space-4` | Generous component inner spacing |
| `--space-component-xl` | `--space-6` | Large component padding |
| `--space-section-sm`   | `--space-8`  | Small section vertical rhythm |
| `--space-section-md`   | `--space-12` | Default section vertical rhythm |
| `--space-section-lg`   | `--space-16` | Generous section spacing |
| `--space-section-xl`   | `--space-24` | Hero/landing section spacing |

---

## Usage Rules

1. **All `padding`, `margin`, `gap` values must reference a `--space-*` token.**
2. For layout dimensions (widths, heights), prefer `--layout-*` tokens or `--space-*` tokens.
3. `1px` borders and outlines are the only raw pixel values allowed in component CSS.
4. Negative margins: use `calc(-1 * var(--space-N))`.
5. `0` (zero, unitless) is always acceptable.

---

## Examples

```css
/* Correct */
.card__body { padding: var(--space-6); }
.btn        { gap: var(--space-2); }
.grid       { gap: var(--space-6); }

/* Wrong */
.card__body { padding: 24px; }     /* error */
.btn        { gap: 8px; }          /* error */
.grid       { gap: 1.5rem; }       /* error */
```

---

## Do / Don't

| Do | Don't |
|---|---|
| `padding: var(--space-4)` | `padding: 16px` |
| `gap: var(--space-2)` | `gap: 8px` |
| `margin-top: var(--space-8)` | `margin-top: 2rem` |
| `border: 1px solid …` | `border: 2px solid …` (unless justified) |
