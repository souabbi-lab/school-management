"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  GraduationCap,
  UserCog,
  School,
  Megaphone,
  LogOut,
} from "lucide-react"
import { signOut } from "next-auth/react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { RoleBadge } from "@/components/shared/role-badge"

const navLinks = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/students", label: "Students", icon: GraduationCap },
  { href: "/dashboard/teachers", label: "Teachers", icon: UserCog },
  { href: "/dashboard/classes", label: "Classes", icon: School },
  { href: "/dashboard/announcements", label: "Announcements", icon: Megaphone },
]

interface SidebarProps {
  user?: {
    name?: string | null
    email?: string | null
    role?: string | null
  }
}

export function Sidebar({ user }: SidebarProps) {
  const pathname = usePathname()

  const initials = user?.name
    ? user.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2)
    : "U"

  return (
    <aside className="flex flex-col w-64 min-h-screen border-r bg-card">
      {/* Logo */}
      <div className="flex items-center gap-2 px-6 py-5 border-b">
        <School className="h-6 w-6 text-primary" />
        <span className="font-bold text-lg text-primary">EduManage</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navLinks.map(({ href, label, icon: Icon }) => {
          const isActive =
            href === "/dashboard"
              ? pathname === "/dashboard"
              : pathname.startsWith(href)

          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* User section */}
      <div className="border-t px-3 py-4">
        <Separator className="mb-4" />
        <div className="flex items-center gap-3 px-2 mb-3">
          <Avatar className="h-9 w-9">
            <AvatarFallback className="text-xs bg-primary text-primary-foreground">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col min-w-0">
            <p className="text-sm font-medium truncate">{user?.name}</p>
            {user?.role && <RoleBadge role={user.role} />}
          </div>
        </div>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-2 text-muted-foreground hover:text-destructive"
          onClick={() => signOut({ callbackUrl: "/login" })}
        >
          <LogOut className="h-4 w-4" />
          Sign out
        </Button>
      </div>
    </aside>
  )
}
