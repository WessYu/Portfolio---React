import type { Repo } from '../types'

const USER = 'WessYu'
const API = `https://api.github.com/users/${USER}/repos?per_page=100&sort=updated`

export async function fetchRepos(): Promise<Repo[]> {
  const res = await fetch(API, {
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (!res.ok) throw new Error('Falha ao carregar repositórios do GitHub.')

  const data = (await res.json()) as Repo[]

  return data
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}

export function repoOgImage(fullName: string) {
  return `https://opengraph.githubassets.com/wesley/${fullName}`
}

export function looksLikeVinicola(name: string) {
  const n = name.toLowerCase()
  return n.includes('vinic') || n.includes('vinicul') || n.includes('vinicola') || n.includes('vinicula')
}
