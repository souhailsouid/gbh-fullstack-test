import Image from 'next/image';
import Link from 'next/link';

interface VehicleCardProps {
  vehicle: {
    id: string;
    images: string[];
    manufacturer: string;
    model: string;
    type: string;
    year: number;
    price: number;
    fuelType: string;
    features: string[];
  };
}

export default function VehicleCard({ vehicle }: VehicleCardProps) {
  return (
    <div className="border rounded-lg shadow-md p-4 hover:shadow-lg transition">
      {vehicle.images.length ? (
        <Image
          src={vehicle.images[0]} 
          alt={`${vehicle.manufacturer} ${vehicle.model}`}
          width={500}
          height={300}
          className="w-full h-48 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-48 bg-gray-200 rounded-md flex items-center justify-center">
          <span>No Image Available</span>
        </div>
      )}

      <h2 className="text-xl font-bold mb-2">
        {vehicle.manufacturer} {vehicle.model}
      </h2>
      <p className="text-gray-700 mb-1">Type: {vehicle.type}</p>
      <p className="text-gray-700 mb-1">Year: {vehicle.year}</p>
      <p className="text-gray-700 mb-1">Price: ${vehicle.price.toLocaleString()}</p>
      <p className="text-gray-700 mb-1">Fuel: {vehicle.fuelType}</p>
      <p className="text-gray-700 mb-4">
        Features: {vehicle.features.slice(0, 3).join(', ')}...
      </p>
      <Link href={`/vehicles/${vehicle.id}`} className="text-blue-500 hover:underline">
        View Details
      </Link>
    </div>
  );
}
