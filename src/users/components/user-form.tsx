import { useForm } from 'react-hook-form';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Grid2';
import LoadingButton from '@mui/lab/LoadingButton';
import { useEffect, useState } from 'react';
import FormProvider from '../../shared/components/form/form-provider';
import RHFTextField from '../../shared/components/form/rhf-text-field';
import { User } from '../types/types';
import Typography from '@mui/material/Typography';
import Iconify from '../../shared/components/iconify/iconify';
import { RHFSelect } from '../../shared/components/form/rhf-select';
import { ROLES } from './roles';
import MenuItem from '@mui/material/MenuItem';

type UserNewEditFormProps = {
    user?: User;
    onSubmit: (values: any) => void;
    isLoading?: boolean;
};

export default function UserForm({ user, onSubmit, isLoading }: UserNewEditFormProps) {
    const methods = useForm<User>({
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            role: "",
        },
        mode: "onChange",
    });

    const { handleSubmit, reset, formState: { isValid }, watch } = methods;
    const [initialRole, setInitialRole] = useState<string>("");

    useEffect(() => {
        if (user) {
            reset({
                firstName: user.firstName || "",
                lastName: user.lastName || "",
                email: user.email || "",
                role: user.role || "",
            });
            setInitialRole(user.role || "");
        }
    }, [user, reset]);

    const roleValue = watch("role");

    return (
        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={3} justifyContent="center" alignItems="center">
                <Grid size={10}>
                    <Card sx={{ p: 8, boxShadow: 20, borderRadius: 5 }}>
                        <Stack direction="row" spacing={5} sx={{ width: '100%', alignItems: 'center', pb: 5 }}>
                            <Iconify icon="material-symbols:person-edit-outline" width={35} />
                            <Typography variant='h5'>
                                {`Editando usuario '${user?.firstName} ${user?.lastName}'`}
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
                            <RHFTextField name='firstName' label='Nombre' disabled />
                            <RHFTextField name='lastName' label='Apellido' disabled />
                            <RHFTextField name='email' label='Email' disabled />
                            <RHFSelect
                                name="role"
                                label="Rol"
                            >
                                {ROLES.map((role) => (
                                    <MenuItem key={role.value} value={role.value}>
                                        {role.label}
                                    </MenuItem>
                                ))}
                            </RHFSelect>
                        </Box>

                        <Stack alignItems='flex-end' sx={{ mt: 3 }}>
                            <LoadingButton
                                type='submit'
                                variant='contained'
                                loading={isLoading}
                                disabled={!isValid || isLoading || roleValue === initialRole}
                            >
                                Edit User
                            </LoadingButton>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>
        </FormProvider>
    );
}
