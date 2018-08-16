import React from 'react'

import { storiesOf } from '@storybook/react'
import { action } from '@storybook/addon-actions'

import TechnicalCard from '.'

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

const technicianWithoutExternalService = {
  name: 'Jailson Mendes',
  avatarUrl: 'https://pbs.twimg.com/profile_images/378800000767341390/5ead95c84f7f90f7f9162e995b06308d_400x400.jpeg', // eslint-disable-line
  currentActivity: {
    status: 'PENDENTE',
  },
}

const centralize = {
  height: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

storiesOf('TechnicalCard', module)
  .addDecorator(story => (<div style={centralize}>{story()}</div>))
  .add('Default', () => (
    <TechnicalCard
      technician={technician}
      onClick={action('clicked')}
    />
  ))
  .add('Without External Service', () => (
    <TechnicalCard
      technician={technicianWithoutExternalService}
      onClick={action('clicked')}
    />
  ))
