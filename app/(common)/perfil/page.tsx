import { auth } from '@/auth'
import Button from '@/components/atoms/Button'
import Fieldset from '@/components/atoms/Fieldset'
import Input from '@/components/atoms/Input'
import Label from '@/components/atoms/Label'
import { Metadata } from 'next'
import Image from 'next/image'
export const metadata: Metadata = {
  title: 'Meu Perfil',
}
export default async function Profile() {
  const session = await auth()
  console.log(session)
  const image = null
  return (
    <div className="custom-contaier">
      <div className="w-full flex max-md:flex-col max-md:items-stretch justify-between items-center mb-3 gap-2">
        <div>
          <h3 className="text-lg font-semibold ">Meu Perfil</h3>
          <p className="">Usuário: {session?.user?.name ?? '--'}</p>
        </div>
      </div>
      <div>
        <form className="flex gap-2 flex-col mx-auto max-w-[500px]">
          <Image
            className="self-center rounded-full border-4 border-primary-a0"
            alt="avatar"
            width={150}
            height={150}
            src={
              image ??
              'https://docs.gravatar.com/wp-content/uploads/2025/02/avatar-mysteryperson-20250210-256.png'
            }
          />
          <Fieldset className="flex-1">
            <Label>Nome</Label>
            <Input type="text" placeholder="Altere seu nome..." />
          </Fieldset>
          <Fieldset className="flex-1">
            <Label>Email</Label>
            <Input readOnly type="text" />
          </Fieldset>
          <Fieldset className="flex-1">
            <Label>Imagem</Label>
            <Input type="text" placeholder="Altere o link do seu avatar..." />
          </Fieldset>
          <div className="text-end">
            <Button>Salvar</Button>
          </div>
        </form>
      </div>
    </div>
  )
}
