import * as yup from 'yup'
import fetch from 'isomorphic-fetch'
import window from 'global/window'
import { isServer } from './helper'

const API_URL = `//${window?.location?.host}/api`

const user = yup.object().shape({
  username: yup
    .string()
    .required()
    .min(3)
    .max(8)
    .matches(/^[a-z0-9_]+$/)
    .test(
      'usernameUnique',
      'Käyttäjä tällä nimellä on jo olemassa!',
      async (value) => value.length < 2 || checkUsernameUnique(value)
    ),
  password: yup.string().required().min(6),
  password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match'),
})

const restaurant = yup.object().shape({
  name: yup
    .string()
    .min(4)
    .required()
    .when('$currentName', (currentName, schema) => {
      return schema.test(
        'restaurantUnique',
        'Ravintola tällä nimellä on jo olemassa!',
        async (value) =>
          value.length < 4 || value == currentName || checkRestaurantNameUnique(value)
      )
    }),

  description: yup.string(),
  rights: yup.string().oneOf(['A', 'B', 'C', '', null]),
  features: yup.array().of(yup.bool().nullable()),
  latitude: yup
    .string()
    .required()
    .matches(/^\d{2}\.\d{6}$/),
  longitude: yup
    .string()
    .required()
    .matches(/^\d{2}\.\d{6}$/),
})

const review = yup.object().shape({
  comment: yup.string().min(2).max(240).required(),
  rating: yup.string().oneOf(['1', '2', '3', '4', '5']).required(),
})

const feature = yup.object().shape({
  name: yup
    .string()
    .min(2)
    .max(20)
    .required()
    .when('$currentName', (currentName, schema) => {
      return schema.test(
        'featureUnique',
        'Ominaisuus tällä nimellä on jo olemassa!',
        async (value) => value.length < 2 || value == currentName || checkFeatureUnique(value)
      )
    }),
})

const checkRestaurantNameUnique = isServer
  ? (value) => true // TODO: check for unique on server, this will now be caught by UNIQUE INDEX
  : async (value) => {
      const result = await fetch(`${API_URL}/restaurant/exists/${value}`).then((res) => res.json())
      return !result.exists
    }

const checkUsernameUnique = isServer
  ? (value) => true // TODO: check for unique on server, this will now be caught by UNIQUE INDEX
  : async (value) => {
      const result = await fetch(`${API_URL}/username/exists/${value}`).then((res) => res.json())
      return !result.exists
    }

const checkFeatureUnique = isServer
  ? (value) => true // TODO: check for unique on server, this will now be caught by UNIQUE INDEX
  : async (value) => {
      const result = await fetch(`${API_URL}/feature/exists/${value}`).then((res) => res.json())
      return !result.exists
    }

export { user, restaurant, review, feature }
