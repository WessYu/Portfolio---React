import type { ProjectLike } from '../types'

export function ProjectCard({ p, featured = false }: { p: ProjectLike; featured?: boolean }) {
  return (
    <article className={featured ? 'card cardFeatured' : 'card'} data-reveal>
      <div className="thumb">
        <div className="thumbChrome" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
        <img loading="lazy" src={p.imageUrl} alt={`Capa do projeto ${p.title}`} />
        <div className="thumbOverlay">
          <span>{p.eyebrow || (featured ? 'Projeto em destaque' : 'Projeto publicado')}</span>
        </div>
      </div>

      <div className="cardBody">
        <div className="cardHead">
          <div className="cardTop">
            <p className="cardEyebrow">{p.eyebrow || 'Case visual'}</p>
            <h3>{p.title}</h3>
          </div>
          {p.updatedAt ? <span className="chip subtle">Atualizado {p.updatedAt}</span> : null}
        </div>

        <p className="cardDescription">{p.description}</p>
        {p.note ? <p className="cardNote">{p.note}</p> : null}

        {p.tags?.length ? (
          <div className="meta">
            {p.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="chip">
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <div className="actions">
          {p.demoUrl ? (
            <a className="btn primary" href={p.demoUrl} target="_blank" rel="noreferrer">
              {p.ctaLabel || 'Abrir projeto'}
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
