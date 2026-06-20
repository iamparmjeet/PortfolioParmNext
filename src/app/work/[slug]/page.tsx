import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Kicker } from "@/components/shared/kicker";
import { RichText } from "@/components/shared/rich-text";
import {
	type ArchChip,
	CASE_STUDY_SLUGS,
	type CardAccent,
	type CaseCard,
	type CaseStudy,
	getCaseStudy,
} from "@/lib/case-studies";
import { getProjectById } from "@/lib/projects";

interface PageProps {
	params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
	return CASE_STUDY_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
	params,
}: PageProps): Promise<Metadata> {
	const { slug } = await params;
	const project = getProjectById(slug);
	const study = getCaseStudy(slug);
	if (!project || !study) return { title: "Case study not found" };

	const title = `${project.title} — ${project.italic} (case study)`;
	const url = `/work/${project.id}`;
	return {
		title,
		description: project.desc,
		alternates: { canonical: url },
		openGraph: {
			type: "article",
			url,
			title,
			description: project.desc,
		},
		twitter: {
			card: "summary_large_image",
			title,
			description: project.desc,
		},
	};
}

const chip = "rounded-[5px] border px-[9px] py-1 font-mono text-[11px]";
const chipBase = `${chip} border-rule bg-bg text-ink`;
const chipHot = `${chip} border-accent bg-accent-tint font-semibold text-accent`;
const chipCool = `${chip} border-rule bg-bg text-secondary`;

const decBase = "rounded-[10px] border border-rule bg-paper p-5 border-t-[3px]";
const decBody =
	"font-body text-[13.5px] leading-[1.55] text-ink-soft [&_code]:rounded-[3px] [&_code]:bg-rule-soft [&_code]:px-1.5 [&_code]:py-px [&_code]:font-mono [&_code]:text-[12px] [&_code]:text-accent";

const ACCENT_BORDER: Record<CardAccent, string> = {
	accent: "border-t-accent",
	amber: "border-t-[#c8901c]",
	secondary: "border-t-secondary",
};

function chipClass(v: ArchChip["v"]) {
	if (v === "hot") return chipHot;
	if (v === "cool") return chipCool;
	return chipBase;
}

function SectionHeading({ n, children }: { n: string; children: string }) {
	return (
		<h2 className="mb-4.5 flex items-baseline gap-3.5 font-display font-semibold text-[32px] leading-[1.05] tracking-tight">
			<span className="shrink-0 font-medium font-mono text-accent text-sm tracking-[0.08em]">
				§{n}
			</span>
			{children}
		</h2>
	);
}

function Card({ card, fallback }: { card: CaseCard; fallback: CardAccent }) {
	return (
		<div className={`${decBase} ${ACCENT_BORDER[card.accent ?? fallback]}`}>
			<div className="mb-2 font-mono font-semibold text-[10px] text-ink-muted uppercase tracking-widest">
				{card.label}
			</div>
			<h3 className="mb-2 font-display font-semibold text-[18px] leading-[1.2] tracking-[-0.01em] [&_code]:rounded-[3px] [&_code]:bg-rule-soft [&_code]:px-1.5 [&_code]:py-px [&_code]:font-mono [&_code]:text-[16px] [&_code]:text-accent">
				<RichText>{card.title}</RichText>
			</h3>
			<p className={decBody}>
				<RichText>{card.body}</RichText>
			</p>
		</div>
	);
}

// Main Function
export default async function CaseStudyPage({ params }: PageProps) {
	const { slug } = await params;
	const project = getProjectById(slug);
	const study: CaseStudy | undefined = getCaseStudy(slug);
	if (!project || !study) notFound();

	return (
		<>
			<header className="border-rule border-b pt-18 pb-12">
				<div className="mx-auto max-w-215 px-8">
					<Kicker>Case study · Deep dive · {study.readTime} read</Kicker>
					<h1 className="mt-4.5 mb-5.5 max-w-[18ch] font-display font-medium text-[clamp(48px,7vw,88px)] text-ink leading-[0.96] tracking-[-0.035em] [&_em]:text-accent [&_em]:italic">
						<RichText>{study.heroTitle}</RichText>
					</h1>
					<p className="max-w-[54ch] text-[18px] text-ink-soft leading-[1.55]">
						{study.tagline}
					</p>
				</div>
			</header>

			<div className="mx-auto max-w-215 px-8 pt-12 pb-20">
				<div className="mb-12 rounded-[18px] border border-rule bg-paper p-9">
					<div className="mb-4 flex flex-wrap gap-1.5">
						{project.tags.map((t) => (
							<span key={t} className={`proj-tag t-${t}`}>
								{t}
							</span>
						))}
						{study.overlineTags.map((t) => (
							<span key={t} className="proj-tag">
								{t}
							</span>
						))}
					</div>
					<div className="mb-3.5 font-display font-semibold text-[48px] leading-none tracking-[-0.03em] [&_em]:font-medium [&_em]:text-accent [&_em]:italic">
						<RichText>{study.overviewTitle}</RichText>
					</div>
					<div className="mb-7 max-w-[68ch] text-base text-ink-soft leading-[1.55] [&_code]:rounded-[3px] [&_code]:bg-rule-soft [&_code]:px-1.5 [&_code]:py-px [&_code]:font-mono [&_code]:text-[14px] [&_code]:text-accent [&_strong]:font-semibold [&_strong]:text-ink">
						<RichText>{study.overviewBody}</RichText>
					</div>
					<div className="grid grid-cols-2 gap-4.5 border-rule border-t pt-6 md:grid-cols-4 md:gap-0">
						{study.stats.map((m) => (
							<div
								key={m.l}
								className="px-4 first:pl-0 md:border-rule md:border-r md:last:border-r-0"
							>
								<div className="font-display font-medium text-[40px] text-ink leading-none tracking-[-0.03em]">
									{m.em ? (
										<>
											<em className="text-accent italic">{m.em}</em>
											{m.v.slice(m.em.length)}
										</>
									) : (
										m.v
									)}
								</div>
								<div className="mt-2 font-mono text-[10px] text-ink-muted uppercase tracking-widest">
									{m.l}
								</div>
							</div>
						))}
					</div>
					<div className="mt-5 flex aspect-3/2 items-center justify-center overflow-hidden rounded-xl border border-rule bg-rule-soft">
						{study.image ? (
							<Image
								src={study.image}
								alt={study.shotLabel}
								width={1200}
								height={700}
								quality={95}
								className="aspect-3/2 object-cover"
							/>
						) : (
							<span className="font-mono text-[11px] text-ink-muted">
								{study.shotLabel}
							</span>
						)}
					</div>
				</div>

				<section className="mb-12">
					<SectionHeading n="01">{study.problemTitle}</SectionHeading>
					<div className="max-w-[64ch] font-display text-[19px] text-ink-soft leading-[1.6] [&_code]:font-mono [&_code]:text-[16px] [&_code]:text-accent [&_strong]:font-semibold [&_strong]:text-ink">
						{study.problem.map((para) => (
							<p key={para.slice(0, 40)} className="mb-4 last:mb-0">
								<RichText>{para}</RichText>
							</p>
						))}
					</div>
				</section>

				<section className="mb-12">
					<SectionHeading n="02">{study.architectureTitle}</SectionHeading>
					<div className="max-w-[64ch] font-display text-[19px] text-ink-soft leading-[1.6] [&_em]:italic">
						<p>
							<RichText>{study.architectureIntro}</RichText>
						</p>
					</div>
					<div className="mt-4.5 rounded-xl border border-rule bg-paper p-5">
						{study.architecture.map((row) => (
							<div
								key={row.l}
								className="grid grid-cols-[100px_1fr] items-start gap-4 border-rule-soft border-b py-2.5 last:border-b-0"
							>
								<div className="pt-1.5 font-mono font-semibold text-[10px] text-accent uppercase tracking-widest">
									{row.l}
								</div>
								<div className="flex flex-wrap gap-1.5">
									{row.chips.map((c) => (
										<span key={c.t} className={chipClass(c.v)}>
											{c.t}
										</span>
									))}
								</div>
							</div>
						))}
					</div>
				</section>

				<section className="mb-12">
					<SectionHeading n="03">{study.decisionsTitle}</SectionHeading>
					<div className="mt-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-3">
						{study.decisions.map((card, i) => (
							<Card
								key={card.label}
								card={card}
								fallback={(["accent", "amber", "secondary"] as const)[i % 3]}
							/>
						))}
					</div>
				</section>

				<section className="mb-12">
					<SectionHeading n="04">{study.challengesTitle}</SectionHeading>
					<div className="mt-3.5 grid grid-cols-1 gap-3.5 md:grid-cols-2">
						{study.challenges.map((card, i) => (
							<Card
								key={card.label}
								card={card}
								fallback={(["accent", "amber", "secondary"] as const)[i % 3]}
							/>
						))}
					</div>
				</section>

				<blockquote className="mt-14 border-accent border-l-[3px] pl-6 font-display font-medium text-[28px] text-ink italic leading-[1.35] tracking-[-0.01em]">
					&ldquo;{study.quote}&rdquo;
					<span className="mt-3.5 block font-medium font-mono text-[11px] text-ink-muted uppercase not-italic tracking-[0.12em]">
						— {study.quoteAttribution}
					</span>
				</blockquote>

				<div className="mt-12 text-center">
					<Link
						href="/contact"
						className="group inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-6 py-3.25 font-body font-medium text-[14.5px] text-paper no-underline transition-all duration-150 hover:border-accent hover:bg-accent"
					>
						Talk about this project{" "}
						<span className="font-display text-[18px] leading-none transition-transform group-hover:translate-x-0.75">
							→
						</span>
					</Link>
				</div>
			</div>
		</>
	);
}
