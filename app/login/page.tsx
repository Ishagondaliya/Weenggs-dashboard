"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/Button";
import { Input } from "../components/ui/Input";
import { LoadingSpinner } from "../components/ui/Utils";

export default function LoginPage() {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [isLoading, setIsLoading] = useState(false);

	const { login } = useAuth();
	const router = useRouter();

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError("");
		setIsLoading(true);

		try {
			const success = await login(username, password);
			if (success) {
				router.push("/dashboard");
			} else {
				setError("Invalid username or password");
			}
		} catch (err) {
			setError("An error occurred during login");
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
			<div className="max-w-md w-full space-y-8">
				<div>
					<h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
						Sign in to your account
					</h2>
					<p className="mt-2 text-center text-sm text-gray-600">
						Use demo credentials: admin / password123
					</p>
				</div>

				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<Input
							label="Username"
							type="text"
							required
							value={username}
							onChange={(e) => setUsername(e.target.value)}
							placeholder="Enter your username"
						/>

						<Input
							label="Password"
							type="password"
							required
							value={password}
							onChange={(e) => setPassword(e.target.value)}
							placeholder="Enter your password"
						/>
					</div>

					{error && (
						<div className="bg-red-50 border border-red-200 rounded-md p-3">
							<p className="text-sm text-red-600">{error}</p>
						</div>
					)}

					<Button
						type="submit"
						disabled={isLoading}
						className="w-full flex justify-center"
						size="lg">
						{isLoading ? <LoadingSpinner size="sm" className="mr-2" /> : null}
						{isLoading ? "Signing in..." : "Sign in"}
					</Button>
				</form>
			</div>
		</div>
	);
}
