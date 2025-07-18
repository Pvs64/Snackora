import React from 'react';
import { useCart } from '../context/CartContext';

const continentFlags = {
  Asia: '🌏',
  Europe: '🌍',
  'North America': '🗺️',
  Africa: '🌄',
};

const SnackJourney = () => {
  const { cartItems } = useCart();

  // 🗺️ Extract unique countries
  const uniqueCountries = [...new Set(cartItems.map(item => item.origin))];
  const uniqueContinents = [...new Set(cartItems.map(item => item.continent))];

  const totalContinents = ['Asia', 'Europe', 'North America', 'Africa'];
  const exploredCount = uniqueContinents.length;
  const progressPercent = Math.round((exploredCount / totalContinents.length) * 100);

  return (
      <div className="p-6 rounded-xl bg-gradient-to-r from-orange-50 to-yellow-100 dark:from-[#1a1a1a] dark:to-[#2a2a2a] shadow-lg my-10" data-aos="fade-up">

      <h2 className="text-xl font-semibold mb-4 text-orange-700 dark:text-orange-300">✈️ Your Snack Journey</h2>

      <div className="flex flex-wrap gap-3 mb-4">
        {uniqueCountries.map((country, idx) => (
          <span
            key={idx}
            className="px-3 py-1 bg-orange-100 dark:bg-orange-900 text-sm rounded-full font-medium shadow-sm"
          >
            {country}
          </span>
        ))}
      </div>

      <div className="mt-2">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">
          🌍 You've explored <strong>{exploredCount}</strong> out of <strong>{totalContinents.length}</strong> continents!
        </p>
        <div className="w-full bg-gray-200 dark:bg-gray-800 h-3 rounded-full overflow-hidden">
          <div
            className="bg-orange-500 h-3 transition-all duration-500"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default SnackJourney;
