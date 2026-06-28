# Surface Ladder — Fluid Functionalism

**Zasada:** Każdy poziom elevacji ma dedykowany kolor tła i przepis cienia.
Shadow "robi robotę" w light mode — powierzchnie są prawie jednakowe (#FAFAFA→#FFF), ale cień je rozróżnia. W dark mode ladder jest addytywny (biała przezroczystość nad #171717).

---

## Poziomy

```
surface-1  ← tło strony (--background)
surface-2  ← wciśnięte, muted track
surface-3  ← karty, panele (--card)
surface-4  ← dialogi, dropdown
surface-5  ← nakładki
surface-6  ← tooltip, popover
surface-7  ← modal
surface-8  ← najwyższy poziom
```

---

## SurfaceContext (provider)

`SurfaceProvider` śledzi głębokość zagnieżdżenia. Każdy `<Surface>` automatycznie przechodzi na następny poziom:

```tsx
// Zainstaluj: npx shadcn@latest add https://www.fluidfunctionalism.com/r/surface-context.json
import { Surface } from '@/components/ui/surface-context'

<Surface>        {/* surface-3 + shadow-surface-3 */}
  <Surface>      {/* surface-4 + shadow-surface-4 */}
    ...
  </Surface>
</Surface>
```

---

## Parowanie surface + shadow

Używaj `bg-surface-N` razem z `shadow-surface-N`:

```html
<div class="bg-surface-3 shadow-surface-3 rounded-lg p-4">
  Karta na poziomie 3
</div>
```

---

## Checker pattern

Dla tła pod elementami z kanałem alpha (np. ColorPicker):

| Token | Light | Dark |
|---|---|---|
| `--checker-a` | `#bbbbbb` | `#1f1f1f` |
| `--checker-b` | `#ffffff` | `#2a2a2a` |
