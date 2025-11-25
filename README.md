# Admin Dashboard with User and Project Management

A modern, interactive admin dashboard built with Next.js, TypeScript, and Tailwind CSS. Features include user management, project management, authentication system, and responsive design with Material-UI components integration.

## Reference

- **Official Documentation**: [Next.js Documentation](https://nextjs.org/docs)
- **CSS Framework**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [Material-UI](https://mui.com/)
- **TypeScript**: [TypeScript Handbook](https://www.typescriptlang.org/docs/)
- **React Context**: [React Context API](https://react.dev/reference/react/useContext)


## Features
- **User Management**: Complete CRUD operations for user data with inline editing
- **Project Management**: Create, edit, delete, and organize projects with status tracking
- **Authentication System**: Secure login/logout with protected routes
- **Dashboard Analytics**: Real-time statistics and overview cards

## Advance Feature Tasks
- **Protected Routes**: Automatic redirection based on authentication status
- **Inline Editing**: Edit user and project data directly in tables
- **Search & Filter**: Real-time search across users and projects
- **Data Persistence**: Mock data storage with localStorage integration

### Technical Features
**TypeScript**: Full type safety throughout the application
**Context API**: Centralized state management for auth and data
**Custom Hooks**: useAuthGuard, useModal, useConfirmation hooks
**Modern UI**: Clean design with Tailwind CSS and Material-UI

### Common Technical Features
**Framework**: Next.js 14 (App Router)
**Language**: TypeScript
**Styling**: Tailwind CSS with Material-UI components
**State Management**: React Context API
**Storage**: localStorage for authentication and data persistence

### Custom Hooks
- **useModal**: State management for modal dialogs
- **useConfirmation**: Confirmation dialog state handling
- **useInlineEdit**: Inline editing functionality

**Install dependencies**
```bash
npm install
```
**Run the development server**
```bash
npm run dev
```
**Open browser**
Navigate to http://localhost:3000 to see the result.

## Usage

### Authentication
1. Navigate to the login page at /login
2. Use demo credentials: admin / password123
3. Successfully logged-in users are redirected to dashboard
4. Protected routes automatically redirect to login if not authenticated


### Navigation & Layout
1. **Sidebar Navigation**: Easy access to all sections
2. **Responsive Design**: Optimized for desktop and mobile devices
3. **User Profile**: Access logout and user information from header


## Testing with build

**Production Build**
```bash
npm run build
```
