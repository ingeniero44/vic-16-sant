"use client"

import { useEffect, useState } from "react"
import { ExternalLink, Copy, Check, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"

/**
 * Detecta si la página se está abriendo dentro del navegador interno
 * de una red social (Facebook, Instagram, TikTok, etc.) y, en ese caso,
 * intenta abrirla en el navegador externo del dispositivo.
 *
 * - En Android: usa un "intent" que abre Chrome automáticamente.
 * - En iOS: no es posible forzarlo, así que muestra instrucciones claras.
 */

// Lista de identificadores que aparecen en el user agent de navegadores internos
const IN_APP_BROWSER_KEYWORDS = [
  "FBAN", // Facebook App
  "FBAV", // Facebook App
  "FB_IAB", // Facebook in-app browser
  "Instagram",
  "Messenger",
  "Line",
  "Twitter",
  "TikTok",
  "musical_ly", // TikTok
  "Snapchat",
  "LinkedInApp",
  "Pinterest",
  "WhatsApp",
  "WeChat",
  "MicroMessenger",
]

function detectInAppBrowser(userAgent: string): boolean {
  return IN_APP_BROWSER_KEYWORDS.some((keyword) =>
    userAgent.toLowerCase().includes(keyword.toLowerCase()),
  )
}

export function InAppBrowserRedirect() {
  const [isInApp, setIsInApp] = useState(false)
  const [isIOS, setIsIOS] = useState(false)
  const [copied, setCopied] = useState(false)
  const [currentUrl, setCurrentUrl] = useState("")

  useEffect(() => {
    const ua = navigator.userAgent || navigator.vendor || ""
    const url = window.location.href
    setCurrentUrl(url)

    const inApp = detectInAppBrowser(ua)
    const ios = /iPhone|iPad|iPod/i.test(ua)
    const android = /Android/i.test(ua)

    if (!inApp) return

    setIsInApp(true)
    setIsIOS(ios)

    // En Android podemos forzar la apertura en Chrome con un "intent".
    if (android) {
      const cleanUrl = url.replace(/^https?:\/\//, "")
      // intent:// abre Chrome y, si no está, cae al navegador por defecto.
      const intentUrl = `intent://${cleanUrl}#Intent;scheme=https;package=com.android.chrome;end`
      // Pequeño retraso para asegurar que el componente ya montó.
      window.location.href = intentUrl
    }
  }, [])

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Si falla el portapapeles, no hacemos nada crítico.
    }
  }

  if (!isInApp) return null

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-background/95 p-6 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 text-card-foreground shadow-lg">
        <div className="mb-4 flex items-center justify-center">
          <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
            <ExternalLink className="h-7 w-7 text-primary" aria-hidden="true" />
          </div>
        </div>

        <h2 className="mb-2 text-balance text-center text-xl font-semibold leading-tight">
          Abre esta página en tu navegador
        </h2>

        <p className="mb-6 text-pretty text-center text-sm leading-relaxed text-muted-foreground">
          Para una mejor experiencia y seguridad, abre este sitio en Chrome o
          Safari en lugar del navegador de la app.
        </p>

        {isIOS ? (
          <div className="mb-6 space-y-3 rounded-xl bg-muted p-4 text-sm leading-relaxed">
            <p className="font-medium">Pasos para iPhone:</p>
            <ol className="list-decimal space-y-1 pl-5 text-muted-foreground">
              <li>
                Toca el botón de menú{" "}
                <MoreVertical className="inline h-4 w-4 align-text-bottom" aria-hidden="true" />{" "}
                en la esquina de la pantalla.
              </li>
              <li>{'Selecciona "Abrir en Safari" o "Abrir en navegador".'}</li>
            </ol>
          </div>
        ) : (
          <p className="mb-6 text-center text-sm leading-relaxed text-muted-foreground">
            {'Si no se abrió automáticamente, toca el menú '}
            <MoreVertical className="inline h-4 w-4 align-text-bottom" aria-hidden="true" />
            {' y elige "Abrir en navegador".'}
          </p>
        )}

        <Button onClick={handleCopy} variant="outline" className="w-full bg-transparent">
          {copied ? (
            <>
              <Check className="mr-2 h-4 w-4" aria-hidden="true" />
              Enlace copiado
            </>
          ) : (
            <>
              <Copy className="mr-2 h-4 w-4" aria-hidden="true" />
              Copiar enlace
            </>
          )}
        </Button>

        <p className="mt-3 text-center text-xs text-muted-foreground">
          Copia el enlace y pégalo en Chrome o Safari.
        </p>
      </div>
    </div>
  )
}
