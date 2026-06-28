export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-8 p-8">
      <div className="text-center space-y-2">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          Fluid Functionalism Starter
        </h1>
        <p className="text-lg text-muted-foreground">
          Next.js 15 · Tailwind v4 · React 19 · shadcn/ff
        </p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 shadow-surface-2 max-w-md w-full space-y-3">
        <p className="text-sm font-medium text-foreground">Add your first component:</p>
        <code className="block rounded bg-muted px-3 py-2 text-xs font-mono text-foreground break-all">
          npx shadcn@latest add https://www.fluidfunctionalism.com/r/button.json
        </code>
        <p className="text-xs text-muted-foreground">
          Then import{' '}
          <span className="font-mono">{'<Button>'}</span>
          {' '}from{' '}
          <span className="font-mono">@/components/ui/button</span>
          {' '}and replace this page.
        </p>
      </div>

      <p className="text-xs text-muted-foreground">
        Full component library:{' '}
        <span className="font-mono">fluidfunctionalism.com</span>
      </p>
    </main>
  )
}
