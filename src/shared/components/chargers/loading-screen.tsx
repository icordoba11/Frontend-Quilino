
import React, { useState, useEffect, ReactNode } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';

interface LoadingScreenProps extends BoxProps {
    sx?: object;
    children?: ReactNode;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ sx, ...other }) => {
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
                <CircularProgress />
            </Box>
        </Box>
    );
};

export default LoadingScreen;
