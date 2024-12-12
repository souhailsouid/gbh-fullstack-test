import { useQuery } from '@tanstack/react-query';
import {  fetchVehicleById } from '../services/vehicleService';


export function useVehicleById(id: string | undefined) {
    return useQuery({
        queryKey: ['vehicle', id],
        queryFn: () => {
            if (!id) {
                throw new Error('Vehicle ID is required');
            }
            return fetchVehicleById(id);
        },
        enabled: !!id, 
    });
}
