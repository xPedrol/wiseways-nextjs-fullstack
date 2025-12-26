import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import cfetch from "./config/fetchapi";

export const { auth, signIn, signOut, handlers } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials) {
        try {
          const response = await cfetch(`/users/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });
          const data = await response.json();
          if (response.status === 200) {
            // login route returns { user, token }
            // return a flattened object so next-auth callbacks can read user fields and token
            if (data && data.user) {
              return { ...data.user, token: data.token };
            }
            return data;
          } else {
            return null;
          }
        } catch (error) {
          return null;
        }
      },
    }),
  ],
});
