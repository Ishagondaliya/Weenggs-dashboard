"use client";

import React, {
	createContext,
	useContext,
	useState,
	useEffect,
	ReactNode,
} from "react";
import { useRouter } from "next/navigation";
import { AuthUser } from "../types";
import { dummyAuth } from "../utils/mockData";

interface AuthContextType {
	user: AuthUser | null;
	login: (username: string, password: string) => Promise<boolean>;
	logout: () => void;
	isLoading: boolean;
	isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [isLoggingOut, setIsLoggingOut] = useState(false);
	const router = useRouter();

	useEffect(() => {
		// Check if user is logged in on app start
		const storedUser = localStorage.getItem("authUser");
		if (storedUser) {
			try {
				const userData = JSON.parse(storedUser);
				setUser(userData);
				// Ensure auth cookie is set
				document.cookie = `authToken=${storedUser}; Path=/; Max-Age=${
					60 * 60 * 24 * 7
				}; SameSite=Strict`;
			} catch (error) {
				console.error("Error parsing stored user:", error);
				localStorage.removeItem("authUser");
				// Remove invalid auth cookie
				document.cookie =
					"authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
			}
		}
		setIsLoading(false);
	}, []);

	const login = async (
		username: string,
		password: string
	): Promise<boolean> => {
		// Simulate API call delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		if (username === dummyAuth.username && password === dummyAuth.password) {
			const authUser: AuthUser = {
				id: 1,
				username: dummyAuth.username,
				email: dummyAuth.email,
				isAuthenticated: true,
			};

			setUser(authUser);
			localStorage.setItem("authUser", JSON.stringify(authUser));
			// Set auth cookie for middleware
			document.cookie = `authToken=${JSON.stringify(
				authUser
			)}; Path=/; Max-Age=${60 * 60 * 24 * 7}; SameSite=Strict`;

			// Use router.replace for smoother navigation
			router.replace("/dashboard");
			return true;
		}

		return false;
	};

	const logout = () => {
		setIsLoggingOut(true);
		setUser(null);
		localStorage.removeItem("authUser");
		// Remove auth cookie for middleware
		document.cookie =
			"authToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
		// Use router.push with replace for smoother navigation
		router.replace("/login");
		// Reset logging out state after navigation
		setTimeout(() => setIsLoggingOut(false), 100);
	};

	const contextValue = React.useMemo(
		() => ({
			user,
			login,
			logout,
			isLoading,
			isLoggingOut,
		}),
		[user, login, logout, isLoading, isLoggingOut]
	);

	return (
		<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
	);
}

export function useAuth() {
	const context = useContext(AuthContext);
	if (context === undefined) {
		throw new Error("useAuth must be used within an AuthProvider");
	}
	return context;
}
