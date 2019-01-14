import { Link } from 'gatsby'
import PropTypes from 'prop-types'
import React from 'react'

const Header = ({ siteTitle, description }) => (
  <header>
    <h1>
      <Link to="/">{siteTitle}</Link>
    </h1>
    <h2>
      {description}
      {console.log(description)}
    </h2>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  description: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
  description: ``,
}

export default Header
