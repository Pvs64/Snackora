import React from "react";

const SnackList = ({ snacks, filters }) => {
  const filteredSnacks = snacks.filter((snack) => {
    if (filters.continent && snack.continent !== filters.continent) return false;
    if (filters.country && snack.origin !== filters.country) return false;
    if (filters.category && snack.category !== filters.category) return false;
    if (filters.rating && snack.rating < Number(filters.rating)) return false;
    if (filters.allergen && snack.allergens.includes(filters.allergen))
      return false;
    if (filters.isVeg !== "" && snack.isVeg !== (filters.isVeg === "true"))
      return false;
    return true;
  });

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {filteredSnacks.length === 0 ? (
        <p>No snacks match your filters.</p>
      ) : (
        filteredSnacks.map((snack) => (
          <div
            key={snack.id}
            className="border rounded-lg p-4 shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold text-lg">{snack.name}</h3>
            <p className="text-sm text-gray-600">{snack.origin}</p>
            <p className="mt-1">Category: {snack.category}</p>
            <p>Rating: {snack.rating}</p>
            <p>Veg: {snack.isVeg ? "Yes" : "No"}</p>
            <p>Allergens: {snack.allergens.join(", ") || "None"}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default SnackList;
