"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "../../context/AuthContext";
import { cn } from "../../utils/helpers";

const navigation = [
	{ name: "Dashboard", href: "/dashboard", icon: "📊" },
	{ name: "Users", href: "/users", icon: "👥" },
	{ name: "Projects", href: "/projects", icon: "📁" },
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
