"use client";

import React, { useState } from "react";
import { useData } from "../context/DataContext";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { Select } from "../components/ui/Select";
import { Card } from "../components/ui/Card";
import { Modal } from "../components/ui/Modal";
import { SideDrawer } from "../components/ui/SideDrawer";
import { ConfirmDialog } from "../components/ui/Utils";
import { Project } from "../types";
import { formatDate, capitalizeFirst } from "../utils/helpers";
import ProtectedRoute from "../components/auth/ProtectedRoute";

const statusOptions = [
	{ value: "active", label: "Active" },
	{ value: "inactive", label: "Inactive" },
	{ value: "completed", label: "Completed" },
	{ value: "on-hold", label: "On Hold" },
];

export default function ProjectsPage() {
	const { projects, addProject, updateProject, deleteProject } = useData();
	const [showCreateForm, setShowCreateForm] = useState(false);
	const [editingProject, setEditingProject] = useState<Project | null>(null);
	const [showEditDrawer, setShowEditDrawer] = useState(false);
	const [inlineEditId, setInlineEditId] = useState<number | null>(null);
	const [deleteConfirm, setDeleteConfirm] = useState<{
		show: boolean;
		project: Project | null;
	}>({
		show: false,
		project: null,
	});
	const handleCreateProject = (
		projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
	) => {
		console.log("Creating project:", projectData);
		addProject(projectData);
		setShowCreateForm(false);
	};

	const handleEditProject = (project: Project) => {
		setEditingProject(project);
		setShowEditDrawer(true);
	};

	const handleUpdateProject = (projectData: Partial<Project>) => {
		if (editingProject) {
			updateProject(editingProject.id, projectData);
			setEditingProject(null);
			setShowEditDrawer(false);
		}
	};

	const handleDelete = (project: Project) => {
		setDeleteConfirm({ show: true, project });
	};

	const confirmDelete = () => {
		if (deleteConfirm.project) {
			deleteProject(deleteConfirm.project.id);
			setDeleteConfirm({ show: false, project: null });
		}
	};

	const handleInlineEdit = (project: Project) => {
		setInlineEditId(project.id);
	};

	const handleInlineSave = (
		projectId: number,
		newStatus: Project["status"]
	) => {
		updateProject(projectId, { status: newStatus });
		setInlineEditId(null);
	};

	const getStatusColor = (status: Project["status"]) => {
		const colors = {
			active: "bg-green-100 text-green-800",
			inactive: "bg-gray-100 text-gray-800",
			completed: "bg-blue-100 text-blue-800",
			"on-hold": "bg-yellow-100 text-yellow-800",
		};
		return colors[status] || colors.inactive;
	};

	return (
		<ProtectedRoute>
			<DashboardLayout>
				<div className="space-y-6">
					<div className="flex items-center justify-between">
						<div>
							<h1 className="text-2xl font-bold text-gray-900">
								Project Management
							</h1>
							<p className="text-gray-600">Create and manage your projects</p>
						</div>
						<Button
							onClick={() => {
								console.log("Create button clicked");
								setShowCreateForm(true);
							}}>
							Create New Project
						</Button>
					</div>

					{/* Projects Grid */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
						{projects.map((project) => (
							<Card
								key={project.id}
								className="hover:shadow-lg transition-shadow">
								<div className="space-y-4">
									<div className="flex items-start justify-between">
										<h3 className="text-lg font-semibold text-gray-900 truncate">
											{project.name}
										</h3>
										<div className="flex space-x-1">
											<Button
												size="sm"
												variant="outline"
												onClick={() => handleInlineEdit(project)}
												className="text-xs">
												Quick Edit
											</Button>
											<Button
												size="sm"
												variant="outline"
												onClick={() => handleEditProject(project)}
												className="text-xs">
												Edit
											</Button>
											<Button
												size="sm"
												variant="danger"
												onClick={() => handleDelete(project)}
												className="text-xs">
												Delete
											</Button>
										</div>
									</div>

									<p className="text-gray-600 text-sm line-clamp-3">
										{project.description}
									</p>

									<div className="flex items-center justify-between">
										{inlineEditId === project.id ? (
											<div className="flex items-center space-x-2">
												<Select
													options={statusOptions}
													value={project.status}
													onChange={(e) =>
														handleInlineSave(
															project.id,
															e.target.value as Project["status"]
														)
													}
													className="text-xs"
												/>
												<Button
													size="sm"
													variant="outline"
													onClick={() => setInlineEditId(null)}
													className="text-xs">
													Cancel
												</Button>
											</div>
										) : (
											<span
												className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
													project.status
												)}`}>
												{capitalizeFirst(project.status)}
											</span>
										)}
									</div>

									<div className="text-xs text-gray-500 space-y-1">
										<div>Created: {formatDate(project.createdAt)}</div>
										<div>Updated: {formatDate(project.updatedAt)}</div>
									</div>
								</div>
							</Card>
						))}
					</div>

					{projects.length === 0 && (
						<Card>
							<div className="text-center py-12">
								<h3 className="text-lg font-medium text-gray-900 mb-2">
									No projects yet
								</h3>
								<p className="text-gray-500 mb-4">
									Get started by creating your first project.
								</p>
								<Button onClick={() => setShowCreateForm(true)}>
									Create Project
								</Button>
							</div>
						</Card>
					)}

					{/* Edit Project Drawer */}
					{showEditDrawer && editingProject && (
						<SideDrawer
							isOpen={showEditDrawer}
							onClose={() => {
								setShowEditDrawer(false);
								setEditingProject(null);
							}}
							title="Edit Project">
							<ProjectForm
								project={editingProject}
								onSubmit={handleUpdateProject}
								onCancel={() => {
									setShowEditDrawer(false);
									setEditingProject(null);
								}}
							/>
						</SideDrawer>
					)}

					{/* Delete Confirmation */}
					<ConfirmDialog
						isOpen={deleteConfirm.show}
						onClose={() => setDeleteConfirm({ show: false, project: null })}
						onConfirm={confirmDelete}
						title="Delete Project"
						message={`Are you sure you want to delete "${deleteConfirm.project?.name}"? This action cannot be undone.`}
						variant="danger"
					/>

					{/* Create Project Modal */}
					<Modal
						isOpen={showCreateForm}
						onClose={() => setShowCreateForm(false)}
						title="Create New Project"
						size="lg">
						<ProjectForm
							onSubmit={handleCreateProject}
							onCancel={() => setShowCreateForm(false)}
						/>
					</Modal>
				</div>
			</DashboardLayout>
		</ProtectedRoute>
	);
}

function ProjectForm({
	project,
	onSubmit,
	onCancel,
}: {
	project?: Project;
	onSubmit: (data: any) => void;
	onCancel: () => void;
}) {
	const [formData, setFormData] = useState({
		name: project?.name || "",
		description: project?.description || "",
		status: project?.status || ("active" as Project["status"]),
	});

	const [errors, setErrors] = useState<Record<string, string>>({});

	const validate = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.name.trim()) {
			newErrors.name = "Project name is required";
		}

		if (!formData.description.trim()) {
			newErrors.description = "Project description is required";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (validate()) {
			onSubmit(formData);
			if (!project) {
				// Reset form for new projects
				setFormData({
					name: "",
					description: "",
					status: "active",
				});
			}
		}
	};

	return (
		<form onSubmit={handleSubmit} className="space-y-4">
			<Input
				label="Project Name"
				value={formData.name}
				onChange={(e) =>
					setFormData((prev) => ({ ...prev, name: e.target.value }))
				}
				error={errors.name}
				placeholder="Enter project name"
				required
			/>

			<div className="space-y-1">
				<label className="block text-sm font-medium text-gray-700">
					Description
				</label>
				<textarea
					value={formData.description}
					onChange={(e) =>
						setFormData((prev) => ({ ...prev, description: e.target.value }))
					}
					rows={4}
					className="block w-full rounded-md border border-gray-300 px-3 py-2 text-sm placeholder-gray-500 focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 text-black"
					placeholder="Enter project description"
					required
				/>
				{errors.description && (
					<p className="text-sm text-red-600">{errors.description}</p>
				)}
			</div>

			<Select
				label="Status"
				options={statusOptions}
				value={formData.status}
				onChange={(e) =>
					setFormData((prev) => ({
						...prev,
						status: e.target.value as Project["status"],
					}))
				}
			/>

			<div className="flex justify-end space-x-2 pt-4">
				<Button variant="outline" onClick={onCancel} type="button">
					Cancel
				</Button>
				<Button type="submit">
					{project ? "Update Project" : "Create Project"}
				</Button>
			</div>
		</form>
	);
}
