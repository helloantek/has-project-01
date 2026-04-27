# Border Radius

**Category:** Foundation  
**Status:** Stable

## Overview

Border radius values define the "roundness" language of the design system. devl.dev uses a purposeful, restrained scale — small, precise rounding for micro components and generous rounding for cards and modals. Pill shapes are used for badges and tags.

---

## Scale

| Token | Value | Typical use |
|---|---|---|
| `--radius-none` | `0px`     | No rounding (tables, edge-to-edge elements) |
| `--radius-sm`   | `2px`     | Minimal rounding (tiny chips, progress bars) |
| `--radius-base` | `4px`     | Code inline, checkbox corners |
| `--radius-md`   | `6px`     | **Default** — buttons, inputs, nav links, dropdowns |
| `--radius-lg`   | `8px`     | Code blocks, alert banners |
| `--radius-xl`   | `12px`    | Cards (default), table wrapper |
| `--radius-2xl`  | `16px`    | Modals, large panels |
| `--radius-3xl`  | `24px`    | Hero sections, large feature cards |
| `--radius-full` | `9999px`  | Badges, tags, avatars, pills, toggle thumbs |

---

## Component Shortcuts

These shortcuts encode intent so that components don't have to know about the raw scale:

| Token | Value | Component |
|---|---|---|
| `--radius-button`  | `--radius-md`   | All button variants |
| `--radius-input`   | `--radius-md`   | Text inputs, selects, textareas |
| `--radius-card`    | `--radius-xl`   | `.card` component |
| `--radius-badge`   | `--radius-full` | `.badge`, `.tag` |
| `--radius-modal`   | `--radius-2xl`  | Modal dialog |
| `--radius-tooltip` | `--radius-md`   | Tooltip bubbles |
| `--radius-code`    | `--radius-lg`   | Code block wrapper |
| `--radius-avatar`  | `--radius-full` | Avatar image, initials |

---

## Rules

1. Use component shortcuts (`--radius-button`) rather than scale tokens (`--radius-md`) in component CSS wherever a shortcut exists.
2. Mixing arbitrary radius values (e.g., `border-radius: 10px`) is forbidden.
3. For asymmetric corners (e.g., drawer panel that's flush on one side), use `var(--radius-*)` on individual corners:
   ```css
   border-radius: var(--radius-2xl) var(--radius-none) var(--radius-none) var(--radius-2xl);
   ```

---

## Do / Don't

| Do | Don't |
|---|---|
| `border-radius: var(--radius-button)` | `border-radius: 6px` |
| `border-radius: var(--radius-full)` | `border-radius: 50%` or `border-radius: 9999px` |
| `border-radius: var(--radius-xl)` | `border-radius: 12px` |
