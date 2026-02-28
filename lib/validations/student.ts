import { z } from "zod"

export const studentSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  classId: z.string().optional(),
})

export type StudentFormValues = z.infer<typeof studentSchema>
