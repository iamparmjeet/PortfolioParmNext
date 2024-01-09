
import Parmjeet from '/public/Images/parmjeetmishra.jpg'
import Amarjeet from '/public/Images/amarjeetmishra.jpg'

import ProjectCard from '/src/components/ui/ProjectCard'
import TagBtn from '/src/components/ui/TagBtn'

export default function Page() {
    return (
        <>
            <section className='' >
                <div className="flex items-center gap-5 mb-8">
                    <h2 className="text-3xl font-bold">Projects</h2>
                    <span className=" rounded-full h-1 w-36 bg-gradient-to-r from-twOg-100 to-twOg-200"></span>
                </div>
                <p className='mb-8'>Here are some of published works.</p>
                <main className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                    <ProjectCard src={Parmjeet} title='Parmjeet Mishra' desc='Nextjs Portfolio App' tags={'Nextjs | React | Zod | React-Hook-Form | Zod | Resend Email Api | TailwindCSS | Props | Components | App Router | Google Tag | CSP | '} git='https://github.com/iamparmjeetmishra/PortfolioParmNext' />
                    <ProjectCard src={Amarjeet} title='Amarjeet Mishra' desc='Nextjs Portfolio App' tags='React | Nextjs | VideoComponent [VidStack] | React-Hook-Form | Zod | Resend Email Api | TailwindCSS | Props | ' git='https://github.com/iamparmjeetmishra/PortfolioAmar' />
                </main>
            </section>
        </>
    )
}