import * as yup from 'yup'
export const schema = yup.object({
  email: yup.string().required('Email is required').email('Email invalidate'),
  password: yup.string().required('Password is required')
})
export const LoginShema = schema.pick(['email', 'password'])
export type Schema = yup.InferType<typeof schema>
