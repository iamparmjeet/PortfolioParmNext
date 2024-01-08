
export default function Footer() {

    const date = new Date()
    let year = date.getFullYear()

    return (
        <footer className="overflow-hidden rounded-b-2xl  bg-black">
            <div className="container">
                <p className="text-center py-6 text-gray-lite text-color-910 ">
                    © {year} All Rights Reserverd | Build By Parm
                </p>
            </div>
        </footer>
    )
}