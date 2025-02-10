import { useMutation } from '@tanstack/react-query';
import Container from '@mui/material/Container';
import { useSnackbar } from 'notistack';
import CustomBreadcrumbs from '../../shared/components/breadcrumbs/bread-crums';
import { useRouter } from '../../hooks/use-router';
import { paths } from '../../configs/constants/paths';
import userService from '../services/users';
import UserCreateForm from '../components/create-form';



export default function UserCreatePage() {

    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const createMutation = useMutation({
        mutationFn: ({ nombreUsuario, email, password }: { nombreUsuario: string, email: string, password: string }) => userService.createUser(nombreUsuario, email, password),
        onSuccess: () => {
            enqueueSnackbar('User updated successfully!', { variant: 'success' });
            router.push(paths.main.users.list);
        },
        onError: (error: Error) => {
            enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
        },
    });

    return (
        <Container maxWidth={'lg'}>
            <CustomBreadcrumbs
                heading='Crear nuevo Usuario'
                links={[
                    {
                        name: 'Lista de usuarios',
                        href: paths.main.users.list,
                    },
                    { name: `Creacion de usuarios` },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />

            <UserCreateForm
                onSubmit={values => createMutation.mutate(values)}
                isLoading={createMutation.isPending}
            />
        </Container>
    );
}
