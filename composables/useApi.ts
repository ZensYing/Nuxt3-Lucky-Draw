// import axios from 'axios';
// import type { IAPIOption } from '~/types/api';
// export const useApi = async <T>(endpoint: string, options: IAPIOption) => {
//   const baseUrl = useRuntimeConfig().public.API_BASE_URL;
//   const token = 'useAuthStore().accessToken';
//   if (!options.headers)
//     options.headers = token ? { Authorization: `Bearer ${token}` } : {};
//   options.withCredentials = true;
//   try {
//     const response = await axios<T>(baseUrl + endpoint, options);
//     return response.data;
//   } catch (error) {
//     return Promise.reject(error);
//   }
// };
import axios from 'axios';
import type { IAPIOption } from '~/types/api';

export const useApi = async <T>(endpoint: string, options: IAPIOption) => {
  const baseUrl = useRuntimeConfig().public.API_BASE_URL;
  const response = await axios<T>(baseUrl + endpoint, options);
  return response.data;
};
export const useNestApi = async <T>(endpoint: string, options: IAPIOption) => {
  const nestBaseUrl = useRuntimeConfig().public.NEST_API_BASE_URL; // NestJS API
  const response = await axios<T>(nestBaseUrl + endpoint, options);
  return response.data;
};