import { useQuery, useMutation } from '@tanstack/react-query';

import Container from '@mui/material/Container';
import { useSnackbar } from 'notistack';
import CustomBreadcrumbs from '../../shared/components/breadcrumbs/bread-crums';
import UserForm from '../components/user-form';
import { useRouter } from '../../hooks/use-router';
import { useParams } from '../../hooks/use-params';
import { paths } from '../../configs/constants/paths';
import userService from '../services/users';
import { useEffect } from 'react';
import { User } from '../types/types';


export default function UserEditPage() {
    const params = useParams();

    const { id } = params;
    const router = useRouter();
    const { enqueueSnackbar } = useSnackbar();

    const { data } = useQuery({
        queryKey: ['user', id],
        queryFn: () => userService.findById(id!),
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, user }: { id: string, user: User }) => userService.update(id, user),
        onSuccess: () => {
            enqueueSnackbar('User updated successfully!', { variant: 'success' });
            router.push(paths.main.users.list);
        },
        onError: (error: Error) => {
            enqueueSnackbar(`Error: ${error.message}`, { variant: 'error' });
        },
    });

    if (!id) {
        return <div>Loading...</div>;  
    }


    return (
        <Container maxWidth={'lg'}>
            <CustomBreadcrumbs
                heading='Edicion de usuarios'
                links={[
                    {
                        name: 'Lista de usuarios',
                        href: paths.main.users.list,
                    },
                    { name: `Edicion de usuarios` },
                ]}
                sx={{
                    mb: { xs: 3, md: 5 },
                }}
            />

            <UserForm
                user={data}
                onSubmit={values => updateMutation.mutate({ id, user: values })}
                isLoading={updateMutation.isPending}
            />
        </Container>
    );
}
