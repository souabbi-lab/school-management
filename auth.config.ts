import type { NextAuthConfig } from "next-auth"

/**
 * Edge-safe auth config — NO Prisma, NO bcryptjs.
 * Used by middleware.ts to keep the Edge bundle under 1 MB.
 * The full Credentials provider (with DB + bcrypt) lives in auth.ts.
 */
export const authConfig: NextAuthConfig = {
  session: { strategy: "jwt" },
  pages: {
    signIn: "/login",
  },
  providers: [], // filled in auth.ts
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard")

      if (isOnDashboard) {
        return isLoggedIn // redirect to signIn page if not logged in
      }
      return true
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.role = (user as { role: string }).role
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string
        session.user.role = token.role as string
      }
      return session
    },
  },
}
