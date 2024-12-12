import Image from 'next/image';

interface Vehicle {
    images: string[];
    manufacturer: string;
    model: string;
    description: string;
    price: number;
    year: number;
    type: string;
    fuelType: string;
    transmission: string;
    mileage?: number;
    features: string[];
}

export default function VehicleDetailCard1({ vehicle }: { vehicle: Vehicle }) {
    return (
        <div className="max-w-6xl mx-auto p-6">
            {vehicle ? (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                    <div className="relative w-full h-60 md:h-80">
                        <Image
                            src={vehicle.images[0]}
                            alt={`${vehicle.manufacturer} ${vehicle.model}`}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>
                    <div className="p-6">
                        <h1 className="text-2xl font-bold mb-2">
                            {vehicle.manufacturer} {vehicle.model}
                        </h1>
                        <p className="text-gray-700 mb-4">{vehicle.description}</p>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-500">Price</p>
                                <p className="font-bold">${vehicle.price.toLocaleString()}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Year</p>
                                <p className="font-bold">{vehicle.year}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Type</p>
                                <p className="font-bold">{vehicle.type}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Fuel Type</p>
                                <p className="font-bold">{vehicle.fuelType}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Transmission</p>
                                <p className="font-bold">{vehicle.transmission}</p>
                            </div>
                            {vehicle.mileage && (
                                <div>
                                    <p className="text-sm text-gray-500">Mileage</p>
                                    <p className="font-bold">{vehicle.mileage.toLocaleString()} km</p>
                                </div>
                            )}
                        </div>
                        <div className="mt-4">
                            <p className="text-sm text-gray-500">Features</p>
                            <ul className="list-disc list-inside text-gray-700">
                                {vehicle.features.map((feature, index) => (
                                    <li key={index}>{feature}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

            ) : (
                <p>No vehicle found.</p>
            )}
        </div>
    );
}
