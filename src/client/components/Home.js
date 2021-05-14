import React, { useState, useEffect } from 'react'
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api'
import { useSelector, useDispatch } from 'react-redux'

import { getRestaurantsAction } from '../actions/restaurant'
import { history } from '../store'

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
  ) : (
    <></>
  )
}

export default React.memo(Home)
