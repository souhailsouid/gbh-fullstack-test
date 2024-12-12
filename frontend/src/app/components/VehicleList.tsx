import Link from 'next/link';
import Image from 'next/image';
import FiltersBar from './FilterBar';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Vehicle } from '../interfaces/Vehicles.interface';
import { fetchVehicles } from '../services/vehicleService';
import Pagination from './Pagination';

export default function VehicleList() {
  const [filters, setFilters] = useState<Record<string, string | number | undefined>>({});
  const [page, setPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [sort, setSort] = useState<string | undefined>('price'); // Default to sorting by price
  const [order, setOrder] = useState<string | undefined>('asc'); // Default to ascending order

  const { data: vehicles, isLoading, error } = useQuery({
    queryKey: ['vehicles', filters, page, itemsPerPage, sort, order],
    queryFn: () => fetchVehicles({ ...filters, page, limit: itemsPerPage, sort, order }),
  });

  const totalPages = vehicles?.totalPages || 1;

  useEffect(() => {
    setPage(1);
  }, [sort, order]);

  if (isLoading) return <div>Loading vehicles...</div>;
  if (error) return <div>No vehicles found with this criteria.</div>;

  return (
    <>
      <FiltersBar
        onApply={(newFilters) => {
          setFilters(newFilters);
          setPage(1); 
        }}
      />

      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white shadow-sm hover:border-gray-300 focus:outline-none"
          >
            <option value="price">Price</option>
            <option value="year">Year</option>
          </select>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Order:</span>
          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white shadow-sm hover:border-gray-300 focus:outline-none"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {vehicles?.data?.map((vehicle: Vehicle) => (
          <div
            key={vehicle.id}
            className="border rounded-lg shadow-md p-4 hover:shadow-lg transition"
          >
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

            <Link
              href={`/vehicles/${vehicle.id}`}
              className="text-blue-500 hover:underline"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>

      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={(newPage) => setPage(newPage)}
        itemsPerPage={itemsPerPage}
        onItemsPerPageChange={(newLimit) => {
          setItemsPerPage(newLimit);
          setPage(1);
        }}
      />
    </>
  );
}
