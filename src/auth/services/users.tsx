import axios, { AxiosResponse } from 'axios';
import instance from '../../configs/constants/axios-config';
import { LoginData, UserData } from '../types/types';

const usersService = {

    login: async (loginData: LoginData): Promise<any> => {
        const response: AxiosResponse = await instance.post('user/login', loginData);
        return response.data
    },

    createUser: async (userData: UserData): Promise<any> => {
        const response: AxiosResponse = await instance.post('/user/register', userData);
        return response.data;
    },

};

export default usersService;
