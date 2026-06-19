import { defineConfig } from "vitest/config";

export default defineConfig({
	// Resolve the "@/*" path alias from tsconfig (native in Vite/Vitest 4+).
	resolve: { tsconfigPaths: true },
	test: {
		environment: "node",
		include: ["src/**/*.test.ts"],
	},
});
