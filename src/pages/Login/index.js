import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { Login as LoginContainer } from '../../containers'
import { login } from '../../state/login/actions'

/* eslint-disable */
const { REACT_APP_API_URL } = process.env

class Login extends Component {
  state = {
    loading: false,
  }

  callApi = (data) => {
    axios.post(`${REACT_APP_API_URL}/login`, data)
      .then(response => {
        this.props.login(response.data)
        this.props.history.push("/monitoring");
      })
      .finally(() => this.setState({ loading: false }))
  }

  handleOnClick = (data) => {
    this.setState({
      loading: true,
    }, () => this.callApi(data))
  }

  render = () => (
    <LoginContainer
      loading={this.state.loading}
      onSubmit={this.handleOnClick}
    />
  )
}

const mapStateToProps = () => ({})
const mapDispatchToProps = dispatch => ({
  login: (data) => dispatch(login(data))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
