import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Empleado, FormValues, updateEmployeeSchema } from '../types/employee-types';
import { useForm, FormProvider } from 'react-hook-form';
import RHFTextField from '../../shared/components/form/rhf-text-field';
import { useEffect } from 'react';
import { RHFSelect } from '../../shared/components/form/rhf-select';
import MenuItem from '@mui/material/MenuItem';
import headerImg from '../../assets/images/editDrawerHeader.png'
import Stack from '@mui/material/Stack';
import { useMutation, useQuery } from '@tanstack/react-query';
import employeeService from '../services/employee';
import { useSnackbar } from 'notistack';
import { useEmployeesContext } from './provider/employee-context';
import CircularProgress from '@mui/material/CircularProgress';


interface EditDrawerProps {
    open: boolean;
    onClose: () => void;
    empleado: Empleado | null;
}

export default function EditDrawer({ open, onClose, empleado }: EditDrawerProps) {
    const { enqueueSnackbar } = useSnackbar();
    const { setEmployees } = useEmployeesContext();

    const methods = useForm<FormValues>({
        defaultValues: {
            nombre: null,
            apellido: null,
            genero: null,
            fechaNacimiento: null,
            celular: null,
            email: null,
            horasDiarias: null,
            fechaIngreso: null,
            condicionImpositiva: null,
            categoria: null,
            funcion: null,
            tipo: null,
            areaAdministrativa: null,
            ubicacionTrabajo: null,
            responsabilidad: null,
        },
    });
    const { handleSubmit, reset, formState: { isValid } } = methods;

    const { data, refetch } = useQuery({
        queryKey: ['getAllEmployeesEdited'],
        queryFn: () => employeeService.getAllEmpleados(),
        enabled: false,
    });

    const { data: areas, refetch: refetchAreas } = useQuery({
        queryKey: ['getAllAreas'],
        queryFn: () => employeeService.getAllAreas(),
        enabled: false,
    });


    useEffect(() => {
        if (empleado) {
            methods.reset({
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                genero: empleado.genero,
                fechaNacimiento: empleado.fechaNacimiento,
                celular: empleado.celular,
                email: empleado.email,
                horasDiarias: empleado.horasDiarias,
                fechaIngreso: empleado.fechaIngreso,
                condicionImpositiva: empleado.condicionImpositiva,
                categoria: empleado.categoria.id,
                funcion: empleado.funcion.id,
                tipo: empleado.tipo.id,
                areaAdministrativa: empleado.areaAdministrativa.id,
                ubicacionTrabajo: empleado.ubicacionTrabajo.id,
                responsabilidad: empleado.responsabilidad.id,
            });
        }
        if (data != undefined) {
            setEmployees(data);
           

        }
        if (open) {
            refetchAreas();
        }



    }, [empleado, methods, open, data]);

    const updateMutation = useMutation({
        mutationFn: (form: updateEmployeeSchema) =>
            employeeService.updateEmployee(form),
        onSuccess: (data) => {
            if (data.isSuccess) {
                enqueueSnackbar(data.message, { variant: 'success' });
                refetch();
                onClose();
                reset();
            } else if (!data.isSuccess) {
                enqueueSnackbar(data, { variant: 'error' });
            } else {
                enqueueSnackbar(data, { variant: 'error' });
            }

        },
        onError: (data: any) => {
            enqueueSnackbar(data, { variant: 'error' });
        },
    });



    const onSubmit = (data: FormValues) => {
        const finalData: updateEmployeeSchema = {
            Identificadores: {
                Id: empleado!.id,
                Legajo: null,
                IdentificadorUnico: null,
                IdentificadorUnicoLaboral: null
            },
            Repetibles: {
                Nombre: data.nombre !== empleado?.nombre ? data.nombre : null,
                Apellido: data.apellido !== empleado?.apellido ? data.apellido : null,
                Genero: data.genero !== empleado?.genero ? data.genero : null,
                CondicionImpositiva: data.condicionImpositiva !== empleado?.condicionImpositiva ? data.condicionImpositiva : null,
                HorasDiarias: data.horasDiarias !== empleado?.horasDiarias ? data.horasDiarias : null,
                FechaNacimiento: data.fechaNacimiento &&
                    new Date(data.fechaNacimiento).toISOString().split('T')[0] !==
                    new Date(empleado?.fechaNacimiento!).toISOString().split('T')[0]
                    ? new Date(data.fechaNacimiento).toISOString() : null,

                FechaIngreso: data.fechaIngreso &&
                    new Date(data.fechaIngreso).toISOString().split('T')[0] !==
                    new Date(empleado?.fechaIngreso!).toISOString().split('T')[0]
                    ? new Date(data.fechaIngreso).toISOString() : null,
                FuncionId: data.funcion !== empleado?.funcion.id ? data.funcion : null,
                TipoEmpleadoId: data.tipo !== empleado?.tipo.id ? data.tipo : null,
                AreaAdministrativaId: data.areaAdministrativa !== empleado?.areaAdministrativa.id ? data.areaAdministrativa : null,
                CategoriaId: data.categoria !== empleado?.categoria.id ? data.categoria : null,
                UbicacionTrabajoId: data.ubicacionTrabajo !== empleado?.ubicacionTrabajo.id ? data.ubicacionTrabajo : null,
                ResponsabilidadId: data.responsabilidad !== empleado?.responsabilidad.id ? data.responsabilidad : null
            },
            Unicos: {
                Celular: data.celular !== empleado?.celular ? data.celular : null,
                Email: data.email !== empleado?.email ? data.email : null,
                NumeroJubilacion: null
            }

        };

        updateMutation.mutate(finalData)
    };



    const DrawerList = (
        <Box sx={{ width: 370, mt: 10, p: 3 }} role="presentation">
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

                    <Typography variant="h6" gutterBottom>
                        Informacion Laboral
                    </Typography>
                    <Divider sx={{ marginY: 2 }} />

                    <RHFTextField
                        name="fechaIngreso"
                        label="Fecha de ingreso"
                        variant="outlined"
                        margin="normal"
                    />

                    <RHFTextField
                        name="horasDiarias"
                        label="Horas diarias"
                        variant="outlined"
                        margin="normal"

                    />
                    <RHFTextField
                        name="condicionImpositiva"
                        label="Condicion impositiva"
                        variant="outlined"
                        margin="normal"

                    />

                    <RHFSelect
                        name="funcion"
                        label="Funcion"
                        defaultValue={empleado?.funcion?.id ? String(empleado.funcion.id) : ''}
                        margin="normal"
                    >
                        <MenuItem value="0">Sin función asignada</MenuItem>
                        {(areas as Record<string, any>)?.funcionesDTO?.map((funcion: any) => (
                            <MenuItem key={funcion.id} value={String(funcion.id)}>
                                {funcion.nombre}
                            </MenuItem>
                        ))}
                    </RHFSelect>

                    <RHFSelect
                        name="tipo"
                        label="Tipo de empleado"
                        defaultValue={empleado?.tipo.id ? String(empleado?.tipo.id) : ''}
                        margin="normal"
                    >
                        {(areas as Record<string, any>)?.tiposDTO?.map((tipo: any) => (
                            <MenuItem key={tipo.id} value={String(tipo.id)}>
                                {tipo.nombre}
                            </MenuItem>
                        ))}
                    </RHFSelect>

                    <RHFSelect
                        name="categoria"
                        label="Categoria"
                        defaultValue={empleado?.categoria.id ? String(empleado?.categoria.id) : ''}
                        margin="normal"
                    >
                        {(areas as Record<string, any>)?.categoriasDTO?.map((categoria: any) => (
                            <MenuItem key={categoria.id} value={String(categoria.id)}>
                                {categoria.nombre}
                            </MenuItem>
                        ))}
                    </RHFSelect>

                    <RHFSelect
                        name="areaAdministrativa"
                        label="Area administrativa"
                        defaultValue={empleado?.areaAdministrativa.id ? String(empleado?.areaAdministrativa.id) : ''}
                        margin="normal"
                    >
                        {(areas as Record<string, any>)?.areasAdministrativasDTO?.map((areaAdministrativa: any) => (
                            <MenuItem key={areaAdministrativa.id} value={String(areaAdministrativa.id)}>
                                {areaAdministrativa.nombre}
                            </MenuItem>
                        ))}
                    </RHFSelect>


                    <RHFSelect
                        name="ubicacionTrabajo"
                        label="Ubicacion laboral"
                        defaultValue={empleado?.ubicacionTrabajo.id ? String(empleado?.ubicacionTrabajo.id) : ''}
                        margin="normal"
                    >
                        {(areas as Record<string, any>)?.ubicacionesTrabajoDTO?.map((ubicacionTrabajo: any) => (
                            <MenuItem key={ubicacionTrabajo.id} value={String(ubicacionTrabajo.id)}>
                                {ubicacionTrabajo.nombre}
                            </MenuItem>
                        ))}
                    </RHFSelect>

                    <RHFSelect
                        name="responsabilidad"
                        label="Responsabilidad"
                        defaultValue={empleado?.responsabilidad.id ? String(empleado?.responsabilidad.id) : ''}
                        margin="normal"
                    >
                        {(areas as Record<string, any>)?.responsabilidadesDTO?.map((responsabilidad: any) => (
                            <MenuItem key={responsabilidad.id} value={String(responsabilidad.id)}>
                                {responsabilidad.categoria}
                            </MenuItem>
                        ))}
                    </RHFSelect>

                    <Stack direction={'row'} spacing={2} sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }} >

                        <Button variant="outlined" color='error' onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button
                            variant="contained"
                            color="primary"
                            type="submit"
                            loading={updateMutation.isPending}
                            disabled={!isValid || updateMutation.isPending}
                            style={{ minWidth: '100px' }}
                        >
                            {updateMutation.isPending ? <CircularProgress size={24} /> : 'Guardar'}
                        </Button>
                    </Stack>
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
