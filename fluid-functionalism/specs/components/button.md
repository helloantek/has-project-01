# Button — Fluid Functionalism

**Status:** Instalowany przez shadcn registry
**CSS file:** `components/ui/button.tsx` (po instalacji)
**Instalacja:** `npx shadcn@latest add https://www.fluidfunctionalism.com/r/button.json`

---

## Overview

Trigger dla natychmiastowej akcji. FF Button ma animację font-weight przez Framer Motion — waga rośnie na hover, korzystając z `FontWeightProvider`.

---

## Warianty

| Wariant | Opis |
|---|---|
| `primary` | Główna akcja (tło akcentowe) |
| `secondary` | Drugorzędna akcja (obramowanie) |
| `tertiary` | Trzeciorzędna (muted) |
| `ghost` | Brak tła (nawigacja) |

## Rozmiary

`sm` / `md` (domyślny) / `lg` + warianty ikon: `icon-sm`, `icon`, `icon-lg`

---

## Zależności

- `framer-motion` — animacja font-weight
- `@radix-ui/react-slot` — `asChild` prop
- `class-variance-authority` — warianty klas
- `lucide-react` — ikony
- `@/lib/utils` — cn()
- `@/components/ui/font-weight` — FontWeightProvider context

---

## Code Example

```tsx
import { Button } from '@/components/ui/button'

<Button>Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost" size="sm">Ghost small</Button>
<Button size="icon"><PlusIcon /></Button>
```

---

## Cross-references

- `specs/foundations/typography.md` — FontWeightProvider
- `specs/foundations/animation.md` — spring.fast preset
