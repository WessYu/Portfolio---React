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

function pickLocalCover(repoName: string) {
  const n = repoName.toLowerCase().replace(/\s+/g, '')
  if (looksLikeVinicola(repoName)) return '/projects/vinicola.png'

  const rules: Array<[RegExp, string]> = [
    [/todo|to-?do|todolist|task/, '/projects/todo.png'],
    [/landing|lp|landingpage/, '/projects/landing.png'],
    [/imc|bmi|calculadora/, '/projects/imc.png'],
    [/travelgram|travel|gram|feed/, '/projects/travelgram.png'],
  ]

  for (const [rx, img] of rules) {
    if (rx.test(n)) return img
  }
  return null
}

function repoOgImage(fullName: string) {
  return `https://opengraph.githubassets.com/wesley/${fullName}`
}

function repoToProject(r: Repo): ProjectLike {
  const demo = r.homepage && r.homepage.trim() ? r.homepage.trim() : null
  const updatedAt = new Date(r.updated_at).toLocaleDateString('pt-BR')
  const tags = [r.language || 'Repo', demo ? 'Deploy' : 'Code'].filter(Boolean)

  const local = pickLocalCover(r.name)
  const imageUrl = local || '/projects/imc.png'

  return {
    key: r.full_name,
    title: r.name,
    description: r.description || 'Projeto no GitHub.',
    imageUrl,
    codeUrl: r.html_url,
    demoUrl: demo || undefined,
    tags,
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
        const repos = await fetchRepos()
        const list = repos.map(repoToProject)
        if (!mounted) return
        setProjects(list)
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
      const el = cvRef.current
      if (!el) return
      if (e.target instanceof Node && !el.contains(e.target)) setCvOpen(false)
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

  
const MANUAL_PROJECTS = [
  {
    key: 'travelgram',
    title: 'Travelgram',
    description: 'Feed visual inspirado em redes sociais, com foco em layout e organização.',
    imageUrl: '/projects/travelgram.png',
    codeUrl: 'https://github.com/WessYu',
  },
  {
    key: 'turismo',
    title: 'Turismo',
    description: 'Projeto de turismo com foco em destinos, leitura e experiência visual.',
    imageUrl: '/projects/turismo.png',
    codeUrl: 'https://github.com/WessYu',
  },
  {
    key: 'landing',
    title: 'Landing Page',
    description: 'Landing page responsiva com foco em conversão e clareza.',
    imageUrl: '/projects/landing.png',
    codeUrl: 'https://github.com/WessYu',
  },
  {
    key: 'vinicola',
    title: 'Vinícola',
    description: 'Projeto institucional para vinícola, layout moderno e informativo.',
    imageUrl: '/projects/vinicola.png',
    codeUrl: 'https://github.com/WessYu',
  },
  {
    key: 'todo',
    title: 'To‑Do App',
    description: 'Aplicação de tarefas com foco em produtividade.',
    imageUrl: '/projects/todo.png',
    demoUrl: 'https://studyflowkanban.netlify.app/',
    codeUrl: 'https://github.com/WessYu',
  },
]

const featured = MANUAL_PROJECTS

  const rest: any[] = []

  return (
    <div className="bg">
      <header className="nav">
        <a className="brand" href="#top">
          WC
        </a>
        <nav className="navLinks">
          <a href="#projects">Projetos</a>
          <a href="#about">Sobre</a>
          <a href="#skills">Stack</a>
          <a href="#contact">Contato</a>
        </nav>
      </header>

      <main id="top" className="container">
        <section className="hero">
          <div className="heroText">
            <p className="kicker">Front-end Developer (Junior)</p>
            <h1>Wesley dos Santos Cruz</h1>
            <p className="lead">
              Interfaces responsivas e funcionais com foco em clareza, consistência e boa experiência do usuário.
            </p>

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
                <button className="btn" type="button" onClick={() => setCvOpen((v) => !v)} aria-haspopup="menu" aria-expanded={cvOpen}>
                  Currículo
                </button>
                {cvOpen ? (
                  <div className="cvMenu" role="menu">
                    <a className="cvItem" role="menuitem" href={LINKS.cvPT} target="_blank" rel="noreferrer">
                      Baixar em PT
                    </a>
                    <a className="cvItem" role="menuitem" href={LINKS.cvEN} target="_blank" rel="noreferrer">
                      Baixar em EN
                    </a>
                  </div>
                ) : null}
              </div>

              <a className="btn" href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                WhatsApp
              </a>
            </div>
          </div>

          <div className="heroPhoto">
            <img src="/profile.jpg" alt="Wesley Cruz" />
          </div>
        </section>

        <Section id="projects" title="Projetos" >
          {loading ? (
            <div className="grid featured">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="card skeleton" />
              ))}
            </div>
          ) : error ? (
            <div className="notice">
              <p>{error}</p>
              <a className="btn" href={LINKS.github} target="_blank" rel="noreferrer">
                Ver no GitHub
              </a>
            </div>
          ) : (
            <>
              <div className="grid featured">
                {featured.map((p) => (
                  <ProjectCard key={p.key} p={p} featured />
                ))}
              </div>

              {rest.length ? (
                <div className="grid">
                  {rest.map((p) => (
                    <ProjectCard key={p.key} p={p} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </Section>

        <Section id="about" title="Sobre">
          <div className="split">
            <p className="muted">
              Desenvolvedor Front-end Júnior com base em React.js, JavaScript moderno (ES6+) e interfaces responsivas.
              Em transição de carreira, com projetos práticos e experiência em ambientes corporativos.
            </p>
            <div className="mini">
              <div className="miniCard">
                <p className="miniTitle">Local</p>
                <p className="miniValue">Caxias do Sul — RS</p>
              </div>
              <div className="miniCard">
                <p className="miniTitle">Contato</p>
                <a className="miniValue link" href={LINKS.email}>
                  wess.c@proton.me
                </a>
              </div>
            </div>
          </div>
        </Section>

        <Section id="skills" title="Stack">
          <div className="chips">
            {['HTML5', 'CSS3', 'JavaScript (ES6+)', 'React.js', 'Node.js (básico)', 'Express', 'MySQL', 'PostgreSQL', 'Git', 'Figma', 'Photoshop', 'VS Code'].map(
              (s) => (
                <span key={s} className="chip">
                  {s}
                </span>
              )
            )}
          </div>
        </Section>

        <Section id="contact" title="Contato" subtitle="Vamos conversar?">
          <div className="contactCard">
            <div>
              <p className="muted">Contato</p>
              <div className="contactLinks">
                <a className="bigLink" href={LINKS.email}>
                  wess.c@proton.me
                </a>
                <a className="bigLink" href={LINKS.whatsapp} target="_blank" rel="noreferrer">
                  +55 (54) 99655-8313
                </a>
              </div>
            </div>
            <div className="ctaRow">
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
          <span className="muted">© {new Date().getFullYear()} Wesley Cruz</span>
        </footer>
      </main>
    </div>
  )
}
