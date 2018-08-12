import React from 'react'
import PropTypes from 'prop-types'

const Button = ({ children, ...props }) => (
  <button {...props}>
    {children}
  </button>
)

Button.defaultProps = {
  children: null,
}

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
  ]),
}

export default Button
