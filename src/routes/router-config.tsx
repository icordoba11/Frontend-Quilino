import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import SplashScreen from '../shared/components/chargers/splash-screen';
import LoadingScreen from '../shared/components/chargers/loading-screen';
import AuthGuard from './guards/auth-guard';
import GuestGuard from './guards/guest-guard';
import AuthLayout from '../shared/components/layouts/auth-basic-layout';
import DashboardLayout from '../dashboard/layouts/dashboard-layout';
import RoleGuard from './guards/role-guard';

//Authentication
const Auth = lazy(() => import('../auth/pages/auth'));

//Employees
const EmployeeList = lazy(() => import('../employment/pages/list'));
//Dashboard
const Dashboard = lazy(() => import('../dashboard/pages/dashboard'));
//Profile
const Profile = lazy(() => import('../profile/pages/profile'))
//Users
const UserList = lazy(() => import('../users/pages/list'));
const UserEdit = lazy(() => import('../users/pages/edit'));
const UserCreate = lazy(() => import('../users/pages/new'))
//Upload Files
const FileUpload = lazy(() => import('../upload/page/upload-files'));

export default function MyRouter() {
    return useRoutes([
        {
            path: '/',
            element: <Navigate to='/dashboard' replace />,
        },
        {
            path: '/auth',
            element: (
                <Suspense fallback={<SplashScreen />}>
                    <Outlet />
                </Suspense>
            ),
            children: [
                {
                    path: 'sign-in',
                    element: (
                        <GuestGuard>
                            <AuthLayout >
                                <Auth />
                            </AuthLayout>
                        </GuestGuard>
                    )
                },
                {
                    element: (
                        <Outlet />
                    ),
                    children: [
                        { path: 'confirm-sign-in', element: <h1>Confirm Sign In</h1> },
                        { path: 'reset-password', element: <h1>Reset Password</h1> },
                        { path: 'forgot-password', element: <h1>Forgot Password</h1> },
                    ],
                },
            ],
        },
        {
            path: '/',

            element: (
                <AuthGuard>
                    <DashboardLayout>
                        <Suspense fallback={<SplashScreen />}>
                            <Outlet />
                        </Suspense>
                    </DashboardLayout>
                </AuthGuard>
            ),
            children: [
                { path: 'dashboard', element: <Dashboard /> },
                {
                    path: '/empleo',
                    element: (
                        <RoleGuard allowedRoles={['user', 'Administrador']}>
                            <Outlet />
                        </RoleGuard>
                    ),
                    children: [
                        { element: <EmployeeList />, index: true },
                        { path: 'new', element: <h1>Crear Empleo</h1> },
                        { path: 'edit', element: <h1>Editar Empleo</h1> },
                        { path: 'list', element: <EmployeeList /> },
                    ],
                },
                {
                    path: '/historics',
                    element: (
                        <RoleGuard allowedRoles={['user', 'Administrador']}>
                            <Outlet />
                        </RoleGuard>
                    ),
                    children: [
                        { path: ':id/list', element: <h1>historics</h1> },
                    ],
                },
                {
                    path: '/upload-files',
                    element: (
                        <RoleGuard allowedRoles={['user', 'Administrador']}>
                            <Outlet />
                        </RoleGuard>
                    ),
                    children: [
                        { element: <FileUpload />, index: true },
                        { path: 'list', element: <FileUpload /> },

                    ],
                },

                {
                    path: '/profile',
                    element: (
                        <RoleGuard allowedRoles={['user', 'Administrador']}>
                            <Outlet />
                        </RoleGuard>
                    ),
                    children: [
                        { element: <Profile />, index: true },
                        { path: 'edit', element: <Profile /> },
                    ],
                },
                {
                    path: '/users',
                    element: (
                        <RoleGuard allowedRoles={['Administrador', 'user']}>
                            <Outlet />
                        </RoleGuard>
                    ),
                    children: [
                        { element: <UserList />, index: true },
                        { path: 'new', element: <UserCreate /> },
                        { path: 'list', element: <UserList /> },
                        { path: ':id/edit', element: <UserEdit /> },
                    ],
                },
                { path: 'coming-soon', element: <h1>Coming Soon</h1> },
                { path: 'maintenance', element: <h1>Maintenance</h1> },
                { path: '500', element: <h1>Page 500</h1> },
                { path: '404', element: <h1>Page 404</h1> },
                { path: '403', element: <h1>Page 403</h1> },
            ],
        },
        { path: '*', element: <Navigate to='/404' replace /> },
    ]);
}
