'use client'
import Button from '@/components/atoms/Button'
import ErrorLabel from '@/components/atoms/ErrorLabel'
import Fieldset from '@/components/atoms/Fieldset'
import IconButton from '@/components/atoms/IconButton'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import cfetch from '@/config/fetchapi'
import { TRegister } from '@/types/auth'
import { createUserValidation } from '@/yupSchemas/user'
import { useFormik } from 'formik'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function RegisterForm() {
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const onSubmit = async (data: TRegister) => {
    try {
      setLoading(true)
      const response = await cfetch('/users', {
        method: 'POST',
        body: JSON.stringify(data),
      })
      if (response.status === 200) {
        router.push('/entrar')
      } else {
        alert('Falha ao cadastrar usuário.')
        setLoading(false)
      }
    } catch (error) {
      alert(JSON.stringify(error))
      setLoading(false)
    }
  }
  const formik = useFormik<TRegister>({
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    onSubmit,
    validationSchema: createUserValidation,
  })
  const [seePassword, setSeePassword] = useState<boolean>(false)
  return (
    <form className="flex flex-col gap-6" onSubmit={formik.handleSubmit}>
      <Fieldset>
        <Label>Nome/Apelido</Label>
        <Input
          id="name"
          placeholder="Digite seu nome/apelido..."
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
        />
        {formik.touched.name && formik.errors.name && (
          <ErrorLabel>{formik.errors.name}</ErrorLabel>
        )}
      </Fieldset>
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
          sufix={
            <IconButton
              title="Ver senha"
              aria-label="Ver senha"
              type="button"
              onClick={() => setSeePassword(!seePassword)}
              icon={seePassword ? <EyeOff size={16} /> : <Eye size={16} />}
            />
          }
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
        />
        {formik.touched.password && formik.errors.password && (
          <ErrorLabel>{formik.errors.password}</ErrorLabel>
        )}
      </Fieldset>
      <div className="text-end">
        <p>
          Já possui uma conta? <Link href="/entrar">Clique aqui</Link>.
        </p>
      </div>
      <div className="text-end">
        <Button disabled={loading} size="xs" type="submit">
          {loading ? 'Cadastrando...' : 'Cadastrar'}
        </Button>
      </div>
    </form>
  )
}
