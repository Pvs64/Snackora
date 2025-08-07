import React, { useRef, useEffect, useState } from 'react';
import Globe from 'react-globe.gl';
import snacks from '../data/snacksData';

const EmpowerSection = () => {
  const globeRef = useRef();
  const containerRef = useRef();
  const [points, setPoints] = useState([]);
  const [hoverInfo, setHoverInfo] = useState(null);
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: window.innerHeight * 0.75
  });

  // Generate random stars data
  const [stars, setStars] = useState([]);
  
  useEffect(() => {
    // Generate 100 stars with random positions and sizes
    const newStars = Array.from({ length: 100 }).map(() => ({
      id: Math.random().toString(36).substring(7),
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 3 + 1}px`,
      opacity: Math.random() * 0.8 + 0.2,
      animationDelay: `${Math.random() * 5}s`,
      animationDuration: `${Math.random() * 10 + 5}s`
    }));
    setStars(newStars);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight * 0.75
      });
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const pointsData = snacks.map(snack => ({
      lat: getLatLon(snack.origin)?.lat || 0,
      lng: getLatLon(snack.origin)?.lon || 0,
      size: 0.1,
      color: 'orange',
      country: snack.origin,
      snack: snack
    }));
    setPoints(pointsData);

    const globe = globeRef.current;
    if (globe) {
      globe.controls().autoRotate = true;
      globe.controls().autoRotateSpeed = 1;
      globe.controls().enableZoom = false;
    }
  }, []);

  const handleHover = (point) => {
    const globe = globeRef.current;
    if (!globe) return;

    if (point) {
      globe.controls().autoRotate = false;
      setHoverInfo({
        country: point.country,
        snack: point.snack
      });
    } else {
      globe.controls().autoRotate = true;
      setHoverInfo(null);
    }
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-[80vh] bg-[#0a082d] text-white overflow-hidden">
      {/* Starry Background - now using individual divs for better control */}
      <div className="absolute inset-0 overflow-hidden">
        {stars.map(star => (
          <div
            key={star.id}
            className="absolute rounded-full bg-white"
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              opacity: star.opacity,
              animation: `twinkle ${star.animationDuration} infinite ${star.animationDelay}`,
            }}
          />
        ))}
      </div>

      {/* Heading */}
      <div className="z-10 text-center absolute top-6 left-1/2 transform -translate-x-1/2">
        <h2 className="text-3xl sm:text-4xl font-bold text-orange-400">Explore Global Snacks</h2>
        {/* <p className="text-sm sm:text-base text-white/70">Hover over a country to discover snacks!</p> */}
      </div>

      {/* Globe */}
      <div className="absolute top-7 inset-0 z-0">
        <Globe
          ref={globeRef}
          globeImageUrl="//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
          backgroundColor="rgba(0,0,0,0)"
          pointsData={points}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude="size"
          pointLabel="country"
          pointRadius={0.35}
          width={dimensions.width}
          height={dimensions.height}
          onPointHover={handleHover}
        />
      </div>

      {/* Hover Popup */}
      {hoverInfo && (
        <div className="z-20 absolute bottom-8 left-1/2 transform -translate-x-1/2 backdrop-blur-[15px] backdrop-saturate-[181%] bg-[rgba(112,23,51,0.24)] border border-[rgb(252,250,95)] dark:text-white p-4 rounded-lg shadow-lg">
          <h3 className="font-bold text-lg mb-1">{hoverInfo.country}</h3>
          {hoverInfo.snack ? (
            <div className="flex items-center gap-3">
              <img
                src={`/images/${hoverInfo.snack.image}`}
                alt={hoverInfo.snack.name}
                className="h-12 w-12 object-cover rounded-full border"
              />
              <span>{hoverInfo.snack.name}</span>
            </div>
          ) : (
            <p className="italic text-sm">No snacks yet — we're expanding!</p>
          )}
        </div>
      )}
    </section>
  );
};

const getLatLon = (country) => {
  const coords = {
    India: { lat: 20.5937, lon: 78.9629 },
    Japan: { lat: 36.2048, lon: 138.2529 },
    'South Korea': { lat: 35.9078, lon: 127.7669 },
    USA: { lat: 37.0902, lon: -95.7129 },
    Mexico: { lat: 23.6345, lon: -102.5528 },
    Italy: { lat: 41.8719, lon: 12.5674 },
    Germany: { lat: 51.1657, lon: 10.4515 },
    France: { lat: 46.6034, lon: 1.8883 },
    Thailand: { lat: 15.8700, lon: 100.9925 },
    Israel: { lat: 31.0461, lon: 34.8516 },
    UK: { lat: 55.3781, lon: -3.4360 },
    Vietnam: { lat: 14.0583, lon: 108.2772 },
    Indonesia: { lat: -0.7893, lon: 113.9213 },
    Netherlands: { lat: 52.1326, lon: 5.2913 },
    Nigeria: { lat: 9.0820, lon: 8.6753 },
    Belgium: { lat: 50.5039, lon: 4.4699 },
  };
  return coords[country];
};

export default EmpowerSection;