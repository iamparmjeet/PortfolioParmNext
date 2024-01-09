import { RxResume } from "react-icons/rx";



export default function Page() {
    return (
        <section>
            <div className="flex items-center gap-5">
                <h2 className="text-3xl font-bold">Resume</h2>
                <span className=" rounded-full h-1 w-36 bg-gradient-to-r from-twOg-100 to-twOg-200"></span>
            </div>
            <p className="my-5">Here is the Link for my updated Resume.</p>
            <a
                    href='https://rxresu.me/iamparmjeetmishra/react'
                    target='_blank'
                    className='p-3 flex items-center gap-2 w-fit bg-neutral-800/90 rounded-xl hover:bg-gradient-to-r from-twOg-100 to-twOg-200 hover:transition-background-color '
                    aria-label="My Blogs on Hasnode Link"
                >
                    <span>
                        <RxResume />
                    </span>
                    <span>Resume</span>
                </a>
            
        </section>
    )
}