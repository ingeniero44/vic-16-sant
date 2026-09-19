import { Clock, Shield, GraduationCap, Sparkles } from "lucide-react"

const benefits = [
  {
    icon: Clock,
    title: "Horario Flexible",
    description: "Tú decides cuándo trabajar. Organiza tu tiempo como mejor te convenga sin horarios fijos.",
  },
  {
    icon: Shield,
    title: "Trabajo Seguro",
    description: "Empresa establecida con años de experiencia. Tu pago está garantizado cada semana.",
  },
  {
    icon: GraduationCap,
    title: "Sin Experiencia",
    description: "No necesitas experiencia previa. Te capacitamos para que puedas comenzar de inmediato.",
  },
  {
    icon: Sparkles,
    title: "Variedad de Productos",
    description: "Trabaja con diferentes artículos: cosméticos, juguetes, accesorios de cocina y más.",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-foreground md:text-4xl text-balance">
            ¿Por qué unirte a nosotros?
          </h2>
          <p className="text-muted-foreground text-balance">
            En BodegasMX te ofrecemos la oportunidad de generar ingresos de manera cómoda y segura
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-md"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-secondary">
                <benefit.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="mb-2 font-semibold text-foreground">{benefit.title}</h3>
              <p className="text-sm text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
