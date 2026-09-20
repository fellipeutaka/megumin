"use client";

import type { ReactNode } from "react";
import { ExampleShell } from "@/components/example-shell";

export default function MainLayout({ children }: { children: ReactNode }) {
	return <ExampleShell>{children}</ExampleShell>;
}
