'use client'
import Button from '@/components/atoms/Button'
import ErrorLabel from '@/components/atoms/ErrorLabel'
import Fieldset from '@/components/atoms/Fieldset'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import { TLogin } from '@/types/auth'
import { useFormik } from 'formik'
import { Eye, EyeOff } from 'lucide-react'
import { AuthError } from 'next-auth'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useState } from 'react'
import { object, string } from 'yup'
const userSchema = object({
  email: string().email('E-mail inválido').required('E-mail obrigatório'),
  password: string().required('Senha obrigatória'),
})
export default function LoginForm() {
  const submitMethod = async (data: TLogin) => {
    try {
      await signIn('credentials', data)
    } catch (error) {
      if (error instanceof AuthError) {
        switch (error.type) {
          case 'CredentialsSignin':
            return 'Credenciais inválidas.'
          default:
            return 'Erro desconhecido. Favor tentar mais tarde.'
        }
      }
      throw error
    }
  }
  const formik = useFormik<TLogin>({
    initialValues: {
      email: '',
      password: '',
    },
    onSubmit: submitMethod,
    validationSchema: userSchema,
  })
  const [seePassword, setSeePassword] = useState<boolean>(false)
  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <Fieldset>
        <Label>E-mail</Label>
        <Input
          id="email"
          placeholder="Digite seu email..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
        />
        {formik.touched.email && formik.errors.email && (
          <ErrorLabel>{formik.errors.email}</ErrorLabel>
        )}
      </Fieldset>
      <Fieldset>
        <Label>Senha</Label>
        <Input
          id="password"
          type={seePassword ? 'text' : 'password'}
          placeholder="Digite sua senha..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          sufix={
            seePassword ? (
              <EyeOff
                size={16}
                className="cursor-pointer"
                onClick={() => setSeePassword(!seePassword)}
              />
            ) : (
              <Eye
                size={16}
                className="cursor-pointer"
                onClick={() => setSeePassword(!seePassword)}
              />
            )
          }
        />
        {formik.touched.password && formik.errors.password && (
          <ErrorLabel>{formik.errors.password}</ErrorLabel>
        )}
      </Fieldset>
      <div className="text-end">
        <p>
          Ainda não possui uma conta? <Link href="/cadastrar">Clique aqui</Link>
        </p>
      </div>
      <div className="text-end">
        <Button size="xs" type="submit">
          Entrar
        </Button>
      </div>
    </form>
  )
}
