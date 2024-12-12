import { useParams } from 'next/navigation';
import VehicleDetailExample from './cards/VehicleDetailExample';
import VehicleDetailExample1 from './cards/VehicleDetailCard1';
import VehicleDetailCard2 from './cards/VehicleDetailCard2';
import { useVehicleById } from '../hooks/useVehicles';


export default function VehicleList() {
    const params = useParams();
    const id = Array.isArray(params?.id) ? params.id[0] : params?.id;

    const { data: vehicle, isLoading, error } = useVehicleById(id);

    if (isLoading) return <div>Loading vehicle...</div>;
    if (error) return <div>Failed to load vehicle.</div>;

    return (
        <>
            {vehicle &&
                <>
                    <VehicleDetailExample1 vehicle={vehicle} />
                    <VehicleDetailExample vehicle={vehicle} />
                    <VehicleDetailCard2 vehicle={vehicle} />
                </>
            }
        </>
    );
}
