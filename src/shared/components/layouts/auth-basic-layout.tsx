
import Stack from '@mui/material/Stack';


import { useResponsive } from '../../../hooks/use-responsive';

import Logo from '../../../assets/logo/logo';
import { PropsWithChildren } from 'react';

type AuthClassicLayout = {
    image?: string;
    title?: string;
} & PropsWithChildren;

export default function AuthLayout({ children }: AuthClassicLayout) {


    const renderLogo = (
        <Logo
            sx={{
                zIndex: 9,
                position: 'absolute',
                m: { xs: 0, md: 0 },
            }}
        />
    );

    const renderContent = (
        <Stack
            sx={{
                width: 1,
                display: 'flex',
                maxWidth: 480,
                px: { xs: 2, md: 0 },
                pt: { xs: 15, md: 0 },
                pb: { xs: 15, md: 0 },
                ml: 'auto',
                alignItems: 'flex-end',
            }}
        >
            {children}
        </Stack>
    );

    return (
        <Stack
            component='main'
            direction='row'
            sx={{
                minHeight: '100vh',
                backgroundImage: `
                    linear-gradient(to right, rgba(255, 255, 255, 0) 10%, rgb(167, 166, 196)),
                    url('/fondo.svg')
                `,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            {renderLogo}

            {renderContent}
        </Stack>
    );
}
