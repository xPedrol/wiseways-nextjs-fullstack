import * as Yup from 'yup'

export const sendExpenseValidation = Yup.object({
  value: Yup.number().required('O valor é obrigatório'),
  date: Yup.date().required('A data é obrigatória'),
  description: Yup.string().optional(),
  tag: Yup.string().optional(),
})
export const createExpenseValidation = Yup.object({
  ...sendExpenseValidation.fields,
  user: Yup.string().required('O usuário é obrigatório'),
})
