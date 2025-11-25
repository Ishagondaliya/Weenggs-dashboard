"use client";

import React from "react";
import { useData } from "../context/DataContext";
import { DashboardLayout } from "../components/layout/DashboardLayout";
import { StatsCard } from "../components/ui/Card";
import { LoadingSpinner } from "../components/ui/Utils";
import ProtectedRoute from "../components/auth/ProtectedRoute";

export default function DashboardPage() {
	const { stats, isLoading } = useData();

	// Users are automatically fetched in DataContext, no need to fetch again

	if (isLoading) {
		return (
			<ProtectedRoute>
				<DashboardLayout>
					<div className="flex items-center justify-center h-64">
						<LoadingSpinner size="lg" />
					</div>
				</DashboardLayout>
			</ProtectedRoute>
		);
	}

	return (
		<ProtectedRoute>
			<DashboardLayout>
				<div className="space-y-6">
					<div>
						<h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
						<p className="text-gray-600">
							Overview of your admin panel statistics
						</p>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
						<StatsCard
							title="Total Users"
							value={stats.totalUsers}
							icon={
								<svg
									className="w-4 h-4 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0H21l.5 2.5M13.5 3H13l.5 2.5"
									/>
								</svg>
							}
						/>

						<StatsCard
							title="Total Projects"
							value={stats.totalProjects}
							icon={
								<svg
									className="w-4 h-4 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
									/>
								</svg>
							}
						/>

						<StatsCard
							title="Active Projects"
							value={stats.activeProjects}
							icon={
								<svg
									className="w-4 h-4 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 10V3L4 14h7v7l9-11h-7z"
									/>
								</svg>
							}
						/>

						<StatsCard
							title="Completed Projects"
							value={stats.completedProjects}
							icon={
								<svg
									className="w-4 h-4 text-white"
									fill="none"
									stroke="currentColor"
									viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							}
						/>
					</div>

					<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
						<div className="bg-white overflow-hidden shadow rounded-lg">
							<div className="p-6">
								<h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
									Recent Activity
								</h3>
								<div className="space-y-3">
									<div className="flex items-center text-sm">
										<div className="w-2 h-2 bg-blue-600 rounded-full mr-3"></div>
										<span className="text-gray-600">New user registered</span>
										<span className="text-gray-400 ml-auto">2 hours ago</span>
									</div>
									<div className="flex items-center text-sm">
										<div className="w-2 h-2 bg-green-600 rounded-full mr-3"></div>
										<span className="text-gray-600">Project completed</span>
										<span className="text-gray-400 ml-auto">4 hours ago</span>
									</div>
									<div className="flex items-center text-sm">
										<div className="w-2 h-2 bg-yellow-600 rounded-full mr-3"></div>
										<span className="text-gray-600">New project created</span>
										<span className="text-gray-400 ml-auto">1 day ago</span>
									</div>
								</div>
							</div>
						</div>

						<div className="bg-white overflow-hidden shadow rounded-lg">
							<div className="p-6">
								<h3 className="text-lg leading-6 font-medium text-gray-900 mb-4">
									Quick Actions
								</h3>
								<div className="space-y-3">
									<a
										href="/users"
										className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
										<span className="text-2xl mr-3">👥</span>
										<div>
											<p className="font-medium text-gray-900">Manage Users</p>
											<p className="text-sm text-gray-500">
												View and edit user information
											</p>
										</div>
									</a>
									<a
										href="/projects"
										className="flex items-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
										<span className="text-2xl mr-3">📁</span>
										<div>
											<p className="font-medium text-gray-900">
												Manage Projects
											</p>
											<p className="text-sm text-gray-500">
												Create and organize projects
											</p>
										</div>
									</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</DashboardLayout>
		</ProtectedRoute>
	);
}
