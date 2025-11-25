"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/helpers";

const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: "📊" },
	{ name: "Users", href: "/users", icon: "👥" },
	{ name: "Projects", href: "/projects", icon: "📁"	 },
];

export function Sidebar() {
	const pathname = usePathname();
	const { logout } = useAuth();

	return (
		<div className="flex h-screen w-64 flex-col bg-gray-900">
			<div className="flex flex-1 flex-col overflow-y-auto pt-5 pb-4">
				<div className="flex flex-shrink-0 items-center px-4">
					<h1 className="text-xl font-bold text-white">Admin Dashboard</h1>
				</div>
				<nav className="mt-8 flex-1 space-y-1 px-2">
					{navigation.map((item) => {
						const isActive = pathname === item.href;
						return (
							<Link
								key={item.name}
								href={item.href}
								className={cn(
									"group flex items-center px-2 py-2 text-sm font-medium rounded-md transition-colors",
									isActive
										? "bg-gray-700 text-white"
										: "text-gray-300 hover:bg-gray-700 hover:text-white"
								)}>
								<span className="mr-3 text-lg">{item.icon}</span>
								{item.name}
							</Link>
						);
					})}
				</nav>
				<div className="flex-shrink-0 px-2">
					<button
						onClick={logout}
						className="group flex w-full items-center px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white transition-colors">

						Logout
					</button>
				</div>
			</div>
		</div>
	);
}

export function Header() {
	const { user, logout } = useAuth();
	const [showDropdown, setShowDropdown] = React.useState(false);

	// Close dropdown when clicking outside
	React.useEffect(() => {
		const handleClickOutside = () => setShowDropdown(false);
		if (showDropdown) {
			document.addEventListener("click", handleClickOutside);
			return () => document.removeEventListener("click", handleClickOutside);
		}
	}, [showDropdown]);

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
								className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center hover:bg-blue-700 transition-colors">
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
											onClick={() => {
												logout();
												setShowDropdown(false);
											}}
											className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
											Logout
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
