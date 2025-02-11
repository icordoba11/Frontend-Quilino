import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useSnackbar } from 'notistack';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import lock from '../../assets/images/candado.webp';
import loginService from '../services/login';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useSearchParams } from '../../hooks/use-search-params';
import RHFTextField from '../../shared/components/form/rhf-text-field';
import FormProvider from '../../shared/components/form/form-provider';
import Button from '@mui/material/Button';


interface FormValues {
    newPassword: string;
    confirmPassword: string;
}


export default function ForgotPassword() {
    const { enqueueSnackbar } = useSnackbar();
    const navigate = useNavigate();
    const searchParams = useSearchParams();
    const id = localStorage.getItem('currentUser');

    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const token = searchParams.get("token")?.slice(1);


    const methods = useForm<FormValues>({
        mode: 'onChange',
    });

    const { handleSubmit, formState: { errors, isValid }, watch } = methods;


    const { data } = useQuery({
        queryKey: ['verifyToken'],
        queryFn: () => loginService.verifyToken(token!),
        retry: 1,
    });



    const { mutate: resetPassword } = useMutation({
        mutationFn: async (payload: { id: number, newPassword: string, token: string }) => {
            return loginService.resetPassword(Number(id), payload.newPassword, payload.token);
        },
        onSuccess: (data) => {
            if (data.data.isSuccess) {
                enqueueSnackbar("Contraseña cambiada con éxito", { variant: "success" });
                localStorage.removeItem("currentUser");
                navigate('/');
            } else if (!data.data.isSuccess) {
                enqueueSnackbar(data.data.message, { variant: "error" });
            } else {
                enqueueSnackbar(data.data.message, { variant: "error" });
            }

            setLoading(false);
        },
        onError: () => {
            enqueueSnackbar("Error al intentar cambiar la contraseña", { variant: "error" });
            setLoading(false);
        },
    });

    const onSubmit = async () => {
        try {
            if (!data.isSuccess) {
                enqueueSnackbar("Token no válido o expirado", { variant: "error" });
                return;
            }
            const newPassword = watch('newPassword');
            const payload = { token: token!, newPassword, id: Number(id) };
            setLoading(true);
            resetPassword(payload);

        } catch (error) {
            console.error(error);
            setLoading(false);
        }
    };

    const handleClickShowPassword = (field: 'newPassword' | 'confirmPassword') => {
        if (field === 'newPassword') {
            setShowNewPassword(!showNewPassword);
        } else if (field === 'confirmPassword') {
            setShowConfirmPassword(!showConfirmPassword);
        }
    };

    return (
        <Box sx={{ height: '100vh' }}>
            <Card
                variant="outlined"
                sx={{
                    padding: 5,
                    boxShadow: 20,
                    borderRadius: 2,
                    height: '100%'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
                    <img src={lock} style={{ width: 100, height: 100 }} alt="candado" />
                </Box>
                <Typography variant="h5" align="center" gutterBottom>
                    Reestablecimiento de Contraseña
                </Typography>
                <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                    <Box
                        component="form"

                        noValidate
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <RHFTextField
                            name="newPassword"
                            label="Nueva contraseña"
                            type={showNewPassword ? 'text' : 'password'}
                            fullWidth
                            required
                            rules={{
                                minLength: {
                                    value: 6,
                                    message: 'La contraseña debe tener al menos 6 caracteres',
                                },
                            }}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword('newPassword')}
                                        edge="end"
                                    >
                                        {showNewPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <RHFTextField
                            name='confirmPassword'
                            label="Repetir nueva contraseña"
                            type={showConfirmPassword ? 'text' : 'password'}
                            rules={{
                                required: 'Este campo es obligatorio',
                                validate: (value) =>
                                    value === watch('newPassword') || 'Las contraseñas no coinciden',
                            }}
                            error={!!errors.confirmPassword}
                            InputProps={{
                                endAdornment: (
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={() => handleClickShowPassword('confirmPassword')}
                                        edge="end"
                                    >
                                        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                ),
                            }}
                        />
                        <Stack direction='column' spacing={3} sx={{ mt: 4 }}>
                            <Button
                                onClick={onSubmit}
                                variant="contained"
                                disabled={!isValid || loading}
                                loading={loading}
                                color="primary"
                            >
                                Cambiar contraseña
                            </Button>

                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => navigate('/')}
                            >
                                Volver al login
                            </Button>
                        </Stack>
                    </Box>
                </FormProvider>
            </Card>
        </Box>
    );
}
