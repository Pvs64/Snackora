import React from 'react';
import snacks from '../data/snacksData';

const SnackProgress = ({ cartItems }) => {
  const continents = ['Asia', 'Europe', 'North America', 'Africa', 'South America', 'Oceania'];

  const progressData = continents.map(continent => {
    const total = snacks.filter(snack => snack.continent === continent).length;
    const explored = cartItems.filter(snack => snack.continent === continent).length;
    const percent = total > 0 ? Math.round((explored / total) * 100) : 0;

    return { continent, explored, total, percent };
  });

  return (
    <div
      className="mt-10 p-6 rounded-xl shadow-xl transition-all duration-500 
                 bg-[#fff9f4] text-[#40210f] 
                 dark:bg-[#1c1c1c] dark:text-white"
      data-aos="fade-up"
    >
      <h2 className="text-2xl sm:text-3xl font-bold mb-4 text-snackOrange">
        🌍 Your Global Snack Journey
      </h2>

      {progressData.map(({ continent, explored, total, percent }) => (
        <div key={continent} className="mb-6">
          <div className="flex justify-between mb-1 text-sm sm:text-base font-semibold">
            <span>{continent}</span>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {explored} / {total} ({percent}%)
            </span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-4 rounded-full overflow-hidden">
            <div
              className="h-4 bg-gradient-to-r from-orange-400 to-yellow-300 dark:from-orange-500 dark:to-yellow-400 rounded-full transition-all"
              style={{ width: `${percent}%` }}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnackProgress;
