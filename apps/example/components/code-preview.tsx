"use client";

import { Rocket } from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import { Toast, type SileoToastData } from "sileo";
import { tokenize } from "sugar-high";

import { Button } from "@/components/button";
import { TOKEN_COLORS } from "@/lib/token-colors";

/* -------------------------------- Component ------------------------------- */

interface CodePreviewProps {
	code: string;
	actions: { label: string; id: string }[];
}

export function CodePreview({ code, actions }: CodePreviewProps) {
	const [tab, setTab] = useState<"preview" | "code">("preview");
	const lastDemoId = useRef<string | undefined>(undefined);
	const toastManager = Toast.useToastManager<SileoToastData>();
	const tokens = tokenize(code);

	const runDemo = (id: string) => {
		switch (id) {
			case "success":
				toastManager.add({ type: "success", title: "Changes saved" });
				break;
			case "error":
				toastManager.add({
					type: "error",
					title: "Something went wrong",
					description: "Please try again later.",
				});
				break;
			case "warning":
				toastManager.add({ type: "warning", title: "Storage almost full" });
				break;
			case "info":
				toastManager.add({ type: "info", title: "New update available" });
				break;
			case "action":
				toastManager.add({
					type: "action",
					title: "File uploaded",
					description: "Share it with your team?",
					actionProps: {
						children: "Share",
						onClick: () =>
							toastManager.add({ title: "Shared", type: "success" }),
					},
				});
				break;
			case "promise":
				toastManager.promise(new Promise((resolve) => setTimeout(resolve, 2000)), {
					loading: { type: "loading", title: "Loading..." },
					success: { type: "success", title: "Done!" },
					error: { type: "error", title: "Failed" },
				});
				break;
			case "fill-accent":
				toastManager.add({
					type: "success",
					title: "Saved",
					data: { fill: "#171717" },
				});
				break;
			case "fill-dark":
				toastManager.add({
					type: "success",
					title: "Booking confirmed",
					data: { fill: "black" },
				});
				break;
			case "style-override":
				toastManager.add({
					type: "action",
					title: "New Sale",
					data: { fill: "black" },
					actionProps: { children: "View sale" },
				});
				break;
			case "custom-icon":
				toastManager.add({
					type: "success",
					title: "Deployed",
					data: { icon: <Rocket className="size-3.5" /> },
				});
				break;
			case "custom-description":
				toastManager.add({
					type: "success",
					title: "Payment received",
					description: (
						<span className="text-green-500/50! font-medium!">
							We received your payment of $49.00.
						</span>
					),
				});
				break;
			case "rich-description":
				toastManager.add({
					type: "info",
					title: "Team update",
					description: (
						<div className="flex items-center gap-8">
							<div className="flex -space-x-1">
								<Image
									src="/memojis/Rectangle-1.png"
									className="size-6 rounded-full ring-2 ring-white"
									alt="Alice"
									width={24}
									height={24}
								/>
								<Image
									src="/memojis/Rectangle.png"
									className="size-6 rounded-full ring-2 ring-white"
									alt="Bob"
									width={24}
									height={24}
								/>
								<Image
									src="/memojis/Rectangle-2.png"
									className="size-6 rounded-full ring-2 ring-white"
									alt="Charlie"
									width={24}
									height={24}
								/>
							</div>
							<span className="text-[13px]! text-muted-foreground! leading-4.5">
								Alice, Bob, and Charlie joined the Design Engineering Team.
							</span>
						</div>
					),
				});
				break;
			case "roundness-sharp":
			case "roundness":
				toastManager.add({
					type: "success",
					title: "Sharp corners",
					data: { roundness: 12 },
				});
				break;
			case "roundness-round":
				toastManager.add({
					type: "success",
					title: "Fully round",
					data: { roundness: 16 },
				});
				break;
			case "autopilot-off":
				toastManager.add({
					type: "success",
					title: "Base UI lifecycle",
					description: "Expand and collapse are managed by the toast primitive.",
				});
				break;
			case "autopilot-custom":
				toastManager.add({
					type: "success",
					title: "Base UI timing",
					description: "Timeout and lifecycle are configured on Toast.Provider.",
				});
				break;
			case "dismiss-fire":
				lastDemoId.current = toastManager.add({
					type: "success",
					title: "Dismissable",
				});
				break;
			case "dismiss-one":
				if (lastDemoId.current) {
					toastManager.close(lastDemoId.current);
					lastDemoId.current = undefined;
				}
				break;
			case "dismiss-all":
				toastManager.close();
				lastDemoId.current = undefined;
				break;
		}
	};

	return (
		<div className="mb-6 rounded-xl border border-border overflow-hidden transition-colors duration-150">
			{/* Tabs */}
			<div className="flex items-center bg-accent/40 border-b border-border transition-colors duration-150">
				{(["preview", "code"] as const).map((t) => (
					<button
						key={t}
						type="button"
						onClick={() => setTab(t)}
						className={`px-4 h-10 text-[12px] font-medium transition-colors duration-150 cursor-pointer border-b-2 -mb-px ${
							tab === t
								? "text-foreground border-foreground"
								: "text-neutral-600 dark:text-neutral-300 border-transparent hover:text-foreground"
						}`}
					>
						{t === "preview" ? "Preview" : "Code"}
					</button>
				))}
			</div>

			{/* Content */}
			{tab === "preview" ? (
				<div className="flex items-center justify-center gap-2 flex-wrap px-6 py-10">
					{actions.map((action) => (
						<Button key={action.id} onClick={() => runDemo(action.id)}>
							{action.label}
						</Button>
					))}
				</div>
			) : (
				<pre className="p-4 text-[13px] leading-relaxed font-mono overflow-x-auto">
					<code>
						{tokens.map(([type, value], i) => {
							const color = TOKEN_COLORS[type];
							if (!color) return value;
							return (
								<span key={i} style={{ color }}>
									{value}
								</span>
							);
						})}
					</code>
				</pre>
			)}
		</div>
	);
}
