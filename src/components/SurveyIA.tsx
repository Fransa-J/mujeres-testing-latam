'use client'

import { useState } from 'react'
import { track } from '@vercel/analytics'
import { Send, CheckCircle } from 'lucide-react'

// URL de la aplicación web de Google Apps Script. La URL es un endpoint público
// (sin datos sensibles); la protección real contra spam es la clave secreta.
const SURVEY_URL =
  process.env.NEXT_PUBLIC_SURVEY_URL ||
  'https://script.google.com/macros/s/AKfycbwZkWV5qx-PIoF_CtkUWhIFRlxbu6o0DaSaDWlwdjgXxlBLwd0Id5qxYQelCjLZx7W7/exec'
// Clave compartida anti-spam: debe coincidir con la 'var TOKEN' del Apps Script.
const SURVEY_TOKEN = process.env.NEXT_PUBLIC_SURVEY_TOKEN || 'mtl-ia-2026-Kp9xQ7vR'

type Lang = 'es' | 'en'
type Loc = { es: string; en: string }

type Question = {
  id: string
  col: string // encabezado de columna en la hoja (siempre en español, estable)
  label: Loc
  help?: Loc
  type: 'single' | 'multiple' | 'text' | 'select'
  options?: Loc[]
  required?: boolean
}

// Lista completa de países (nombre en español = valor guardado en la hoja;
// nombre en inglés solo para mostrar). El valor almacenado es siempre el español
// para mantener la columna consistente sin importar el idioma del formulario.
const COUNTRIES: Loc[] = [
  { es: 'Afganistán', en: 'Afghanistan' },
  { es: 'Albania', en: 'Albania' },
  { es: 'Alemania', en: 'Germany' },
  { es: 'Andorra', en: 'Andorra' },
  { es: 'Angola', en: 'Angola' },
  { es: 'Antigua y Barbuda', en: 'Antigua and Barbuda' },
  { es: 'Arabia Saudita', en: 'Saudi Arabia' },
  { es: 'Argelia', en: 'Algeria' },
  { es: 'Argentina', en: 'Argentina' },
  { es: 'Armenia', en: 'Armenia' },
  { es: 'Australia', en: 'Australia' },
  { es: 'Austria', en: 'Austria' },
  { es: 'Azerbaiyán', en: 'Azerbaijan' },
  { es: 'Bahamas', en: 'Bahamas' },
  { es: 'Bangladés', en: 'Bangladesh' },
  { es: 'Barbados', en: 'Barbados' },
  { es: 'Baréin', en: 'Bahrain' },
  { es: 'Bélgica', en: 'Belgium' },
  { es: 'Belice', en: 'Belize' },
  { es: 'Benín', en: 'Benin' },
  { es: 'Bielorrusia', en: 'Belarus' },
  { es: 'Birmania (Myanmar)', en: 'Myanmar (Burma)' },
  { es: 'Bolivia', en: 'Bolivia' },
  { es: 'Bosnia y Herzegovina', en: 'Bosnia and Herzegovina' },
  { es: 'Botsuana', en: 'Botswana' },
  { es: 'Brasil', en: 'Brazil' },
  { es: 'Brunéi', en: 'Brunei' },
  { es: 'Bulgaria', en: 'Bulgaria' },
  { es: 'Burkina Faso', en: 'Burkina Faso' },
  { es: 'Burundi', en: 'Burundi' },
  { es: 'Bután', en: 'Bhutan' },
  { es: 'Cabo Verde', en: 'Cabo Verde' },
  { es: 'Camboya', en: 'Cambodia' },
  { es: 'Camerún', en: 'Cameroon' },
  { es: 'Canadá', en: 'Canada' },
  { es: 'Catar', en: 'Qatar' },
  { es: 'Chad', en: 'Chad' },
  { es: 'Chequia (República Checa)', en: 'Czechia (Czech Republic)' },
  { es: 'Chile', en: 'Chile' },
  { es: 'China', en: 'China' },
  { es: 'Chipre', en: 'Cyprus' },
  { es: 'Colombia', en: 'Colombia' },
  { es: 'Comoras', en: 'Comoros' },
  { es: 'Congo', en: 'Congo' },
  { es: 'Congo (Rep. Dem.)', en: 'Congo (DRC)' },
  { es: 'Corea del Norte', en: 'North Korea' },
  { es: 'Corea del Sur', en: 'South Korea' },
  { es: 'Costa de Marfil', en: "Côte d'Ivoire" },
  { es: 'Costa Rica', en: 'Costa Rica' },
  { es: 'Croacia', en: 'Croatia' },
  { es: 'Cuba', en: 'Cuba' },
  { es: 'Dinamarca', en: 'Denmark' },
  { es: 'Dominica', en: 'Dominica' },
  { es: 'Ecuador', en: 'Ecuador' },
  { es: 'Egipto', en: 'Egypt' },
  { es: 'El Salvador', en: 'El Salvador' },
  { es: 'Emiratos Árabes Unidos', en: 'United Arab Emirates' },
  { es: 'Eritrea', en: 'Eritrea' },
  { es: 'Eslovaquia', en: 'Slovakia' },
  { es: 'Eslovenia', en: 'Slovenia' },
  { es: 'España', en: 'Spain' },
  { es: 'Estados Unidos', en: 'United States' },
  { es: 'Estonia', en: 'Estonia' },
  { es: 'Esuatini', en: 'Eswatini' },
  { es: 'Etiopía', en: 'Ethiopia' },
  { es: 'Filipinas', en: 'Philippines' },
  { es: 'Finlandia', en: 'Finland' },
  { es: 'Fiyi', en: 'Fiji' },
  { es: 'Francia', en: 'France' },
  { es: 'Gabón', en: 'Gabon' },
  { es: 'Gambia', en: 'Gambia' },
  { es: 'Georgia', en: 'Georgia' },
  { es: 'Ghana', en: 'Ghana' },
  { es: 'Granada', en: 'Grenada' },
  { es: 'Grecia', en: 'Greece' },
  { es: 'Guatemala', en: 'Guatemala' },
  { es: 'Guinea', en: 'Guinea' },
  { es: 'Guinea-Bisáu', en: 'Guinea-Bissau' },
  { es: 'Guinea Ecuatorial', en: 'Equatorial Guinea' },
  { es: 'Guyana', en: 'Guyana' },
  { es: 'Haití', en: 'Haiti' },
  { es: 'Honduras', en: 'Honduras' },
  { es: 'Hungría', en: 'Hungary' },
  { es: 'India', en: 'India' },
  { es: 'Indonesia', en: 'Indonesia' },
  { es: 'Irak', en: 'Iraq' },
  { es: 'Irán', en: 'Iran' },
  { es: 'Irlanda', en: 'Ireland' },
  { es: 'Islandia', en: 'Iceland' },
  { es: 'Islas Marshall', en: 'Marshall Islands' },
  { es: 'Islas Salomón', en: 'Solomon Islands' },
  { es: 'Israel', en: 'Israel' },
  { es: 'Italia', en: 'Italy' },
  { es: 'Jamaica', en: 'Jamaica' },
  { es: 'Japón', en: 'Japan' },
  { es: 'Jordania', en: 'Jordan' },
  { es: 'Kazajistán', en: 'Kazakhstan' },
  { es: 'Kenia', en: 'Kenya' },
  { es: 'Kirguistán', en: 'Kyrgyzstan' },
  { es: 'Kiribati', en: 'Kiribati' },
  { es: 'Kuwait', en: 'Kuwait' },
  { es: 'Laos', en: 'Laos' },
  { es: 'Lesoto', en: 'Lesotho' },
  { es: 'Letonia', en: 'Latvia' },
  { es: 'Líbano', en: 'Lebanon' },
  { es: 'Liberia', en: 'Liberia' },
  { es: 'Libia', en: 'Libya' },
  { es: 'Liechtenstein', en: 'Liechtenstein' },
  { es: 'Lituania', en: 'Lithuania' },
  { es: 'Luxemburgo', en: 'Luxembourg' },
  { es: 'Macedonia del Norte', en: 'North Macedonia' },
  { es: 'Madagascar', en: 'Madagascar' },
  { es: 'Malasia', en: 'Malaysia' },
  { es: 'Malaui', en: 'Malawi' },
  { es: 'Maldivas', en: 'Maldives' },
  { es: 'Malí', en: 'Mali' },
  { es: 'Malta', en: 'Malta' },
  { es: 'Marruecos', en: 'Morocco' },
  { es: 'Mauricio', en: 'Mauritius' },
  { es: 'Mauritania', en: 'Mauritania' },
  { es: 'México', en: 'Mexico' },
  { es: 'Micronesia', en: 'Micronesia' },
  { es: 'Moldavia', en: 'Moldova' },
  { es: 'Mónaco', en: 'Monaco' },
  { es: 'Mongolia', en: 'Mongolia' },
  { es: 'Montenegro', en: 'Montenegro' },
  { es: 'Mozambique', en: 'Mozambique' },
  { es: 'Namibia', en: 'Namibia' },
  { es: 'Nauru', en: 'Nauru' },
  { es: 'Nepal', en: 'Nepal' },
  { es: 'Nicaragua', en: 'Nicaragua' },
  { es: 'Níger', en: 'Niger' },
  { es: 'Nigeria', en: 'Nigeria' },
  { es: 'Noruega', en: 'Norway' },
  { es: 'Nueva Zelanda', en: 'New Zealand' },
  { es: 'Omán', en: 'Oman' },
  { es: 'Países Bajos', en: 'Netherlands' },
  { es: 'Pakistán', en: 'Pakistan' },
  { es: 'Palaos', en: 'Palau' },
  { es: 'Palestina', en: 'Palestine' },
  { es: 'Panamá', en: 'Panama' },
  { es: 'Papúa Nueva Guinea', en: 'Papua New Guinea' },
  { es: 'Paraguay', en: 'Paraguay' },
  { es: 'Perú', en: 'Peru' },
  { es: 'Polonia', en: 'Poland' },
  { es: 'Portugal', en: 'Portugal' },
  { es: 'Reino Unido', en: 'United Kingdom' },
  { es: 'República Centroafricana', en: 'Central African Republic' },
  { es: 'República Dominicana', en: 'Dominican Republic' },
  { es: 'Ruanda', en: 'Rwanda' },
  { es: 'Rumanía', en: 'Romania' },
  { es: 'Rusia', en: 'Russia' },
  { es: 'Samoa', en: 'Samoa' },
  { es: 'San Cristóbal y Nieves', en: 'Saint Kitts and Nevis' },
  { es: 'San Marino', en: 'San Marino' },
  { es: 'San Vicente y las Granadinas', en: 'Saint Vincent and the Grenadines' },
  { es: 'Santa Lucía', en: 'Saint Lucia' },
  { es: 'Santo Tomé y Príncipe', en: 'Sao Tome and Principe' },
  { es: 'Senegal', en: 'Senegal' },
  { es: 'Serbia', en: 'Serbia' },
  { es: 'Seychelles', en: 'Seychelles' },
  { es: 'Sierra Leona', en: 'Sierra Leone' },
  { es: 'Singapur', en: 'Singapore' },
  { es: 'Siria', en: 'Syria' },
  { es: 'Somalia', en: 'Somalia' },
  { es: 'Sri Lanka', en: 'Sri Lanka' },
  { es: 'Sudáfrica', en: 'South Africa' },
  { es: 'Sudán', en: 'Sudan' },
  { es: 'Sudán del Sur', en: 'South Sudan' },
  { es: 'Suecia', en: 'Sweden' },
  { es: 'Suiza', en: 'Switzerland' },
  { es: 'Surinam', en: 'Suriname' },
  { es: 'Tailandia', en: 'Thailand' },
  { es: 'Tanzania', en: 'Tanzania' },
  { es: 'Tayikistán', en: 'Tajikistan' },
  { es: 'Timor Oriental', en: 'Timor-Leste' },
  { es: 'Togo', en: 'Togo' },
  { es: 'Tonga', en: 'Tonga' },
  { es: 'Trinidad y Tobago', en: 'Trinidad and Tobago' },
  { es: 'Túnez', en: 'Tunisia' },
  { es: 'Turkmenistán', en: 'Turkmenistan' },
  { es: 'Turquía', en: 'Turkey' },
  { es: 'Tuvalu', en: 'Tuvalu' },
  { es: 'Ucrania', en: 'Ukraine' },
  { es: 'Uganda', en: 'Uganda' },
  { es: 'Uruguay', en: 'Uruguay' },
  { es: 'Uzbekistán', en: 'Uzbekistan' },
  { es: 'Vanuatu', en: 'Vanuatu' },
  { es: 'Vaticano', en: 'Vatican City' },
  { es: 'Venezuela', en: 'Venezuela' },
  { es: 'Vietnam', en: 'Vietnam' },
  { es: 'Yemen', en: 'Yemen' },
  { es: 'Yibuti', en: 'Djibouti' },
  { es: 'Zambia', en: 'Zambia' },
  { es: 'Zimbabue', en: 'Zimbabwe' },
]

const questions: Question[] = [
  {
    id: 'pais',
    col: 'País',
    label: { es: '¿Desde qué país nos respondes?', en: 'Which country are you answering from?' },
    type: 'select',
    required: true,
    options: COUNTRIES,
  },
  {
    id: 'genero',
    col: 'Género',
    label: { es: '¿Con qué género te identificas?', en: 'Which gender do you identify with?' },
    type: 'single',
    required: true,
    options: [
      { es: 'Femenino', en: 'Female' },
      { es: 'Masculino', en: 'Male' },
      { es: 'Otro', en: 'Other' },
    ],
  },
  {
    id: 'momento',
    col: 'Momento en testing',
    label: {
      es: 'Para conocerte mejor, ¿en qué momento estás en el mundo del testing?',
      en: 'To get to know you better, where are you on your testing journey?',
    },
    type: 'single',
    required: true,
    options: [
      { es: 'Estoy empezando / estudiando', en: 'Just starting / studying' },
      { es: 'Menos de 1 año', en: 'Less than 1 year' },
      { es: '1 a 3 años', en: '1 to 3 years' },
      { es: '3 a 7 años', en: '3 to 7 years' },
      { es: 'Más de 7 años', en: 'More than 7 years' },
      { es: 'Lidero equipos de QA', en: 'I lead QA teams' },
    ],
  },
  {
    id: 'usa',
    col: '¿Usa IA en su día laboral?',
    label: {
      es: '¿Usas Inteligencia Artificial en tu día a día laboral?',
      en: 'Do you use Artificial Intelligence in your daily work?',
    },
    type: 'single',
    required: true,
    options: [
      { es: 'Sí, casi a diario', en: 'Yes, almost every day' },
      { es: 'Sí, de vez en cuando', en: 'Yes, from time to time' },
      { es: 'Casi nunca', en: 'Almost never' },
      { es: 'Todavía no, pero me gustaría', en: 'Not yet, but I would like to' },
    ],
  },
  {
    id: 'para_que',
    col: '¿Para qué la usa?',
    label: {
      es: '¿Para qué la usas (o para qué te gustaría usarla)?',
      en: 'What do you use it for (or would like to use it for)?',
    },
    help: { es: 'Puedes marcar varias.', en: 'You can select several.' },
    type: 'multiple',
    options: [
      { es: 'Generar o diseñar casos de prueba', en: 'Generate or design test cases' },
      { es: 'Automatizar pruebas', en: 'Automate tests' },
      { es: 'Analizar bugs, logs o resultados', en: 'Analyze bugs, logs or results' },
      { es: 'Crear datos de prueba', en: 'Create test data' },
      { es: 'Documentar', en: 'Documentation' },
      { es: 'Redactar o resumir textos', en: 'Write or summarize text' },
      { es: 'Aprender / estudiar', en: 'Learn / study' },
      { es: 'Aún no la uso', en: "I don't use it yet" },
    ],
  },
  {
    id: 'herramientas',
    col: 'Herramientas que usa/conoce',
    label: {
      es: '¿Qué herramientas de IA usas o conoces más?',
      en: 'Which AI tools do you use or know best?',
    },
    help: {
      es: 'Puedes nombrar varias (ej. ChatGPT, Claude, Copilot, Gemini...).',
      en: 'You can name several (e.g. ChatGPT, Claude, Copilot, Gemini...).',
    },
    type: 'text',
  },
  {
    id: 'como_siente',
    col: '¿Cómo la hace sentir?',
    label: {
      es: 'Cuando piensas en la IA en tu trabajo, ¿cómo te hace sentir?',
      en: 'When you think about AI in your work, how does it make you feel?',
    },
    help: { es: 'Elige las que apliquen.', en: 'Choose all that apply.' },
    type: 'multiple',
    options: [
      { es: 'Entusiasmada', en: 'Excited' },
      { es: 'Curiosa', en: 'Curious' },
      { es: 'Tranquila / neutral', en: 'Calm / neutral' },
      { es: 'Insegura', en: 'Unsure' },
      { es: 'Abrumada', en: 'Overwhelmed' },
      { es: 'Con miedo a quedar atrás', en: 'Afraid of falling behind' },
    ],
  },
  {
    id: 'miedos',
    col: 'Miedos / incertidumbres',
    label: {
      es: '¿Qué miedos o incertidumbres te genera la IA?',
      en: 'What fears or uncertainties does AI raise for you?',
    },
    help: {
      es: 'Cuéntanos con tus palabras, con toda confianza.',
      en: 'Tell us in your own words, with full confidence.',
    },
    type: 'text',
  },
  {
    id: 'rol',
    col: '¿Cambia su rol?',
    label: {
      es: '¿Sientes que la IA está cambiando (o cambiará) tu rol como tester?',
      en: 'Do you feel AI is changing (or will change) your role as a tester?',
    },
    type: 'single',
    options: [
      { es: 'Ya lo está cambiando', en: 'It is already changing it' },
      { es: 'Creo que lo hará pronto', en: 'I think it will soon' },
      { es: 'No lo tengo claro', en: "I'm not sure" },
      { es: 'No creo que me afecte', en: "I don't think it will affect me" },
    ],
  },
  {
    id: 'aprender',
    col: '¿Qué le gustaría aprender?',
    label: {
      es: '¿Qué te gustaría aprender sobre IA aplicada al testing?',
      en: 'What would you like to learn about AI applied to testing?',
    },
    type: 'text',
  },
  {
    id: 'acompanamiento',
    col: '¿Cómo acompañarla?',
    label: {
      es: '¿Cómo te gustaría que Mujeres Testing Latam te acompañe en esto?',
      en: 'How would you like Mujeres Testing Latam to support you in this?',
    },
    help: { es: 'Puedes marcar varias.', en: 'You can select several.' },
    type: 'multiple',
    options: [
      { es: 'Talleres prácticos', en: 'Hands-on workshops' },
      { es: 'Guías y artículos', en: 'Guides and articles' },
      { es: 'Mentorías', en: 'Mentoring' },
      { es: 'Espacios para compartir dudas', en: 'Spaces to share questions' },
      { es: 'Charlas con expertas', en: 'Talks with experts' },
      { es: 'Otro', en: 'Other' },
    ],
  },
]

const UI = {
  answerPlaceholder: { es: 'Escribe tu respuesta...', en: 'Type your answer...' },
  countryPlaceholder: { es: 'Selecciona tu país...', en: 'Select your country...' },
  sending: { es: 'Enviando...', en: 'Sending...' },
  submit: { es: 'Enviar respuestas', en: 'Submit answers' },
  error: {
    es: 'No se pudo enviar. Inténtalo de nuevo en un momento.',
    en: 'Could not send. Please try again in a moment.',
  },
  thanksTitle: { es: '¡Gracias por responder!', en: 'Thank you for answering!' },
  thanksBody: {
    es: 'Tu voz nos ayuda a entender cómo vivimos la IA en el testing y a crear mejores espacios para crecer juntas.',
    en: 'Your voice helps us understand how we experience AI in testing and to create better spaces to grow together.',
  },
}

type Status = 'idle' | 'sending' | 'sent' | 'error'

export default function SurveyIA({ locale = 'es' }: { locale?: string }) {
  const l: Lang = locale === 'en' ? 'en' : 'es'
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
        <h3 className="font-medium text-xl">{UI.thanksTitle[l]}</h3>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-md">{UI.thanksBody[l]}</p>
      </div>
    )
  }

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
              className="mt-2 w-full px-3.5 py-2.5 text-sm rounded-lg border border-zinc-200 dark:border-zinc-700 bg-white dark:bg-zinc-900 focus:outline-none focus:border-[#C8006A] transition-colors resize-none"
              placeholder={UI.answerPlaceholder[l]}
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
                {UI.countryPlaceholder[l]}
              </option>
              {q.options!.map((opt) => (
                <option key={opt.es} value={opt.es}>
                  {opt[l]}
                </option>
              ))}
            </select>
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

      <div className="flex flex-col gap-3">
        <button
          type="submit"
          disabled={status === 'sending'}
          className="self-start flex items-center gap-2 px-6 py-3 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors disabled:opacity-60"
        >
          <Send size={14} /> {status === 'sending' ? UI.sending[l] : UI.submit[l]}
        </button>
        {status === 'error' && <p className="text-sm text-red-500">{UI.error[l]}</p>}
      </div>
    </form>
  )
}
