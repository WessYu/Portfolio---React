import { useEffect, useMemo, useRef, useState } from 'react'
import type { ProjectCase } from './types'

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
    repository: 'https://github.com/WessYu/Receitas',
    summary: 'Aplicacao full stack com autenticacao, favoritos, painel administrativo e banco de dados.',
    problem:
      'Queria construir algo alem de uma landing page. O objetivo era criar uma aplicacao com autenticacao, favoritos, painel administrativo e banco de dados.',
    decisions: ['Estruturacao do banco', 'Controle de permissoes', 'Upload de imagens', 'Organizacao do conteudo'],
    implementation:
      'Utilizei Next.js, Prisma e PostgreSQL para estruturar a aplicacao e permitir a administracao completa do conteudo.',
    learnings: ['Server Actions', 'Prisma', 'PostgreSQL', 'Protecao de rotas'],
    technicalNotes: ['Autenticacao', 'PostgreSQL', 'Prisma', 'Server Actions', 'Upload de imagens', 'Responsividade'],
    process: ['Ideia', 'Pesquisa', 'Wireframe', 'Desenvolvimento', 'Versao final'],
    screens: [
      { label: 'Home', src: '/projects/receitas/home.png' },
      { label: 'Busca', src: '/projects/receitas/library.png' },
      { label: 'Receita', src: '/projects/receitas/recipe.png' },
      { label: 'Painel Admin', src: '/projects/receitas/admin.png' },
    ],
  },
  {
    id: 'devmatch',
    number: '002',
    title: 'DevMatch',
    year: '2026',
    image: '/projects/devmatch/home.png',
    repository: 'https://github.com/WessYu/DEVMATCH',
    summary: 'Sistema de perfis, matches, filtros e conversas entre empresas e desenvolvedores.',
    problem:
      'Criar uma experiencia onde contratantes pudessem avaliar perfis tecnicos, salvar matches e iniciar conversas com contexto.',
    decisions: ['Sistema de perfis', 'Match de usuarios', 'Filtros por stack', 'Responsividade', 'Arquitetura de componentes'],
    implementation:
      'A interface separa fluxos de contratante e desenvolvedor, usando componentes reutilizaveis, armazenamento local e rotas protegidas por sessao.',
    learnings: ['Sessao no servidor', 'Fluxos por perfil', 'Estado persistente', 'Chat por match'],
    technicalNotes: ['Next.js', 'API routes', 'Autenticacao', 'Persistencia', 'Busca', 'Componentizacao'],
    process: ['Ideia', 'Pesquisa', 'Wireframe', 'Desenvolvimento', 'Versao final'],
    screens: [
      { label: 'Feed', src: '/projects/devmatch/feed.png' },
      { label: 'Perfil', src: '/projects/devmatch/dev.png' },
      { label: 'Match', src: '/projects/devmatch/contractor.png' },
      { label: 'Mensagens', src: '/projects/devmatch/chat.png' },
    ],
  },
  {
    id: 'logic-quest',
    number: '003',
    title: 'Logic Quest',
    year: '2025',
    image: '/projects/logic-quest/overview.png',
    repository: 'https://github.com/WessYu/Logic-quest',
    summary: 'Produto educacional com questoes, pontuacao, progresso e estrutura de jogo.',
    problem:
      'Transformar estudo de logica em uma experiencia interativa, com progresso claro e motivacao para continuar praticando.',
    decisions: ['Sistema de questoes', 'Pontuacao', 'Ranking', 'Persistencia de dados', 'Estrutura de jogo'],
    implementation:
      'O produto organiza aulas, exercicios, resultados e repeticao de pratica em um fluxo unico de aprendizado.',
    learnings: ['Modelagem de progresso', 'Feedback imediato', 'Estado de jogo', 'Organizacao de conteudo'],
    technicalNotes: ['React', 'Estado local', 'Persistencia', 'Rotas de aprendizado', 'Dashboard', 'Historico'],
    process: ['Ideia', 'Pesquisa', 'Wireframe', 'Desenvolvimento', 'Versao final'],
    screens: [
      { label: 'Dashboard', src: '/projects/logic-quest/overview.png' },
      { label: 'Questoes', src: '/projects/logic-quest/questions.png' },
      { label: 'Resultados', src: '/projects/logic-quest/results.png' },
      { label: 'Ranking', src: '/projects/logic-quest/ranking.png' },
    ],
  },
  {
    id: 'helena',
    number: '004',
    title: 'HELENA',
    year: '2025',
    image: '/projects/helena/overview.png',
    repository: 'https://github.com/WessYu',
    summary: 'Redesign com foco em hierarquia visual, conteudo, experiencia mobile e performance.',
    problem:
      'Reorganizar uma experiencia visual para comunicar melhor o valor da marca e reduzir ruido na navegacao.',
    decisions: ['Redesign completo', 'Arquitetura de conteudo', 'Hierarquia visual', 'Experiencia mobile', 'Performance'],
    implementation:
      'O projeto foi tratado como reconstrucao de interface: conteudo mais direto, secoes mais claras e acabamento responsivo.',
    learnings: ['Direcao visual', 'Ritmo de leitura', 'Mobile first', 'Performance percebida'],
    technicalNotes: ['React', 'CSS responsivo', 'SEO basico', 'Imagens otimizadas', 'Layout editorial'],
    process: ['Ideia', 'Pesquisa', 'Wireframe', 'Desenvolvimento', 'Versao final'],
    screens: [
      { label: 'Home', src: '/projects/helena/overview.png' },
      { label: 'Painel', src: '/projects/helena/after.png' },
      { label: 'Mobile', src: '/projects/helena/mobile.png' },
    ],
  },
  {
    id: 'differenza',
    number: '005',
    title: 'Differenza',
    year: '2024',
    image: '/projects/differenza/after.png',
    repository: 'https://github.com/WessYu',
    summary: 'Estudo de melhoria visual mostrando antes, depois, problemas encontrados e solucoes aplicadas.',
    problem:
      'Analisar uma interface com problemas de hierarquia, espacamento e clareza para reconstruir a experiencia com mais intencao.',
    decisions: ['Antes e depois', 'Problemas encontrados', 'Solucoes aplicadas', 'Reorganizacao visual'],
    implementation:
      'A revisao concentrou a mensagem principal, reduziu elementos concorrentes e criou uma composicao mais legivel.',
    learnings: ['Auditoria visual', 'Contraste', 'Hierarquia', 'Consistencia de interface'],
    technicalNotes: ['HTML', 'CSS', 'Responsividade', 'Refatoracao visual', 'Acessibilidade basica'],
    process: ['Ideia', 'Pesquisa', 'Wireframe', 'Desenvolvimento', 'Versao final'],
    screens: [
      { label: 'Antes', src: '/projects/differenza/overview.svg' },
      { label: 'Depois', src: '/projects/differenza/after.png' },
      { label: 'Solucoes', src: '/projects/differenza/solutions.png' },
    ],
  },
]

const EVOLUTION = [
  { year: '2023', items: ['HTML', 'CSS', 'Primeiros projetos'] },
  { year: '2024', items: ['JavaScript', 'React', 'Interfaces'] },
  { year: '2025', items: ['TypeScript', 'Arquitetura', 'Projetos maiores'] },
  { year: '2026', items: ['Next.js', 'Prisma', 'PostgreSQL'] },
]

const CURRENT_FOCUS = ['Receitas', 'DevMatch', 'Arquitetura full stack', 'Experiencia do usuario']

export default function App() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  const caseRef = useRef<HTMLElement | null>(null)

  const activeProject = useMemo(() => PROJECTS.find((project) => project.id === activeId) || PROJECTS[0], [activeId])

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
          <a href="#top">Archive</a>
          <a href="#projects">Projects</a>
          <a href="#process">Process</a>
          <a href="#person">Person</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section className="intro" aria-labelledby="intro-title">
        <p className="cornerMark">WESSYU ARCHIVE</p>
        <div className="introCenter" data-reveal>
          <h1 id="intro-title">SELECTED WORK</h1>
          <p>
            Projetos criados durante minha transicao
            <br />
            do design para o desenvolvimento.
          </p>
          <span>2023 - 2026</span>
        </div>
        <p className="introRole">
          Designer grafico desde 2020.
          <br />
          Desenvolvedor front-end desde 2023.
          <br />
          Hoje construo interfaces, aplicacoes e produtos digitais utilizando React, Next.js e TypeScript.
        </p>
      </section>

      <section className="why" aria-labelledby="why-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">WHY</p>
          <h2 id="why-title">
            Nao venho da computacao.
            <br />
            Comecei pelo design.
          </h2>
        </div>
        <p data-reveal>
          Aprendi desenvolvimento para construir
          <br />
          as experiencias que imaginava.
        </p>
      </section>

      <section className="work" id="projects" aria-label="Selected projects">
        {PROJECTS.map((project) => (
          <article className="projectScene" key={project.id}>
            <button className="projectImageButton" type="button" onClick={() => openCase(project.id)} aria-label={`Abrir estudo de caso ${project.title}`}>
              <img src={project.image} alt={`Tela do projeto ${project.title}`} data-parallax data-speed="0.025" />
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
            <p className="metaLine">{activeProject.number} / ESTUDO DE CASO</p>
            <h2 id="case-title">{activeProject.title}</h2>
          </div>
          <p>{activeProject.summary}</p>
        </div>

        <div className="caseHero" data-reveal>
          <img src={activeProject.image} alt={`${activeProject.title} em destaque`} />
        </div>

        <div className="caseGrid">
          <CaseBlock title="Problema" text={activeProject.problem} />
          <ListBlock title="Decisoes" items={activeProject.decisions} />
          <CaseBlock title="Implementacao" text={activeProject.implementation} />
          <ListBlock title="Aprendizados" items={activeProject.learnings} />
        </div>

        <div className="technicalNotes" data-reveal>
          <p className="metaLine">TECHNICAL NOTES</p>
          <div className="noteGrid">
            {activeProject.technicalNotes.map((note) => (
              <span key={note}>{note}</span>
            ))}
          </div>
        </div>

        <section className="screens" aria-label={`Telas do projeto ${activeProject.title}`}>
          {activeProject.screens.map((screen) => (
            <figure key={`${activeProject.id}-${screen.label}`} data-reveal>
              <figcaption>{screen.label}</figcaption>
              <img src={screen.src} alt={`${activeProject.title} - ${screen.label}`} />
            </figure>
          ))}
        </section>

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

      <section className="process" id="process" aria-labelledby="process-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">PROCESS</p>
          <h2 id="process-title">Como os projetos saem da ideia para a versao final.</h2>
        </div>
        <div className="processRail">
          {['Ideia', 'Pesquisa', 'Wireframe', 'Desenvolvimento', 'Versao final'].map((step, index) => (
            <article key={step} data-reveal>
              <span>{String(index + 1).padStart(2, '0')}</span>
              <p>{step}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="evolution" id="evolution" aria-labelledby="evolution-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">EVOLUTION</p>
          <h2 id="evolution-title">Uma evolucao simples, mas acumulativa.</h2>
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

      <section className="person" id="person" aria-labelledby="person-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">PERSON</p>
          <h2 id="person-title">Designer desde 2020. Desenvolvedor desde 2023.</h2>
        </div>
        <p data-reveal>
          Baseado no Rio Grande do Sul.
          <br />
          Interesse em produtos digitais, interfaces e experiencia do usuario.
        </p>
      </section>

      <section className="focus" aria-labelledby="focus-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">CURRENT FOCUS</p>
          <h2 id="focus-title">O que esta recebendo mais atencao agora.</h2>
        </div>
        <div className="focusGrid">
          {CURRENT_FOCUS.map((item) => (
            <p key={item} data-reveal>
              {item}
            </p>
          ))}
        </div>
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
