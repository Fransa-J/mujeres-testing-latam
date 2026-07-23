// Agenda de eventos de testing en Latinoamérica.
// Contenido curado a mano: cada evento es un enlace + metadatos para filtrar
// y decidir; el botón lleva a la inscripción en la fuente original.

export type Locale = 'es' | 'en'

export type Modalidad = 'online' | 'presencial' | 'hibrido'

export interface Evento {
  id: string
  nombre: string
  /** Fecha (inicio) en formato ISO 'YYYY-MM-DD'. */
  fecha: string
  /** Fecha de fin en ISO 'YYYY-MM-DD' para eventos de varios días. Opcional. */
  fechaFin?: string
  /** Hora y zona horaria, ej. '18:00 (GMT-3)'. Opcional. */
  hora?: string
  modalidad: Modalidad
  /** País del evento (para presencial/híbrido). */
  pais?: string
  /** Emoji de bandera del país. */
  bandera?: string
  /** Ciudad del evento (para presencial/híbrido). */
  ciudad?: string
  /** Quién organiza el evento. Opcional. */
  organizador?: string
  /** Enlace para inscribirse / ver el evento. */
  url: string
  /** 'gratis' | 'pago'. */
  precio?: 'gratis' | 'pago'
  /** Etiquetas de clasificación, ej. ['Automation', 'IA']. */
  tags?: string[]
  /** Descripción breve, bilingüe. */
  descripcion?: { es: string; en: string }
}

// ── Eventos reales de testing en Latinoamérica ──────────────────────────────
export const eventos: Evento[] = [
  {
    id: 'hands-on-testing',
    nombre: 'Hands on Testing',
    fecha: '2026-08-12',
    fechaFin: '2026-08-15',
    modalidad: 'presencial',
    pais: 'México',
    bandera: '🇲🇽',
    url: 'https://handsontesting.com/',
    tags: ['Conferencia'],
    descripcion: {
      es: 'Conferencia de testing y calidad de software en México.',
      en: 'Software testing and quality conference in Mexico.',
    },
  },
  {
    id: 'testing-bolivia',
    nombre: 'Testing Bolivia',
    fecha: '2026-08-21',
    modalidad: 'presencial',
    pais: 'Bolivia',
    bandera: '🇧🇴',
    url: 'https://testingbolivia.com/',
    tags: ['Conferencia'],
    descripcion: {
      es: 'Encuentro de la comunidad de testing en Bolivia.',
      en: 'Gathering of the testing community in Bolivia.',
    },
  },
  {
    id: 'testing-chile',
    nombre: 'Testing Day Chile',
    fecha: '2026-08-27',
    fechaFin: '2026-08-28',
    modalidad: 'presencial',
    pais: 'Chile',
    bandera: '🇨🇱',
    url: 'https://www.testingenchile.cl/testing-day-chile/',
    tags: ['Conferencia'],
    descripcion: {
      es: 'Jornada de la comunidad de testing en Chile.',
      en: 'Testing community day in Chile.',
    },
  },
  {
    id: 'testearla',
    nombre: 'Testearla',
    fecha: '2026-09-09',
    fechaFin: '2026-09-10',
    modalidad: 'presencial',
    pais: 'Argentina',
    bandera: '🇦🇷',
    url: 'https://www.testear.la/',
    tags: ['Conferencia'],
    descripcion: {
      es: 'Conferencia de testing en Argentina.',
      en: 'Testing conference in Argentina.',
    },
  },
  {
    id: 'testing-day-peru',
    nombre: 'Testing Day Perú',
    fecha: '2026-09-18',
    fechaFin: '2026-09-19',
    modalidad: 'presencial',
    pais: 'Perú',
    bandera: '🇵🇪',
    url: 'https://testingperu.com/',
    tags: ['Conferencia'],
    descripcion: {
      es: 'Jornada de testing de la comunidad peruana.',
      en: 'Testing day by the Peruvian community.',
    },
  },
  {
    id: 'quality-sense',
    nombre: 'Quality Sense Conf',
    fecha: '2026-10-13',
    modalidad: 'online',
    url: 'https://qualitysenseconf.com/',
    tags: ['Conferencia'],
    descripcion: {
      es: 'Conferencia online sobre calidad de software y testing.',
      en: 'Online conference on software quality and testing.',
    },
  },
  {
    id: 'testing-venezuela',
    nombre: 'Testing Venezuela',
    fecha: '2026-11-24',
    fechaFin: '2026-11-28',
    modalidad: 'presencial',
    pais: 'Venezuela',
    bandera: '🇻🇪',
    url: 'https://testingcapitulovenezuela.club/',
    tags: ['Conferencia'],
    descripcion: {
      es: 'Semana de charlas de la comunidad de testing en Venezuela.',
      en: 'A week of talks by the testing community in Venezuela.',
    },
  },
]

/** Devuelve los eventos ordenados por fecha ascendente (próximos primero). */
export function eventosOrdenados(): Evento[] {
  return [...eventos].sort((a, b) => a.fecha.localeCompare(b.fecha))
}
