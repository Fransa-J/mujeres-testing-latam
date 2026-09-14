'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import { Send, CheckCircle } from 'lucide-react'

// Clave pública de Web3Forms (se configura en Vercel como variable de entorno).
const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY

type Lang = 'es' | 'en'
type Status = 'idle' | 'sending' | 'sent' | 'error'

const txt = {
  sentTitle: { es: '¡Inscripción recibida!', en: 'Registration received!' },
  sentMsg: {
    es: 'Gracias por querer ser parte. Como los cupos son limitados, revisaremos las inscripciones y te escribiremos por correo para confirmarte los detalles. 💛',
    en: 'Thank you for wanting to be part of it. Since spots are limited, we will review registrations and email you to confirm the details. 💛',
  },
  sending: { es: 'Enviando…', en: 'Sending…' },
  error: {
    es: 'No se pudo enviar. Inténtalo de nuevo o escríbenos a mujerestesting@gmail.com.',
    en: 'Could not send. Please try again or email mujerestesting@gmail.com.',
  },
  name: { es: 'Nombre y apellido', en: 'Full name' },
  email: { es: 'Correo', en: 'Email' },
  city: { es: 'Ciudad', en: 'City' },
  experience: { es: 'Tiempo en el mundo del testing', en: 'Time in the testing world' },
  experiencePh: { es: 'Selecciona una opción…', en: 'Select an option…' },
  topic: {
    es: 'Tema de conversación que te gustaría abordar',
    en: 'A conversation topic you would like to explore',
  },
  topicPh: {
    es: '¿Qué te gustaría conversar o compartir con otras testers?',
    en: 'What would you like to talk about or share with other testers?',
  },
  propose: { es: '¿Te gustaría proponer algo? (opcional)', en: 'Would you like to propose something? (optional)' },
  proposePh: {
    es: 'Una actividad, un lugar, una idea… lo que se te ocurra.',
    en: 'An activity, a place, an idea… whatever comes to mind.',
  },
  howKnow: { es: '¿Cómo conociste a Mujeres Testing Latam?', en: 'How did you hear about Mujeres Testing Latam?' },
  howKnowPh: { es: 'LinkedIn, una amiga, un evento…', en: 'LinkedIn, a friend, an event…' },
  linkedin: { es: 'Perfil de LinkedIn (opcional)', en: 'LinkedIn profile (optional)' },
  linkedinPh: { es: 'https://linkedin.com/in/…', en: 'https://linkedin.com/in/…' },
  agree: {
    es: 'Entiendo que este es un espacio seguro y de confianza entre mujeres. Me comprometo a cuidar la privacidad de lo que se comparta y a mantener un trato respetuoso.',
    en: 'I understand this is a safe, trusting space among women. I commit to protecting the privacy of what is shared and to treating everyone with respect.',
  },
  submit: { es: 'Enviar inscripción', en: 'Send registration' },
  required: { es: 'Los campos con * son obligatorios.', en: 'Fields marked with * are required.' },
}

const experienceOptions = [
  { es: 'Estoy empezando / estudiando', en: 'Just starting / studying' },
  { es: 'Menos de 1 año', en: 'Less than 1 year' },
  { es: '1 a 3 años', en: '1 to 3 years' },
  { es: '3 a 7 años', en: '3 to 7 years' },
  { es: 'Más de 7 años', en: 'More than 7 years' },
  { es: 'Lidero equipos de QA', en: 'I lead QA teams' },
]

export default function MeetupForm({ locale }: { locale: string }) {
  const l: Lang = locale === 'en' ? 'en' : 'es'
  const [status, setStatus] = useState<Status>('idle')
  const [form, setForm] = useState({
    name: '',
    email: '',
    city: '',
    experience: '',
    topic: '',
    propose: '',
    howKnow: '',
    linkedin: '',
    agree: false,
    botcheck: '',
  })

  const upd = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (form.botcheck) return // honeypot anti-spam
    if (!WEB3FORMS_KEY) {
      setStatus('error')
      return
    }
    track('meetup_signup')
    setStatus('sending')
    try {
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          subject: `Inscripción · Encuentro presencial MTL · ${form.name}`,
          from_name: 'Mujeres Testing Latam · Inscripciones',
          'Nombre y apellido': form.name,
          Correo: form.email,
          Ciudad: form.city,
          'Tiempo en testing': form.experience,
          'Tema a conversar': form.topic,
          'Propuesta': form.propose || '-',
          'Cómo conoció MTL': form.howKnow || '-',
          LinkedIn: form.linkedin || '-',
          'Acepta acuerdo': form.agree ? 'Sí' : 'No',
        }),
      })
      const data = await res.json()
      setStatus(data.success ? 'sent' : 'error')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center gap-4">
        <CheckCircle size={44} className="text-[#C8006A]" />
        <h3 className="font-medium text-xl">{txt.sentTitle[l]}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">{txt.sentMsg[l]}</p>
      </div>
    )
  }

  const inputCls =
    'px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Honeypot anti-spam (oculto) */}
      <input
        type="text"
        name="botcheck"
        tabIndex={-1}
        autoComplete="off"
        value={form.botcheck}
        onChange={(e) => upd('botcheck', e.target.value)}
        className="hidden"
        aria-hidden="true"
      />

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">{txt.name[l]} *</label>
          <input required type="text" value={form.name} onChange={(e) => upd('name', e.target.value)} className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">{txt.email[l]} *</label>
          <input required type="email" value={form.email} onChange={(e) => upd('email', e.target.value)} className={inputCls} />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">{txt.city[l]} *</label>
          <input required type="text" value={form.city} onChange={(e) => upd('city', e.target.value)} className={inputCls} />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">{txt.experience[l]} *</label>
          <select required value={form.experience} onChange={(e) => upd('experience', e.target.value)} className={inputCls}>
            <option value="" disabled>
              {txt.experiencePh[l]}
            </option>
            {experienceOptions.map((o) => (
              <option key={o.es} value={o.es}>
                {o[l]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-zinc-500 dark:text-zinc-400">{txt.topic[l]} *</label>
        <textarea
          required
          rows={3}
          value={form.topic}
          onChange={(e) => upd('topic', e.target.value)}
          className={`${inputCls} resize-none`}
          placeholder={txt.topicPh[l]}
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-xs text-zinc-500 dark:text-zinc-400">{txt.propose[l]}</label>
        <textarea
          rows={2}
          value={form.propose}
          onChange={(e) => upd('propose', e.target.value)}
          className={`${inputCls} resize-none`}
          placeholder={txt.proposePh[l]}
        />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">{txt.howKnow[l]}</label>
          <input
            type="text"
            value={form.howKnow}
            onChange={(e) => upd('howKnow', e.target.value)}
            className={inputCls}
            placeholder={txt.howKnowPh[l]}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-xs text-zinc-500 dark:text-zinc-400">{txt.linkedin[l]}</label>
          <input
            type="url"
            value={form.linkedin}
            onChange={(e) => upd('linkedin', e.target.value)}
            className={inputCls}
            placeholder={txt.linkedinPh[l]}
          />
        </div>
      </div>

      <label className="flex items-start gap-2.5 text-sm cursor-pointer mt-1 p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50">
        <input
          type="checkbox"
          required
          checked={form.agree}
          onChange={(e) => upd('agree', e.target.checked)}
          className="mt-0.5 accent-[#C8006A]"
        />
        <span className="text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {txt.agree[l]} <span className="text-[#C8006A]">*</span>
        </span>
      </label>

      <button
        type="submit"
        disabled={status === 'sending' || !form.agree}
        className="self-start flex items-center gap-2 px-6 py-3 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        <Send size={14} /> {status === 'sending' ? txt.sending[l] : txt.submit[l]}
      </button>

      <p className="text-xs text-zinc-400">{txt.required[l]}</p>
      {status === 'error' && <p className="text-sm text-red-500">{txt.error[l]}</p>}
    </form>
  )
}
