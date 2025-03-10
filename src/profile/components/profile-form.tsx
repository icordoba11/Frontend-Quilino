import { useForm } from 'react-hook-form';
import { Box, Button, CardMedia, Grid, Typography, Paper, IconButton } from "@mui/material";
import RHFTextField from "../../shared/components/form/rhf-text-field";
import FormProvider from "../../shared/components/form/form-provider";
import { useQuery } from "@tanstack/react-query";
import userService from "../../users/services/users";
import { User } from "../../users/types/types";
import { useEffect, useState } from "react";
import ConfirmDialog from "../../shared/components/confirm-dialog/confirm-dialog";
import CloseIcon from '@mui/icons-material/Close';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import { red } from '@mui/material/colors';
import LoadingScreen from '../../shared/components/chargers/loading-screen';

const ProfileForm = () => {
    const currentUser = sessionStorage.getItem('currentUser');
    const [open, setOpen] = useState(false);

    const { data, isLoading } = useQuery({
        queryKey: ['currentUser', currentUser],
        queryFn: () => currentUser ? userService.findById(Number(currentUser)) : Promise.resolve(null),
        enabled: !!currentUser,
    });

    const methods = useForm<User>({
        defaultValues: {
            nombreUsuario: data?.nombreUsuario || "",
            email: data?.email || "",
            rol: data?.rol || "",
            fechaRegistro: data?.fechaRegistro || "",
        }
    });

    useEffect(() => {
        if (data) {
            methods.reset({
                nombreUsuario: data.nombreUsuario || "",
                email: data.email || "",
                rol: data.rol || "",
                fechaRegistro: data.fechaRegistro || "",
            });
        }
    }, [data, methods]);


    // const updateMutation = useMutation({
    //     mutationFn: ({ id, user }: { id: string; user: User }) => userService.update(id, user),
    //     onSuccess: () => {
    //         enqueueSnackbar('Email cambiado con exito, por favor ingrese nuevamente !');
    //         logout();
    //         navigate('/auth/sign-in');
    //     },
    // });

    const { handleSubmit } = methods;

    // const onSubmit = async (data: User) => {
    //     if (currentUser) {
    //         updateMutation.mutate({
    //             id: currentUser.uid,
    //             user: data,
    //         });
    //     }
    // };



    // const ConfirmButton = () => {

    //     const handleConfirm = async () => {
    //         await handleSubmit(onSubmit)();
    //     };
    //     return (
    //         <LoadingButton
    //             onClick={handleConfirm}
    //             isLoading={updateMutation.isPending}
    //         >
    //             Guardar
    //         </LoadingButton>
    //     );
    // };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Paper
            elevation={5}
            sx={{
                p: 6,
                width: "100%",
                maxWidth: 800,
                height: '100%',
                mx: "auto",
                background: "linear-gradient(to bottom,rgb(241, 241, 241),rgb(255, 255, 255))",
            }}
        >
            <Box display="flex" alignItems="center" mb={3} justifyContent={'center'} sx={{ mb: 5 }}>
                <CardMedia
                    component="img"
                    image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv6MtYKBFMYTbPB8yJBB-tK0mo-8tERRutRQ&s"
                    alt="Profile Icon"
                    sx={{ width: 100, height: 100, borderRadius: "50%", mr: 2 }}
                />
                <Box>
                    <Typography variant="h6" fontWeight="bold">
                        Información Personal
                    </Typography>
                    <Typography variant="body2" color="textSecondary">
                        Complete sus datos personales a continuación.
                    </Typography>
                </Box>
            </Box>

            <FormProvider methods={methods} onSubmit={handleSubmit(() => { })}>
                <Grid container spacing={2} sx={{ flexWrap: 'wrap' }}>
                    <Grid item xs={12} sm={6}>
                        <RHFTextField label="Nombre" name="nombreUsuario" disabled />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <RHFTextField label="Fecha de creacion" name="fechaRegistro" disabled />
                    </Grid>
                    <Grid item xs={12}>
                        <RHFTextField label="Email" name="email" disabled />
                    </Grid>
                    <Grid item xs={12}>
                        <RHFTextField label="Rol" name="rol" sx={{ maxWidth: 200 }} disabled />
                    </Grid>

                    <Grid container spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'flex-end', height: '100%' }}>
                        <Grid item xs={6} sm={2} sx={{ mt: 5 }} >
                            <Button
                                variant='contained'
                                onClick={() => setOpen(true)}
                                // disabled={isLoading}
                                disabled
                            >
                                Guardar
                            </Button>
                        </Grid>
                    </Grid>
                </Grid>
            </FormProvider>
            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                title='Edición de datos personales'
                content={
                    <Box>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                top: 8,
                                right: 8,
                            }}
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        <IconButton sx={{ display: 'block', m: 'auto' }}>
                            <WarningAmberIcon sx={{ fontSize: 50, color: red[500] }} />
                        </IconButton>
                        <Typography variant='h5' textAlign={'center'} >
                            ¿Estás seguro?
                        </Typography>
                        <Typography variant='subtitle2' textAlign={'center'} color='grey' >
                            Que quieres guardar los cambios
                        </Typography>
                    </Box>
                }
            // action={<ConfirmButton />}
            />
        </Paper>
    );
};

export default ProfileForm;
