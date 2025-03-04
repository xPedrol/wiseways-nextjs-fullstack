'use client'
import Button from '@/components/atoms/Button'
import ErrorLabel from '@/components/atoms/ErrorLabel'
import Fieldset from '@/components/atoms/Fieldset'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import Select from '@/components/atoms/Select'
import SelectOption from '@/components/atoms/SelectOption'
import Textarea from '@/components/atoms/Textarea'
import cfetch from '@/config/fetchapi'
import { TCreateExpense, TExpense } from '@/interfaces/expense'
import { TTag } from '@/interfaces/tag'
import { useToast } from '@/providers/toastProvider'
import { getDayjs } from '@/utils/date'
import { sendExpenseValidation } from '@/yupSchemas/expense'
import dayjs from 'dayjs'
import { useFormik } from 'formik'
import { useEffect, useState } from 'react'

type Props = {
  expense?: TExpense | null
}
export default function ExpenseForm({ expense }: Props) {
  const date = getDayjs()
  const [submitting, setSubmitting] = useState(false)
  const [tags, setTags] = useState<TTag[] | null>(null)
  const { showToast } = useToast()
  useEffect(() => {
    const getTags = async () => {
      const res = await cfetch('/tags', {
        method: 'GET',
      })
      const data = await res.json()
      setTags(data.tags)
    }
    getTags()
  }, [])
  const onSubmit = async (formData: TCreateExpense) => {
    try {
      const data = {
        ...formData,
      }
      const newDate = getDayjs(data.date)
      data.date = newDate.utc().format()
      setSubmitting(true)
      if (!data.tag) data.tag = null
      const response = await cfetch('/expenses', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (response.status === 200) {
        showToast('Registro cadastrado com sucesso!', 'success')
        formik.resetForm({
          values: {
            value: '',
            date: date.format('YYYY-MM-DD'),
            tag: '',
            description: '',
          },
        })
      } else {
        throw ''
      }
    } catch {
      showToast('Falha ao cadastrar registro', 'error')
    } finally {
      setSubmitting(false)
    }
  }
  const onSubmitUpdate = async (formData: TCreateExpense) => {
    try {
      const data = {
        ...expense,
        ...formData,
      }
      const newDate = getDayjs(data.date)
      data.date = newDate.utc().format()
      setSubmitting(true)
      if (!data.tag) data.tag = null
      const response = await cfetch('/expenses', {
        method: 'PUT',
        body: JSON.stringify(data),
      })
      if (response.status === 200) {
        showToast('Registro alterado com sucesso!', 'success')
      } else {
        throw ''
      }
    } catch {
      showToast('Falha ao alterar registro', 'error')
    } finally {
      setSubmitting(false)
    }
  }
  const formik = useFormik({
    initialValues: {
      value: expense?.value ?? '',
      date: expense?.date
        ? dayjs(expense.date).format('YYYY-MM-DD')
        : date.format('YYYY-MM-DD'),
      tag: expense?.tag?._id ?? '',
      description: expense?.description ?? '',
    },
    onSubmit: expense ? onSubmitUpdate : onSubmit,
    validationSchema: sendExpenseValidation,
  })
  return (
    <form className="flex gap-2 flex-col" onSubmit={formik.handleSubmit}>
      <Fieldset className="flex-1">
        <Label>Valor</Label>
        <Input
          id="value"
          type="text"
          placeholder="Digite o valor..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.value}
        />
        {formik.touched.value && formik.errors.value && (
          <ErrorLabel>{formik.errors.value}</ErrorLabel>
        )}
      </Fieldset>
      <Fieldset className="flex-1">
        <Label>Data</Label>
        <Input
          id="date"
          type="date"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.date}
        />
        {formik.touched.date && formik.errors.date && (
          <ErrorLabel>{formik.errors.date}</ErrorLabel>
        )}
      </Fieldset>
      <Fieldset className="flex-1">
        <Label>Tag</Label>
        <Select
          id="tag"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.tag}
        >
          <SelectOption value="">Selecione uma tag...</SelectOption>
          {tags &&
            tags.map((tag) => (
              <SelectOption value={tag._id} key={tag._id}>
                {tag.name}
              </SelectOption>
            ))}
        </Select>
        {formik.touched.tag && formik.errors.tag && (
          <ErrorLabel>{formik.errors.tag}</ErrorLabel>
        )}
        {!tags && <small>Carregando está bosta...</small>}
      </Fieldset>
      <Fieldset>
        <Label>Descrição</Label>
        <Textarea
          id="description"
          rows={6}
          placeholder="Digite a descrição..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.description}
        />
      </Fieldset>
      <div className="text-end">
        <Button disabled={submitting} type="submit">
          {submitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </div>
    </form>
  )
}
