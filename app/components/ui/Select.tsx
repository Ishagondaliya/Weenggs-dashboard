import React from "react";
import { cn } from "../../utils/helpers";

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	options: { value: string; label: string }[];
}

export function Select({
	label,
	error,
	options,
	className,
	...props
}: SelectProps) {
	return (
		<div className="space-y-1">
			{label && (
				<label className="block text-sm font-medium text-gray-700">
					{label}
				</label>
			)}
			<select
				className={cn(
					"block w-full rounded-md border border-gray-300 px-3 py-2 text-sm text-gray-900 bg-white focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500",
					error && "border-red-500 focus:border-red-500 focus:ring-red-500",
					className
				)}
				{...props}>
				{options.map((option) => (
					<option key={option.value} value={option.value}>
						{option.label}
					</option>
				))}
			</select>
			{error && <p className="text-sm text-red-600">{error}</p>}
		</div>
	);
}
