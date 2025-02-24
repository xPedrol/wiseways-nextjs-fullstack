'use client'
import { Menu } from 'lucide-react'

export default function SidebarButton() {
  const openSidebar = () => {
    const sidebar = document.getElementById('sidebar')
    if (sidebar) sidebar.classList.toggle('translate-x-[500px]')
  }
  return (
    <button onClick={openSidebar}>
      <Menu size={28} />
    </button>
  )
}
