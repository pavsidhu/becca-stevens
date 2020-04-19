import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/SEO"
import Intro from "../components/Intro"

export default function IndexPage() {
  return (
    <Layout>
      <SEO title="Home" />
      <Intro />
    </Layout>
  )
}
