import instance from '../../configs/constants/axios-config';
import { User } from '../types/types';

const userService = {

    async findAll(): Promise<User[]> {
        try {
            const { data } = await instance.get('/user/all');
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },


    async findById(id: string): Promise<User> {
        try {
            const { data } = await instance.get(`/user/${id}`);
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async getRoleById(uid: string): Promise<string> {
        try {
            const { data } = await instance.get(`/user/role/${uid}`);
            return data; 
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async update(id: string, user: User) {
        try {
            const { data } = await instance.put(`/user/${id}`, user);
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },


    async updatePassword(id: string, newPassword: string) {
        try {
            const { data } = await instance.put(`/user/change-password/${id}`, { newPassword });
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },


};

export default userService;
