# Token Reference — Fluid Functionalism

Źródło: `app/globals.css`
Źródło upstream: `https://github.com/mickadesign/fluid-functionalism/blob/main/app/globals.css`

---

## Architektura

FF używa jednej warstwy tokenów (bez podziału Primitive/Alias). Tokeny to CSS custom properties w `:root`, `.dark`, `.light`. Tailwind v4 odczytuje je przez `@theme inline` w `globals.css`.

Trzy tryby:
- **Light** (domyślny): `:root`
- **Dark auto**: `@media (prefers-color-scheme: dark) :root:not(.light)`
- **Dark forced**: `.dark`
- **Light forced**: `.light`

---

## Surface Ladder

| Token | Light | Dark |
|---|---|---|
| `--surface-1` | `#FAFAFA` | `#171717` |
| `--surface-2` | `#FCFCFC` | `#1E1E1E` |
| `--surface-3` | `#FFFFFF` | `#252525` |
| `--surface-4` | `#FFFFFF` | `#2C2C2C` |
| `--surface-5` | `#FFFFFF` | `#333333` |
| `--surface-6` | `#FFFFFF` | `#3A3A3A` |
| `--surface-7` | `#FFFFFF` | `#414141` |
| `--surface-8` | `#FFFFFF` | `#484848` |

Tailwind utilities: `bg-surface-1` … `bg-surface-8`

---

## Semantic Colors

| Token | Light | Dark | Opis |
|---|---|---|---|
| `--background` | `var(--surface-1)` | `var(--surface-1)` | Tło strony |
| `--foreground` | `#171717` | `#F5F5F5` | Tekst główny |
| `--card` | `var(--surface-3)` | `var(--surface-3)` | Tło kart |
| `--card-foreground` | `#171717` | `#F5F5F5` | Tekst na kartach |
| `--muted` | `#F4F4F5` | `var(--surface-2)` | Tło drugorzędne |
| `--muted-foreground` | `#737373` | `#A3A3A3` | Tekst drugorzędny |
| `--accent` | `#E5E5E5` | `#525252` | Highlight interaktywny |
| `--accent-foreground` | `#171717` | `#F5F5F5` | Tekst na accentcie |
| `--selected` | `#D4D4D4` | `#525252` | Stan zaznaczony |
| `--border` | `color-mix(foreground 12%)` | `color-mix(foreground 12%)` | Linia obramowania |
| `--ring` | `#E5E5E5` | `#404040` | Focus ring |
| `--input` | `#E5E5E5` | `#404040` | Obramowanie inputów |
| `--destructive` | `#EF4444` | `#F87171` | Kolor błędu |
| `--destructive-light` | `#FEF2F2` | `#450A0A` | Tło błędu |

---

## Overlay System

Nakładki interaktywne są *relative to surface* — działają na każdej elevacji.

| Token | Light | Dark |
|---|---|---|
| `--overlay` | `0 0 0` (czarny) | `255 255 255` (biały) |
| `--hover` | `rgb(0 0 0 / 0.04)` | `rgb(255 255 255 / 0.06)` |
| `--active` | `rgb(0 0 0 / 0.07)` | `rgb(255 255 255 / 0.10)` |

Użycie: `bg-hover` (Tailwind), `var(--hover)` (CSS).

---

## Shadow System

8 przepisów cieni. Light: addytywne warstwy czerni (0.06 opacity). Dark: inset highlight + ring + drop shadows.

Tailwind utilities: `shadow-surface-1` … `shadow-surface-8`

Każdy poziom cienia odpowiada poziomowi surface — elementy na `bg-surface-4` używają `shadow-surface-4`.

---

## Neutral Scale

9 stopni szarości (jednakowe w light i dark):

| Token | Wartość |
|---|---|
| `--neutral-100` | `#F5F5F5` |
| `--neutral-200` | `#E5E5E5` |
| `--neutral-300` | `#D4D4D4` |
| `--neutral-400` | `#A3A3A3` |
| `--neutral-500` | `#737373` |
| `--neutral-600` | `#525252` |
| `--neutral-700` | `#404040` |
| `--neutral-800` | `#262626` |
| `--neutral-900` | `#171717` |

---

## Font

| Token | Wartość |
|---|---|
| `--font-sans` | `var(--font-inter, "Inter", system-ui, sans-serif)` |

`--font-inter` ustawia `next/font/google` przez CSS variable w `app/layout.tsx`.
