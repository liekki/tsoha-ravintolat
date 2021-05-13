import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector, useDispatch } from 'react-redux'
import { yupResolver } from '@hookform/resolvers/yup'

import * as restaurant from '../api/restaurant'
import { addRestaurantAction } from '../actions/restaurant'

import {
  Form,
  FormField,
  FormFieldLabel,
  FormFieldInput,
  FormFieldTextarea,
  FormFieldErrors,
  FormFieldNote,
  FormFieldSelect,
  FormFieldOption,
  FormFieldCheckboxCollection,
  FormFieldCheckboxContainer,
  FormFieldCheckbox,
  Submit,
} from './Styles'

import * as schema from '../../shared/schema'

const FormAddRestaurant = () => {
  const dispatch = useDispatch()
  const state = useSelector((state) => state.user)

  const [features, setFeatures] = useState([])

  useEffect(async () => {
    const features = await restaurant.features()
    setFeatures(features?.features)
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema.restaurant),
  })

  const onErrors = (errors) => console.error(errors)
  const handleForm = (data) => {
    window.scrollTo(0, 0)
    reset()
    dispatch(addRestaurantAction(data))
  }

  return (
    <Form method="post" action="" onSubmit={handleSubmit(handleForm, onErrors)}>
      <FormField>
        <FormFieldLabel htmlFor="name">Ravintolan nimi</FormFieldLabel>
        <FormFieldInput id="name" {...register('name')}></FormFieldInput>
        {errors?.name && <FormFieldErrors>{errors.name.message}</FormFieldErrors>}
      </FormField>
      <FormField>
        <FormFieldLabel htmlFor="description">Kuvausteksti</FormFieldLabel>
        <FormFieldTextarea id="description" {...register('description')}></FormFieldTextarea>
        {errors?.description && <FormFieldErrors>{errors.description.message}</FormFieldErrors>}
      </FormField>
      <FormField>
        <FormFieldLabel htmlFor="rights">Oikeudet</FormFieldLabel>
        <FormFieldSelect id="rights" {...register('rights')}>
          {['', 'A', 'B', 'C'].map((r) => (
            <FormFieldOption key={r} value={r}>
              {r || 'Ei mitään'}
            </FormFieldOption>
          ))}
        </FormFieldSelect>
        {errors?.rights && <FormFieldErrors>{errors.rights.message}</FormFieldErrors>}
      </FormField>
      <FormField>
        <FormFieldLabel htmlFor="features">Ominaisuudet</FormFieldLabel>
        <FormFieldCheckboxCollection>
          {features.map((f) => (
            <FormFieldCheckboxContainer key={f.id}>
              <FormFieldLabel htmlFor={'feature-' + f.id}>{f.name}</FormFieldLabel>
              <FormFieldCheckbox
                type="checkbox"
                id={'feature-' + f.id}
                {...register('features[' + f.id + ']')}
              />
            </FormFieldCheckboxContainer>
          ))}
        </FormFieldCheckboxCollection>
      </FormField>
      <FormField>
        <FormFieldLabel htmlFor="latitude">Leveyskoordinaatti</FormFieldLabel>
        <FormFieldInput id="latitude" {...register('latitude')}></FormFieldInput>
        <FormFieldNote>Anna koordinaatti muodossa xx.xxxxxx, esim 60.207326</FormFieldNote>
        {errors?.latitude && <FormFieldErrors>{errors.latitude.message}</FormFieldErrors>}
      </FormField>
      <FormField>
        <FormFieldLabel htmlFor="longitude">Pituuskoordinaatti</FormFieldLabel>
        <FormFieldInput id="longitude" {...register('longitude')}></FormFieldInput>
        <FormFieldNote>Anna koordinaatti muodossa xx.xxxxxx, esim 24.968693</FormFieldNote>
        {errors?.longitude && <FormFieldErrors>{errors.longitude.message}</FormFieldErrors>}
      </FormField>
      <FormField>
        <Submit type="submit" value="Tallenna" />
      </FormField>
    </Form>
  )
}

export default FormAddRestaurant
