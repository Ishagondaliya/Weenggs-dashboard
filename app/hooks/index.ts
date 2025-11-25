import { useState, useCallback, useMemo, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuth } from "../context/AuthContext";

	// Custom hook for route protection (now works with middleware)
	export function useAuthGuard() {
		const { user, isLoading, isLoggingOut } = useAuth();
		const router = useRouter();
		const pathname = usePathname();
		
		const publicRoutes = useMemo(() => new Set(["/login"]), []);
		
		useEffect(() => {
			if (isLoading || isLoggingOut) return;
			
			// Middleware handles most redirects, this is for client-side navigation
			const isPublicRoute = publicRoutes.has(pathname);
			
			// Only redirect if middleware didn't catch it (rare edge cases)
			if (!user && !isPublicRoute && pathname !== "/") {
				// Use replace to avoid back button issues
				router.replace("/login");
			}
			
			if (user && pathname === "/login") {
				router.replace("/dashboard");
			}
		}, [user, isLoading, isLoggingOut, pathname, router, publicRoutes]);
		
		return {
			isAuthenticated: !!user,
			isLoading: isLoading || isLoggingOut,
			shouldRender: (isLoading || isLoggingOut) || !!user || publicRoutes.has(pathname),
		};
	}export function useModal(initialState = false) {
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