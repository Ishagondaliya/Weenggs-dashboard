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
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: Readonly<{ children: ReactNode }>) {
	const [user, setUser] = useState<AuthUser | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		// Check if user is logged in on app start
		const storedUser = localStorage.getItem("authUser");
		if (storedUser) {
			try {
				setUser(JSON.parse(storedUser));
			} catch (error) {
				console.error("Error parsing stored user:", error);
				localStorage.removeItem("authUser");
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
			return true;
		}

		return false;
	};

	const logout = () => {
		setUser(null);
		localStorage.removeItem("authUser");
		router.push("/login");
	};

	const contextValue = React.useMemo(
		() => ({
			user,
			login,
			logout,
			isLoading,
		}),
		[user, login, logout, isLoading]
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
