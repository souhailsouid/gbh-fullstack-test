import { useState } from 'react';

export default function FiltersBar({ onApply }: { onApply: (filters: Record<string, string | number | undefined>) => void }) {
    const [manufacturer, setManufacturer] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [year, setYear] = useState<number | undefined>(undefined);
    const [priceMin, setPriceMin] = useState<number | undefined>(undefined);
    const [priceMax, setPriceMax] = useState<number | undefined>(undefined);

    const handleApplyFilters = () => {
        onApply({
            manufacturer,
            type,
            year,
            priceMin,
            priceMax,
        });
    };

    return (
        <div className="p-4 bg-white shadow-md rounded-md mb-6">
            <h2 className="text-xl font-bold mb-4">Filters</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Manufacturer</label>
                    <input
                        type="text"
                        value={manufacturer}
                        onChange={(e) => setManufacturer(e.target.value)}
                        className="border rounded-md p-2 w-full"
                        placeholder="e.g., Tesla"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Type</label>
                    <select
                        value={type}
                        onChange={(e) => setType(e.target.value)}
                        className="border rounded-md p-2 w-full"
                    >
                        <option value="">All</option>
                        <option value="ELECTRIC">Electric</option>
                        <option value="SUV">SUV</option>
                        <option value="SEDAN">Sedan</option>
                        <option value="SPORTS">Sports</option>
                        <option value="TRUCK">Truck</option>
                        <option value="LUXURY">Luxury</option>
                    </select>
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Year</label>
                    <input
                        type="number"
                        value={year || ''}
                        onChange={(e) => setYear(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                        className="border rounded-md p-2 w-full"
                        placeholder="e.g., 2022"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Min Price</label>
                    <input
                        type="number"
                        value={priceMin || ''}
                        onChange={(e) => setPriceMin(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                        className="border rounded-md p-2 w-full"
                        placeholder="e.g., 30000"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Max Price</label>
                    <input
                        type="number"
                        value={priceMax || ''}
                        onChange={(e) => setPriceMax(e.target.value ? parseInt(e.target.value, 10) : undefined)}
                        className="border rounded-md p-2 w-full"
                        placeholder="e.g., 100000"
                    />
                </div>
            </div>
            <button
                onClick={handleApplyFilters}
                className="mt-4 bg-white-600 text-black px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-100"
            >
                Apply Filters
            </button>
        </div>
    );
}
