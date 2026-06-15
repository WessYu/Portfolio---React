import { useEffect, useMemo, useRef, useState } from 'react'
import { Section } from './components/Section'
import { ProjectCard } from './components/ProjectCard'
import type { ProjectLike, Repo } from './types'
import { fetchRepos, looksLikeVinicola } from './lib/github'

const LINKS = {
  github: 'https://github.com/WessYu',
  linkedin: 'https://www.linkedin.com/in/wesley-santos-cruz-b57589213/',
  email: 'mailto:wess.c@proton.me',
  whatsapp: 'https://wa.me/5554996558313',
  cvPT: '/Wesley_Cruz_CV_PT.pdf',
  cvEN: '/Wesley_Cruz_CV_EN.pdf',
}

const MANUAL_PROJECTS: ProjectLike[] = [
  {
    key: 'travelgram',
    title: 'Travelgram',
    eyebrow: 'UI social',
    description: 'Feed visual inspirado em redes sociais, com composição elegante, hierarquia clara e atenção ao ritmo do layout.',
    note: 'Estudo focado em organização visual, espaçamento e leitura agradável.',
    imageUrl: '/projects/travelgram.png',
    codeUrl: 'https://github.com/WessYu',
    tags: ['Layout editorial', 'Responsivo', 'UI'],
  },
  {
    key: 'turismo',
    title: 'Turismo',
    eyebrow: 'Experiência de marca',
    description: 'Página com foco em destinos, conteúdo envolvente e construção de atmosfera para apresentar experiências de viagem.',
    note: 'Prioridade em narrativa visual, contraste e seções escaneáveis.',
    imageUrl: '/projects/turismo.png',
    codeUrl: 'https://github.com/WessYu',
    tags: ['Storytelling', 'Landing page', 'Visual'],
  },
  {
    key: 'landing',
    title: 'Landing Page',
    eyebrow: 'Conversão',
    description: 'Estrutura pensada para comunicar valor rápido, reforçar confiança e conduzir o usuário para a ação principal.',
    note: 'Trabalho com blocos bem definidos, CTA forte e leitura objetiva.',
    imageUrl: '/projects/landing.png',
    codeUrl: 'https://github.com/WessYu',
    tags: ['CTA', 'Performance', 'UI responsiva'],
  },
  {
    key: 'vinicola',
    title: 'Vinícola',
    eyebrow: 'Institucional premium',
    description: 'Projeto com pegada mais sofisticada, explorando imagem, tipografia e organização de conteúdo para valorizar a marca.',
    note: 'Case ideal para mostrar direção visual mais madura e acabamento refinado.',
    imageUrl: '/projects/vinicola.png',
    codeUrl: 'https://github.com/WessYu',
    tags: ['Branding', 'Institucional', 'Estética'],
  },
  {
    key: 'todo',
    title: 'To-Do App',
    eyebrow: 'Produto funcional',
    description: 'Aplicação de tarefas com foco em produtividade, fluxo simples e clareza para o usuário acompanhar o que importa.',
    note: 'Une interface limpa com lógica prática do dia a dia.',
    imageUrl: '/projects/todo.png',
    demoUrl: 'https://studyflowkanban.netlify.app/',
    ctaLabel: 'Ver demo',
    codeUrl: 'https://github.com/WessYu',
    tags: ['App web', 'Produtividade', 'Deploy'],
  },
]

const SKILL_GROUPS = [
  {
    title: 'Front-end',
    description: 'Interfaces modernas, reutilizáveis e responsivas com foco em acabamento visual.',
    items: ['React', 'TypeScript', 'JavaScript ES6+', 'HTML5', 'CSS3'],
  },
  {
    title: 'Back-end e dados',
    description: 'Base para integrar interfaces com APIs e persistência de informação.',
    items: ['Node.js', 'Express', 'MySQL', 'PostgreSQL'],
  },
  {
    title: 'Fluxo de trabalho',
    description: 'Ferramentas para prototipar, versionar e transformar ideia em entrega real.',
    items: ['Git', 'GitHub', 'Figma', 'VS Code', 'Photoshop'],
  },
]

const PRINCIPLES = [
  {
    title: 'Visual com propósito',
    text: 'Não busco só “deixar bonito”. Cada bloco precisa guiar leitura, reforçar mensagem e sustentar a experiência.',
  },
  {
    title: 'Código que cresce bem',
    text: 'Prefiro componentes claros, estilos consistentes e decisões que facilitem evolução sem virar bagunça.',
  },
  {
    title: 'Responsividade de verdade',
    text: 'A experiência precisa continuar forte no celular, no notebook e em telas maiores, sem improviso.',
  },
]

function normalize(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '')
}

function pickLocalCover(repoName: string) {
  const normalized = repoName.toLowerCase().replace(/\s+/g, '')
  if (looksLikeVinicola(repoName)) return '/projects/vinicola.png'

  const rules: Array<[RegExp, string]> = [
    [/todo|to-?do|todolist|task/, '/projects/todo.png'],
    [/landing|lp|landingpage/, '/projects/landing.png'],
    [/imc|bmi|calculadora/, '/projects/imc.png'],
    [/travelgram|travel|gram|feed/, '/projects/travelgram.png'],
    [/turismo|travel|tour/, '/projects/turismo.png'],
  ]

  for (const [regex, image] of rules) {
    if (regex.test(normalized)) return image
  }

  return null
}

function repoOgImage(fullName: string) {
  return `https://opengraph.githubassets.com/wesley/${fullName}`
}

function repoToProject(repo: Repo): ProjectLike {
  const demo = repo.homepage && repo.homepage.trim() ? repo.homepage.trim() : null
  const updatedAt = new Date(repo.updated_at).toLocaleDateString('pt-BR')
  const localCover = pickLocalCover(repo.name)

  return {
    key: repo.full_name,
    title: repo.name,
    eyebrow: demo ? 'Deploy publicado' : 'GitHub',
    description: repo.description || 'Projeto publicado no GitHub com foco em prática, estudo e evolução contínua.',
    note: demo ? 'Este repositório possui uma versão pública disponível para navegação.' : 'Código aberto disponível para consulta no GitHub.',
    imageUrl: localCover || repoOgImage(repo.full_name),
    codeUrl: repo.html_url,
    demoUrl: demo || undefined,
    ctaLabel: demo ? 'Abrir projeto' : undefined,
    tags: [repo.language || 'Código', demo ? 'Deploy' : 'Open source'],
    updatedAt,
  }
}

export default function App() {
  const [projects, setProjects] = useState<ProjectLike[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [cvOpen, setCvOpen] = useState(false)
  const cvRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    let mounted = true

    ;(async () => {
      try {
        setLoading(true)
        setError(null)
        const repos = await fetchRepos()
        if (!mounted) return
        setProjects(repos.map(repoToProject))
      } catch (e) {
        if (!mounted) return
        setError(e instanceof Error ? e.message : 'Erro ao carregar projetos.')
      } finally {
        if (!mounted) return
        setLoading(false)
      }
    })()

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (!cvOpen) return
      const element = cvRef.current
      if (!element) return
      if (e.target instanceof Node && !element.contains(e.target)) setCvOpen(false)
    }

    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setCvOpen(false)
    }

    document.addEventListener('mousedown', onDocClick)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDocClick)
      document.removeEventListener('keydown', onKey)
    }
  }, [cvOpen])

  useEffect(() => {
    const items = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    if (!items.length) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.18, rootMargin: '0px 0px -60px 0px' }
    )

    items.forEach((item) => observer.observe(item))
    return () => observer.disconnect()
  }, [loading])

  const liveProjects = useMemo(() => {
    const featuredKeys = new Set(MANUAL_PROJECTS.flatMap((project) => [normalize(project.key), normalize(project.title)]))
    return projects.filter((project) => !featuredKeys.has(normalize(project.title))).slice(0, 6)
  }, [projects])

  const stats = useMemo(
    () => [
      { value: `${MANUAL_PROJECTS.length}+`, label: 'cases com curadoria visual' },
      { value: projects.length ? `${projects.length}+` : 'GitHub', label: 'repositórios conectados ao perfil' },
      { value: 'UI-first', label: 'foco em clareza, ritmo e presença visual' },
    ],
    [projects.length]
  )

  return (
    <div className="pageShell">
      <div className="ambient ambientOne" aria-hidden="true" />
      <div className="ambient ambientTwo" aria-hidden="true" />
      <div className="ambientGrid" aria-hidden="true" />

      <header className="nav">
        <a className="brand" href="#top" aria-label="Ir para o topo">
          <span className="brandMark">WC</span>
          <span className="brandText">Wesley Cruz</span>
        </a>

        <nav className="navLinks" aria-label="Navegação principal">
          <a href="#projects">Projetos</a>
          <a href="#about">Sobre</a>
          <a href="#skills">Stack</a>
          <a href="#contact">Contato</a>
        </nav>

        <a className="navCta" href="#contact">
          Vamos conversar
        </a>
      </header>

      <main id="top" className="container">
        <section className="hero">
          <div className="heroCopy" data-reveal>
            <p className="eyebrowLine">Portfólio front-end</p>
            <h1>Interfaces com presença visual, código limpo e experiência pensada nos detalhes.</h1>
            <p className="heroLead">
              Sou Wesley dos Santos Cruz, desenvolvedor front-end focado em transformar ideias em páginas modernas,
              responsivas e profissionais. Gosto de unir estética, clareza e boa execução para criar experiências que
              passam confiança logo no primeiro olhar.
            </p>

            <div className="heroTags" aria-label="Especialidades">
              <span>React</span>
              <span>TypeScript</span>
              <span>UI responsiva</span>
              <span>Integração com APIs</span>
            </div>

            <div className="ctaRow">
              <a className="btn primary" href="#projects">
                Ver projetos
              </a>
              <a className="btn" href={LINKS.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="btn" href={LINKS.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>

              <div className="cvWrap" ref={cvRef}>
                <button
                  className="btn"
                  type="button"
                  onClick={() => setCvOpen((value) => !value)}
                  aria-haspopup="menu"
                  aria-expanded={cvOpen}
                >
                  Currículo
                </button>
                {cvOpen ? (
                  <div className="cvMenu" role="menu">
                    <a className="cvItem" role="menuitem" href={LINKS.cvPT} target="_blank" rel="noreferrer">
                      Baixar em português
                    </a>
                    <a className="cvItem" role="menuitem" href={LINKS.cvEN} target="_blank" rel="noreferrer">
                      Baixar em inglês
                    </a>
                  </div>
                ) : null}
              </div>

              <a className="btn accent" href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>

            <div className="heroStats">
              {stats.map((stat) => (
                <div key={stat.label} className="statCard">
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="heroVisual" data-reveal>
            <div className="portraitFrame">
              <div className="orbit orbitOne" aria-hidden="true" />
              <div className="orbit orbitTwo" aria-hidden="true" />
              <img src="/profile.jpg" alt="Wesley Cruz" />
              <div className="floatingBadge badgeTop">Disponível para projetos</div>
              <div className="floatingBadge badgeBottom">UI limpa + execução sólida</div>
            </div>

            <div className="heroPanel">
              <p className="panelEyebrow">Como eu trabalho</p>
              <ul className="heroChecklist">
                <li>Layout com hierarquia visual clara e acabamento forte.</li>
                <li>Experiência responsiva pensada desde o início.</li>
                <li>Componentes organizados para crescer sem complicar.</li>
              </ul>
            </div>
          </div>
        </section>

        <Section
          id="projects"
          title="Projetos em destaque"
          subtitle="Seleção com foco em interface, organização visual e experiências que comunicam valor."
        >
          <div className="grid featured">
            {MANUAL_PROJECTS.map((project) => (
              <ProjectCard key={project.key} p={project} featured />
            ))}
          </div>

          <div className="subSectionHead" data-reveal>
            <div>
              <p className="sectionMiniEyebrow">GitHub ao vivo</p>
              <h3 className="subSectionTitle">Mais estudos e experimentos recentes</h3>
            </div>
            <p className="subSectionText">
              Esta área puxa repositórios reais do meu perfil para manter o portfólio vivo e sempre conectado com a
              evolução do trabalho.
            </p>
          </div>

          {loading ? (
            <div className="grid">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="card skeleton" />
              ))}
            </div>
          ) : error ? (
            <div className="notice" data-reveal>
              <p>{error}</p>
              <a className="btn" href={LINKS.github} target="_blank" rel="noreferrer">
                Ver perfil no GitHub
              </a>
            </div>
          ) : liveProjects.length ? (
            <div className="grid">
              {liveProjects.map((project) => (
                <ProjectCard key={project.key} p={project} />
              ))}
            </div>
          ) : (
            <div className="notice" data-reveal>
              <p>Os projetos dinâmicos não apareceram desta vez, mas os destaques acima já mostram bem meu estilo de trabalho.</p>
            </div>
          )}
        </Section>

        <Section
          id="about"
          title="Sobre mim"
          subtitle="Busco entregar interfaces modernas, confiáveis e com uma aparência realmente profissional."
        >
          <div className="aboutLayout">
            <div className="aboutStory" data-reveal>
              <p>
                Estou consolidando minha trajetória em desenvolvimento front-end com base em React, JavaScript moderno e
                construção de interfaces responsivas. Meu objetivo é criar produtos que pareçam bem resolvidos, tanto no
                visual quanto na organização do código.
              </p>
              <p>
                Valorizo páginas com identidade, ritmo de leitura e decisões consistentes. Gosto de observar onde a
                interface pode transmitir mais confiança, mais clareza e mais qualidade sem depender de exagero.
              </p>
            </div>

            <div className="miniGrid">
              <div className="miniCard" data-reveal>
                <p className="miniTitle">Base</p>
                <p className="miniValue">Caxias do Sul, RS</p>
              </div>
              <div className="miniCard" data-reveal>
                <p className="miniTitle">Contato</p>
                <a className="miniValue link" href={LINKS.email}>
                  wess.c@proton.me
                </a>
              </div>
              <div className="miniCard" data-reveal>
                <p className="miniTitle">Foco</p>
                <p className="miniValue">Landing pages, sites institucionais e interfaces web</p>
              </div>
            </div>
          </div>

          <div className="principlesGrid">
            {PRINCIPLES.map((principle) => (
              <article key={principle.title} className="principleCard" data-reveal>
                <h3>{principle.title}</h3>
                <p>{principle.text}</p>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="skills"
          title="Stack e processo"
          subtitle="Ferramentas e áreas que uso para transformar conceito em experiência digital."
        >
          <div className="skillGrid">
            {SKILL_GROUPS.map((group) => (
              <article key={group.title} className="skillCard" data-reveal>
                <p className="miniTitle">{group.title}</p>
                <p className="skillDescription">{group.description}</p>
                <div className="chips">
                  {group.items.map((item) => (
                    <span key={item} className="chip">
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </Section>

        <Section
          id="contact"
          title="Vamos construir algo forte?"
          subtitle="Se você precisa de um site, uma landing page ou uma interface com mais presença visual, podemos conversar."
        >
          <div className="contactPanel" data-reveal>
            <div className="contactIntro">
              <p className="sectionMiniEyebrow">Contato direto</p>
              <h3>Aberto para oportunidades, freelas e projetos que pedem um visual mais profissional.</h3>
              <div className="contactLinks">
                <a className="bigLink" href={LINKS.email}>
                  wess.c@proton.me
                </a>
                <a className="bigLink" href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                  +55 (54) 99655-8313
                </a>
              </div>
            </div>

            <div className="contactActions">
              <a className="btn" href={LINKS.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
              <a className="btn" href={LINKS.linkedin} target="_blank" rel="noreferrer">
                LinkedIn
              </a>
              <a className="btn primary" href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                Chamar no WhatsApp
              </a>
            </div>
          </div>
        </Section>

        <footer className="footer">
          <span>© {new Date().getFullYear()} Wesley Cruz</span>
          <a href={LINKS.github} target="_blank" rel="noreferrer">
            github.com/WessYu
          </a>
        </footer>
      </main>
    </div>
  )
}
