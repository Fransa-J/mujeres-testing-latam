'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import { Send, CheckCircle } from 'lucide-react'

// URL de la aplicación web de Google Apps Script. La URL es un endpoint público
// (sin datos sensibles); la protección real contra spam es la clave secreta.
const SURVEY_URL =
  process.env.NEXT_PUBLIC_SURVEY_URL ||
  'https://script.google.com/macros/s/AKfycbwZkWV5qx-PIoF_CtkUWhIFRlxbu6o0DaSaDWlwdjgXxlBLwd0Id5qxYQelCjLZx7W7/exec'
// Clave compartida anti-spam: debe coincidir con la del script de Apps Script.
const SURVEY_TOKEN = process.env.NEXT_PUBLIC_SURVEY_TOKEN

type Question = {
  id: string
  col: string // encabezado de columna en la hoja
  label: string
  help?: string
  type: 'single' | 'multiple' | 'text' | 'select'
  options?: string[]
  required?: boolean
}

const PAISES = [
  'Argentina', 'Bolivia', 'Brasil', 'Chile', 'Colombia', 'Costa Rica', 'Cuba', 'Ecuador',
  'El Salvador', 'España', 'Guatemala', 'Honduras', 'México', 'Nicaragua', 'Panamá', 'Paraguay',
  'Perú', 'Puerto Rico', 'República Dominicana', 'Uruguay', 'Venezuela', 'Otro',
]

const questions: Question[] = [
  {
    id: 'pais',
    col: 'País',
    label: '¿Desde qué país nos respondes?',
    type: 'select',
    required: true,
    options: PAISES,
  },
  {
    id: 'momento',
    col: 'Momento en testing',
    label: 'Para conocerte mejor 💛, ¿en qué momento estás en el mundo del testing?',
    type: 'single',
    required: true,
    options: [
      'Estoy empezando / estudiando',
      'Menos de 1 año',
      '1 a 3 años',
      '3 a 7 años',
      'Más de 7 años',
      'Lidero equipos de QA',
    ],
  },
  {
    id: 'usa',
    col: '¿Usa IA en su día laboral?',
    label: '¿Usas Inteligencia Artificial en tu día a día laboral?',
    type: 'single',
    required: true,
    options: ['Sí, casi a diario', 'Sí, de vez en cuando', 'Casi nunca', 'Todavía no, pero me gustaría'],
  },
  {
    id: 'para_que',
    col: '¿Para qué la usa?',
    label: '¿Para qué la usas (o para qué te gustaría usarla)?',
    help: 'Puedes marcar varias.',
    type: 'multiple',
    options: [
      'Generar o diseñar casos de prueba',
      'Automatizar pruebas',
      'Analizar bugs, logs o resultados',
      'Crear datos de prueba',
      'Documentar',
      'Redactar o resumir textos',
      'Aprender / estudiar',
      'Aún no la uso',
    ],
  },
  {
    id: 'herramientas',
    col: 'Herramientas que usa/conoce',
    label: '¿Qué herramientas de IA usas o conoces más?',
    help: 'Puedes nombrar varias (ej. ChatGPT, Claude, Copilot, Gemini…).',
    type: 'text',
  },
  {
    id: 'como_siente',
    col: '¿Cómo la hace sentir?',
    label: 'Cuando piensas en la IA en tu trabajo, ¿cómo te hace sentir?',
    help: 'Elige las que apliquen.',
    type: 'multiple',
    options: ['Entusiasmada', 'Curiosa', 'Tranquila / neutral', 'Insegura', 'Abrumada', 'Con miedo a quedar atrás'],
  },
  {
    id: 'miedos',
    col: 'Miedos / incertidumbres',
    label: '¿Qué miedos o incertidumbres te genera la IA?',
    help: 'Cuéntanos con tus palabras, con toda confianza 💛.',
    type: 'text',
  },
  {
    id: 'rol',
    col: '¿Cambia su rol?',
    label: '¿Sientes que la IA está cambiando (o cambiará) tu rol como tester?',
    type: 'single',
    options: ['Ya lo está cambiando', 'Creo que lo hará pronto', 'No lo tengo claro', 'No creo que me afecte'],
  },
  {
    id: 'aprender',
    col: '¿Qué le gustaría aprender?',
    label: '¿Qué te gustaría aprender sobre IA aplicada al testing?',
    type: 'text',
  },
  {
    id: 'acompanamiento',
    col: '¿Cómo acompañarla?',
    label: '¿Cómo te gustaría que Mujeres Testing Latam te acompañe en esto?',
    help: 'Puedes marcar varias.',
    type: 'multiple',
    options: [
      'Talleres prácticos',
      'Guías y artículos',
      'Mentorías',
      'Espacios para compartir dudas',
      'Charlas con expertas',
      'Otro',
    ],
  },
]

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function SurveyIA() {
  const [status, setStatus] = useState<Status>('idle')
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
    if (!SURVEY_URL) {
      setStatus('error')
      return
    }
    setStatus('sending')
    const payload: Record<string, string> = {}
    if (SURVEY_TOKEN) payload._token = SURVEY_TOKEN
    questions.forEach((q) => {
      const v = answers[q.id]
      payload[q.col] = Array.isArray(v) ? v.join('; ') : v || ''
    })
    try {
      await fetch(SURVEY_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(payload),
      })
      track('survey_submit', { survey: 'ia' })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className="flex flex-col items-center justify-center p-12 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 text-center gap-4">
        <CheckCircle size={44} className="text-[#C8006A]" />
        <h3 className="font-medium text-xl">¡Gracias por responder! 💛</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">
          Tu voz nos ayuda a entender cómo vivimos la IA en el testing y a crear mejores espacios para
          crecer juntas.
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-8">
      {questions.map((q, i) => (
        <div key={q.id} className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6">
          <label className="block font-medium mb-1">
            <span className="text-[#C8006A] mr-1">{i + 1}.</span> {q.label}
            {q.required && <span className="text-[#C8006A]"> *</span>}
          </label>
          {q.help && <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-3">{q.help}</p>}

          {q.type === 'text' && (
            <textarea
              rows={3}
              required={q.required}
              value={(answers[q.id] as string) || ''}
              onChange={(e) => setText(q.id, e.target.value)}
              className="mt-2 w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors resize-none"
              placeholder="Escribe tu respuesta…"
            />
          )}

          {q.type === 'select' && (
            <select
              required={q.required}
              value={(answers[q.id] as string) || ''}
              onChange={(e) => setSingle(q.id, e.target.value)}
              className="mt-2 w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors"
            >
              <option value="" disabled>
                Selecciona tu país…
              </option>
              {q.options!.map((opt) => (
                <option key={opt} value={opt}>
                  {opt}
                </option>
              ))}
            </select>
          )}

          {q.type === 'single' && (
            <div className="mt-3 flex flex-col gap-2">
              {q.options!.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-[#C8006A]/40 transition-colors"
                >
                  <input
                    type="radio"
                    name={q.id}
                    value={opt}
                    required={q.required}
                    checked={answers[q.id] === opt}
                    onChange={() => setSingle(q.id, opt)}
                    className="accent-[#C8006A]"
                  />
                  {opt}
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
                    key={opt}
                    className="flex items-center gap-2.5 text-sm px-3 py-2 rounded-lg border border-zinc-200 dark:border-zinc-800 cursor-pointer hover:border-[#C8006A]/40 transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={cur.includes(opt)}
                      onChange={() => toggleMulti(q.id, opt)}
                      className="accent-[#C8006A]"
                    />
                    {opt}
                  </label>
                )
              })}
            </div>
          )}
        </div>
      ))}

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="self-start flex items-center gap-2 px-6 py-3 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors disabled:opacity-60"
        >
          <Send size={14} /> {status === 'sending' ? 'Enviando…' : 'Enviar respuestas'}
        </button>
        {status === 'error' && (
          <p className="text-sm text-red-500">
            No se pudo enviar. Inténtalo de nuevo en un momento.
          </p>
        )}
      </div>
    </form>
  )
}
