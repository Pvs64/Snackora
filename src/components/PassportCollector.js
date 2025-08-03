import React, { useEffect, useRef, useState } from 'react';
import { getVisitedCountries } from '../utils/passportUtils';
import { useCart } from '../context/CartContext';
import confetti from 'canvas-confetti';
import toast from 'react-hot-toast';
import html2canvas from 'html2canvas';
import { FaTimes } from 'react-icons/fa';
import './PassportModal.css';

const PassportCollector = () => {
  const allCountries = [
    'India', 'Japan', 'France', 'Germany', 'Belgium', 'Vietnam', 'UK',
    'Israel', 'USA', 'Thailand', 'Italy', 'Nigeria', 'Indonesia', 'Netherlands',
    'South Korea', 'Mexico'
  ];

  const { cartItems } = useCart();
  const visited = getVisitedCountries(cartItems);
  const captureRef = useRef(null);
  const prevVisitedRef = useRef([]);
  const [unlockedCountries, setUnlockedCountries] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [buttonPosition, setButtonPosition] = useState({ x: 0, y: 0 });
  const viewButtonRef = useRef(null);

  const handleViewClick = () => {
    if (viewButtonRef.current) {
      const rect = viewButtonRef.current.getBoundingClientRect();
      setButtonPosition({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2
      });
    }
    setModalOpen(true);
  };

  useEffect(() => {
    const prevVisited = prevVisitedRef.current;
    const newlyUnlocked = visited.filter(c => !prevVisited.includes(c));

    if (newlyUnlocked.length > 0) {
      newlyUnlocked.forEach(country => {
        confetti({ particleCount: 80, spread: 80, origin: { y: 0.5 } });
        toast.success(`🌍 You unlocked ${country}!`);
      });
      setUnlockedCountries(visited);
    }

    prevVisitedRef.current = visited;
  }, [visited]);

  const handleDownload = async () => {
    try {
      toast.loading('Preparing your passport...');
      
      // Ensure modal is open for capture
      if (!modalOpen) setModalOpen(true);
      await new Promise(resolve => setTimeout(resolve, 500));
      
      if (captureRef.current) {
        // Create a clone of the element to capture
        const originalElement = captureRef.current;
        const clone = originalElement.cloneNode(true);
        clone.style.position = 'absolute';
        clone.style.left = '-9999px';
        clone.style.top = '0';
        clone.style.opacity = '1';
        clone.style.visibility = 'visible';
        clone.style.transform = 'none';
        document.body.appendChild(clone);

        // Wait for fonts and images to load
        await new Promise(resolve => setTimeout(resolve, 300));

        const canvas = await html2canvas(clone, {
          scale: 2,
          logging: false,
          useCORS: true,
          backgroundColor: '#ffece4',
          scrollX: 0,
          scrollY: 0,
          windowWidth: clone.scrollWidth,
          windowHeight: clone.scrollHeight
        });

        // Remove the clone
        document.body.removeChild(clone);

        const link = document.createElement('a');
        link.download = `Snackora-Passport-${new Date().toISOString().slice(0,10)}.png`;
        link.href = canvas.toDataURL('image/png');
        link.click();
        
        toast.success('Passport downloaded successfully!');
      }
    } catch (error) {
      toast.error('Failed to download passport');
      console.error('Download error:', error);
    } finally {
      toast.dismiss();
    }
  };

  return (
    <div className="my-10">
      {/* Passport Section Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-snackOrange">
          Your Snackora Passport
        </h2>
        
        <div className="flex flex-wrap justify-center gap-4 mb-8">
          <button 
            ref={viewButtonRef}
            onClick={handleViewClick}
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            View Your Snackora Passport
          </button>
          
          <button
            onClick={handleDownload}
            className="px-6 py-3 bg-gradient-to-r from-pink-600 to-yellow-500 hover:from-pink-700 hover:to-yellow-600 text-white font-medium rounded-lg shadow-md transition-colors"
          >
            Download Your Passport
          </button>
        </div>
      </div>

      {/* Passport Modal */}
      <div 
        className={`passport-modal-layer ${modalOpen ? 'clicked' : ''}`}
        style={{
          '--origin-x': `${buttonPosition.x}px`,
          '--origin-y': `${buttonPosition.y}px`,
        }}
        onClick={(e) => e.target === e.currentTarget && setModalOpen(false)}
      >
        <FaTimes 
          className="passport-modal-close" 
          onClick={() => setModalOpen(false)}
        />
        
        <div 
          className="passport-modal-content"
          onClick={(e) => e.stopPropagation()}
        >
          <div ref={captureRef} className="passport-capture-container">
            {/* <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-pink-600 dark:text-yellow-300">Snackora Global Passport</h2>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 italic">
                Track your global snack adventures!
              </p>
            </div> */}

            <div className="passport-main-content">
              {/* Watermark */}
              <div className="watermark-container">
                <img
                  src="/snackora-logo.png"
                  alt="Snackora Symbol"
                  className="watermark-image"
                  crossOrigin="anonymous"
                />
              </div>

              {/* Passport Header */}
              <div className="text-center mb-6 passport-header">
                <h1 className="passport-title">Snackora Passport</h1>
                <p className="passport-subtitle">
                  your passport to world taste
                </p>
              </div>

              {/* Countries Grid */}
              <div className="country-grid">
                {allCountries.map(country => (
                  <div
                    key={country}
                    className={`country-card ${
                      visited.includes(country) ? 'visited' : 'not-visited'
                    }`}
                  >
                    <span className="country-flag">{getFlag(country)}</span>
                    <span className="country-name">{country}</span>
                    {visited.includes(country) && (
                      <span className="visited-badge">✓ Visited</span>
                    )}
                  </div>
                ))}
              </div>

              {/* Explorer Badge */}
              {visited.length >= 5 && (
                <div className="explorer-badge-container">
                  <div className="explorer-badge">
                    🏅 Explorer Badge Unlocked!
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Flags
const getFlag = (country) => {
  const flags = {
    India: '🇮🇳', Japan: '🇯🇵', France: '🇫🇷', Germany: '🇩🇪', Belgium: '🇧🇪', Vietnam: '🇻🇳',
    UK: '🇬🇧', Israel: '🇮🇱', USA: '🇺🇸', Thailand: '🇹🇭', Italy: '🇮🇹',
    Nigeria: '🇳🇬', Indonesia: '🇮🇩', Netherlands: '🇳🇱', 'South Korea': '🇰🇷', Mexico: '🇲🇽'
  };
  return flags[country] || '🌍';
};

export default PassportCollector;