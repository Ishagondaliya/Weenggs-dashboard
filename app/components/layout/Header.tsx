"use client";

import React from "react";
import { useAuth } from "../../context/AuthContext";

export function Header() {
	const { user, logout, isLoggingOut } = useAuth();
	const [showDropdown, setShowDropdown] = React.useState(false);

	// Close dropdown when clicking outside
	React.useEffect(() => {
		const handleClickOutside = () => setShowDropdown(false);
		if (showDropdown) {
			document.addEventListener("click", handleClickOutside);
			return () => document.removeEventListener("click", handleClickOutside);
		}
	}, [showDropdown]);

	const handleLogout = () => {
		setShowDropdown(false);
		logout();
	};

	return (
		<header className="bg-white shadow-sm border-b border-gray-200">
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="flex h-16 items-center justify-between">
					<div>
						<h2 className="text-xl font-semibold text-gray-900">
							Welcome back!
						</h2>
					</div>
					<div className="flex items-center space-x-4">
						<span className="text-sm text-gray-600">
							Logged in as <span className="font-medium">{user?.username}</span>
						</span>
						<div className="relative">
							<button
								onClick={(e) => {
									e.stopPropagation();
									setShowDropdown(!showDropdown);
								}}
								disabled={isLoggingOut}
								className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
								<span className="text-sm font-medium text-white">
									{user?.username?.[0]?.toUpperCase()}
								</span>
							</button>
							{showDropdown && (
								<div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-50">
									<div className="py-1">
										<div className="px-4 py-2 text-sm text-gray-700 border-b">
											<div className="font-medium">{user?.username}</div>
											<div className="text-gray-500">{user?.email}</div>
										</div>
										<button
											onClick={handleLogout}
											disabled={isLoggingOut}
											className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
											{isLoggingOut ? (
												<>
													<div className="animate-spin rounded-full h-4 w-4 border-b-2 border-gray-500 mr-2"></div>
													Logging out...
												</>
											) : (
												"Logout"
											)}
										</button>
									</div>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>
		</header>
	);
}
