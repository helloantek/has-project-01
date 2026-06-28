'use client'

// Phase 1 — passthrough until FF providers are installed via:
//   npx shadcn@latest add https://www.fluidfunctionalism.com/r/shape-context.json
//   npx shadcn@latest add https://www.fluidfunctionalism.com/r/font-weight.json
//
// Phase 2 — replace this file with:
//   import { ShapeProvider } from '@/components/ui/shape-provider'
//   import { FontWeightProvider } from '@/components/ui/font-weight-provider'
//   export function Providers({ children }: { children: React.ReactNode }) {
//     return (
//       <ShapeProvider defaultShape="rounded">
//         <FontWeightProvider>{children}</FontWeightProvider>
//       </ShapeProvider>
//     )
//   }

export function Providers({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
