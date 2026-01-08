import type { ProjectLike } from '../types'

export function ProjectCard({ p, featured = false }: { p: ProjectLike; featured?: boolean }) {
  return (
    <article className={featured ? 'card cardFeatured' : 'card'}>
      <div className="thumb" aria-hidden="true">
        <img loading="lazy" src={p.imageUrl} alt="" />
      </div>

      <div className="cardBody">
        <div className="cardTop">
          <h3>{p.title}</h3>
          <div className="meta">
            {p.tags?.slice(0, 3).map((t) => (
              <span key={t} className="chip">
                {t}
              </span>
            ))}
            {p.updatedAt ? <span className="chip subtle">Atualizado {p.updatedAt}</span> : null}
          </div>
        </div>

        <p className="muted">{p.description}</p>

        <div className="actions">
          {p.demoUrl ? (
            <a className="btn primary" href={p.demoUrl} target="_blank" rel="noreferrer">
              Demo
            </a>
          ) : null}
          <a className="btn" href={p.codeUrl} target="_blank" rel="noreferrer">
            Código
          </a>
        </div>
      </div>
    </article>
  )
}
