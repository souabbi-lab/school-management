import { PrismaClient, Role } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

async function main() {
  console.log("🌱 Seeding database...")

  // 1. Create Admin User
  const adminPassword = await bcrypt.hash("admin123", 12)
  const admin = await prisma.user.upsert({
    where: { email: "admin@school.com" },
    update: {},
    create: {
      name: "Admin User",
      email: "admin@school.com",
      password: adminPassword,
      role: Role.ADMIN,
    },
  })
  console.log("✅ Admin created:", admin.email)

  // 2. Create Teachers
  const teacher1 = await prisma.teacher.upsert({
    where: { email: "sarah.johnson@school.com" },
    update: {},
    create: {
      name: "Sarah Johnson",
      email: "sarah.johnson@school.com",
      subject: "Mathematics",
      phone: "+1-555-0101",
    },
  })

  const teacher2 = await prisma.teacher.upsert({
    where: { email: "michael.brown@school.com" },
    update: {},
    create: {
      name: "Michael Brown",
      email: "michael.brown@school.com",
      subject: "Science",
      phone: "+1-555-0102",
    },
  })

  const teacher3 = await prisma.teacher.upsert({
    where: { email: "emily.davis@school.com" },
    update: {},
    create: {
      name: "Emily Davis",
      email: "emily.davis@school.com",
      subject: "English Literature",
      phone: "+1-555-0103",
    },
  })
  console.log("✅ Teachers created")

  // 3. Create Classes
  const class1 = await prisma.class.upsert({
    where: { id: "class-9a" },
    update: {},
    create: {
      id: "class-9a",
      name: "9A",
      grade: "Grade 9",
      teacherId: teacher1.id,
    },
  })

  const class2 = await prisma.class.upsert({
    where: { id: "class-10b" },
    update: {},
    create: {
      id: "class-10b",
      name: "10B",
      grade: "Grade 10",
      teacherId: teacher2.id,
    },
  })

  const class3 = await prisma.class.upsert({
    where: { id: "class-11c" },
    update: {},
    create: {
      id: "class-11c",
      name: "11C",
      grade: "Grade 11",
      teacherId: teacher3.id,
    },
  })
  console.log("✅ Classes created")

  // 4. Create Students (10 total, distributed)
  const students = [
    { name: "Alice Martin", email: "alice.martin@student.com", phone: "+1-555-1001", classId: class1.id },
    { name: "Bob Thompson", email: "bob.thompson@student.com", phone: "+1-555-1002", classId: class1.id },
    { name: "Carol White", email: "carol.white@student.com", phone: "+1-555-1003", classId: class1.id },
    { name: "David Lee", email: "david.lee@student.com", phone: "+1-555-1004", classId: class1.id },
    { name: "Eva Garcia", email: "eva.garcia@student.com", phone: "+1-555-1005", classId: class2.id },
    { name: "Frank Wilson", email: "frank.wilson@student.com", phone: "+1-555-1006", classId: class2.id },
    { name: "Grace Taylor", email: "grace.taylor@student.com", phone: "+1-555-1007", classId: class2.id },
    { name: "Henry Anderson", email: "henry.anderson@student.com", phone: "+1-555-1008", classId: class3.id },
    { name: "Iris Clark", email: "iris.clark@student.com", phone: "+1-555-1009", classId: class3.id },
    { name: "Jack Robinson", email: "jack.robinson@student.com", phone: "+1-555-1010", classId: class3.id },
  ]

  for (const student of students) {
    await prisma.student.upsert({
      where: { email: student.email },
      update: {},
      create: student,
    })
  }
  console.log("✅ Students created")

  // 5. Create Announcements
  await prisma.announcement.upsert({
    where: { id: "ann-1" },
    update: {},
    create: {
      id: "ann-1",
      title: "Welcome to the New School Year!",
      content:
        "We are excited to welcome all students and staff to the new academic year. Classes begin on Monday. Please check your schedules and ensure you have all necessary materials.",
      authorId: admin.id,
    },
  })

  await prisma.announcement.upsert({
    where: { id: "ann-2" },
    update: {},
    create: {
      id: "ann-2",
      title: "Parent-Teacher Conference — March 15",
      content:
        "Parent-Teacher conferences are scheduled for March 15th from 9 AM to 5 PM. Please book your slot through the school portal. All parents are encouraged to attend.",
      authorId: admin.id,
    },
  })
  console.log("✅ Announcements created")

  console.log("🎉 Seeding complete!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
