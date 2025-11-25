"use client";

import React from "react";
import { useAuthGuard } from "../../hooks";
import { useAuth } from "../../context/AuthContext";

interface ProtectedRouteProps {
	children: React.ReactNode;
}

function LoadingSpinner() {
	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-50">
			<div className="text-center">
				<div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
				<p className="mt-4 text-gray-600">Loading...</p>
			</div>
		</div>
	);
}

export default function ProtectedRoute({
	children,
}: Readonly<ProtectedRouteProps>) {
	const { shouldRender, isLoading } = useAuthGuard();
	const { isLoggingOut } = useAuth();

	// Show loading during initial load, logout, or auth state changes
	if (isLoading || isLoggingOut) {
		return <LoadingSpinner />;
	}

	// If should not render (unauthenticated), show loading while redirect happens
	if (!shouldRender) {
		return <LoadingSpinner />;
	}

	return <>{children}</>;
}
