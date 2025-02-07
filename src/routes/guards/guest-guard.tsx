import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useRouter } from '../../hooks/use-router';
import { paths } from '../../configs/constants/paths';
import SplashScreen from '../../shared/components/chargers/splash-screen';
import { useAuth } from '../../auth/components/auth-context';

export default function GuestGuard({ children }: PropsWithChildren) {
    const { isLoading, isAuthenticated } = useAuth(); 
    const router = useRouter();
    const returnTo = new URLSearchParams(window.location.search).get('returnTo') || paths.main.dashboard;

    const check = useCallback(() => {
        if (isAuthenticated) {
            router.replace(returnTo);
        }
    }, [isAuthenticated, returnTo, router]);

    useEffect(() => {
        check();
    }, [check]);

    return (
        <>
            {isLoading ? <SplashScreen /> : <Container>{children}</Container>}
        </>
    );
}

function Container({ children }: PropsWithChildren) {
    return <>{children}</>;
}
