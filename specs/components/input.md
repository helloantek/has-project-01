# Input / Form

**Name:** Input  
**Category:** Form  
**Status:** Stable  
**CSS file:** `styles/components/input.css`

---

## Overview

**When to use:** Use inputs for text entry, selection, and boolean choices. Every form control must have a visible label, helper text for constraints, and an explicit error message when invalid.

**When not to use:** Don't use a plain `<input>` without wrapping in `.form-group`. For read-only values, display as plain text rather than a disabled input.

---

## Anatomy

```
.form-group
  .form-label [required marker]
  .input-wrapper
    [.input-icon]  .input  [.input-icon--right]
  .form-helper OR .form-error
```

Parts:
- **Form group** (`.form-group`) — stacks label + input + helper
- **Label** (`.form-label`) — always visible; never replaced by placeholder
- **Input** (`.input`) — the actual form control
- **Input wrapper** (`.input-wrapper`) — relative container for icon positioning
- **Icon** (`.input-icon`) — optional leading or trailing icon
- **Helper** (`.form-helper`) — secondary constraint description
- **Error** (`.form-error`) — validation message; replaces helper on error

---

## Tokens Used

| Property | Token |
|---|---|
| `padding` | `--space-1` … `--space-4` (size-dependent) |
| `font-family` | `--font-family-body` |
| `font-size` | `--font-size-xs` / `--font-size-sm` / `--font-size-base` |
| `color` (input text) | `--color-text-primary` |
| `color` (placeholder) | `--color-text-tertiary` |
| `background-color` | `--color-bg-surface` |
| `border-color` (default) | `--color-border-default` |
| `border-color` (hover) | `--color-border-strong` |
| `border-color` (focus) | `--color-border-focus` |
| `border-color` (error) | `--color-border-error` |
| `border-radius` | `--radius-input` |
| `color` (label) | `--color-text-primary` |
| `color` (helper) | `--color-text-tertiary` |
| `color` (error) | `--color-status-error-text` |
| `color` (required marker) | `--color-status-error` |
| `accent-color` (checkbox) | `--color-interactive-primary` |
| `transition` | `--transition-colors` |

---

## Props / API

| Class modifier | Description |
|---|---|
| `.input` | Default text input |
| `.input--sm` | Small size |
| `.input--lg` | Large size |
| `.input--error` | Error border + focus ring |
| `.input--success` | Success border |
| `.textarea` | Extends `.input` for `<textarea>` |
| `.select` | Extends `.input` for `<select>` |
| `.input-wrapper` | Wrap `.input` to add icons |
| `.input-icon` | Leading icon |
| `.input-icon--right` | Trailing icon |
| `.input-group` | Flex row for prefix/suffix |
| `.input-group__addon` | Non-editable prefix/suffix cell |
| `.checkbox` | Label+input checkbox wrapper |
| `.radio` | Label+input radio wrapper |
| `.toggle` | Toggle/switch wrapper |
| `.form-label--required` | Appends `*` required marker |

---

## States

| State | Visual |
|---|---|
| Default | `--color-border-default` |
| Hover | `--color-border-strong` |
| Focus | `--color-border-focus` + box-shadow ring |
| Error | `--color-border-error` + error ring on focus |
| Success | `--color-border-success` |
| Disabled | `--color-bg-inset` bg, `--color-text-disabled` text, `cursor: not-allowed` |

---

## Code Example

```html
<!-- Text field with error -->
<div class="form-group">
  <label class="form-label form-label--required" for="email">Email</label>
  <div class="input-wrapper">
    <svg class="input-icon" …></svg>
    <input class="input input--error" type="email" id="email"
           placeholder="you@devl.dev" aria-describedby="email-error">
  </div>
  <p class="form-error" id="email-error">Enter a valid email address.</p>
</div>

<!-- Select -->
<div class="form-group">
  <label class="form-label" for="region">Region</label>
  <select class="input select" id="region">
    <option>US East</option>
    <option>EU West</option>
  </select>
</div>

<!-- Checkbox -->
<label class="checkbox">
  <input class="checkbox__input" type="checkbox">
  <span class="checkbox__label">Enable notifications</span>
</label>
```

---

## Cross-References

- [Button](./button.md) — input group suffix button
- [Alert](./alert.md) — form-level error banner above a form
- [Modal](./modal.md) — forms are often placed inside modal bodies
