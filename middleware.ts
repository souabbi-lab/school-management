import NextAuth from "next-auth"
import { authConfig } from "@/auth.config"

// Use the edge-safe config (no Prisma / bcryptjs) to stay under the 1 MB limit.
export const { auth: middleware } = NextAuth(authConfig)

export default middleware

export const config = {
  matcher: ["/dashboard/:path*"],
}
