import React from "react";
import { cn } from "../../utils/helpers";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
	label?: string;
	error?: string;
	helperText?: string;
}

export function Input({
	label,
	error,
	helperText,
	className,
	...props
}: Readonly<InputProps>) {
	return (
		<div className="w-full">
			{label && (
				<label className="block text-sm font-medium text-gray-700 mb-1">
					{label}
				</label>
			)}
			<input
				className={cn(
					"w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-gray-900 placeholder-gray-500 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
				)}
				{...props}
			/>
			{error && <p className="mt-1 text-sm text-red-600">{error}</p>}
			{helperText && !error && (
				<p className="mt-1 text-sm text-gray-500">{helperText}</p>
			)}
		</div>
	);
}
