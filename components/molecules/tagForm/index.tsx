'use client'
import Button from '@/components/atoms/Button'
import ErrorLabel from '@/components/atoms/ErrorLabel'
import Fieldset from '@/components/atoms/Fieldset'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import Textarea from '@/components/atoms/Textarea'
import cfetch from '@/config/fetchapi'
import { TCreateTag } from '@/interfaces/tag'
import { useToast } from '@/providers/toastProvider'
import { sendTagValidation } from '@/yupSchemas/tag'
import { useFormik } from 'formik'
import { useState } from 'react'

export default function TagForm() {
  const [submitting, setSubmitting] = useState(false)
  const { showToast } = useToast()
  const onSubmit = async (data: TCreateTag) => {
    try {
      setSubmitting(true)
      const response = await cfetch('/tags', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (response.status === 200) {
        showToast('Registro cadastrado com sucesso!', 'success')
        formik.resetForm()
      } else {
        throw ''
      }
    } catch {
      showToast('Falha ao cadastrar registro', 'error')
    } finally {
      setSubmitting(false)
    }
  }
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
    },
    onSubmit,
    validationSchema: sendTagValidation,
  })
  return (
    <form className="flex gap-2 flex-col" onSubmit={formik.handleSubmit}>
      <Fieldset className="flex-1">
        <Label>Nome</Label>
        <Input
          id="name"
          type="text"
          placeholder="Digite o nome..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <ErrorLabel>{formik.errors.name}</ErrorLabel>
        )}
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
        {formik.touched.description && formik.errors.description && (
          <ErrorLabel>{formik.errors.description}</ErrorLabel>
        )}
      </Fieldset>
      <div className="text-end">
        <Button disabled={submitting} type="submit">
          {submitting ? 'Enviando...' : 'Enviar'}
        </Button>
      </div>
    </form>
  )
}
