
import React, { useState, useEffect, ReactNode } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import SplashScreenBalls from './components/newton-cradle-loader';


interface SplashScreenProps extends BoxProps {
    sx?: object;
    children?: ReactNode;
}

const SplashScreen: React.FC<SplashScreenProps> = ({ sx, ...other }) => {
    const [mounted, setMounted] = useState<boolean>(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return null;
    }

    return (
        <Box
            sx={{
                right: 0,
                width: 1,
                bottom: 0,
                height: 1,
                zIndex: 9998,
                display: 'flex',
                position: 'absolute',
                alignItems: 'center',
                justifyContent: 'center',
                bgcolor: 'background.default',
                ...sx,
            }}
            {...other}
        >
            <Box
                sx={{
                    color: (theme) => theme.palette.primary.main,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <SplashScreenBalls />
            </Box>
        </Box>
    );
};

export default SplashScreen;
