import React from "react";
import { cn } from "../../utils/helpers";

interface TableColumn<T> {
	key: keyof T;
	header: string;
	sortable?: boolean;
	render?: (value: T[keyof T], item: T) => React.ReactNode;
}

interface TableProps<T> {
	data: T[];
	columns: TableColumn<T>[];
	sortKey?: keyof T;
	sortDirection?: "asc" | "desc";
	onSort?: (key: keyof T) => void;
	className?: string;
}

export function Table<T extends { id: number }>({
	data,
	columns,
	sortKey,
	sortDirection,
	onSort,
	className,
}: TableProps<T>) {
	return (
		<div className={cn("overflow-x-auto", className ?? "")}>
			<div className="inline-block min-w-full align-middle">
				<div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					<table className="min-w-full divide-y divide-gray-300">
						<thead className="bg-gray-50">
							<tr>
								{columns.map((column) => (
									<th
										key={String(column.key)}
										className={cn(
											"px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider sm:px-6",
											column.sortable ? "cursor-pointer hover:bg-gray-100" : "",
											column.header === "Actions"
												? "sticky right-0 bg-gray-50"
												: ""
										)}
										onClick={() => column.sortable && onSort?.(column.key)}>
										<div className="flex items-center space-x-1">
											<span>{column.header}</span>
											{column.sortable && sortKey === column.key && (
												<span className="text-gray-400">
													{sortDirection === "asc" ? "↑" : "↓"}
												</span>
											)}
										</div>
									</th>
								))}
							</tr>
						</thead>
						<tbody className="bg-white divide-y divide-gray-200">
							{data.map((item, index) => (
								<tr
									key={item.id}
									className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
									{columns.map((column) => (
										<td
											key={String(column.key)}
											className={cn(
												"px-3 py-4 text-sm text-gray-900 sm:px-6",
												column.header === "Actions"
													? "sticky right-0 bg-white whitespace-nowrap"
													: "whitespace-nowrap"
											)}>
											{column.render
												? column.render(item[column.key], item)
												: String(item[column.key] || "")}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
					{data.length === 0 && (
						<div className="text-center py-8 text-gray-500">
							No data available
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
