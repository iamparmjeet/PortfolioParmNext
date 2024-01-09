import { z } from "zod";

export const ContactFormSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email("Invalid email."),
  message: z
    .string()
    .min(6, { message: "Message must be at least 6 characters." }),
});




export const FormDataSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  message: z
    .string()
    .min(6, { message: "Message must be at least 6 characters." }),
});
