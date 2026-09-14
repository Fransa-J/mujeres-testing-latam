'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import { Send, CheckCircle } from 'lucide-react'

// URL de la aplicación web de Google Apps Script para la junta de Chile.
// Debe apuntar a una hoja distinta a la de la encuesta para no mezclar datos.
const JUNTA_URL =
  process.env.NEXT_PUBLIC_JUNTA_URL ||
  'https://script.google.com/macros/s/AKfycbwpWrnbt4dl5RimX4OhUcDYQnC2WvChOYudey2z1J6DGq6XQBjKYSIthjgSWEtVxrXU/exec'
// Clave compartida anti-spam: debe coincidir con la 'var TOKEN' del Apps Script.
const JUNTA_TOKEN = process.env.NEXT_PUBLIC_JUNTA_TOKEN || 'mtl-junta-cl-2026-Qw7zR3'

type Lang = 'es' | 'en'
type Loc = { es: string; en: string }

type Question = {
  id: string
  col: string // encabezado de columna en la hoja (siempre en español, estable)
  label: Loc
  help?: Loc
  type: 'single' | 'multiple' | 'text' | 'email'
  options?: Loc[]
  required?: boolean
}

const questions: Question[] = [
  {
    id: 'origen',
    col: 'De dónde es',
    label: { es: '¿De dónde eres?', en: 'Where are you from?' },
    help: { es: 'Ciudad y país.', en: 'City and country.' },
    type: 'text',
    required: true,
  },
  {
    id: 'anios',
    col: 'Años en testing',
    label: { es: '¿Cuántos años llevas en el área de testing?', en: 'How many years have you been in testing?' },
    type: 'single',
    required: true,
    options: [
      { es: 'Estoy empezando / estudiando', en: 'Just starting / studying' },
      { es: 'Menos de 1 año', en: 'Less than 1 year' },
      { es: '1 a 3 años', en: '1 to 3 years' },
      { es: '3 a 7 años', en: '3 to 7 years' },
      { es: 'Más de 7 años', en: 'More than 7 years' },
    ],
  },
  {
    id: 'participar',
    col: '¿Participaría presencial en Santiago?',
    label: {
      es: '¿Te gustaría participar de un encuentro presencial en Santiago de Chile?',
      en: 'Would you like to join an in-person meetup in Santiago, Chile?',
    },
    type: 'single',
    required: true,
    options: [
      { es: 'Sí, me encantaría', en: 'Yes, I would love to' },
      { es: 'Tal vez, depende de la fecha', en: 'Maybe, depending on the date' },
      { es: 'No puedo asistir presencialmente', en: "I can't attend in person" },
    ],
  },
  {
    id: 'disponibilidad',
    col: 'Disponibilidad',
    label: { es: '¿Qué días o momentos te acomodan más?', en: 'Which days or times work best for you?' },
    help: { es: 'Puedes marcar varias. Nos ayuda a coordinar.', en: 'You can select several. It helps us coordinate.' },
    type: 'multiple',
    options: [
      { es: 'Días de semana en la tarde/noche', en: 'Weekdays evening/night' },
      { es: 'Viernes en la tarde/noche', en: 'Friday evening/night' },
      { es: 'Sábado', en: 'Saturday' },
      { es: 'Domingo', en: 'Sunday' },
    ],
  },
  {
    id: 'temas',
    col: 'Temas a abordar',
    label: { es: '¿Qué temas te gustaría abordar?', en: 'What topics would you like to explore?' },
    type: 'text',
    required: true,
  },
  {
    id: 'motivacion',
    col: 'Qué la motiva',
    label: { es: '¿Qué te motiva a participar?', en: 'What motivates you to take part?' },
    type: 'text',
    required: true,
  },
  {
    id: 'voluntaria',
    col: '¿Interesada en ser voluntaria?',
    label: {
      es: '¿Estás interesada en ser voluntaria de la comunidad?',
      en: 'Are you interested in volunteering for the community?',
    },
    type: 'single',
    required: true,
    options: [
      { es: 'Sí, cuéntenme más', en: 'Yes, tell me more' },
      { es: 'Tal vez más adelante', en: 'Maybe later' },
      { es: 'Por ahora no', en: 'Not for now' },
    ],
  },
  {
    id: 'correo',
    col: 'Correo',
    label: { es: 'Déjanos tu correo por si quieres ser contactada para la junta', en: 'Leave your email if you want to be contacted about the meetup' },
    help: { es: 'Opcional. Solo lo usaremos para contactarte sobre la junta.', en: 'Optional. We will only use it to contact you about the meetup.' },
    type: 'email',
  },
]

const UI = {
  answerPlaceholder: { es: 'Escribe tu respuesta...', en: 'Type your answer...' },
  emailPlaceholder: { es: 'tu@correo.com', en: 'you@email.com' },
  sending: { es: 'Enviando...', en: 'Sending...' },
  submit: { es: 'Enviar', en: 'Submit' },
  error: {
    es: 'No se pudo enviar. Inténtalo de nuevo en un momento.',
    en: 'Could not send. Please try again in a moment.',
  },
  privacy: {
    es: 'Tus respuestas se usan solo para medir el interés y organizar la junta. Si dejas tu correo, lo usaremos únicamente para contactarte sobre este encuentro; no lo compartimos con terceros.',
    en: 'Your answers are used only to gauge interest and organize the meetup. If you leave your email, we will only use it to contact you about this event; we do not share it with third parties.',
  },
  consent: {
    es: 'He leído cómo se usarán mis respuestas y acepto participar.',
    en: 'I have read how my answers will be used and I agree to participate.',
  },
  thanksTitle: { es: '¡Gracias por responder!', en: 'Thank you for answering!' },
  thanksBody: {
    es: 'Tu interés nos ayuda a hacer realidad la primera junta de mujeres en testing en Chile. Si dejaste tu correo, te contactaremos con los detalles. 💛',
    en: 'Your interest helps us make the first women-in-testing meetup in Chile happen. If you left your email, we will reach out with the details. 💛',
  },
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function JuntaChile({ locale = 'es' }: { locale?: string }) {
  const l: Lang = locale === 'en' ? 'en' : 'es'
  const [status, setStatus] = useState<Status>('idle')
  const [consent, setConsent] = useState(false)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})

  const setSingle = (id: string, value: string) => setAnswers((a) => ({ ...a, [id]: value }))
  const setText = (id: string, value: string) => setAnswers((a) => ({ ...a, [id]: value }))
  const toggleMulti = (id: string, value: string) =>
    setAnswers((a) => {
      const cur = Array.isArray(a[id]) ? (a[id] as string[]) : []
      return { ...a, [id]: cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value] }
    })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('sending')
    const payload: Record<string, string> = {}
    if (JUNTA_TOKEN) payload._token = JUNTA_TOKEN
    payload['Consentimiento'] = consent ? 'Aceptado' : ''
    questions.forEach((q) => {
      const v = answers[q.id]
      payload[q.col] = Array.isArray(v) ? v.join('; ') : v || ''
    })
    try {
      await fetch(JUNTA_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      track('junta_chile_signup')
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center gap-4">
        <CheckCircle size={44} className="text-[#C8006A]" />
        <h3 className="font-medium text-xl">{UI.thanksTitle[l]}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">{UI.thanksBody[l]}</p>
      </div>
    )
  }

  const inputCls =
    'mt-2 w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors'

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {questions.map((q, i) => (
        <div key={q.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <label className="block font-medium mb-1">
            <span className="text-[#C8006A] mr-1">{i + 1}.</span> {q.label[l]}
            {q.required && <span className="text-[#C8006A]"> *</span>}
          </label>
          {q.help && <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">{q.help[l]}</p>}

          {q.type === 'text' && (
            <textarea
              rows={3}
              required={q.required}
              value={(answers[q.id] as string) || ''}
              onChange={(e) => setText(q.id, e.target.value)}
              className={`${inputCls} resize-none`}
              placeholder={UI.answerPlaceholder[l]}
            />
          )}

          {q.type === 'email' && (
            <input
              type="email"
              required={q.required}
              value={(answers[q.id] as string) || ''}
              onChange={(e) => setText(q.id, e.target.value)}
              className={inputCls}
              placeholder={UI.emailPlaceholder[l]}
            />
          )}

          {q.type === 'single' && (
            <div className="mt-3 flex flex-col gap-2">
              {q.options!.map((opt) => (
                <label
                  key={opt.es}
                  className="flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-[#C8006A]/40 transition-colors"
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt.es}
                    required={q.required}
                    checked={answers[q.id] === opt.es}
                    onChange={() => setSingle(q.id, opt.es)}
                    className="accent-[#C8006A]"
                  />
                  {opt[l]}
                </label>
              ))}
            </div>
          )}

          {q.type === 'multiple' && (
            <div className="mt-3 flex flex-col gap-2">
              {q.options!.map((opt) => {
                const cur = Array.isArray(answers[q.id]) ? (answers[q.id] as string[]) : []
                return (
                  <label
                    key={opt.es}
                    className="flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-[#C8006A]/40 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={cur.includes(opt.es)}
                      onChange={() => toggleMulti(q.id, opt.es)}
                      className="accent-[#C8006A]"
                    />
                    {opt[l]}
                  </label>
                )
              })}
            </div>
          )}
        </div>
      ))}

      <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-900/50 p-5">
        <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed mb-4">{UI.privacy[l]}</p>
        <label className="flex items-start gap-2.5 text-sm cursor-pointer">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 accent-[#C8006A]"
          />
          <span>
            {UI.consent[l]} <span className="text-[#C8006A]">*</span>
          </span>
        </label>
      </div>

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === 'sending' || !consent}
          className="self-start flex items-center gap-2 px-6 py-3 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          <Send size={14} /> {status === 'sending' ? UI.sending[l] : UI.submit[l]}
        </button>
        {status === 'error' && <p className="text-sm text-red-500">{UI.error[l]}</p>}
      </div>
    </form>
  )
}
