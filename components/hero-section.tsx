"use client"

import { ArrowDown, Home, Truck, Banknote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-3xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-card px-4 py-2 text-sm">
            <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-muted-foreground">Vacantes disponibles</span>
          </div>

          {/* Título */}
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-foreground md:text-5xl lg:text-6xl text-balance">
            Bienvenido a{" "}
            <span className="text-primary">BodegasMX</span>
          </h1>

          {/* Descripción */}
          <p className="mb-8 text-lg text-muted-foreground md:text-xl text-balance">
            Genera ingresos desde la comodidad de tu hogar empacando y organizando productos como cosméticos, juguetes, accesorios de cocina, productos comestibles y más. Nosotros nos encargamos de llevarte los productos y recogerlos una vez listos.
{" "}
            <strong className="text-foreground"></strong>{" "}
            
          </p>

          {/* Tarjeta de salario */}
          <div className="mx-auto mb-8 max-w-sm rounded-2xl border border-border bg-card p-6 shadow-sm">
            <p className="mb-1 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              Salario Semanal
            </p>
            <p className="font-bold text-accent text-3xl md:text-4xl">$4,000 pesos</p>
            <p className="mt-2 text-sm text-muted-foreground">Pagos puntuales cada semana</p>
          </div>

          {/* CTA */}
          <div className="mb-8">
            <p className="mb-2 text-sm text-muted-foreground">Si quieres postularte presiona aquí</p>
            <ArrowDown className="mx-auto mb-4 h-5 w-5 animate-bounce text-accent" />
            <Button asChild size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground px-8">
              <Link href="#postularme">Postularme</Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Home className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Desde tu casa</p>
                <p className="text-sm text-muted-foreground">Sin traslados</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Truck className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Entrega a domicilio</p>
                <p className="text-sm text-muted-foreground">Nosotros llevamos y recogemos</p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-xl border border-border bg-card p-4">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary">
                <Banknote className="h-5 w-5 text-muted-foreground" />
              </div>
              <div className="text-left">
                <p className="font-medium text-foreground">Pago semanal</p>
                <p className="text-sm text-muted-foreground">$4,000 garantizados</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
