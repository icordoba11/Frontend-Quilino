import axios, { AxiosResponse } from 'axios';
import instance from '../../configs/constants/axios-config';
import { LoginData, UserData } from '../types/types';

const loginService = {

    checkUsersExist: async () => {
        const url = `${import.meta.env.VITE_API_BASE_URL}${import.meta.env.VITE_API_BOOL_INICIAL}`;
        const response = await axios.get(url);
        return response.data;
    },


    login: async (loginData: LoginData): Promise<any> => {
        const response: AxiosResponse = await instance.post('/Accesos/login', loginData);

        return response.data
    },

    createFirstUser: async (userData: UserData): Promise<any> => {
        const response: AxiosResponse = await instance.post('/Accesos/registroInicial', userData);
        return response.data;
    },

    createUser: async (userData: UserData): Promise<any> => {
        const response: AxiosResponse = await instance.post('/Accesos/registro', userData);

        return response.data;
    },


    passwordRecoverEmail: async (email: string) => {
        try {
            const response: AxiosResponse = await instance.post('/Accesos/emailRecuperacion', {
                Email: email,
                Url: 'http://localhost:5173/auth/reset-password?token='
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }

    },

    verifyToken: async (token: string) => {
        try {
            const response = await instance.get('/Accesos/estadoRecuperarContrasena', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            return response.data;
        } catch (error) {
            return Promise.reject(error);
        }

    },

    resetPassword: async (id: number, newPassword: string, token: string): Promise<any> => {
        try {
            const response: AxiosResponse = await instance.put('/Accesos/recuperarContrasena',
                {
                    Id: id,
                    Contrasena: newPassword,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "application/json",
                    },
                }
            );
            return response;

        } catch (error) {
            return Promise.reject(error);
        }
    },


};

export default loginService;
