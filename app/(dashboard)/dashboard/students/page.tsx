import { prisma } from "@/lib/prisma"
import { StudentDialog } from "@/components/students/student-dialog"
import { StudentsTable } from "@/components/students/students-table"

export default async function StudentsPage() {
  const [students, classes] = await Promise.all([
    prisma.student.findMany({
      orderBy: { enrolledAt: "desc" },
      include: { class: { select: { name: true, grade: true } } },
    }),
    prisma.class.findMany({ orderBy: { name: "asc" } }),
  ])

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Students</h2>
          <p className="text-muted-foreground">
            {students.length} student{students.length !== 1 ? "s" : ""} enrolled
          </p>
        </div>
        <StudentDialog classes={classes} />
      </div>
      <StudentsTable students={students} />
    </div>
  )
}
