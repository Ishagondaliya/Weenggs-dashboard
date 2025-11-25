// Project status constants
export const PROJECT_STATUS = {
	ACTIVE: "active",
	INACTIVE: "inactive", 
	COMPLETED: "completed",
	ON_HOLD: "on-hold",
} as const;

export const PROJECT_STATUS_OPTIONS = [
	{ value: PROJECT_STATUS.ACTIVE, label: "Active" },
	{ value: PROJECT_STATUS.INACTIVE, label: "Inactive" },
	{ value: PROJECT_STATUS.COMPLETED, label: "Completed" },
	{ value: PROJECT_STATUS.ON_HOLD, label: "On Hold" },
];

// Project status colors
export const PROJECT_STATUS_COLORS = {
	[PROJECT_STATUS.ACTIVE]: "bg-green-100 text-green-800",
	[PROJECT_STATUS.INACTIVE]: "bg-gray-100 text-gray-800",
	[PROJECT_STATUS.COMPLETED]: "bg-blue-100 text-blue-800",
	[PROJECT_STATUS.ON_HOLD]: "bg-yellow-100 text-yellow-800",
} as const;

// API endpoints
export const API_ENDPOINTS = {
	USERS: "https://jsonplaceholder.typicode.com/users",
} as const;

// Local storage keys
export const STORAGE_KEYS = {
	PROJECTS: "projects",
} as const;

// Dialog variants
export const DIALOG_VARIANTS = {
	DANGER: "danger",
	WARNING: "warning", 
	INFO: "info",
} as const;

// Component sizes
export const COMPONENT_SIZES = {
	SM: "sm",
	MD: "md", 
	LG: "lg",
	XL: "xl",
} as const;