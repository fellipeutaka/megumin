import type { ReactNode } from "react";

export type SileoState =
	| "success"
	| "loading"
	| "error"
	| "warning"
	| "info"
	| "action";

export interface SileoToastData {
	icon?: ReactNode | null;
	fill?: string;
	roundness?: number;
}
