import React from 'react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart } = useCart();

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 } });
    alert('🎉 Order placed successfully!');
    clearCart();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Your Cart</h1>
      
      {cartItems.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-xl text-gray-600 dark:text-gray-400">Your cart is empty</p>
          <Link 
            to="/" 
            className="mt-4 inline-block px-6 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition"
          >
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div>
          <div className="grid gap-6">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow">
                <div className="flex items-center gap-4">
                  <img 
                    src={`/images/${item.image}`} 
                    alt={item.name} 
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div>
                    <h3 className="font-medium">{item.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {item.origin} • {item.flavor}
                    </p>
                    <p className="text-sm">₹{item.price} × {item.quantity}</p>
                  </div>
                </div>
                <button 
                  onClick={() => removeFromCart(item.id)}
                  className="text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>

          <div className="mt-8 p-6 bg-orange-50 dark:bg-gray-800 rounded-lg">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold">Total: ₹{totalPrice}</h3>
              <div className="flex gap-4">
                <button 
                  onClick={clearCart}
                  className="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 rounded"
                >
                  Clear Cart
                </button>
                <button 
                  onClick={handleCheckout}
                  className="px-4 py-2 bg-orange-500 hover:bg-orange-600 text-white rounded"
                >
                  Checkout
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
