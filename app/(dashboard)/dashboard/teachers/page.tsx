import { prisma } from "@/lib/prisma"
import { TeacherDialog } from "@/components/teachers/teacher-dialog"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { DeleteTeacherButton } from "@/components/teachers/delete-teacher-button"

export default async function TeachersPage() {
  const teachers = await prisma.teacher.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { classes: true } } },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Teachers</h2>
          <p className="text-muted-foreground">
            {teachers.length} teacher{teachers.length !== 1 ? "s" : ""} on staff
          </p>
        </div>
        <TeacherDialog />
      </div>

      {teachers.length === 0 ? (
        <div className="text-center py-12 text-muted-foreground">
          No teachers found. Add one to get started.
        </div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Subject</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Classes</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teachers.map((teacher) => (
                <TableRow key={teacher.id}>
                  <TableCell className="font-medium">{teacher.name}</TableCell>
                  <TableCell className="text-muted-foreground">{teacher.email}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{teacher.subject}</Badge>
                  </TableCell>
                  <TableCell>{teacher.phone}</TableCell>
                  <TableCell>
                    <Badge variant="secondary">{teacher._count.classes}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DeleteTeacherButton id={teacher.id} />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  )
}
