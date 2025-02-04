import React from 'react';
import Box from '@mui/material/Box';
import { useBoolean } from '../../hooks/use-boolean';
import Header from '../components/header';
import Main from '../components/main';
import NavVertical from '../components/nav-vertical';
import GlobalScrollbar from '../../shared/components/scrollbar/scrollbar';

export default function DashboardLayout({ children }: React.PropsWithChildren) {
    const nav = useBoolean();


    const renderNavVertical = <NavVertical />;

    return (
        <>
            <Header onOpenNav={nav.onTrue} />
            <Box sx={{ minHeight: 1, display: 'flex', flexDirection: { xs: 'column', lg: 'row' } }}>

                {renderNavVertical}
                <GlobalScrollbar>
                    <Main>
                        {children}
                    </Main>
                </GlobalScrollbar>
            </Box>
        </>
    );
}
