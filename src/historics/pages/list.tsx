import React, { useCallback, useState } from "react";
import PaginatedTable from "../../shared/components/table/table-paginated";
import CustomBreadcrumbs from "../../shared/components/breadcrumbs/bread-crums";
import { Container, TableBody } from "@mui/material";
import { useQuery } from "@tanstack/react-query";
import { paths } from "../../configs/constants/paths";
import { useRouter } from "../../hooks/use-router";
import HistoricTableRow from "../components/historic-table-row";

import historicService from "../service/historic";
import { useParams } from "../../hooks/use-params";
import { HistoricListData } from "../types/types";

const columns = [
    { field: "FechaLiquidacion", headerName: "Fecha de liquidación" },
    { field: "actions", headerName: "" },
];

const HistoricList: React.FC = () => {
    const { id, name } = useParams();

    const { data } = useQuery({
        queryKey: ['historicList', id],
        queryFn: () => historicService.findById(Number(id)),
    });

    const router = useRouter();
    const [clickedRow, setClickedRow] = useState<HistoricListData | null>(null);

    const handleEdit = useCallback(
        (id: string) => {
            router.push(paths.main.users.edit(id));
        },
        [router],
    );

    const handleIconClick = async (row: HistoricListData) => {
        try {
            setClickedRow(row);
            await historicService.showPdf(Number(id), row.FechaLiquidacion);
        } catch (error) {
            console.error('Error al abrir el archivo PDF', error);
        }
    };

    const formattedData = data?.map((fecha: string, index: number) => ({
        Id: index,
        FechaLiquidacion: fecha,
    }));

    return (
        <Container maxWidth={'md'}>
            <CustomBreadcrumbs
                heading='Recibos Históricos'
                links={[
                    {
                        name: 'Lista de empleados',
                        href: paths.main.empleo.list,
                    },
                    { name: `Empleado ${name}` },
                ]}
                sx={{ mb: 2 }}
            />
            <PaginatedTable columns={columns} data={formattedData ?? []}>
                <TableBody>
                    {formattedData?.map((historicList: HistoricListData) => (
                        <HistoricTableRow
                            key={historicList.Id}
                            row={historicList}
                            onEdit={() => handleEdit(historicList.Id.toString())}
                            onIconClick={() => handleIconClick(historicList)}
                        />
                    ))}
                </TableBody>
            </PaginatedTable>
        </Container>
    );
};

export default HistoricList;
