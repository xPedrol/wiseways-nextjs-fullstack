'use client'
import { Menu } from 'lucide-react'

export default function SidebarButton() {
  const openSidebar = () => {
    const sidebar = document.getElementById('sidebar')
    if (sidebar) sidebar.classList.toggle('translate-x-[500px]')
  }
  return (
    <button
      onClick={openSidebar}
      title="Abrir/Fechar Sidebar"
      aria-label="Abrir/Fechar Sidebar"
    >
      <Menu size={28} />
    </button>
  )
}
