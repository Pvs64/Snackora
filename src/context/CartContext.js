import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (snack) => {
    setCartItems((prevItems) => {
      const itemExists = prevItems.find(item => item.id === snack.id);
      if (itemExists) {
        return prevItems.map(item =>
          item.id === snack.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      } else {
        return [...prevItems, { ...snack, quantity: 1 }];
      }
    });
  };

  const removeFromCart = (snackId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== snackId)
    );
  };

  const clearCart = () => setCartItems([]);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
