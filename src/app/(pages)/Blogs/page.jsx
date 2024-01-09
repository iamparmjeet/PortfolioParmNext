import { FaHashnode } from "react-icons/fa6";


export default function Page() {
   


    return (
        <>
            <section>
                <div className="flex items-center gap-5">
                    <h2 className="text-3xl font-bold">Blogs</h2>
                    <span className=" rounded-full h-1 w-36 bg-gradient-to-r from-twOg-100 to-twOg-200"></span>
                </div>
                <p className="my-5">I Published my Blog Posts on Hashnode. Please follow this url to read my posts.</p>
                
                <a
                    href='https://blogs.parmjeetmishra.com'
                    target='_blank'
                    className='p-3 flex items-center gap-2 w-fit bg-neutral-800/90 rounded-xl hover:bg-gradient-to-r from-twOg-100 to-twOg-200 hover:transition-background-color '
                    aria-label="My Blogs on Hasnode Link"
                >
                    <span>
                        <FaHashnode />
                    </span>
                    <span>Hashnode</span>
                </a>
            </section>
        </>
    )
}