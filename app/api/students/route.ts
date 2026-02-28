import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { studentSchema } from "@/lib/validations/student"

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const students = await prisma.student.findMany({
    orderBy: { enrolledAt: "desc" },
    include: { class: { select: { name: true, grade: true } } },
  })

  return NextResponse.json(students)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = studentSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    )
  }

  const { name, email, phone, classId } = parsed.data

  try {
    const student = await prisma.student.create({
      data: { name, email, phone, classId: classId || null },
      include: { class: { select: { name: true, grade: true } } },
    })
    return NextResponse.json(student, { status: 201 })
  } catch {
    return NextResponse.json(
      { error: "Email already in use" },
      { status: 409 }
    )
  }
}

export async function DELETE(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { searchParams } = new URL(req.url)
  const id = searchParams.get("id")

  if (!id) {
    return NextResponse.json({ error: "ID required" }, { status: 400 })
  }

  await prisma.student.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
