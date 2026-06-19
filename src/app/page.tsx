import { AskParm } from "@/components/home/ask-parm";
import AskParmSection from "@/components/home/ask-parm-section";
import CurrentActivity from "@/components/home/current-activity";
import FeaturedWork from "@/components/home/featured-work";
import Hero from "@/components/home/hero";
import Numbers from "@/components/home/numbers";
import Ticker from "@/components/home/ticker";

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
