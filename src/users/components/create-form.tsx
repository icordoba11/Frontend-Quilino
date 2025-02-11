import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import FormProvider from '../../shared/components/form/form-provider';
import RHFTextField from '../../shared/components/form/rhf-text-field';
import { User } from '../types/types';
import Typography from '@mui/material/Typography';
import Iconify from '../../shared/components/iconify/iconify';


type UserNewEditFormProps = {
    onSubmit: (values: any) => void;
    isLoading?: boolean;
};

export default function UserCreateForm({ onSubmit, isLoading }: UserNewEditFormProps) {
    const methods = useForm<User>({
        defaultValues: {
            nombreUsuario: "",
            email: "",
            password: "",
        },
        mode: "onChange",
    });

    const { handleSubmit, formState: { isValid }, watch } = methods;

    const password = watch('password');


    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid size={10}>
                    <Card sx={{ p: 8, boxShadow: 20, borderRadius: 5 }}>
                        <Stack direction="row" spacing={5} sx={{ width: '100%', alignItems: 'center', pb: 5 }}>
                            <Iconify icon="solar:user-plus-rounded-outline" width={35} />
                            <Typography variant='h5'>
                                {`Creando usuario `}
                            </Typography>
                        </Stack>

                        <Box
                            rowGap={3}
                            columnGap={2}
                            display='grid'
                            gridTemplateColumns={{
                                xs: 'repeat(1, 1fr)',
                                sm: 'repeat(2, 1fr)',
                            }}
                        >
                            <RHFTextField name='nombreUsuario' label='Nombre de usuario' required />
                            <RHFTextField
                                name='email'
                                label='Email'
                                required
                                rules={{
                                    required: 'El email es obligatorio',
                                    pattern: {
                                        value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        message: 'Introduce un email válido',
                                    },
                                }}
                            />
                            <RHFTextField
                                name='password'
                                label='Contraseña'
                                required
                                rules={{
                                    required: 'La contraseña es obligatoria',
                                    minLength: {
                                        value: 8,
                                        message: 'La contraseña debe tener al menos 8 caracteres',
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'La contraseña no puede tener más de 20 caracteres',
                                    },
                                }}
                            />
                            <RHFTextField
                                name='repeatPassword'
                                label='Repita la contraseña'
                                required
                                rules={{
                                    required: 'La contraseña es obligatoria',
                                    validate: (value) =>
                                        value === password || 'Las contraseñas no coinciden',
                                    minLength: {
                                        value: 8,
                                        message: 'La contraseña debe tener al menos 8 caracteres',
                                    },
                                    maxLength: {
                                        value: 20,
                                        message: 'La contraseña no puede tener más de 20 caracteres',
                                    },
                                }}
                            />
                        </Box>

                        <Stack alignItems='flex-end' sx={{ mt: 3 }}>
                            <LoadingButton
                                type='submit'
                                variant='contained'
                                loading={isLoading}
                            >
                                Crear usuario
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
