'use client'
import { Power, User, X } from 'lucide-react'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
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
        <div
          title="Sair da Aplicação"
          aria-label="Sair da Aplicação"
          className="flex items-center w-[100%] px-4 py-5 gap-3 cursor-pointer"
        >
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
  useEffect(() => {
    sidebarRef.current?.addEventListener('mouseup', (e) => {
      if (sidebarRef.current?.contains(e.target as Node)) {
        if (e.target instanceof HTMLAnchorElement) {
          closeSidebar()
        }
      }
    })
  }, [])
  return (
    <div
      ref={sidebarRef}
      id="sidebar"
      className="z-10 fixed top-0 right-0 h-full w-full max-w-[500px] bg-surface-a10 flex flex-col gap-12 translate-x-[500px]
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
          <CommonLi href="/despesas" title="Despesas" />
          <CommonLi href="/cadastrar-despesa" title="Cadastrar Despesa" />
          <CommonLi href="/cadastrar-tag" title="Cadastrar Tag" />
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
              <li
                onClick={async () => {
                  await signOut({ redirectTo: '/entrar' })
                }}
                className="flex items-stretch border-l-[5px] border-l-primary-a0 hover:bg-primary-a20"
              >
                <div className="flex items-center w-[100%] px-4 py-5 gap-3 cursor-pointer">
                  <Power size={24} />
                  Sair da aplicação
                </div>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  )
}
