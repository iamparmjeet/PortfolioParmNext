import type { Metadata } from "next";
import { DM_Sans, Syne } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

// For - Headings, section labels, UI Text
const syne = Syne({
	subsets: ["latin"],
	weight: ["400", "500", "600", "700", "800"],
	variable: "--font-syne",
	display: "swap",
});

// body font - p, description, UI body
const dmSans = DM_Sans({
	subsets: ["latin"],
	weight: ["400", "500", "600"],
	variable: "--font-dm-sans",
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
	robots: {
		index: true,
		follow: true,
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html
			lang="en"
			className={cn(`
				"h-full",
				"antialiased" ${syne.variable} ${dmSans.variable}`)}
		>
			<ThemeProvider
				attribute="class"
				defaultTheme="dark"
				enableSystem
				disableTransitionOnChange
			>
				<body className="min-h-full flex flex-col">{children}</body>
			</ThemeProvider>
		</html>
	);
}
