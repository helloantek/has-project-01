# Table

**Name:** Table  
**Category:** Data Display  
**Status:** Stable  
**CSS file:** `styles/components/table.css`

---

## Overview

**When to use:** Tables display structured, comparable data with multiple attributes per row (users, deployments, billing records). Prefer a table over a list of cards when rows have 3+ comparable attributes.

**When not to use:** Don't use a table for non-tabular content. For fewer than 3 columns, consider a definition list or card list. Don't use nested tables.

---

## Anatomy

```
.table-wrapper
  .table
    <thead>
      <tr>
        <th class="table__checkbox">  [checkbox]
        <th>  .table__sort-btn  .table__sort-icon
        <th class="table__col--right">  …
    <tbody>
      <tr [.is-selected] [.is-loading]>
        <td class="table__checkbox">  [checkbox]
        <td>  content
        <td class="table__col--num">  123
    <tbody>
      <tr class="table__empty">
        <td colspan="…">
          .table__empty-icon
          .table__empty-title

.table-pagination
  .table-pagination__info   .table-pagination__controls
```

---

## Tokens Used

| Property | Token |
|---|---|
| `border` (wrapper) | `--color-border-default` |
| `border-radius` (wrapper) | `--radius-xl` |
| `background` (thead) | `--color-bg-inset` |
| `border-bottom` (thead) | `--color-border-default` |
| `font-size` (th) | `--font-size-xs` |
| `font-weight` (th) | `--font-weight-semibold` |
| `color` (th) | `--color-text-secondary` |
| `letter-spacing` (th) | `--letter-spacing-wide` |
| `padding` (th/td) | `--space-3` `--space-4` |
| `padding-left` (first) | `--space-6` |
| `padding-right` (last) | `--space-6` |
| `border-bottom` (tbody tr) | `--color-border-muted` |
| `color` (td) | `--color-text-primary` |
| `background` (hover) | `--color-bg-inset` |
| `background` (selected) | `--color-interactive-primary-subtle` |
| `font-family` (num col) | `--font-family-code` |
| `color` (sort active) | `--color-interactive-primary` |
| `background` (pagination) | `--color-bg-inset` |
| `font-size` (pagination) | `--font-size-sm` |
| `color` (pagination) | `--color-text-secondary` |
| `transition` | `background-color var(--duration-fast) var(--ease-default)` |

---

## Props / API

| Class modifier | Description |
|---|---|
| `.table__col--right`  | Right-align column |
| `.table__col--center` | Center-align column |
| `.table__col--num`    | Tabular numbers, monospace, right-aligned |
| `.table__sort-btn`    | Sortable column trigger |
| `.table__sort-btn--asc`  | Currently sorted ascending |
| `.table__sort-btn--desc` | Currently sorted descending |
| `.is-selected` (on tr) | Selected row highlight |
| `.is-loading` (on tr)  | Dimmed loading row |
| `.table__empty`        | Full-width empty state row |
| `.table-pagination`    | Pagination bar below table |

---

## States

| Element | State | Visual |
|---|---|---|
| `tbody tr` | Default | transparent bg |
| `tbody tr` | Hover | `--color-bg-inset` |
| `tbody tr.is-selected` | — | `--color-interactive-primary-subtle` |
| `tbody tr.is-loading` | — | 50% opacity |
| `.table__sort-btn` | Active sort | indigo icon |
| `.table__sort-btn` | Hover | `--color-text-primary` |

---

## Code Example

```html
<div class="table-wrapper">
  <table class="table">
    <thead>
      <tr>
        <th class="table__checkbox">
          <input type="checkbox" aria-label="Select all">
        </th>
        <th>
          <button class="table__sort-btn table__sort-btn--asc">
            Name <svg class="table__sort-icon" …></svg>
          </button>
        </th>
        <th>Status</th>
        <th class="table__col--num">Requests</th>
        <th class="table__col--right">Actions</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td class="table__checkbox"><input type="checkbox"></td>
        <td>Project Alpha</td>
        <td><span class="badge badge--success">Live</span></td>
        <td class="table__col--num">1,042,381</td>
        <td class="table__col--right">
          <button class="btn btn--ghost btn--icon btn--sm" aria-label="Options">⋯</button>
        </td>
      </tr>
      <tr class="table__empty">
        <td colspan="5">
          <div class="table__empty-title">No projects found</div>
        </td>
      </tr>
    </tbody>
  </table>
  <div class="table-pagination">
    <span class="table-pagination__info">Showing 1–10 of 42</span>
    <div class="table-pagination__controls">
      <button class="btn btn--secondary btn--sm">Previous</button>
      <button class="btn btn--secondary btn--sm">Next</button>
    </div>
  </div>
</div>
```

---

## Cross-References

- [Badge](./badge.md) — status column content
- [Button](./button.md) — row actions, pagination controls
- [Avatar](./avatar.md) — user identity column
- [Card](./card.md) — for non-tabular record display
