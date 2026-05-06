import axios from 'axios';
import { Product } from '../_types/Product';
import { Application } from '../_types/Application';

const DEFAULT_HEADERS = {
  'Accept': 'application/json',
  'Content-Type': 'application/json',
  'X-Nesto-Candidat': 'Sardor Isakov',
};

const api = axios.create({
  baseURL: `https://nesto-fe-exam.vercel.app/api`,
  headers: {
    ...DEFAULT_HEADERS,
  },
  timeout: 25000,
});


export const getProducts = async (): Promise<Product[]> => {
  const response = await api.get('/products');
  return response.data;
};
export const getApplications = async (): Promise<Application[]> => {
  const response = await api.get('/applications');
  return response.data;
};

export const createApplication = async (productId: any) => {
  try {
    const response = await api.post(`/applications`, { productId });

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const updateApplication = async (application: Application) => {
  try {
    const response = await api.put(`/applications/${application.id}`, application);

    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const getApplication = async (id: any): Promise<Application> => {
  const response = await api.get(`/applications/${id}`);
  return response.data;
};



