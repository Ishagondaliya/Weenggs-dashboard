"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	useCallback,
	useMemo,
	ReactNode,
} from "react";
import { User, Project, DashboardStats } from "../types";
import { mockProjects } from "../utils/mockData";
import { API_ENDPOINTS, STORAGE_KEYS } from "../constants";

interface DataContextType {
	users: User[];
	projects: Project[];
	stats: DashboardStats;
	isLoading: boolean;
	error: string | null;
	fetchUsers: () => Promise<void>;
	addProject: (
		project: Omit<Project, "id" | "createdAt" | "updatedAt">
	) => void;
	updateProject: (id: number, updates: Partial<Project>) => void;
	deleteProject: (id: number) => void;
	resetProjects: () => void;
	updateUser: (id: number, updates: Partial<User>) => void;
	deleteUser: (id: number) => void;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

// Helper functions
const loadProjectsFromStorage = (): Project[] => {
	try {
		const stored = localStorage.getItem(STORAGE_KEYS.PROJECTS);
		return stored ? JSON.parse(stored) : mockProjects;
	} catch (error) {
		console.error("Error loading projects from storage:", error);
		return mockProjects;
	}
};

const saveProjectsToStorage = (projects: Project[]): void => {
	try {
		localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(projects));
	} catch (error) {
		console.error("Error saving projects to storage:", error);
	}
};

const generateProjectId = (existingProjects: Project[]): number => {
	return Math.max(...existingProjects.map((p) => p.id), 0) + 1;
};

const getCurrentDate = (): string => {
	return new Date().toISOString().split("T")[0];
};

export function DataProvider({ children }: { children: ReactNode }) {
	const [users, setUsers] = useState<User[]>([]);
	const [projects, setProjects] = useState<Project[]>([]);
	const [isLoading, setIsLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	// Load projects from localStorage on mount
	useEffect(() => {
		const storedProjects = localStorage.getItem("projects");
		if (storedProjects) {
			try {
				setProjects(JSON.parse(storedProjects));
			} catch (error) {
				console.error("Error parsing stored projects:", error);
				setProjects(mockProjects);
				localStorage.setItem("projects", JSON.stringify(mockProjects));
			}
		} else {
			setProjects(mockProjects);
			localStorage.setItem("projects", JSON.stringify(mockProjects));
		}
	}, []);

	// Save projects to localStorage whenever projects change
	useEffect(() => {
		if (projects.length > 0) {
			localStorage.setItem("projects", JSON.stringify(projects));
		}
	}, [projects]);

	const fetchUsers = useCallback(async () => {
		if (users.length > 0) return;

		setIsLoading(true);
		setError(null);
		try {
			const response = await fetch(API_ENDPOINTS.USERS);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}
			const userData = await response.json();
			setUsers(userData);
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Failed to fetch users";
			console.error("Error fetching users:", error);
			setError(message);
		} finally {
			setIsLoading(false);
		}
	}, [users.length]);

	useEffect(() => {
		fetchUsers();
	}, [fetchUsers]);

	const addProject = (
		projectData: Omit<Project, "id" | "createdAt" | "updatedAt">
	) => {
		const newProject: Project = {
			...projectData,
			id: Math.max(...projects.map((p) => p.id), 0) + 1,
			createdAt: new Date().toISOString().split("T")[0],
			updatedAt: new Date().toISOString().split("T")[0],
		};
		setProjects((prev) => {
			const updated = [...prev, newProject];
			localStorage.setItem("projects", JSON.stringify(updated));
			return updated;
		});
	};

	const updateProject = (id: number, updates: Partial<Project>) => {
		setProjects((prev) => {
			const updated = prev.map((project) =>
				project.id === id
					? {
							...project,
							...updates,
							updatedAt: new Date().toISOString().split("T")[0],
					  }
					: project
			);
			localStorage.setItem("projects", JSON.stringify(updated));
			return updated;
		});
	};

	const deleteProject = (id: number) => {
		setProjects((prev) => {
			const updated = prev.filter((project) => project.id !== id);
			localStorage.setItem("projects", JSON.stringify(updated));
			return updated;
		});
	};

	const resetProjects = () => {
		const defaultProjects: Project[] = [
			{
				id: 1,
				name: "E-commerce Platform",
				description: "Modern online shopping platform",
				status: "active",
				createdAt: new Date().toISOString().split("T")[0],
				updatedAt: new Date().toISOString().split("T")[0],
			},
			{
				id: 2,
				name: "Mobile App Development",
				description: "Cross-platform mobile application",
				status: "active",
				createdAt: new Date().toISOString().split("T")[0],
				updatedAt: new Date().toISOString().split("T")[0],
			},
		];
		setProjects(defaultProjects);
		localStorage.setItem("projects", JSON.stringify(defaultProjects));
	};

	const updateUser = (id: number, updates: Partial<User>) => {
		setUsers((prev) =>
			prev.map((user) => (user.id === id ? { ...user, ...updates } : user))
		);
	};

	const deleteUser = (id: number) => {
		setUsers((prev) => prev.filter((user) => user.id !== id));
	};

	const stats = useMemo<DashboardStats>(
		() => ({
			totalUsers: users.length,
			totalProjects: projects.length,
			activeProjects: projects.filter((p) => p.status === "active").length,
			completedProjects: projects.filter((p) => p.status === "completed")
				.length,
		}),
		[users.length, projects]
	);

	const contextValue = useMemo(
		() => ({
			users,
			projects,
			stats,
			isLoading,
			error,
			fetchUsers,
			addProject,
			updateProject,
			deleteProject,
			resetProjects,
			updateUser,
			deleteUser,
		}),
		[
			users,
			projects,
			stats,
			isLoading,
			error,
			fetchUsers,
			addProject,
			updateProject,
			deleteProject,
			resetProjects,
			updateUser,
			deleteUser,
		]
	);

	return (
		<DataContext.Provider value={contextValue}>{children}</DataContext.Provider>
	);
}

export function useData() {
	const context = useContext(DataContext);
	if (context === undefined) {
		throw new Error("useData must be used within a DataProvider");
	}
	return context;
}
