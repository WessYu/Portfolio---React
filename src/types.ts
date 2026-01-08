export type Repo = {
  id: number
  name: string
  full_name: string
  html_url: string
  description: string | null
  homepage: string | null
  language: string | null
  stargazers_count: number
  forks_count: number
  updated_at: string
  fork: boolean
  archived: boolean
}


export type ProjectLike = {
  key: string
  title: string
  description: string
  imageUrl: string
  codeUrl: string
  demoUrl?: string | null
  tags?: string[]
  updatedAt?: string
}
