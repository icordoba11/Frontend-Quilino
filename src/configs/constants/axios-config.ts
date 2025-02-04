import axios from 'axios';
import { getAuth } from 'firebase/auth';


const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

instance.interceptors.request.use(
  async (config) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();
        config.headers.Authorization = `Bearer ${token}`;
      } catch (error) {
        console.error('Error al obtener el token de Firebase:', error);
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default instance;
