import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { StatCard } from "@/components/dashboard/stat-card"
import { RoleBadge } from "@/components/shared/role-badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { GraduationCap, UserCog, School, Megaphone } from "lucide-react"
import { format } from "date-fns"

export default async function DashboardPage() {
  const session = await auth()

  const [studentsCount, teachersCount, classesCount, announcementsCount, recentAnnouncements] =
    await Promise.all([
      prisma.student.count(),
      prisma.teacher.count(),
      prisma.class.count(),
      prisma.announcement.count(),
      prisma.announcement.findMany({
        take: 3,
        orderBy: { createdAt: "desc" },
        include: { author: { select: { name: true } } },
      }),
    ])

  return (
    <div className="space-y-8">
      {/* Welcome header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">
            Welcome back, {session?.user?.name?.split(" ")[0]} 👋
          </h2>
          <p className="text-muted-foreground mt-1">
            Here&apos;s what&apos;s happening at your school today.
          </p>
        </div>
        {session?.user?.role && <RoleBadge role={session.user.role} />}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Total Students"
          value={studentsCount}
          icon={GraduationCap}
          description="Enrolled this year"
        />
        <StatCard
          title="Total Teachers"
          value={teachersCount}
          icon={UserCog}
          description="Active faculty"
        />
        <StatCard
          title="Classes"
          value={classesCount}
          icon={School}
          description="Active classes"
        />
        <StatCard
          title="Announcements"
          value={announcementsCount}
          icon={Megaphone}
          description="Published notices"
        />
      </div>

      {/* Recent Announcements */}
      <div>
        <h3 className="text-lg font-semibold mb-4">Recent Announcements</h3>
        <div className="grid gap-4">
          {recentAnnouncements.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No announcements yet.
              </CardContent>
            </Card>
          ) : (
            recentAnnouncements.map((announcement) => (
              <Card key={announcement.id}>
                <CardHeader className="pb-2">
                  <div className="flex items-start justify-between gap-2">
                    <CardTitle className="text-base">{announcement.title}</CardTitle>
                    <span className="text-xs text-muted-foreground whitespace-nowrap">
                      {format(new Date(announcement.createdAt), "MMM d, yyyy")}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    By {announcement.author.name}
                  </p>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {announcement.content}
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
