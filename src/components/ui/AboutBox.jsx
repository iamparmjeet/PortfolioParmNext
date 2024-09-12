

export default function AboutBox({icon, title, text, iconColor}) {
    return (
        <>
            <div className="p-6 border border-1 flex gap-5 rounded-lg border-white/10 ">
                <div className={`text-4xl object-contain block ${iconColor || 'text-twOg-200'}`} >
                    {icon}
                </div>
                <div className="space-y-2 break-all">
                    <h3 className="dark:text-white break-normal text-xl font-semibold">{title}</h3>
                    <p className="leading-8 break-normal text-gray-200 dark:text-slate-300">{text}</p>
                </div>

            </div>
        </>
    )
}