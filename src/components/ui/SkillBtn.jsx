

export default function SkillBtn({ title }) {
    return (
        <>
            <button className="relative inline-flex items-center justify-center p-0.5 mb-2 me-2 overflow-hidden rounded-lg group  bg-gradient-to-br from-twOg-100  to-twOg-200 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white text-white focus:ring-4 focus:outline-none focus:ring-blue-800">
                <span className="relative px-3 py-1 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0 font-medium ">
                    {title}
                </span> </button>
        </>
    )
}