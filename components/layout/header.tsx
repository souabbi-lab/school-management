"use client"

import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/shared/theme-toggle"
import { UserAvatarMenu } from "@/components/shared/user-avatar-menu"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet"
import { Sidebar } from "./sidebar"

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/students": "Students",
  "/dashboard/teachers": "Teachers",
  "/dashboard/classes": "Classes",
  "/dashboard/announcements": "Announcements",
}

interface HeaderProps {
  user?: {
    name?: string | null
    email?: string | null
    role?: string | null
  }
}

export function Header({ user }: HeaderProps) {
  const pathname = usePathname()
  const title = pageTitles[pathname] ?? "Dashboard"

  return (
    <header className="h-16 border-b flex items-center justify-between px-6 bg-card sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile menu */}
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Open menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 w-64">
            <SheetHeader className="sr-only">
              <SheetTitle>Navigation Menu</SheetTitle>
            </SheetHeader>
            <Sidebar user={user} />
          </SheetContent>
        </Sheet>
        <h1 className="text-lg font-semibold">{title}</h1>
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle />
        <UserAvatarMenu
          name={user?.name}
          email={user?.email}
          role={user?.role}
        />
      </div>
    </header>
  )
}
