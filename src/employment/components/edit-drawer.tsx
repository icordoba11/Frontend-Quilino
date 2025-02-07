import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Empleado } from '../types/employee-types';
import { useForm, FormProvider } from 'react-hook-form'; // Importamos useForm y FormProvider
import RHFTextField from '../../shared/components/form/rhf-text-field'; // Tu componente RHFTextField
import React, { useEffect } from 'react';
import { RHFSelect } from '../../shared/components/form/rhf-select';
import MenuItem from '@mui/material/MenuItem';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import headerImg from '../../assets/images/editDrawerHeader.png'

interface EditDrawerProps {
    open: boolean;
    onClose: () => void;
    empleado: Empleado | null;
}

export default function EditDrawer({ open, onClose, empleado }: EditDrawerProps) {

    const methods = useForm<Empleado>({
        defaultValues: {
            nombre: '',
            apellido: '',
            genero: '',
            condicionImpositiva: '',
            horasDiarias: 0,
            fechaNacimiento: '',
            fechaIngreso: '',
            // tipo: '',
            // areaAdministrativa: '',
            // categoria: '',
            // ubicacionTrabajo: '',
            // responsabilidad: '',
            // cantidadPersonas: '',
            celular: '',
            email: '',
            numeroJubilacion: 0
        },
    });


    useEffect(() => {
        if (empleado) {
            methods.reset({
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                genero: empleado.genero,
                condicionImpositiva: empleado.condicionImpositiva,
                horasDiarias: empleado.horasDiarias,
                fechaNacimiento: empleado.fechaNacimiento,
                fechaIngreso: empleado.fechaIngreso,
                // tipo: empleado.tipo.nombre,
                // areaAdministrativa: empleado.areaAdministrativa.nombre,
                // categoria: empleado.categoria.nombre,
                // ubicacionTrabajo: empleado.ubicacionTrabajo.nombre,
                // geoLocalizacion: empleado.ubicacionTrabajo.geoLocalizacion,
                // responsabilidad: empleado.responsabilidad.categoria,
                // cantidadPersonas: empleado.responsabilidad.cantidadPersonas,
                celular: empleado.celular,
                email: empleado.email,
                numeroJubilacion: empleado.numeroJubilacion
            });
        }

    }, [empleado, methods]);

    const { handleSubmit } = methods;

    const onSubmit = (data: Empleado) => {
        // console.log('Datos actualizados:', data);
        onClose();
    };

    const DrawerList = (
        <Box sx={{ width: 300, mt: 10, p: 3 }} role="presentation">
            <FormProvider {...methods}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Box textAlign={'center'}>
                        <img src={headerImg} style={{ maxWidth: 50, maxHeight: 50 }} />
                    </Box>
                    <Typography variant="h6" gutterBottom>
                        Informacion Personal
                    </Typography>
                    <Divider />
                    <RHFTextField
                        name="nombre"
                        label="Nombre"
                        variant="outlined"
                        margin="normal"
                    />
                    <RHFTextField
                        name="apellido"
                        label="Apellido"
                        variant="outlined"
                        margin="normal"
                    />

                    <RHFSelect
                        name="genero"
                        label="Género"
                        defaultValue={empleado?.genero || ''}
                        margin="normal"
                    >
                        <MenuItem value="Masculino">Masculino</MenuItem>
                        <MenuItem value="Femenino">Femenino</MenuItem>
                        <MenuItem value="Otro">Otro</MenuItem>
                    </RHFSelect>
                    <RHFTextField
                        name="fechaNacimiento"
                        label="Fecha de Nacimiento"
                        variant="outlined"
                        margin="normal"
                        type='date'
                        InputLabelProps={{ shrink: true }}
                    />

                    <RHFTextField
                        name="celular"
                        label="Celular"
                        variant="outlined"
                        margin="normal"
                    />
                    <RHFTextField
                        name="email"
                        label="Email"
                        variant="outlined"
                        margin="normal"
                    />

                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Informacion Laboral
                    </Typography>
                    <Divider />
                    <RHFTextField
                        name="condicionImpositiva"
                        label="Condición Impositiva"
                        variant="outlined"
                        margin="normal"
                    />
                    <RHFTextField
                        name="horasDiarias"
                        label="Horas Diarias"
                        variant="outlined"
                        margin="normal"
                    />

                    <RHFTextField
                        name="fechaIngreso"
                        label="Fecha de Ingreso"
                        variant="outlined"
                        margin="normal"
                        type='date'
                        InputLabelProps={{ shrink: true }}
                    />
                    <RHFTextField
                        name="tipo"
                        label="Tipo de Empleado"
                        variant="outlined"
                        margin="normal"
                    />
                    <RHFTextField
                        name="areaAdministrativa"
                        label="Área Administrativa"
                        variant="outlined"
                        margin="normal"
                    />
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Categoria Laboral
                    </Typography>
                    <Divider />
                    <RHFTextField
                        name="categoria"
                        label="Categoría"
                        variant="outlined"
                        margin="normal"
                    />
                    <RHFTextField
                        name="cantidadPersonas"
                        label="Cantidad de personas cargo"
                        variant="outlined"
                        margin="normal"
                    />
                    <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        Ubicacion Laboral
                    </Typography>
                    <Divider />
                    <RHFTextField
                        name="ubicacionTrabajo"
                        label="Ubicación de Trabajo"
                        variant="outlined"
                        margin="normal"
                    />
                    <RHFTextField
                        name="geoLocalizacion"
                        label="Geo localizacion"
                        variant="outlined"
                        margin="normal"
                    />
                    <RHFTextField
                        name="responsabilidad"
                        label="Responsabilidad"
                        variant="outlined"
                        margin="normal"
                    />

                    <RHFTextField
                        name="numeroJubilacion"
                        label="Número de Jubilación"
                        variant="outlined"
                        margin="normal"
                    />

                    <Divider sx={{ marginY: 2 }} />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <Button variant="contained" color="primary" type="submit">
                            Guardar
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={onClose}>
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </FormProvider>
        </Box>
    );

    return (
        <div>
            <Drawer open={open} onClose={onClose} anchor="right">
                {DrawerList}
            </Drawer>
        </div>
    );
}
