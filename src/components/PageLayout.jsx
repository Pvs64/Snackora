import React, { useState } from "react";
import snacks from "../data/snacksData";
import FilterSidebar from "./FilterSidebar";
import SnackList from "./SnackList";

const PageLayout = () => {
  const [filters, setFilters] = useState({
    continent: "",
    country: "",
    category: "",
    rating: "",
    allergen: "",
    isVeg: "",
  });

  return (
    <div className="container mx-auto p-4 flex gap-6">
      <div className="w-64 flex-shrink-0">
        <FilterSidebar
          filters={filters}
          setFilters={setFilters}
          snacks={snacks}
        />
      </div>
      <div className="flex-1">
        <SnackList snacks={snacks} filters={filters} />
      </div>
    </div>
  );
};

export default PageLayout;
