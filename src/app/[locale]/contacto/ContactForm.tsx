'use client'

import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Send, CheckCircle } from 'lucide-react'

export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contacto')
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({ name: '', email: '', country: '', message: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // El mensaje se dirige a la casilla de la comunidad. Se abre el cliente de
    // correo del visitante con el asunto y el cuerpo ya completados.
    const subject = encodeURIComponent(`Contacto web · ${form.name || 'Mujeres Testing Latam'}`)
    const body = encodeURIComponent(
      `Nombre: ${form.name}\n` +
      `Correo: ${form.email}\n` +
      `País: ${form.country || '-'}\n\n` +
      `${form.message}`
    )
    window.location.href = `mailto:mujerestesting@gmail.com?subject=${subject}&body=${body}`
    setSent(true)
  }

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-20">
      <div className="max-w-2xl mb-12">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">Escríbenos</p>
        <h1 className="text-4xl font-medium mb-4">{t('title')}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{t('description')}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-12 items-start">
        <div>
          {sent ? (
            <div className="flex flex-col items-center justify-center p-12 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center gap-4">
              <CheckCircle size={40} className="text-[#C8006A]" />
              <h3 className="font-medium text-lg">¡Mensaje enviado!</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400">Te respondemos a la brevedad. Gracias por escribirnos.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', country: '', message: '' }) }}
                className="text-xs text-[#C8006A] hover:underline mt-2"
              >
                Enviar otro mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">{t('name')} *</label>
                  <input
                    required
                    type="text"
                    value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-zinc-500 dark:text-zinc-400">{t('country')}</label>
                  <input
                    type="text"
                    value={form.country}
                    onChange={e => setForm(f => ({ ...f, country: e.target.value }))}
                    className="px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors"
                    placeholder="País"
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
                  placeholder="tu@email.com"
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
                  placeholder="¿En qué te podemos ayudar?"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-6 py-3 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors"
              >
                <Send size={14} /> {t('send')}
              </button>
            </form>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
            <h3 className="font-medium mb-2 text-sm">Comunidad activa en LinkedIn</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-4">La conversación principal de la comunidad sucede en LinkedIn. Síguenos para no perderte nada.</p>
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
            <h3 className="font-medium mb-2 text-sm">¿Quieres proponer algo?</h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">Puedes escribirnos para proponer eventos, colaboraciones, artículos para el blog o cualquier iniciativa que sume a la comunidad.</p>
          </div>
        </div>
      </div>
    </div>
  )
}
