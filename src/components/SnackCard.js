import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import { useNavigate } from 'react-router-dom';

const SnackCard = ({ snack = {}, index = 0 }) => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [quickAdd, setQuickAdd] = useState(false);

  const descriptors = {
    chips: 'Artisanal kettle-cooked perfection',
    chocolate: 'Single-origin velvety indulgence',
    jerky: 'Premium air-dried delicacy',
    'corn chips': 'Authentic stone-ground crisp',
    pastry: 'Handcrafted flaky delight',
    cookies: 'Gourmet butter-enriched delicacy',
    'corn snacks': 'Light and airy crunch',
    crackers: 'Imported European-style crisp',
    'peanut snacks': 'Nutty wholesome goodness',
    'cheese snacks': 'Rich creamy savor',
    'instant noodles': 'Authentic street-style flavor',
    'seafood snacks': 'Ocean-inspired umami',
    spread: 'Velvety smooth texture',
    default: 'Exquisite gourmet creation',
  };

  const handleAddToCart = (e) => {
    e.stopPropagation();
    if (!snack?.id) return;
    
    addToCart(snack, true); // Pass true to show effects
    setQuickAdd(true);
    setTimeout(() => setQuickAdd(false), 1500);
  };

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
    const y = -((e.clientY - rect.top) / rect.height - 0.5) * 12;
    setTilt({ x, y });
  };

  const toggleWishlist = (e) => {
    e.stopPropagation();
    if (!snack?.id) return;
    
    if (isInWishlist(snack.id)) {
      removeFromWishlist(snack.id);
    } else {
      addToWishlist(snack);
    }
  };

  if (!snack || !snack.id) {
    return null;
  }

  const category = snack?.category?.toLowerCase() || 'default';
  const descriptor = descriptors[category] || descriptors.default;

  return (
    <motion.div
      className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-100/30 dark:border-amber-900/20 bg-gradient-to-br from-white/95 to-amber-50/80 dark:from-gray-900 dark:to-gray-800 backdrop-blur-sm cursor-pointer"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.y}deg) rotateY(${tilt.x}deg) scale(${
          hovered ? 1.02 : 1
        })`,
        transition: hovered ? 'transform 0.1s ease' : 'transform 0.5s ease',
        boxShadow: hovered
          ? '0 25px 50px -12px rgba(245, 158, 11, 0.25)'
          : '0 10px 25px -5px rgba(0, 0, 0, 0.1)',
      }}
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => {
        setHovered(false);
        setTilt({ x: 0, y: 0 });
      }}
      onMouseMove={handleMouseMove}
      onClick={() => navigate(`/snacks/${snack.id}`)}
    >
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: hovered
            ? `radial-gradient(circle at ${50 + tilt.x * 5}% ${
                50 - tilt.y * 5
              }%, rgba(253, 230, 138, 0.3), transparent 80%)`
            : 'transparent',
          transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        }}
      />

      <div className="relative w-full h-80 overflow-hidden border-b-2 border-amber-100/40 dark:border-amber-900/20">
        {snack.image && (
          <motion.img
            src={`/images/${snack.image}`}
            alt={snack.name || 'Premium snack'}
            className="w-full h-full object-cover"
            animate={{ scale: hovered ? 1.1 : 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          />
        )}

        <div className="absolute top-4 left-4 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
          PREMIUM SELECT
        </div>

        <motion.button
          onClick={toggleWishlist}
          className={`absolute top-4 right-4 p-3 rounded-full shadow-lg backdrop-blur-sm ${
            isInWishlist(snack.id)
              ? 'bg-gradient-to-br from-amber-500 to-pink-500 text-white'
              : 'bg-white/90 text-gray-700 hover:text-amber-500'
          }`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.85 }}
        >
          {isInWishlist(snack.id) ? <FaHeart /> : <FaRegHeart />}
        </motion.button>

        <AnimatePresence>
          {quickAdd && (
            <motion.div
              className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-400 text-white text-xs font-semibold py-2 px-4 rounded-full shadow-lg flex items-center gap-1"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <FaShoppingCart className="text-xs" /> Added to Cart
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="p-6 pt-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-amber-50 font-serif tracking-tight">
            {snack.name || 'Premium Snack'}
          </h3>
          <div className="flex items-center bg-amber-100/60 dark:bg-amber-900/20 px-2 py-1 rounded-full">
            <FaStar className="text-amber-500 text-xs" />
            <span className="text-xs font-medium text-amber-800 dark:text-amber-200 ml-1">
              {snack.rating || '4.8'}
            </span>
          </div>
        </div>

        <p className="text-sm text-amber-800/90 dark:text-amber-200/80 mb-4 font-medium">
          {descriptor}
        </p>

        <div className="flex justify-between items-center mb-6">
          <div>
            <span className="text-3xl font-bold text-amber-600 dark:text-amber-400 font-serif">
              ₹{snack.price || '00'}
            </span>
            {snack.originalPrice && (
              <span className="text-sm text-gray-400 line-through ml-2">
                ₹{snack.originalPrice}
              </span>
            )}
          </div>
          <span className="text-xs text-amber-600/80 dark:text-amber-400/80 font-medium">
            {snack.weight || '100g'}
          </span>
        </div>

        <motion.button
          onClick={handleAddToCart}
          className="w-full flex items-center justify-center gap-3 py-4 rounded-xl text-white bg-gradient-to-r from-amber-600 to-amber-400 hover:from-amber-700 hover:to-amber-500 shadow-lg hover:shadow-amber-400/30 transition-all duration-300"
          whileHover={{
            scale: 1.03,
            boxShadow: '0 10px 25px -5px rgba(245, 158, 11, 0.4)',
          }}
          whileTap={{ scale: 0.97 }}
        >
          <FaShoppingCart className="text-sm" />
          <span className="font-medium tracking-wide">Add to Cart</span>
        </motion.button>
      </div>
    </motion.div>
  );
};

SnackCard.propTypes = {
  snack: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    name: PropTypes.string,
    image: PropTypes.string,
    category: PropTypes.string,
    price: PropTypes.number,
    originalPrice: PropTypes.number,
    weight: PropTypes.string,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    origin: PropTypes.string,
    continent: PropTypes.string,
    isVeg: PropTypes.bool,
    flavor: PropTypes.string,
  }),
  index: PropTypes.number,
};

export default SnackCard;