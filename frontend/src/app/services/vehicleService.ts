import apiClient from './apiClient';
import { Vehicle } from '../interfaces/Vehicles.interface';
import {  cleanFilters } from '../utils/cleanFilters';


export async function fetchVehicleById(id: string): Promise<Vehicle> {
  const { data } = await apiClient.get(`/vehicles/${id}`);
  return data;
}

export async function fetchVehicles(filters: Record<string, string | number | undefined>) {
     const filter = cleanFilters(filters);
    const { data } = await apiClient.get('/vehicles', { params: filter });
    return data;
}