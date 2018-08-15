import React from 'react'
import PropTypes from 'prop-types'
import { Collapse } from 'antd'
import TechnicalCard from '../TechnicalCard'

import styles from './index.css'

const { Panel } = Collapse

const TechnicalList = ({ technicians, onClick }) => (
  <div className={styles.container}>
    <Collapse defaultActiveKey={['1']} >
      <Panel header="Técnicos" key="1">
        <div className={styles.body}>
          {
            technicians.map(
              technician => (
                <TechnicalCard
                  onClick={onClick}
                  {...technician}
                />
              )
            )
          }
        </div>
      </Panel>
    </Collapse>
  </div>
)

TechnicalList.defaultProps = {
  onClick: () => null,
}

TechnicalList.propTypes = {
  technicians: PropTypes.arrayOf({}).isRequired,
  onClick: PropTypes.func,
}

export default TechnicalList
