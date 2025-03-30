export interface BlogPost {
  
    id: number
    status: 'published' | 'draft'
    date_created: string
    date_updated: string
    title: string
    slug: string
    body: string
    thumbnail: string
    category: string
    sub_category: string
    views: number
    trending: boolean
  }