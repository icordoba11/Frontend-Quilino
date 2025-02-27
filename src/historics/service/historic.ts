import instance from '../../configs/constants/axios-config';


const historicService = {

    async findById(id: number): Promise<any> {
        try {
            const { data } = await instance.get('/RecibosDeSueldo/listarRecibosHistoricos', {
                params: { id }
            });
            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    },

    async showPdf(id: number, fechaLiquidacion: string): Promise<any> {
        try {
            const { data } = await instance.get('/RecibosDeSueldo/verReciboHistorico', {
                params: { id, fechaLiquidacion },
                responseType: 'blob',
            });

            const fileURL = window.URL.createObjectURL(new Blob([data], { type: 'application/pdf' }));
            window.open(fileURL);

            return data;
        } catch (error) {
            return Promise.reject(error);
        }
    }


};

export default historicService;
