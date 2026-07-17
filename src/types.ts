export type GitHubEvent = {
  id: string
  type: string
  repo: {
    name: string
  }
  payload?: {
    commits?: Array<{
      sha: string
      message: string
      url?: string
    }>
  }
}

export type CommitItem = {
  id: string
  message: string
  repo: string
  url: string
}

export type ProjectCase = {
  id: string
  number: string
  title: string
  year: string
  image: string
  screens: string[]
  repository: string
  demo?: string
  summary: string
  context: string
  challenge: string
  solution: string
  decisions: string[]
  process: string[]
  architecture: string[]
}
