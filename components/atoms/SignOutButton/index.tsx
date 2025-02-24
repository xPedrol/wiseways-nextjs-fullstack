'use client'
import { Power } from 'lucide-react'
import { signOut } from 'next-auth/react'
type TSignOutButton = {
  className: string
}
export default function SignOutButton({ className }: TSignOutButton) {
  return (
    <button
      className={className}
      title="Sair"
      aria-label="Sair da aplicação"
      type="button"
      onClick={async () => {
        await signOut({ redirectTo: '/entrar' })
      }}
    >
      <Power size={24} />
    </button>
  )
}
