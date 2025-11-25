"use client";

import React, { useState, useMemo } from "react";
import { useData } from "../context/DataContext";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Table } from "../components/ui/Table";
import { Input } from "../components/ui/Input";
import { Button } from "../components/ui/Button";
import { SideDrawer } from "../components/ui/SideDrawer";
import { ConfirmDialog } from "../components/ui/Utils";
import { User } from "../types";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function UsersPage() {
	const { users, updateUser, deleteUser, fetchUsers, isLoading } = useData();
	const [searchTerm, setSearchTerm] = useState("");
	const [sortKey, setSortKey] = useState<keyof User>("name");
	const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
	const [editingUser, setEditingUser] = useState<User | null>(null);
	const [showEditDrawer, setShowEditDrawer] = useState(false);
	const [deleteConfirm, setDeleteConfirm] = useState<{
		show: boolean;
		user: User | null;
	}>({
		show: false,
		user: null,
	});
	const [inlineEditId, setInlineEditId] = useState<number | null>(null);
	const [inlineEditData, setInlineEditData] = useState<Partial<User>>({});

	// Fetch users when component mounts
	React.useEffect(() => {
		if (users.length === 0 && !isLoading) {
			fetchUsers();
		}
	}, [users.length, isLoading, fetchUsers]);

	// Filter and sort users
	const filteredAndSortedUsers = useMemo(() => {
		if (!users || users.length === 0) {
			return [];
		}

		let filtered = users.filter(
			(user) =>
				user?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
				user?.company?.name?.toLowerCase().includes(searchTerm.toLowerCase())
		);

		return filtered.sort((a, b) => {
			const aVal = a[sortKey];
			const bVal = b[sortKey];

			if (typeof aVal === "string" && typeof bVal === "string") {
				return sortDirection === "asc"
					? aVal.localeCompare(bVal)
					: bVal.localeCompare(aVal);
			}

			if (typeof aVal === "number" && typeof bVal === "number") {
				return sortDirection === "asc" ? aVal - bVal : bVal - aVal;
			}

			return 0;
		});
	}, [users, searchTerm, sortKey, sortDirection]);

	const handleSort = (key: keyof User) => {
		if (sortKey === key) {
			setSortDirection(sortDirection === "asc" ? "desc" : "asc");
		} else {
			setSortKey(key);
			setSortDirection("asc");
		}
	};

	const handleEdit = (user: User) => {
		setEditingUser(user);
		setShowEditDrawer(true);
	};

	const handleSaveEdit = (userData: Partial<User>) => {
		if (editingUser) {
			updateUser(editingUser.id, userData);
			setEditingUser(null);
			setShowEditDrawer(false);
		}
	};

	const handleInlineEdit = (userId: number) => {
		const user = users.find((u) => u.id === userId);
		if (user) {
			setInlineEditId(userId);
			setInlineEditData({
				name: user.name || "",
				email: user.email || "",
				company: user.company || { name: "", catchPhrase: "", bs: "" },
			});
		}
	};

	const handleInlineSave = (userId: number) => {
		updateUser(userId, inlineEditData);
		setInlineEditId(null);
		setInlineEditData({});
	};

	const handleDelete = (user: User) => {
		setDeleteConfirm({ show: true, user });
	};

	const confirmDelete = () => {
		if (deleteConfirm.user) {
			deleteUser(deleteConfirm.user.id);
			setDeleteConfirm({ show: false, user: null });
		}
	};

	const columns = [
		{
			key: "name" as keyof User,
			header: "Name",
			sortable: true,
			render: (value: any, user: User) =>
				inlineEditId === user.id ? (
					<Input
						value={inlineEditData.name || ""}
						onChange={(e) =>
							setInlineEditData((prev) => ({ ...prev, name: e.target.value }))
						}
						className="text-sm"
					/>
				) : (
					<span>{value}</span>
				),
		},
		{
			key: "email" as keyof User,
			header: "Email",
			sortable: true,
			render: (value: any, user: User) =>
				inlineEditId === user.id ? (
					<Input
						value={inlineEditData.email || ""}
						onChange={(e) =>
							setInlineEditData((prev) => ({ ...prev, email: e.target.value }))
						}
						className="text-sm"
					/>
				) : (
					<span>{value}</span>
				),
		},
		{
			key: "company" as keyof User,
			header: "Company",
			sortable: true,
			render: (value: any, user: User) =>
				inlineEditId === user.id ? (
					<Input
						value={inlineEditData.company?.name || ""}
						onChange={(e) =>
							setInlineEditData((prev) => ({
								...prev,
								company: { ...prev.company, name: e.target.value } as any,
							}))
						}
						className="text-sm"
					/>
				) : (
					<span>{user.company.name}</span>
				),
		},
		{
			key: "id" as keyof User,
			header: "Actions",
			render: (_: any, user: User) => (
				<div className="flex items-center space-x-1 min-w-max">
					{inlineEditId === user.id ? (
						<>
							<Button
								size="sm"
								variant="primary"
								onClick={() => handleInlineSave(user.id)}
								title="Save"
								className="shrink-0">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M5 13l4 4L19 7"
									/>
								</svg>
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={() => {
									setInlineEditId(null);
									setInlineEditData({});
								}}
								title="Cancel"
								className="shrink-0">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M6 18L18 6m0 12L6 6"
									/>
								</svg>
							</Button>
						</>
					) : (
						<>
							<Button
								size="sm"
								variant="outline"
								onClick={() => handleInlineEdit(user.id)}
								title="Quick Edit"
								className="shrink-0">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
									/>
								</svg>
							</Button>
							<Button
								size="sm"
								variant="outline"
								onClick={() => handleEdit(user)}
								title="Edit Details"
								className="shrink-0">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
									/>
								</svg>
							</Button>
							<Button
								size="sm"
								variant="danger"
								onClick={() => handleDelete(user)}
								title="Delete User"
								className="shrink-0">
								<svg
									className="w-4 h-4"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
									/>
								</svg>
							</Button>
						</>
					)}
				</div>
			),
		},
	];

	return (
		<ProtectedRoute>
			<DashboardLayout>
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								User Management
							</h1>
							<p className="text-gray-600">Manage and organize user accounts</p>
						</div>
					</div>

					<div className="bg-white shadow rounded-lg p-6">
						<div className="mb-4">
							<Input
								placeholder="Search users by name, email, or company..."
								value={searchTerm}
								onChange={(e) => setSearchTerm(e.target.value)}
								className="max-w-md"
							/>
						</div>

						{isLoading ? (
							<div className="text-center py-8">
								<div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
								<p className="text-gray-500 mt-2">Loading users...</p>
							</div>
						) : (
							<>
								{users.length === 0 ? (
									<div className="text-center py-8">
										<p className="text-gray-500">No users found.</p>
										<button
											onClick={fetchUsers}
											className="mt-2 text-blue-600 hover:text-blue-800 underline">
											Retry loading users
										</button>
									</div>
								) : (
									<Table
										data={filteredAndSortedUsers}
										columns={columns}
										sortKey={sortKey}
										sortDirection={sortDirection}
										onSort={handleSort}
									/>
								)}
							</>
						)}
					</div>

					{/* Edit Drawer */}
					{showEditDrawer && editingUser && (
						<UserEditDrawer
							user={editingUser}
							onSave={handleSaveEdit}
							onClose={() => {
								setEditingUser(null);
								setShowEditDrawer(false);
							}}
						/>
					)}

					{/* Delete Confirmation */}
					<ConfirmDialog
						isOpen={deleteConfirm.show}
						onClose={() => setDeleteConfirm({ show: false, user: null })}
						onConfirm={confirmDelete}
						title="Delete User"
						message={`Are you sure you want to delete "${deleteConfirm.user?.name}"? This action cannot be undone.`}
						variant="danger"
					/>
				</div>
			</DashboardLayout>
		</ProtectedRoute>
	);
}

function UserEditDrawer({
	user,
	onSave,
	onClose,
}: Readonly<{
	user: User;
	onSave: (data: Partial<User>) => void;
	onClose: () => void;
}>) {
	const [formData, setFormData] = useState({
		name: user.name,
		email: user.email,
		company: user.company.name,
		phone: user.phone,
		website: user.website,
	});

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		onSave({
			name: formData.name,
			email: formData.email,
			phone: formData.phone,
			website: formData.website,
			company: { ...user.company, name: formData.company },
		});
	};

	return (
		<SideDrawer isOpen={true} onClose={onClose} title="Edit User Details">
			<form onSubmit={handleSubmit} className="space-y-4">
				<Input
					label="Name"
					value={formData.name}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, name: e.target.value }))
					}
					required
				/>
				<Input
					label="Email"
					type="email"
					value={formData.email}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, email: e.target.value }))
					}
					required
				/>
				<Input
					label="Phone"
					value={formData.phone}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, phone: e.target.value }))
					}
				/>
				<Input
					label="Website"
					value={formData.website}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, website: e.target.value }))
					}
				/>
				<Input
					label="Company"
					value={formData.company}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, company: e.target.value }))
					}
					required
				/>
				<div className="flex justify-end space-x-2 pt-4">
					<Button variant="outline" onClick={onClose}>
						Cancel
					</Button>
					<Button type="submit">Save Changes</Button>
				</div>
			</form>
		</SideDrawer>
	);
}
