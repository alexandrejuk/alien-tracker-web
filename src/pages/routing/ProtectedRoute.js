import React, { PureComponent } from 'react'
import { intersection, pathOr } from 'ramda'
import { Redirect, Route } from 'react-router-dom'
import PropTypes from 'prop-types'

const RedirectComponent = () => (<Redirect to="/login" />)

class PrivateRoute extends PureComponent {
  isLogged = () => Boolean(this.props.user)

  isAllowed = () => {
    const { user, permissions } = this.props
    const getUserRoles = pathOr([], ['login', 'tipo'])
    const roles = getUserRoles(user)

    const isAllAllowed = permissions.some(item => item === '*')
    const isUserAllowed = intersection(permissions)(roles).length > 0

    return isAllAllowed || isUserAllowed
  }

  render = () => {
    const {
      component: PrivateComponent,
      ...rest
    } = this.props

    const RenderComponent = this.isLogged() && this.isAllowed()
      ? PrivateComponent
      : RedirectComponent

    return (
      <Route
        {...rest}
        render={RenderComponent}
      />
    )
  }
}

PrivateRoute.defaultProps = {
  permissions: [],
}

PrivateRoute.propTypes = {
  permissions: PropTypes.arrayOf(PropTypes.string),
  user: PropTypes.shape({
    login: PropTypes.shape({
      tipo: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
  }).isRequired,
  component: PropTypes.node.isRequired,
}

export default PrivateRoute
