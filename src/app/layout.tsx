import type { Metadata } from "next";
import { JetBrains_Mono, Newsreader, Public_Sans } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/footer";
import Nav from "@/components/layout/nav";
import { ThemeProvider } from "@/components/theme-provider";
import { SITE, SITE_URL } from "@/constants/site";
import { DEFAULT_PALETTE, PALETTE_IDS } from "@/constants/themes";

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
	metadataBase: new URL(SITE_URL),
	title: {
		default: SITE.title,
		template: `%s | ${SITE.name}`,
	},
	description: SITE.description,
	keywords: ["Full-Stack Developer", "React", "Next.js", "TypeScript", "India"],
	authors: [{ name: SITE.name, url: SITE_URL }],
	creator: SITE.name,
	manifest: "/manifest.webmanifest",
	alternates: { canonical: "/" },
	icons: {
		icon: [
			{ url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
			{ url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
		],
		apple: "/apple-touch-icon.png",
	},
	openGraph: {
		type: "website",
		locale: SITE.locale,
		url: SITE_URL,
		title: SITE.title,
		description: SITE.description,
		siteName: SITE.name,
	},
	twitter: {
		card: "summary_large_image",
		title: SITE.title,
		description: SITE.description,
		creator: SITE.twitter,
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
			suppressHydrationWarning
			className={`${newsreader.variable} ${publicSans.variable} ${jetbrainsMono.variable}`}
		>
			<body className="font-newsreader">
				<ThemeProvider
					attribute="class"
					themes={PALETTE_IDS}
					defaultTheme={DEFAULT_PALETTE}
					enableSystem={false}
					enableColorScheme={false}
					disableTransitionOnChange
					storageKey="palette"
				>
					<Nav />
					{children}
					<Footer />
				</ThemeProvider>
			</body>
		</html>
	);
}
