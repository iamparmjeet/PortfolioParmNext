import type { NextConfig } from "next";

const nextConfig: NextConfig = {
	/* config options here */
	reactCompiler: true,
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "assets.parmjeetmishra.com",
			},
		],
		qualities: [75, 90],
	},
};

export default nextConfig;
