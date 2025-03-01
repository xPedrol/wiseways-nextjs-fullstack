import type { NextAuthConfig } from 'next-auth'
const authPages = ['/', 'perfil', '/despesas', '/cadastrar-despesa']
const apiPages = ['/api/users']
const justNoAuthPages = ['/entrar', '/cadastrar']
export const authConfig = {
  pages: {
    signIn: '/entrar',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      let needsAuth = false
      const apiPage = nextUrl.pathname.includes('/api')
      if (apiPage) {
        needsAuth = apiPages.some((page) => nextUrl.pathname === page)
      } else {
        needsAuth = authPages.some((page) => nextUrl.pathname === page)
      }
      if (needsAuth) {
        if (isLoggedIn) return true
        if (apiPage) {
          return Response.json({ message: 'Unauthorized' }, { status: 401 })
        }
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
