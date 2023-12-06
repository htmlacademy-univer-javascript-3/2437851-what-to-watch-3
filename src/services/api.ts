// eslint-disable-next-line @typescript-eslint/no-unused-vars
import axios, {AxiosError, AxiosInstance} from 'axios';

const BACKEND_URL = 'https://13.design.pages.academy/wtw';
const REQUEST_TIMEOUT = 5000;

export const createAPI = (): AxiosInstance => {
  const api = axios.create({
    baseURL: BACKEND_URL,
    timeout: REQUEST_TIMEOUT,
  });

  // api.interceptors.response.use(
  //   (response) => response,
  //   (error: AxiosError<{
  //     errorType: string;
  //     message: string;
  //   }>) => {
  //     // eslint-disable-next-line no-console
  //     console.log(error.response?.data);
  //     if (error.response?.status !== 401) {
  //       throw error;
  //     }
  //   }
  // );

  return api;
};
