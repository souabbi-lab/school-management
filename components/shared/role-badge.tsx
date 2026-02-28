import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface RoleBadgeProps {
  role: string
  className?: string
}

export function RoleBadge({ role, className }: RoleBadgeProps) {
  const variantMap: Record<string, "default" | "secondary" | "outline"> = {
    ADMIN: "default",
    TEACHER: "secondary",
    STUDENT: "outline",
  }

  return (
    <Badge
      variant={variantMap[role] ?? "outline"}
      className={cn("text-xs capitalize", className)}
    >
      {role.toLowerCase()}
    </Badge>
  )
}
