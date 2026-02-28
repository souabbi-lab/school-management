"use client"

import { useRouter } from "next/navigation"
import { format } from "date-fns"
import { Trash2 } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface StudentWithClass {
  id: string
  name: string
  email: string
  phone: string
  enrolledAt: Date
  class: { name: string; grade: string } | null
}

interface StudentsTableProps {
  students: StudentWithClass[]
}

export function StudentsTable({ students }: StudentsTableProps) {
  const router = useRouter()

  async function handleDelete(id: string) {
    if (!confirm("Are you sure you want to remove this student?")) return
    await fetch(`/api/students?id=${id}`, { method: "DELETE" })
    router.refresh()
  }

  if (students.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        No students found. Add one to get started.
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Class</TableHead>
            <TableHead>Enrolled</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => (
            <TableRow key={student.id}>
              <TableCell className="font-medium">{student.name}</TableCell>
              <TableCell className="text-muted-foreground">{student.email}</TableCell>
              <TableCell>{student.phone}</TableCell>
              <TableCell>
                {student.class ? (
                  <Badge variant="secondary">
                    {student.class.name}
                  </Badge>
                ) : (
                  <span className="text-muted-foreground text-sm">—</span>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground text-sm">
                {format(new Date(student.enrolledAt), "MMM d, yyyy")}
              </TableCell>
              <TableCell className="text-right">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  onClick={() => handleDelete(student.id)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Delete student</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
