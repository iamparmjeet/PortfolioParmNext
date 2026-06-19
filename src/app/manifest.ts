import type { MetadataRoute } from "next";
import { SITE } from "@/constants/site";

export default function manifest(): MetadataRoute.Manifest {
	return {
		name: SITE.name,
		short_name: "Parm",
		description: SITE.description,
		start_url: "/",
		display: "standalone",
		background_color: "#080706",
		theme_color: "#080706",
		icons: [
			{
				src: "/favicon-32x32.png",
				sizes: "32x32",
				type: "image/png",
			},
			{
				src: "/apple-touch-icon.png",
				sizes: "180x180",
				type: "image/png",
			},
		],
	};
}
