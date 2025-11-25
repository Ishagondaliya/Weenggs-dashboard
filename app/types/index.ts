export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface Project {
  id: number;
  name: string;
  description: string;
  status: 'active' | 'inactive' | 'completed' | 'on-hold';
  createdAt: string;
  updatedAt: string;
}

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  isAuthenticated: boolean;
}

export interface DashboardStats {
  totalUsers: number;
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
}