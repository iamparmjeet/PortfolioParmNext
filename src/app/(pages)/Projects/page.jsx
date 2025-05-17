
import Parmjeet from '/public/Images/parmjeetmishra.jpg'
import Amarjeet from '/public/Images/amarjeetmishra.jpg'
import NextEmail from '/public/Images/NextEmail.jpg'
import NextLogin from '/public/Images/NextOtpLogin.jpg'
import NextJobs from '/public/Images/NextJobs.jpg'
import PetCare from '/public/Images/PetCare.jpg'
import Evento from '/public/Images/evento.jpg'

import ProjectCard from '/src/components/ui/ProjectCard'
//import TagBtn from '/src/components/ui/TagBtn'

export default function Page() {
    return (
        <>
            <section className='' >
                <div className="flex items-center gap-5 mb-8">
                    <h2 className="text-3xl font-bold">Projects</h2>
                    <span className=" rounded-full h-1 w-36 bg-gradient-to-r from-twOg-100 to-twOg-200"></span>
                </div>
                <p className='mb-8'>Here are some of my published works.</p>
                <main className='grid grid-cols-1 md:grid-cols-2 gap-6'>

                    <ProjectCard
                        src={Parmjeet}
                        href={'https://parmjeetmishra.com'}
                        title='Parmjeet Mishra'
                        desc='Nextjs Portfolio App'
                        tags={'Nextjs | React | Zod | React-Hook-Form | Zod | Resend Email Api | TailwindCSS | Props | Components | App Router | Google Tag | CSP | '}
                        git='https://github.com/iamparmjeet/PortfolioParmNext'
                    />

                    <ProjectCard
                        src={Amarjeet}
                        href='https://amarjeetmishra.com'
                        title='Amarjeet Mishra'
                        desc='Nextjs Portfolio App'
                        tags='React | Nextjs | VideoComponent [VidStack] | React-Hook-Form | Zod | Resend Email Api | TailwindCSS | Props | '
                        git='https://github.com/iamparmjeet/PortfolioAmar'
                    />
                    <ProjectCard
                        src={NextEmail}
                        href='https://nextemail.parmjeetmishra.com'
                        title='Next Email'
                        desc="Nextjs Email App"
                        tags='Nextjs | Zod | React-Hook-Form | Form-Validation | Schema | Error | Toast Notification | Form Data Handling'
                        git='https://github.com/iamparmjeet/NextEmail'
                    />
                    <ProjectCard
                        src={NextLogin}
                        href='https://nextloginwithotp.parmjeetmishra.com/'
                        title='Next Login with OTP App'
                        desc="Nextjs Login app with OTP. How UI works"
                        tags='Nextjs | React | useRef | useEffect | useState |'
                        git='https://github.com/iamparmjeet/NextOtpLogin'
                    />
                    <ProjectCard
                        src={NextJobs}
                        href='https://nextjobs.parmjeetmishra.com/'
                        title='nxtRmtJobs'
                        desc="nxtRmtJobs - Job Portal with with API fetching and caching"
                        tags='React-vite App | useState | React Query | Components Structure | useContext | Custom Hooks | Popups | Search and Filtering | LocalStorage'
                        git='https://github.com/iamparmjeet/NxtRmtDev'
                    />
                    <ProjectCard
                        src={PetCare}
                        href='https://petcare.parmjeetmishra.com/'
                        title='PetCare'
                        desc="PetCare-Manage your pet daycare with ease"
                        tags='NextJS | TailwindCSS | Components | Middleware | NextAuth | Postgres DB | Prisma ORM | Typescript | React-Query | Toast | Stripe | Webhooks'
                        git='https://github.com/iamparmjeet/PetCare'
                    />
                    <ProjectCard
                        src={Evento}
                        href='https://evento.parmjeetmishra.com/'
                        title='Evento'
                        desc="Evento - Search your events"
                        tags='NextJS | TailwindCSS | Components | Postgres DB | Prisma ORM | Typescript | React-Query | Zod'
                        git='https://github.com/iamparmjeet/EventoV2'
                    />
                </main>
            </section>
        </>
    )
}