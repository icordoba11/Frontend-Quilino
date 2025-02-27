
import { AxiosResponse } from 'axios';
import instance from '../../configs/constants/axios-config';
import { SettingsItem } from '../types/settings-types';

const settingsService = {
    createArea: async (type: string, area: SettingsItem) => {
        try {
            let endpoint = '';
            switch (type) {
                case 'funcionesDTO':
                    endpoint = '/Areas/crearAreaFuncion';
                    break;
                case 'tiposDTO':
                    endpoint = '/Areas/crearAreaTipo';
                    break;
                case 'areasAdministrativasDTO':
                    endpoint = '/Areas/crearAreaAdministrativa';
                    break;
                case 'categoriasDTO':
                    endpoint = '/Areas/crearAreaCategoria';
                    break;
                case 'ubicacionesTrabajoDTO':
                    endpoint = '/Areas/crearAreaUbicacionTrabajo';
                    break;
                case 'responsabilidadesDTO':
                    endpoint = '/Areas/crearAreaResponsabilidad';
                    break;
                default:
                    throw new Error('Tipo de creación no válido');
            }

            const response: AxiosResponse = await instance.post(endpoint, area);
            return response.data;
        } catch (error: any) {
            return error.response?.data?.message || "Error desconocido desde el servidor";
        }
    },

    updateArea: async (type: string, area: SettingsItem) => {
        try {
            let endpoint = '';
            switch (type) {
                case 'funcionesDTO':
                    endpoint = '/Areas/actualizarAreaFuncion';
                    break;
                case 'tiposDTO':
                    endpoint = '/Areas/actualizarAreaTipo';
                    break;
                case 'areasAdministrativasDTO':
                    endpoint = '/Areas/actualizarAreaAdministrativa';
                    break;
                case 'categoriasDTO':
                    endpoint = '/Areas/actualizarAreaCategoria';
                    break;
                case 'ubicacionesTrabajoDTO':
                    endpoint = '/Areas/actualizarAreaUbicacionTrabajo';
                    break;
                case 'responsabilidadesDTO':
                    endpoint = '/Areas/actualizarAreaResponsabilidad';
                    break;
                default:
                    throw new Error('Tipo de actualización no válido');
            }

            const response: AxiosResponse = await instance.put(endpoint, area);
            return response.data;
        } catch (error: any) {
            return error.response?.data?.message || "Error desconocido desde el servidor";
        }
    },

    findArea: async (type: string, id: number) => {
        try {
            let endpoint = '';
            switch (type) {
                case 'funcionesDTO':
                    endpoint = `/Areas/buscarAreaFuncion?id=${id}`;
                    break;
                case 'tiposDTO':
                    endpoint = `/Areas/buscarAreaTipo?id=${id}`;
                    break;
                case 'areasAdministrativasDTO':
                    endpoint = `/Areas/buscarAreaAreaAdministrativa?id=${id}`;
                    break;
                case 'categoriasDTO':
                    endpoint = `/Areas/buscarAreaCategoria?id=${id}`;
                    break;
                case 'ubicacionesTrabajoDTO':
                    endpoint = `/Areas/buscarAreaUbicacionTrabajo?id=${id}`;
                    break;
                case 'responsabilidadesDTO':
                    endpoint = `/Areas/buscarAreaResponsabilidad?id=${id}`;
                    break;
                default:
                    throw new Error('Tipo de búsqueda no válido');
            }
            const response: AxiosResponse = await instance.get(endpoint);
            return response.data;
        } catch (error: any) {
            return error.response?.data?.message || "Error desconocido desde el servidor";
        }
    }
};

export default settingsService;
