import React, { useCallback } from "react";
import PaginatedTable from "../../shared/components/table/table-paginated";
import CustomBreadcrumbs from "../../shared/components/breadcrumbs/bread-crums";
import { Box, CircularProgress, Container, IconButton } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import SettingsTableRow from "../components/settings-table-row";
import employeeService from "../../employment/services/employee";
import { useRouter } from "../../hooks/use-router";
import { paths } from "../../configs/constants/paths";
import LoadingScreen from "../../shared/components/chargers/loading-screen";
import Iconify from "../../shared/components/iconify/iconify";

const columns = [
    { field: "nombre", headerName: "Nombre" },
    { field: "actions", headerName: "" },
];

const GeneralSettingsList: React.FC = () => {
    const router = useRouter();

    const { data, isLoading, isError } = useQuery<any>({
        queryKey: ['getAllSettings'],
        queryFn: () => employeeService.getAllAreas(),
    });

    // Formatear los datos obtenidos
    const formattedData = Object.keys(data || {}).map((key) => {
        const formattedName = key
            .replace('DTO', '')
            .replace(/([a-z])([A-Z])/g, '$1 $2')
            .charAt(0).toUpperCase() + key.slice(1).replace('DTO', '');

        return {
            nombre: formattedName,
            originalName: key,
            actions: (
                <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <IconButton onClick={() => handleItemClick(key)}>
                        <Iconify icon="material-symbols:edit" />
                    </IconButton>
                </Box>
            ),
        };
    });


    const handleItemClick = useCallback(
        (originalName: string) => {
            router.push(paths.main.settings.list(originalName));
        },
        [router],
    );

    if (isLoading) {
        return <LoadingScreen />;
    }

    if (isError) {
        return <div>Error en la carga de las Areas</div>;
    }

    return (
        <Container maxWidth="md">
            <CustomBreadcrumbs heading="Configuración de Áreas" links={[{ name: "Configuración" }]} sx={{mb:3}} />

            {isLoading ? (
                <CircularProgress />
            ) : (
                <PaginatedTable
                    columns={columns}
                    data={formattedData}
                    renderRow={(row) => (
                        <SettingsTableRow
                            key={row.originalName}
                            row={row}
                            onIconClick={() => handleItemClick(row.originalName)}
                        />
                    )}
                />
            )}
        </Container>
    );
};

export default GeneralSettingsList;
