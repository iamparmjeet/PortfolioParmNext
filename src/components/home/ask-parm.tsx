"use client";

import { useRef, useState } from "react";

interface ChatMessage {
	role: "user" | "assistant";
	content: string;
}

const SUGGESTIONS = [
	"What backend stack does Parm reach for?",
	"Tell me about Rentwise.",
	"What's the deal with Schooly?",
];

const GREETING =
	"Ask me anything about Parm's projects, stack, or decisions — I'm trained on everything in this portfolio.";

export function AskParm() {
	const [messages, setMessages] = useState<ChatMessage[]>([]);
	const [input, setInput] = useState("");
	const [streaming, setStreaming] = useState(false);
	const scrollRef = useRef<HTMLDivElement>(null);

	const scrollToBottom = () => {
		requestAnimationFrame(() => {
			scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
		});
	};

	async function send(text: string) {
		const question = text.trim();
		if (!question || streaming) return;

		const history: ChatMessage[] = [
			...messages,
			{ role: "user", content: question },
		];
		// Add the user turn plus an empty assistant turn we'll stream into.
		setMessages([...history, { role: "assistant", content: "" }]);
		setInput("");
		setStreaming(true);
		scrollToBottom();

		try {
			const res = await fetch("/api/chat", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ messages: history }),
			});

			if (!res.ok || !res.body) {
				const fallback =
					(await res.text().catch(() => "")) ||
					"Something went wrong. Please try again.";
				setMessages((m) => updateLast(m, fallback));
				return;
			}

			const reader = res.body.getReader();
			const decoder = new TextDecoder();
			let acc = "";
			while (true) {
				const { done, value } = await reader.read();
				if (done) break;
				acc += decoder.decode(value, { stream: true });
				setMessages((m) => updateLast(m, acc));
				scrollToBottom();
			}
		} catch {
			setMessages((m) =>
				updateLast(m, "Couldn't reach the server. Please try again."),
			);
		} finally {
			setStreaming(false);
			scrollToBottom();
		}
	}

	const showSuggestions = messages.length === 0;

	return (
		<div className="flex flex-col gap-3 rounded-xl border border-rule bg-bg px-5 py-[18px] font-mono text-[13px]">
			<div
				ref={scrollRef}
				className="flex max-h-[280px] min-h-[120px] flex-col gap-3 overflow-y-auto"
			>
				<div className="flex items-start gap-2.5">
					<span className="w-[50px] flex-shrink-0 font-bold text-[10.5px] text-secondary uppercase tracking-[0.1em]">
						parm.ai
					</span>
					<span className="flex-1 text-ink-soft leading-[1.55]">
						{GREETING}
					</span>
				</div>

				{messages.map((m, i) => (
					<div
						// biome-ignore lint/suspicious/noArrayIndexKey: append-only chat log
						key={i}
						className="flex items-start gap-2.5"
					>
						<span
							className={`w-[50px] flex-shrink-0 font-bold text-[10.5px] uppercase tracking-[0.1em] ${
								m.role === "user" ? "text-accent" : "text-secondary"
							}`}
						>
							{m.role === "user" ? "you" : "parm.ai"}
						</span>
						<span className="flex-1 text-ink leading-[1.55]">
							{m.content}
							{m.role === "assistant" &&
								streaming &&
								i === messages.length - 1 && (
									<span className="ml-0.5 inline-block h-3.5 w-[7px] animate-[bk_1s_steps(2)_infinite] bg-accent align-middle" />
								)}
						</span>
					</div>
				))}
			</div>

			{showSuggestions && (
				<div className="flex flex-wrap gap-1.5">
					{SUGGESTIONS.map((s) => (
						<button
							key={s}
							type="button"
							onClick={() => send(s)}
							className="rounded-full border border-rule-soft bg-paper px-2.5 py-1 text-[10.5px] text-ink-muted transition-colors hover:border-accent hover:text-accent"
						>
							{s}
						</button>
					))}
				</div>
			)}

			<form
				onSubmit={(e) => {
					e.preventDefault();
					send(input);
				}}
				className="mt-1 flex items-center gap-2.5 rounded-lg border border-rule bg-paper px-3 py-2"
			>
				<span className="font-bold text-accent">›</span>
				<input
					value={input}
					onChange={(e) => setInput(e.target.value)}
					disabled={streaming}
					placeholder="Ask anything about Parm's projects…"
					aria-label="Ask Parm a question"
					className="flex-1 border-none bg-transparent font-mono text-[12.5px] text-ink outline-none placeholder:text-ink-muted disabled:opacity-60"
				/>
				<button
					type="submit"
					disabled={streaming || !input.trim()}
					aria-label="Send message"
					className="flex h-7 w-7 items-center justify-center rounded-md bg-ink font-display text-base text-paper transition-opacity disabled:opacity-40"
				>
					↑
				</button>
			</form>
		</div>
	);
}

function updateLast(messages: ChatMessage[], content: string): ChatMessage[] {
	const next = messages.slice();
	const last = next[next.length - 1];
	if (last?.role === "assistant") {
		next[next.length - 1] = { ...last, content };
	}
	return next;
}
