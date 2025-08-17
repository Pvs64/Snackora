import React, { createContext, useContext, useState, useEffect } from "react";
import {
  login as authLogin,
  logout as authLogout,
  getCurrentUserId,
  getUserData,
  setUserData
} from "../services/authService";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [userId, setUserId] = useState(getCurrentUserId());
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (userId) {
      const data = getUserData(userId);
      setUser({ id: userId, ...data });
    } else {
      setUser(null);
    }
  }, [userId]);

  // Save user data on change
  useEffect(() => {
    if (userId && user) {
      setUserData(userId, {
        addresses: user.addresses || [],
        cart: user.cart || [],
        wishlist: user.wishlist || []
      });
    }
  }, [user, userId]);

  const login = (email, password) => {
    const id = authLogin(email, password);
    if (id) setUserId(id);
    return id;
  };

  const logout = () => {
    authLogout();
    setUserId(null);
  };

  // Address methods
  const addAddress = (address) => {
    setUser((u) => ({
      ...u,
      addresses: [
        ...(u.addresses || []),
        { ...address, id: Date.now().toString() }
      ]
    }));
  };

  const updateAddress = (id, address) => {
    setUser((u) => ({
      ...u,
      addresses: u.addresses.map((a) =>
        a.id === id ? { ...a, ...address } : a
      )
    }));
  };

  const deleteAddress = (id) => {
    setUser((u) => ({
      ...u,
      addresses: u.addresses.filter((a) => a.id !== id)
    }));
  };

  // Cart methods
  const setCart = (cart) => setUser((u) => ({ ...u, cart }));

  // Wishlist methods
  const setWishlist = (wishlist) => setUser((u) => ({ ...u, wishlist }));

  return (
    <UserContext.Provider
      value={{
        user,
        login,
        logout,
        addAddress,
        updateAddress,
        deleteAddress,
        setCart,
        setWishlist
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  return useContext(UserContext);
}