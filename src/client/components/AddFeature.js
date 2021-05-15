import React from 'react'
import { useDispatch } from 'react-redux'

import { addFeatureAction } from '../../shared/actions/feature'
import FormFeature from './FormFeature'

import { history } from '../../shared/store'

const AddFeature = () => {
  const dispatch = useDispatch()
  const onSubmit = (data, reset) => {
    dispatch(addFeatureAction(data))
  }

  return <FormFeature onSubmit={onSubmit} />
}

export default AddFeature
