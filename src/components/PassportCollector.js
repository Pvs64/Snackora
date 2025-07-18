// src/components/PassportCollector.js

import React, { useEffect, useRef, useState } from 'react';
import { getVisitedCountries } from '../utils/passportUtils';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';

const allCountries = [
  'India', 'Japan', 'France', 'Germany', 'Belgium','Vietnam','UK',
  'Israel', 'USA', 'Thailand', 'Italy','Nigeria','Indonesia','Netherlands','South Korea'
];

const PassportCollector = () => {
  const { cartItems } = useCart();
  const visited = getVisitedCountries(cartItems);
  const captureRef = useRef(null);

  const prevVisitedRef = useRef([]);
  const [unlockedCountries, setUnlockedCountries] = useState([]);

  useEffect(() => {
    const prevVisited = prevVisitedRef.current;
    const newlyUnlocked = visited.filter(c => !prevVisited.includes(c));

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach(country => {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
        toast.success(`🌍 You unlocked ${country}!`, {
          style: {
            borderRadius: '8px',
            background: '#1f1f1f',
            color: '#fff',
            border: '2px solid #eab308'
          },
          iconTheme: {
            primary: '#f472b6',
            secondary: '#fff'
          }
        });
      });
      setUnlockedCountries(visited);
    }

    prevVisitedRef.current = visited;
  }, [visited]);

  const handleDownload = () => {
    if (captureRef.current) {
      html2canvas(captureRef.current).then(canvas => {
        const link = document.createElement('a');
        link.download = 'Snackora-Passport.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
        toast.success('📸 Passport downloaded!');
      });
    }
  };

  return (
    <div className="my-10 p-6 bg-white/80 dark:bg-black/40 rounded-3xl shadow-xl border-4 border-yellow-400 relative overflow-hidden">
      <div ref={captureRef}>
        <h2 className="text-3xl font-bold mb-4 text-center text-pink-600 drop-shadow-sm animate-bounce">
          🌍 Snackora Passport
        </h2>

        <div className="flex flex-wrap justify-center gap-3">
          {allCountries.map(country => (
            <span
              key={country}
              className={`px-4 py-2 rounded-full border-2 text-sm font-semibold transition-all duration-300 ${
                visited.includes(country)
                  ? 'bg-pink-500 text-white border-pink-600 shadow-md'
                  : 'bg-transparent text-gray-600 dark:text-gray-300 border-gray-300 dark:border-gray-600'
              }`}
            >
              {country}
            </span>
          ))}
        </div>

        <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-300">
          ✈️ {visited.length} of {allCountries.length} countries explored
        </div>

        {visited.length >= 5 && (
          <div className="mt-6 flex justify-center items-center">
            <div className="px-4 py-2 bg-yellow-100 dark:bg-yellow-700 text-yellow-900 dark:text-yellow-100 rounded-full border-2 border-yellow-500 animate-pulse shadow-lg">
              🏅 Snack Explorer Badge Unlocked!
            </div>
          </div>
        )}
      </div>
s
      {/* Share/Download Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleDownload}
          className="px-5 py-2 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-full shadow-md border-2 border-black dark:border-white transition-all duration-300"
        >
          Download Snack Passport
        </button>
      </div>
    </div>
  );
};

export default PassportCollector;
