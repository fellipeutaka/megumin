import { ArrowRight, ArrowUp, File, Rocket } from "lucide-react";
import Image from "next/image";
import type { ReactNode } from "react";
import { Toast } from "sileo";

/* ----------------------------- Toast types -------------------------------- */

export type ToastType =
	| "success"
	| "error"
	| "warning"
	| "info"
	| "action"
	| "description"
	| "promise"
	| "promise-success"
	| "promise-error"
	| "custom-icon"
	| "custom-flighty";

export interface ToastButton {
	label: string;
	type: ToastType;
}

/* ----------------------------- Button sets -------------------------------- */

export const HOMEPAGE_BUTTONS: ToastButton[] = [
	{ label: "Success", type: "success" },
	{ label: "Error", type: "error" },
	{ label: "Warning", type: "warning" },
	{ label: "Info", type: "info" },
	{ label: "Action", type: "action" },
	{ label: "Promise", type: "promise" },
	{ label: "Icon", type: "custom-icon" },
];

export const PLAYGROUND_BUTTONS: ToastButton[] = [
	{ label: "Success", type: "success" },
	{ label: "Error", type: "error" },
	{ label: "Warning", type: "warning" },
	{ label: "Info", type: "info" },
	{ label: "Action", type: "action" },
	{ label: "Icon", type: "custom-icon" },
	{ label: "Promise", type: "promise" },
];

/* -------------------------- Shared toast JSX ------------------------------ */

function FlightToast(): ReactNode {
	return (
		<div className="flex flex-col gap-4 -mt-1.5">
			<div className="flex items-center -mb-4 justify-between">
				<Image
					width={70}
					height={28}
					className="h-7.5 -ml-1.5 w-auto invert-0 dark:invert"
					src="/united.png"
					decoding="async"
					alt="United Airlines"
				/>
				<div className="text-[13px] opacity-50 font-medium tracking-tight leading-none">
					PNR <span className="text-white dark:text-black">EC2QW4</span>
				</div>
			</div>
			<div className="flex items-center justify-between overflow-visible">
				<span className="text-2xl font-medium mt-4 text-white dark:text-black tracking-tight leading-none">
					DEL
				</span>
				<div className="flex-1 mx-1 relative flex overflow-visible items-center max-h-[10px]">
					<svg
						viewBox="0 0 300 120"
						fill="none"
						preserveAspectRatio="none"
						className="absolute inset-x-0 -mb-5 bottom-0 w-full h-[80px] overflow-visible mask-x-to-87% mask-x-from-77%"
					>
						<title>Flight path</title>
						<path
							d="M 4 118 Q 150 -20 296 118"
							stroke="#22c55e"
							strokeWidth="2"
							strokeDasharray="6 4"
							strokeOpacity="0.5"
							fill="none"
							vectorEffect="non-scaling-stroke"
							shapeRendering="geometricPrecision"
						/>
					</svg>
					<div className="absolute left-3 -bottom-4 size-5 rounded-full bg-green-500/30 flex items-center justify-center z-10">
						<ArrowRight className="size-4 -rotate-40 text-green-500" />
					</div>
					<div className="absolute right-3 -bottom-4 size-5 rounded-full bg-green-500/30 flex items-center justify-center z-10">
						<ArrowRight className="size-4 rotate-40 text-green-500" />
					</div>
				</div>
				<span className="text-2xl mt-4 font-medium text-white dark:text-black tracking-tight leading-none">
					SFO
				</span>
			</div>
		</div>
	);
}

type ToastManager = ReturnType<typeof Toast.useToastManager>;

/* ----------------------------- Fire toast --------------------------------- */

export function fireToast(manager: ToastManager, type: ToastType) {
	switch (type) {
		case "success":
			manager.add({
				type: "success",
				title: "Changes Saved",
				description:
					"Changes saved successfully to the database. Please refresh the page to see the changes.",
			});
			break;
		case "error":
			manager.add({
				type: "error",
				title: "Something Went Wrong",
				description:
					"We're having trouble saving your changes to the server. Please try again in a few minutes.",
			});
			break;
		case "warning":
			manager.add({
				type: "warning",
				title: "Storage Almost Full",
				description:
					"You've used 95% of your available storage. Please upgrade your plan to continue.",
			});
			break;
		case "info":
			manager.add({
				type: "info",
				title: "New Update Available",
				description:
					"Version 2.0 is now available. Please update your app to continue using the latest features.",
				data: { icon: <ArrowUp className="size-3.5" /> },
			});
			break;
		case "action":
			manager.add({
				type: "action",
				title: "File Uploaded",
				data: { icon: <File className="size-3.5" /> },
				description: "Your file has been uploaded. Share it with your team?",
				actionProps: {
					children: "Share Now",
					onClick: () => manager.add({ title: "Link Copied", type: "success" }),
				},
			});
			break;
		case "promise":
			manager.promise(new Promise((resolve) => setTimeout(resolve, 2500)), {
				loading: { type: "loading", title: "Booking Flight" },
				success: {
					type: "success",
					title: "Booking Confirmed",
					actionProps: {
						children: "View Details",
						onClick: () =>
							manager.add({ title: "Details Viewed", type: "success" }),
					},
					description: <FlightToast />,
				},
				error: { type: "error", title: "Booking Failed" },
			});
			break;
		case "custom-icon":
			manager.add({
				type: "success",
				title: "Deployment Started",
				data: { icon: <Rocket className="size-3.5" /> },
				description: "Your app is being deployed to production.",
			});
			break;
	}
}
