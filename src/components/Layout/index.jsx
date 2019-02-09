import React, { Fragment } from "react"
import PropTypes from "prop-types"
import { StaticQuery } from "gatsby"
import query from "./query"
import Header from "../Header"

const Layout = ({ children }) => (
  <StaticQuery
    query={query}
    render={data => (
      <Fragment>
        <Header
          siteTitle={data.site.siteMetadata.title}
          description={data.site.siteMetadata.description}
        />
        <div>
          {children}
          <footer />
        </div>
      </Fragment>
    )}
  />
)

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
