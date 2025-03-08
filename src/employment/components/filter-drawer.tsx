import React, { useEffect, useState } from "react";
import {
    Drawer,
    Box,
    TextField,
    Typography,
    Button,
    Divider,
    InputLabel,
    MenuItem,
    FormControl,
    Select,
    SelectChangeEvent,  // Importa SelectChangeEvent desde MUI
} from "@mui/material";
import DateRangeIcon from '@mui/icons-material/DateRange';
import PersonIcon from '@mui/icons-material/Person';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import { selectList } from "./utils/area-list";
import employeeService from "../services/employee";
import { useQuery } from "@tanstack/react-query";
import { useEmployeesContext } from "./provider/employee-context";

const FilterDrawer: React.FC = () => {
    // Declaración de estados con useState
    const [busquedaEmpleado, setBusquedaEmpleado] = useState('');
    const [fechaLiquidacion, setFechaLiquidacion] = useState('');
    const [legajoMin, setLegajoMin] = useState("");
    const [legajoMax, setLegajoMax] = useState("");
    const [area, setArea] = useState('null');
    const [activeField, setActiveField] = useState<string | null>(null);
    const { setEmployees } = useEmployeesContext();



    // Función para manejar el cambio de área
    const handleAreaChange = (e: SelectChangeEvent<string>) => {
        setArea(e.target.value);
    };



    const fetchEmpleados = async () => {
        if (area == "") {
            setArea("null");
        }
        switch (true) {
            case Boolean(legajoMin != "" || legajoMax != ""):
                return await employeeService.getEmpleadosByLegajo({ legajoMin, legajoMax, area });
            case Boolean(fechaLiquidacion):
                return await employeeService.getEmpleadosByFechaLiquidacion({ fechaLiquidacion, area });

            case Boolean(busquedaEmpleado):
                return await employeeService.getEmpleadosByName({ busquedaEmpleado, area });

            case Boolean(area !== "null" && legajoMin == "" && legajoMax == "" && !fechaLiquidacion && !busquedaEmpleado):
                return await employeeService.getEmpleadosByLegajo({ legajoMin: "1", legajoMax: "999999999", area });

            default:
                return await employeeService.getAllEmpleados();
        }
    };


    const { data } = useQuery({
        queryKey: ['getAllEmployees', legajoMin, legajoMax, fechaLiquidacion, busquedaEmpleado, area],
        queryFn: fetchEmpleados,

    });

    useEffect(() => {
        if (data) {
            setEmployees(data);
        }
    }, [data]);

    const resetFilters = () => {
        setBusquedaEmpleado("");
        setLegajoMin("");
        setLegajoMax("");
        setFechaLiquidacion("");
        setArea("null");
    };

    const handleFieldChange = (field: string, setValue: React.Dispatch<React.SetStateAction<string>>) =>
        (event: React.ChangeEvent<HTMLInputElement>) => {
            const value = event.target.value;
            setValue(value);

            if (value) {

                if (field === 'legajoMin' || field === 'legajoMax') {
                    setActiveField('legajoRange');
                } else {
                    setActiveField(field);
                }
            } else {
                setActiveField(null);
            }
        };

    return (
        <Box sx={{
            width: 240,
            flexShrink: 0,
            height: '100vh',
            position: 'relative',
            mt: -3,
            boxShadow: 10
        }}>

            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    height: '100vh',
                    position: 'relative',
                    top: 0,
                    left: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 270,
                        boxSizing: "border-box",
                        height: '100%',
                        position: 'relative'
                    },
                }}
            >
                <Box sx={{
                    padding: 2,
                    overflowY: 'auto',
                    height: 'calc(100vh - 64px)',
                    position: 'fixed',
                    maxWidth: '270px',
                }}>
                    <Typography variant="h6">Información Personal</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
                        <PersonIcon />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Buscar empleado"
                            value={busquedaEmpleado}
                            onChange={handleFieldChange('busquedaEmpleado', setBusquedaEmpleado)}
                            disabled={!!activeField && activeField !== 'busquedaEmpleado'}
                        />
                    </Box>

                    <Divider sx={{ marginTop: '20px' }} />
                    <Typography variant="h6">Información Laboral</Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', columnGap: '5px' }}>
                        <DateRangeIcon />
                        <TextField
                            fullWidth
                            type="date"
                            margin="normal"
                            label="Fecha de Liquidación"
                            InputLabelProps={{ shrink: true }}
                            value={fechaLiquidacion}
                            onChange={handleFieldChange('fechaLiquidacion', setFechaLiquidacion)}
                            disabled={!!activeField && activeField !== 'fechaLiquidacion'}
                        />
                    </Box>
                    <Box sx={{ display: 'flex', columnGap: '10px', alignItems: 'center' }}>
                        <FormatListBulletedIcon />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Legajo Min"
                            type="number"
                            value={legajoMin}
                            onChange={handleFieldChange('legajoMin', setLegajoMin)}
                            disabled={!!activeField && activeField !== 'legajoRange'}
                        />
                        <TextField
                            fullWidth
                            margin="normal"
                            label="Legajo Max"
                            type="number"
                            value={legajoMax}
                            onChange={handleFieldChange('legajoMax', setLegajoMax)}
                            disabled={!!activeField && activeField !== 'legajoRange'}
                        />
                    </Box>
                    <Divider sx={{ marginTop: '20px' }} />
                    <Typography variant="h6">Área administrativa</Typography>
                    <FormControl sx={{ m: 2, minWidth: 200 }} >
                        <InputLabel id="demo-simple-select-autowidth-label">Área Administrativa</InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={area}
                            label="Área administrativa"
                            onChange={handleAreaChange}
                            disabled={false}
                            sx={{ maxWidth: 200 }}
                        >
                            <MenuItem value={"null"}>
                                <em>Seleccionar</em>
                            </MenuItem>
                            {selectList.map((item) => (
                                <MenuItem key={item.value} value={item.value}>
                                    {item.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <Button
                        variant="contained"
                        onClick={() => {
                            resetFilters();
                            setActiveField(null);
                        }}
                        sx={{ margin: '20px', width: '80%' }}
                    >
                        Borrar Filtros
                    </Button>
                </Box>
            </Drawer>
        </Box>
    );
};

export default FilterDrawer;
