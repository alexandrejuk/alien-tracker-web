import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import {
  map,
  applySpec,
  prop,
  always,
} from 'ramda'
import { MarkerWithLabel } from
  'react-google-maps/lib/components/addons/MarkerWithLabel'

import { getMonitoringData } from '../../utils/monitoring'
import { logout } from '../../state/login/actions'
import { Monitoring as MonitoringContainer } from '../../containers'
import { getAxiosIntance } from '../../utils/request'

const mapTecnico = applySpec({
  id: prop('_id'),
  name: prop('nome'),
  avatarUrl: prop('foto_url'),
  currentActivity: always({}),
})

class Monitoring extends Component {
  constructor (props) {
    super(props)

    this.connectaAPI = getAxiosIntance({
      token: this.props.token,
    }, this.unauthorizedHandler)

    this.monitoringAPI = getAxiosIntance({
      token: this.props.token,
      baseUrl: 'http://204.48.20.120:5000/',
    })

    this.intervalSub = null
  }

  state = {
    locations: [],
    tecnicos: [],
  }

  async componentDidMount () {
    const { funcionarios } = await this
      .connectaAPI
      .get('funcionarios?login.tipo=tecnico')
    const technical = map(mapTecnico, funcionarios)

    this.setState({ tecnicos: technical }, this.startRetrievingLocations) // eslint-disable-line
  }

  componentWillUnmount () {
    clearInterval(this.intervalSub)
  }

  startRetrievingLocations = () => {
    this.retrieveLocations()
    this.intervalSub = setInterval(this.retrieveLocations, 30000)
  }

  retrieveLocations = async () => {
    const { tecnicos } = this.state

    const data = await getMonitoringData(
      tecnicos,
      this.connectaAPI,
      this.monitoringAPI
    )

    this.setState(data)
  }
  unauthorizedHandler = () => this.props.logout()

  renderMaker = ({
    location,
    id,
    name,
  }) => (
    <MarkerWithLabel
      key={id}
      position={{ lat: location.latitude, lng: location.longitude }}
      labelAnchor={new google.maps.Point(0, 0)} // eslint-disable-line
      labelStyle={{
        backgroundColor: 'white',
        fontSize: '12px',
        padding: '10px',
      }}
    >
      <div>
        {name}
      </div>
    </MarkerWithLabel>
  )

  render = () => (
    <MonitoringContainer tecnicos={this.state.tecnicos}>
      {this.state.locations.map(this.renderMaker)}
    </MonitoringContainer>
  )
}

Monitoring.propTypes = {
  token: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  token: state.login.token,
})

const mapDispatchToProps = dipatch => ({
  logout: () => dipatch(logout()),
})

export default connect(mapStateToProps, mapDispatchToProps)(Monitoring)
