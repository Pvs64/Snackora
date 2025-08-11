import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate, useLocation } from 'react-router-dom';
import { FiUser, FiShoppingCart, FiHeart, FiLogOut, FiChevronDown, FiMapPin } from 'react-icons/fi';
import { FaSearch } from 'react-icons/fa';
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
import { Toaster, toast } from 'react-hot-toast';
import { useWishlist } from './context/WishlistContext';
import SplashScreen from './components/SplashScreen';
import PrivacyPolicy from './components/PrivacyPolicy';
import TermsOfService from './components/TermsOfService';
import ScrollToTop from './components/ScrollToTop';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import About from './components/About';
import Wishlist from './components/Wishlist';
import SnackDetail from './components/SnackDetail';
import Addresses from './components/Addresses';
import { useUser } from './context/UserContext';

function App() {
  const { user, login, logout, isLoading } = useUser();
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
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showAddressDropdown, setShowAddressDropdown] = useState(false);
  const [loginForm, setLoginForm] = useState({
    email: '',
    password: '',
    name: '',
  });
  const navigate = useNavigate();
  const location = useLocation();

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerOffset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  useEffect(() => {
    if (location.state?.scrollTo) {
      const timer = setTimeout(() => {
        scrollToSection(location.state.scrollTo);
        navigate('.', { state: {}, replace: true });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [location, navigate]);

  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login({ email: loginForm.email, password: loginForm.password, name: loginForm.name });
      setShowLoginModal(false);
      setLoginForm({ email: '', password: '', name: '' });
    } catch (error) {
      // Error is handled by UserContext with toast
    }
  };

  const handleLogout = () => {
    logout();
    setShowAddressDropdown(false);
  };

  const renderAuthButton = () => {
    if (isLoading) {
      return <div className="h-10 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>;
    }

    if (user) {
      return (
        <div className="relative group">
          <button
            onClick={() => {}}
            className="group relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-tr from-orange-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
          >
            <span className="relative z-10 flex items-center gap-2">
              <FiUser className="text-lg group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">{user.name}</span>
            </span>
          </button>
          <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 hidden group-hover:block">
            <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b border-gray-200 dark:border-gray-700">
              {user.email}
            </div>
            <Link
              to="/orders"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Order History
            </Link>
            <Link
              to="/addresses"
              className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              Saved Addresses
            </Link>
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2"
            >
              <FiLogOut /> Logout
            </button>
          </div>
        </div>
      );
    }

    return (
      <button
        onClick={() => setShowLoginModal(true)}
        className="group relative overflow-hidden px-4 py-2 rounded-xl bg-gradient-to-tr from-orange-400 to-pink-500 text-white font-semibold shadow-md hover:shadow-lg transition-all duration-300 text-sm"
      >
        <span className="relative z-10 flex items-center gap-2">
          <FiUser className="text-lg group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Login</span>
        </span>
      </button>
    );
  };

  const LoginModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              value={loginForm.name}
              onChange={(e) => setLoginForm({ ...loginForm, name: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Email</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              value={loginForm.email}
              onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 dark:text-gray-300 mb-2">Password</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded dark:bg-gray-700 dark:border-gray-600"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              required
            />
          </div>
          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600 disabled:opacity-50"
              disabled={isLoading}
            >
              {isLoading ? 'Logging in...' : 'Login'}
            </button>
            <button
              type="button"
              onClick={() => setShowLoginModal(false)}
              className="text-gray-600 dark:text-gray-300"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );

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
        <div className="fixed inset-0 -z-50 
                    bg-grid-pattern dark:bg-grid-pattern-dark 
                    bg-grid-size 
                    bg-[position:0px_0px]
                    bg-backgroundLight dark:bg-backgroundDark" />
      {showLoginModal && <LoginModal />}
      <SplashScreen />
      <ScrollToTop />
      <Toaster position="top-center" reverseOrder={false} />
      <CursorGlow />
      <div className="min-h-screen transition-all duration-500 bg-backgroundLight/80 text-[#40210f] dark:bg-backgroundDark/80 dark:text-white">
        <header className="sticky top-0 z-50 backdrop-blur-xl bg-white/20 dark:bg-black/20 border-b border-white/10 dark:border-black/10 shadow-sm transition-all duration-300">
          <div className="container mx-auto px-4 py-3 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center">
                <img src={logo} alt="Snackora Logo" className="h-12 sm:h-14 w-auto object-contain" />
              </Link>
              {user && user.addresses?.length > 0 ? (
                <div className="relative">
                  <button
                    onClick={() => setShowAddressDropdown(!showAddressDropdown)}
                    className="flex items-center text-sm text-gray-700 dark:text-gray-300 truncate max-w-[150px]"
                    title={`${user.addresses[0].street}, ${user.addresses[0].city}, ${user.addresses[0].country}`}
                  >
                    <FiMapPin className="mr-1" />
                    <span>
                      {`${user.addresses[0].street}, ${user.addresses[0].city}`.length > 20
                        ? `${user.addresses[0].street}, ${user.addresses[0].city}`.substring(0, 20) + '...'
                        : `${user.addresses[0].street}, ${user.addresses[0].city}`}
                    </span>
                    {user.addresses.length > 1 && <FiChevronDown className="ml-1" />}
                  </button>
                  {showAddressDropdown && (
                    <div className="absolute left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50">
                      {user.addresses.map((addr) => (
                        <div
                          key={addr.id}
                          className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => {
                            const updatedUser = {
                              ...user,
                              addresses: [
                                addr,
                                ...user.addresses.filter((a) => a.id !== addr.id),
                              ],
                            };
                            localStorage.setItem('user', JSON.stringify(updatedUser));
                            setShowAddressDropdown(false);
                          }}
                        >
                          {`${addr.street}, ${addr.city}, ${addr.country}`}
                        </div>
                      ))}
                      <Link
                        to="/addresses"
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                      >
                        Manage Addresses
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                user && (
                  <Link to="/addresses" className="text-sm text-gray-700 dark:text-gray-300">
                    Add Address
                  </Link>
                )
              )}
            </div>
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
                <Link
                  to="/#products-section"
                  className="relative group"
                  onClick={(e) => {
                    if (window.location.pathname === '/') {
                      e.preventDefault();
                      scrollToSection('products-section');
                    }
                  }}
                >
                  <button className="text-gray-700 dark:text-gray-300 font-medium uppercase tracking-wider relative overflow-hidden">
                    <span className="inline-block transition-all duration-200 group-hover:opacity-0 group-hover:-translate-y-full">
                      Products
                    </span>
                    <span className="absolute inset-0 flex justify-center items-center">
                      {['P', 'r', 'o', 'd', 'u', 'c', 't', 's'].map((letter, index) => (
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
            <div className="flex items-center gap-4">
              <div className={`relative transition-all duration-300 ${isSearchFocused ? 'scale-[1.02]' : ''}`} style={{ width: '200px' }}>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaSearch className={`text-gray-500 dark:text-gray-400 transition-all duration-300 ${isSearchFocused ? 'text-orange-500 scale-110' : ''}`} />
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
                {renderAuthButton()}
              </div>
            </div>
          </div>
        </header>

        <Routes>
          <Route
            path="/"
            element={
              <>
                <EmpowerSection />
                <div className="px-4 sm:px-8 lg:px-16">
                  <SnackProgress id="snack-progress-section" cartItems={cartItems} />
                  <PassportCollector id="passport-collector-section" />
                  <MoodRecommender id="mood-recommender-section" />
                </div>
                <div id="products-section" className="flex flex-col lg:flex-row">
                  <div className="lg:w-64 p-4">
                    <FilterSidebar filters={filters} setFilters={setFilters} snacks={snacks} />
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
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/about" element={<About />} />
          <Route path="/snacks/:id" element={<SnackDetail snacks={snacks} />} />
          <Route
            path="/orders"
            element={
              user ? (
                <div className="min-h-screen flex flex-col items-center justify-center p-6">
                  <h2 className="text-2xl font-bold mb-4">Order History</h2>
                  {user.orderHistory?.length > 0 ? (
                    <ul className="w-full max-w-2xl">
                      {user.orderHistory.map((order, index) => (
                        <li key={index} className="border-b py-4">
                          Order #{index + 1}: {order.items.length} items, Total: ${order.total}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p>No orders found.</p>
                  )}
                </div>
              ) : (
                <div className="min-h-screen flex items-center justify-center">
                  Please log in to view your order history.
                </div>
              )
            }
          />
          <Route path="/addresses" element={<Addresses />} />
        </Routes>
        <footer className="bg-gray-900 text-gray-300 border-t border-gray-800">
          <div className="container mx-auto px-6 py-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
                    <Link
                      to="/#products-section"
                      className="hover:text-white transition-colors block"
                      onClick={(e) => {
                        if (window.location.pathname === '/') {
                          e.preventDefault();
                          scrollToSection('products-section');
                        }
                      }}
                    >
                      Products
                    </Link>
                  </li>
                  <li className="pt-4">
                    <Link
                      to="/privacy-policy"
                      className="hover:text-white transition-colors block"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Privacy Policy
                    </Link>
                  </li>
                  <li className="pt-4">
                    <Link
                      to="/terms-of-service"
                      className="hover:text-white transition-colors block"
                      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                    >
                      Terms of Service
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex flex-col space-y-4">
                <div>
                  <h5 className="text-white text-lg font-medium pb-4 relative">
                    Get Help
                    <div className="mt-5 -mb-5 h-[1px] w-[5rem] bg-gray-700"></div>
                  </h5>
                  <ul className="mt-[16px] space-y-4 divide-y divide-gray-700">
                    <li className="pt-4">
                      <Link to="/faq" className="hover:text-white transition-colors block" onClick={() => window.scrollTo(0, 0)}>
                        FAQ
                      </Link>
                    </li>
                    <li className="pt-4">
                      <Link to="/contact" className="hover:text-white transition-colors block">
                        Contact Us
                      </Link>
                    </li>
                    <li className="pt-4">
                      <Link to="" className="hover:text-white transition-colors block">
                        Follow Us :
                      </Link>
                    </li>
                  </ul>
                </div>
                <div className="item-center align-middle">
                  <div className="flex flex-col items-start py-6">
                    <div className="flex">
                      <button
                        onClick={() => window.open('https://www.instagram.com/praphullsingh_00', '_blank')}
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
                          <path d="M68,36C44.7,36,36,44.7,36,68v120c0,23.3,8.7,32,32,32h120c23.3,0,32-8.7,32-32V68c0-23.3-8.7-32-32-32Zm0,24h120c12.15,0,16,3.85,16,16v120c0,12.15-3.85,16-16,16H68c-12.15,0-16-3.85-16-16V68c0-12.15,3.85-16,16-16ZM128,78a50,50,0,1,0,50,50A50.056,50.056,0,0,0,128,78Zm0,12a38,38,0,1,1-38,38A38.043,38.043,0,0,1,128,90Zm60,10a12,12,0,1,0,12,12A12.013,12.013,0,0,0,188,100Z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => window.open('https://t.me/Pvs64', '_blank')}
                        className="w-[90px] h-[90px] bg-white rounded-[5px_90px_5px_5px] shadow-md flex items-center justify-center transition transform hover:scale-110 hover:bg-[#499cef] ml-3 group"
                        aria-label="Telegram"
                      >
                        <svg className="w-[38px] h-[38px] transition group-hover:fill-white" viewBox="0 0 24 24" fill="#499cef">
                          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.26.26-.429.26l.213-3.05 5.572-5.035c.24-.213-.054-.334-.373-.121l-6.89 4.34-2.96-.924c-.64-.203-.658-.64.135-.954l11.566-4.458c.538-.196 1.006.128.832.941z" />
                        </svg>
                      </button>
                    </div>
                    <div className="flex mt-3">
                      <button
                        onClick={() => window.open('https://github.com/Pvs64', '_blank')}
                        className="w-[90px] h-[90px] bg-white rounded-[5px_5px_5px_90px] shadow-md flex items-center justify-center transition transform hover:scale-110 hover:bg-black group"
                        aria-label="GitHub"
                      >
                        <svg className="w-[38px] h-[38px] transition group-hover:fill-white" viewBox="0 0 30 30" fill="black">
                          <path d="M15,3C8.373,3,3,8.373,3,15c0,5.623,3.872,10.328,9.092,11.63C12.036,26.468,12,26.28,12,26.047v-2.051c-0.487,0-1.303,0-1.508,0c-0.821,0-1.551-0.353-1.905-1.009c-0.393-0.729-0.461-1.844-1.435-2.526c-0.289-0.227-0.069-0.486,0.264-0.451c0.615,0.174,1.125,0.596,1.605,1.222c0.478,0.627,0.703,0.769,1.596,0.769c0.433,0,1.081-0.025,1.691-0.121c0.328-0.833,0.895-1.6,1.588-1.962c-3.996-0.411-5.903-2.399-5.903-5.098c0-1.162,0.495-2.286,1.336-3.233C9.053,10.647,8.706,8.73,9.435,8c1.798,0,2.885,1.166,3.146,1.481C13.477,9.174,14.461,9,15.495,9c1.036,0,2.024,0.174,2.922,0.483C18.675,9.17,19.763,8,21.565,8c0.732,0.731,0.381,2.656,0.102,3.594c0.836,0.945,1.328,2.066,1.328,3.226c0,2.697-1.904,4.684-5.894,5.097C18.199,20.49,19,22.1,19,23.313v2.734c0,0.104-0.023,0.179-0.035,0.268C23.641,24.676,27,20.236,27,15C27,8.373,21.627,3,15,3z" />
                        </svg>
                      </button>
                      <button
                        onClick={() => window.open('https://www.linkedin.com/in/praphull-vikram-singh-621aab325', '_blank')}
                        className="w-[90px] h-[90px] bg-white rounded-[5px_5px_90px_5px] shadow-md flex items-center justify-center transition transform hover:scale-110 hover:bg-[#0077b5] ml-3 group"
                        aria-label="LinkedIn"
                      >
                        <svg className="w-[38px] h-[38px] transition group-hover:fill-white" viewBox="0 0 24 24" fill="#0077b5">
                          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div>
                  <h5 className="text-white text-lg font-medium pb-4 relative">
                    Quick Links
                    <div className="mt-5 -mb-5 h-[1px] w-[5rem] bg-gray-700"></div>
                  </h5>
                  <ul className="space-y-4 divide-y divide-gray-700">
                    <li className="pt-4">
                      <button
                        onClick={() => {
                          if (window.location.pathname === '/') {
                            scrollToSection('mood-recommender-section');
                          } else {
                            navigate('/', { state: { scrollTo: 'mood-recommender-section' }, replace: true });
                          }
                        }}
                        className="hover:text-white transition-colors block w-full text-left"
                      >
                        Try SnackMood Recommender
                      </button>
                    </li>
                    <li className="pt-4">
                      <button
                        onClick={() => {
                          if (window.location.pathname === '/') {
                            scrollToSection('snack-progress-section');
                          } else {
                            navigate('/', { state: { scrollTo: 'snack-progress-section' }, replace: true });
                          }
                        }}
                        className="hover:text-white transition-colors block w-full text-left"
                      >
                        Your Global Snack Progress
                      </button>
                    </li>
                    <li className="pt-4">
                      <button
                        onClick={() => {
                          if (window.location.pathname === '/') {
                            scrollToSection('passport-collector-section');
                          } else {
                            navigate('/', { state: { scrollTo: 'passport-collector-section' }, replace: true });
                          }
                        }}
                        className="hover:text-white transition-colors block w-full text-left"
                      >
                        Download Snackora Passport
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="flex flex-col mt-[3rem]">
                  <h6 className="text-white font-medium mb-2">
                    Newsletter
                    <div className="mt-4 mb-4 h-[2px] w-[5rem] bg-gray-700"></div>
                  </h6>
                  <form className="flex space-x-2">
                    <input
                      type="email"
                      placeholder="Your email"
                      className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded focus:outline-none focus:border-blue-500"
                      required
                    />
                    <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>
            </div>
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