import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { teacherSchema } from "@/lib/validations/teacher"

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const teachers = await prisma.teacher.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { classes: true } } },
  })

  return NextResponse.json(teachers)
}

export async function POST(req: NextRequest) {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await req.json()
  const parsed = teacherSchema.safeParse(body)

  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.issues },
      { status: 400 }
    )
  }

  try {
    const teacher = await prisma.teacher.create({ data: parsed.data })
    return NextResponse.json(teacher, { status: 201 })
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

  await prisma.teacher.delete({ where: { id } })
  return NextResponse.json({ success: true })
}
