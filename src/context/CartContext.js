import React, { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import confetti from "canvas-confetti";

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [hasInitialized, setHasInitialized] = useState(false);

  useEffect(() => {
    // Load cart from localStorage only once
    if (!hasInitialized) {
      const stored = localStorage.getItem("snackora_cart");
      if (stored) {
        setCartItems(JSON.parse(stored));
      }
      setHasInitialized(true);
    }
  }, [hasInitialized]);

  useEffect(() => {
    if (hasInitialized) {
      localStorage.setItem("snackora_cart", JSON.stringify(cartItems));
    }
  }, [cartItems, hasInitialized]);

  const addToCart = (item, showEffects = false) => {
    setCartItems((prev) => {
      const exists = prev.find((i) => i.id === item.id);
      if (exists) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });

    if (showEffects) {
      toast.success(`Added ${item.name} to cart!`, {
        duration: 3000,
        position: 'top-center',
        style: {
          background: '#1dd1a1',
          color: '#fff',
          padding: '16px',
          borderRadius: '12px',
          fontSize: '1.1rem',
          fontWeight: '600',
        },
      });

      confetti({
        particleCount: 120,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57'],
      });
    }
  };

  const removeFromCart = (id) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => setCartItems([]);

  const updateQuantity = (id, quantity) => {
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        clearCart,
        updateQuantity,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}