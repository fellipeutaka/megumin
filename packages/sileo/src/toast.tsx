"use client";

import {
	Toast,
	type ToastViewportProps,
} from "@base-ui/react/toast";
import { Sileo } from "./sileo";
import type { SileoPosition, SileoToastData } from "./types";
import { useEffect, useState } from "react";

export type ToasterProps = Omit<ToastViewportProps, "children">;

const SILEO_POSITIONS = [
	"top-left",
	"top-center",
	"top-right",
	"bottom-left",
	"bottom-center",
	"bottom-right",
] as const satisfies readonly SileoPosition[];

const isSileoPosition = (value: unknown): value is SileoPosition =>
	typeof value === "string" &&
		SILEO_POSITIONS.includes(value as SileoPosition);

const pillAlign = (position: SileoPosition) =>
	position.endsWith("right")
		? ("right" as const)
		: position.endsWith("center")
			? ("center" as const)
			: ("left" as const);

const expandDirection = (position: SileoPosition) =>
	position.startsWith("top") ? ("bottom" as const) : ("top" as const);

export function Toaster(props: ToasterProps) {
	const { toasts } = Toast.useToastManager<SileoToastData>();
	const requestedPosition = (props as Record<string, unknown>)["data-position"];
	const viewportPosition = isSileoPosition(requestedPosition)
		? requestedPosition
		: "top-center";
	const position = pillAlign(viewportPosition);
	const expand = expandDirection(viewportPosition);
	const [activeId, setActiveId] = useState<string>();
	const latestId = toasts.find((toast) => toast.transitionStatus !== "ending")?.id;

	useEffect(() => {
		setActiveId((current) => {
			if (
				current &&
				toasts.some(
					(toast) =>
						toast.id === current && toast.transitionStatus !== "ending",
				)
			) {
				return current;
			}
			return latestId;
		});
	}, [latestId, toasts]);

	return (
		<Toast.Portal>
			<Toast.Viewport
				{...props}
				data-sileo-viewport
				data-position={
					typeof viewportPosition === "string" ? viewportPosition : "top-right"
				}
			>
				{toasts.map((toast) => (
					<Toast.Root
						key={toast.id}
						toast={toast}
						swipeDirection={["up", "down", "left", "right"]}
						render={(rootProps) => (
							<Sileo
								toast={toast}
								rootProps={rootProps}
								position={position}
								expand={expand}
								canExpand={activeId === undefined || activeId === toast.id}
								onMouseEnter={() => setActiveId(toast.id)}
								onMouseLeave={() => setActiveId(latestId)}
							/>
						)}
					/>
				))}
			</Toast.Viewport>
		</Toast.Portal>
	);
}
