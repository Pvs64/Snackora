// src/App.js
import React, { useState, useEffect } from 'react';
import { FiUser, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { Link, Routes, Route } from 'react-router-dom';
import snacks from './data/snacksData';
import FilterSidebar from './components/FilterSidebar';
import SnackCard from './components/SnackCard';
import ThemeToggle from './components/ThemeToggle';
import logo from './assets/logo.png';
import Hero from './components/Hero';
import SnackProgress from './components/SnackProgress';
import MoodRecommender from './components/MoodRecommender';
import EmpowerSection from './components/EmpowerSection';
import CursorGlow from './components/CursorGlow';
import Cart from './components/Cart';
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useCart } from './context/CartContext';
import PassportCollector from './components/PassportCollector';
import { Toaster } from 'react-hot-toast';
import { useWishlist } from './context/WishlistContext';
import SplashScreen from './components/SplashScreen';

function App() {
  const { wishlist } = useWishlist();
  const { cartItems } = useCart();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    continent: '',
    origin: '',
    flavor: '',
    maxPrice: 300,
    isVeg: null,
  });
  const [showLogin, setShowLogin] = useState(false);
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
    confirm: '',
    remember: false,
    mode: 'login',
  });
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const filteredSnacks = snacks.filter((snack) =>
    (filters.continent === '' || snack.continent === filters.continent) &&
    (filters.origin === '' || snack.origin === filters.origin) &&
    (filters.flavor === '' || snack.flavor.toLowerCase().includes(filters.flavor.toLowerCase())) &&
    (filters.maxPrice >= snack.price) &&
    (filters.isVeg === null || snack.isVeg === filters.isVeg) &&
    snack.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
    
      <SplashScreen />
      <Toaster position="top-center" reverseOrder={false} />
      
      {/* Grid Background - Fixed position covering entire viewport */}
      <div 
        className="fixed inset-0 -z-50"
        style={{
          '--color': 'rgba(114, 114, 114, 0.3)',
          backgroundColor: '#191a1a',
          backgroundImage: `
            linear-gradient(0deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent),
            linear-gradient(90deg, transparent 24%, var(--color) 25%, var(--color) 26%, transparent 27%, transparent 74%, var(--color) 75%, var(--color) 76%, transparent 77%, transparent)
          `,
          backgroundSize: '55px 55px',
        }}
      />
      
      {/* Main App Container */}
      <div className={`min-h-screen transition-all duration-500 bg-backgroundLight/80 text-[#40210f] dark:bg-backgroundDark/80 dark:text-white`}>
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/20 dark:bg-black/20 border-b border-white/10 dark:border-black/10 shadow-sm transition-all duration-300">
          
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <Link to="/" className="flex items-center">
              <img
                src={logo}
                alt="Snackora Logo"
                className="h-12 sm:h-14 w-auto object-contain"
              />
            </Link>

            <div
              className={`relative flex-1 max-w-xl mx-4 transition-all duration-300 ${
                isSearchFocused ? 'scale-[1.02]' : ''
              }`}
            >
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch
                  className={`text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                    isSearchFocused ? 'text-orange-500 scale-110' : ''
                  }`}
                />
              </div>
              <input
                type="text"
                placeholder="Discover global snacks..."
                className="block w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white via-orange-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500 dark:placeholder-gray-400 shadow-md text-gray-800 dark:text-white transition-all"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            <div className="flex items-center gap-4">
              <Link to="/wishlist" title="Wishlist" className="relative group">
                <div className="p-2 rounded-full bg-gradient-to-tr from-pink-400 to-red-500 text-white hover:scale-105 transition transform shadow-md">
                  <FiHeart className="h-6 w-6" />
                </div>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-pink-600 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              <Link to="/cart" title="View Cart" className="relative group">
                <div className="p-2 rounded-full bg-gradient-to-tr from-orange-400 to-pink-500 text-white hover:scale-105 transition transform shadow-md">
                  <FiShoppingCart className="h-6 w-6" />
                </div>
                {cartItems.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-orange-500 text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow">
                    {cartItems.reduce((total, item) => total + item.quantity, 0)}
                  </span>
                )}
              </Link>

              <div className="p-1 rounded-full border-2 border-pink-400 hover:border-pink-500 transition-all duration-300 shadow-[0_0_8px_2px_rgba(236,72,153,0.5)]">
                <ThemeToggle />
              </div>

              <button
                onClick={() => setShowLogin(true)}
                className="group relative overflow-hidden px-5 py-2.5 rounded-xl bg-gradient-to-tr from-orange-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiUser className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Login</span>
                </span>
              </button>
            </div>
          </div>
        </header>

        {showLogin && (
          <div
            className="fixed inset-0 z-50 bg-[#660660]/80 flex items-center justify-center p-4 backdrop-blur-sm"
            onClick={() => setShowLogin(false)}
          >
            <div
              className="relative bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-md w-full p-6 animate-fadeIn border-4 border-yellow-400"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setShowLogin(false)}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
              >
                ✕
              </button>

              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800 dark:text-white">
                {loginData.mode === 'login' ? 'Welcome Back!' : 'Join Snackora'}
              </h2>

              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  console.log(
                    `${loginData.mode === 'login' ? 'Logging in' : 'Signing up'} with`,
                    loginData
                  );
                  setShowLogin(false);
                }}
                className="space-y-4"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={loginData.email}
                    onChange={(e) =>
                      setLoginData((prev) => ({ ...prev, email: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Password
                  </label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData((prev) => ({ ...prev, password: e.target.value }))
                    }
                    className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white transition-all"
                    placeholder="••••••••"
                  />
                </div>

                {loginData.mode === 'signup' && (
                  <div>
                    <label
                      htmlFor="confirm"
                      className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                    >
                      Confirm Password
                    </label>
                    <input
                      type="password"
                      id="confirm"
                      name="confirm"
                      required
                      onChange={(e) =>
                        setLoginData((prev) => ({ ...prev, confirm: e.target.value }))
                      }
                      className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:ring-2 focus:ring-orange-500 dark:bg-gray-700 dark:text-white transition-all"
                      placeholder="••••••••"
                    />
                  </div>
                )}

                <div className="flex items-center justify-between">
                  <label className="flex items-center text-sm text-gray-700 dark:text-gray-300">
                    <input
                      type="checkbox"
                      checked={loginData.remember}
                      onChange={(e) =>
                        setLoginData((prev) => ({ ...prev, remember: e.target.checked }))
                      }
                      className="mr-2 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                    />
                    Remember me
                  </label>
                  <a href="#" className="text-sm text-orange-500 dark:text-orange-400 hover:underline">
                    Forgot password?
                  </a>
                </div>

                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white py-2 px-4 rounded-lg font-medium transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  {loginData.mode === 'login' ? 'Sign in' : 'Create Account'}
                </button>
              </form>

              <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-400">
                {loginData.mode === 'login' ? (
                  <>
                    Don&apos;t have an account?{' '}
                    <button
                      onClick={() => setLoginData((prev) => ({ ...prev, mode: 'signup' }))}
                      className="text-orange-600 dark:text-orange-400 hover:underline"
                    >
                      Sign up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{' '}
                    <button
                      onClick={() => setLoginData((prev) => ({ ...prev, mode: 'login' }))}
                      className="text-orange-600 dark:text-orange-400 hover:underline"
                    >
                      Sign in
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        )}

        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <EmpowerSection />
                {/* <SnackMap setFilters={setFilters} /> */}
                <div className="px-4 sm:px-8 lg:px-16">
                  <SnackProgress cartItems={cartItems} />
                  <PassportCollector />
                  <MoodRecommender />
                  
                </div>
                <div className="flex flex-col lg:flex-row">
                  <div className="lg:w-64 p-4">
                    <FilterSidebar filters={filters} setFilters={setFilters} />
                  </div>
                  <div className="flex-1">
                    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {filteredSnacks.length === 0 ? (
                        <div className="text-center text-lg col-span-full text-gray-500 dark:text-gray-400">
                          No snacks match your filters 😢
                        </div>
                      ) : (
                        filteredSnacks.map((snack) => <SnackCard key={snack.id} snack={snack} />)
                      )}
                    </div>
                  </div>
                </div>
              </>
            }
          />
          <Route path="/cart" element={<Cart />} />
        </Routes>

        <footer className="text-center py-6 text-sm opacity-60 dark:text-gray-400">

          © 2025 Snackora. Crafted for competition with love 🍿
        </footer>
      </div>
    </>
  );
}

export default App;