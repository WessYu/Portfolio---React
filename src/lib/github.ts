import type { CommitItem, GitHubEvent } from '../types'

const USER = 'WessYu'
const EVENTS_API = `https://api.github.com/users/${USER}/events/public?per_page=30`

export async function fetchRecentCommits(): Promise<CommitItem[]> {
  const res = await fetch(EVENTS_API, {
    headers: { Accept: 'application/vnd.github+json' },
  })

  if (!res.ok) throw new Error('Could not load GitHub activity.')

  const events = (await res.json()) as GitHubEvent[]

  return events
    .filter((event) => event.type === 'PushEvent' && event.payload?.commits?.length)
    .flatMap((event) =>
      (event.payload?.commits || []).map((commit) => {
        const repo = event.repo.name.replace(`${USER}/`, '')
        return {
          id: `${event.id}-${commit.sha}`,
          message: commit.message.split('\n')[0],
          repo,
          url: `https://github.com/${event.repo.name}/commit/${commit.sha}`,
        }
      })
    )
    .slice(0, 6)
}
