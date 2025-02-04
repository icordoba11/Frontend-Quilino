import { PropsWithChildren, useRef } from 'react';
import { closeSnackbar, SnackbarProvider as NotistackProvider } from 'notistack';
import IconButton from '@mui/material/IconButton';
import Iconify from '../iconify/iconify';
import { StyledIcon, StyledNotistack } from './snack-style/snack-style';

export default function SnackbarProvider({ children }: PropsWithChildren) {

    const notistackRef = useRef(null);

    return (
        <NotistackProvider
            ref={notistackRef}
            maxSnack={5}
            preventDuplicate
            autoHideDuration={3000}
            variant="success"
            anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            iconVariant={{
                info: (
                    <StyledIcon color="info">
                        <Iconify icon="eva:info-fill" width={24} />
                    </StyledIcon>
                ),
                success: (
                    <StyledIcon color="success">
                        <Iconify icon="eva:checkmark-circle-2-fill" width={24} />
                    </StyledIcon>
                ),
                warning: (
                    <StyledIcon color="warning">
                        <Iconify icon="eva:alert-triangle-fill" width={24} />
                    </StyledIcon>
                ),
                error: (
                    <StyledIcon color="error">
                        <Iconify icon="solar:danger-bold" width={24} />
                    </StyledIcon>
                ),
            }}
            Components={{
                default: StyledNotistack,
                info: StyledNotistack,
                success: StyledNotistack,
                warning: StyledNotistack,
                error: StyledNotistack,
            }}
            // with close as default
            action={(snackbarId) => (
                <IconButton size="small" onClick={() => closeSnackbar(snackbarId)} sx={{ p: 0.5 }}>
                    <Iconify width={16} icon="mingcute:close-line" />
                </IconButton>
            )}
        >
            {children}
        </NotistackProvider>
    );
}
