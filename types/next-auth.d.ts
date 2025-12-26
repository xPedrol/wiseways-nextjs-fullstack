import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    /** JWT token returned from API and stored by next-auth callbacks */
    jwt?: string;
  }

  interface User {
    /** token returned by credentials provider */
    token?: string;
    _id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    jwt?: string;
    id?: string;
  }
}
