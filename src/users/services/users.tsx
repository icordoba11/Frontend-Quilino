import instance from '../../configs/constants/axios-config';
import { User } from '../types/types';

const userService = {

    async createUser(nombreUsuario: string, email: string, password: string): Promise<any> {
        try {
            const { data } = await instance.post('/Accesos/registro', {
                NombreUsuario: nombreUsuario,
                Email: email,
                Rol: 'Usuario',
                Contrasena: password,
            });
            return data;

        } catch (error) {
            return Promise.reject(error);
        }
    },

    async findAll(): Promise<User[]> {
        try {
            const { data } = await instance.get('/Accesos/buscadorUsuarios');
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async updateRole(id: number, rol: string) {
        try {
            const { data } = await instance.put('/Accesos/actualizarRol', {
                Id: id,
                Rol: rol
            });
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },


    async findById(id: number): Promise<User> {
        try {
            const { data } = await instance.get(`/Accesos/buscadorUsuario`, {
                params: { id }
            });
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },


    async updatePassword(id: number, oldPassword: string, newPassword: string) {
        try {
            const { data } = await instance.put(`/Accesos/actualizarContrasena`, {
                Id: id,
                ContrasenaActual: oldPassword,
                ContrasenaNueva: newPassword
            });
            return data;

        } catch (error) {
            return Promise.reject(error);
        }
    },


};

export default userService;
