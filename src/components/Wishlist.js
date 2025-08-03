import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import SnackCard from './SnackCard';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Wishlist</h1>
      
      {wishlist.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">Your wishlist is empty</p>
          <Link 
            to="/" 
            className="mt-4 inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Explore Snacks
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {wishlist.map(snack => (
            <SnackCard key={snack.id} snack={snack} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Wishlist;