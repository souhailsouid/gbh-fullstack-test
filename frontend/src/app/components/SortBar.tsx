interface SortBarProps {
    sort: string | undefined;
    order: string | undefined;
    onSortChange: (newSort: string) => void;
    onOrderChange: (newOrder: string) => void;
  }
  
  const SortBar = ({ sort, order, onSortChange, onOrderChange }: SortBarProps) => {
    return (
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-2">
          <span className="text-gray-700">Sort by:</span>
          <select
            value={sort}
            onChange={(e) => onSortChange(e.target.value)}
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
            onChange={(e) => onOrderChange(e.target.value)}
            className="px-3 py-2 border rounded-md bg-white shadow-sm hover:border-gray-300 focus:outline-none"
          >
            <option value="asc">Ascending</option>
            <option value="desc">Descending</option>
          </select>
        </div>
      </div>
    );
  };
  
  export default SortBar;
  