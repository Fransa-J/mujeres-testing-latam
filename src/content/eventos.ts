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
  /** País del evento. */
  pais?: string
  /** Emoji de bandera del país. */
  bandera?: string
  /** Ciudad del evento. */
  ciudad?: string
  /** Quién organiza el evento. Opcional. */
  organizador?: string
  /** Enlace para inscribirse / ver el evento. */
  url: string
  /** 'gratis' | 'pago'. */
  precio?: 'gratis' | 'pago'
  /** Etiquetas de clasificación, ej. ['Automation', 'IA']. */
  tags?: string[]
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
  },
  {
    id: 'quality-sense',
    nombre: 'Quality Sense Conf',
    fecha: '2026-10-13',
    modalidad: 'online',
    pais: 'Uruguay',
    bandera: '🇺🇾',
    url: 'https://qualitysenseconf.com/',
    tags: ['Conferencia'],
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
  },
]

/** Devuelve los eventos ordenados por fecha ascendente (próximos primero). */
export function eventosOrdenados(): Evento[] {
  return [...eventos].sort((a, b) => a.fecha.localeCompare(b.fecha))
}
