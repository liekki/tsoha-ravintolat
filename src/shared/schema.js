import * as yup from 'yup'

const restaurant = yup.object().shape({
  name: yup.string().min(4).required(),
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

export { restaurant, review }
