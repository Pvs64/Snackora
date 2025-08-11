import React, { useState, useEffect } from "react";

const FilterSidebar = ({ filters, setFilters, snacks = [] }) => {
  const [countries, setCountries] = useState([]);

  // Extract unique filters safely
  const continents = [...new Set(snacks.map((s) => s.continent).filter(Boolean))];
  const categories = [...new Set(snacks.map((s) => s.category).filter(Boolean))];
  const allergensList = [...new Set(snacks.flatMap((s) => s.allergens || []).filter(Boolean))]; // Fixed missing parenthesis

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
    <aside className="sticky top-4 max-h-[calc(100vh-2rem)] overflow-auto p-4 bg-gray-100 rounded-lg shadow">
      <h2 className="font-bold text-lg mb-4">Filters</h2>

      {/* Continent */}
      <label className="block mb-2">
        Continent:
        <select
          value={filters.continent}
          onChange={(e) => updateFilter("continent", e.target.value)}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">All</option>
          {continents.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {/* Country */}
      <label className="block mb-2">
        Country:
        <select
          value={filters.origin}
          onChange={(e) => updateFilter("origin", e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          disabled={!filters.continent}
        >
          <option value="">All</option>
          {countries.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </label>

      {/* Flavor */}
      <label className="block mb-2">
        Flavor:
        <input
          type="text"
          value={filters.flavor}
          onChange={(e) => updateFilter("flavor", e.target.value)}
          className="w-full mt-1 p-2 border rounded"
          placeholder="Search flavors..."
        />
      </label>

      {/* Max Price */}
      <label className="block mb-2">
        Max Price: ${filters.maxPrice}
        <input
          type="range"
          min="0"
          max="300"
          value={filters.maxPrice}
          onChange={(e) => updateFilter("maxPrice", Number(e.target.value))}
          className="w-full mt-1"
        />
      </label>

      {/* Veg / Non-Veg */}
      <label className="block mb-4">
        Veg / Non-Veg:
        <select
          value={filters.isVeg ?? ""}
          onChange={(e) => updateFilter("isVeg", e.target.value === "" ? null : e.target.value === "true")}
          className="w-full mt-1 p-2 border rounded"
        >
          <option value="">All</option>
          <option value="true">Veg</option>
          <option value="false">Non-Veg</option>
        </select>
      </label>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
      >
        Reset Filters
      </button>
    </aside>
  );
};

export default FilterSidebar;