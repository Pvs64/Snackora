import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaShoppingCart, FaStar, FaArrowLeft } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

const SnackDetail = ({ snacks }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const snack = snacks.find(item => item.id === parseInt(id));

  if (!snack) {
    return <div className="container mx-auto py-20 text-center">Product not found</div>;
  }

  // Generate all available images for the snack
  const getAvailableImages = () => {
    const baseName = snack.image.split('.')[0];
    const extension = snack.image.split('.')[1];
    const images = [snack.image]; // Start with the main image

    // Check for numbered variations (2 and 3)
    for (let i = 2; i <= 3; i++) {
      const numberedImage = `${baseName}${i}.${extension}`;
      // Check if this image exists in your actual files
      // In a real app, you might want to verify the file exists
      images.push(numberedImage);
    }

    return images;
  };

  const images = getAvailableImages();

  const toggleWishlist = () => {
    isInWishlist(snack.id) 
      ? removeFromWishlist(snack.id)
      : addToWishlist(snack);
  };

  const handleAddToCart = () => {
    addToCart(snack);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-screen bg-gradient-to-b from-amber-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <div className="container mx-auto px-4 py-8">
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-amber-600 dark:text-amber-400 mb-6"
        >
          <FaArrowLeft className="mr-2" /> Back to Products
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-xl bg-white dark:bg-gray-700">
              <img
                src={`/images/${images[currentImageIndex]}`}
                alt={snack.name}
                className="w-full h-auto max-h-[500px] object-contain"
              />
            </div>

            <div className="flex justify-between mt-4">
              <button 
                onClick={prevImage}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-amber-50 dark:hover:bg-gray-600"
              >
                &larr;
              </button>
              <div className="flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-3 h-3 rounded-full ${currentImageIndex === index ? 'bg-amber-500' : 'bg-gray-300'}`}
                  />
                ))}
              </div>
              <button 
                onClick={nextImage}
                className="p-2 rounded-full bg-white dark:bg-gray-700 shadow hover:bg-amber-50 dark:hover:bg-gray-600"
              >
                &rarr;
              </button>
            </div>

            <div className="flex mt-4 space-x-2">
              {images.map((img, index) => (
                <img
                  key={index}
                  src={`/images/${img}`}
                  alt={`${snack.name} view ${index + 1}`}
                  className={`w-20 h-20 object-cover rounded-lg cursor-pointer border-2 ${currentImageIndex === index ? 'border-amber-500' : 'border-transparent'}`}
                  onClick={() => setCurrentImageIndex(index)}
                />
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{snack.name}</h1>
                <div className="flex items-center mt-2">
                  <div className="flex text-amber-500">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(snack.rating) ? 'text-amber-500' : 'text-amber-300'} />
                    ))}
                  </div>
                  <span className="ml-2 text-gray-600 dark:text-gray-300">
                    {snack.rating || '4.8'} (120 reviews)
                  </span>
                </div>
              </div>
              <button
                onClick={toggleWishlist}
                className="p-3 rounded-full bg-white dark:bg-gray-700 shadow-lg"
              >
                {isInWishlist(snack.id) ? (
                  <FaHeart className="text-red-500" />
                ) : (
                  <FaRegHeart className="text-gray-600 dark:text-gray-300" />
                )}
              </button>
            </div>

            <div className="bg-amber-50 dark:bg-gray-700 p-4 rounded-lg">
              <div className="flex items-end">
                <span className="text-3xl font-bold text-amber-600 dark:text-amber-400">
                  ₹{snack.price}
                </span>
                {snack.originalPrice && (
                  <span className="text-lg text-gray-500 dark:text-gray-400 line-through ml-2">
                    ₹{snack.originalPrice}
                  </span>
                )}
                {snack.originalPrice && (
                  <span className="ml-2 text-green-600 dark:text-green-400 font-medium">
                    {Math.round((1 - snack.price / snack.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Inclusive of all taxes
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Description</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {snack.description}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Origin</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {snack.origin}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Continent</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {snack.continent}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Dietary</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {snack.isVeg ? 'Vegetarian' : 'Non-Vegetarian'}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Flavor</h3>
                  <p className="text-gray-600 dark:text-gray-300 capitalize">
                    {snack.flavor.toLowerCase()}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weight</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {snack.weight || '100g'}
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Category</h3>
                  <p className="text-gray-600 dark:text-gray-300 capitalize">
                    {snack.category || 'snack'}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Ingredients</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {snack.ingredients || 'Ingredients information not available'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Allergens</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {snack.allergens || 'No known allergens'}
                </p>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Nutrition</h3>
                <div className="grid grid-cols-3 gap-2 mt-2">
                  <div className="bg-amber-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Energy</p>
                    <p className="font-medium">{snack.nutrition.energy}</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Protein</p>
                    <p className="font-medium">{snack.nutrition.protein}</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Carbs</p>
                    <p className="font-medium">{snack.nutrition.carbs}</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Sugar</p>
                    <p className="font-medium">{snack.nutrition.sugar}</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fat</p>
                    <p className="font-medium">{snack.nutrition.fat}</p>
                  </div>
                  <div className="bg-amber-50 dark:bg-gray-700 p-2 rounded">
                    <p className="text-xs text-gray-500 dark:text-gray-400">Fiber</p>
                    <p className="font-medium">{snack.nutrition.fiber}</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-bold rounded-lg shadow-lg transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaShoppingCart />
              <span>Add to Cart</span>
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SnackDetail;