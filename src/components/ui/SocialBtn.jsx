import { FaSquareXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";





import info from '/info.json'

export default function SocialBtn() {
    return (
        <>
            <div className='flex justify-center text-2xl  space-x-3'>
                <a
                    href={info.socials.twitter}
                    target='noreferrer noopener'
                    className='p-3 flex bg-neutral-800/90 rounded-xl hover:bg-gradient-to-r from-twOg-100 to-twOg-200 hover:transition-background-color '
                    aria-label="My Twitter Link"
                >
                    <FaSquareXTwitter />
                </a>
                <a
                    href={info.socials.linkedin}
                    target='noreferrer noopener'
                    className='p-3 flex bg-neutral-800/90 rounded-xl hover:bg-gradient-to-r from-twOg-100 to-twOg-200 hover:transition-background-color '
                    aria-label="My Linkedin Link"
                >
                    <FaLinkedin />
                </a>
                <a
                    href={info.socials.github}
                    target='noreferrer noopener'
                    className='p-3 flex bg-neutral-800/90 rounded-xl hover:bg-gradient-to-r from-twOg-100 to-twOg-200 hover:transition-background-color '
                    aria-label="My Github Link"
                >
                    <FaGithub />
                </a>
            </div>
        </>
    )
}