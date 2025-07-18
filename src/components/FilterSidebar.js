import React from 'react';
import snacks from '../data/snacksData';

const FilterSidebar = ({ filters, setFilters }) => {
  const continents = [...new Set(snacks.map(s => s.continent))];
  const origins = [...new Set(snacks.map(s => s.origin))];
  const flavors = [...new Set(snacks.map(s => s.flavor))];

  return (
    <aside className="w-64 bg-white dark:bg-[#141414] border-r p-4 sticky top-[4.5rem] self-start h-fit shadow-md" data-aos="fade-right">
      <h2 className="text-lg font-semibold mb-4">Filter Snacks</h2>

      {/* Continent Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Continent</label>
        <select
          value={filters.continent}
          onChange={e => setFilters({ ...filters, continent: e.target.value })}
          className="w-full p-2 rounded border dark:bg-[#2a2a2a]"
        >
          <option value="">All</option>
          {continents.map(cont => (
            <option key={cont} value={cont}>{cont}</option>
          ))}
        </select>
      </div>

      {/* Country Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Country</label>
        <select
          value={filters.origin}
          onChange={e => setFilters({ ...filters, origin: e.target.value })}
          className="w-full p-2 rounded border dark:bg-[#2a2a2a]"
        >
          <option value="">All</option>
          {origins.map(origin => (
            <option key={origin} value={origin}>{origin}</option>
          ))}
        </select>
      </div>

      {/* Flavor Filter */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Flavor</label>
        <select
          value={filters.flavor}
          onChange={e => setFilters({ ...filters, flavor: e.target.value })}
          className="w-full p-2 rounded border dark:bg-[#2a2a2a]"
        >
          <option value="">All</option>
          {flavors.map(flavor => (
            <option key={flavor} value={flavor}>{flavor}</option>
          ))}
        </select>
      </div>

      {/* Veg / Non-Veg */}
      <div className="mb-4">
        <label className="block font-medium mb-1">Type</label>
        <div className="flex gap-2">
          <button
            onClick={() => setFilters({ ...filters, isVeg: true })}
            className={`flex-1 p-2 rounded ${filters.isVeg === true ? 'bg-green-500 text-white' : 'bg-gray-100 dark:bg-[#2a2a2a]'}`}
          >
            Veg
          </button>
          <button
            onClick={() => setFilters({ ...filters, isVeg: false })}
            className={`flex-1 p-2 rounded ${filters.isVeg === false ? 'bg-red-500 text-white' : 'bg-gray-100 dark:bg-[#2a2a2a]'}`}
          >
            Non-Veg
          </button>
        </div>
      </div>

      {/* Price Range */}
      <div className="mb-6">
        <label className="block font-medium mb-1">Max Price: ₹{filters.maxPrice}</label>
        <input
          type="range"
          min="0"
          max="300"
          value={filters.maxPrice}
          onChange={e => setFilters({ ...filters, maxPrice: Number(e.target.value) })}
          className="w-full"
        />
      </div>

      {/* Reset Button */}
      <button
        onClick={() => setFilters({ continent: '', origin: '', flavor: '', maxPrice: 300, isVeg: null })}
        className="w-full py-2 bg-gray-200 hover:bg-gray-300 dark:bg-[#333] dark:hover:bg-[#444] rounded transition"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;
