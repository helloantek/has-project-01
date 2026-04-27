# devl.dev — AI Development Instructions

## Design System — Mandatory Reading

Before writing or modifying **any UI code**, read the relevant spec file in `specs/`.
Use **only tokens** from `tokens.css`. Run the token audit script before committing.
**Zero errors required.**

```
node scripts/token-audit.js
```

---

## Project Structure

```
tokens.css                  ← Design system source of truth (ALL tokens here)
styles/
  base.css                  ← Global resets and document defaults
  layout.css                ← Container, grid, section wrappers
  components/
    button.css              ← .btn and all variants
    card.css                ← .card and sub-sections
    input.css               ← .input, .form-group, .select, .checkbox, .toggle
    navigation.css          ← .nav, .sidebar-nav, .breadcrumb
    badge.css               ← .badge, .tag, .badge-count
    code-block.css          ← .code-block, .code-inline
    avatar.css              ← .avatar, .avatar-group
    alert.css               ← .alert, .toast, .toast-container
    modal.css               ← .modal, .modal-backdrop, .modal--drawer
    table.css               ← .table, .table-wrapper, .table-pagination
specs/
  foundations/
    color.md                ← Color system and usage rules
    spacing.md              ← Spacing scale and rules
    typography.md           ← Type scale, families, weights
    radius.md               ← Border radius scale
    elevation.md            ← Shadows and z-index layers
    motion.md               ← Duration and easing tokens
  tokens/
    token-reference.md      ← Master map of every CSS variable
  components/
    button.md               ← Button spec (anatomy, tokens, states, examples)
    card.md                 ← Card spec
    input.md                ← Input / form spec
    navigation.md           ← Navigation spec
    badge.md                ← Badge / tag spec
    code-block.md           ← Code block spec
    avatar.md               ← Avatar spec
    alert.md                ← Alert / toast spec
    modal.md                ← Modal / drawer spec
    table.md                ← Table / data grid spec
scripts/
  token-audit.js            ← CI-ready token compliance checker
```

---

## The Three-Layer Rule

```
Layer 1  Primitives  (--primitive-*)  ← defined in tokens.css, NEVER used in components
Layer 2  Aliases     (--color-*, --space-*, --font-*, --radius-*, etc.)  ← USE THESE
Layer 3  Components  (separate .css files)  ← reference Layer 2 only
```

**Components must never reference `--primitive-*` tokens or raw values directly.**

---

## Token Rules

| Property | Allowed | Forbidden |
|---|---|---|
| `color` | `var(--color-text-*)` | `#0F172A`, `rgb(...)` |
| `background-color` | `var(--color-bg-*)` | `white`, `#FFF`, `rgb(...)` |
| `border-color` | `var(--color-border-*)` | `#E2E8F0` |
| `padding`, `margin`, `gap` | `var(--space-*)` | `16px`, `1rem`, `24px` |
| `font-size` | `var(--font-size-*)` | `14px`, `0.875rem` |
| `font-weight` | `var(--font-weight-*)` | `600`, `bold` |
| `font-family` | `var(--font-family-*)` | raw font stack |
| `border-radius` | `var(--radius-*)` | `6px`, `50%`, `9999px` |
| `box-shadow` | `var(--elevation-*)` | raw shadow values |
| `z-index` | `var(--z-*)` | `100`, `999`, `9999` |
| `transition-duration` | `var(--duration-*)` | `150ms`, `0.3s` |
| `transition-timing-function` | `var(--ease-*)` | `cubic-bezier(...)` |

**Exception:** `border: 1px solid` — the `1px` is allowed raw. `border: 2px` or larger must be justified.

---

## Adding New Components

1. Read `specs/tokens/token-reference.md` to find the right tokens.
2. Create `styles/components/<name>.css` — import `../../tokens.css` at top.
3. Create `specs/components/<name>.md` following the existing spec template:
   - Metadata, Overview, Anatomy, Tokens Used, Props/API, States, Code Example, Cross-refs.
4. Run `node scripts/token-audit.js` — fix all errors before committing.

---

## Modifying Tokens

- **To change a color:** update the Layer 2 alias in `tokens.css` (`:root` or dark mode block). Never change primitives unless the upstream palette changes.
- **To add a new spacing step:** add to `--primitive-space-*` and expose as `--space-*` alias.
- **To add a new component shortcut** (e.g., `--radius-popover`): add it alongside similar shortcuts in Layer 2, then update `specs/tokens/token-reference.md`.

---

## Dark Mode

Dark mode overrides **only Layer 2 aliases** in `tokens.css`. Component CSS never changes for dark mode — it inherits automatically via the alias layer.

Dark mode is activated by:
- `@media (prefers-color-scheme: dark)` — automatic
- `[data-theme="dark"]` on `<html>` — manual JS toggle

---

## Audit Script

```bash
# Check for violations (errors only)
node scripts/token-audit.js

# Check a specific directory
node scripts/token-audit.js --dir ./styles/components

# Treat warnings as errors (for CI)
node scripts/token-audit.js --strict

# Quiet output (summary line only)
node scripts/token-audit.js --quiet
```

Exit codes:
- `0` — zero errors (warnings don't block unless `--strict`)
- `1` — one or more errors found

Add to CI:
```yaml
- name: Token audit
  run: node scripts/token-audit.js
```

---

## Common Mistakes

```css
/* ✖ Wrong — raw value */
.my-component { color: #475569; padding: 16px; }

/* ✔ Correct — tokens */
.my-component { color: var(--color-text-secondary); padding: var(--space-4); }
```

```css
/* ✖ Wrong — Layer 1 in component */
.my-component { color: var(--primitive-slate-600); }

/* ✔ Correct — Layer 2 alias */
.my-component { color: var(--color-text-secondary); }
```

```css
/* ✖ Wrong — hardcoded z-index */
.dropdown { z-index: 999; }

/* ✔ Correct */
.dropdown { z-index: var(--z-dropdown); }
```
