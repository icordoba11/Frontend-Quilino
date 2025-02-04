import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useRouter } from '../../hooks/use-router';
import { useAuth } from '../../auth/components/auth-context';
import { paths } from '../../configs/constants/paths';
import SplashScreen from '../../shared/components/chargers/splash-screen';
import { useSearchParams } from '../../hooks/use-search-params';

export default function GuestGuard({ children }: PropsWithChildren) {
    const { isLoading } = useAuth();

    return (
        <>{isLoading ? <SplashScreen /> : <Container> {children}</Container>}</>
    );
}
function Container({ children }: PropsWithChildren) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const returnTo = searchParams.get('returnTo') || paths.main.dashboard;
    const { currentUser } = useAuth();

    const check = useCallback(() => {
        if (currentUser != null) {
            router.replace(returnTo);
        }
    }, [currentUser, returnTo, router]);

    useEffect(() => {
        check();
    }, [check, currentUser]);

    return <>{children}</>;
}
