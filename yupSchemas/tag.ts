import * as Yup from 'yup'

export const sendTagValidation = Yup.object({
  name: Yup.string()
    .required('O Nome é obrigatório')
    .min(3, 'O nome deve ter no mínimo 3 caracteres'),
  description: Yup.string().optional(),
})
export const createTagValidation = Yup.object({
  ...sendTagValidation.fields,
  color: Yup.string().optional(),
  user: Yup.string().required('O Usuário é obrigatório'),
})
