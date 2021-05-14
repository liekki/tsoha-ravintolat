import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useSelector } from 'react-redux'

import * as restaurant from '../../shared/api/restaurant'
import * as schema from '../../shared/schema'

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

const FormRestaurant = ({ onSubmit, values }) => {
  const [features, setFeatures] = useState([])
  const csrfToken = useSelector((state) => state.user.csrfToken)

  useEffect(async () => {
    const features = await restaurant.features()
    setFeatures(features?.features)

    setValue('csrf_token', csrfToken, { shouldValidate: false })
    if (values) {
      reset(values)
    }
  }, [])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm({
    resolver: yupResolver(schema.restaurant),
  })

  const onErrors = (errors) => console.error(errors)
  const handleForm = (data) => {
    onSubmit(data, reset)
  }

  return (
    <Form method="post" action="" onSubmit={handleSubmit(handleForm, onErrors)}>
      <input type="hidden" {...register('csrf_token')} />
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

export default FormRestaurant
