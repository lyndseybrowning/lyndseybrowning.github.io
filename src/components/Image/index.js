import React from 'react'
import PropTypes from 'prop-types'
import query from './query'
import Img from 'gatsby-image'
import { StaticQuery } from 'gatsby'

const renderImage = file => <Img fluid={file.node.childImageSharp.fluid} />

const Image = ({ src }) => (
  <StaticQuery
    query={query}
    variables={{ src }}
    render={({ images }) =>
      renderImage(images.edges.find(image => image.node.relativePath === src))
    }
  />
)

Image.propTypes = {
  src: PropTypes.string.isRequired,
}

export default Image
