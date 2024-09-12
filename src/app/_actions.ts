'use server'

import { z } from 'zod'
import { Resend } from 'resend'
import { ContactFormSchema, FormDataSchema } from '@/components/lib/schema'
import ContactFormEmail from '../../react-email-starter/emails/contact-form'


type Inputs = z.infer<typeof FormDataSchema>


export async function addEntry(data: Inputs) {
    const result = FormDataSchema.safeParse(data)
  
    if (result.success) {
      return { success: true, data: result.data }
    }
  
    if (result.error) {
      return { success: false, error: result.error.format() }
    }
  }

  type ContactFormInputs = z.infer<typeof ContactFormSchema >
const resend = new Resend(process.env.RESEND_API_KEY)

export async function sendEmail(data: ContactFormInputs) {
    const result = ContactFormSchema.safeParse(data)

    if (result.success) {
        const { fullName, email, message } = result.data;
        try {
            const data = await resend.emails.send({
                from: 'noreply@parmjeetmishra.com',
                to: 'iamparmjeetmishra@gmail.com',
                reply_to: email,
                subject: 'Contact Form Submission',
                text: `Name: ${fullName}\nEmail: ${email}\nMessage: ${message}`,
                react: ContactFormEmail({ fullName, email, message })
            })
            return { success: true, data }
        } catch (error) {
            return {success: false, error}
        }
    }
    if (result.error) {
        return {success: false, error: result.error.format()}
    }
}