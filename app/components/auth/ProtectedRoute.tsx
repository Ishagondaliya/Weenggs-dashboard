"use client";

import React from "react";
import { useAuthGuard } from "../../hooks";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

export default function ProtectedRoute({
	children,
}: Readonly<ProtectedRouteProps>) {
	const { shouldRender, isLoading } = useAuthGuard();

	if (isLoading) {
		// You can customize this loading component
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
			</div>
		);
	}

	if (!shouldRender) {
		// This should rarely be shown as useAuthGuard handles redirects
		return (
			<div className="flex items-center justify-center min-h-screen">
				<div className="text-center">
					<h2 className="text-xl font-semibold text-gray-800">
						Please log in to access the dashboard.
					</h2>
				</div>
			</div>
		);
	}

	return <>{children}</>;
}
