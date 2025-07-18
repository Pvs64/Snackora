import React from 'react';
// import snack1 from '../assets/snack1.jpeg';
// import snack2 from '../assets/snack2.jpeg';
// import snack3 from '../assets/snack3.jpeg';

const Hero = () => {
  return (
    <section className="relative text-center py-24 px-6 bg-[linear-gradient(0deg,rgba(111,122,176,1)_0%,rgba(252,70,107,1)_100%)] dark:bg-gradient-to-br dark:from-[#290c55] dark:via-[#5b5212] dark:to-[#5b1331] overflow-hidden">
      {/* Floating snacks */}
      {/* <img
        src={snack1}
        alt="snack"
        className="absolute top-10 left-10 w-14 animate-floatUp opacity-80"
      />
      <img
        src={snack2}
        alt="snack"
        className="absolute bottom-12 right-16 w-20 animate-floatDown opacity-80"
      />
      <img
        src={snack3}
        alt="snack"
        className="absolute top-1/3 right-10 w-12 animate-floatUp opacity-60"
      /> */}

      {/* Hero Text */}
      <h1 className="text-5xl md:text-7xl font-fancy font-bold text-white drop-shadow-lg">
        Snackora
      </h1>
      <p className="mt-4 text-xl md:text-2xl italic text-white/80 font-medium">
        your passport to world taste 🌍✨
      </p>
    </section>
  );
};

export default Hero;
