'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from "react"
import { useAutoAnimate } from '@formkit/auto-animate/react';

import { IoSunnyOutline } from "react-icons/io5";
import { IoMoon } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { IoMdClose } from "react-icons/io";

import { FaBarsStaggered } from "react-icons/fa6";



import Nav from "../ui/Nav"


export default function Header()  {
    const [toggleMenu, setToggleMenu] = useState(false);
    const [animate] = useAutoAnimate()
    const menuRef = useRef()
   
    useEffect(() => {
        let handler = (e) => {
            if (!menuRef.current.contains(e.target)) {
                setToggleMenu(false);
            }
        }
        document.addEventListener('click', handler)

        return () => {
            document.removeEventListener('click', handler)
        }
    })

    return (
        <>
            <header ref={animate}  className="container w-full flex items-center  bg-[#111111]  justify-between p-3  mt-4 sm:rounded-xl ">
                <div className="w-full flex justify-between px-4">
                    <Link href='/' >
                        <div className="flex items-center gap-3 ">
                            <span className="w-8 h-8 text-3xl font-bold flex items-center justify-center lg:w-12 lg:h-12  rounded bg-gradient-to-r from-twOg-200 to-twOg-100 text-white">
                                <FaCode />
                            </span>
                            <span className="text-2xl font-semibold">
                                Parmjeet Mishra
                            </span>
                        </div>
                    </Link>
                    <div className="items-center hidden">
                        <span className="bg-white w-[40px] hover:text-white hidden h-[40px] rounded-full lg:flex justify-center items-center text-black hover:bg-[#ef4060] transition-all duration-300 ease-in-out cursor-pointer ml-2 " >
                            <IoSunnyOutline />
                            <IoMoon />
                        </span>
                    </div>
                </div>
                {/* Has Nav */}
                <div className="p-4 ml-auto rounded-lg hidden lg:block  bg-[#111111]">
                    <Nav />
                </div>
                <button
                    ref={menuRef}
                    onClick={() => setToggleMenu(prev => !prev)}
                    className="lg:invisible visible opacity-100 bg-[#ef4060] w-10 h-10 rounded-full flex justify-center cursor-pointer items-center  text-white "
                    role='button'
                    aria-label='mobile-menu'
                    aria-labelledby='mobile-menu'
                >
                    {toggleMenu
                        ? <IoMdClose onClick={() => setToggleMenu(true)} />
                        : <FaBarsStaggered onClick={() => setToggleMenu(false)} />
                    }
                    {/* <Nav /> */}
                </button>
            </header>
            {
                toggleMenu && (
                    <div className="relative z-10 w-full h-full">
                            <div className="absolute left-0 right-0 p-6  bg-[#212425] rounded-xl ">
                                <Nav />
                            </div>
                    </div>
                )
            }
        </>
    )
}