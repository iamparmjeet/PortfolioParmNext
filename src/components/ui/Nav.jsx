import NavLink from './NavLink'

import { FaHouse } from "react-icons/fa6";

import { RxResume } from "react-icons/rx";
import { MdDashboard } from "react-icons/md";
import { TbNotebook } from "react-icons/tb";
import { RiContactsFill } from "react-icons/ri";




export default function Nav() {
    return (
        <>
            <ul className='flex items-center top-0 lg:flex-row lg:gap-4 gap-2 flex-col '>
                
                <NavLink href='/' title="Home" icon={<FaHouse />} />
                <NavLink href='/Resume' title="Resume" icon={<RxResume />} />
                <NavLink href='/Projects' title="Projects" icon={<MdDashboard />} />
                <NavLink href='/Blogs' title="Blogs" icon={<TbNotebook />} />
                <NavLink href='/Contact' title="Contact" icon={<RiContactsFill />} />
            </ul>
        </>
    )
}

// import Link from 'next/link'

// import HomeIcon from '/public/icons/HomeIcon'
// import ResumeIcon from '/public/icons/ResumeIcon'
// import WorksIcon from '/public/icons/WorksIcon'
// import BlogsIcon from '/public/icons/BlogsIcon'
// import ContactIcon from '/public/icons/ContactIcon'


// export default function Nav() {
//     return (
//         <>
//             <ul className='flex items-center top-0 lg:flex-row lg:gap-4 gap-0 flex-col '>
//                 <li className="lg:w-auto w-full">
//                     <Link
//                         href={'/'}
//                         className={({ isActive }) =>
//                             `w-full lg:w-20 lg:h-20 p-auto lg:rounded-xl cursor-pointer  bg-[#F3F6F6] font-medium text-gray-lite lg:justify-center flex p-2 gap-2 lg:gap-0 lg:flex-col flex-row items-center 
//                     ${isActive
//                                 ? 'bg-gradient-to-r from-twOg-200 to-twOg-100 text-white rounded-xl '
//                                 : '  text-[#A6A6A6] rounded-xl '
//                             } 
//                     transition-all duration-300 ease-in-out   hover:text-white   bg-[#212425]  hover:text-white  hover:bg-gradient-to-r from-twOg-200 to-twOg-100
//                     `}
//                     >
//                         <span className="text-xl mb-1 w-5"><HomeIcon /></span> {'Home'}
//                     </Link>
//                 </li>
//                 <li className="lg:w-auto w-full">
//                     <Link
//                         href={'/resume'}
//                         className={({ isActive }) =>
//                             `w-full lg:w-20 lg:h-20 p-auto lg:rounded-xl cursor-pointer  bg-[#F3F6F6] font-medium text-gray-lite lg:justify-center flex p-2 gap-2 lg:gap-0 lg:flex-col flex-row items-center 
//                     ${isActive
//                                 ? 'bg-gradient-to-r from-twOg-200 to-twOg-100 text-white rounded-xl '
//                                 : '  text-[#A6A6A6] rounded-xl '
//                             } 
//                     transition-all duration-300 ease-in-out   hover:text-white   bg-[#212425]  hover:text-white  hover:bg-gradient-to-r from-twOg-200 to-twOg-100
//                     `}
//                     >
//                         <span className="text-xl mb-1 w-5"><ResumeIcon /></span> {'Resume'}
//                     </Link>
//                 </li>
//                 <li className="lg:w-auto w-full">
//                     <Link
//                         href={'/works'}
//                         className={({ isActive }) =>
//                             `w-full lg:w-20 lg:h-20 p-auto lg:rounded-xl cursor-pointer  bg-[#F3F6F6] font-medium text-gray-lite lg:justify-center flex p-2 gap-2 lg:gap-0 lg:flex-col flex-row items-center 
//                     ${isActive
//                                 ? 'bg-gradient-to-r from-twOg-200 to-twOg-100 text-white rounded-xl '
//                                 : '  text-[#A6A6A6] rounded-xl '
//                             } 
//                     transition-all duration-300 ease-in-out   hover:text-white   bg-[#212425]  hover:text-white  hover:bg-gradient-to-r from-twOg-200 to-twOg-100
//                     `}
//                     >
//                         <span className="text-xl mb-1 w-5"><WorksIcon /></span> {'Works'}
//                     </Link>
//                 </li>
//                 <li className="lg:w-auto w-full">
//                     <Link
//                         href={'/blogs'}
//                         className={({ isActive }) =>
//                             `w-full lg:w-20 lg:h-20 p-auto lg:rounded-xl cursor-pointer  bg-[#F3F6F6] font-medium text-gray-lite lg:justify-center flex p-2 gap-2 lg:gap-0 lg:flex-col flex-row items-center 
//                     ${isActive
//                                 ? 'bg-gradient-to-r from-twOg-200 to-twOg-100 text-white rounded-xl '
//                                 : '  text-[#A6A6A6] rounded-xl '
//                             } 
//                     transition-all duration-300 ease-in-out   hover:text-white   bg-[#212425]  hover:text-white  hover:bg-gradient-to-r from-twOg-200 to-twOg-100
//                     `}
//                     >
//                         <span className="text-xl mb-1 w-5"><BlogsIcon /></span> {'Blogs'}
//                     </Link>
//                 </li>
//                 <li className="lg:w-auto w-full">
//                     <Link
//                         href={'/contact'}
//                         className={({ isActive }) =>
//                             `w-full lg:w-20 lg:h-20 p-auto lg:rounded-xl cursor-pointer  bg-[#F3F6F6] font-medium text-gray-lite lg:justify-center flex p-2 gap-2 lg:gap-0 lg:flex-col flex-row items-center 
//                     ${isActive
//                                 ? 'bg-gradient-to-r from-twOg-200 to-twOg-100 text-white rounded-xl '
//                                 : '  text-[#A6A6A6] rounded-xl '
//                             } 
//                     transition-all duration-300 ease-in-out   hover:text-white   bg-[#212425]  hover:text-white  hover:bg-gradient-to-r from-twOg-200 to-twOg-100
//                     `}
//                     >
//                         <span className="text-xl mb-1 w-5"><ContactIcon /></span> {'Contact'}
//                     </Link>
//                 </li>

//             </ul>
//         </>
//     )
// }