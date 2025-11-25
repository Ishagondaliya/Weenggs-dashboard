"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";
import { LoadingSpinner } from "../ui/Utils";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

interface DashboardLayoutProps {
	children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
	const { user, isLoading } = useAuth();

	if (isLoading) {
		return (
			<div className="flex h-screen items-center justify-center">
				<LoadingSpinner size="lg" />
			</div>
		);
	}

	if (!user?.isAuthenticated) {
		return (
			<div className="flex h-screen items-center justify-center">
				<div className="text-center">
					<p className="text-gray-600">
						Please log in to access the dashboard.
					</p>
				</div>
			</div>
		);
	}

	return (
		<div className="flex h-screen bg-gray-100">
			<Sidebar />
			<div className="flex-1 flex flex-col overflow-hidden">
				<Header />
				<main className="flex-1 overflow-y-auto p-6">{children}</main>
			</div>
		</div>
	);
}
