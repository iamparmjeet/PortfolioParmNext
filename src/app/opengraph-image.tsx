import { ImageResponse } from "next/og";
import { SITE } from "@/constants/site";

export const alt = SITE.title;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Editorial dark card mirroring the palette-noir theme. Generated at the
// edge by next/og so every social share renders a real image.
export default function OpengraphImage() {
	return new ImageResponse(
		<div
			style={{
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				background: "#080706",
				color: "#f0e8d4",
				padding: "72px",
				fontFamily: "Georgia, serif",
			}}
		>
			<div
				style={{
					display: "flex",
					fontSize: 22,
					letterSpacing: "0.18em",
					textTransform: "uppercase",
					color: "#7a6a50",
					fontFamily: "monospace",
				}}
			>
				parmjeetmishra.com
			</div>

			<div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
				<div
					style={{
						display: "flex",
						fontSize: 80,
						fontWeight: 600,
						lineHeight: 1.04,
						letterSpacing: "-0.03em",
					}}
				>
					Parmjeet Mishra
				</div>
				<div
					style={{
						display: "flex",
						fontSize: 38,
						color: "#c8b89a",
						letterSpacing: "-0.01em",
					}}
				>
					Full-Stack React Developer —{" "}
					<span
						style={{ color: "#d4a43c", marginLeft: 12, fontStyle: "italic" }}
					>
						Next.js · TypeScript · AI
					</span>
				</div>
			</div>

			<div
				style={{
					display: "flex",
					alignItems: "center",
					gap: 16,
					fontSize: 24,
					color: "#7a6a50",
					fontFamily: "monospace",
				}}
			>
				<div
					style={{
						width: 12,
						height: 12,
						borderRadius: 99,
						background: "#d4a43c",
					}}
				/>
				Open to work · Ludhiana, India
			</div>
		</div>,
		size
	);
}
