import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function GET() {
  const session = await auth()
  if (!session?.user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const classes = await prisma.class.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      teacher: { select: { name: true, subject: true } },
      _count: { select: { students: true } },
    },
  })

  return NextResponse.json(classes)
}
