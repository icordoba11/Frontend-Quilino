import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';
import SplashScreen from '../shared/components/chargers/splash-screen';
import LoadingScreen from '../shared/components/chargers/loading-screen';
import AuthGuard from './guards/auth-guard';
import GuestGuard from './guards/guest-guard';
import AuthLayout from '../shared/components/layouts/auth-basic-layout';
import DashboardLayout from '../dashboard/layouts/dashboard-layout';
import RoleGuard from './guards/role-guard';


const Auth = lazy(() => import('../auth/pages/auth'));
const EmployeeList = lazy(() => import('../employment/pages/list'));
const Dashboard = lazy(() => import('../dashboard/pages/dashboard'));
const Profile = lazy(() => import('../profile/pages/profile'))
const UserList = lazy(() => import('../users/pages/list'));
const UserEdit = lazy(() => import('../users/pages/edit'));

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
                        <RoleGuard allowedRoles={['admin']}>
                            <EmployeeList />
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
                    path: '/multas',
                    element: (
                        <RoleGuard allowedRoles={['user', 'admin']}>
                            <h1>Lista de Multas</h1>
                        </RoleGuard>
                    ),
                    children: [
                        { element: <h1>Lista de Multas</h1>, index: true },
                        { path: 'new', element: <h1>Crear Multa</h1> },
                        { path: 'edit', element: <h1>Editar Multa</h1> },
                        { path: 'list', element: <h1>Lista de Multas</h1> },
                    ],
                },
                {
                    path: '/recoleccion',
                    element: (
                        <RoleGuard allowedRoles={['user', 'admin']}>
                            <h1>Lista de Recolección</h1>
                        </RoleGuard>
                    ),
                    children: [
                        { element: <h1>Lista de Recolección</h1>, index: true },
                        { path: 'new', element: <h1>Crear Recolección</h1> },
                        { path: 'edit', element: <h1>Editar Recolección</h1> },
                        { path: 'list', element: <h1>Lista de Recolección</h1> },
                    ],
                },
                {
                    path: '/almacenamiento',
                    element: (
                        <RoleGuard allowedRoles={['user', 'admin']}>
                            <h1>Lista de Almacenamiento</h1>
                        </RoleGuard>
                    ),
                    children: [
                        { element: <h1>Lista de Almacenamiento</h1>, index: true },
                        { path: 'new', element: <h1>Crear Almacenamiento</h1> },
                        { path: 'edit', element: <h1>Editar Almacenamiento</h1> },
                        { path: 'list', element: <h1>Lista de Almacenamiento</h1> },
                    ],
                },
                {
                    path: '/geoEstadistica',
                    element: (
                        <RoleGuard allowedRoles={['user', 'admin']}>
                            <h1>Lista de GeoEstadística</h1>
                        </RoleGuard>
                    ),
                    children: [
                        { element: <h1>Lista de GeoEstadística</h1>, index: true },
                        { path: 'new', element: <h1>Crear GeoEstadística</h1> },
                        { path: 'edit', element: <h1>Editar GeoEstadística</h1> },
                        { path: 'list', element: <h1>Lista de GeoEstadística</h1> },
                    ],
                },
                {
                    path: '/profile',
                    element: (
                        <RoleGuard allowedRoles={['user', 'admin']}>
                            <Profile />
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
                        <RoleGuard allowedRoles={['admin']}>
                            <UserList />
                        </RoleGuard>
                    ),
                    children: [
                        { element: <UserList />, index: true },
                        { path: ':id/edit', element: <UserEdit /> },
                        { path: 'list', element: <UserList /> },
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
