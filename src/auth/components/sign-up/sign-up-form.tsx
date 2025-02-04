import React from 'react';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RHFTextField from '../../../shared/components/form/rhf-text-field';
import FormProvider from '../../../shared/components/form/form-provider';
import { useCustomMutation } from '../../../hooks/use-mutation';
import usersService from '../../services/users';

interface SignUpFormInputs {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  password: string;
  role: string;
}

const SignUpForm: React.FC = () => {
  const methods = useForm<SignUpFormInputs>({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role: 'user'
    },
  });

  const mutation = useCustomMutation({
    mutationFn: async (user: SignUpFormInputs) => {
      const userData = { ...user, role: 'user' };
      const response = await usersService.createUser(userData);
      return response;
    },
    onSuccess: () => {
      methods.reset();

    },
    onSuccessMessage: 'Usuario creado correctamente',
    onErrorMessage: 'Error al crear el usuario',
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
          name="firstName"
          type="text"
          label="Nombre"
          rules={{
            required: 'El nombre es obligatorio',
            minLength: {
              value: 2,
              message: 'El nombre debe tener al menos 2 caracteres',
            },
          }}
          helperText="Introduce tu nombre"

        />

        <RHFTextField
          name="lastName"
          type="text"
          label="Apellido"
          rules={{
            required: 'El apellido es obligatorio',
            minLength: {
              value: 2,
              message: 'El apellido debe tener al menos 2 caracteres',
            },
          }}
          helperText="Introduce tu apellido"

        />

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
            maxLength: {
              value: 20,
              message: 'La contraseña no puede tener más de 20 caracteres',
            },
          }}
          helperText="Introduce tu contraseña"

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
