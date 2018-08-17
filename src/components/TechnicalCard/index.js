import React from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar } from 'antd'
import { pick, propOr } from 'ramda'

import styles from './index.css'

const cardBodyStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  padding: '15px',
}

class TechnicalCard extends React.PureComponent {
  handleClick = () => this.props.onClick(
    pick(['technician'], this.props)
  )

  renderClient = cliente =>
    (<p>{`${cliente.name} - ${cliente.documentId}`}</p>)

  render () {
    const {
      technician,
    } = this.props

    const {
      currentActivity,
      name,
      avatarUrl,
    } = technician

    const {
      externalService = {},
      status,
    } = currentActivity

    const distance = propOr(
      null,
      'distance',
      externalService,
    )

    const textDitance = distance ? ` - ${distance}` : ''

    return (
      <Card
        bodyStyle={cardBodyStyle}
        hoverable
        className={styles.card}
        onClick={this.handleClick}
      >
        <Avatar
          size={64}
          icon="user"
          src={avatarUrl}
        />
        <div className={styles.content}>
          <p>
            <span className={styles.name}>{name}</span>
          </p>
          {
            externalService.client
            && this.renderClient(externalService.client)
          }
          {
            (status || textDitance)
            && <p>{`${status} ${textDitance}`}</p>
          }
        </div>
      </Card>
    )
  }
}

TechnicalCard.defaultProps = {
  onClick: () => null,
}

TechnicalCard.propTypes = {
  technician: PropTypes.shape({
    name: PropTypes.string.isRequired,
    avatarUrl: PropTypes.string.isRequired,
    currentActivity: PropTypes.shape({
      status: PropTypes.oneOf([
        'PENDENTE',
        'PAUSE_ATIVIDADE',
        'INICIO_ATIVIDADE',
        'FIM_ATIVIDADE',
        'INICIO_DESLOCAMENTO',
        'FIM_DESLOCAMENTO',
        'CANCELA_ATIVIDADE',
      ]),
      externalService: PropTypes.shape({
        client: PropTypes.shape({
          documentId: PropTypes.string.isRequired,
          name: PropTypes.string.isRequired,
        }),
        distance: PropTypes.string.isRequired,
      }),
    }).isRequired,
  }).isRequired,
  onClick: PropTypes.func,
}

export default TechnicalCard
