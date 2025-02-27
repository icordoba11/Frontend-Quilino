import React from "react";
import PaginatedTable from "../../shared/components/table/table-paginated";
import CustomBreadcrumbs from "../../shared/components/breadcrumbs/bread-crums";
import { CircularProgress, Container } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";

interface SettingsListProps {
    areaName: string;
    data: any[];
    columns: { field: string; headerName: string }[];
    isLoading: boolean;
    onItemClick: (id: number) => void;
}

const EditSettingsList: React.FC<SettingsListProps> = ({
    areaName,
    data,
    columns,
    isLoading,
    onItemClick,
}) => {
    if (isLoading) {
        return <CircularProgress />;
    }

    const updatedColumns = [
        ...columns,
        { field: "actions", headerName: "Acciones" },
    ];

    const formattedData = data.map((item) => ({
        ...item,
        actions: (
            <IconButton onClick={() => onItemClick(item.id)}>
                <EditIcon />
            </IconButton>
        ),
    }));

    return (
        <Container maxWidth="md">
            <CustomBreadcrumbs heading={areaName} links={[{ name: "Configuración" }]} />

            {formattedData.length === 0 ? (
                <p>No hay datos disponibles.</p>
            ) : (
                <PaginatedTable columns={updatedColumns} data={formattedData} />
            )}
        </Container>
    );
};

export default EditSettingsList;
