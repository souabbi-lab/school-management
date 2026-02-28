import { z } from "zod"

export const teacherSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  subject: z.string().min(2, "Subject must be at least 2 characters"),
})

export type TeacherFormValues = z.infer<typeof teacherSchema>
