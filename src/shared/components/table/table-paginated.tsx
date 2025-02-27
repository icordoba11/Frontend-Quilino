import { useState, ReactNode } from "react";
import { Table, TableContainer, TableHead, TableCell, TableRow as MuiTableRow, TablePagination, Paper, TableBody } from "@mui/material";

interface Column {
    field: string;
    headerName: string;
    renderCell?: (params: any) => React.ReactNode;
}

interface PaginatedTableProps {
    columns: Column[];
    data: Record<string, any>[];
    rowsPerPageOptions?: number[];
    renderRow?: (row: any) => React.ReactNode;
}

const PaginatedTable: React.FC<PaginatedTableProps> = ({
    columns,
    data,
    rowsPerPageOptions = [5, 10, 25],
}) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

    const handleChangePage = (_: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    // **Aplicar la paginación a los datos**
    const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

    return (
        <Paper sx={{ p: 5, borderRadius: 5, boxShadow: 20 }}>
            <TableContainer sx={{ maxHeight: 'calc(100vh - 400px)', overflowY: 'auto' }}>
                <Table>
                    <TableHead sx={{ backgroundColor: '#e7e7e7', boxShadow: 30 }}>
                        <MuiTableRow>
                            {columns.map((column) => (
                                <TableCell key={column.field}>{column.headerName}</TableCell>
                            ))}
                        </MuiTableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedData.map((row, rowIndex) => (
                            <MuiTableRow key={rowIndex}>
                                {columns.map((column) => (
                                    <TableCell key={column.field}>
                                        {column.renderCell ? column.renderCell(row) : row[column.field]}
                                    </TableCell>
                                ))}
                            </MuiTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={rowsPerPageOptions}
                component="div"
                count={data.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
};

export default PaginatedTable;
