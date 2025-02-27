import React, { useEffect, useState } from "react";
import PaginatedTable from "../../shared/components/table/table-paginated";
import CustomBreadcrumbs from "../../shared/components/breadcrumbs/bread-crums";
import { Box, Button, CircularProgress, Container, IconButton } from "@mui/material";
import { useMutation, useQuery } from "@tanstack/react-query";
import SettingsTableRow from "../components/settings-table-row";
import employeeService from "../../employment/services/employee";
import { paths } from "../../configs/constants/paths";
import { useParams } from "../../hooks/use-params";
import { SettingsItem } from "../types/settings-types";
import ConfirmDialog from "../../shared/components/confirm-dialog/confirm-dialog";
import CloseIcon from '@mui/icons-material/Close';
import { useForm } from "react-hook-form";
import FormProvider from "../../shared/components/form/form-provider";
import RHFTextField from "../../shared/components/form/rhf-text-field";
import AddIcon from '@mui/icons-material/Add';
import settingsService from "../service/settings-service";
import { useSnackbar } from 'notistack';
import LoadingScreen from "../../shared/components/chargers/loading-screen";
import Iconify from "../../shared/components/iconify/iconify";

const SpecificSettingsList: React.FC = () => {
    const { nombre } = useParams();
    const [open, setOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<SettingsItem | null>(null);
    const { enqueueSnackbar } = useSnackbar();

    const methods = useForm<SettingsItem>({
        defaultValues: { nombre: "" },
    });

    const { handleSubmit, reset } = methods;

    const { data, isLoading, refetch } = useQuery<any>({
        queryKey: ['getSpecificSetting', nombre],
        queryFn: () => employeeService.getAllAreas(),
    });
    console.log(data)

    const formattedData: SettingsItem[] = data?.[nombre]?.map((item: SettingsItem) => ({
        id: item.id,
        nombre: item.nombre,
        actions: (
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <IconButton onClick={() => handleItemClick(item)}>
                    <Iconify icon="material-symbols:edit" />
                </IconButton>
            </Box>
        ),
    })) || [];


    useEffect(() => {
        reset(selectedItem ?? { nombre: "" });
    }, [selectedItem, reset]);

    const handleItemClick = (item: SettingsItem) => {
        setSelectedItem(item);
        setOpen(true);
    };

    const onSubmit = async (formData: SettingsItem) => {
        const area: SettingsItem = { id: formData.id, nombre: formData.nombre };
        if (selectedItem) {
            updateMutation.mutate({ type: nombre ?? "", area });
        } else {
            createMutation.mutate({ type: nombre ?? "", area });
        }
    };

    const createMutation = useMutation({
        mutationFn: ({ type, area }: { type: string, area: SettingsItem }) => settingsService.createArea(type, area),
        onSuccess: () => {
            refetch();
            enqueueSnackbar("Área creada correctamente", { variant: 'success' });
            setOpen(false);
        },
        onError: () => {
            enqueueSnackbar("Ha ocurrido un error al crear el área", { variant: 'error' });
        }
    });

    const updateMutation = useMutation({
        mutationFn: ({ type, area }: { type: string, area: SettingsItem }) => settingsService.updateArea(type, area),
        onSuccess: () => {
            refetch();
            enqueueSnackbar("Área editada correctamente", { variant: 'success' });
            setOpen(false);
        },
        onError: () => {
            enqueueSnackbar("Ha ocurrido un error al editar el área", { variant: 'error' });
        }
    });

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (!nombre) {
        return <div>El nombre no existe</div>;
    }

    return (
        <Container maxWidth="md">
            <CustomBreadcrumbs
                sx={{ mb: 2 }}
                heading={`Lista del área ${nombre}`}
                links={[
                    { name: "Configuración General", href: paths.main.settings.generalList },
                    { name: `Lista de área: ${nombre}` },
                ]}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end' }} >
                <Button
                    variant="text"
                    sx={{ m: 2, borderRadius: 4, height: 10 }}
                    startIcon={<AddIcon />}
                    onClick={() => setOpen(true)}
                >
                    Crear nueva área
                </Button>
            </Box>
            {isLoading ? (
                <CircularProgress />
            ) : (
                <PaginatedTable
                    columns={[
                        { field: "nombre", headerName: "Nombre" },
                        { field: "actions", headerName: "" },
                    ]}
                    data={formattedData}
                    renderRow={(row) => (
                        <SettingsTableRow
                            key={row.id}
                            row={row}
                            onIconClick={() => handleItemClick(row)}
                        />
                    )}
                />
            )}

            <ConfirmDialog
                open={open}
                onClose={() => setOpen(false)}
                title={selectedItem ? `Editando ${selectedItem.nombre}` : "Crear Nueva Área"}
                content={
                    <Box>
                        <IconButton
                            sx={{ position: 'absolute', top: 8, right: 8 }}
                            onClick={() => setOpen(false)}
                        >
                            <CloseIcon />
                        </IconButton>
                        <FormProvider methods={methods} onSubmit={handleSubmit(onSubmit)}>
                            <RHFTextField name="nombre" label="Nombre" sx={{ mt: 1 }} />
                        </FormProvider>
                    </Box>
                }
                action={
                    <Button
                        disabled={createMutation.isPending || updateMutation.isPending}
                        startIcon={createMutation.isPending || updateMutation.isPending ? <CircularProgress size={20} color="inherit" /> : null}
                        onClick={handleSubmit(onSubmit)}
                    >
                        Guardar
                    </Button>
                }
            />
        </Container>
    );
};

export default SpecificSettingsList;
