import { AxiosResponse } from 'axios';
import instance from '../../configs/constants/axios-config';



const uploadService = {

    importPdf: async (file: File) => {
        const formData = new FormData();
        formData.append('archivo', file);

        const { data }: AxiosResponse = await instance.post('/Archivos/importarPdf', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
        return data;

    }

};

export default uploadService;
