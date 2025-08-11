import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { Link } from 'react-router-dom';
import { FiTrash2 } from 'react-icons/fi';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 dark:text-white">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Your wishlist is empty</p>
          <Link
            to="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-lg hover:opacity-90"
          >
            Discover Products
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item) => (
            <div
              key={item.id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-4 flex flex-col"
            >
              <img
                src={`/images/${item.image}`}
                alt={item.name}
                className="w-full h-40 object-cover rounded-lg mb-4"
                onError={(e) => (e.target.src = '/images/fallback.jpg')}
              />
              <h3 className="text-lg font-medium dark:text-white">{item.name}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">{item.category}</p>
              <p className="text-lg font-bold text-amber-600 dark:text-amber-400 mt-2">₹{item.price}</p>
              <div className="flex justify-between mt-4">
                <Link
                  to={`/snacks/${item.id}`}
                  className="px-4 py-2 bg-amber-500 text-white rounded hover:bg-amber-600"
                >
                  View Details
                </Link>
                <button
                  onClick={() => removeFromWishlist(item.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;