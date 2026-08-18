'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { track } from '@vercel/analytics'
import { Send, CheckCircle } from 'lucide-react'

// Clave pública de Web3Forms (se configura en Vercel como variable de entorno).
// Si no está definida, el formulario usa mailto como respaldo.
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contacto')
  const l = locale === 'en' ? 'en' : 'es'
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({ name: '', email: '', country: '', message: '', botcheck: '' })

  const txt = {
    sentTitle: { es: '¡Mensaje enviado!', en: 'Message sent!' },
    sentMsg: {
      es: 'Te respondemos a la brevedad. Gracias por escribirnos.',
      en: 'We’ll get back to you soon. Thanks for writing!',
    },
    another: { es: 'Enviar otro mensaje', en: 'Send another message' },
    sending: { es: 'Enviando…', en: 'Sending…' },
    error: {
      es: 'No se pudo enviar. Inténtalo de nuevo o escríbenos a mujerestesting@gmail.com.',
      en: 'Could not send. Please try again or email mujerestesting@gmail.com.',
    },
    kicker: { es: 'Escríbenos', en: 'Write to us' },
    phName: { es: 'Tu nombre', en: 'Your name' },
    phCountry: { es: 'País', en: 'Country' },
    phEmail: { es: 'tu@email.com', en: 'you@email.com' },
    phMessage: { es: '¿En qué te podemos ayudar?', en: 'How can we help you?' },
    liTitle: { es: 'Comunidad activa en LinkedIn', en: 'Active community on LinkedIn' },
    liDesc: {
      es: 'La conversación principal de la comunidad sucede en LinkedIn. Síguenos para no perderte nada.',
      en: 'The main community conversation happens on LinkedIn. Follow us so you don’t miss anything.',
    },
    proposeTitle: { es: '¿Quieres proponer algo?', en: 'Want to propose something?' },
    proposeDesc: {
      es: 'Puedes escribirnos para proponer eventos, colaboraciones, artículos o cualquier iniciativa que sume a la comunidad.',
      en: 'Write to us to propose events, collaborations, articles or any initiative that adds to the community.',
    },
  }

  const mailtoFallback = () => {
    const subject = encodeURIComponent(`Contacto web · ${form.name || 'Mujeres Testing Latam'}`)
    const body = encodeURIComponent(
      `Nombre: ${form.name}\nCorreo: ${form.email}\nPaís: ${form.country || '-'}\n\n${form.message}`
    )
    window.location.href = `mailto:mujerestesting@gmail.com?subject=${subject}&body=${body}`
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.botcheck) return // honeypot anti-spam
    track('contact_submit')

    // Sin clave configurada: respaldo por mailto (abre el cliente de correo).
    if (!WEB3FORMS_KEY) {
      mailtoFallback()
      setStatus('sent')
      return
    }

    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Contacto web · ${form.name || 'Mujeres Testing Latam'}`,
          from_name: 'Mujeres Testing Latam · Web',
          name: form.name,
          email: form.email,
          pais: form.country || '-',
          message: form.message,
        }),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('sent')
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  const resetForm = () => {
    setStatus('idle')
    setForm({ name: '', email: '', country: '', message: '', botcheck: '' })
  }

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">{txt.kicker[l]}</p>
        <h1 className="text-4xl font-medium mb-4">{t('title')}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{t('description')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          {status === 'sent' ? (
            <div className="flex flex-col items-center justify-center p-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center gap-4">
              <CheckCircle size={40} className="text-[#C8006A]" />
              <h3 className="font-medium text-lg">{txt.sentTitle[l]}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">{txt.sentMsg[l]}</p>
              <button
                onClick={resetForm}
                className="text-xs text-[#C8006A] hover:underline mt-2"
              >
                {txt.another[l]}
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              {/* Honeypot anti-spam (oculto) */}
              <input
                type="text"
                name="botcheck"
                tabIndex={-1}
                autoComplete="off"
                value={form.botcheck}
                onChange={e => setForm(f => ({ ...f, botcheck: e.target.value }))}
                className="hidden"
                aria-hidden="true"
              />
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">{t('name')} *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors"
                    placeholder={txt.phName[l]}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">{t('country')}</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    className="px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors"
                    placeholder={txt.phCountry[l]}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-500 dark:text-zinc-400">{t('email')} *</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors"
                  placeholder={txt.phEmail[l]}
                />
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-zinc-500 dark:text-zinc-400">{t('message')} *</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors resize-none"
                  placeholder={txt.phMessage[l]}
                />
              </div>

              <button
                type="submit"
                disabled={status === 'sending'}
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
              >
                <Send size={14} /> {status === 'sending' ? txt.sending[l] : t('send')}
              </button>

              {status === 'error' && (
                <p className="text-sm text-red-500">{txt.error[l]}</p>
              )}
            </form>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <h3 className="font-medium mb-2 text-sm">{txt.liTitle[l]}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">{txt.liDesc[l]}</p>
            <a
              href="https://www.linkedin.com/company/mujeres-testing-latam/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[#C8006A] hover:underline"
            >
              linkedin.com/company/mujeres-testing-latam →
            </a>
          </div>
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <h3 className="font-medium mb-2 text-sm">{txt.proposeTitle[l]}</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">{txt.proposeDesc[l]}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
