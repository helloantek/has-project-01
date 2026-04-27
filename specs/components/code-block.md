# Code Block

**Name:** Code Block  
**Category:** Content  
**Status:** Stable  
**CSS file:** `styles/components/code-block.css`

---

## Overview

**When to use:** Code blocks display source code, CLI commands, config files, and technical output. They are the primary content component in documentation pages.

**When not to use:** Don't use a code block for plain text. For a single identifier inline in prose, use `.code-inline` instead.

---

## Anatomy

```
.code-block
  .code-block__header
    .code-block__filename     .code-block__lang     .code-block__actions
                                                      .code-block__copy
  .code-block__body
    .code-block__pre
      [.code-block__line-num]  code content
```

Parts:
- **Root** (`.code-block`) — dark container, border, radius
- **Header** (`.code-block__header`) — filename, language tag, copy button
- **Copy button** (`.code-block__copy`) — copies code to clipboard; shows "Copied" state
- **Body** (`.code-block__body`) — scrollable code area
- **Pre** (`.code-block__pre`) — raw `<pre>` reset inside body
- **Line number** (`.code-block__line-num`) — optional gutter numbers
- **Diff lines** — `.code-block__line--added`, `--removed`, `--highlighted`
- **Inline code** (`.code-inline`) — short code spans in prose

---

## Tokens Used

| Property | Token |
|---|---|
| `background-color` | `--color-bg-code` |
| `border` | `--color-border-default` |
| `border-radius` | `--radius-code` |
| `font-family` | `--font-family-code` |
| `font-size` | `--font-size-sm` |
| `line-height` | `--line-height-relaxed` |
| `padding` (body) | `--space-4` `--space-6` |
| `padding` (header) | `--space-2` `--space-4` |
| `color` (text) | `--color-text-on-code` |
| `color` (filename) | `--color-text-secondary` |
| `color` (lang tag) | `--color-text-tertiary` |
| `color` (copy btn) | `--color-text-tertiary` |
| `background` (header) | `--color-bg-elevated` |
| `border-bottom` | `--color-border-default` |
| `color` (added) | `--color-status-success` (15% mix) |
| `color` (removed) | `--color-status-error` (15% mix) |

---

## Props / API

| Class modifier | Description |
|---|---|
| `.code-block--numbered` | Show line numbers |
| `.code-block--terminal` | Terminal/shell visual variant |
| `.code-block__line--added` | Green diff line |
| `.code-block__line--removed` | Red diff line |
| `.code-block__line--highlighted` | Indigo highlight line |
| `.code-block__copy--copied` | Post-copy success state |
| `.code-inline` | Inline code in prose |
| `.code-block__prompt` | Terminal `$` prompt styling |

---

## States

| Element | State | Visual |
|---|---|---|
| `.code-block__copy` | Default | Tertiary text, no border |
| `.code-block__copy` | Hover | Bg + border |
| `.code-block__copy` | Copied | Success green text |

---

## Code Example

```html
<!-- Basic code block -->
<div class="code-block">
  <div class="code-block__header">
    <span class="code-block__filename">deploy.sh</span>
    <span class="code-block__lang">bash</span>
    <div class="code-block__actions">
      <button class="code-block__copy" aria-label="Copy code">Copy</button>
    </div>
  </div>
  <div class="code-block__body">
    <pre class="code-block__pre"><code>npx devl deploy --env production</code></pre>
  </div>
</div>

<!-- Inline code -->
<p>Run <span class="code-inline">devl init</span> to scaffold a new project.</p>
```

---

## Cross-References

- [Card](./card.md) — code blocks are often the main content in a card body
- [Alert](./alert.md) — CLI error output in error alerts
