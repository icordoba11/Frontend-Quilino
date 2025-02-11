import { AxiosResponse } from 'axios';
import instance from '../../configs/constants/axios-config';
import { Empleado, SendEmployeesDateConvert, updateEmployeeSchema } from '../types/employee-types';


const employeeService = {

    getAllEmpleados: async (): Promise<Empleado[]> => {
        const { data }: AxiosResponse<Empleado[]> = await instance.get('/BuscadorEmpleados/buscarEmpleados');
        return data;
    },

    getEmpleadosByName: async (params: { busquedaEmpleado: string; area: string }) => {
        const { data }: AxiosResponse<Empleado[]> = await instance.get('/BuscadorEmpleados/buscarEmpleado', { params });
        return data;
    },

    getEmpleadosByLegajo: async (params: { legajoMin: string; legajoMax: string; area: string }) => {
        try {

            if (!params.legajoMin || !params.legajoMax) {
                throw new Error("Ambos legajos (legajoMin y legajoMax) son requeridos");
            }

            const { data }: AxiosResponse<Empleado[]> = await instance.get('/BuscadorEmpleados/buscarRangoLegajos', { params });
            return data;

        } catch (error) {
            throw error;
        }
    },

    getEmpleadosByFechaLiquidacion: async (params: { fechaLiquidacion: string; area: string }) => {
        const { data }: AxiosResponse<Empleado[]> = await instance.get('/BuscadorEmpleados/buscarFechaLiquidacion', { params });
        return data;
    },

    programarEnvioRecibosSueldo: async (params: SendEmployeesDateConvert) => {
        const { data }: any = await instance.post('/EnvioEmpleados/enviarRecibosSueldo', params, {
            headers: { 'Content-Type': 'application/json' }
        });
        return data;
    },

    updateEmployee: async (form: updateEmployeeSchema) => {
        const { data }: AxiosResponse = await instance.put('/ActualizarEmpleados/actualizarDatosEmpleado', form);
        console.log(data);
        return data;

    }

};

export default employeeService;
