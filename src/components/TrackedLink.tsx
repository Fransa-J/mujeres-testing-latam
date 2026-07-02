'use client'

import { track } from '@vercel/analytics'
import type { AnchorHTMLAttributes, ReactNode } from 'react'

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  /** Nombre del evento a registrar en Vercel Analytics (ej. "pdf_download"). */
  event: string
  /** Datos opcionales del evento (ej. { slug: "que-es-testing" }). */
  eventData?: Record<string, string | number | boolean>
  children: ReactNode
}

/**
 * Enlace que registra un evento en Vercel Analytics al hacer clic.
 * Se usa para medir acciones concretas (descargas de PDF, clics a LinkedIn, etc.)
 * sin cambiar el comportamiento normal del enlace.
 */
export default function TrackedLink({ event, eventData, children, ...props }: Props) {
  return (
    <a {...props} onClick={() => track(event, eventData)}>
      {children}
    </a>
  )
}
