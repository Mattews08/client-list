import axios from 'axios';
import { Client } from '../types';

export const fetchClients = async (): Promise<Client[]> => {
  const response = await axios.get('/clients');
  return response.data;
};

export const getClient = async (id: number): Promise<Client> => {
  const response = await axios.get(`/clients/${id}`);
  return response.data;
};

export const createClient = async (client: Client): Promise<Client> => {
  const response = await axios.post('/clients', client);
  return response.data;
};

export const updateClient = async (id: number, client: Client): Promise<Client> => {
  const response = await axios.put(`/clients/${id}`, client);
  return response.data;
};

export const deleteClient = async (id: number): Promise<void> => {
  await axios.delete(`/clients/${id}`);
};
