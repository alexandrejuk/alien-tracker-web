import React from 'react'
import { Card } from 'antd'
import Proptypes from 'prop-types'

import styles from './styles.css'
import Form from './Form'

const Login = ({ onSubmit, loading }) => (
  <div className={styles.container}>
    <div className={styles.welcome} />
    <div className={styles.formContainer}>
      <Card className={styles.card}>
        <Form
          onSubmit={onSubmit}
          loading={loading}
        />
      </Card>
    </div>
  </div>
)

Login.propTypes = {
  onSubmit: Proptypes.func.isRequired,
  loading: Proptypes.bool.isRequired,
}

export default Login
