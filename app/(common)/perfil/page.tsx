import { auth } from '@/auth'
import UserForm from '@/components/molecules/UserForm'
import { Metadata } from 'next'
export const metadata: Metadata = {
  title: 'Meu Perfil',
}
export default async function Profile() {
  const session = await auth()
  if (!session) return null
  return (
    <div className="custom-contaier">
      <div className="w-full flex max-md:flex-col max-md:items-stretch justify-between items-center mb-3 gap-2">
        <div>
          <h1 className="text-lg font-semibold ">Meu Perfil</h1>
          <p className="">Usuário: {session.user?.name ?? '--'}</p>
        </div>
      </div>
      <div>
        <UserForm session={session} />
      </div>
    </div>
  )
}
