import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import RHFTextField from '../../../shared/components/form/rhf-text-field';
import FormProvider from '../../../shared/components/form/form-provider';
import { useAuth } from '../auth-context';
import LoadingButton from '../../../shared/components/chargers/loading-button';
import { useSnackbar } from 'notistack';

interface User {
  email: string;
  password: string;
}

const SignInForm: React.FC = () => {

  const methods = useForm<User>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();
  const { handleSubmit, } = methods;


  const onSubmit = handleSubmit(async (values) => {
    setLoading(true);
    try {
      await login({
        email: values.email,
        password: values.password,
      });
    } catch (error) {
      enqueueSnackbar("Credenciales incorrectas", { variant: 'error' })
    } finally {
      setLoading(false);
    }
  });


  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      <Box sx={{ padding: '20px' }}>
        <RHFTextField
          name="email"
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

        />

        <RHFTextField
          name="password"
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
