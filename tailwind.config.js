module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      fontFamily: {
        snack: ['"Poppins"', 'sans-serif'],
        fancy: ['"Quicksand"', '"Poppins"', 'sans-serif'],
      },
      colors: {
        // Light Mode
        backgroundLight: '#fff6ec',
        snackBrown: '#3a1f0f',
        snackOrange: '#ff7b54',
        snackPink: '#ff6b81',
        snackYellow: '#ffe773',

        // Dark Mode
        backgroundDark: '#0b0b0b',
        darkCard: '#1a1a1a',
        darkBorder: '#2b2b2b',
        darkAccent: '#ff8c66',

        // Glass Colors
        navbarGlass: 'rgba(255, 255, 255, 0.15)',
        navbarGlassDark: 'rgba(0, 0, 0, 0.15)',
        navbarBorder: 'rgba(255, 255, 255, 0.2)',
        navbarBorderDark: 'rgba(0, 0, 0, 0.2)',
        buttonHover: 'rgba(255, 255, 255, 0.25)',
        buttonHoverDark: 'rgba(0, 0, 0, 0.25)',

        // Shared
        borderGlass: 'rgba(255, 255, 255, 0.1)',
        glassLight: 'rgba(255, 255, 255, 0.75)',
        glassDark: 'rgba(24, 24, 24, 0.6)',

        // New colors
        loginOverlay: 'rgba(40, 167, 69, 0.9)',
        inputFocus: 'rgba(255, 123, 84, 0.25)',
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #ff6b81, #ffa751)',
        'dark-gradient': 'linear-gradient(135deg, #1f1c2c, #3f2b96)',
        'card-glow': 'radial-gradient(circle at top left, #ffc371, #ff5f6d)',
      },
      boxShadow: {
        glow: '0 0 25px rgba(255, 107, 107, 0.5)',
        card: '0 10px 30px rgba(0, 0, 0, 0.2)',
        pop: '0 6px 30px rgba(255, 105, 135, 0.3)',
        soft: '0 4px 12px rgba(0, 0, 0, 0.1)',
        'search-focused': '0 4px 20px rgba(255, 123, 84, 0.15)',
      },
      backdropBlur: {
        glass: '20px',
      },
      animation: {
        'cursor-glow': 'pulseGlow 2.5s ease-in-out infinite',
        'floatUp': 'floatUp 5s ease-in-out infinite',
        'floatDown': 'floatDown 6s ease-in-out infinite',
        'fadeIn': 'fadeIn 0.3s ease-out forwards',
        'slideDown': 'slideDown 0.3s ease-out forwards',
      },
      keyframes: {
        pulseGlow: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.4' },
          '50%': { transform: 'scale(1.3)', opacity: '0.7' },
        },
        floatUp: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-20px) rotate(5deg)' },
        },
        floatDown: {
          '0%, 100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(20px) rotate(-5deg)' },
        },
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(-20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};