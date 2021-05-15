import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import { updateFeatureAction } from '../../shared/actions/feature'
import FormFeature from './FormFeature'

const EditFeature = () => {
  const { featureId } = useParams()

  const feature = useSelector(
    (state) => state.feature.list.filter((f) => f.id === parseInt(featureId))[0]
  )

  const dispatch = useDispatch()
  const onSubmit = (data, reset) => {
    window.scrollTo(0, 0)
    dispatch(updateFeatureAction(featureId, data))
  }

  return <FormFeature onSubmit={onSubmit} values={feature} />
}

export default EditFeature
