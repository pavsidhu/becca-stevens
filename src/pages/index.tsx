import React from "react"

import { Layout, SEO, Intro, BlogPosts, About, Instagram } from "../components"

export default function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
      <Intro />
      <BlogPosts />
      <About />
      <Instagram />
    </Layout>
  )
}
