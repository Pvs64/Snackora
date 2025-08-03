import React from 'react';
import snacks from '../data/snacksData';
import './MoodRecommender.css';

const moodOptions = [
  { label: '😋 Sweet', flavor: 'Sweet' },
  { label: '🌶 Spicy', flavor: 'Spicy' },
  { label: '🧂 Savory', flavor: 'Savory' },
  { label: '🎲 Surprise Me', flavor: 'random' },
];

const MoodRecommender = () => {
  const getSnacksByFlavor = (flavor) => {
    if (flavor === 'random') {
      const shuffled = [...snacks].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 4);
    }
    return snacks.filter(snack =>
      snack.flavor.toLowerCase().includes(flavor.toLowerCase())
    ).slice(0, 4);
  };

  return (
    <div className="mood-recommender-container">
      <h2 className="recommender-title">🍿 Snack Mood Recommender</h2>
      <div className="recommender-content">
        <ul className="hList">
          {moodOptions.map((mood, idx) => (
            <li key={idx}>
              <div className="menu">
                <h2 className={`menu-title menu-title_${idx+1}th`}>
                  {mood.label.replace(/^[^\s]+\s/, '')}
                </h2>
                <ul className="menu-dropdown">
                  {getSnacksByFlavor(mood.flavor).map((snack, snackIdx) => (
                    <li key={snackIdx}>{snack.name}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default MoodRecommender;