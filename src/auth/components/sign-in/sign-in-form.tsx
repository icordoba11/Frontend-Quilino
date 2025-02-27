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
import Link from '@mui/material/Link';
import ResetPassword from './reset-password-form';
import loginService from '../../services/login';
import { Button } from '@mui/material';


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
  const [openDialog, setOpenDialog] = useState(false);

  const mutation = useMutation({
    mutationFn: async (data: LoginData) => {
      return loginService.login({
        NombreUsuario: data.NombreUsuario.trim(),
        Contrasena: data.Contrasena,
      });
    },
    onError: () => {
      enqueueSnackbar("Error al hacer el login", { variant: 'error' });
    },
  });


  const onSubmit = handleSubmit(async (values: LoginData) => {
    setLoading(true);
    try {
      const response = await mutation.mutateAsync(values);
      if (response.isSuccess) {
        login(response)
        enqueueSnackbar("Bienvenido al portal de gestion de Quilino", { variant: 'success' });
      } else {
        enqueueSnackbar("Credenciales incorrectas", { variant: 'error' });
      }
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

        <Link
          variant="body2"
          sx={{ cursor: 'pointer', color: 'inherit', fontSize: '0.7rem', textAlign: 'right', display: 'block' }}
          onClick={() => setOpenDialog(true)}
        >
          ¿Olvidaste tu contraseña?
        </Link>


        <Button
          loading={loading}
          variant='contained'
          onClick={onSubmit}
          sx={{
            padding: '0.8rem',
            width: '100%',
            marginTop: '1rem',
          }}
        >
          Iniciar Sesión
        </Button>

        <ResetPassword open={openDialog} onClose={() => setOpenDialog(false)} />
      </Box>
    </FormProvider>
  );
};

export default SignInForm;
