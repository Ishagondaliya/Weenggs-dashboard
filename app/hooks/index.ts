import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

// Custom hook for route protection
export function useAuthGuard() {
	const { user, isLoading } = useAuth();
	const router = useRouter();
	const pathname = usePathname();
	
	// Define public routes that don't require authentication
	const publicRoutes = useMemo(() => ["/", "/login"], []);
	
	useEffect(() => {
		// Skip redirect if still loading authentication state
		if (isLoading) return;
		
		const isPublicRoute = publicRoutes.includes(pathname);
		
		// If user is not authenticated and trying to access a protected route
		if (!user && !isPublicRoute) {
			router.push("/login");
		}
		
		// If user is authenticated and on login page, redirect to dashboard
		if (user && pathname === "/login") {
			router.push("/dashboard");
		}
	}, [user, isLoading, pathname, router, publicRoutes]);
	
	// Return whether the route should be rendered
	return {
		isAuthenticated: !!user,
		isLoading,
		shouldRender: isLoading || !!user || publicRoutes.includes(pathname),
	};
}

// Custom hook for modal state management
export function useModal(initialState = false) {
	const [isOpen, setIsOpen] = useState(initialState);

	const open = useCallback(() => setIsOpen(true), []);
	const close = useCallback(() => setIsOpen(false), []);
	const toggle = useCallback(() => setIsOpen(prev => !prev), []);

	return useMemo(() => ({
		isOpen,
		open,
		close,
		toggle,
	}), [isOpen, open, close, toggle]);
}

// Custom hook for confirmation dialog state
interface ConfirmationState<T = unknown> {
	isOpen: boolean;
	data: T | null;
}

export function useConfirmation<T = unknown>() {
	const [state, setState] = useState<ConfirmationState<T>>({
		isOpen: false,
		data: null,
	});

	const confirm = useCallback((data: T) => {
		setState({ isOpen: true, data });
	}, []);

	const cancel = useCallback(() => {
		setState({ isOpen: false, data: null });
	}, []);

	const proceed = useCallback((callback?: (data: T) => void) => {
		if (state.data && callback) {
			callback(state.data);
		}
		cancel();
	}, [state.data, cancel]);

	return useMemo(() => ({
		isOpen: state.isOpen,
		data: state.data,
		confirm,
		cancel,
		proceed,
	}), [state.isOpen, state.data, confirm, cancel, proceed]);
}

// Custom hook for inline editing state
export function useInlineEdit<T = unknown>(onSave?: (id: number, data: T) => void) {
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editData, setEditData] = useState<T | null>(null);

	const startEdit = useCallback((id: number, initialData: T) => {
		setEditingId(id);
		setEditData(initialData);
	}, []);

	const cancelEdit = useCallback(() => {
		setEditingId(null);
		setEditData(null);
	}, []);

	const saveEdit = useCallback(() => {
		if (editingId !== null && editData && onSave) {
			onSave(editingId, editData);
		}
		cancelEdit();
	}, [editingId, editData, onSave, cancelEdit]);

	const updateEditData = useCallback((data: Partial<T>) => {
		setEditData(prev => prev ? { ...prev, ...data } : null);
	}, []);

	return useMemo(() => ({
		editingId,
		editData,
		isEditing: editingId !== null,
		startEdit,
		cancelEdit,
		saveEdit,
		updateEditData,
	}), [editingId, editData, startEdit, cancelEdit, saveEdit, updateEditData]);
}