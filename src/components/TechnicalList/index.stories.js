import React from 'react'
import { storiesOf } from '@storybook/react'

import TechnicalList from '.'

const technician = {
  nome: 'Jailson Mendes',
  foto_url: 'https://pbs.twimg.com/profile_images/378800000767341390/5ead95c84f7f90f7f9162e995b06308d_400x400.jpeg', // eslint-disable-line
}

const order = {
  id: 123123,
  companyName: 'Empresa Topper',
  counter: '3/7',
}

const status = {
  type: 'Em Deslocamento',
  start: '10:30',
}

const technicians = Array(15).fill(
  {
    technician,
    order,
    status,
  }
)

storiesOf('TechnicalList', module)
  .add('Default', () => (
    <TechnicalList
      technicians={technicians}
      onClick={console.log}
    />
  ))
