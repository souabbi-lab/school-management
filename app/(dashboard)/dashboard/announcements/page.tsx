import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { AnnouncementDialog } from "@/components/announcements/announcement-dialog"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { format } from "date-fns"
import { DeleteAnnouncementButton } from "@/components/announcements/delete-announcement-button"

export default async function AnnouncementsPage() {
  const session = await auth()
  const isAdmin = session?.user?.role === "ADMIN"

  const announcements = await prisma.announcement.findMany({
    orderBy: { createdAt: "desc" },
    include: { author: { select: { name: true, role: true } } },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Announcements</h2>
          <p className="text-muted-foreground">
            {announcements.length} announcement{announcements.length !== 1 ? "s" : ""}
          </p>
        </div>
        {isAdmin && <AnnouncementDialog />}
      </div>

      {announcements.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No announcements yet.
          {isAdmin && " Click \"New Announcement\" to create one."}
        </div>
      ) : (
        <div className="grid gap-4">
          {announcements.map((announcement) => (
            <Card key={announcement.id}>
              <CardHeader className="pb-2">
                <div className="flex items-start justify-between gap-4">
                  <CardTitle className="text-base leading-snug">
                    {announcement.title}
                  </CardTitle>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {format(new Date(announcement.createdAt), "MMM d, yyyy")}
                    </span>
                    {isAdmin && (
                      <DeleteAnnouncementButton id={announcement.id} />
                    )}
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-muted-foreground">
                    By {announcement.author.name}
                  </span>
                  <Badge variant="outline" className="text-xs capitalize">
                    {announcement.author.role.toLowerCase()}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {announcement.content}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
