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
    image: '/projects/receitas/home.webp',
    imageAlt: 'Página inicial do Receitas com catálogo editorial de receitas',
    imageWidth: 1440,
    imageHeight: 1200,
    repository: 'https://github.com/WessYu/Receitas',
    demo: 'https://receitas-delta-eight.vercel.app',
    summary: 'Aplicação full stack de receitas com autenticação, sessões, favoritos e painel administrativo.',
    problem:
      'Criar uma aplicação real de receitas, com usuário comum, administrador, busca, filtros, comentários e conteúdo gerenciado sem editar código.',
    decisions: [
      'Modelagem de usuários, receitas e favoritos',
      'Controle de permissões entre usuário e administrador',
      'Sessões e proteção de rotas',
      'Upload de imagens pelo painel',
    ],
    implementation:
      'Usei Next.js, Prisma e PostgreSQL para estruturar usuários, receitas, favoritos e comentários, mantendo o painel administrativo separado do fluxo público.',
    learnings: ['Autenticação com sessão', 'Relacionamentos no Prisma', 'Busca e filtros', 'Revisão mobile'],
    technicalNotes: [
      'Autenticação',
      'Sessões',
      'PostgreSQL',
      'Prisma',
      'Favoritos',
      'Comentários',
      'Busca',
      'Filtros',
      'Upload de imagens',
      'Rotas protegidas',
      'Painel administrativo',
    ],
    process: [
      'Definição das entidades',
      'Modelagem do banco',
      'Fluxo de autenticação',
      'Painel administrativo',
      'Revisão mobile',
    ],
    screens: [
      {
        label: 'Home',
        src: '/projects/receitas/home.webp',
        alt: 'Home do Receitas com chamada principal e receitas em destaque',
        width: 1440,
        height: 1200,
      },
      {
        label: 'Busca e filtros',
        src: '/projects/receitas/library.webp',
        alt: 'Tela de busca do Receitas com filtros e lista de receitas',
        width: 1206,
        height: 1067,
      },
      {
        label: 'Receita',
        src: '/projects/receitas/recipe.webp',
        alt: 'Página de receita com ingredientes, preparo e informações da receita',
        width: 1235,
        height: 1071,
      },
      {
        label: 'Área do usuário',
        src: '/projects/receitas/user.webp',
        alt: 'Área de usuário do Receitas com conteúdo salvo e navegação interna',
        width: 1440,
        height: 1200,
      },
      {
        label: 'Painel administrativo',
        src: '/projects/receitas/admin.webp',
        alt: 'Painel administrativo do Receitas para gerenciar conteúdo',
        width: 1150,
        height: 1060,
      },
    ],
  },
  {
    id: 'devmatch',
    number: '002',
    title: 'DevMatch',
    year: '2026',
    image: '/projects/devmatch/home.webp',
    imageAlt: 'Workspace do DevMatch com shortlist técnica e visão de contratação',
    imageWidth: 1120,
    imageHeight: 900,
    repository: 'https://github.com/WessYu/DEVMATCH',
    demo: 'https://devmatch-neon.vercel.app',
    summary: 'Workspace de contratação com perfis de empresa e desenvolvedor, matches, feed e chat.',
    problem:
      'Separar o fluxo de quem contrata do fluxo de quem busca oportunidade, mantendo contexto técnico, compatibilidade e conversa no mesmo produto.',
    decisions: [
      'Separação dos fluxos de empresa e desenvolvedor',
      'Filtros por stack e perfil',
      'Criação dos matches',
      'Integração das mensagens ao match',
    ],
    implementation:
      'A interface organiza feed, workspace da empresa, console do desenvolvedor, compatibilidade e mensagens, com persistência para manter o estado entre sessões.',
    learnings: ['Perfis com papéis diferentes', 'Compatibilidade por stack', 'Chat contextual', 'Persistência de dados'],
    technicalNotes: ['Perfis', 'Filtros por stack', 'Compatibilidade', 'Matches', 'Feed', 'Chat', 'Persistência'],
    process: [
      'Mapeamento dos perfis',
      'Estruturação dos workspaces',
      'Sistema de compatibilidade',
      'Criação dos matches',
      'Conversas',
    ],
    screens: [
      {
        label: 'Feed',
        src: '/projects/devmatch/feed.webp',
        alt: 'Feed do DevMatch com vagas e publicações',
        width: 1120,
        height: 900,
      },
      {
        label: 'Workspace da empresa',
        src: '/projects/devmatch/home.webp',
        alt: 'Workspace da empresa no DevMatch com pipeline e candidatos',
        width: 1120,
        height: 900,
      },
      {
        label: 'Perfil do desenvolvedor',
        src: '/projects/devmatch/dev.webp',
        alt: 'Console do desenvolvedor no DevMatch com perfil técnico',
        width: 1120,
        height: 900,
      },
      {
        label: 'Matches',
        src: '/projects/devmatch/contractor.webp',
        alt: 'Área de matches do DevMatch com shortlist técnica',
        width: 1120,
        height: 900,
      },
      {
        label: 'Mensagens',
        src: '/projects/devmatch/chat.webp',
        alt: 'Chat do DevMatch conectado ao match',
        width: 1120,
        height: 900,
      },
    ],
  },
  {
    id: 'logic-quest',
    number: '003',
    title: 'Logic Quest',
    year: '2025',
    image: '/projects/logic-quest/overview.webp',
    imageAlt: 'Interface do Logic Quest com módulos, progresso e checkpoint',
    imageWidth: 1440,
    imageHeight: 900,
    repository: 'https://github.com/WessYu/Logic-quest',
    demo: 'https://wessyu.github.io/Logic-quest/',
    summary: 'Plataforma de estudo com módulos, lições, prática guiada, checkpoints, XP e PWA.',
    problem:
      'Transformar estudo de lógica em uma experiência prática, com módulos organizados, progresso salvo no navegador e feedback claro ao concluir checkpoints.',
    decisions: [
      'Persistência do progresso no navegador',
      'Lições em fluxo guiado',
      'XP liberado por checkpoint',
      'Adaptação responsiva para estudo no celular',
    ],
    implementation:
      'O produto combina módulos, lições, prática guiada, checkpoints e instalação PWA, salvando progresso e preferências em localStorage.',
    learnings: ['Modelagem do progresso', 'Feedback de checkpoint', 'Estado local persistente', 'Interface responsiva'],
    technicalNotes: ['Módulos', 'Lições', 'Prática guiada', 'Checkpoints', 'XP', 'Progresso', 'localStorage', 'PWA'],
    process: [
      'Organização dos módulos',
      'Modelagem do progresso',
      'Construção das lições',
      'XP e checkpoints',
      'Adaptação responsiva',
    ],
    screens: [
      {
        label: 'Módulos',
        src: '/projects/logic-quest/overview.webp',
        alt: 'Visão geral do Logic Quest com estrutura de módulos',
        width: 1440,
        height: 900,
      },
      {
        label: 'Lições',
        src: '/projects/logic-quest/questions.webp',
        alt: 'Tela de lição e checkpoint do Logic Quest',
        width: 1440,
        height: 900,
      },
      {
        label: 'Progresso',
        src: '/projects/logic-quest/results.webp',
        alt: 'Tela de resultado e progresso do Logic Quest',
        width: 1440,
        height: 900,
      },
      {
        label: 'Mobile',
        src: '/projects/logic-quest/ranking.webp',
        alt: 'Versão mobile do Logic Quest com navegação adaptada',
        width: 390,
        height: 844,
      },
    ],
  },
  {
    id: 'helena',
    number: '004',
    title: 'HELENA',
    year: '2025',
    image: '/projects/helena/overview.webp',
    imageAlt: 'Site HELENA com hero jurídico, texto institucional e foto das advogadas',
    imageWidth: 1440,
    imageHeight: 900,
    repository: 'https://github.com/WessYu/HELENA',
    demo: 'https://wessyu.github.io/HELENA/',
    summary: 'Site jurídico com formulário de análise, protocolos, contatos, newsletter e painel administrativo.',
    problem:
      'Levar um site institucional além da apresentação visual, criando entrada de solicitações, consulta de protocolo e gestão interna dos atendimentos.',
    decisions: [
      'Formulário de análise jurídica',
      'Geração e consulta de protocolo',
      'Persistência em JSON',
      'Painel administrativo para atualização de status',
    ],
    implementation:
      'O repositório inclui site estático, servidor local em Python, arquivos JSON para contatos, newsletter e solicitações, além de um painel para acompanhar protocolos.',
    learnings: ['Fluxo de protocolo', 'Validação de formulários', 'Armazenamento em JSON', 'Área administrativa'],
    technicalNotes: [
      'Análise jurídica',
      'Consulta de protocolo',
      'Contatos',
      'Newsletter',
      'Painel administrativo',
      'Status do atendimento',
      'Persistência em JSON',
    ],
    process: [
      'Análise do conteúdo',
      'Reorganização das áreas jurídicas',
      'Formulários',
      'Sistema de protocolos',
      'Painel administrativo',
    ],
    screens: [
      {
        label: 'Home',
        src: '/projects/helena/overview.webp',
        alt: 'Página inicial do site HELENA',
        width: 1440,
        height: 900,
      },
      {
        label: 'Formulários e painel',
        src: '/projects/helena/after.webp',
        alt: 'Tela do HELENA com formulários e área administrativa',
        width: 1440,
        height: 900,
      },
      {
        label: 'Mobile',
        src: '/projects/helena/mobile.webp',
        alt: 'Versão mobile do site HELENA',
        width: 390,
        height: 844,
      },
    ],
  },
  {
    id: 'differenza',
    number: '005',
    title: 'Differenza',
    year: '2024',
    image: '/projects/differenza/after.webp',
    imageAlt: 'Redesign Differenza com hero dividido entre texto editorial e foto real do salão',
    imageWidth: 1440,
    imageHeight: 900,
    repository: 'https://github.com/WessYu/differenza-redesign',
    demo: 'https://wessyu.github.io/differenza-redesign/',
    summary: 'Redesign real com comparação antes e depois, serviços, unidades, agendamento e painel.',
    problem:
      'Revisar uma interface anterior com excesso de ruído visual, baixa hierarquia e navegação pouco clara, mantendo a marca reconhecível.',
    decisions: [
      'Auditoria do site original',
      'Nova arquitetura de conteúdo',
      'Reestruturação da navegação mobile',
      'Comparação visual entre antes e depois',
    ],
    implementation:
      'A nova versão reorganiza hero, serviços, espaço, unidades e chamadas de agendamento, usando fotos reais e uma direção visual mais consistente.',
    learnings: ['Auditoria visual', 'Hierarquia de conteúdo', 'Serviços e unidades', 'Comparação antes e depois'],
    technicalNotes: ['Redesign', 'Site anterior', 'Serviços', 'Unidades', 'Agendamento', 'Painel', 'Antes e depois'],
    process: [
      'Auditoria do site original',
      'Direção visual',
      'Reorganização do conteúdo',
      'Implementação',
      'Comparação antes e depois',
    ],
    screens: [
      {
        label: 'Antes',
        src: '/projects/differenza/overview.webp',
        alt: 'Tela anterior do site Differenza usada como referência de comparação',
        width: 1900,
        height: 1080,
      },
      {
        label: 'Depois',
        src: '/projects/differenza/after.webp',
        alt: 'Nova página inicial do Differenza',
        width: 1440,
        height: 900,
      },
      {
        label: 'Serviços',
        src: '/projects/differenza/services.webp',
        alt: 'Seção de serviços do redesign Differenza',
        width: 1440,
        height: 900,
      },
      {
        label: 'O espaço',
        src: '/projects/differenza/experience.webp',
        alt: 'Seção sobre a experiência e o espaço do Differenza',
        width: 1440,
        height: 900,
      },
      {
        label: 'Unidades',
        src: '/projects/differenza/units.webp',
        alt: 'Seção de unidades do redesign Differenza',
        width: 1440,
        height: 900,
      },
    ],
  },
]

const EVOLUTION = [
  { year: '2023', items: ['HTML', 'CSS', 'Primeiros projetos'] },
  { year: '2024', items: ['JavaScript', 'React', 'Interfaces responsivas'] },
  { year: '2025', items: ['TypeScript', 'Produtos com estado', 'Fluxos completos'] },
  { year: '2026', items: ['Next.js', 'Prisma', 'PostgreSQL'] },
]

export default function App() {
  const [activeId, setActiveId] = useState(PROJECTS[0].id)
  const caseRef = useRef<HTMLElement | null>(null)

  const activeProject = useMemo(() => PROJECTS.find((project) => project.id === activeId) || PROJECTS[0], [activeId])

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const isSmallScreen = window.matchMedia('(max-width: 720px)').matches
    const revealItems = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'))
    const parallaxItems = Array.from(document.querySelectorAll<HTMLElement>('[data-parallax]'))

    if (prefersReducedMotion) {
      revealItems.forEach((item) => item.classList.add('is-visible'))
      return
    }

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
      if (isSmallScreen) return
      const y = window.scrollY
      parallaxItems.forEach((item) => {
        const speed = Number(item.dataset.speed || 0.02)
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
      <nav className="archiveNav" aria-label="Navegação principal">
        <a href="#top">WESSYU ARQUIVO</a>
        <div>
          <a href="#top">Arquivo</a>
          <a href="#projects">Projetos</a>
          <a href="#process">Processo</a>
          <a href="#person">Pessoa</a>
          <a href="#contact">Contato</a>
        </div>
      </nav>

      <section className="intro" aria-labelledby="intro-title">
        <p className="cornerMark">WESSYU ARQUIVO</p>
        <div className="introCenter" data-reveal>
          <h1 id="intro-title">TRABALHOS SELECIONADOS</h1>
          <p>Projetos criados durante minha transição do design para o desenvolvimento.</p>
          <span>2023 — 2026</span>
        </div>
        <p className="introRole">
          Designer desde 2020.
          <br />
          Desenvolvedor front-end desde 2023.
          <br />
          Construo interfaces e aplicações web.
        </p>
      </section>

      <section className="why" aria-labelledby="why-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">POR QUÊ</p>
          <h2 id="why-title">Não comecei pela programação.</h2>
        </div>
        <p data-reveal>
          Comecei pelo design e aprendi desenvolvimento para transformar minhas ideias em produtos reais.
        </p>
      </section>

      <section className="work" id="projects" aria-label="Projetos selecionados">
        {PROJECTS.map((project) => (
          <article className="projectScene" key={project.id}>
            <button className="projectImageButton" type="button" onClick={() => openCase(project.id)} aria-label={`Abrir estudo de caso ${project.title}`}>
              <img
                src={project.image}
                alt={project.imageAlt}
                width={project.imageWidth}
                height={project.imageHeight}
                loading="lazy"
                decoding="async"
                data-parallax
                data-speed="0.018"
              />
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
          <img
            src={activeProject.image}
            alt={activeProject.imageAlt}
            width={activeProject.imageWidth}
            height={activeProject.imageHeight}
            loading="lazy"
            decoding="async"
          />
        </div>

        <div className="caseGrid">
          <CaseBlock title="Problema" text={activeProject.problem} />
          <ListBlock title="Decisões" items={activeProject.decisions} />
          <CaseBlock title="Implementação" text={activeProject.implementation} />
          <ListBlock title="Aprendizados" items={activeProject.learnings} />
        </div>

        <div className="technicalNotes" data-reveal>
          <p className="metaLine">Notas técnicas</p>
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
              <img src={screen.src} alt={screen.alt} width={screen.width} height={screen.height} loading="lazy" decoding="async" />
            </figure>
          ))}
        </section>

        <div className="caseActions" data-reveal>
          <a href={activeProject.demo} target="_blank" rel="noreferrer">
            Ver projeto
          </a>
          <a href={activeProject.repository} target="_blank" rel="noreferrer">
            Ver código
          </a>
        </div>
      </section>

      <section className="process" id="process" aria-labelledby="process-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">Processo</p>
          <h2 id="process-title">Decisões específicas de cada projeto.</h2>
        </div>
        <div className="projectProcessGrid">
          {PROJECTS.map((project) => (
            <article className="projectProcessCard" key={`${project.id}-process`} data-reveal>
              <span>{project.number}</span>
              <h3>{project.title}</h3>
              <ol>
                {project.process.map((step) => (
                  <li key={step}>{step}</li>
                ))}
              </ol>
            </article>
          ))}
        </div>
      </section>

      <section className="evolution" id="evolution" aria-labelledby="evolution-title">
        <div className="sectionTitle" data-reveal>
          <p className="metaLine">Evolução</p>
          <h2 id="evolution-title">Uma trajetória simples, acumulativa e prática.</h2>
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
          <p className="metaLine">Pessoa</p>
          <h2 id="person-title">Designer desde 2020. Desenvolvedor front-end desde 2023.</h2>
        </div>
        <p data-reveal>
          Baseado no Brasil.
          <br />
          Focado em interfaces, aplicações web e produtos digitais.
        </p>
      </section>

      <footer className="contact" id="contact">
        <p>Estou buscando oportunidades para trabalhar com front-end e produtos digitais.</p>
        <div>
          <a href={LINKS.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={LINKS.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a href={LINKS.email}>E-mail</a>
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
