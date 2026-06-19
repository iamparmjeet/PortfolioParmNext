"use client";
import {
	ResumeEducation,
	ResumeExperience,
	ResumeHeader,
	ResumeHeaderCard,
	ResumeProfile,
	ResumeSelectProjects,
	ResumeSkills,
} from "@/components/resume";
import { Button } from "@/components/ui/button";
import { EMAIL, TITLE } from "@/constants";
import { PROJECTS } from "@/lib/projects";

const secLabel =
	"mb-5 flex items-center gap-2.5 font-mono text-[10px] font-semibold uppercase tracking-[0.18em] text-accent after:h-px after:flex-1 after:bg-rule after:content-[''] print:mb-2 print:text-[9px]";

export default function ResumePage() {
	return (
		<>
			<ResumeHeader />

			<div className="mx-auto max-w-215 px-8 pt-8 pb-16 print:max-w-none print:px-0 print:pt-0 print:pb-0">
				{/* HEADER CARD */}
				<ResumeHeaderCard />

				{/* PROFILE */}
				<ResumeProfile secLabel={secLabel} />

				{/* EXPERIENCE */}
				<ResumeExperience secLabel={secLabel} />

				{/* SELECTED PROJECTS */}
				<ResumeSelectProjects projects={PROJECTS} secLabel={secLabel} />

				{/* SKILLS */}
				<ResumeSkills secLabel={secLabel} />

				{/* EDUCATION */}
				<ResumeEducation secLabel={secLabel} />

				{/* PULL */}
				<blockquote className="my-9 border-accent border-l-[3px] pl-6 font-display font-medium text-[28px] text-ink italic leading-[1.35] tracking-[-0.01em] print:hidden">
					&ldquo;I do not build demos. I build things that have requirements,
					constraints, real users, and real consequences. The complexity that
					creates is exactly what I am here for.&rdquo;
				</blockquote>

				{/* ACTIONS */}
				<div className="mt-10 flex flex-wrap gap-2.5 print:hidden">
					<a
						href="https://rxresu.me/iamparmjeetmishra/react"
						target="_blank"
						rel="noopener"
						className="group inline-flex items-center gap-2 rounded-full border border-ink px-6 py-3.25 font-body font-medium text-[14.5px] text-ink no-underline transition-all duration-150 hover:bg-ink hover:text-paper"
					>
						View on rxresu.me{" "}
						<span className="font-display text-[18px] leading-none transition-transform group-hover:translate-x-0.75">
							↗
						</span>
					</a>
					<Button
						type="button"
						size="xl"
						className="inline-flex items-center gap-2 rounded-full border border-ink bg-ink px-6 py-3.25 font-body font-medium text-[14.5px] text-paper transition-all duration-150 hover:border-accent hover:bg-accent"
						onClick={() => window.print()}
					>
						Print / Save PDF
					</Button>
				</div>

				{/* FOOT */}
				<div className="mt-10 flex flex-wrap items-center justify-between gap-3.5 border-rule border-t pt-6 print:mt-4 print:pt-3">
					<span className="font-mono text-[10.5px] text-ink-muted">
						{TITLE}
					</span>
					<span className="font-mono text-[10.5px] text-ink-muted">
						{EMAIL}
					</span>
				</div>
			</div>
		</>
	);
}
