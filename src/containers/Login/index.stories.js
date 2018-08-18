import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import Login from '.'

storiesOf('Login', module)
  .add('Default', () => (<Login
    onSubmit={action('logar')}
  />))
  .add('Loading', () => (<Login
    onSubmit={action('logar')}
    loading
  />))
