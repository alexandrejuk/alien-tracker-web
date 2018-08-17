import React from 'react'

import { storiesOf } from '@storybook/react'
import { Marker } from "react-google-maps"

import Monitoring from '.'

storiesOf('Monitoring', module)
  .add('Default', () => (
    <Monitoring>
      <Marker position={{ lat: -34.397, lng: 150.644 }} />
    </Monitoring>
  ))
