import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../../auth/components/auth-context';
import { Navigate } from 'react-router-dom';
import userService from '../../users/services/users';
import { useRouter } from '../../hooks/use-router';
import { paths } from '../../configs/constants/paths';
import LoadingScreen from '../../shared/components/chargers/loading-screen';

interface RoleGuardProps {
    children: JSX.Element;
    allowedRoles: string[];  // Roles permitidos para acceder
}

const RoleGuard = ({ children, allowedRoles }: RoleGuardProps) => {
    const { currentUser } = useAuth();
    const router = useRouter();

    const { data: userRole, isLoading, isError, error } = useQuery({
        queryKey: ['userRole', currentUser?.uid],
        queryFn: () => userService.getRoleById(currentUser!.uid),
        enabled: !!currentUser?.uid,
    });

    if (isLoading) {
        return <LoadingScreen />
    }

    if (isError) {
        router.push(paths.page404);
        return null;
    }

    if (userRole && !allowedRoles.includes(userRole)) {
        router.push(paths.page404);
        return null;
    }

    return children;
};

export default RoleGuard;
