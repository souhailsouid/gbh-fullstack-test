import apiClient from './apiClient';
import { Vehicle } from '../interfaces/Vehicles.interface';
import { cleanFilters } from '../utils/cleanFilters';
import { handleAxiosError } from '../utils/errorHandler';

export async function fetchVehicleById(id: string): Promise<Vehicle> {
  try {
    const { data } = await apiClient.get(`/vehicles/${id}`);
    return data;
  } catch (error) {
    const message = handleAxiosError(error);
    throw new Error(message); 
  }
}

export async function fetchVehicles(filters: Record<string, string | number | undefined>) {
  try {
    const filter = cleanFilters(filters);
    const { data } = await apiClient.get('/vehicles', { params: filter });
    return data;
  } catch (error) {
    const message = handleAxiosError(error);
    throw new Error(message); 
  }
}