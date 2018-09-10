import React from 'react'
import { storiesOf } from '@storybook/react'
import { assocPath } from 'ramda'
import { action } from '@storybook/addon-actions'

import TechnicalList from '.'

const technician = {
  name: 'Jailson Mendes',
  avatarUrl: 'https://pbs.twimg.com/profile_images/378800000767341390/5ead95c84f7f90f7f9162e995b06308d_400x400.jpeg', // eslint-disable-line
  currentActivity: {
    status: 'PENDENTE',
    externalService: {
      client: {
        name: 'EMPRESA TOPPER',
        documentId: '51426149000178',
      },
      distance: '32 km',
    },
  },
}


const technicians = Array(15)
  .fill(technician)
  .map((tech, index) => assocPath(
    ['technician', 'id'],
    String(index),
    tech
  ))

storiesOf('TechnicalList', module)
  .add('Default', () => (
    <TechnicalList
      technicians={technicians}
      onClick={action('onListClick')}
    />
  ))
