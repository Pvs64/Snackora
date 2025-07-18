import React, { useState } from 'react';
import snacks from '../data/snacksData';
import SnackCard from './SnackCard';

const moodOptions = [
  { label: '😋 Sweet', flavor: 'Sweet' },
  { label: '🌶 Spicy', flavor: 'Spicy' },
  { label: '🧂 Savory', flavor: 'Savory' },
  { label: '🎲 Surprise Me', flavor: 'random' },
];

const MoodRecommender = () => {
  const [suggestedSnacks, setSuggestedSnacks] = useState([]);

  const handleMoodClick = (flavor) => {
    if (flavor === 'random') {
      const shuffled = [...snacks].sort(() => 0.5 - Math.random());
      setSuggestedSnacks(shuffled.slice(0, 4));
    } else {
      const matched = snacks.filter(snack =>
        snack.flavor.toLowerCase().includes(flavor.toLowerCase())
      );
      setSuggestedSnacks(matched.slice(0, 4));
    }
  };

  return (
    <div className="p-6 my-12 bg-orange-50 dark:bg-[#1a1a1a] rounded-xl shadow-lg" data-aos="fade-up">
      <h2 className="text-2xl font-bold mb-4 text-orange-700 dark:text-orange-300">🧠 Snack Mood Recommender</h2>

      <div className="flex flex-wrap gap-4 mb-6">
        {moodOptions.map((mood, idx) => (
          <button
            key={idx}
            onClick={() => handleMoodClick(mood.flavor)}
            className="px-4 py-2 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition text-sm"
          >
            {mood.label}
          </button>
        ))}
      </div>

      {suggestedSnacks.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-3 text-gray-700 dark:text-gray-200">
            🎯 Based on your mood, try these:
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
            {suggestedSnacks.map(snack => (
              <SnackCard key={snack.id} snack={snack} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default MoodRecommender;
