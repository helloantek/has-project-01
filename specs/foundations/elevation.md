# Elevation

**Category:** Foundation  
**Status:** Stable

## Overview

Elevation communicates depth and stacking order. The devl.dev system uses box-shadow tokens to create a consistent sense of layering, and z-index tokens to manage actual DOM stacking. Both must be referenced through aliases — raw shadow values and numeric z-indices in component CSS are errors.

---

## Shadow Scale

| Token | Value | Pixels visual |
|---|---|---|
| `--elevation-none`  | `0 0 #0000` | Flat, no shadow |
| `--elevation-xs`    | `0 1px 2px 0 rgb(0 0 0 / 0.05)` | Barely lifted |
| `--elevation-sm`    | `0 1px 3px 0 … / 0 1px 2px -1px …` | Cards at rest |
| `--elevation-md`    | `0 4px 6px -1px … / 0 2px 4px -2px …` | Cards on hover, inputs focused |
| `--elevation-lg`    | `0 10px 15px -3px … / 0 4px 6px -4px …` | Dropdowns |
| `--elevation-xl`    | `0 20px 25px -5px … / 0 8px 10px -6px …` | Modals |
| `--elevation-2xl`   | `0 25px 50px -12px rgb(0 0 0 / 0.25)` | Overlaid drawers |
| `--elevation-inner` | `inset 0 2px 4px 0 rgb(0 0 0 / 0.05)` | Inset / pressed |

Dark mode shadows use higher opacity (`0.2`–`0.6` range) to remain visible against dark surfaces.

---

## Component Shortcuts

| Token | Resolves to | Component |
|---|---|---|
| `--elevation-card`      | `--elevation-sm` | `.card` default |
| `--elevation-card-hover`| `--elevation-md` | `.card--interactive:hover` |
| `--elevation-dropdown`  | `--elevation-lg` | Menus, selects |
| `--elevation-modal`     | `--elevation-xl` | `.modal` |
| `--elevation-toast`     | `--elevation-lg` | `.toast` |

---

## Z-Index Scale

| Token | Value | Stacking context |
|---|---|---|
| `--z-base`     | `0`   | Default flow |
| `--z-raised`   | `10`  | Slightly above siblings |
| `--z-dropdown` | `100` | Dropdown menus |
| `--z-sticky`   | `200` | Sticky nav, headers |
| `--z-overlay`  | `300` | Modal backdrop |
| `--z-modal`    | `400` | Modal dialog |
| `--z-popover`  | `500` | Popovers, rich tooltips |
| `--z-toast`    | `600` | Toast notifications |
| `--z-tooltip`  | `700` | Hover tooltips (always on top) |

---

## Usage Rules

1. All `box-shadow` values must reference `--elevation-*` tokens.
2. All `z-index` values must reference `--z-*` tokens. Never write `z-index: 999`.
3. Use component shortcuts where they exist.
4. Do not mix `--elevation-*` and raw `box-shadow` in the same property — use `var()` only.

---

## Do / Don't

| Do | Don't |
|---|---|
| `box-shadow: var(--elevation-card)` | `box-shadow: 0 1px 3px rgba(0,0,0,0.1)` |
| `z-index: var(--z-modal)` | `z-index: 1000` |
| `z-index: var(--z-tooltip)` | `z-index: 9999` |
