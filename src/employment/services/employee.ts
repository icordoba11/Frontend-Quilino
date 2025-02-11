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
        try {
            const { data }: any = await instance.post('/EnvioEmpleados/enviarRecibosSueldo',

                {
                    fechaEjecucion: params.fechaEjecucion,
                    fechaLiquidacion: params.fechaLiquidacion,
                    empleadosEnviar: params.empleadosEnviar
                },
                {
                    headers: { 'Content-Type': 'application/json' }
                }
            );
            return data;
        } catch (error) {
            throw error;
        }


    },

    updateEmployee: async (form: updateEmployeeSchema) => {
        try {
            const response: AxiosResponse = await instance.put('/ActualizarEmpleados/actualizarDatosEmpleado', form);
            console.log("response ", response.data)
            return response.data;
        } catch (error: any) {
            const errorMessage = error.response?.data?.message || "Error desconocido desde el servidor";
            return errorMessage
        }


    },
    getAllAreas: async (): Promise<[]> => {
        try {
            const { data }: AxiosResponse = await instance.get('/Areas/buscarAreas');
            console.log(data)
            return data;
        } catch (error) {
            throw error;
        }

    },


};

export default employeeService;




