import React, { useState, useEffect } from 'react'
import { NavLink } from 'react-router-dom'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'

import { getRestaurantsAction } from '../actions/restaurant'
import { history } from '../store'

const Welcome = styled.div`
  background: #fff;
  box-sizing: border-box;
  position: absolute;
  left: 20px;
  bottom: 20px;
  z-index: 5;
  width: 460px;
  padding: 20px;

  max-width: ${(props) => props.viewport.width - 20 - 20}px;
  max-height: ${(props) => props.viewport.height - 70 - 20 - 20}px;

  > p {
    margin-bottom: 20px;
  }

  @media all and (max-width: 1024px) {
    display: none;
  }
`

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  })
  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      })
    }
    window.addEventListener('resize', handleResize)
    handleResize()
    return () => window.removeEventListener('resize', handleResize)
  }, [])
  return windowSize
}

const options = {
  disableDefaultUI: true,
}

const Home = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: 'AIzaSyAZ9MjomFe2pJ5Lg0peNFEOD0iOPi5LWug',
  })

  const dispatch = useDispatch()
  const restaurants = useSelector((state) => state.restaurant.list)
  useEffect(() => {
    dispatch(getRestaurantsAction())
  }, [])

  const size = useWindowSize()
  const [map, setMap] = React.useState(null)

  const onLoad = React.useCallback(function callback(map) {
    setMap(map)
  }, [])

  const onUnmount = React.useCallback(function callback(map) {
    setMap(null)
  }, [])

  return isLoaded ? (
    <>
      <Welcome viewport={size}>
        <h2>Tervetuloa KSK:n verkkopalveluun!</h2>
        <p>
          Saat lisää tietoa palvelumme ravintoloista klikkaamalla niitä auki kartalta tai katsomalla{' '}
          <NavLink to="/top">ranking-listaamme</NavLink>.
        </p>

        <p>
          Lisää tietoa toimiyhtymästä löydät <NavLink to="/about">täältä</NavLink>.
        </p>
      </Welcome>
      <GoogleMap
        mapContainerStyle={{
          width: '100%',
          height: `${size.height - 70}px`,
        }}
        center={{
          lat: 60.209,
          lng: 24.964,
        }}
        zoom={15}
        onLoad={onLoad}
        onUnmount={onUnmount}
        options={options}
      >
        <>
          {restaurants.map((r) => (
            <Marker
              key={r.id}
              onLoad={onLoad}
              position={{
                lat: r.latitude,
                lng: r.longitude,
              }}
              onClick={() => {
                history.push(`/view/${r.id}`)
              }}
              icon={'/static/img/marker.png'}
            >
              <InfoWindow>
                <p>{r.name}</p>
              </InfoWindow>
            </Marker>
          ))}
        </>
      </GoogleMap>
    </>
  ) : null
}

export default React.memo(Home)
