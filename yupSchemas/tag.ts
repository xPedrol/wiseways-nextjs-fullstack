import * as Yup from 'yup'

export const createTagValidation = Yup.object({
  name: Yup.string().required('O Nome é obrigatório'),
  color: Yup.string().required('A cor é obrigatória'),
  description: Yup.string().optional(),
  userId: Yup.string().required('O usuário é obrigatório'),
})
