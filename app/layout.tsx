import type { Metadata } from 'next'
import { DM_Sans } from 'next/font/google'
import './globals.scss'

const DMSans = DM_Sans({
  variable: '--font-dm-sans',
  subsets: ['latin'],
  weight: ['400', '500', '700', '800', '1000'],
})

export const metadata: Metadata = {
  title: {
    template: 'Wiseways - %s',
    default: 'Wiseways',
  },
  description:
    'Organização financeira simplificada: controle suas contas de forma rápida e prática! Nosso site oferece as ferramentas e recursos necessários para você gerenciar suas finanças com eficiência.',
}
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${DMSans.variable} antialiased`}>{children}</body>
    </html>
  )
}
