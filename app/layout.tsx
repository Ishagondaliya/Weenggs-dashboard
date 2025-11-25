import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "./context/AuthContext";
import { DataProvider } from "./context/DataContext";
import { MuiThemeProvider } from "./providers/MuiThemeProvider";
import "./globals.css";

const geistSans = Geist({
	variable: "--font-geist-sans",
	subsets: ["latin"],
});

const geistMono = Geist_Mono({
	variable: "--font-geist-mono",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Admin Dashboard",
	description: "Admin Dashboard with User and Project Management",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<MuiThemeProvider>
					<AuthProvider>
						<DataProvider>{children}</DataProvider>
					</AuthProvider>
				</MuiThemeProvider>
			</body>
		</html>
	);
}

