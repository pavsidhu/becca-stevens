import React from "react"

import {
  Layout,
  SEO,
  Intro,
  BlogPostReel,
  About,
  Instagram,
} from "../components"

export default function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
      <Intro />
      <BlogPostReel />
      <About />
      <Instagram />
    </Layout>
  )
}
