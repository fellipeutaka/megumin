import type { ReactNode } from "react";

export type SileoState =
	| "success"
	| "loading"
	| "error"
	| "warning"
	| "info"
	| "action";

export type SileoPosition =
	| "top-left"
	| "top-center"
	| "top-right"
	| "bottom-left"
	| "bottom-center"
	| "bottom-right";

export interface SileoToastData {
	icon?: ReactNode | null;
	fill?: string;
	roundness?: number;
}
