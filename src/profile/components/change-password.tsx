import React, { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, Button } from '@mui/material';
import RHFTextField from '../../shared/components/form/rhf-text-field';
import FormProvider from '../../shared/components/form/form-provider';
import { useForm } from 'react-hook-form';
import LockIcon from '@mui/icons-material/Lock';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import userService from '../../users/services/users';
import LoadingButton from '../../shared/components/chargers/loading-button';
import ConfirmDialog from '../../shared/components/confirm-dialog/confirm-dialog';
import { useAuth } from '../../auth/components/auth-context';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { yellow } from '@mui/material/colors';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

interface ChangePassword {
    newPassword: string;
    repeatNewPassword: string;
}

const ChangePasswordForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const { currentUser } = useAuth();
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);

    const methods = useForm<ChangePassword>({
        defaultValues: { newPassword: '', repeatNewPassword: '', },
    });
    const { handleSubmit } = methods;

    const updateMutation = useMutation({
        mutationFn: ({ id, newPassword }: { id: string; newPassword: string }) =>
            userService.updatePassword(id, newPassword),
        onSuccess: () => {
            enqueueSnackbar('Contraseña cambiada con éxito');
            setOpen(false);
        },
        onError: () => {
            enqueueSnackbar('Error al cambiar la contraseña.', { variant: 'error' });
        },
    });

    const onSubmit = (data: ChangePassword) => {
        if (data.newPassword !== data.repeatNewPassword) {
            enqueueSnackbar('Las contraseñas nuevas no coinciden.', { variant: 'error' });
            return;
        }

        if (!currentUser?.uid) {
            enqueueSnackbar('No se pudo encontrar el usuario.', { variant: 'error' });
            return;
        }

        updateMutation.mutate({
            id: currentUser?.uid,
            newPassword: data.newPassword,
        });
    };

    const ConfirmButton = () => {
        const handleConfirm = async () => {
            await handleSubmit(onSubmit)();
        };
        return (
            <LoadingButton
                onClick={handleConfirm}
                isLoading={updateMutation.isPending}
                sx={{ maxWidth: 200  }}
            >
                Guardar
            </LoadingButton>
        );
    };

    return (
        <Box display="flex" justifyContent="center" alignItems="center" height="100%">
            <Card
                elevation={5}
                sx={{
                    p: 6,
                    width: '100%',
                    maxWidth: 600,
                    background: 'linear-gradient(to bottom,rgb(241, 241, 241),rgb(255, 255, 255))',
                }}
            >
                <Box display="flex" alignItems="center" mb={3} justifyContent="center">
                    <LockIcon sx={{ fontSize: 50, mr: 2 }} />
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            Cambiar Contraseña
                        </Typography>
                        <Typography variant="body2" color="textSecondary">
                            Actualiza tu contraseña con los nuevos datos.
                        </Typography>
                    </Box>
                </Box>

                <CardContent>
                    <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                        <Box>
                            <RHFTextField
                                name="newPassword"
                                label="Nueva Contraseña"
                                type={showPassword ? 'text' : 'password'}
                                margin="normal"
                                variant="outlined"
                                required
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setShowPassword(prev => !prev)}
                                            edge="end"
                                        >
                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />
                            <RHFTextField
                                name="repeatNewPassword"
                                label="Repetir Nueva Contraseña"
                                type={showRepeatPassword ? 'text' : 'password'}
                                margin="normal"
                                variant="outlined"
                                required
                                InputProps={{
                                    endAdornment: (
                                        <IconButton
                                            onClick={() => setShowRepeatPassword(prev => !prev)}
                                            edge="end"
                                        >
                                            {showRepeatPassword ? <VisibilityOff /> : <Visibility />}
                                        </IconButton>
                                    ),
                                }}
                            />

                            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Grid item xs={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => setOpen(true)}
                                    >
                                        Guardar
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>
                    </FormProvider>
                </CardContent>
            </Card>

            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                title="Confirmar Cambio de Contraseña"
                content={
                    <Box>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                            }}
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        <IconButton sx={{ display: 'block', m: 'auto' }}>
                            <WarningAmberIcon sx={{ fontSize: 50, color: yellow[500] }} />
                        </IconButton>
                        <Typography variant="h5" textAlign="center">
                            ¿Estás seguro?
                        </Typography>
                        <Typography variant="subtitle2" textAlign="center" color="grey">
                            ¿Quieres guardar los cambios?
                        </Typography>
                    </Box>
                }
                action={<ConfirmButton />}
            />
        </Box>
    );
};

export default ChangePasswordForm;
