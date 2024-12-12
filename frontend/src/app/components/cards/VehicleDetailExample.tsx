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

export default function VehicleDetailExample({ vehicle }: { vehicle:  Vehicle }) {
    return (
        <div className="max-w-6xl mx-auto p-4">
            {vehicle ? (
                <>
                    <h1 className="text-center text-2xl font-bold my-4">{vehicle.manufacturer} {vehicle.model}</h1>
                    <div className="relative group">
                        <Image
                            src={vehicle.images[0]}
                            alt={`${vehicle.manufacturer} ${vehicle.model}`}
                            layout="responsive"
                            width={800}
                            height={400}
                            className="rounded-lg shadow-lg"
                        />

                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white">
                            <div className="text-center">
                                <h2 className="text-xl font-bold">
                                    {vehicle.manufacturer} {vehicle.model}
                                </h2>
                                <p className="text-lg">Price: ${vehicle.price.toLocaleString()}</p>
                                <p className="text-lg">Year: {vehicle.year}</p>
                                <p className="text-lg">Type: {vehicle.type}</p>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>No vehicle found.</p>
            )}
        </div>
    );
}
