// Comunidades amigas: comunidades y eventos con los que Mujeres Testing Latam
// se ha asociado para apoyarse mutuamente. Agregar una nueva es sumar un objeto.

export type Comunidad = {
  id: string
  nombre: string
  descripcion: { es: string; en: string }
  url: string
  logo: string
  logoDark?: string
  pais?: string
  bandera?: string
}

export const comunidades: Comunidad[] = [
  {
    id: 'mujeres-it',
    nombre: 'Mujeres IT',
    descripcion: {
      es: 'Comunidad que impulsa la participación y el crecimiento de las mujeres en el mundo de la tecnología.',
      en: 'A community that fosters the participation and growth of women in the world of technology.',
    },
    url: 'https://mujeresit.com/',
    logo: '/images/comunidades/MujeresIT.svg',
  },
  {
    id: 'quality-sense-conf',
    nombre: 'Quality Sense Conf',
    descripcion: {
      es: 'Conferencia internacional de testing y calidad de software, desde Uruguay para toda la región.',
      en: 'International software testing and quality conference, from Uruguay for the whole region.',
    },
    url: 'https://qualitysenseconf.com/',
    logo: '/images/comunidades/quality-sense-conf.png',
    pais: 'Uruguay',
    bandera: '🇺🇾',
  },
]
