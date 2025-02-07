import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RHFTextField from '../../../shared/components/form/rhf-text-field';
import FormProvider from '../../../shared/components/form/form-provider';

import usersService from '../../services/users';
import { UserData } from '../../types/types';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from '../../../hooks/use-router';
import { useSnackbar } from 'notistack';

const SignUpForm: React.FC = () => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm<UserData>({
    defaultValues: {
      NombreUsuario: "",
      Email: "",
      Rol: "user",
      Contrasena: "",
    },
  });

  const mutation = useMutation({
    mutationFn: async (user: UserData) => {
      const userData = { ...user, Rol: "Administrador" };
      const response = await usersService.createFirstUser(userData);
      return response;
    },
    onSuccess: () => {
      enqueueSnackbar('Registro Exitoso', { variant: 'success' })
      methods.reset();
      router.replace('/');
      
    },
    onError: (error) => {
      console.error('Error al crear el usuario:', error);
    },
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit((values) => {
    mutation.mutate(values);
  });

  const isLoading = mutation.status === 'pending';

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box sx={{ padding: '0 20px' }}>
        <RHFTextField
          name="NombreUsuario"
          type="text"
          label="Nombre de usuario"
          rules={{
            required: 'El nombre es obligatorio',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres',
            },
          }}
          helperText="Introduce tu usuario"
          sx={{ mb: 1 }}
        />


        <RHFTextField
          name="Email"
          type="email"
          label="Email"
          rules={{
            required: 'El email es obligatorio',
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: 'Introduce un email válido',
            },
          }}
          helperText="Introduce tu email"
          sx={{ mb: 1 }}
        />

        <RHFTextField
          name="Contrasena"
          type="password"
          label="Contraseña"
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
          helperText="Introduce tu contraseña"
          sx={{ mb: 1 }}
        />

        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            marginTop: '1rem',
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Creando usuario...' : 'Registrarse'}
        </Button>
      </Box>
    </FormProvider>
  );
};

export default SignUpForm;
