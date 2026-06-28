# Animation — Fluid Functionalism

**Zasada:** "Every transition exists to make a state change legible."
Animacje komunikują zmianę stanu — nie dekorują.

---

## Spring Physics Presets (Framer Motion)

| Preset | Duration | Bounce | Exit | Zastosowanie |
|---|---|---|---|---|
| `spring.fast` | 0.08s | 0 | 0.06s | Szybkie interakcje (hover, toggle) |
| `spring.moderate` | 0.16s | 0.08 | 0.12s | Standard (dialogi, dropdown) |
| `spring.slow` | 0.24s | 0.12 | 0.16s | Duże elementy (sidebar, sheet) |

Reguła: im większy element, tym wolniejsza sprężyna.
Exit zawsze jest bez odbicia (bounce: 0) — wyjście ma być szybkie i czyste.

---

## Theme Transition (`html.transitioning`)

Gdy `ShapeProvider` zmienia kształt (klawisz `R`), JS dodaje `html.transitioning` na 180ms:

```css
html.transitioning *,
html.transitioning *::before,
html.transitioning *::after {
  transition: border-radius 180ms ease-in-out,
              background-color 180ms ease-in-out,
              color 180ms ease-in-out,
              border-color 180ms ease-in-out,
              fill 180ms ease-in-out,
              stroke 180ms ease-in-out !important;
}
```

---

## Keyframes (`globals.css`)

| Nazwa | Opis |
|---|---|
| `spinner-move` | Obrót stroke-dashoffset (spinner SVG) |
| `spinner-dash` | Oddech dasharray 15↔40 (spinner SVG) |
| `shimmer` | Gradient sweep 300% szerokości, 1.5s |
| `accordion-down/up` | Animacja wysokości Radix accordion |
| `fade-in` | opacity 0→1 |
| `slide-in-from-top/bottom` | opacity + translateY ±4px |

---

## Shimmer Text

```html
<span class="shimmer-text">Thinking...</span>
```

Efekt używany w `ThinkingIndicator` — szary gradient sweepuje po tekście.
Invertuje się automatycznie w dark mode.

---

## Responsive Fade (`xl-fade-flex`, `xl-fade-block`)

Panel boczny pojawia się/znika przy 1280px z cross-fade:
- Pojawienie: 0.24s ease-out (+ `@starting-style` opacity: 0)
- Znikanie: 0.16s ease-out
- Fallback dla przeglądarek bez `transition-behavior`: natychmiastowy switch
