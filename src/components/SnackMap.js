import React from 'react';

const continents = [
  { name: 'Asia', image: '/images/asia.jpg' },
  { name: 'Europe', image: '/images/europe.jpg' },
  { name: 'North America', image: '/images/north-america.jpg' },
  { name: 'Africa', image: '/images/africa.jpg' },
];

const SnackMap = ({ setFilters }) => {
  const handleContinentClick = (continent) => {
    setFilters(prev => ({ ...prev, continent}));
  };

  return (
    <section className="text-center py-10 px-4 bg-orange-50 dark:bg-[#181818]" data-aos="zoom-in">
      <h2 className="text-3xl font-bold mb-6 text-orange-600 dark:text-orange-300">🌍 Explore by Continent</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 justify-center">
        {continents.map(({ name, image }) => (
          <div
            key={name}
            className="cursor-pointer group p-4 rounded-lg bg-white dark:bg-[#2a2a2a] hover:bg-orange-100 dark:hover:bg-[#333] transition-all border shadow"
            onClick={() => handleContinentClick(name)}
          >
            <img
              src={image}
              alt={name}
              className="h-20 mx-auto mb-2 rounded-md group-hover:scale-105 transition-transform"
            />
            <p className="font-semibold text-sm">{name}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default SnackMap;
