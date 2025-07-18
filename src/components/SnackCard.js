import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import { FaRegBookmark, FaBookmark } from 'react-icons/fa';

const SnackCard = ({ snack }) => {
  const { addToCart } = useCart();
  const [bookmarked, setBookmarked] = useState(false);

  const handleBookmark = () => {
    if (!bookmarked) {
      confetti({ particleCount: 100, spread: 70, origin: { y: 0.6 } });
    }
    setBookmarked(!bookmarked);
  };

  const handleAddToCart = () => {
    addToCart(snack);
    confetti({ particleCount: 60, spread: 70, origin: { y: 0.7 } });
  };

  return (
    <div className="relative group bg-cardGlass backdrop-blur-md border border-borderGlass shadow-glow rounded-2xl p-4 hover:scale-[1.04] transition-transform duration-300">
      {/* Flip container */}
      <div className="relative h-72 w-full [perspective:1000px]">
        <div className="relative h-full w-full transition-transform duration-700 [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)]">

          {/* Front */}
          <div
            className="absolute inset-0 bg-white dark:bg-[#2a2a2a] rounded-xl shadow overflow-hidden"
            style={{ backfaceVisibility: 'hidden' }}
          >
            <img
              src={`/images/${snack.image}`}
              alt={snack.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold">{snack.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {snack.origin} • {snack.flavor}
              </p>
              <div className="flex justify-between items-center mt-3">
                <span className="text-orange-600 dark:text-orange-300 font-bold text-lg">
                  ₹{snack.price}
                </span>
                <button
                  onClick={handleAddToCart}
                  className="bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 bg-orange-50 dark:bg-[#181818] rounded-xl p-4 text-sm shadow flex flex-col justify-between"
            style={{
              transform: 'rotateY(180deg)',
              backfaceVisibility: 'hidden',
            }}
          >
            <div>
              <h4 className="font-semibold text-orange-600 dark:text-orange-300 mb-2">Snack Fact</h4>
              <p>
                This snack from <b>{snack.origin}</b> is loved for its <b>{snack.flavor.toLowerCase()}</b> flavor.
              </p>
              <p className="mt-3">
                {snack.isVeg ? '🌱 Vegetarian' : '🍖 Non-Vegetarian'}
              </p>
            </div>

            <button
              onClick={handleAddToCart}
              className="mt-4 bg-orange-500 text-white px-3 py-1 rounded hover:bg-orange-600 text-sm transition self-end"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Bookmark Icon */}
      <button
        onClick={handleBookmark}
        className="absolute top-2 right-2 text-lg text-orange-500 z-990"
      >
        {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
      </button>
    </div>
  );
};

export default SnackCard;
