import type { NextAuthConfig } from "next-auth";
const authPages = [
  "/",
  "perfil",
  "/despesas",
  "/tags",
  "/cadastrar-despesa",
  "/cadastrar-tag",
];
const apiPages = ["/api/despesas", "/api/tags"];
const justNoAuthPages = ["/entrar", "/cadastrar"];
export const authConfig = {
  pages: {
    signIn: "/entrar",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      let needsAuth = false;
      const apiPage = nextUrl.pathname.includes("/api");
      if (apiPage) {
        return true;
        needsAuth = apiPages.some((page) => nextUrl.pathname.startsWith(page));
      } else {
        needsAuth = authPages.some((page) => nextUrl.pathname === page);
      }
      if (needsAuth) {
        if (isLoggedIn) return true;
        if (apiPage) {
          return Response.json({ message: "Unauthorized" }, { status: 401 });
        }
        return false;
      } else if (isLoggedIn) {
        const justNoAuth = justNoAuthPages.some(
          (page) => nextUrl.pathname === page
        );
        if (justNoAuth) {
          return Response.redirect(new URL("/", nextUrl));
        }
      }
      return true;
    },
    async session({ session, user, token }) {
      if (token) {
        if (token.id) session.user.id = String(token.id);
        if (token.image) session.user.image = String(token.image);
        // expose jwt token on session for client use
        if (token.jwt) (session as any).jwt = String(token.jwt);
      }
      return session;
    },
    async jwt({ token, user, session, trigger }) {
      if (trigger === "update" && session?.user) {
        Object.assign(token, session.user);
      }
      if (user && "_id" in user) {
        token.id = user._id;
      }
      // if the credentials provider returned a token, save it in jwt
      if (user && (user as any).token) {
        token.jwt = (user as any).token;
      }
      return token;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
