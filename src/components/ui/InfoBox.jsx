

export default function InfoBox({ icon, title, info, email, color }) {
    return (
        <>
            <div className="flex py-2.5 border-b  border-[#3D3A3A]">
                <span className={`"flex  bg-black  p-3 text-2xl rounded-md shadow-md" ${color}`}>
                    {icon}
                </span>
                <div className="text-left ml-2.5">
                    <p className="text-xs text-[#A6A6A6]">{title}</p>
                    <p className="  text-white break-all">
                        <a href={email || info} target="_blank" rel="noopener noreferrer" className="hover:text-[#FA5252] duration-300 transition">{info || 'Info Button'}</a>
                    </p>
                </div>
            </div>

        </>
    )
}