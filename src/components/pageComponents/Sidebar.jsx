import Image from 'next/image'

import Profile from '/public/Images/profile.png'

import { BsEnvelopeAt } from "react-icons/bs";
import { FaMapLocationDot } from "react-icons/fa6";
import { FaDownload } from "react-icons/fa6";


// import info from '../info.json'


import SocialBtn from '../ui/SocialBtn'
import InfoBox from '../ui/InfoBox'


export default function Sidebar() {


    return (
        <div className="w-full mb-6 lg:mb-0 mx-auto relative text-center  bg-[#111111] p-6 rounded-[20px] mt-[180px] md:mt-[220px] lg:mt-0 ">
            <Image
                src={Profile}
                alt='Profile Pic'
                className='w-[240px] absolute left-[50%] transform -translate-x-[50%] h-[240px] drop-shadow-xl mx-auto rounded-[20px] -mt-[140px]'
                loading='eager'
            />
            <div className='pt-[100px]'>
                <h1 className='mt-6 text-3xl font-semibold  text-white'>Parmjeet Mishra</h1>
                
                <div className="relative inline-flex my-4 group">
                    <div
                        className="absolute transitiona-all duration-1000 opacity-70 -inset-px bg-gradient-to-r from-[#44BCFF] via-[#FF44EC] to-[#FF675E] rounded-xl blur-md group-hover:opacity-100 group-hover:-inset-1 group-hover:duration-200 animate-tilt">
                    </div>
                    <span
                        className="relative inline-flex items-center justify-center px-6 py-3 text-lg font-medium text-white transition-all duration-200 bg-gray-900 rounded-xl focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 "
                    >
                        FullStack React Developer
                    </span>
                </div>


                <SocialBtn />
            </div>
            <div className='p-6 rounded-3xl mt-7  bg-[#1D1D1D]'>
                <InfoBox
                    title="Email"
                    icon={<BsEnvelopeAt />}
                    email={`mailto:iamparmjeetmishra@gmail.com`}
                    info='iamparmjeetmishra@gmail.com'
                    color="text-[#E93B81] "
                />
                <InfoBox
                    title="Location"
                    icon={<FaMapLocationDot />}
                    email="#"
                    info='Ludhiana, Punjab'
                    color='text-[#6AB5B9]'
                />
            </div>
            <a
                href='https://rxresu.me/iamparmjeetmishra/react' target='_blank' rel='noopener noreferrer' className='inline-flex gap-2 items-center flex-nowrap mx-auto bg-neutral-800/90 duration-200 transition ease-linear hover:bg-gradient-to-l from-twOg-200 to-twOg-100 px-8 py-3 text-lg text-white rounded-full mt-6  '
            >
                <span className='w-8'>
                    <FaDownload />
                </span>
                <span>Download CV</span>
            </a>

        </div>
    )
}
