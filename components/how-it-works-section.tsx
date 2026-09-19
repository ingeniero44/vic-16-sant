import { ClipboardList, Package, PackageCheck, Banknote } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "Postúlate",
    description: "Llena el formulario con tus datos básicos y nosotros te contactaremos.",
  },
  {
    icon: Package,
    title: "Recibe los productos",
    description: "Te llevamos los productos directamente a tu domicilio sin costo adicional.",
  },
  {
    icon: PackageCheck,
    title: "Empaca y organiza",
    description: "Desde tu casa, empaca los productos siguiendo nuestras sencillas instrucciones.",
  },
  {
    icon: Banknote,
    title: "Recibe tu pago",
    description: "Cada semana recibes $4,000 pesos puntuales por tu trabajo.",
  },
]

export function HowItWorksSection() {
  return (
    <section id="como-funciona" className="bg-primary/5 py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
            ¿Cómo funciona?
          </h2>
          <p className="text-muted-foreground text-balance">
            Comenzar es muy sencillo. Sigue estos pasos y empieza a generar ingresos desde casa.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div key={index} className="relative text-center">
              <div className="relative mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-secondary">
                <step.icon className="h-8 w-8 text-primary" />
                <span className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-accent text-xs font-bold text-accent-foreground">
                  {index + 1}
                </span>
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{step.title}</h3>
              <p className="text-sm text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
