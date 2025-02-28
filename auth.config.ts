import type { NextAuthConfig } from 'next-auth'
const authPages = ['/', 'perfil', '/despesas', '/cadastrar-despesa']
const justNoAuthPages = ['/entrar', '/cadastrar']
export const authConfig = {
  pages: {
    signIn: '/entrar',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const needsAuth = authPages.some((page) => nextUrl.pathname === page)
      if (needsAuth) {
        if (isLoggedIn) return true
        return false
      } else if (isLoggedIn) {
        const justNoAuth = justNoAuthPages.some(
          (page) => nextUrl.pathname === page,
        )
        if (justNoAuth) {
          return Response.redirect(new URL('/', nextUrl))
        }
      }
      return true
    },
  },
  providers: [],
} satisfies NextAuthConfig
