import type { FC } from "react";

interface LogoProps {
	size?: number;
}

export const LogoWordmark: FC<LogoProps> = ({ size = 28 }) => (
	<span
		style={{
			fontFamily: "var(--font-newsreader,'Newsreader'),Georgia,serif",
			fontStyle: "italic",
			fontWeight: 600,
			fontSize: size,
			letterSpacing: "-0.025em",
			lineHeight: 1,
			color: "var(--ink)",
			display: "inline-flex",
			alignItems: "baseline",
		}}
	>
		parm
		<span
			style={{ color: "var(--accent)", fontStyle: "normal", marginLeft: 1 }}
		>
			.
		</span>
	</span>
);

export const LogoMonogram: FC<LogoProps> = ({ size = 28 }) => (
	<span
		style={{
			display: "inline-flex",
			alignItems: "center",
			gap: size * 0.32,
			lineHeight: 1,
		}}
	>
		<svg
			width={size * 1.02}
			height={size * 1.02}
			viewBox="0 0 32 32"
			aria-hidden="true"
		>
			<circle
				cx="16"
				cy="16"
				r="14.5"
				fill="none"
				stroke="currentColor"
				strokeWidth="1.4"
				style={{ color: "var(--ink)" }}
			/>
			<text
				x="16"
				y="22"
				textAnchor="middle"
				style={{
					fontFamily: "var(--font-newsreader,'Newsreader'),Georgia,serif",
					fontWeight: 700,
					fontSize: 18,
					fontStyle: "italic",
					fill: "var(--accent)",
				}}
			>
				p
			</text>
		</svg>
		<span
			style={{
				fontFamily:
					"var(--font-public-sans,'Public Sans'),system-ui,sans-serif",
				fontWeight: 700,
				fontSize: size * 0.6,
				letterSpacing: "0.18em",
				textTransform: "uppercase",
				color: "var(--ink)",
			}}
		>
			parm
		</span>
	</span>
);

export const LogoIndex: FC<LogoProps> = ({ size = 28 }) => (
	<span
		style={{
			fontFamily:
				"var(--font-jetbrains-mono,'JetBrains Mono'),ui-monospace,monospace",
			fontWeight: 700,
			fontSize: size * 0.62,
			letterSpacing: "0.04em",
			display: "inline-flex",
			alignItems: "baseline",
			padding: `${size * 0.18}px ${size * 0.38}px`,
			background: "var(--ink)",
			color: "var(--paper)",
			borderRadius: 6,
			lineHeight: 1,
		}}
	>
		PARM<span style={{ color: "var(--accent)", marginLeft: 2 }}>./</span>
	</span>
);

export const LogoStamp: FC<LogoProps> = ({ size = 28 }) => (
	<span
		style={{
			fontFamily: "var(--font-newsreader,'Newsreader'),Georgia,serif",
			fontWeight: 600,
			fontSize: size,
			letterSpacing: "-0.015em",
			color: "var(--ink)",
			display: "inline-flex",
			alignItems: "center",
			gap: size * 0.18,
			lineHeight: 1,
		}}
	>
		<span
			style={{
				width: size * 0.28,
				height: size * 0.28,
				borderRadius: "50%",
				background: "var(--accent)",
				display: "inline-block",
			}}
		/>
		parm
		<span
			style={{
				width: size * 0.28,
				height: size * 0.28,
				borderRadius: "50%",
				background: "var(--accent)",
				display: "inline-block",
			}}
		/>
	</span>
);

export const LogoAmpersand: FC<LogoProps> = ({ size = 28 }) => (
	<span
		style={{
			fontFamily: "var(--font-newsreader,'Newsreader'),Georgia,serif",
			fontWeight: 600,
			fontSize: size * 1.05,
			letterSpacing: "-0.02em",
			color: "var(--ink)",
			display: "inline-flex",
			alignItems: "baseline",
			lineHeight: 1,
		}}
	>
		P
		<span
			style={{
				fontStyle: "italic",
				fontWeight: 500,
				color: "var(--accent)",
				margin: "0 2px",
			}}
		>
			&amp;
		</span>
		M
	</span>
);

export const LogoCutP: FC<LogoProps> = ({ size = 28 }) => (
	<span
		style={{
			display: "inline-flex",
			alignItems: "center",
			gap: size * 0.2,
			lineHeight: 1,
		}}
	>
		<svg
			width={size * 0.72}
			height={size}
			viewBox="0 0 20 28"
			fill="none"
			aria-hidden="true"
			style={{ overflow: "visible" }}
		>
			<line
				x1="4"
				y1="2"
				x2="4"
				y2="26"
				stroke="var(--ink)"
				strokeWidth="2.4"
				strokeLinecap="round"
			/>
			<path
				d="M4 3 L11.5 3 Q17.5 3 17.5 8.5 Q17.5 14 11.5 14 L4 14"
				stroke="var(--ink)"
				strokeWidth="2.4"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<line
				x1="14"
				y1="12"
				x2="19"
				y2="17"
				stroke="var(--accent)"
				strokeWidth="2.4"
				strokeLinecap="round"
			/>
		</svg>
		<span
			style={{
				fontFamily: "var(--font-newsreader,'Newsreader'),Georgia,serif",
				fontStyle: "italic",
				fontWeight: 500,
				fontSize: size,
				letterSpacing: "-0.025em",
				color: "var(--ink)",
			}}
		>
			arm
		</span>
	</span>
);

export const LogoByline: FC<LogoProps> = ({ size = 28 }) => (
	<span
		style={{
			display: "inline-flex",
			alignItems: "center",
			gap: size * 0.38,
			lineHeight: 1,
		}}
	>
		<span
			style={{
				fontFamily: "var(--font-newsreader,'Newsreader'),Georgia,serif",
				fontStyle: "italic",
				fontWeight: 700,
				fontSize: size * 1.15,
				color: "var(--ink)",
				lineHeight: 1,
				letterSpacing: "-0.03em",
			}}
		>
			p<span style={{ color: "var(--accent)" }}>.</span>
		</span>
		<span style={{ display: "inline-flex", flexDirection: "column", gap: 4 }}>
			<span
				style={{
					display: "inline-block",
					width: size * 2.6,
					height: 1.8,
					background: "var(--ink)",
				}}
			/>
			<span
				style={{
					display: "inline-block",
					width: size * 1.6,
					height: 1,
					background: "var(--accent)",
				}}
			/>
		</span>
	</span>
);

export const LogoJSX: FC<LogoProps> = ({ size = 28 }) => (
	<span
		style={{
			fontFamily:
				"var(--font-jetbrains-mono,'JetBrains Mono'),ui-monospace,monospace",
			fontWeight: 500,
			fontSize: size * 0.72,
			letterSpacing: "-0.01em",
			lineHeight: 1,
			display: "inline-flex",
			alignItems: "baseline",
		}}
	>
		<span style={{ color: "var(--accent)", fontWeight: 700 }}>&lt;</span>
		<span style={{ color: "var(--ink)", fontWeight: 600 }}>parm</span>
		<span style={{ color: "var(--accent)", fontWeight: 700 }}> /&gt;</span>
	</span>
);

export const LogoTerminal: FC<LogoProps> = ({ size = 28 }) => (
	<span
		style={{
			fontFamily: "var(--font-newsreader,'Newsreader'),Georgia,serif",
			fontStyle: "italic",
			fontWeight: 600,
			fontSize: size,
			letterSpacing: "-0.025em",
			lineHeight: 1,
			color: "var(--ink)",
			display: "inline-flex",
			alignItems: "baseline",
		}}
	>
		parm
		<span
			style={{
				display: "inline-block",
				width: size * 0.08,
				height: size * 0.82,
				background: "var(--accent)",
				marginLeft: 3,
				verticalAlign: "middle",
				animation: "bk 1s steps(2) infinite",
			}}
		/>
	</span>
);

const LOGO_MAP: Record<string, FC<LogoProps>> = {
	wordmark: LogoWordmark,
	stamp: LogoStamp,
	monogram: LogoMonogram,
	index: LogoIndex,
	ampersand: LogoAmpersand,
	cutp: LogoCutP,
	byline: LogoByline,
	jsx: LogoJSX,
	terminal: LogoTerminal,
};

export const Logo: FC<{ variant?: string; size?: number }> = ({
	variant = "cutp",
	size = 28,
}) => {
	const C = LOGO_MAP[variant] ?? LogoCutP;
	return <C size={size} />;
};
