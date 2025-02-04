import React, { ReactNode } from 'react';
import { Box, useTheme } from '@mui/material';

interface GlobalScrollbarProps {
  children: ReactNode;
}

const GlobalScrollbar: React.FC<GlobalScrollbarProps> = ({ children }) => {
  const theme = useTheme();

  return (
    <>
      <style>
        {`
          ::-webkit-scrollbar {
            width: 10px;
          }

          ::-webkit-scrollbar-track {
            background: ${theme.palette.background.default}; /* Fondo del track */
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb {
            background: ${theme.palette.primary.main}; /* Color del thumb */
            border-radius: 10px;
          }

          ::-webkit-scrollbar-thumb:hover {
            background: ${theme.palette.primary.dark}; /* Color al pasar el ratón */
          }
        `}
      </style>
      <Box
        sx={{
          height: '100vh',
          overflow: 'auto',
          backgroundColor: theme.palette.background.paper,
          width: '100%'
        }}
      >
        {children}
      </Box>
    </>
  );
};

export default GlobalScrollbar;
