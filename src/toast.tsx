"use client";

import {
	Toast,
	type ToastViewportProps,
} from "@base-ui/react/toast";
import { Sileo } from "./sileo";
import type { SileoToastData } from "./types";
import { useEffect, useState } from "react";

export type ToasterProps = Omit<ToastViewportProps, "children">;

export function Toaster(props: ToasterProps) {
	const { toasts } = Toast.useToastManager<SileoToastData>();
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
				data-position="top-right"
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
