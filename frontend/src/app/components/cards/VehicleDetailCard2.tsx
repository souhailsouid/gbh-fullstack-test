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

export default function VehicleDetailCard2({ vehicle }: { vehicle: Vehicle }) {
    return (
        <div className="container mx-auto px-4 lg:px-16 py-8">
            {vehicle ? (
                <div className="bg-white shadow-lg rounded-lg overflow-hidden flex flex-col lg:flex-row">
                    <div className="relative w-full lg:w-1/2 h-64 lg:h-auto">
                        <Image
                            src={vehicle.images[0]}
                            alt={`${vehicle.manufacturer} ${vehicle.model}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-l-lg"
                            priority
                        />
                    </div>

                    <div className="flex-1 p-6 lg:p-10">
                        <h1 className="text-3xl font-bold mb-4">
                            {vehicle.manufacturer} {vehicle.model}
                        </h1>
                        <p className="text-gray-700 mb-6">{vehicle.description}</p>


                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3 lg:gap-6">
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

                        <div className="mt-8">
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
