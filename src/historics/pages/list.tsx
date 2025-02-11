import React, { useCallback } from "react";
import PaginatedTable from "../../shared/components/table/table-paginated";
import CustomBreadcrumbs from "../../shared/components/breadcrumbs/bread-crums";
import { Container, TableBody, Typography } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { paths } from "../../configs/constants/paths";
import { useRouter } from "../../hooks/use-router";
import HistoricTableRow from "../components/historic-table-row";

import historicService from "../service/historic";
import { useParams } from "../../hooks/use-params";
import { HistoricListData } from "../types/types";

const columns = [
    { field: "NombreArchivo", headerName: "Nombre de archivo" },
    { field: "FechaLiquidacion", headerName: "Fecha de liquidación" },
    { field: "Empleado", headerName: "Empleado" },
    { field: "actions", headerName: "" },
];

const HistoricList: React.FC = () => {


    const { id } = useParams();
    const { data } = useQuery({
        queryKey: ['historicList', id],
        queryFn: () => historicService.findById(Number(id)),
    });



    const router = useRouter();

    const handleEdit = useCallback(
        (id: string) => {
            router.push(paths.main.users.edit(id));
        },
        [router],
    );




    const mockData: HistoricListData[] = [
        {
            Id: 1,
            NombreArchivo: "recibo_enero_2024.pdf",
            FechaLiquidacion: "2024-01-31",
            EmpleadoId: 101,

        },
        {
            Id: 2,
            NombreArchivo: "recibo_febrero_2024.pdf",
            FechaLiquidacion: "2024-02-29",
            EmpleadoId: 102,

        },
        {
            Id: 3,
            NombreArchivo: "recibo_marzo_2024.pdf",
            FechaLiquidacion: "2024-03-31",
            EmpleadoId: 103,

        },
    ];
    return (
        <Container maxWidth={'md'} >
            <CustomBreadcrumbs
                heading='Recibos Historicos'
                links={[
                    {
                        name: 'Lista de empleados',
                        href: paths.main.empleo.list,
                    },
                    { name: `emplado : ${data.emplado}` },
                ]}
                sx={{ mb: 2 }}
            />



            <PaginatedTable columns={columns} data={data ?? []}>
                <TableBody>
                    {/* {data?.map((historicList: HistoricListData) => (
                        <HistoricTableRow
                            key={historicList.Id}
                            row={historicList}
                            onEdit={() => handleEdit(historicList.Id.toString())}
                        />
                    ))} */}
                    {mockData.map((historicList) => (
                        <HistoricTableRow
                            key={historicList.Id}
                            row={historicList}
                            onEdit={() => handleEdit(historicList.Id.toString())}
                        />
                    ))}
                </TableBody>
            </PaginatedTable>
        </Container>
    );
};

export default HistoricList;
