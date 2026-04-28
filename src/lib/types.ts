export interface PostIndex {
  // `title` is the stable post title from the API response.
  title: string;
  path: string;
  description: string;
  published_at: string;
  // `heading` is an optional display-oriented heading used by some older entries.
  heading: string;
}

export interface PostContent {
  title: string;
  path: string;
  html_text: string;
  published_at: string;
}

export interface ContentBlock {
  type: 'text' | 'code';
  content: string;
}
