import React, { useCallback, useEffect, useState } from "react";
import { Box, Typography, Checkbox, CssBaseline, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { columnsFirstTable, columnsSelectedEmployees } from '../utils/table-columns';
import FilterDrawer from "./filter-drawer";
import EditDrawer from "./edit-drawer";
import { Fade } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { Empleado } from "../types/employee-types";
import { useSnackbar } from "notistack";
import { useEmployeesContext } from "./provider/employee-context";
import SendTable from "./send-table";
import ConfirmSelected from "./confirm-selected";
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import InsertDriveFileIcon from '@mui/icons-material/InsertDriveFile';

interface TablaConDrawerProps { }

const LoadingScreen = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
);

const TableEmployees: React.FC<TablaConDrawerProps> = () => {
    const navigate = useNavigate();
    const { enqueueSnackbar } = useSnackbar();
    const { employees, setEmployees, isLoading, selected, setSelected, openDialog, setOpenDialog } = useEmployeesContext();

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const [selectedEmployee, setSelectedEmployee] = useState<Empleado | null>(null);



    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>('nombre');

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, empleado: Empleado) => {
        setSelectedEmployee(empleado);
        setAnchorEl(event.currentTarget);
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
        setSelectedEmployee(null);
    };

    const handleEdit = () => {
        if (selectedEmployee) {
            setOpen(true);
        } else {
            enqueueSnackbar('Ocurrio un error', { variant: 'error' });
        }
    };




    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = new Set(employees?.map((n) => n.id) ?? []);

            setSelected(newSelecteds);
        } else {
            setSelected(new Set());
        }
    };

    const handleClick = useCallback((empleado: Empleado) => {
        setSelected(prev => {
            const newSelected = new Set(prev);
            newSelected.has(empleado.id) ? newSelected.delete(empleado.id) : newSelected.add(empleado.id);
            return newSelected;
        });
    }, []);

    const handleRequestSort = (property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const sortData = (array: any[]) => {
        const comparator = (a: any, b: any) => {
            if (a[orderBy] < b[orderBy]) {
                return order === 'asc' ? -1 : 1;
            }
            if (a[orderBy] > b[orderBy]) {
                return order === 'asc' ? 1 : -1;
            }
            return 0;
        };
        return array.sort(comparator);
    };

    if (isLoading) {
        return <LoadingScreen />;
    }

    return (
        <Fade in={true} timeout={1000}>
            <Box sx={{ display: "flex", height: "100vh" }}>
                <CssBaseline />
                <Box component="main" sx={{ flexGrow: 1, padding: 3, border: '1px 0px 0xp solid grey', borderRadius: '5px' }}>
                    <Typography variant="h6" gutterBottom>
                        Tabla Empleados
                    </Typography>

                    {isLoading ? (
                        <LoadingScreen />
                    ) : (
                        <Box sx={{ maxHeight: 'calc(100vh - 100px)', overflowY: 'auto', borderRadius: '5px', }}>
                            <TableContainer component={Paper} sx={{ p: 2 }}>
                                <Table sx={{ width: '100%', }} aria-label="tabla de empleados">
                                    <TableHead sx={{ backgroundColor: '#e7e7e7', boxShadow: 30 }}>
                                        <TableRow>
                                            <TableCell padding="checkbox">
                                                <Checkbox
                                                    checked={selected.size === employees?.length}
                                                    onChange={handleSelectAllClick}
                                                />
                                            </TableCell>
                                            {columnsFirstTable.map((col, index) => (
                                                <TableCell
                                                    key={index}
                                                    sortDirection={orderBy === col.field ? order : false}
                                                    onClick={() => handleRequestSort(col.field)}
                                                    sx={{ cursor: 'pointer' }}
                                                >
                                                    {col.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {sortData(employees || [])?.map((empleado: Empleado) => (
                                            <TableRow key={empleado.id} selected={selected.has(empleado.id)}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selected.has(empleado.id)}
                                                        onChange={() => handleClick(empleado)}
                                                    />
                                                </TableCell>
                                                <TableCell>{empleado.nombre || 'Nombre no disponible'}</TableCell>
                                                <TableCell>{empleado.apellido || 'Apellido no disponible'}</TableCell>
                                                <TableCell>{empleado.legajo || 'Legajo no disponible'}</TableCell>
                                                <TableCell>{empleado.areaAdministrativa?.nombre || 'Área no disponible'}</TableCell>
                                                <TableCell>{empleado.sueldos?.[0]?.fechaLiquidacion || 'Fecha de liquidación no disponible'}</TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => {
                                                        setSelectedEmployee(empleado);
                                                        setOpen(true);
                                                    }}>
                                                        <EditIcon />
                                                    </IconButton>
                                                </TableCell>
                                                <TableCell>
                                                    <IconButton onClick={() => {
                                                        navigate(`/historics/${empleado.id}/${empleado.nombre}/${empleado.legajo}/list`)
                                                    }}>
                                                        <InsertDriveFileIcon />
                                                    </IconButton>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                        </Box>

                    )}
                    <Box sx={{ paddingTop: '20px', display: ' flex', flexDirection: 'row', mt: 2, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            onClick={() => setOpenDialog(true)}
                            disabled={selected.size === 0}
                            fullWidth
                            sx={{ maxWidth: 500 }}


                        >
                            Enviar recibos de sueldo
                        </Button>
                    </Box>

                </Box>
                <EditDrawer open={open} onClose={() => setOpen(false)} empleado={selectedEmployee!} />
                <FilterDrawer />
                <ConfirmSelected
                    open={openDialog}
                    onClose={() => setOpenDialog(false)}
                    title="Empleados seleccionados"
                    sx={{ width: '100%' }}
                    content={
                        <>
                            <SendTable columns={columnsSelectedEmployees} selectedEmployeeIds={Array.from(selected)} />
                            <IconButton
                                sx={{
                                    position: 'absolute',
                                    top: 8,
                                    right: 8,
                                }}
                                onClick={() => setOpenDialog(false)}
                            >
                                <CloseIcon />
                            </IconButton>
                        </>
                    }
                />

            </Box>
        </Fade>
    );
};

export default TableEmployees;
