"use client";

import { motion } from "motion/react";
import { Toast } from "sileo";

import { Button } from "@/components/button";
import {
	SILEO_POSITIONS,
	useExampleSettings,
} from "@/components/example-shell";
import { fireToast, PLAYGROUND_BUTTONS } from "@/lib/toast-demos";

const ease = [0.25, 0.46, 0.45, 0.94] as const;

export default function Playground() {
	const toastManager = Toast.useToastManager();
	const { position, setPosition } = useExampleSettings();

	return (
		<>
			{/* Center */}
			<main className="flex-1 flex flex-col items-center justify-center -mt-10">
				<motion.h1
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, ease }}
					className="text-4xl sm:text-5xl font-semibold tracking-tighter"
				>
					Playground<span className="text-neutral-300">.</span>
				</motion.h1>
				<motion.p
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6, delay: 0.08, ease }}
					className="mt-4 text-[15px] text-neutral-400 text-center max-w-sm leading-relaxed"
				>
					Pick a position, then click any type to fire it live.
				</motion.p>
			</main>

			{/* Bottom controls */}
			<motion.div
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				transition={{ duration: 0.6, delay: 0.25 }}
				className="flex flex-col items-center gap-3 pb-8"
			>
				<div className="flex flex-wrap items-center justify-center gap-2 px-6">
					{SILEO_POSITIONS.map((option) => (
						<button
							key={option}
							type="button"
							aria-pressed={position === option}
							onClick={() => setPosition(option)}
							className={`h-8 rounded-lg px-3 text-[11px] font-medium capitalize transition-all cursor-pointer active:scale-95 ${
								position === option
									? "bg-foreground text-background"
									: "bg-accent text-neutral-600 dark:text-neutral-300 hover:bg-accent-hover hover:text-foreground"
							}`}
						>
							{option.replace("-", " ")}
						</button>
					))}
				</div>

				{/* Toast buttons */}
				<div className="flex flex-wrap items-center justify-center gap-2 px-6">
					{PLAYGROUND_BUTTONS.map((btn) => (
						<Button
							key={btn.type}
							onClick={() => fireToast(toastManager, btn.type)}
						>
							{btn.label}
						</Button>
					))}
				</div>
			</motion.div>
		</>
	);
}
