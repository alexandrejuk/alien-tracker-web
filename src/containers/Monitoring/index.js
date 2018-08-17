/* eslint-disable */
import React from 'react'
import { withScriptjs, withGoogleMap, GoogleMap, Marker } from "react-google-maps"
import { compose, withProps } from "recompose"

import styles from './styles.css'
import TechnicalList from '../../components/TechnicalList'

const { REACT_APP_GOOGLE_API_KEY } = process.env
const googleMapURL = `https://maps.googleapis.com/maps/api/js?key=${REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`
const CustomMap = compose(
    withProps({
      loadingElement: <div style={{ height: '100%' }} />,
      containerElement: <div style={{ height: '100vh' }} />,
      mapElement: <div style={{ height: '100%' }} />,
      googleMapURL,
    }),
    withScriptjs,
    withGoogleMap
  )(({ children, tecnicos }) =>
  <React.Fragment>
    <div className={styles.technicalListContainer}>
      <TechnicalList technicians={tecnicos} />
    </div>
    <GoogleMap
      defaultZoom={11.5}
      defaultCenter={{ lat: -23.5611138, lng: -46.6032598 }}
    >
      {children}
    </GoogleMap>
  </React.Fragment>
)

export default CustomMap;
