import React from 'react';
import snacks from '../data/snacksData';

const SnackProgress = ({ cartItems }) => {
  const continents = ['Asia', 'Europe', 'North America', 'Africa', 'South America', 'Australia'];

  const progressData = continents
    .map(continent => {
      const continentName = continent === 'Oceania' ? 'Australia' : continent;
      const total = snacks.filter(snack => 
        snack.continent === continent || 
        (continent === 'Australia' && snack.continent === 'Oceania')
      ).length;
      const explored = cartItems.filter(snack => 
        snack.continent === continent || 
        (continent === 'Australia' && snack.continent === 'Oceania')
      ).length;
      const percent = total > 0 ? Math.round((explored / total) * 100) : 0;

      return { 
        continent: continentName, 
        explored, 
        total, 
        percent,
        color: getColorForContinent(continentName) 
      };
    })
    .filter(item => item.total > 0);

  function getColorForContinent(continent) {
    const colors = {
      'Asia': '#FF6384',
      'Europe': '#36A2EB',
      'North America': '#FFCE56',
      'Africa': '#4BC0C0',
      'South America': '#9966FF',
      'Australia': '#FF9F40'
    };
    return colors[continent] || '#F97316';
  }

  const renderProgressCard = ({ continent, explored, total, percent, color }) => {
    const size = 180;
    const strokeWidth = 12;
    const radius = (size / 2) - (strokeWidth * 2);
    const circumference = radius * 2 * Math.PI;
    const strokeDashoffset = circumference - (percent / 100) * circumference;

    return (
      <div 
        key={continent}
        className="w-[240px] h-[250px] rounded-[20px] bg-[#f5f5f5] relative p-6 border-2 border-[#c3c6ce]
                   transition-all duration-300 ease-out overflow-visible hover:border-[#008bf8]
                   hover:shadow-[0_4px_18px_0_rgba(0,0,0,0.25)] dark:bg-gray-800 dark:border-gray-700
                   dark:hover:border-blue-500 group" // Added 'group' class here
      >
        <div className="h-full flex flex-col items-center justify-between">
          <div className="flex flex-col items-center gap-2">
            <p className="text-xl font-bold text-center dark:text-white">{continent}</p>
          </div>

          {/* Large Circular Progress Bar */}
          <div className="relative" style={{ width: size, height: size }}>
            <svg width={size} height={size} className="transform -rotate-90">
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke="#e5e7eb"
                strokeWidth={strokeWidth}
                className="dark:stroke-gray-600"
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={radius}
                fill="transparent"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                className="transition-all duration-1000 ease-out"
                style={{ strokeDashoffset }}
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">

              <span className="text-lg text-gray-600 dark:text-gray-300 mt-2">
                {explored}/{total} items
              </span>
            </div>
          </div>

          {/* Button showing percentage - now using group-hover */}
          <button 
            className="w-[60%] rounded-xl bg-[#008bf8] text-white py-3 px-4 absolute bottom-0 left-1/2 
                      transform -translate-x-1/2 translate-y-[125%] opacity-0 transition-all duration-300
                      group-hover:translate-y-[50%] group-hover:opacity-100 hover:bg-[#0077cc]"
          >
            {percent}% Complete
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="mt-10" data-aos="fade-up">
      <h2 className="text-2xl sm:text-3xl font-bold mb-8 text-center text-snackOrange">
        🌍 Your Global Snack Journey
      </h2>

      {progressData.length === 0 ? (
        <p className="text-center py-4 text-gray-600 dark:text-gray-400">
          No snacks available to explore!
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-8 px-4"> {/* Removed group class from here */}
          {progressData.map(renderProgressCard)}
        </div>
      )}
    </div>
  );
};

export default SnackProgress;