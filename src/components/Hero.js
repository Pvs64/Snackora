import React from 'react';

const Hero = () => {
  return (
    <section className="relative text-center py-6 px-6 bg-[linear-gradient(0deg,rgba(111,122,176,1)_0%,rgba(252,70,107,1)_100%)] dark:bg-[linear-gradient(180deg,rgba(52,62,140,1)_0%,rgba(127,90,131,1)_100%)] overflow-hidden">

      <h1 className="text-5xl md:text-7xl font-fancy font-bold text-white drop-shadow-lg">
        Snackora
      </h1>
      <p className="mt-4 text-xl md:text-2xl italic text-white/80 font-medium">
        Your Passport To World Taste 🌍
      </p>
    </section>
  );
};

export default Hero;
