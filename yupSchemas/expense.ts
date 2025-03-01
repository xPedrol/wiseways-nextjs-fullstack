import * as Yup from 'yup'

export const createExpenseValidation = Yup.object({
  value: Yup.number().required('O valor é obrigatório'),
  date: Yup.date().required('A data é obrigatória'),
  description: Yup.string().optional(),
  userId: Yup.string().required('O usuário é obrigatório'),
  tagId: Yup.string().optional(),
})
