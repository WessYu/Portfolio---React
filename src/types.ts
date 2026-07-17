export type ProjectScreen = {
  label: string
  src: string
  alt: string
  width: number
  height: number
}

export type ProjectCase = {
  id: string
  number: string
  title: string
  year: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  repository: string
  demo: string
  summary: string
  problem: string
  decisions: string[]
  implementation: string
  learnings: string[]
  technicalNotes: string[]
  process: string[]
  screens: ProjectScreen[]
}
