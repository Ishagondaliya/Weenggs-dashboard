"use client";

import React, { useEffect } from "react";
import { cn } from "../../utils/helpers";

interface SideDrawerProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	width?: "sm" | "md" | "lg";
}

export function SideDrawer({
	isOpen,
	onClose,
	title,
	children,
	width = "md",
}: SideDrawerProps) {
	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "unset";
		}

		return () => {
			document.body.style.overflow = "unset";
		};
	}, [isOpen]);

	if (!isOpen) return null;

	const widthClasses = {
		sm: "max-w-sm",
		md: "max-w-md",
		lg: "max-w-lg",
	};

	return (
		<div
			className={cn(
				"fixed inset-0 z-30 overflow-hidden",
				isOpen ? "pointer-events-auto" : "pointer-events-none"
			)}>
			<div className="absolute inset-0 overflow-hidden">
				{/* Invisible overlay for click to close */}
				<button
					className="absolute inset-0 w-full h-full bg-transparent border-none cursor-default focus:outline-none"
					onClick={onClose}
					onKeyDown={(e) => {
						if (e.key === "Escape") {
							onClose();
						}
					}}
					aria-label="Close drawer"
				/>

				<div className="fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16">
					<div
						className={cn(
							"pointer-events-auto w-screen transform transition-all duration-300 ease-in-out",
							widthClasses[width],
							isOpen ? "translate-x-0" : "translate-x-full"
						)}>
						<div className="flex h-full flex-col overflow-y-auto bg-white shadow-2xl border-l border-gray-200">
							<div className="flex-1">
								<div className="bg-gray-50 px-4 py-6 sm:px-6">
									<div className="flex items-center justify-between">
										<h2 className="text-lg font-medium text-gray-900">
											{title}
										</h2>
										<button
											onClick={onClose}
											title="Close"
											className="rounded-md bg-gray-50 text-gray-400 hover:text-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 p-1">
											<span className="sr-only">Close</span>
											<svg
												className="h-5 w-5"
												fill="none"
												viewBox="0 0 24 24"
												stroke="currentColor">
												<path
													strokeLinecap="round"
													strokeLinejoin="round"
													strokeWidth={2}
													d="M6 18L18 6M6 6l12 12"
												/>
											</svg>
										</button>
									</div>
								</div>
								<div className="px-4 py-6 sm:px-6">{children}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
