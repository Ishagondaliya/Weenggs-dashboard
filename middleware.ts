import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = new Set(["/login"]);

// Define protected routes that require authentication
const protectedRoutes = ["/dashboard", "/users", "/projects"];

function isValidAuthToken(token: string | undefined): boolean {
	if (!token) return false;
	
	try {
		const userData = JSON.parse(token);
		return userData && userData.isAuthenticated === true && userData.id;
	} catch {
		return false;
	}
}

export function middleware(request: NextRequest) {
	const { pathname } = request.nextUrl;
	
	const authToken = request.cookies.get("authToken")?.value;
	const isAuthenticated = isValidAuthToken(authToken);
	
	const isProtectedRoute = protectedRoutes.some(route => 
		pathname.startsWith(route)
	);
	
	if (pathname === "/") {
		if (isAuthenticated) {
			return NextResponse.redirect(new URL("/dashboard", request.url));
		} else {
			return NextResponse.redirect(new URL("/login", request.url));
		}
	}
	
	if (isProtectedRoute && !isAuthenticated) {
		const response = NextResponse.redirect(new URL("/login", request.url));
		response.cookies.delete("authToken");
		return response;
	}
	
	if (publicRoutes.has(pathname) && isAuthenticated) {
		return NextResponse.redirect(new URL("/dashboard", request.url));
	}
	
	return NextResponse.next();
}

export const config = {
	matcher: [
		"/((?!api|_next/static|_next/image|favicon.ico).*)",
	],
};