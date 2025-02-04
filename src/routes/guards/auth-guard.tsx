import { useState, useEffect, useCallback, PropsWithChildren } from 'react';
import { paths } from '../../configs/constants/paths';
import { useAuth } from '../../auth/components/auth-context';

import LoadingScreen from '../../shared/components/chargers/loading-screen';
import { useRouter } from '../../hooks/use-router';

export default function AuthGuard({ children }: PropsWithChildren) {
    const { isLoading } = useAuth();

    return <>{isLoading ? <LoadingScreen /> : <Container> {children}</Container>}</>;
}

function Container({ children }: PropsWithChildren) {
    const router = useRouter();

    const { currentUser } = useAuth();

    const [checked, setChecked] = useState(false);

    const check = useCallback(() => {
        if (currentUser == null) {
            const href = paths.auth.signIn;
            router.replace(href);
        } else {
            setChecked(true);
        }
    }, [currentUser, router]);

    useEffect(() => {
        check();

    }, []);

    if (!checked) {
        return null;
    }

    return <>{children}</>;
}