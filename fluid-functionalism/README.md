# Fluid Functionalism Starter

Gotowy starter Next.js 15 z preconfiguracją Fluid Functionalism (FF) — drugiego design systemu w tym repozytorium, obok `../tokens.css`.

## Stack

| Warstwa | Technologia |
|---|---|
| Framework | Next.js 15 (App Router, Turbopack) |
| Język | TypeScript 5, strict mode |
| Stylowanie | Tailwind CSS v4 (CSS-first, brak `tailwind.config.ts`) |
| Komponenty | shadcn/ff — `https://www.fluidfunctionalism.com/r` |
| Animacje | Framer Motion 12 (spring physics) |
| Font | Inter Variable (`next/font/google`) |
| Runtime | React 19 |

## Setup

```bash
cd fluid-functionalism
npm install
npm run dev
# → http://localhost:3000
```

## Dodawanie komponentów FF

```bash
# Pojedynczy komponent
npx shadcn@latest add https://www.fluidfunctionalism.com/r/button.json

# Via alias rejestru (po npm install)
npx shadcn@latest add ff/button

# Kilka naraz
npx shadcn@latest add \
  https://www.fluidfunctionalism.com/r/button.json \
  https://www.fluidfunctionalism.com/r/badge.json \
  https://www.fluidfunctionalism.com/r/card.json
```

Dostępne komponenty (24+): Button, Badge, Table, Dialog, Slider, ColorPicker,
Select, Accordion, Tabs, Switch, ThinkingIndicator i inne na `fluidfunctionalism.com`.

## System tokenów

FF używa podejścia CSS-first Tailwind v4. Wszystkie tokeny to CSS custom properties
w `app/globals.css`. Brak `tailwind.config.ts`.

| Kategoria | Tokeny |
|---|---|
| Surface ladder | `--surface-1` … `--surface-8` |
| Semantic colors | `--background`, `--foreground`, `--card`, `--muted`, `--accent`, `--destructive`, `--border`, `--ring`, `--input` |
| Overlay system | `--hover`, `--active` (computed alpha relative to surface) |
| Shadow system | `--shadow-1` … `--shadow-8` |
| Neutral scale | `--neutral-100` … `--neutral-900` |

Tailwind utilities: `bg-surface-1`, `shadow-surface-3`, `bg-muted`, `text-foreground` itd.

## Providery

Po zainstalowaniu komponentów providerów, zaktualizuj `providers/index.tsx`:

```tsx
import { ShapeProvider } from '@/components/ui/shape-provider'
import { FontWeightProvider } from '@/components/ui/font-weight-provider'

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ShapeProvider defaultShape="rounded">
      <FontWeightProvider>{children}</FontWeightProvider>
    </ShapeProvider>
  )
}
```

- **ShapeProvider** — przełącza border-radius między `sharp`, `rounded`, `pill` (klawisz `R`)
- **FontWeightProvider** — animowane przejścia font-weight przez Framer Motion

## Dark mode

FF obsługuje trzy tryby:
- `@media (prefers-color-scheme: dark)` — automatyczny
- `.dark` na `<html>` — wymuszony ciemny
- `.light` na `<html>` — wymuszony jasny (np. w ciemnej stronie)

## Izolacja od rodzica

Ten folder jest niezależnym projektem. Skrypt `../scripts/token-audit.js`
skanuje wyłącznie `../styles/` i `../tokens.css` — nie dotyka niczego tutaj.
