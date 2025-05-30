import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

import Header from "../components/pageComponents/Header";
import Sidebar from "../components/pageComponents/Sidebar";
import Footer from "../components/pageComponents/Footer";
import { CSPostHogProvider } from "@/lib/providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Parmjeet Mishra | FullStack Developer ",
	description: "FullStack Developer",
	keywords:
		"FrontEnd, Fullstack, Full-stack, Parm Ludhiana, India, React, Reactjs, Nextjs, NextjsApp, Vercel, Portfolio, Website Designer, website",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<head>
				<meta
					name="google-site-verification"
					content="k4IgcsXPZlXiSN5ifFqeYw4lHr60j8ibdH3k3HN4uDw"
				/>
			</head>
			<CSPostHogProvider>
				<body className={`${inter.className} bg-black text-white`}>
					<section className="bg-homeBg container mx-auto min-h-screen bg-no-repeat bg-center bg-cover bg-fixed bg-homeTwo Bg-dark md:pb-16 w-full">
						<Header />
						<div className="container grid grid-cols-12 md:gap-10 justify-between lg:mt-[220px]">
							<div className="col-span-12 grid lg:col-span-4 lg:h-screen lg:sticky top-44">
								<Sidebar />
							</div>
							<div className="col-span-12 lg:col-span-8 ">
								<div className="px-8 py-12 md:px-12 lg:px-14 rounded-2xl bg-[#111111]">
									{children}
								</div>
								<Footer />
							</div>
						</div>
					</section>
					<SpeedInsights />
					<Toaster />
					<Analytics />
				</body>
			</CSPostHogProvider>
		</html>
	);
}
