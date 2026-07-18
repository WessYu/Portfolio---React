import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

type Technology = {
  name: string
  category: string
  icon: string
}

const TECHNOLOGIES: Technology[] = [
  { name: 'React', category: 'Front-end', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg' },
  { name: 'TypeScript', category: 'Front-end', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg' },
  { name: 'JavaScript', category: 'Front-end', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg' },
  { name: 'Next.js', category: 'Front-end', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg' },
  { name: 'HTML5', category: 'Interface', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg' },
  { name: 'CSS3', category: 'Interface', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg' },
  { name: 'Tailwind CSS', category: 'Interface', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg' },
  { name: 'Vite', category: 'Ferramentas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg' },
  { name: 'Node.js', category: 'Back-end', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg' },
  { name: 'Prisma', category: 'Dados', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/prisma/prisma-original.svg' },
  { name: 'PostgreSQL', category: 'Dados', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg' },
  { name: 'Git', category: 'Ferramentas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg' },
  { name: 'GitHub', category: 'Ferramentas', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/github/github-original.svg' },
  { name: 'Figma', category: 'Design', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg' },
]

export function TechStack() {
  const [target, setTarget] = useState<HTMLElement | null>(null)

  useEffect(() => {
    const aboutSection = document.querySelector<HTMLElement>('#sobre')
    if (!aboutSection?.parentElement) return

    const container = document.createElement('div')
    container.id = 'tech-stack-portal'
    aboutSection.parentElement.insertBefore(container, aboutSection)
    setTarget(container)

    return () => container.remove()
  }, [])

  if (!target) return null

  return createPortal(
    <section className="techStack" id="tecnologias" aria-labelledby="tech-stack-title">
      <div className="sectionTitle is-visible">
        <p className="metaLine">Tecnologias</p>
        <h2 id="tech-stack-title">Ferramentas que uso para transformar ideias em produtos.</h2>
      </div>

      <div className="techGrid is-visible">
        {TECHNOLOGIES.map((technology, index) => (
          <article className="techCard" key={technology.name}>
            <div className="techIconFrame">
              <img src={technology.icon} alt="" width="44" height="44" loading="lazy" decoding="async" />
            </div>
            <div>
              <span>{technology.category}</span>
              <h3>{technology.name}</h3>
            </div>
            <b aria-hidden="true">{String(index + 1).padStart(2, '0')}</b>
          </article>
        ))}
      </div>
    </section>,
    target,
  )
}
