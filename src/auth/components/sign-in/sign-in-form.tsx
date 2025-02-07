import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import RHFTextField from '../../../shared/components/form/rhf-text-field';
import FormProvider from '../../../shared/components/form/form-provider';
import { useAuth } from '../auth-context';
import LoadingButton from '../../../shared/components/chargers/loading-button';
import { useSnackbar } from 'notistack';
import { useMutation } from '@tanstack/react-query';
import { LoginData } from '../../types/types';
import usersService from '../../services/users';



const SignInForm: React.FC = () => {

  const methods = useForm<LoginData>({
    defaultValues: {
      NombreUsuario: '',
      Contrasena: '',
    },
  });

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, } = methods;

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      return usersService.login({
        NombreUsuario: data.NombreUsuario.trim(),
        Contrasena: data.Contrasena,
      });
    },
    onSuccess: (data) => {
      console.log('success');
    },
    onError: (error) => {
      console.error('Error al hacer login:', error);
    },
  });


  const onSubmit = handleSubmit(async (values: LoginData) => {
    setLoading(true);
    try {
      const responde = await mutation.mutateAsync(values);
      login(responde)
    } catch (error) {
      enqueueSnackbar("Credenciales incorrectas", { variant: 'error' });
    } finally {
      setLoading(false);
    }
  });


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box sx={{ padding: '20px' }}>
        <RHFTextField
          name="NombreUsuario"
          type="text"
          label="Nombre de usuario"
          rules={{
            required: 'El Nombre de usuario es obligatorio',

          }}
          helperText="Introduce tu email"

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
          }}
          helperText="Introduce tu contraseña"

        />
        <LoadingButton
          isLoading={loading}
          onClick={onSubmit}
          sx={{
            padding: '0.8rem',
            width: '100%',
            marginTop: '1rem',
          }}
        >
          Iniciar Sesión
        </LoadingButton>


      </Box>
    </FormProvider>
  );
};

export default SignInForm;
