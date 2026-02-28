"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DeleteTeacherButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Are you sure you want to remove this teacher?")) return
    await fetch(`/api/teachers?id=${id}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="text-destructive hover:text-destructive hover:bg-destructive/10"
      onClick={handleDelete}
    >
      <Trash2 className="h-4 w-4" />
      <span className="sr-only">Delete teacher</span>
    </Button>
  )
}
