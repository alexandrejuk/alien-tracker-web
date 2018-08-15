import React from 'react'
import PropTypes from 'prop-types'
import { Card, Avatar } from 'antd'
import styles from './index.css'

const cardBodyStyle = {
  display: 'flex',
  flex: 1,
  flexDirection: 'row',
  padding: '15px',
}

const TechnicalCard = ({
  technician,
  order,
  status,
  onClick,
}) => {
  const { foto_url, nome } = technician // eslint-disable-line
  const { id, companyName, counter } = order
  const { type, start } = status
  const handleClick = () => onClick({ technician, order, status })

  return (
    <Card
      style={{ width: 300 }}
      bodyStyle={cardBodyStyle}
      hoverable
      onClick={handleClick} // eslint-disable-line
    >
      <Avatar
        size={64}
        icon="user"
        src={foto_url} // eslint-disable-line
      />
      <div className={styles.content}>
        <p>
          <span className={styles.name}>{nome}</span>
          <span className={styles.counter}>{counter}</span>
        </p>
        <p>{`${companyName} - ${id}`}</p>
        <p>{`${type} - ${start}`}</p>
      </div>
    </Card>
  )
}

TechnicalCard.defaultProps = {
  technician: {},
  order: {
    id: 0,
    companyName: '',
    counter: '',
  },
  status: {
    type: '',
    start: '',
  },
  onClick: () => null,
}

TechnicalCard.propTypes = {
  technician: PropTypes.shape({
    nome: PropTypes.string,
  }),
  order: PropTypes.shape({
    id: PropTypes.number,
    companyName: PropTypes.string,
    counter: PropTypes.string,
  }),
  status: PropTypes.shape({
    type: PropTypes.string,
    start: PropTypes.string,
  }),
  onClick: PropTypes.func,
}

export default TechnicalCard
