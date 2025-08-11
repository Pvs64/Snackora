import React, { useState, useEffect } from "react";

const FilterSidebar = ({ filters, setFilters, snacks = [] }) => {
  const [countries, setCountries] = useState([]);

  // Extract unique filters safely
  const continents = [...new Set(snacks.map((s) => s.continent).filter(Boolean))];
  const categories = [...new Set(snacks.map((s) => s.category).filter(Boolean))];
  const allergensList = [...new Set(snacks.flatMap((s) => s.allergens || []).filter(Boolean))];

  // Update countries list when continent changes
  useEffect(() => {
    if (filters.continent) {
      const filteredCountries = [
        ...new Set(
          snacks
            .filter((s) => s.continent === filters.continent)
            .map((s) => s.origin)
            .filter(Boolean)
        ),
      ];
      setCountries(filteredCountries);
    } else {
      setCountries([]);
    }
  }, [filters.continent, snacks]);

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const resetFilters = () => {
    setFilters({
      continent: "",
      origin: "",
      flavor: "",
      maxPrice: 300,
      isVeg: null,
    });
  };

  return (
    <aside className="sticky top-16 md:top-20 h-[calc(100vh-4rem)] md:h-[calc(100vh-5rem)] overflow-y-auto p-4 md:p-6 
                     bg-white dark:bg-gray-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700
                     transition-colors duration-200">
      <div className="space-y-4 md:space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="font-bold text-lg md:text-xl text-gray-800 dark:text-gray-100">Filters</h2>
          <button
            onClick={resetFilters}
            className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 hover:underline"
          >
            Reset all
          </button>
        </div>

        {/* Continent */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Continent</label>
          <select
            value={filters.continent}
            onChange={(e) => updateFilter("continent", e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                      focus:ring-blue-500 focus:border-blue-500
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">All Continents</option>
            {continents.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Country */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Country</label>
          <select
            value={filters.origin}
            onChange={(e) => updateFilter("origin", e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                      focus:ring-blue-500 focus:border-blue-500 disabled:opacity-50
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            disabled={!filters.continent}
          >
            <option value="">All Countries</option>
            {countries.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Flavor */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Flavor</label>
          <input
            type="text"
            value={filters.flavor}
            onChange={(e) => updateFilter("flavor", e.target.value)}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                      focus:ring-blue-500 focus:border-blue-500
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            placeholder="Search flavors..."
          />
        </div>

        {/* Max Price */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Max Price: <span className="font-semibold">${filters.maxPrice}</span>
          </label>
          <input
            type="range"
            min="0"
            max="300"
            value={filters.maxPrice}
            onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-gray-600 rounded-lg appearance-none cursor-pointer
                      [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4
                      [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-blue-600 dark:[&::-webkit-slider-thumb]:bg-blue-400"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
            <span>$0</span>
            <span>$300</span>
          </div>
        </div>

        {/* Veg / Non-Veg */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Dietary</label>
          <select
            value={filters.isVeg ?? ""}
            onChange={(e) => updateFilter("isVeg", e.target.value === "" ? null : e.target.value === "true")}
            className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                      focus:ring-blue-500 focus:border-blue-500
                      bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            <option value="">All Options</option>
            <option value="true">Vegetarian</option>
            <option value="false">Non-Vegetarian</option>
          </select>
        </div>

        {/* Categories (if needed) */}
        {categories.length > 0 && (
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Category</label>
            <select
              value={filters.category || ""}
              onChange={(e) => updateFilter("category", e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm 
                        focus:ring-blue-500 focus:border-blue-500
                        bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>
    </aside>
  );
};

export default FilterSidebar;