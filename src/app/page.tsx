import {
	AskParmSection,
	CurrentActivity,
	FeaturedWork,
	Hero,
	Numbers,
	Ticker,
} from "@/components/home";

export default function HomePage() {
	return (
		<>
			<Hero />
			<Numbers />
			<Ticker />
			<FeaturedWork />
			<CurrentActivity />
			<AskParmSection />
		</>
	);
}
