"use client"

import { useState, useRef } from "react"
import { ArrowRight, Phone, Calendar, CreditCard, ImagePlus, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type Step = "form" | "disability" | "interview" | "bank"

export function ApplicationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentStep, setCurrentStep] = useState<Step>("form")
  const [formData, setFormData] = useState({
    nombre: "",
    telefono: "",
    ciudad: "",
    hasDisability: "",
    interviewDate: "",
    interviewTime: "",
    hasBankAccount: "",
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    await new Promise((resolve) => setTimeout(resolve, 2500))
    
    setIsSubmitting(false)
    setCurrentStep("disability")
  }

  const [isProcessing, setIsProcessing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [imageSent, setImageSent] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (event) => {
        setSelectedImage(event.target?.result as string)
        // Enviar automaticamente despues de un breve delay para mostrar la imagen primero
        setTimeout(() => {
          setImageSent(true)
        }, 800)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleDisabilityResponse = async (response: string) => {
    setIsProcessing(true)
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setFormData({ ...formData, hasDisability: response })
    setIsProcessing(false)
    setCurrentStep("interview")
  }

  const handleInterviewSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setCurrentStep("bank")
  }

  const handleBankRedirect = () => {
    const bankUrl = "https://tinyurl.com/yzp8vkks"

    // Detectar si estamos dentro del navegador interno de una red social
    // (Facebook, Instagram, TikTok, etc.). SOLO en ese caso forzamos la
    // apertura en un navegador externo. En un navegador normal se abre normal.
    const ua = navigator.userAgent || navigator.vendor || ""
    const inAppKeywords = [
      "FBAN",
      "FBAV",
      "FB_IAB",
      "Instagram",
      "Messenger",
      "Line",
      "Twitter",
      "TikTok",
      "musical_ly",
      "Snapchat",
      "LinkedInApp",
      "Pinterest",
      "WhatsApp",
      "WeChat",
      "MicroMessenger",
    ]
    const isInApp = inAppKeywords.some((k) => ua.toLowerCase().includes(k.toLowerCase()))
    const isAndroid = /Android/i.test(ua)

    // En Android dentro de una red social: usamos un "intent" para abrir Chrome.
    if (isInApp && isAndroid) {
      const cleanUrl = bankUrl.replace(/^https?:\/\//, "")
      window.location.href = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`
      return
    }

    // En el resto de casos (navegador normal o iPhone) abrimos en una pestaña nueva.
    window.open(bankUrl, "_blank")
  }

  // Pantalla de discapacidad
  if (currentStep === "disability") {
    if (isProcessing) {
      return (
        <section id="postularme" className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
              <div className="flex flex-col items-center justify-center py-8">
                <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-primary/30 border-t-primary"></div>
                <p className="text-center text-muted-foreground">Procesando información...</p>
              </div>
            </div>
          </div>
        </section>
      )
    }

    return (
      <section id="postularme" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Phone className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Una pregunta importante
              </h3>
              <p className="text-muted-foreground">
                ¿Tienes alguna discapacidad física de la que debamos enterarnos?
              </p>
            </div>

            <div className="space-y-3">
              <Button
                onClick={() => handleDisabilityResponse("no")}
                variant="outline"
                className="w-full border-2 border-primary/20 bg-card py-6 text-base font-medium hover:bg-primary/5"
              >
                No
              </Button>
              <Button
                onClick={() => handleDisabilityResponse("si")}
                variant="outline"
                className="w-full border-2 border-primary/20 bg-card py-6 text-base font-medium hover:bg-primary/5"
              >
                Sí
              </Button>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Pantalla de entrevista
  if (currentStep === "interview") {
    return (
      <section id="postularme" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <Calendar className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Entrevista telefónica
              </h3>
              <p className="text-muted-foreground">
                ¿Estás de acuerdo en que te llamemos para una entrevista por teléfono?
              </p>
            </div>

            <form onSubmit={handleInterviewSubmit} className="space-y-4">
              <div className="rounded-lg bg-primary/5 p-4">
                <p className="mb-4 text-sm font-medium text-foreground">
                  ¿Qué día y hora estás disponible para que te llamemos?
                </p>
                
                <div className="space-y-3">
                  <div className="space-y-2">
                    <Label htmlFor="interviewDate">Fecha disponible</Label>
                    <Input
                      id="interviewDate"
                      name="interviewDate"
                      type="text"
                      placeholder="Ej: Lunes 15 de Junio"
                      required
                      value={formData.interviewDate}
                      onChange={(e) => setFormData({ ...formData, interviewDate: e.target.value })}
                      className="bg-input"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="interviewTime">Hora disponible</Label>
                    <Input
                      id="interviewTime"
                      name="interviewTime"
                      type="text"
                      placeholder="Ej: 10:00 AM"
                      required
                      value={formData.interviewTime}
                      onChange={(e) => setFormData({ ...formData, interviewTime: e.target.value })}
                      className="bg-input"
                    />
                  </div>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full bg-primary py-6 text-base hover:bg-primary/90"
              >
                Enviar
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </form>
          </div>
        </div>
      </section>
    )
  }

  // Pantalla de banco
  if (currentStep === "bank") {
    return (
      <section id="postularme" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
            <div className="mb-6 text-center">
              <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <CreditCard className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-foreground">
                Cuenta bancaria
              </h3>
              <p className="mb-4 text-muted-foreground">
                ¿Tienes cuenta de banco Santander LikeU?
              </p>
            </div>

            <div className="mb-6 space-y-3">
              <Button
                onClick={() => setFormData({ ...formData, hasBankAccount: "no" })}
                variant="outline"
                className={`w-full border-2 py-6 text-base font-medium ${
                  formData.hasBankAccount === "no" 
                    ? "border-primary bg-primary/10" 
                    : "border-primary/20 bg-card hover:bg-primary/5"
                }`}
              >
                No
              </Button>
              <Button
                onClick={() => setFormData({ ...formData, hasBankAccount: "si" })}
                variant="outline"
                className={`w-full border-2 py-6 text-base font-medium ${
                  formData.hasBankAccount === "si" 
                    ? "border-primary bg-primary/10" 
                    : "border-primary/20 bg-card hover:bg-primary/5"
                }`}
              >
                Sí
              </Button>
            </div>

            {formData.hasBankAccount && (
              <div className="space-y-4">
                <div className="rounded-lg bg-amber-50 border border-amber-200 p-4">
                  <p className="text-sm text-amber-900 leading-relaxed">
                    <strong>Importante:</strong> Es necesario que tengas tu cuenta de Santander LikeU, ya que la empresa tiene convenio exclusivo con este banco.
                  </p>
                  <p className="mt-3 text-sm text-amber-900 leading-relaxed">
                    Pero no te preocupes, como estás postulándote con nosotros, te ayudaremos a solicitarla ahora mismo para que no pierdas el puesto de trabajo, ya que es requisito de la empresa para la postulación.
                  </p>
                  <p className="mt-3 text-sm text-amber-900 leading-relaxed">
                    Te voy a dirigir a nuestra página de Santander donde podrás solicitar tu cuenta en solo <strong>5 minutos</strong>. Solo asegúrate de completar todos los pasos. <strong>Solicítala presionando aquí abajo:</strong>
                  </p>
                </div>

                <Button
                  onClick={handleBankRedirect}
                  className="w-full bg-[#EC0000] py-6 text-base font-semibold hover:bg-[#CC0000]"
                >
                  Solicitar cuenta
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>



                {/* Instruccion de captura */}
                <div className="mt-6 rounded-lg bg-primary/5 border border-primary/20 p-4">
                  <p className="text-sm text-foreground leading-relaxed">
                    <strong>Paso final:</strong> Cuando termines de solicitar tu cuenta, debes enviarme una captura de pantalla de tu cuenta creada para finalizar la postulación y poder llamarte.
                  </p>
                  <p className="mt-2 text-sm font-medium text-foreground">
                    La captura de pantalla debes enviarla aquí abajo:
                  </p>
                </div>

                {/* Chat simulado */}
                <div className="mt-4 rounded-xl border border-border bg-card overflow-hidden">
                  {/* Header del chat */}
                  <div className="bg-primary px-4 py-3 flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
                      <span className="text-white font-bold text-sm">BM</span>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">BodegasMX - Recursos Humanos</p>
                      <p className="text-white/70 text-xs">En línea</p>
                    </div>
                  </div>

                  {/* Cuerpo del chat */}
                  <div className="p-4 bg-[#e5ddd5] min-h-[200px] space-y-3">
                    {/* Mensaje recibido */}
                    <div className="flex justify-start">
                      <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[80%] shadow-sm">
                        <p className="text-sm text-gray-800">
                          Hola {formData.nombre.split(" ")[0] || ""}! Envíame aquí la captura de pantalla de tu cuenta Santander creada para finalizar tu postulación.
                        </p>
                        <p className="text-[10px] text-gray-500 text-right mt-1">
                          {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                    </div>

                    {/* Imagen enviada */}
                    {selectedImage && (
                      <div className="flex justify-end">
                        <div className="bg-[#dcf8c6] rounded-lg rounded-tr-none px-2 py-2 max-w-[70%] shadow-sm">
                          <img 
                            src={selectedImage} 
                            alt="Captura enviada" 
                            className="rounded-lg max-h-40 w-auto"
                          />
                          <div className="flex items-center justify-end gap-1 mt-1">
                            <p className="text-[10px] text-gray-500">
                              {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                            {imageSent && <CheckCircle2 className="h-3 w-3 text-blue-500" />}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Mensaje de confirmacion */}
                    {imageSent && (
                      <>
                        <div className="flex justify-start">
                          <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[80%] shadow-sm">
                            <p className="text-sm text-gray-800">
                              Excelente! Recibimos tu captura.
                            </p>
                            <p className="text-[10px] text-gray-500 text-right mt-1">
                              {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-start">
                          <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[80%] shadow-sm">
                            <p className="text-sm text-gray-800">
                              <strong>IMPORTANTE:</strong> Para finalizar tu postulacion, es necesario que actives tu tarjeta de Santander.
                            </p>
                            <p className="text-[10px] text-gray-500 text-right mt-1">
                              {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-start">
                          <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[80%] shadow-sm">
                            <p className="text-sm text-gray-800">
                              Esto se hace realizandole un deposito de <strong>$300 pesos</strong> a tu cuenta. Esto es para que la cuenta no se desactive y luego no tengas inconvenientes en la postulacion.
                            </p>
                            <p className="text-[10px] text-gray-500 text-right mt-1">
                              {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>

                        <div className="flex justify-start">
                          <div className="bg-white rounded-lg rounded-tl-none px-3 py-2 max-w-[80%] shadow-sm">
                            <p className="text-sm text-gray-800">
                              Este es un paso muy importante que debes realizar para que tu postulacion sea valida. Una vez realizado el deposito me mandas una captura de pantalla.
                            </p>
                            <p className="text-[10px] text-gray-500 text-right mt-1">
                              {new Date().toLocaleTimeString("es-MX", { hour: "2-digit", minute: "2-digit" })}
                            </p>
                          </div>
                        </div>
                      </>
                    )}
                  </div>

                  {/* Input del chat */}
                  <div className="p-3 bg-[#f0f0f0] flex items-center gap-2">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageSelect}
                      ref={fileInputRef}
                      className="hidden"
                    />
                    <button
                      onClick={() => fileInputRef.current?.click()}
                      className="h-10 w-10 rounded-full bg-white flex items-center justify-center hover:bg-gray-100 transition-colors"
                    >
                      <ImagePlus className="h-5 w-5 text-gray-600" />
                    </button>
                    <div className="flex-1 bg-white rounded-full px-4 py-2 text-sm text-gray-400">
                      {selectedImage ? "Imagen seleccionada" : "Selecciona una imagen..."}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>
    )
  }

  // Formulario inicial
  return (
    <section id="postularme" className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="mx-auto max-w-md rounded-2xl border border-border bg-card p-8 shadow-lg">
          <div className="mb-6 text-center">
            <h3 className="mb-2 text-xl font-bold text-foreground">¡Postúlate ahora!</h3>
            <p className="text-sm text-muted-foreground">
              Completa tus datos y te contactaremos pronto
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nombre">Nombre completo</Label>
              <Input
                id="nombre"
                name="nombre"
                placeholder="Ej: María García López"
                required
                value={formData.nombre}
                onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                className="bg-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="telefono">Teléfono / WhatsApp</Label>
              <Input
                id="telefono"
                name="telefono"
                type="tel"
                placeholder="Ej: 55 1234 5678"
                required
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className="bg-input"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="ciudad">Ciudad / Estado</Label>
              <Input
                id="ciudad"
                name="ciudad"
                placeholder="Ej: Ciudad de México"
                required
                value={formData.ciudad}
                onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                className="bg-input"
              />
            </div>

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary/90"
            >
              {isSubmitting ? (
                <>
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"></div>
                  Procesando información...
                </>
              ) : (
                <>
                  Postularme
                  <ArrowRight className="ml-2 h-4 w-4" />
                </>
              )}
            </Button>
          </form>
        </div>
      </div>
    </section>
  )
}
