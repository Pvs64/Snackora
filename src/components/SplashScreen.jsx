import { useEffect, useState } from 'react';
import logo from '../assets/logo.png';

const SplashScreen = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [animationPhase, setAnimationPhase] = useState(0);

  useEffect(() => {
    const shown = sessionStorage.getItem('snackora-welcome-shown');
    if (!shown) {
      sessionStorage.setItem('snackora-welcome-shown', 'true');
    }

    // Animation timeline
    const phaseTimers = [
      setTimeout(() => setAnimationPhase(1), 800),  // Rings appear
      setTimeout(() => setAnimationPhase(2), 1800), // Logo appears
      setTimeout(() => setAnimationPhase(3), 2800), // Text appears
      setTimeout(() => setShowSplash(false), 4500), // Exit
    ];

    return () => phaseTimers.forEach(clearTimeout);
  }, []);

  return (
    <>
      {showSplash && (
        <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center overflow-hidden">
          {/* SVG Filter for glow effect */}
          <svg className="filter" xmlns="http://www.w3.org/2000/svg" version="1.1">
            <filter id="blurFilter">
              <feGaussianBlur stdDeviation="4.5"></feGaussianBlur>
              <feColorMatrix 
                type="matrix" 
                values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 19 -9"
              ></feColorMatrix>
            </filter>
          </svg>

          {/* Animated rings container */}
          <div className="demo">
            <div className="rings">
              <div className="rings">
                <div className={`logo transition-opacity duration-1000 ${animationPhase >= 2 ? 'opacity-100' : 'opacity-0'}`}>
                  <img 
                    src={logo} 
                    alt="Snackora logo" 
                    className="w-32 h-32 object-contain"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Text content */}
          <div className={`absolute inset-0 flex flex-col items-center justify-center transition-opacity duration-1000 ${animationPhase >= 3 ? 'opacity-100' : 'opacity-0'}`}>
            <h1 className="text-5xl sm:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-600 mb-4">
              Welcome to <span className="font-extrabold">Snackora</span>
            </h1>
            <p className="text-xl text-gray-300 font-medium">
              Your Passport To World Taste
            </p>
          </div>
        </div>
      )}

      <style jsx global>{`
        @property --value {
          syntax: "<angle>";
          inherits: true;
          initial-value: 0deg;
        }

        @property --width-ratio {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        @property --scale {
          syntax: "<number>";
          inherits: true;
          initial-value: 0;
        }

        :root {
          --width: 1.8vmin;
          --duration: 7s;
          --size: 70vmin;
        }

        .rings {
          filter: url(#blurFilter);
          width: var(--size);
          aspect-ratio: 1;
          border-radius: 50%;
          position: relative;
          perspective: var(--size);
        }

        .rings:before,
        .rings:after {
          content: "";
          position: absolute;
          inset: 0;
          background: rgba(255, 0, 0, 1);
          border-radius: 50%;
          --width-ratio: 1;
          border: calc(var(--width) * var(--width-ratio)) solid transparent;
          mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0);
          background: conic-gradient(
              from calc(var(--value) * 3),
              #41dbff,
              transparent,
              #04f5ff,
              #278ebb,
              #3bf6ff,
              transparent,
              transparent,
              #00a8ff,
              transparent,
              #24e0ff,
              #00cdff,
              white,
              transparent,
              transparent,
              transparent
            )
            border-box;
          mask-composite: exclude;
          animation: ring var(--duration) ease-in-out infinite;
          --start: 180deg;
          --value: var(--start);
          --scale: 1;
          transform: rotateY(var(--value)) rotateX(var(--value)) rotateZ(var(--value))
            scale(var(--scale));
        }

        .rings:before {
          --start: 180deg;
        }

        .rings:after {
          --start: 90deg;
        }

        .rings > .rings:before {
          --start: 360deg;
        }

        .rings > .rings:after {
          --start: 270deg;
        }

        @keyframes ring {
          from {
            --value: var(--start);
            --scale: 1;
          }
          50% {
            --scale: 1.2;
            --width-ratio: 1.5;
          }
          70% {
            --scale: 1;
            --value: calc(var(--start) + 180deg);
            --width-ratio: 1;
          }
          80% {
            --scale: 1.2;
            --width-ratio: 1.5;
          }
          to {
            --value: calc(var(--start) + 360deg);
            --scale: 1;
            --width-ratio: 1;
          }
        }

        .logo {
          display: grid;
          place-items: center;
          position: absolute;
          inset: 0;
          filter: drop-shadow(0 0 1.5rem hsla(200.57deg, 77%, 74%, 0.8));
          background-size: calc(var(--size) / 1.5);
        }

        .demo {
          display: grid;
          place-items: center;
          height: 100vh;
          width: 100vw;
          --floor-tile-size: 2rem;
          --floor-color: rgb(213 134 238 / 10%);
          background: radial-gradient(transparent 25%, black 60%),
            repeating-linear-gradient(
              45deg,
              var(--floor-color) 0,
              var(--floor-color) 1.9rem,
              transparent 1.9rem,
              transparent var(--floor-tile-size)
            ),
            repeating-linear-gradient(
              115deg,
              var(--floor-color) 0,
              var(--floor-color) 1.9rem,
              transparent 1.9rem,
              transparent var(--floor-tile-size)
            ),
            conic-gradient(from 0deg, #555, black, #111, #555);
        }

        .filter {
          display: block;
          width: 0;
          height: 0;
          overflow: visible !important;
          position: absolute;
        }
      `}</style>
    </>
  );
};

export default SplashScreen;