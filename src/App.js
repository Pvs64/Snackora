// src/App.js
import React, { useState, useEffect } from 'react';
import { FiUser, FiShoppingCart, FiHeart } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import snacks from './data/snacksData';
import FilterSidebar from './components/FilterSidebar';
import SnackCard from './components/SnackCard';
import ThemeToggle from './components/ThemeToggle';
import logo from './assets/logo.png';
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

  const navigate = useNavigate();
  


    const Modal = ({ children, onClose }) => (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm" 
        onClick={onClose}
      ></div>
      <div className="relative min-h-screen flex items-center justify-center p-4">
        {children}
      </div>
    </div>
  );



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
    <div className="relative">
    
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
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img
              src={logo}
              alt="Snackora Logo"
              className="h-12 sm:h-14 w-auto object-contain"
            />
          </Link>

          {/* Navigation Links - Centered */}
          <nav className="absolute left-1/2 transform -translate-x-1/2 hidden md:block">
            <div className="flex space-x-8">
                          <Link to="/" className="relative group">
                <button className="text-gray-700 dark:text-gray-300 font-medium uppercase tracking-wider relative overflow-hidden">
                  <span className="inline-block transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-full">
                    Home
                  </span>
                  <span className="absolute inset-0 flex justify-center items-center">
                    {['H', 'o', 'm', 'e'].map((letter, index) => (
                      <span 
                        key={index}
                        className="inline-block text-gray-700 dark:text-gray-300 opacity-0 translate-y-[-20px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                        style={{ transitionDelay: `${index * 0.15}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-700 dark:bg-orange-400 transition-all duration-400 group-hover:w-full group-hover:left-0"></span>
                </button>
              </Link>

              <Link to="/#products-section" 
              className="relative group"
              onClick={(e) => {
                 if(window.location.pathname=== '/') {
                  e.preventDefault();
                  document.getElementById('product-section').scrollIntoView({ behavior: 'smooth' });
              }}}>
                <button className="text-gray-700 dark:text-gray-300 font-medium uppercase tracking-wider relative overflow-hidden">
                  <span className="inline-block transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-full">
                    Products
                  </span>
                  <span className="absolute inset-0 flex justify-center items-center">
                    {['P', 'r', 'o', 'd','u','c','t','s'].map((letter, index) => (
                      <span 
                        key={index}
                        className="inline-block text-gray-700 dark:text-gray-300 opacity-0 translate-y-[-20px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                        style={{ transitionDelay: `${index * 0.15}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-700 dark:bg-orange-400 transition-all duration-400 group-hover:w-full group-hover:left-0"></span>
                </button>
              </Link>
              
              <Link to="/about" className="relative group">
                <button className="text-gray-700 dark:text-gray-300 font-medium uppercase tracking-wider relative overflow-hidden">
                  <span className="inline-block transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-full">
                    About
                  </span>
                  <span className="absolute inset-0 flex justify-center items-center">
                    {['A', 'b', 'o', 'u', 't'].map((letter, index) => (
                      <span 
                        key={index}
                        className="inline-block text-gray-700 dark:text-gray-300 opacity-0 translate-y-[-20px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                        style={{ transitionDelay: `${index * 0.15}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-700 dark:bg-orange-400 transition-all duration-400 group-hover:w-full group-hover:left-0"></span>
                </button>
              </Link>
              
              <Link to="/contact" className="relative group">
                <button className="text-gray-700 dark:text-gray-300 font-medium uppercase tracking-wider relative overflow-hidden">
                  <span className="inline-block transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-full">
                    Contact
                  </span>
                  <span className="absolute inset-0 flex justify-center items-center">
                    {['C', 'o', 'n', 't', 'a', 'c', 't'].map((letter, index) => (
                      <span 
                        key={index}
                        className="inline-block text-gray-700 dark:text-gray-300 opacity-0 translate-y-[-20px] transition-all duration-200 group-hover:opacity-100 group-hover:translate-y-0"
                        style={{ transitionDelay: `${index * 0.15}s` }}
                      >
                        {letter}
                      </span>
                    ))}
                  </span>
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-gray-700 dark:bg-orange-400 transition-all duration-400 group-hover:w-full group-hover:left-0"></span>
                </button>
              </Link>
            </div>
          </nav>

          {/* Right-side elements (search and icons) */}
          <div className="flex items-center gap-4">
            {/* Search Bar - Made smaller */}
            <div className={`relative transition-all duration-300 ${
              isSearchFocused ? 'scale-[1.02]' : ''
            }`} style={{ width: '200px' }}>
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch
                  className={`text-gray-500 dark:text-gray-400 transition-all duration-300 ${
                    isSearchFocused ? 'text-orange-500 scale-110' : ''
                  }`}
                />
              </div>
              <input
                type="text"
                placeholder="Discover snacks..."
                className="block w-full pl-10 pr-3 py-2 rounded-xl border border-gray-200 dark:border-gray-700 bg-gradient-to-r from-white via-orange-50 to-white dark:from-gray-800 dark:via-gray-900 dark:to-gray-800 focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-gray-500 dark:placeholder-gray-400 shadow-md text-gray-800 dark:text-white transition-all text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsSearchFocused(true)}
                onBlur={() => setIsSearchFocused(false)}
              />
            </div>

            {/* Icons Group */}
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
                className="group relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-tr from-orange-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <FiUser className="text-lg group-hover:scale-110 transition-transform" />
                  <span className="hidden sm:inline">Login</span>
                </span>
              </button>
            </div>
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
                {/* <Hero /> */}
                <EmpowerSection />
                {/* <SnackMap setFilters={setFilters} /> */}
                <div className="px-4 sm:px-8 lg:px-16">
                  <SnackProgress cartItems={cartItems} />
                  <PassportCollector />
                  <MoodRecommender />
                  
                </div>
                <div id="product-section" className="flex flex-col lg:flex-row">
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

        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              
              {/* Snackora Section - Left */}
              <div className="space-y-4">
                <h5 className="text-white text-lg font-medium pb-4 relative">
                  Snackora
                  <div className="mt-5 -mb-5 h-[1px] w-[5rem] bg-gray-700"></div>
                </h5>
                
                <ul className="space-y-4 divide-y divide-gray-700">
                  <li className="pt-4">
                    <Link to="/about" className="hover:text-white transition-colors block">
                      About Us
                    </Link>
                  </li>
                  
                  <li className="pt-4">
                    <Link to="/#products-section" className="hover:text-white transition-colors">
                      Products
                    </Link>
                  </li>
                  
                  <li className="pt-4">
                    <button className="hover:text-white transition-colors">
                      Privacy Policy
                    </button>
                  </li>

                  <li className="pt-4">
                    <button className="hover:text-white transition-colors">
                      Terms of Service
                    </button>
                  </li>
                </ul>
              </div>

              {/* Get Help Section - Middle */}
              <div className="space-y-4">
                <h5 className="text-white text-lg font-medium pb-4 relative">
                  Get Help
                  <div className="mt-5 -mb-5 h-[1px] w-[5rem] bg-gray-700"></div>
                </h5>
                
                <ul className="space-y-4 divide-y divide-gray-700">
                  <li className="pt-4">
                    <Link to="/faq" className="hover:text-white transition-colors block">
                      FAQ
                    </Link>
                  </li>
                  <li className="pt-4">
                    <Link to="/contact" className="hover:text-white transition-colors block">
                      Contact Us
                    </Link>
                  </li>
                </ul>
                
                {/* Social Media Icons */}
                <div className="flex flex-col items-start py-6">
                  <div className="flex">
                    {/* Instagram */}
                    <button
                      onClick={() => window.open("https://www.instagram.com/praphullsingh_00", "_blank")}
                      className="w-[90px] h-[90px] bg-white rounded-[90px_5px_5px_5px] shadow-md flex items-center justify-center transition transform hover:scale-110 hover:bg-[#cc39a4] group"
                      aria-label="Instagram"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 256 256"
                        width="35"
                        height="35"
                        fill="#cc39a4"
                        className="transition group-hover:fill-white"
                      >
                        <path d="M68,36C44.7,36,36,44.7,36,68v120c0,23.3,8.7,32,32,32h120c23.3,0,32-8.7,32-32V68c0-23.3-8.7-32-32-32Zm0,24h120c12.15,0,16,3.85,16,16v120c0,12.15-3.85,16-16,16H68c-12.15,0-16-3.85-16-16V68c0-12.15,3.85-16,16-16ZM128,78a50,50,0,1,0,50,50A50.056,50.056,0,0,0,128,78Zm0,12a38,38,0,1,1-38,38A38.043,38.043,0,0,1,128,90Zm60,10a12,12,0,1,0,12,12A12.013,12.013,0,0,0,188,100Z"/>
                      </svg>
                    </button>
                    {/* Telegram */}
                    <button
                      onClick={() => window.open("https://t.me/Pvs64", "_blank")}
                      className="w-[90px] h-[90px] bg-white rounded-[5px_90px_5px_5px] shadow-md flex items-center justify-center transition transform hover:scale-110 hover:bg-[#499cef] ml-3 group"
                      aria-label="Telegram"
                    >
                      <svg
                        className="w-[38px] h-[38px] transition group-hover:fill-white"
                        viewBox="0 0 24 24"
                        fill="#499cef"
                      >
                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.429.26l.213-3.05 5.572-5.035c.24-.213-.054-.334-.373-.121l-6.89 4.34-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z"/>
                      </svg>
                    </button>
                  </div>
                  <div className="flex mt-3">
                    {/* GitHub */}
                    <button
                      onClick={() => window.open("https://github.com/Pvs64", "_blank")}
                      className="w-[90px] h-[90px] bg-white rounded-[5px_5px_5px_90px] shadow-md flex items-center justify-center transition transform hover:scale-110 hover:bg-black group"
                      aria-label="GitHub"
                    >
                      <svg
                        className="w-[38px] h-[38px] transition group-hover:fill-white"
                        viewBox="0 0 30 30"
                        fill="black"
                      >
                        <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z"/>
                      </svg>
                    </button>
                    {/* LinkedIn */}
                    <button
                      onClick={() => window.open("https://www.linkedin.com/in/praphull-vikram-singh-621aab325?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app", "_blank")}
                      className="w-[90px] h-[90px] bg-white rounded-[5px_5px_90px_5px] shadow-md flex items-center justify-center transition transform hover:scale-110 hover:bg-[#0077b5] ml-3 group"
                      aria-label="LinkedIn"
                    >
                      <svg
                        className="w-[38px] h-[38px] transition group-hover:fill-white"
                        viewBox="0 0 24 24"
                        fill="#0077b5"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </button>
                  </div>
                </div>
              </div>

              {/* Quick Links - Right */}
              <div className="space-y-4">
                <h5 className="text-white text-lg font-medium pb-4 relative">
                  Quick Links
                  <div className="mt-5 -mb-5 h-[1px] w-[5rem] bg-gray-700"></div>
                </h5>
                
                <ul className="space-y-4 divide-y divide-gray-700">
                  <li className="pt-4">
                    <button className="hover:text-white transition-colors">
                      Try SnackMood Recommender 
                    </button>
                  </li>
                  
                  <li className="pt-4">
                    <button className="hover:text-white transition-colors">
                      Your Global Snack Progress
                    </button>
                  </li>
                  
                  <li className="pt-4">
                    <button className="hover:text-white transition-colors">
                      Download Snackora Passport
                    </button>
                  </li>

                  <li className="pt-4">
                    <button className="hover:text-white transition-colors">
                      Terms and Conditions
                    </button>
                  </li>
                </ul>

                {/* Newsletter Form */}
                <div className="flex flex-col mt-8">
                  <h6 className="text-white font-medium mb-2">
                       Newsletter
                       <div className="mt-2  h-[2px] w-[5rem] bg-gray-700"></div>
                       </h6>
                  <form className="flex space-x-2">
                    <input 
                      type="email" 
                      placeholder="Your email" 
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                    <button 
                      type="submit" 
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
                    >
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>

            {/* Copyright - Keep the full-width border here */}
            <div className="mt-12 pt-6 border-t border-gray-800 text-center text-sm">
              © 2023 <span className="hover:text-white font-bold">Snackora</span>. All rights reserved.
            </div>
          </div>
        </footer>
        

      </div>
    </div>
  );

}
export default App;