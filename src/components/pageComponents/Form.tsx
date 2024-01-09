'use client'
import * as z from 'zod'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { ContactFormSchema } from '../lib/schema'

import {sendEmail} from '../../app/_actions'
import {toast} from 'sonner'


import { FaUser } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { TfiWrite } from "react-icons/tfi";


export type ContactFormInputs = z.infer<typeof ContactFormSchema>

// const schema = z.object({
//     fullName: z.string().min(3).max(30),
//     email: z.string().email(),
//     message: z.string().min(5)
// })

export default function Form() {

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful, isSubmitting } } = useForm({ resolver: zodResolver(ContactFormSchema) })

    const submitData: SubmitHandler<ContactFormInputs> = async data => {
        // todo: Submit to Server
        // setFormData(data)
        // data.preventDefault()
        const result = await sendEmail(data);
        if (result?.success) {
            console.log('Done', data)
            toast.success('Email Sent')
            reset();
            return
        }
        // toast error
        console.log(result?.error)
        toast.error('Something went wrong!')
    }

    return (
        <>
            <form onSubmit={handleSubmit(submitData as any)} className="w-full max-w-md ">
                <div className='mb-5 flex flex-col gap-2'>
                    <label htmlFor="fullName" className="label">
                        Your Name
                    </label>
                    <div className="relative mb-2">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <FaUser className="w-5" />
                        </div>
                        <input type="text"  id="fullName" className='input' placeholder="Enter your name" {...register("fullName")} />
                    </div>
                    {errors.fullName?.message && ( <div className='text-red-600'>{errors.fullName.message as any}</div> )}
                </div>
                <div className='mb-5 flex flex-col gap-2'>
                    <label htmlFor="email" className="label">
                        Your Email
                    </label>
                    <div className="relative mb-4">
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            <MdEmail className="w-5" />
                        </div>
                        <input type="email" className='input'  id="email" placeholder="Enter your email" {...register("email")} autoComplete='false' />
                    </div>
                    {errors.email && <span className='text-red-600'>{errors.email.message as any}</span>}
                </div>
                <div className='mb-5 flex flex-col gap-2'>
                    <label htmlFor="message" className="label">
                        Your Message
                    </label>
                    <div className="relative mb-4 ">
                        <div className="absolute inset-y-0 start-0 flex items-start pt-3.5 ps-3.5 pointer-events-none">
                            <TfiWrite className="w-5" />
                        </div>
                        <textarea  className='input' id="message"  placeholder="Enter your message" {...register("message")} />
                    </div>
                    {errors.message && <span className='text-red-600'>{errors.message.message as any}</span>}
                </div>
                <button disabled={isSubmitting} type='submit' className='px-10 py-3 flex bg-neutral-800/90 font-semibold rounded-xl  hover:bg-gradient-to-r from-twOg-100 to-twOg-200 hover:transition-background-color'>{ isSubmitting ? 'Submitting...' : 'Submit' }</button>
            </form>
            {isSubmitSuccessful && (
                <h2 className='font-bold text-xl my-4  text-green-500'>Form Successfully submitted</h2>
            )}
        </>
    )
}