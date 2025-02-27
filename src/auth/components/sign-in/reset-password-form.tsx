import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, IconButton } from '@mui/material';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';
import RHFTextField from '../../../shared/components/form/rhf-text-field';
import loginService from '../../services/login';
import FormProvider from '../../../shared/components/form/form-provider';
import CloseIcon from '@mui/icons-material/Close';

interface ResetPasswordProps {
    open: boolean;
    onClose: () => void;
}

interface FormData {
    resetEmail: string;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({ open, onClose }) => {
    const { enqueueSnackbar } = useSnackbar();
    const [loading, setLoading] = React.useState(false);

    const methods = useForm<FormData>({
        defaultValues: { resetEmail: '' },
        mode: 'onChange',
    });

    const { handleSubmit, formState: { errors }, reset } = methods;

    const { mutate } = useMutation({
        mutationFn: (data: FormData) => loginService.passwordRecoverEmail(data.resetEmail),
        onSuccess: (data) => {
            enqueueSnackbar('Email enviado, revisa tu casilla de email', { variant: 'success' });
            setLoading(false);
            localStorage.setItem('currentUser', data.id)
            reset();
            onClose();
        },
        onError: () => {
            enqueueSnackbar('Hubo un error al enviar el email.', { variant: 'error' });
            setLoading(false);
        }
    });

    const handleResetPassword = (data: FormData) => {
        setLoading(true);
        mutate(data);
    };

    return (
        <Dialog open={open} onClose={onClose}
            sx={{
                '& .MuiDialog-paper': {
                    padding: '40px',
                    borderRadius: 5
                }
            }}
        >
            <DialogTitle>Recuperar Contraseña</DialogTitle>
            <FormProvider methods={methods} onSubmit={handleSubmit(handleResetPassword)}>
                <DialogContent>
                    <IconButton
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        onClick={onClose}
                    >
                        <CloseIcon />
                    </IconButton>
                    <RHFTextField
                        error={Boolean(errors.resetEmail)}
                        helperText={errors.resetEmail?.message}
                        autoFocus
                        name="resetEmail"
                        margin="dense"
                        label="Ingresa tu email"
                        type="email"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', mt: 3 }}>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => { onClose(); reset(); }}
                        sx={{ minWidth: '150px' }}
                    >
                        Cancelar
                    </Button>
                    <Stack alignItems="center">
                        <Button
                            sx={{ minWidth: '150px' }}
                            type="submit"
                            variant="contained"
                            loading={loading}
                            color="primary"
                            disabled={loading}
                            startIcon={loading && <CircularProgress size={20} color="inherit" />}
                        >
                            {loading ? 'Cargando...' : 'Enviar'}
                        </Button>
                    </Stack>
                </DialogActions>
            </FormProvider>
        </Dialog>
    );
};

export default ResetPassword;
