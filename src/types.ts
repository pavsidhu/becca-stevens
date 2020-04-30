interface GetBlogPosts {
  allMarkdownRemark: {
    edges: {
      node: BlogPost
    }[]
  }
}

interface BlogPost {
  id: string
  frontmatter: {
    title: string
    date: string
    coverImage: string
  }
  fields: {
    slug: string
  }
}
