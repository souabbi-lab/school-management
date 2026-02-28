import { auth } from "@/auth"
import { redirect } from "next/navigation"
import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user) {
    redirect("/login")
  }

  const user = {
    name: session.user.name,
    email: session.user.email,
    role: session.user.role,
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar — hidden on mobile */}
      <div className="hidden md:flex">
        <Sidebar user={user} />
      </div>

      {/* Main content */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header user={user} />
        <main className="flex-1 p-6 overflow-auto">{children}</main>
      </div>
    </div>
  )
}
