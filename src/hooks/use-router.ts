import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';



export function useRouter() {
    const navigate = useNavigate();

    const router = useMemo(
        () => ({
            back: () => navigate(-1),
            forward: () => navigate(1),
            reload: () => window.location.reload(),
            push: (href:any) => navigate(href),
            replace: (href:any) => navigate(href, { replace: true }),
        }),
        [navigate]
    );

    return router;
}
