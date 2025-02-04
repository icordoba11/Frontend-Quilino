import React from "react";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { loaderStyles, barStyles, keyframes } from "./components/loading-button-styles";

interface LoadingButtonProps {
  isLoading: boolean;
  onClick: () => void;
  children: React.ReactNode;
  sx?: object;
}

const LoadingButton: React.FC<LoadingButtonProps> = ({
  isLoading,
  onClick,
  children,
  sx = {},
}) => {
  return (
    <Box sx={{ position: "relative", width: '100%' }}>
      {isLoading ? (
        <Box sx={{ ...loaderStyles, ...keyframes, display: 'flex', justifyContent: 'flex-end', margin: 'auto' }}>
          {Array.from({ length: 12 }).map((_, index) => (
            <Box key={index} sx={barStyles(index * 30, `-${1.1 - index * 0.1}s`)} />
          ))}
        </Box>
      ) : (
        <Box display="flex" justifyContent="flex-end" >
          <Button
            variant="contained"
            color="primary"
            onClick={onClick}
            sx={sx}
            style={{ marginRight: '8px' }}
          >
            {children}
          </Button>

        </Box>
      )}
    </Box>
  );
};

export default LoadingButton;
