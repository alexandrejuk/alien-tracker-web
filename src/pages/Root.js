import React from 'react'
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'

import Login from './Login'
import ProtectedRoute from './routing/ProtectedRoute'

const PrivateComponent = () => <div>PrivateComponent</div>

const Root = ({ funcionario }) => (
  <Router forceRefresh={false}>
    <Switch>
      <Route path="/login" component={Login} />

      <ProtectedRoute
        path="/monitoring"
        component={PrivateComponent}
        permissions={['*']}
        user={funcionario}
      />

      <Redirect to="/monitoring" />
    </Switch>
  </Router>
)

const mapStateToProps = state => ({
  funcionario: state.login.funcionario,
})

Root.defaultProps = {
  funcionario: null,
}

Root.propTypes = {
  funcionario: PropTypes.shape({
    login: PropTypes.shape({
      tipo: PropTypes.arrayOf(PropTypes.string),
    }),
  }),
}

export default connect(mapStateToProps)(Root)
