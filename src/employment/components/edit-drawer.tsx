import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import { Empleado, updateEmployeeSchema } from '../types/employee-types';
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


interface EditDrawerProps {
    open: boolean;
    onClose: () => void;
    empleado: Empleado | null;
}

export default function EditDrawer({ open, onClose, empleado }: EditDrawerProps) {
    const { enqueueSnackbar } = useSnackbar();
    const { setEmployees } = useEmployeesContext();

    const methods = useForm<Empleado>({
        defaultValues: {
            nombre: '',
            apellido: '',
            genero: '',
            fechaNacimiento: '',
            celular: '',
            email: '',
        },
    });
    const { handleSubmit, reset } = methods;

    const { data, refetch } = useQuery({
        queryKey: ['getAllEmployeesEdited'],
        queryFn: () => employeeService.getAllEmpleados(),
        enabled: false,
    });

    // const { data: areas, refetch: refetchAreas } = useQuery({
    //     queryKey: ['getAllAreas'],
    //     queryFn: () => employeeService.getAllAreas(),
       
    // });


    useEffect(() => {
        if (empleado) {
            methods.reset({
                nombre: empleado.nombre,
                apellido: empleado.apellido,
                genero: empleado.genero,
                fechaNacimiento: empleado.fechaNacimiento,
                celular: empleado.celular,
                email: empleado.email,
            });
        }
        if (data != undefined) {
            setEmployees(data);
        }
        // if (open) {
        //     refetchAreas();
        //     console.log("areas", areas)
        // }

    }, [empleado, methods, open, data]);

    const updateMutation = useMutation({
        mutationFn: (form: updateEmployeeSchema) =>
            employeeService.updateEmployee(form),
        onSuccess: (data) => {
            if (data.isSuccess) {
                enqueueSnackbar(data.message, { variant: 'success' });
                refetch();
                onClose();
                reset()
                console.log("if", data)
            } else if (!data.isSuccess) {
                console.log("else if", data)
                enqueueSnackbar(data, { variant: 'error' });
            } else {
                console.log("else ", data)
                enqueueSnackbar(data, { variant: 'error' });
            }

        },
        onError: (data: any) => {
            enqueueSnackbar(data, { variant: 'error' });
        },
    });



    const onSubmit = (data: Empleado) => {
        const finalData: updateEmployeeSchema = {
            Identificadores: {
                Id: empleado!.id,
                Legajo: null,
                IdentificadorUnico: null,
                IdentificadorUnicoLaboral: null
            },
            Repetibles: {
                Nombre: null,
                Apellido: null,
                Genero: null,
                CondicionImpositiva: null,
                HorasDiarias: null,
                FechaNacimiento: null,
                FechaIngreso: null,
                TipoEmpleadoId: null,
                AreaAdministrativaId: null,
                CategoriaId: null,
                UbicacionTrabajoId: null,
                ResponsabilidadId: null
            },
            Unicos: {
                Celular: data.celular || null,
                Email: data.email || null,
                NumeroJubilacion: null
            }
        };

        updateMutation.mutate(finalData)
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
                        disabled
                    />
                    <RHFTextField
                        name="apellido"
                        label="Apellido"
                        variant="outlined"
                        margin="normal"
                        disabled
                    />

                    <RHFSelect
                        name="genero"
                        label="Género"
                        defaultValue={empleado?.genero || ''}
                        margin="normal"
                        disabled
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
                        disabled
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
                    <Divider sx={{ marginY: 2 }} />
                    <Stack direction={'row'} spacing={4} >
                        <Button variant="contained" color="primary" type="submit">
                            Guardar
                        </Button>
                        <Button variant="outlined" onClick={onClose}>
                            Cancelar
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
