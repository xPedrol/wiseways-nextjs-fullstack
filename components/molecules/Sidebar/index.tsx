'use client'
import SignOutButton from '@/components/atoms/SignOutButton'
import { User, X } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRef } from 'react'
type TCommonLi = {
  href?: string
  title: string
  icon?: React.ReactNode
}
function CommonLi({ href, title, icon }: TCommonLi) {
  return (
    <li className="flex items-stretch border-l-[5px] border-l-primary-a0 hover:bg-primary-a20">
      {href ? (
        <Link
          href={href}
          className="flex items-center w-[100%] px-4 py-5 gap-3"
        >
          {icon ?? icon}
          {title}
        </Link>
      ) : (
        <div className="flex items-center w-[100%] px-4 py-5 gap-3 cursor-pointer">
          {icon ?? icon}
          {title}
        </div>
      )}
    </li>
  )
}
export default function Sidebar() {
  const sidebarRef = useRef<HTMLDivElement>(null)
  const { data: session } = useSession()
  const closeSidebar = () => {
    sidebarRef.current?.classList.add('translate-x-[500px]')
  }
  return (
    <div
      ref={sidebarRef}
      id="sidebar"
      className="z-10 fixed top-0 right-0 h-[100%] w-[100%] max-w-[500px] bg-surface-a10 flex flex-col gap-12 translate-x-[500px]
    transition-transform duration-200 ease-out"
    >
      <div className="flex justify-between items-center py-8 px-4">
        <Link href={'/'} className="flex items-center">
          <h1 className="uppercase text-2xl font-[1000]">Wise Ways</h1>
        </Link>
        <button
          onClick={closeSidebar}
          title="Fechar Sidebar"
          aria-label="Fechar Sidebar"
        >
          <X size={28} />
        </button>
      </div>
      <div>
        <ul className="flex flex-col text-xl gap-4">
          <CommonLi href="/despesas" title="Gastos do mês" />
          <CommonLi href="/cadastrar-despesa" title="Cadastrar Despesa" />

          {!session || !session.user ? (
            <>
              <CommonLi href="/entrar" title="Entrar" />
              <CommonLi href="/cadastrar" title="Cadastrar" />
            </>
          ) : (
            <>
              <CommonLi
                href="/perfil"
                title="Ver Perfil"
                icon={<User size={24} />}
              />
              <CommonLi
                title="Sair da Aplicação"
                icon={<SignOutButton className="" />}
              />
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
