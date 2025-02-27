import React, { useCallback, useState } from "react";
import PaginatedTable from "../../shared/components/table/table-paginated";
import CustomBreadcrumbs from "../../shared/components/breadcrumbs/bread-crums";
import { Box, Container, IconButton, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { paths } from "../../configs/constants/paths";
import { useRouter } from "../../hooks/use-router";
import HistoricTableRow from "../components/historic-table-row";
import historicService from "../service/historic";
import { useParams } from "../../hooks/use-params";
import { HistoricListData } from "../types/types";
import Iconify from "../../shared/components/iconify/iconify";

const columns = [
    { field: "FechaLiquidacion", headerName: "Fecha de liquidación" },
    { field: "actions", headerName: "" },
];

const HistoricList: React.FC = () => {
    const { id, name, legajo } = useParams();
    const router = useRouter();
    const [clickedRow, setClickedRow] = useState<HistoricListData | null>(null);

    // Llamado a la API
    const { data } = useQuery({
        queryKey: ["historicList", id],
        queryFn: () => historicService.findById(Number(id)),
    });

    // Función para manejar la edición de un recibo
    const handleEdit = useCallback(
        (rowId: number) => {
            router.push(paths.main.users.edit(rowId.toString()));
        },
        [router]
    );

    // Función para abrir el PDF
    const handleIconClick = async (row: HistoricListData) => {
        try {
            setClickedRow(row);
            await historicService.showPdf(Number(id), row.FechaLiquidacion);
        } catch (error) {
            console.error("Error al abrir el archivo PDF", error);
        }
    };

    const formattedData: HistoricListData[] =
        data?.map((fecha: string, index: number) => ({
            Id: index,
            FechaLiquidacion: fecha,
            NombreArchivo: "Archivo No Disponible",
            EmpleadoId: Number(id),
            nombre: "",
            actions: (
                <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
                    <IconButton onClick={() => handleIconClick({ Id: index, FechaLiquidacion: fecha, NombreArchivo: "Archivo No Disponible", EmpleadoId: Number(id), nombre: "" })}>
                        <Iconify icon="material-symbols:file-copy-outline" />
                    </IconButton>
                </Box>
            ),
        })) ?? [];

    return (
        <Container maxWidth="md">
            <CustomBreadcrumbs
                heading="Recibos Históricos"
                links={[
                    { name: "Lista de empleados", href: paths.main.empleo.list },
                    { name: "Recibos Históricos" },
                ]}
                sx={{ mb: 2 }}
            />
            <Typography variant="h6" sx={{ mb: 2 }}>
                {`Empleado/a ( ${name} ) Legajo N° (${legajo})`}
            </Typography>
            <PaginatedTable
                columns={columns}
                data={formattedData}
                renderRow={(historicList: HistoricListData) => (
                    <HistoricTableRow
                        key={historicList.Id}
                        row={historicList}
                        onEdit={() => handleEdit(historicList.Id)}
                        onIconClick={() => handleIconClick(historicList)}
                    />
                )}
            />
        </Container>
    );
};

export default HistoricList;
