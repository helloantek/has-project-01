# Modal

**Name:** Modal / Dialog / Drawer  
**Category:** Overlay  
**Status:** Stable  
**CSS file:** `styles/components/modal.css`

---

## Overview

**When to use:** Modals interrupt the current flow for a focused decision or form. Use for: confirming destructive actions, settings forms that don't need a full page, feature previews, and login/auth flows.

**When not to use:** Don't use modals for complex multi-step workflows that need browser history. Don't open a modal from another modal. For non-blocking side content, use a Drawer instead.

---

## Anatomy

```
.modal-backdrop
  .modal
    .modal__header
      .modal__title
      .modal__subtitle   (optional)
      .modal__close
    .modal__body
      [content]
    .modal__footer
      [cancel btn]  [confirm btn]
```

Drawer variant uses `.modal--drawer` on the `.modal` element.

---

## Tokens Used

| Property | Token |
|---|---|
| `background-color` (backdrop) | `--color-bg-overlay` |
| `backdrop-filter` | `--space-1` (blur amount) |
| `z-index` (backdrop) | `--z-overlay` |
| `z-index` (modal) | `--z-modal` |
| `background-color` (modal) | `--color-bg-surface` |
| `border` | `--color-border-default` |
| `border-radius` | `--radius-modal` |
| `box-shadow` | `--elevation-modal` |
| `padding` (header) | `--space-5` `--space-6` |
| `padding` (body) | `--space-6` |
| `padding` (footer) | `--space-4` `--space-6` |
| `border-bottom` (header) | `--color-border-muted` |
| `border-top` (footer) | `--color-border-muted` |
| `background` (footer) | `--color-bg-subtle` |
| `font-size` (title) | `--font-size-lg` |
| `font-weight` (title) | `--font-weight-semibold` |
| `color` (title) | `--color-text-primary` |
| `color` (subtitle) | `--color-text-secondary` |
| `animation-duration` | `--duration-slow` |
| `animation-timing` | `--ease-spring` (modal), `--ease-out` (drawer/sheet) |

---

## Props / API

| Class modifier | Description |
|---|---|
| `.modal--sm`     | max-width ~320px |
| `.modal--md`     | max-width ~384px (default) |
| `.modal--lg`     | max-width 768px |
| `.modal--xl`     | max-width 1280px |
| `.modal--full`   | Near-viewport fill |
| `.modal--drawer` | Slides in from right |
| `.modal__footer--start` | Left-align footer |
| `.modal__footer--between` | Space-between footer layout |

---

## States

| Element | State | Visual |
|---|---|---|
| `.modal-backdrop` | Entry | `backdrop-in` fade |
| `.modal` | Entry | `modal-in` scale + translateY |
| `.modal--drawer` | Entry | `drawer-in` translateX |
| On mobile | Any modal | Bottom sheet slide-up |
| `.modal__close` | Hover | Ghost hover bg + primary text |
| `.modal__close` | Focus | Focus ring |

---

## Code Example

```html
<div class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title">
  <div class="modal modal--md">
    <div class="modal__header">
      <div>
        <h2 class="modal__title" id="modal-title">Delete project</h2>
        <p class="modal__subtitle">This action cannot be undone.</p>
      </div>
      <button class="modal__close" aria-label="Close dialog">×</button>
    </div>
    <div class="modal__body">
      <p>Are you sure you want to delete <strong>Project Alpha</strong>?
         All deployments and logs will be permanently removed.</p>
    </div>
    <div class="modal__footer">
      <button class="btn btn--secondary btn--sm">Cancel</button>
      <button class="btn btn--danger btn--sm">Delete project</button>
    </div>
  </div>
</div>
```

---

## Cross-References

- [Button](./button.md) — footer actions
- [Alert](./alert.md) — error states inside modal body
- [Input](./input.md) — forms inside modal body
