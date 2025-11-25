"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import { LoadingSpinner } from "./components/ui/Utils";

export default function Home() {
	const { user, isLoading } = useAuth();
	const router = useRouter();

	useEffect(() => {
		if (!isLoading) {
			if (user?.isAuthenticated) {
				router.push("/dashboard");
			} else {
				router.push("/login");
			}
		}
	}, [user, isLoading, router]);

	return (
		<div className="flex min-h-screen items-center justify-center bg-gray-50">
			<LoadingSpinner size="lg" />
		</div>
	);
}

