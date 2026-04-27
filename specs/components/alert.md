# Alert

**Name:** Alert / Banner / Toast  
**Category:** Feedback  
**Status:** Stable  
**CSS file:** `styles/components/alert.css`

---

## Overview

**When to use:**
- **Alert** — inline, persistent feedback after an action or about a form state. Placed close to the relevant content.
- **Toast** — transient, auto-dismissing notification for background events (deploy succeeded, invitation sent).

**When not to use:** Don't use alerts for decorative color blocks. Don't use toasts for errors that require user action — use an inline alert instead.

---

## Anatomy

```
.alert
  .alert__icon
  .alert__content
    .alert__title
    .alert__body
    .alert__actions   ← optional inline buttons
  .alert__close       ← optional dismiss button

.toast-container (fixed position)
  .toast
    [icon]  .toast__message  [close]
```

---

## Tokens Used

| Property | Token |
|---|---|
| `padding` | `--space-4` |
| `border-radius` | `--radius-lg` |
| `background-color` | `--color-status-*-subtle` |
| `border-color` | `--color-status-*-border` |
| `color` | `--color-status-*-text` |
| `font-size` (title) | `--font-size-sm` |
| `font-weight` (title) | `--font-weight-semibold` |
| `font-size` (body) | `--font-size-sm` |
| `gap` | `--space-3` |
| `z-index` (toast container) | `--z-toast` |
| `box-shadow` (toast) | `--elevation-toast` |
| `background` (toast) | `--color-bg-elevated` |
| `border` (toast) | `--color-border-default` |
| `border-radius` (toast) | `--radius-xl` |
| `animation-duration` | `--duration-slow` |
| `animation-timing` | `--ease-spring` |

---

## Props / API

| Class modifier | Description |
|---|---|
| `.alert--info`    | Indigo informational |
| `.alert--success` | Green success |
| `.alert--warning` | Amber warning |
| `.alert--error`   | Red error |
| `.alert--bordered`| Left-accent border variant |
| `.toast`          | Transient notification |
| `.toast-container`| Fixed bottom-right container |

---

## States

| Element | State | Visual |
|---|---|---|
| `.alert__close` | Hover | 10% current color overlay bg |
| `.alert__close` | Focus | Focus ring |
| `.toast` | Entry | `toast-in` keyframe — fade + translateY |

---

## Code Example

```html
<!-- Inline success alert -->
<div class="alert alert--success" role="alert">
  <svg class="alert__icon" …></svg>
  <div class="alert__content">
    <p class="alert__title">Deployment successful</p>
    <p class="alert__body">Version 2.4.1 is now live on production.</p>
    <div class="alert__actions">
      <a href="/logs" class="btn btn--ghost btn--sm">View logs</a>
    </div>
  </div>
  <button class="alert__close" aria-label="Dismiss">×</button>
</div>

<!-- Error alert -->
<div class="alert alert--error" role="alert">
  <svg class="alert__icon" …></svg>
  <div class="alert__content">
    <p class="alert__title">Build failed</p>
    <p class="alert__body">TypeScript error in src/api/index.ts:42</p>
  </div>
</div>

<!-- Toast (JS-injected) -->
<div class="toast-container" aria-live="polite">
  <div class="toast" role="status">
    <svg …></svg>
    <p class="toast__message">Copied to clipboard</p>
  </div>
</div>
```

---

## Cross-References

- [Button](./button.md) — `.alert__actions` contains buttons
- [Badge](./badge.md) — don't use a badge where an alert is appropriate
- [Modal](./modal.md) — for errors that block the user and require a decision
