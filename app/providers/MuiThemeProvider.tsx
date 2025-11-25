"use client";

import React from "react";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";

// Theme configuration
const theme = createTheme({
	palette: {
		primary: {
			main: "#3b82f6", 
		},
		error: {
			main: "#ef4444", 
		},
		warning: {
			main: "#f59e0b",
		},
	},
	typography: {
		fontFamily: "var(--font-geist-sans), sans-serif",
	},
	components: {
		MuiDialog: {
			styleOverrides: {
				paper: {
					borderRadius: 8,
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					textTransform: "none",
					borderRadius: 6,
				},
			},
		},
	},
});

interface MuiThemeProviderProps {
	children: React.ReactNode;
}

export const MuiThemeProvider = React.memo<MuiThemeProviderProps>(
	function MuiThemeProvider({ children }) {
		return (
			<ThemeProvider theme={theme}>
				<CssBaseline />
				{children}
			</ThemeProvider>
		);
	}
);
