import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { FiTrash2, FiChevronLeft, FiPlus, FiMinus, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { toast } from 'react-hot-toast';
import OrderPlacementModal from './OrderPlacementModal';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const { addToWishlist } = useWishlist();
  const { user, addOrder } = useUser();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [showOrderModal, setShowOrderModal] = useState(false);

  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  const handleCheckout = () => {
    if (!user) {
      toast.error('Please log in to place an order');
      return;
    }
    setShowOrderModal(true);
  };

  const handlePlaceOrder = (orderDetails) => {
    setIsCheckingOut(true);
    setTimeout(() => {
      addOrder({
        ...orderDetails,
        items: [...cartItems],
        total: totalPrice,
        date: new Date().toISOString(),
      });
      confetti({
        particleCount: 200,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff6b6b', '#48dbfb', '#1dd1a1', '#feca57'],
      });
      toast.success('🎉 Order placed successfully!', {
        duration: 4000,
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
      clearCart();
      setIsCheckingOut(false);
      setShowOrderModal(false);
    }, 2000);
  };

  const handleMoveToWishlist = (item) => {
    addToWishlist(item);
    removeFromCart(item.id);
    toast.success(`${item.name} moved to wishlist!`, {
      duration: 2000,
      position: 'top-right',
    });
  };

  const handleImageError = (e) => {
    console.warn(`Failed to load image: /images/${e.target.src}`);
    e.target.src = '/images/fallback.jpg';
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="flex items-center mb-6">
        <Link
          to="/"
          className="flex items-center text-orange-500 hover:text-orange-600 transition-colors"
        >
          <FiChevronLeft className="mr-1" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold ml-4 dark:text-white">Your Shopping Cart</h1>
      </div>

      {cartItems.length === 0 ? (
        <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl shadow-lg">
          <div className="max-w-md mx-auto">
            <div className="w-24 h-24 mx-auto mb-6 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
              <FiShoppingCart className="text-4xl text-gray-400" />
            </div>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-4">Your cart is empty</p>
            <Link
              to="/"
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-orange-500 to-pink-500 text-white font-medium rounded-lg hover:opacity-90 transition-all shadow-md"
            >
              Discover Products
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden">
              <div className="p-4 border-b border-gray-100 dark:border-gray-700">
                <h2 className="font-semibold text-lg dark:text-white">
                  {cartItems.reduce((total, item) => total + item.quantity, 0)} Items
                </h2>
              </div>

              <div className="divide-y divide-gray-100 dark:divide-gray-700">
                {cartItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 flex flex-col sm:flex-row gap-4 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <img
                        src={`/images/${item.image}`}
                        alt={item.name}
                        className="w-24 h-24 sm:w-20 sm:h-20 object-cover rounded-lg"
                        onError={handleImageError}
                      />
                    </div>

                    <div className="flex-grow">
                      <div className="flex justify-between">
                        <div>
                          <h3 className="font-medium text-lg dark:text-white">{item.name}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {item.category} • {item.brand || 'Generic'}
                          </p>
                        </div>
                        <p className="font-semibold dark:text-white">${(item.price * item.quantity).toFixed(2)}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            disabled={item.quantity <= 1}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors disabled:opacity-50"
                          >
                            <FiMinus className="dark:text-white" />
                          </button>
                          <span className="px-4 py-1 text-center w-12 dark:text-white">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="px-3 py-1 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                          >
                            <FiPlus className="dark:text-white" />
                          </button>
                        </div>

                        <div className="flex gap-3">
                          <button
                            onClick={() => handleMoveToWishlist(item)}
                            className="text-gray-500 hover:text-pink-500 transition-colors flex items-center gap-1"
                            title="Move to wishlist"
                          >
                            <FiHeart className="text-sm" />
                            <span className="text-xs hidden sm:inline dark:text-gray-300">Wishlist</span>
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-gray-500 hover:text-red-500 transition-colors flex items-center gap-1"
                          >
                            <FiTrash2 className="text-sm" />
                            <span className="text-xs hidden sm:inline dark:text-gray-300">Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6 sticky top-4">
              <h2 className="text-xl font-bold mb-4 dark:text-white">Order Summary</h2>

              <div className="mb-4 space-y-2 max-h-60 overflow-y-auto pr-2">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">
                      {item.name} × {item.quantity}
                    </span>
                    <span className="font-medium dark:text-white">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 mb-6 border-t border-gray-200 dark:border-gray-700 pt-4">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal</span>
                  <span className="dark:text-white">${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-300">Shipping</span>
                  <span className="text-green-500">FREE</span>
                </div>
                <div className="flex justify-between border-t border-gray-200 dark:border-gray-700 pt-3">
                  <span className="font-semibold dark:text-white">Total</span>
                  <span className="font-bold text-lg dark:text-white">${totalPrice.toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className={`w-full py-3 rounded-lg font-medium transition-all ${
                  isCheckingOut
                    ? 'bg-gray-300 dark:bg-gray-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white shadow-lg hover:shadow-xl'
                }`}
              >
                {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
              </button>

              <div className="mt-4 text-center text-sm text-gray-500 dark:text-gray-400">
                or{' '}
                <button
                  onClick={clearCart}
                  className="text-orange-500 hover:underline"
                >
                  Clear Cart
                </button>
              </div>

              <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700">
                <h3 className="font-medium mb-2 dark:text-gray-300">We Accept</h3>
                <div className="flex gap-3">
                  <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold dark:text-gray-300">VISA</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold dark:text-gray-300">MasterCard</span>
                  </div>
                  <div className="w-12 h-8 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <span className="text-xs font-bold dark:text-gray-300">PayPal</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      <OrderPlacementModal
        isOpen={showOrderModal}
        onClose={() => setShowOrderModal(false)}
        onPlaceOrder={handlePlaceOrder}
        totalAmount={totalPrice}
        cartItems={cartItems}
      />
    </div>
  );
};

export default Cart;