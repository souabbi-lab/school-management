"use client"

import { useRouter } from "next/navigation"
import { Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export function DeleteAnnouncementButton({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this announcement?")) return
    await fetch(`/api/announcements?id=${id}`, { method: "DELETE" })
    router.refresh()
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-7 w-7 text-destructive hover:text-destructive hover:bg-destructive/10"
      onClick={handleDelete}
    >
      <Trash2 className="h-3.5 w-3.5" />
      <span className="sr-only">Delete announcement</span>
    </Button>
  )
}
