import { useState, useEffect, useCallback, PropsWithChildren } from 'react';
import { paths } from '../../configs/constants/paths';
import LoadingScreen from '../../shared/components/chargers/loading-screen';
import { useRouter } from '../../hooks/use-router';
import { useAuth } from '../../auth/components/auth-context';

export default function AuthGuard({ children }: PropsWithChildren) {
    const { isLoading, isAuthenticated } = useAuth(); 
    const [checked, setChecked] = useState(false);
    const router = useRouter();

    const check = useCallback(() => {
        if (!isAuthenticated) {
            router.replace(paths.auth.signIn);
        } else {
            setChecked(true);
        }
    }, [isAuthenticated, router]);

    useEffect(() => {
        check();
    }, [check]);

    if (isLoading || !checked) {
        return <LoadingScreen />;
    }

    return <>{children}</>;
}
