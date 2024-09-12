
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function NavLink({ icon, href, title }) {

    const pathname = usePathname()
    // const router = useRouter()

    return (
        <>
            <li className="lg:w-auto w-full ">
                <Link
                    href={href}
                    className={` w-full md:w-20 md:h-20 p-auto md:rounded-xl cursor-pointer  font-medium text-gray-lite p-2 flex md:items-center md:justify-center gap-2 md:gap-0 md:flex-col flex-row items-center 
                    ${pathname === href
                            ? 'bg-gradient-to-r from-twOg-200 to-twOg-100 text-white rounded-xl '
                            : '  text-[#A6A6A6] rounded-xl bg-black '
                        } 
                        transition-all duration-300 ease-in-out  bg-[#212425]  hover:text-white  hover:bg-gradient-to-r from-twOg-200 to-twOg-100
                    `}
                >
                    <span className="text-xl mb-1 w-5">
                        {icon}
                    </span> {title}
                </Link>
            </li>
        </>
    )
}