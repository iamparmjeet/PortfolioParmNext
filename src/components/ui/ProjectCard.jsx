import Image from 'next/image'
import { FaExternalLinkAlt } from "react-icons/fa";


export default function ProjectCard({ src, href, title, desc, tags, git }) {
    return (
        <>
            <main className='border border-gray-500 shadow-md rounded-xl overflow-hidden'>
                <Image
                    src={src}
                    alt={title}
                    placeholder='blur'
                    className=''
                />
                <div className='p-6 bg-black border-t border-gray-500 '>
                    <a href={href} target='_blank' className='hover:cursor-pointer'>
                        <h3 className='text-xl font-bold mb-2' > {title}</h3>
                    </a>
                    <span className='mb-2 flex row-auto items-center justify-between '>
                        <p className='text-gray-400'>{desc}</p>
                        <a href={git || '#'} target='_blank' className='flex items-center gap-2 cursor-pointer hover:text-twOg-200 '>
                            <span>Github</span>
                            <span><FaExternalLinkAlt /></span>
                        </a>
                    </span>

                        <p className='text-sm text-twOg-100 cursor-pointer text-wrap'>{tags}</p>
                </div>
            </main>
        </>
    )
}