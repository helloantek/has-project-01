# Typography — Fluid Functionalism

## Font

**Inter Variable** — jedna zmienna czcionka obsługująca wagi 100–900.

Ładowanie przez `next/font/google` (zalecane):

```tsx
// app/layout.tsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

// <html className={inter.variable}>
```

Alternatywnie — self-hosted z `public/fonts/InterVariable.ttf` (odkomentuj blok `@font-face` w `globals.css`).

---

## FontWeightProvider

FF animuje wagę czcionki przez Framer Motion z kompensacją optycznego rozmiaru (`opsz`). Utrzymuje stałą szerokość tekstu (±0.5%) podczas zmiany wagi.

| Token | Waga | Optical size |
|---|---|---|
| normal | 400 | 14 |
| medium | 450 | 15 |
| semibold | 550 | 20 |
| bold | 700 | 25 |

Instalacja + użycie:

```bash
npx shadcn@latest add https://www.fluidfunctionalism.com/r/font-weight.json
```

```tsx
// providers/index.tsx (Phase 2)
import { FontWeightProvider } from '@/components/ui/font-weight-provider'

<FontWeightProvider>{children}</FontWeightProvider>
```

---

## Text wrapping

`globals.css` ustawia `text-wrap: balance` na `h1, h2, h3, p` — lepsza czytelność przy wielolinijkowych nagłówkach.

---

## ShapeProvider

Przełącza `border-radius` całej aplikacji:

| Tryb | Promień |
|---|---|
| `sharp` | ~4px |
| `rounded` | ~8px (domyślny) |
| `pill` | ~20px |

Klawisz `R` cykluje między trybami (z animacją `html.transitioning` 180ms).
