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
    .filter((repo) => !repo.fork && !repo.archived)
    .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
}

export function looksLikeVinicola(name: string) {
  const normalized = name.toLowerCase()
  return normalized.includes('vinic') || normalized.includes('vinicul') || normalized.includes('vinicola') || normalized.includes('vinicula')
}
