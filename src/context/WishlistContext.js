import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState([]);

  // Load from localStorage on initial render
  useEffect(() => {
    const savedWishlist = localStorage.getItem('snackora-wishlist');
    if (savedWishlist) {
      setWishlist(JSON.parse(savedWishlist));
    }
  }, []);

  // Save to localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem('snackora-wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const addToWishlist = (snack) => {
    setWishlist((prev) => {
      if (prev.some(item => item.id === snack.id)) {
        return prev;
      }
      return [...prev, snack];
    });
  };

  const removeFromWishlist = (snackId) => {
    setWishlist((prev) => prev.filter(item => item.id !== snackId));
  };

  const isInWishlist = (snackId) => {
    return wishlist.some(item => item.id === snackId);
  };

  return (
    <WishlistContext.Provider 
      value={{ wishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);