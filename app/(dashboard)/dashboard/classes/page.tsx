import { prisma } from "@/lib/prisma"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { School, Users } from "lucide-react"

export default async function ClassesPage() {
  const classes = await prisma.class.findMany({
    orderBy: { name: "asc" },
    include: {
      teacher: { select: { name: true, subject: true } },
      _count: { select: { students: true } },
    },
  })

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Classes</h2>
        <p className="text-muted-foreground">
          {classes.length} class{classes.length !== 1 ? "es" : ""} total
        </p>
      </div>

      {classes.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No classes found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {classes.map((cls) => (
            <Card key={cls.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                      <School className="h-5 w-5 text-primary" />
                    </div>
                    <CardTitle className="text-lg">{cls.name}</CardTitle>
                  </div>
                  <Badge variant="secondary">{cls.grade}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Teacher:</span>{" "}
                  {cls.teacher.name}
                </div>
                <div className="text-sm text-muted-foreground">
                  <span className="font-medium text-foreground">Subject:</span>{" "}
                  {cls.teacher.subject}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>
                    <span className="font-semibold">{cls._count.students}</span>{" "}
                    student{cls._count.students !== 1 ? "s" : ""}
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
