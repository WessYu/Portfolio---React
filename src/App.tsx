import { useEffect, useMemo, useRef, useState } from 'react'
import type { CommitItem, ProjectCase } from './types'
import { fetchRecentCommits } from './lib/github'

const LINKS = {
  github: 'https://github.com/WessYu',
  linkedin: 'https://www.linkedin.com/in/wesley-santos-cruz-b57589213/',
  email: 'mailto:wess.c@proton.me',
}

const PROJECTS: ProjectCase[] = [
  {
    id: 'receitas',
    number: '001',
    title: 'Receitas',
    year: '2026',
    image: '/projects/receitas/home.png',
    screens: ['/projects/receitas/home.png', '/projects/receitas/library.png', '/projects/receitas/recipe.png', '/projects/receitas/admin.png'],
    repository: 'https://github.com/WessYu/Receitas',
    summary: 'Recipe platform built with Next.js, authentication and PostgreSQL.',
    context: 'A cooking product created to organize recipes, discovery, user accounts and admin publishing in one complete web experience.',
    challenge: 'Move beyond a static recipe catalog and build the foundations of a real product: identity, protected areas, content management and responsive browsing.',
    solution: 'The platform was structured around recipe discovery, saved content, admin flows, server actions and a database-backed content model.',
    decisions: ['Authentication as product infrastructure', 'PostgreSQL data model for recipes and users', 'Admin publishing flow', 'Mobile-first recipe reading'],
    process: ['Initial product map', 'Library and recipe wireframes', 'Next.js implementation', 'Admin-ready final version'],
    architecture: ['Next.js frontend', 'Server actions and API routes', 'Prisma', 'PostgreSQL'],
  },
  {
    id: 'vinicola',
    number: '002',
    title: 'Vinicola Serra Dourada',
    year: '2025',
    image: '/projects/vinicola.png',
    screens: ['/projects/vinicola.png', '/covers/vinicola.png'],
    repository: 'https://github.com/WessYu/vinicola-serra-dourada-main',
    summary: 'Premium wine storefront with catalog, cart behavior and a stronger brand system.',
    context: 'A commercial interface for a winery brand that needed to feel more mature than a generic institutional page.',
    challenge: 'Present products, club logic and brand trust without making the experience look like a template.',
    solution: 'The project uses a darker editorial surface, product-centered sections, structured catalog data and local API behavior.',
    decisions: ['Real product browsing instead of decorative sections', 'Catalog-first information architecture', 'Static host adaptation', 'Brand tone aligned with premium retail'],
    process: ['Brand direction', 'Catalog structure', 'React/Vite build', 'Static deployment preparation'],
    architecture: ['React frontend', 'Local JSON API', 'Product data', 'Static build'],
  },
  {
    id: 'turismo',
    number: '003',
    title: 'Turismo',
    year: '2024',
    image: '/projects/turismo.png',
    screens: ['/projects/turismo.png'],
    repository: 'https://github.com/WessYu',
    summary: 'Travel interface focused on imagery, destination hierarchy and fast visual scanning.',
    context: 'A visual travel project built to practice editorial composition and destination-focused browsing.',
    challenge: 'Use large media and clear hierarchy without losing readability across smaller screens.',
    solution: 'A compact navigation rhythm, destination sections and image-led layout give the page an immediate subject.',
    decisions: ['Large destination imagery', 'Simple responsive grid', 'Readable contrast over media', 'Travel-first page rhythm'],
    process: ['Mood reference', 'Destination layout', 'Responsive build', 'Final visual pass'],
    architecture: ['Frontend', 'Static content', 'Responsive CSS'],
  },
  {
    id: 'travelgram',
    number: '004',
    title: 'Travelgram',
    year: '2024',
    image: '/projects/travelgram.png',
    screens: ['/projects/travelgram.png'],
    repository: 'https://github.com/WessYu/Travelgram',
    summary: 'Social travel profile interface with attention to spacing, image rhythm and UI clarity.',
    context: 'A study around social product surfaces, visual identity and grid composition.',
    challenge: 'Make a simple profile feel designed, not assembled, using only spacing, hierarchy and media.',
    solution: 'The screen treats photography as the main content and keeps metadata quiet, readable and consistent.',
    decisions: ['Image grid as primary content', 'Profile data kept restrained', 'Consistent spacing system', 'No unnecessary decoration'],
    process: ['Reference study', 'Profile wireframe', 'CSS layout', 'Final responsive version'],
    architecture: ['HTML', 'CSS', 'Static assets'],
  },
  {
    id: 'todo',
    number: '005',
    title: 'To-Do App',
    year: '2023',
    image: '/projects/todo.png',
    screens: ['/projects/todo.png', '/projects/landing.png', '/projects/imc.png'],
    repository: 'https://github.com/WessYu',
    demo: 'https://studyflowkanban.netlify.app/',
    summary: 'Productivity interface for tasks, habits and everyday organization.',
    context: 'An early product exercise built around practical interaction instead of a static page.',
    challenge: 'Turn simple task management into a clear, repeatable workflow that still feels light.',
    solution: 'The app organizes states, repeated actions and persistent visual grouping so the user can return daily.',
    decisions: ['Task state clarity', 'Local persistence strategy', 'Compact responsive controls', 'Small product loops'],
    process: ['Initial idea', 'Task flow wireframe', 'Interaction build', 'Published version'],
    architecture: ['Frontend', 'State handling', 'Local storage', 'Static deploy'],
  },
]

const EVOLUTION = [
  { year: '2023', items: ['HTML', 'CSS', 'First complete projects'] },
  { year: '2024', items: ['JavaScript', 'React', 'Interface composition'] },
  { year: '2025', items: ['TypeScript', 'Full stack thinking', 'Product structure'] },
  { year: '2026', items: ['Next.js', 'Prisma', 'PostgreSQL'] },
]

const FALLBACK_COMMITS: CommitItem[] = [
  { id: 'fallback-1', message: 'Improve authentication flow', repo: 'Receitas', url: LINKS.github },
  { id: 'fallback-2', message: 'Fix mobile navigation', repo: 'Receitas', url: LINKS.github },
  { id: 'fallback-3', message: 'Refactor recipe filters', repo: 'Receitas', url: LINKS.github },
]

export default function App() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  const [commits, setCommits] = useState<CommitItem[]>(FALLBACK_COMMITS)
  const [commitStatus, setCommitStatus] = useState<'loading' | 'ready' | 'fallback'>('loading')
  const caseRef = useRef<HTMLElement | null>(null)

  const activeProject = useMemo(() => PROJECTS.find((project) => project.id === activeId) || PROJECTS[0], [activeId])

  useEffect(() => {
    let mounted = true

    fetchRecentCommits()
      .then((items) => {
        if (!mounted) return
        if (items.length) {
          setCommits(items)
          setCommitStatus('ready')
        } else {
          setCommitStatus('fallback')
        }
      })
      .catch(() => {
        if (mounted) setCommitStatus('fallback')
      })

    return () => {
      mounted = false
    }
  }, [])

  useEffect(() => {
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible')
        })
      },
      { threshold: 0.16, rootMargin: '0px 0px -80px 0px' }
    )

    revealItems.forEach((item) => observer.observe(item))

    function onScroll() {
      const y = window.scrollY
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.speed || 0.04)
        item.style.setProperty('--parallax-y', `${Math.round(y * speed)}px`)
      })
    }

    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', onScroll)
    }
  }, [])

  function openCase(projectId: string) {
    setActiveId(projectId)
    window.setTimeout(() => caseRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 40)
  }

  return (
    <main className="archiveShell" id="top">
      <nav className="archiveNav" aria-label="Primary navigation">
        <a href="#top">WESSYU ARCHIVE</a>
        <div>
          <a href="#work">Work</a>
          <a href="#case">Case</a>
          <a href="#evolution">Evolution</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="intro" aria-labelledby="intro-title">
        <p className="cornerMark">WESSYU ARCHIVE</p>
        <div className="introCenter" data-reveal>
          <h1 id="intro-title">
            SELECTED WORK
            <span>2023 - 2026</span>
          </h1>
          <p>Five projects. Three years. One transition from design to software.</p>
        </div>
        <p className="introRole">Digital Product Builder</p>
      </section>

      <section className="work" id="work" aria-label="Selected projects">
        {PROJECTS.map((project) => (
          <article className="projectScene" key={project.id}>
            <button className="projectImageButton" type="button" onClick={() => openCase(project.id)} aria-label={`Open ${project.title} case study`}>
              <img src={project.image} alt={`${project.title} project screen`} data-parallax data-speed="0.025" />
            </button>
            <div className="projectLabel" data-reveal>
              <span>
                {project.number} / {project.year}
              </span>
              <h2>{project.title}</h2>
              <p>{project.summary}</p>
            </div>
          </article>
        ))}
      </section>

      <section className="caseStudy" id="case" ref={caseRef} aria-labelledby="case-title">
        <div className="caseHeader" data-reveal>
          <div>
            <p className="metaLine">{activeProject.number} / CASE STUDY</p>
            <h2 id="case-title">{activeProject.title}</h2>
          </div>
          <p>{activeProject.summary}</p>
        </div>

        <div className="caseHero" data-reveal>
          <img src={activeProject.image} alt={`${activeProject.title} expanded project screen`} />
        </div>

        <div className="caseGrid">
          <CaseBlock title="Context" text={activeProject.context} />
          <CaseBlock title="Challenge" text={activeProject.challenge} />
          <CaseBlock title="Solution" text={activeProject.solution} />
        </div>

        <div className="architecture" data-reveal>
          <p className="metaLine">Architecture</p>
          <div className="architectureFlow">
            {activeProject.architecture.map((item, index) => (
              <div className="architectureStep" key={item}>
                <span>{item}</span>
                {index < activeProject.architecture.length - 1 ? <b aria-hidden="true">v</b> : null}
              </div>
            ))}
          </div>
        </div>

        <section className="screens" aria-label={`${activeProject.title} screens`}>
          {activeProject.screens.map((screen, index) => (
            <img key={`${screen}-${index}`} src={screen} alt={`${activeProject.title} screen ${index + 1}`} data-reveal />
          ))}
        </section>

        <div className="decisionProcess">
          <ListBlock title="Decisions" items={activeProject.decisions} />
          <ListBlock title="Process" items={activeProject.process} />
        </div>

        <div className="caseActions" data-reveal>
          <a href={activeProject.repository} target="_blank" rel="noreferrer">
            Repository
          </a>
          {activeProject.demo ? (
            <a href={activeProject.demo} target="_blank" rel="noreferrer">
              Live project
            </a>
          ) : null}
        </div>
      </section>

      <section className="evolution" id="evolution" aria-labelledby="evolution-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">Evolution</p>
          <h2 id="evolution-title">From visual studies to product systems.</h2>
        </div>
        <div className="evolutionGrid">
          {EVOLUTION.map((period) => (
            <article className="yearBlock" key={period.year} data-reveal>
              <h3>{period.year}</h3>
              {period.items.map((item) => (
                <p key={item}>{item}</p>
              ))}
            </article>
          ))}
        </div>
      </section>

      <section className="person" aria-labelledby="person-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">Person</p>
          <h2 id="person-title">Designer turned developer.</h2>
        </div>
        <p data-reveal>
          Focused on digital products, interfaces and user experience.
          <br />
          Based in Brazil.
        </p>
      </section>

      <section className="commits" aria-labelledby="commits-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">Latest commits</p>
          <h2 id="commits-title">Recent activity, pulled automatically.</h2>
        </div>
        <div className="commitList" aria-busy={commitStatus === 'loading'}>
          {commits.map((commit) => (
            <a href={commit.url} target="_blank" rel="noreferrer" key={commit.id} data-reveal>
              <span>{commit.message}</span>
              <small>{commit.repo}</small>
            </a>
          ))}
        </div>
        {commitStatus === 'fallback' ? <p className="quietNote">Showing curated examples because GitHub activity could not be loaded.</p> : null}
      </section>

      <footer className="contact" id="contact">
        <p>Interested in working together?</p>
        <div>
          <a href={LINKS.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={LINKS.email}>Email</a>
        </div>
      </footer>
    </main>
  )
}

function CaseBlock({ title, text }: { title: string; text: string }) {
  return (
    <article className="caseBlock" data-reveal>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  )
}

function ListBlock({ title, items }: { title: string; items: string[] }) {
  return (
    <article className="listBlock" data-reveal>
      <h3>{title}</h3>
      <div>
        {items.map((item) => (
          <p key={item}>{item}</p>
        ))}
      </div>
    </article>
  )
}
