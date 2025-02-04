import { forwardRef } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';

import Box from '@mui/material/Box';
import { SxProps, Theme } from '@mui/system';

interface IconifyProps {
  icon: IconifyIcon | string;
  width?: number;
  sx?: SxProps<Theme>;
  className?: string;
}

const Iconify = forwardRef<SVGSVGElement, IconifyProps>(
  ({ icon, width = 20, sx, ...other }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className='component-iconify'
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  ),
);

export default Iconify;
