import {
	ContactAvailable,
	ContactHeader,
	ContactLookingBox,
	ContactReachMe,
	ContactSection,
} from "@/components/contact";

export default function ContactPage() {
	return (
		<>
			<ContactHeader />

			<div className="mx-auto max-w-295 px-8 pt-12 pb-24">
				<ContactAvailable />
				<ContactLookingBox />

				<div className="grid grid-cols-1 gap-8 lg:grid-cols-[1.25fr_0.85fr] lg:gap-12">
					<ContactSection />
					<ContactReachMe />
				</div>
			</div>
		</>
	);
}
