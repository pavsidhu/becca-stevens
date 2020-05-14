import React from "react"

import { SEO, Intro, BlogPostReel, About, Instagram } from "../components"

export default function IndexPage() {
  return (
    <>
      <SEO title="Home" />
      <Intro />
      <BlogPostReel />
      <About />
      <Instagram />
    </>
  )
}
