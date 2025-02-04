import React from 'react';
import { Box } from '@mui/material';

interface MainProps {
  children: React.ReactNode;
}

export default function Main({ children }: MainProps) {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        backgroundColor: '#f5f5f5',
        height: '100vh',
      }}
    >
      {children}
    </Box>
  );
}
