import React from "react";
import { cn } from "../../utils/helpers";

interface CardProps {
	title?: string;
	children: React.ReactNode;
	className?: string;
}

export function Card({ title, children, className }: CardProps) {
	return (
		<div
			className={cn("bg-white overflow-hidden shadow rounded-lg", className)}>
			{title && (
				<div className="px-4 py-5 sm:px-6 border-b border-gray-200">
					<h3 className="text-lg leading-6 font-medium text-gray-900">
						{title}
					</h3>
				</div>
			)}
			<div className="px-4 py-5 sm:p-6">{children}</div>
		</div>
	);
}

interface StatsCardProps {
	title: string;
	value: number | string;
	icon?: React.ReactNode;
	trend?: {
		value: number;
		isPositive: boolean;
	};
}

export function StatsCard({ title, value, icon, trend }: StatsCardProps) {
	return (
		<Card>
			<div className="flex items-center">
				<div className="flex-1">
					<p className="text-sm font-medium text-gray-600 truncate">{title}</p>
					<p className="mt-1 text-3xl font-semibold text-gray-900">{value}</p>
					{trend && (
						<p
							className={cn(
								"mt-2 text-sm",
								trend.isPositive ? "text-green-600" : "text-red-600"
							)}>
							<span
								className={cn("inline-flex items-center text-xs font-medium")}>
								{trend.isPositive ? "↗" : "↘"} {Math.abs(trend.value)}%
							</span>
						</p>
					)}
				</div>
				{icon && (
					<div className="flex-shrink-0">
						<div className="w-8 h-8 bg-blue-500 rounded-md flex items-center justify-center">
							{icon}
						</div>
					</div>
				)}
			</div>
		</Card>
	);
}
