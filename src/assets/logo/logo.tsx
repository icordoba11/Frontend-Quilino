import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { SxProps, useTheme, Theme } from '@mui/material/styles';

import RouterLink from '../logo/utils/router-link';

interface LogoProps {
    disabledLink?: boolean
    sx?: SxProps<Theme>
    imgSrc?: string;
}

const Logo = forwardRef<HTMLDivElement, LogoProps>(({ disabledLink = false, sx, imgSrc, ...other }, ref) => {
  

    const logo = (
        <Box
            ref={ref}
            component="div"
            sx={{
                width: 200,
                height: 200,
                display: 'inline-flex',
                ...sx,
            }}
            {...other}
        >
            <img src='https://res.cloudinary.com/dba3tewro/image/upload/v1736467187/logo_rc82ay.svg' alt="Logo" style={{ width: '100%', height: '100%', }} />
        </Box>
    );

    if (disabledLink) {
        return logo;
    }

    return (
        <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
            {logo}
        </Link>
    );
});

export default Logo;
