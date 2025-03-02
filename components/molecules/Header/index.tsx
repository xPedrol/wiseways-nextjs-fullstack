import Link from 'next/link'
import { auth } from '@/auth'
import SidebarButton from '@/components/atoms/SidebarButton'
import SignOutButton from '@/components/atoms/SignOutButton'
import { User } from 'lucide-react'

export async function Header() {
  const session = await auth()
  return (
    <header
      className="flex justify-between items-stretch h-20 bg-surface-a0 border-[2px] border-primary-a20
     mt-10 rounded-2xl px-8 mx-auto max-w-[1280px] max-xl:mx-4"
    >
      <Link href={'/'} className="flex items-center">
        <h1 className="uppercase text-2xl font-[1000]">Wise Ways</h1>
      </Link>
      <nav className="flex items-stretch">
        <ul className="flex gap-5 max-md:hidden">
          <li className="flex">
            <Link
              href={'/despesas'}
              className="flex items-center hover:text-primary-a20 hover:scale-95"
            >
              Gastos do mês
            </Link>
          </li>
          <li className="flex">
            <Link
              href={'/cadastrar-despesa'}
              className="flex items-center hover:text-primary-a20 hover:scale-95"
            >
              Cadastrar Despesa
            </Link>
          </li>
          <li className="flex">
            <Link
              href={'/cadastrar-tag'}
              className="flex items-center hover:text-primary-a20 hover:scale-95"
            >
              Cadastrar Tag
            </Link>
          </li>

          {!session || !session.user ? (
            <>
              <li
                className="flex"
                title="Entrar"
                aria-label="Entrar na aplicação"
              >
                <Link
                  href={'/entrar'}
                  className="flex items-center hover:text-primary-a20 hover:scale-95"
                >
                  Entrar
                </Link>
              </li>
              <li className="flex">
                <Link
                  href={'/cadastrar'}
                  className="flex items-center hover:text-primary-a20 hover:scale-95"
                >
                  Cadastrar
                </Link>
              </li>
            </>
          ) : (
            <>
              <li
                className="flex"
                title="Perfil"
                aria-label="Página do usuário"
              >
                <Link
                  href={'/perfil'}
                  className="flex items-center hover:text-primary-a20 hover:scale-95"
                >
                  <User size={24} />
                </Link>
              </li>
              <li className="flex">
                <SignOutButton className="hover:text-primary-a20 hover:scale-95" />
              </li>
            </>
          )}
        </ul>
        <div className="flex md:hidden">
          <SidebarButton />
        </div>
      </nav>
    </header>
  )
}
