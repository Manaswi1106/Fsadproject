import React from 'react';
import { Search, Filter, SlidersHorizontal, RotateCcw } from 'lucide-react';

interface SearchFilterProps {
  onSearch: (name: string) => void;
  onFilter: (min: number, max: number) => void;
  onReset: () => void;
}

export const SearchFilter: React.FC<SearchFilterProps> = ({ onSearch, onFilter, onReset }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [minMarks, setMinMarks] = React.useState('');
  const [maxMarks, setMaxMarks] = React.useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  const handleFilter = (e: React.FormEvent) => {
    e.preventDefault();
    onFilter(Number(minMarks) || 0, Number(maxMarks) || 100);
  };

  const reset = () => {
    setSearchTerm('');
    setMinMarks('');
    setMaxMarks('');
    onReset();
  };

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-6">
      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search students by name..."
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
        />
      </form>

      {/* Filter */}
      <form onSubmit={handleFilter} className="flex items-center gap-2">
        <div className="flex items-center border border-gray-300 rounded-lg px-2 py-1 bg-white">
          <SlidersHorizontal className="w-4 h-4 text-gray-400 mr-2" />
          <input
            type="number"
            placeholder="Min"
            value={minMarks}
            onChange={(e) => setMinMarks(e.target.value)}
            className="w-16 outline-none text-sm"
          />
          <span className="text-gray-300 mx-1">-</span>
          <input
            type="number"
            placeholder="Max"
            value={maxMarks}
            onChange={(e) => setMaxMarks(e.target.value)}
            className="w-16 outline-none text-sm"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter
        </button>
        <button
          type="button"
          onClick={reset}
          className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-all"
          title="Reset All"
        >
          <RotateCcw className="w-4 h-4" />
        </button>
      </form>
    </div>
  );
};
