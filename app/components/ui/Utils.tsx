"use client";

import React from "react";
import {
	Dialog,
	DialogTitle,
	DialogContent,
	DialogContentText,
	DialogActions,
	Button,
} from "@mui/material";
import { cn } from "../../utils/helpers";

// Types
type SpinnerSize = "sm" | "md" | "lg";
type DialogVariant = "danger" | "warning" | "info";

interface LoadingSpinnerProps {
	size?: SpinnerSize;
	className?: string;
}

interface ConfirmDialogProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
	title: string;
	message: string;
	confirmText?: string;
	cancelText?: string;
	variant?: DialogVariant;
}

// Constants
const SPINNER_SIZE_CLASSES: Record<SpinnerSize, string> = {
	sm: "w-4 h-4",
	md: "w-6 h-6",
	lg: "w-8 h-8",
};

const VARIANT_COLORS: Record<DialogVariant, "error" | "warning" | "primary"> = {
	danger: "error",
	warning: "warning",
	info: "primary",
};

// Components
export function LoadingSpinner({
	size = "md",
	className,
}: Readonly<LoadingSpinnerProps>) {
	return (
		<div
			className={cn(
				"animate-spin rounded-full border-2 border-gray-300 border-t-blue-600",
				SPINNER_SIZE_CLASSES[size],
				className ?? ""
			)}
			aria-label="Loading..."
			role="status"
		/>
	);
}

export const ConfirmDialog = React.memo<ConfirmDialogProps>(
	function ConfirmDialog({
		isOpen,
		onClose,
		onConfirm,
		title,
		message,
		confirmText = "Confirm",
		cancelText = "Cancel",
		variant = "danger",
	}) {
		const handleConfirm = React.useCallback(() => {
			onConfirm();
			onClose();
		}, [onConfirm, onClose]);

		return (
			<Dialog
				open={isOpen}
				onClose={onClose}
				aria-labelledby="confirm-dialog-title"
				aria-describedby="confirm-dialog-description"
				maxWidth="sm"
				fullWidth>
				<DialogTitle id="confirm-dialog-title">{title}</DialogTitle>
				<DialogContent>
					<DialogContentText id="confirm-dialog-description">
						{message}
					</DialogContentText>
				</DialogContent>
				<DialogActions sx={{ p: 3, gap: 1 }}>
					<Button onClick={onClose} variant="outlined" color="inherit">
						{cancelText}
					</Button>
					<Button
						onClick={handleConfirm}
						variant="contained"
						color={VARIANT_COLORS[variant]}
						autoFocus>
						{confirmText}
					</Button>
				</DialogActions>
			</Dialog>
		);
	}
);
