import React, { useEffect, useState } from "react";
import { Box, Typography, Checkbox, IconButton, CssBaseline, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, CircularProgress, Popover, MenuItem } from "@mui/material";
import EditIcon from '@mui/icons-material/Edit';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { columnsFirstTable, columnsSelectedEmployees } from '../utils/table-columns';
import FilterDrawer from "./filter-drawer";
import EditDrawer from "./edit-drawer";
import { Fade } from "@mui/material";
import BackupTableIcon from '@mui/icons-material/BackupTable';
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import employeeService from "../services/employee";
import { Empleado } from "../types/employee-types";
import CustomPopover from "../../shared/components/popover/custom-popover";
import { useSnackbar } from "notistack";
import { useEmployeesContext } from "./provider/employee-context";

interface TablaConDrawerProps { }

const LoadingScreen = () => (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
    </Box>
);

const TableEmployees: React.FC<TablaConDrawerProps> = () => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const openPopover = Boolean(anchorEl);
    const navigate = useNavigate();
    const [open, setOpen] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [selected, setSelected] = useState<Set<Empleado>>(new Set());
    const [order, setOrder] = useState<'asc' | 'desc'>('asc');
    const [orderBy, setOrderBy] = useState<string>('nombre');
    const [selectedEmployee, setSelectedEmployee] = useState<Empleado | null>(null);
    const { employees, setEmployees, isLoading } = useEmployeesContext();

    // useEffect(() => console.log(selected), [selected])

    const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>, empleado: Empleado) => {
        setSelectedEmployee(empleado);
        setAnchorEl(event.currentTarget);
    };

    const handleEdit = () => {
        if (selectedEmployee) {
            setOpen(true);
        } else {
            enqueueSnackbar('Ocurrio un error', { variant: 'error' });
        }
    };

    const handlePopoverClose = () => {
        setAnchorEl(null);
    };


    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = new Set(employees?.map((n: any) => n));
            setSelected(newSelecteds);
        } else {
            setSelected(new Set());
        }
    };

    const handleClick = (empleado: Empleado) => {
        const newSelected = new Set(selected);
        if (newSelected.has(empleado)) {
            newSelected.delete(empleado);
        } else {
            newSelected.add(empleado);
        }

        setSelected(newSelected);
    };

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
                                            <TableRow key={empleado.id} selected={selected.has(empleado)}>
                                                <TableCell padding="checkbox">
                                                    <Checkbox
                                                        checked={selected.has(empleado)}
                                                        onChange={() => handleClick(empleado)}
                                                    />
                                                </TableCell>
                                                <TableCell>{empleado.nombre || 'Nombre no disponible'}</TableCell>
                                                <TableCell>{empleado.apellido || 'Apellido no disponible'}</TableCell>
                                                <TableCell>{empleado.legajo || 'Legajo no disponible'}</TableCell>
                                                <TableCell>{empleado.areaAdministrativa?.nombre || 'Área no disponible'}</TableCell>
                                                <TableCell>{empleado.sueldos?.[0]?.fechaLiquidacion || 'Fecha de liquidación no disponible'}</TableCell>
                                                <TableCell>
                                                    <IconButton
                                                        aria-label="Opciones"
                                                        onClick={(e) => handlePopoverOpen(e, empleado)}
                                                    >
                                                        <MoreVertIcon />
                                                    </IconButton>
                                                    <CustomPopover
                                                        open={openPopover}
                                                        anchorEl={anchorEl}
                                                        onClose={handlePopoverClose}
                                                        anchorOrigin={{
                                                            vertical: 'bottom',
                                                            horizontal: 'left',
                                                        }}
                                                        transformOrigin={{
                                                            vertical: 'top',
                                                            horizontal: 'center',
                                                        }}
                                                    >
                                                        <MenuItem onClick={() => { handleEdit(); handlePopoverClose(); }}>
                                                            <EditIcon sx={{ marginRight: 1 }} />
                                                            Editar
                                                        </MenuItem>
                                                        <MenuItem onClick={() => { navigate(`/${empleado.id}/historico-sueldos`) }}>
                                                            <BackupTableIcon sx={{ marginRight: 1 }} />
                                                            Recibos Históricos
                                                        </MenuItem>
                                                    </CustomPopover>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                    )}
                    <Box sx={{ padding: '20px' }}>
                        <Button
                            variant="contained"
                            onClick={() => { }}
                        >
                            Confirmar
                        </Button>
                    </Box>

                </Box>
                <EditDrawer open={open} onClose={() => setOpen(false)} empleado={selectedEmployee!} />
                <FilterDrawer />
            </Box>
        </Fade>
    );
};

export default TableEmployees;
