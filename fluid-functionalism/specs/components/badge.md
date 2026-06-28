# Badge — Fluid Functionalism

**Status:** Instalowany przez shadcn registry
**CSS file:** `components/ui/badge.tsx` (po instalacji)
**Instalacja:** `npx shadcn@latest add https://www.fluidfunctionalism.com/r/badge.json`

---

## Overview

Etykieta statusu lub kategorii. Nie jest klikalna — do akcji użyj Button.

---

## Warianty

| Wariant | Zastosowanie |
|---|---|
| `default` | Główna etykieta |
| `secondary` | Drugorzędna |
| `outline` | Obramowanie bez tła |
| `destructive` | Błąd, usunięcie |

---

## Code Example

```tsx
import { Badge } from '@/components/ui/badge'

<Badge>New</Badge>
<Badge variant="secondary">Beta</Badge>
<Badge variant="outline">v1.0</Badge>
<Badge variant="destructive">Deprecated</Badge>
```

---

## Tokeny

Używa `--muted`, `--muted-foreground`, `--border`, `--destructive` z `globals.css`.
