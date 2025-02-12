import { useState } from 'react';
import { Card, CardContent, Typography, Box, Grid, Button, CircularProgress } from '@mui/material';
import RHFTextField from '../../shared/components/form/rhf-text-field';
import FormProvider from '../../shared/components/form/form-provider';
import { useForm } from 'react-hook-form';
import LockIcon from '@mui/icons-material/Lock';
import { useMutation } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import userService from '../../users/services/users';
import LoadingButton from '../../shared/components/chargers/loading-button';
import ConfirmDialog from '../../shared/components/confirm-dialog/confirm-dialog';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { yellow } from '@mui/material/colors';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { ChangePassword } from '../../users/types/types';



const ChangePasswordForm = () => {
    const { enqueueSnackbar } = useSnackbar();
    const [open, setOpen] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showRepeatPassword, setShowRepeatPassword] = useState(false);
    const id = sessionStorage.getItem('currentUser');

    const methods = useForm<ChangePassword>({
        defaultValues: {
            newPassword: '',
            repeatNewPassword: '',
        },
    });
    const { handleSubmit, reset } = methods;



    const updateMutation = useMutation({
        mutationFn: ({ id, oldPassword, newPassword }: { id: number; oldPassword: string; newPassword: string; }) =>
            userService.updatePassword(id, oldPassword, newPassword),
        onSuccess: (data) => {
            if (data.isSuccess) {
                enqueueSnackbar('Contraseña cambiada con éxito', { variant: 'success' });
                reset();
                setOpen(false);
            } else if (data) {
                enqueueSnackbar(data.message, { variant: 'error' });
            } else {
                enqueueSnackbar('Error cambiar contraseña, intente nuevamente', { variant: 'error' });
            }

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

        updateMutation.mutate({
            id: Number(id),
            oldPassword: data.oldPassword,
            newPassword: data.newPassword,
        });
    };

    const ConfirmButton = () => {
        const handleConfirm = async () => {
            await handleSubmit(onSubmit)();
        };
        return (
            <Button
                onClick={handleConfirm}
                disabled={updateMutation.isPending}
                sx={{ maxWidth: 200 }}
            >
                {updateMutation.isPending ? <CircularProgress size={24} /> : 'Guardar'}
            </Button>
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
                                name="oldPassword"
                                label="Contraseña anterior"
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
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    ),
                                }}
                            />
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
                                            {showPassword ? <Visibility /> : <VisibilityOff />}
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
                                            {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    ),
                                }}
                            />

                            <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                                <Grid item xs={3}>
                                    <Button
                                        variant="contained"
                                        color="primary"
                                        onClick={() => { setOpen(true); }}
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
                title=""
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
                        <Typography variant="subtitle2" textAlign="center" color="grey" sx={{ mt: 2 }}>
                            ¿Quieres cambiar la contraseña?
                        </Typography>
                    </Box>
                }
                action={<ConfirmButton />}
            />
        </Box>
    );
};

export default ChangePasswordForm;
