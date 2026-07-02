import { setRequestLocale } from 'next-intl/server'
import {
  Heart,
  ShieldCheck,
  Sparkles,
  BookOpen,
  Users,
  HandHeart,
  Target,
  Compass,
  Eye,
  Crown,
  Star,
  MapPin,
  UserCheck,
  Handshake,
  Building2,
} from 'lucide-react'

type Locale = 'es' | 'en'

const content = {
  es: {
    kicker: 'Quiénes somos',
    title: 'Una comunidad para crecer juntas',
    intro:
      'Mujeres Testing Latam nace ante la falta de espacios seguros donde las mujeres del área de Testing puedan compartir sus experiencias, buscar apoyo y encontrar mentoría de otras mujeres con más trayectoria. Esta comunidad surge para romper el aislamiento y construir juntas un lugar de confianza, acompañamiento y crecimiento compartido.',
    purposeKicker: 'Propósito general',
    purpose:
      'Empoderar a las mujeres del área de Testing y Tecnología, brindando espacios de aprendizaje, contención y colaboración que impulsen su desarrollo profesional y personal.',
    missionTitle: 'Misión',
    mission:
      'Crear una comunidad activa, diversa y accesible, que difunda conocimiento en formato comprensible y sencillo sobre Testing, fomente la mentoría entre mujeres, promueva la colaboración y el apoyo mutuo. A través de contenido educativo, charlas, podcast y encuentros —tanto online como presenciales—, buscamos fortalecer redes de conexión y visibilidad, facilitando oportunidades laborales y crecimiento colectivo.',
    visionTitle: 'Visión',
    vision:
      'En los próximos años, Mujeres Testing Latam será una comunidad internacionalmente reconocida y consolidada, referente en educación, empoderamiento y liderazgo femenino en el área de Testing y Tecnología. Queremos construir una red diversa y segura, con representantes en distintos países de Latinoamérica, generando eventos, conferencias y espacios de intercambio que inspiren a más mujeres a participar activamente en la industria tecnológica.',
    valuesTitle: 'Nuestros valores',
    valuesIntro: 'Los principios que guían cada acción de la comunidad.',
    values: [
      { icon: Sparkles, title: 'Empoderamiento', desc: 'Fortalecer la confianza y la voz de cada mujer.' },
      { icon: Heart, title: 'Autenticidad', desc: 'Ser genuinas, transparentes y humanas en cada encuentro.' },
      { icon: ShieldCheck, title: 'Seguridad', desc: 'Crear entornos donde se pueda hablar sin miedo ni juicio.' },
      { icon: BookOpen, title: 'Conocimiento', desc: 'Compartir saberes de forma accesible y comprensible.' },
      { icon: HandHeart, title: 'Cercanía y apoyo', desc: 'Construir relaciones basadas en respeto, empatía y colaboración.' },
      { icon: Users, title: 'Amistad e inspiración', desc: 'Celebrar los logros individuales y colectivos, inspirando a otras a seguir creciendo.' },
    ],
    objectivesTitle: 'Objetivos estratégicos',
    objectives: [
      'Difundir contenido educativo y accesible que promueva el aprendizaje continuo en Testing.',
      'Facilitar mentorías y espacios de acompañamiento entre mujeres con distintos niveles de experiencia.',
      'Generar networking para potenciar oportunidades laborales y visibilidad profesional.',
      'Consolidar alianzas con empresas, comunidades y referentes de la industria tecnológica.',
      'Expandir la comunidad a nivel internacional, promoviendo la diversidad y la inclusión.',
    ],
    axesTitle: 'Ejes de acción',
    axes: [
      { title: 'Educación y formación', desc: 'Guías, podcast, talleres y contenidos formativos.' },
      { title: 'Comunidad y networking', desc: 'Eventos online y presenciales para conectar, compartir y aprender.' },
      { title: 'Visibilidad y comunicación', desc: 'Difusión de historias, conocimientos y oportunidades.' },
      { title: 'Alianzas y representación', desc: 'Colaboración con otras comunidades, instituciones y empresas del sector.' },
    ],
    audienceTitle: 'Audiencia y alcance',
    audience:
      'Mujeres Testing Latam está dirigida a todas las mujeres interesadas en el área de Testing de Software, ya sean estudiantes, profesionales o entusiastas de la tecnología, sin importar su nivel de experiencia o etapa laboral.',
    rolesKicker: 'Estructura organizacional',
    rolesTitle: 'Los roles de la mesa directiva',
    rolesIntro:
      'Todas formamos la comunidad y jugamos un rol crucial en su ecosistema, avanzando organizadas y cohesionadas, sin jerarquías, como un mismo bloque de empoderamiento femenino en Testing.',
    roles: [
      { icon: Crown, title: 'Fundadora', desc: 'Responsable de la creación, visión y propósito central de la comunidad. Define la dirección estratégica, impulsa iniciativas clave, vela por los valores fundacionales y coordina el crecimiento sostenible del ecosistema.' },
      { icon: Star, title: 'Co-Fundadora', desc: 'Colabora directamente en la toma de decisiones estratégicas, fortalece la estructura organizacional y lidera iniciativas transversales. Apoya la expansión de la comunidad y promueve la cultura de colaboración, innovación y empoderamiento.' },
      { icon: MapPin, title: 'Chapter Lead regional', desc: 'Crea, fortalece y acompaña el capítulo de MTL en su región. Impulsa espacios de aprendizaje y networking, representa a la comunidad en su país, organiza actividades locales y conecta con empresas, instituciones y referentes. Es la voz y presencia activa del movimiento en cada país.' },
      { icon: UserCheck, title: 'Voluntarias', desc: 'Miembros que ofrecen su tiempo y habilidades para apoyar iniciativas: conferencias como speakers, organización de eventos, moderación de espacios, soporte en mentorías, difusión y apoyo logístico o administrativo. Son fundamentales para la operación y expansión del movimiento.' },
      { icon: Users, title: 'Miembros', desc: 'Integrantes de la comunidad que participan activamente del contenido, eventos, iniciativas y espacios colaborativos.' },
      { icon: Handshake, title: 'Alianzas', desc: 'Colaboraciones que generan valor mutuo: intercambio de conocimiento, participación cruzada de speakers, co-creación de actividades y difusión conjunta para fortalecer el ecosistema y potenciar la visibilidad de mujeres en testing y tecnología.' },
      { icon: Building2, title: 'Sponsors', desc: 'Organizaciones, empresas o instituciones que se unen como aliados estratégicos y de impacto, apoyando con aporte económico, recursos, participación en charlas o conexión con nuevas redes y oportunidades. Son socios que creen en nuestra misión y acompañan la expansión regional.' },
    ],
    ctaTitle: 'Únete a la comunidad',
    ctaDesc: 'Conéctate con nosotras en LinkedIn y sé parte del movimiento.',
    ctaBtn: 'Seguirnos en LinkedIn',
  },
  en: {
    kicker: 'Who we are',
    title: 'A community to grow together',
    intro:
      'Mujeres Testing Latam was born from the lack of safe spaces where women in Testing can share their experiences, seek support and find mentorship from other women with more experience. This community exists to break isolation and build together a place of trust, companionship and shared growth.',
    purposeKicker: 'General purpose',
    purpose:
      'To empower women in Testing and Technology by providing spaces for learning, support and collaboration that drive their professional and personal development.',
    missionTitle: 'Mission',
    mission:
      'To create an active, diverse and accessible community that shares knowledge about Testing in a clear and simple way, fosters mentorship among women, and promotes collaboration and mutual support. Through educational content, talks, podcasts and gatherings —both online and in person— we seek to strengthen networks of connection and visibility, enabling job opportunities and collective growth.',
    visionTitle: 'Vision',
    vision:
      'In the coming years, Mujeres Testing Latam will be an internationally recognized and consolidated community, a reference in education, empowerment and female leadership in Testing and Technology. We want to build a diverse and safe network, with representatives across Latin American countries, creating events, conferences and exchange spaces that inspire more women to take an active part in the tech industry.',
    valuesTitle: 'Our values',
    valuesIntro: 'The principles that guide every action of the community.',
    values: [
      { icon: Sparkles, title: 'Empowerment', desc: 'Strengthening the confidence and voice of every woman.' },
      { icon: Heart, title: 'Authenticity', desc: 'Being genuine, transparent and human in every encounter.' },
      { icon: ShieldCheck, title: 'Safety', desc: 'Creating environments where you can speak without fear or judgment.' },
      { icon: BookOpen, title: 'Knowledge', desc: 'Sharing knowledge in an accessible and understandable way.' },
      { icon: HandHeart, title: 'Closeness and support', desc: 'Building relationships based on respect, empathy and collaboration.' },
      { icon: Users, title: 'Friendship and inspiration', desc: 'Celebrating individual and collective achievements, inspiring others to keep growing.' },
    ],
    objectivesTitle: 'Strategic objectives',
    objectives: [
      'Share educational, accessible content that promotes continuous learning in Testing.',
      'Enable mentorship and support spaces among women with different levels of experience.',
      'Generate networking to boost job opportunities and professional visibility.',
      'Build alliances with companies, communities and references in the tech industry.',
      'Expand the community internationally, promoting diversity and inclusion.',
    ],
    axesTitle: 'Areas of action',
    axes: [
      { title: 'Education and training', desc: 'Guides, podcasts, workshops and educational content.' },
      { title: 'Community and networking', desc: 'Online and in-person events to connect, share and learn.' },
      { title: 'Visibility and communication', desc: 'Sharing stories, knowledge and opportunities.' },
      { title: 'Alliances and representation', desc: 'Collaboration with other communities, institutions and companies in the sector.' },
    ],
    audienceTitle: 'Audience and reach',
    audience:
      'Mujeres Testing Latam is for all women interested in Software Testing —students, professionals or tech enthusiasts— regardless of their level of experience or career stage.',
    rolesKicker: 'Organizational structure',
    rolesTitle: 'The board roles',
    rolesIntro:
      'We all make up the community and play a crucial role in its ecosystem, moving forward organized and cohesive, without hierarchies, as a single block of female empowerment in Testing.',
    roles: [
      { icon: Crown, title: 'Founder', desc: 'Responsible for the creation, vision and core purpose of the community. Defines the strategic direction, drives key initiatives, safeguards the founding values and coordinates the sustainable growth of the ecosystem.' },
      { icon: Star, title: 'Co-Founder', desc: 'Collaborates directly in strategic decision-making, strengthens the organizational structure and leads cross-cutting initiatives. Supports the community’s expansion and promotes a culture of collaboration, innovation and empowerment.' },
      { icon: MapPin, title: 'Regional Chapter Lead', desc: 'Creates, strengthens and supports the MTL chapter in their region. Drives learning and networking spaces, represents the community in their country, organizes local activities and connects with companies, institutions and references. The active voice and presence of the movement in each country.' },
      { icon: UserCheck, title: 'Volunteers', desc: 'Members who offer their time and skills to support initiatives: speaking at conferences, organizing events, moderating spaces, supporting mentorships, outreach and logistical or administrative support. Essential to the operation and expansion of the movement.' },
      { icon: Users, title: 'Members', desc: 'Community members who actively participate in content, events, initiatives and collaborative spaces.' },
      { icon: Handshake, title: 'Alliances', desc: 'Collaborations that create mutual value: knowledge exchange, cross participation of speakers, co-creation of activities and joint outreach to strengthen the ecosystem and boost the visibility of women in testing and technology.' },
      { icon: Building2, title: 'Sponsors', desc: 'Organizations, companies or institutions that join as strategic and impact allies, supporting with financial contributions, resources, participation in talks or connection to new networks and opportunities. Partners who believe in our mission and support regional expansion.' },
    ],
    ctaTitle: 'Join the community',
    ctaDesc: 'Connect with us on LinkedIn and be part of the movement.',
    ctaBtn: 'Follow us on LinkedIn',
  },
} satisfies Record<Locale, unknown>

export default function Comunidad({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale)
  const c = content[(locale as Locale) in content ? (locale as Locale) : 'es']

  return (
    <div className="animate-fade-in max-w-6xl mx-auto px-6 py-20">
      {/* Hero */}
      <div className="max-w-3xl mb-20">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">{c.kicker}</p>
        <h1 className="text-4xl font-medium mb-5">{c.title}</h1>
        <p className="text-zinc-500 dark:text-zinc-400 text-lg leading-relaxed">{c.intro}</p>
      </div>

      {/* Propósito */}
      <section className="mb-20">
        <div className="rounded-2xl border border-[#C8006A]/20 bg-[#C8006A]/5 p-8 sm:p-10">
          <div className="flex items-center gap-2 mb-3">
            <Target size={18} className="text-[#C8006A]" />
            <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A]">{c.purposeKicker}</p>
          </div>
          <p className="text-lg sm:text-xl leading-relaxed">{c.purpose}</p>
        </div>
      </section>

      {/* Misión + Visión */}
      <section className="grid md:grid-cols-2 gap-6 mb-20">
        <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <Compass size={22} className="text-[#C8006A] mb-4" />
          <h2 className="text-xl font-medium mb-3">{c.missionTitle}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{c.mission}</p>
        </div>
        <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <Eye size={22} className="text-[#C8006A] mb-4" />
          <h2 className="text-xl font-medium mb-3">{c.visionTitle}</h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{c.vision}</p>
        </div>
      </section>

      {/* Valores */}
      <section className="mb-20">
        <h2 className="text-2xl font-medium mb-2">{c.valuesTitle}</h2>
        <p className="text-zinc-500 dark:text-zinc-400 mb-8">{c.valuesIntro}</p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {c.values.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <Icon size={20} className="text-[#C8006A] mb-4" />
              <h3 className="font-medium mb-2">{title}</h3>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Objetivos + Ejes */}
      <section className="grid md:grid-cols-2 gap-10 mb-20">
        <div>
          <h2 className="text-2xl font-medium mb-6">{c.objectivesTitle}</h2>
          <ul className="flex flex-col gap-4">
            {c.objectives.map((o, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 shrink-0 w-6 h-6 rounded-full bg-[#C8006A]/10 text-[#C8006A] text-xs font-medium flex items-center justify-center">
                  {i + 1}
                </span>
                <span className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">{o}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="text-2xl font-medium mb-6">{c.axesTitle}</h2>
          <div className="flex flex-col gap-3">
            {c.axes.map(({ title, desc }) => (
              <div key={title} className="p-5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
                <h3 className="font-medium text-sm mb-1">{title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Audiencia */}
      <section className="mb-20">
        <div className="p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
          <h2 className="text-xl font-medium mb-3">{c.audienceTitle}</h2>
          <p className="text-zinc-500 dark:text-zinc-400 leading-relaxed">{c.audience}</p>
        </div>
      </section>

      {/* Roles del board */}
      <section className="mb-20">
        <p className="text-xs font-medium tracking-widest uppercase text-[#C8006A] mb-3">{c.rolesKicker}</p>
        <h2 className="text-2xl font-medium mb-3">{c.rolesTitle}</h2>
        <p className="text-zinc-500 dark:text-zinc-400 max-w-3xl mb-8 leading-relaxed">{c.rolesIntro}</p>
        <div className="grid sm:grid-cols-2 gap-4">
          {c.roles.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="p-6 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900">
              <div className="flex items-center gap-3 mb-3">
                <span className="w-9 h-9 rounded-lg bg-[#C8006A]/10 flex items-center justify-center">
                  <Icon size={18} className="text-[#C8006A]" />
                </span>
                <h3 className="font-medium">{title}</h3>
              </div>
              <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="rounded-2xl bg-zinc-950 dark:bg-zinc-900 border border-zinc-800 p-10 text-center">
        <h2 className="text-2xl font-medium text-white mb-3">{c.ctaTitle}</h2>
        <p className="text-zinc-400 text-sm mb-6">{c.ctaDesc}</p>
        <a
          href="https://www.linkedin.com/company/mujeres-testing-latam/"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-3 bg-[#C8006A] text-white text-sm font-medium rounded-lg hover:bg-[#A80058] transition-colors"
        >
          {c.ctaBtn}
        </a>
      </div>
    </div>
  )
}
