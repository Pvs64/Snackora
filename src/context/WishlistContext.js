import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from 'react-hot-toast';
import { useUser } from './UserContext';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const { user } = useUser();
  const [wishlist, setWishlist] = useState([]);

  // Load wishlist from localStorage when user changes
  useEffect(() => {
    if (user?.id) {
      console.log('Loading wishlist for user:', user.id);
      const savedWishlist = localStorage.getItem(`user-${user.id}-wishlist`);
      if (savedWishlist) {
        console.log('Found saved wishlist:', JSON.parse(savedWishlist));
        setWishlist(JSON.parse(savedWishlist));
      } else {
        console.log('No saved wishlist found, initializing empty');
        setWishlist([]);
      }
    } else {
      console.log('No user logged in, clearing wishlist');
      setWishlist([]);
    }
  }, [user]);

  // Save wishlist to localStorage when it changes
  useEffect(() => {
    if (user?.id) {
      console.log('Saving wishlist:', wishlist);
      localStorage.setItem(`user-${user.id}-wishlist`, JSON.stringify(wishlist));
    }
  }, [wishlist, user]);

  const addToWishlist = (snack) => {
    if (!user) {
      toast.error('Please log in to add items to your wishlist');
      return;
    }
    if (!snack?.id) {
      toast.error('Invalid snack data');
      return;
    }
    setWishlist((prevWishlist) => {
      if (prevWishlist.some((item) => item.id === snack.id)) {
        toast.error('Item already in wishlist!', {
          style: { background: '#ef4444', color: '#fff', borderRadius: '12px' },
        });
        return prevWishlist;
      }
      toast.success('Added to wishlist!', {
        style: { background: '#34d399', color: '#fff', borderRadius: '12px' },
      });
      return [...prevWishlist, snack];
    });
  };

  const removeFromWishlist = (snackId) => {
    setWishlist((prevWishlist) => {
      const updatedWishlist = prevWishlist.filter((item) => item.id !== snackId);
      if (user?.id && updatedWishlist.length === 0) {
        localStorage.removeItem(`user-${user.id}-wishlist`);
      }
      toast.success('Removed from wishlist!', {
        style: { background: '#34d399', color: '#fff', borderRadius: '12px' },
      });
      return updatedWishlist;
    });
  };

  const isInWishlist = (snackId) => {
    return wishlist.some((item) => item.id === snackId);
  };

  return (
    <WishlistContext.Provider
      value={{ wishlist, setWishlist, addToWishlist, removeFromWishlist, isInWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within a WishlistProvider');
  }
  return context;
};