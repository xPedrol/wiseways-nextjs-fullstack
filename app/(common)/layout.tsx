import { Header } from '@/components/molecules/Header'
import Sidebar from '@/components/molecules/Sidebar'
import { SessionProvider } from 'next-auth/react'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SessionProvider>
      <Header />
      <Sidebar />
      <div className="mb-10">{children}</div>
    </SessionProvider>
  )
}
