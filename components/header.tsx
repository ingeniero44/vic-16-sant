"use client"

import { Package } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
            <Package className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold text-foreground">BodegasMX</span>
        </Link>
        
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#beneficios" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Beneficios
          </Link>
          <Link href="#como-funciona" className="text-sm text-muted-foreground transition-colors hover:text-foreground">
            Cómo funciona
          </Link>
          <Button asChild className="bg-primary hover:bg-primary/90">
            <Link href="#postularme">Postularme</Link>
          </Button>
        </nav>

        <Button asChild className="bg-primary hover:bg-primary/90 md:hidden">
          <Link href="#postularme">Postularme</Link>
        </Button>
      </div>
    </header>
  )
}
