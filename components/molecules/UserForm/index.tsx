'use client'
import { useFormik } from 'formik'
import Button from '@/components/atoms/Button'
import Fieldset from '@/components/atoms/Fieldset'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import { createUserValidation } from '@/yupSchemas/user'
import Image from 'next/image'
import ErrorLabel from '@/components/atoms/ErrorLabel'
import cfetch from '@/config/fetchapi'
import { useSession } from 'next-auth/react'
import { useEffect } from 'react'
import { TUser } from '@/interfaces/user'
export default function UserForm() {
  const { data: session } = useSession()
  const onSubmit = async (data: TUser) => {
    if (!session) return
    const response = await cfetch('/users', {
      method: 'PUT',
      body: JSON.stringify(data),
    })
    if (response.status === 200) {
      alert('Dados alterados com sucesso!')
    }
  }
  const formik = useFormik<TUser>({
    initialValues: {
      name: '',
      email: '',
      image: '',
      password: '',
    },
    onSubmit,
    validationSchema: createUserValidation,
  })
  useEffect(() => {
    if (session) {
      formik.setValues({
        name: session?.user?.name ?? '',
        email: session?.user?.email ?? '',
        image: session?.user?.image ?? '',
        password: '',
      })
    }
  }, [session, formik])
  return (
    <form
      className="flex gap-2 flex-col mx-auto max-w-[500px]"
      onSubmit={formik.handleSubmit}
    >
      <Image
        className="self-center rounded-full border-4 border-primary-a0"
        alt="avatar"
        width={150}
        height={150}
        src={
          session?.user?.image ??
          'https://docs.gravatar.com/wp-content/uploads/2025/02/avatar-mysteryperson-20250210-256.png'
        }
      />
      <Fieldset className="flex-1">
        <Label>Nome</Label>
        <Input
          id="name"
          type="text"
          placeholder="Altere seu nome..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <ErrorLabel>{formik.errors.name}</ErrorLabel>
        )}
      </Fieldset>
      <Fieldset className="flex-1">
        <Label>E-mail</Label>
        <Input
          id="email"
          defaultValue={formik.values.email}
          readOnly
          type="text"
          placeholder="Ué. Era pro seu e-mail estar aqui."
        />
      </Fieldset>
      <Fieldset className="flex-1">
        <Label>Imagem</Label>
        <Input
          id="image"
          type="text"
          placeholder="Altere o link do seu avatar..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.image}
        />
        {formik.touched.image && formik.errors.image && (
          <ErrorLabel>{formik.errors.image}</ErrorLabel>
        )}
      </Fieldset>
      <Fieldset className="flex-1">
        <Label>Senha</Label>
        <Input
          id="password"
          type="password"
          placeholder="Digite a senha para alterar os dados..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <ErrorLabel>{formik.errors.password}</ErrorLabel>
        )}
      </Fieldset>
      <div className="text-end">
        <Button>Salvar</Button>
      </div>
    </form>
  )
}
