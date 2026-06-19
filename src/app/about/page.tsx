import { AboutHeader, AboutSidebar, AboutStory } from "@/components/about";

export default function AboutPage() {
	return (
		<>
			<AboutHeader />
			<div className="mx-auto max-w-295 px-8 pt-14 pb-8">
				<div className="grid grid-cols-1 items-start gap-8 md:grid-cols-[300px_1fr] md:gap-16">
					<AboutSidebar />
					<AboutStory />
				</div>
			</div>
		</>
	);
}
