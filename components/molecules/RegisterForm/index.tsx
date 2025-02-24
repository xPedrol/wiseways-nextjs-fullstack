'use client'
import Fieldset from '@/components/atoms/Fieldset'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

export default function RegisterForm() {
  const [seePassword, setSeePassword] = useState<boolean>(false)
  return (
    <form className="flex flex-col gap-6">
      <Fieldset>
        <Label>Nome/Apelido</Label>
        <Input placeholder="Digite seu nome/apelido..." />
      </Fieldset>
      <Fieldset>
        <Label>E-mail</Label>
        <Input placeholder="Digite seu email..." />
      </Fieldset>
      <Fieldset>
        <Label>Senha</Label>
        <Input
          type={seePassword ? 'text' : 'password'}
          placeholder="Digite sua senha..."
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
      </Fieldset>
      <div className="text-end">
        <p>
          Já possui uma conta? <Link href="/entrar">Clique aqui</Link>.
        </p>
      </div>
      <div className="text-end">
        <button className="px-4 py-2 bg-primary-a20 rounded-xl">
          Cadastrar
        </button>
      </div>
    </form>
  )
}
