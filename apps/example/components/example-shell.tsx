"use client";

import Link from "next/link";
import {
	createContext,
	useContext,
	useEffect,
	useState,
	type ReactNode,
} from "react";
import { Toast, Toaster, type SileoPosition } from "sileo";

import { Nav } from "@/components/nav";

const DEFAULT_POSITION: SileoPosition = "top-center";

const POSITIONS: readonly SileoPosition[] = [
	"top-left",
	"top-center",
	"top-right",
	"bottom-left",
	"bottom-center",
	"bottom-right",
];

interface ExampleSettings {
	position: SileoPosition;
	setPosition: (position: SileoPosition) => void;
}

const ExampleSettingsContext = createContext<ExampleSettings | null>(null);

export function useExampleSettings() {
	const settings = useContext(ExampleSettingsContext);
	if (!settings) {
		throw new Error("useExampleSettings must be used within ExampleShell");
	}
	return settings;
}

export { POSITIONS as SILEO_POSITIONS };

export function ExampleShell({ children }: { children: ReactNode }) {
	const [dark, setDark] = useState(false);
	const [position, setPosition] = useState<SileoPosition>(DEFAULT_POSITION);

	useEffect(() => {
		const saved = localStorage.getItem("sileo-docs-theme");
		if (saved === "dark") setDark(true);
	}, []);

	useEffect(() => {
		localStorage.setItem("sileo-docs-theme", dark ? "dark" : "light");
		document.documentElement.classList.add("no-transitions");
		document.documentElement.classList.toggle("dark", dark);
		requestAnimationFrame(() => {
			document.documentElement.classList.remove("no-transitions");
		});
	}, [dark]);

	return (
		<ExampleSettingsContext.Provider value={{ position, setPosition }}>
			<Toast.Provider timeout={6000} limit={5}>
				<div className="min-h-dvh w-full flex flex-col bg-background text-foreground">
					<Toaster
						data-position={position}
						data-theme={dark ? "dark" : "light"}
					/>

					<div className="max-w-4xl w-full mx-auto px-6 flex-1 flex flex-col">
						<Nav dark={dark} onToggleDark={() => setDark((value) => !value)} />

						<div className="flex-1 flex flex-col">{children}</div>

						<footer className="py-6 flex items-center justify-between border-t border-border">
							<span className="text-xs text-neutral-600 dark:text-neutral-400">
								Sileo — MIT License
							</span>
							<Link
								href="/play"
								className="text-xs text-neutral-600 dark:text-neutral-400 hover:text-foreground transition-colors"
							>
								Playground →
							</Link>
						</footer>
					</div>
				</div>
			</Toast.Provider>
		</ExampleSettingsContext.Provider>
	);
}
