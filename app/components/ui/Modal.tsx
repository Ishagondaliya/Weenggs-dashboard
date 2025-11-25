"use client";

import React from "react";
import { Modal as MuiModal, Box, Typography, IconButton } from "@mui/material";
import { Close as CloseIcon } from "@mui/icons-material";

interface ModalProps {
	isOpen: boolean;
	onClose: () => void;
	title: string;
	children: React.ReactNode;
	size?: "sm" | "md" | "lg" | "xl";
}

export function Modal({
	isOpen,
	onClose,
	title,
	children,
	size = "md",
}: ModalProps) {
	const sizeStyles = {
		sm: { width: 400 },
		md: { width: 600 },
		lg: { width: 800 },
		xl: { width: 1000 },
	};

	const modalStyle = {
		position: "absolute" as const,
		top: "50%",
		left: "50%",
		transform: "translate(-50%, -50%)",
		bgcolor: "background.paper",
		border: "none",
		borderRadius: 2,
		boxShadow: 24,
		p: 0,
		maxHeight: "90vh",
		overflow: "auto",
		...sizeStyles[size],
	};

	return (
		<MuiModal
			open={isOpen}
			onClose={onClose}
			aria-labelledby="modal-title"
			aria-describedby="modal-description">
			<Box sx={modalStyle}>
				{/* Modal Header */}
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						alignItems: "center",
						p: 3,
						borderBottom: "1px solid #e5e7eb",
					}}>
					<Typography
						id="modal-title"
						variant="h6"
						component="h2"
						sx={{ fontWeight: 600, color: "#111827" }}>
						{title}
					</Typography>
					<IconButton
						onClick={onClose}
						size="small"
						sx={{
							color: "#9ca3af",
							"&:hover": {
								color: "#4b5563",
								bgcolor: "#f3f4f6",
							},
						}}>
						<CloseIcon />
					</IconButton>
				</Box>

				{/* Modal Content */}
				<Box sx={{ p: 3 }}>{children}</Box>
			</Box>
		</MuiModal>
	);
}
