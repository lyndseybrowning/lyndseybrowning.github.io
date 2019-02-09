import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/Layout"
import Image from "../components/Image"
import SEO from "../components/seo"
import PostLink from "../components/PostLink"

const IndexPage = ({
  data: {
    allMarkdownRemark: { edges },
  },
}) => {
  console.log(data)
  const renderPosts = () => edges.map(({ node }) => <PostLink key={node.id} post={node} />)

  return (
    <Layout>
      <SEO title="Home" keywords={["gatsby", "application", "react"]} />
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <div style={{ maxWidth: "300px", marginBottom: "1.45rem" }}>
        <Image src="images/gatsby-astronaut.png" />
      </div>
      <div>{renderPosts()}</div>
      <Link to="/page-2/">Go to page 2</Link>
    </Layout>
  )
}

export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          id
          excerpt(pruneLength: 250)
          frontmatter {
            date(formatString: "DD MMMM, YYYY")
            path
            title
          }
        }
      }
    }
  }
`

export default IndexPage
