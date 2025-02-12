import { useAuth } from '../../auth/components/auth-context';
import { Navigate } from 'react-router-dom';
import { paths } from '../../configs/constants/paths';
import LoadingScreen from '../../shared/components/chargers/loading-screen';

interface RoleGuardProps {
    children: JSX.Element;
    allowedRoles: string[];
}

const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
    const { isLoading, userRole } = useAuth();
    if (isLoading) {
        return <LoadingScreen />;
    }

    if (userRole && !allowedRoles.includes(userRole)) {
        return <Navigate to={paths.withoutPermission} />;
    }

    return children;
};

export default RoleGuard;
