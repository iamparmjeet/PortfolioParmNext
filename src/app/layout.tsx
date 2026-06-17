import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";

const newsreader = Newsreader({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
	variable: "--font-newsreader",
	display: "swap",
});

const publicSans = Public_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700"],
	style: ["normal", "italic"],
	variable: "--font-public-sans",
	display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
	subsets: ["latin"],
	weight: ["400", "500", "700"],
	variable: "--font-jetbrains-mono",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "Parmjeet Mishra — Full-Stack React Developer",
		template: "%s | Parmjeet Mishra",
	},
	description:
		"Full-Stack React Developer specializing in Next.js, TypeScript, and modern web applications. Based in Ludhiana, India.",
	keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "India"],
	authors: [{ name: "Parmjeet Mishra", url: "https://parmjeetmishra.com" }],
	creator: "Parmjeet Mishra",
	openGraph: {
		type: "website",
		locale: "en_IN",
		url: "https://parmjeetmishra.com",
		title: "Parmjeet Mishra — Full-Stack React Developer",
		description:
			"Full-Stack React Developer specializing in Next.js, TypeScript, and modern web applications.",
		siteName: "Parmjeet Mishra",
	},
	twitter: {
		card: "summary_large_image",
		title: "Parmjeet Mishra — Full-Stack React Developer",
		description:
			"Full-Stack React Developer specializing in Next.js, TypeScript, and modern web applications.",
		creator: "@iamparmjeet",
	},
	robots: { index: true, follow: true },
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="en"
			className={`${newsreader.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}
		>
			<body className="palette-noir font-newsreader">
				<Nav />
				{children}
				<Footer />
			</body>
		</html>
	);
}
