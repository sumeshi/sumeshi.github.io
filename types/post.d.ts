export interface PostIndex {
  title: string
  path: string
  description: string
  published_at: string
  heading: string
}

export interface PostContent {
  title: string
  path: string
  html_text: string
  published_at: string
}

export interface Contents {
  type: string
  content: string
}
