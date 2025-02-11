import instance from '../../configs/constants/axios-config';


const historicService = {



    async findById(id: number): Promise<any> {
        try {
            const { data } = await instance.get('/RecibosHistoricos/listarRecibosHistoricos', {
                params: { id }
            });
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },


};

export default historicService;
