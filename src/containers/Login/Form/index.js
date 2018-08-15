import React, { Component } from 'react'
import { Form, Icon, Input, Button } from 'antd'
import propTypes from 'prop-types'

const FormItem = Form.Item

class NormalLoginForm extends Component {
  handleSubmit = (e) => {
    e.preventDefault()
    // eslint-disable-next-line react/prop-types
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values)
      }
    })
  }

  render () {
    const {
      getFieldDecorator, // eslint-disable-line react/prop-types
    } = this.props.form
    const {
      loading,
    } = this.props

    return (
      <Form onSubmit={this.handleSubmit} className="login-form">
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{
              required: true,
              message: 'Por favor digite seu usuario!',
            }],
          })(
            <Input
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="Usuario"
            />
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: 'Por favor digite sua senha!' }],
          })(
            <Input
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="Senha"
            />
          )}
        </FormItem>
        <Button
          loading={loading}
          type="primary"
          htmlType="submit"
          className="login-form-button"
        >
          Logar
        </Button>
      </Form>
    )
  }
}

NormalLoginForm.propTypes = {
  onSubmit: propTypes.func.isRequired,
  loading: propTypes.bool.isRequired,
}

export default Form.create()(NormalLoginForm)
