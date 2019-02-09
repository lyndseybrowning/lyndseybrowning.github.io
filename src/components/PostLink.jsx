import React from "react"
import PropTypes from "prop-types"
import { Link } from "gatsby"

const PostLink = ({ post }) => (
  <div>
    <Link to={post.frontmatter.path}>
      {post.frontmatter.title}
      {" "}
      {post.frontmatter.date}
    </Link>
  </div>
)

PostLink.propTypes = {
  post: PropTypes.shape({
    frontmatter: PropTypes.shape({}),
  }).isRequired,
}

export default PostLink
