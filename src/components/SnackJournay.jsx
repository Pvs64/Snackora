import React from "react";
import { motion } from "framer-motion";
import { Earth } from "lucide-react";
import snacks from "../data/snacksData"; // ✅ make sure this path is correct

const getFlag = (country) => {
  const flags = {
    India: "🇮🇳", Japan: "🇯🇵", "South Korea": "🇰🇷", USA: "🇺🇸", Mexico: "🇲🇽",
    Italy: "🇮🇹", Germany: "🇩🇪", France: "🇫🇷", Thailand: "🇹🇭", Israel: "🇮🇱",
    UK: "🇬🇧", Vietnam: "🇻🇳", Indonesia: "🇮🇩", Netherlands: "🇳🇱",
    Nigeria: "🇳🇬", Belgium: "🇧🇪",
  };
  return flags[country] || "🌍";
};

const SnackJourney = () => {
  const sortedSnacks = [...snacks].sort((a, b) =>
    a.origin.localeCompare(b.origin)
  );

  return (
    <div className="py-16 max-w-5xl mx-auto">
      <h2 className="text-4xl font-bold text-center text-primary mb-12">
        🛤️ Snack Journey Timeline
      </h2>
      <div className="border-l-4 border-dashed border-yellow-400 pl-6 relative">
        {sortedSnacks.map((snack, index) => (
          <motion.div
            key={snack.id}
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="mb-10 relative"
          >
            <div className="absolute -left-[35px] top-0 w-8 h-8 rounded-full bg-yellow-300 border-4 border-white shadow-md flex items-center justify-center text-xl">
              {getFlag(snack.origin)}
            </div>
            <h3 className="text-xl font-semibold text-secondary">
              {snack.name}
              <span className="text-sm text-gray-400 ml-2">({snack.origin})</span>
            </h3>
            <p className="text-sm text-gray-500 mb-1">Flavor: {snack.flavor}</p>
            <p className="text-md text-white/90">Price: ₹{snack.price}</p>
          </motion.div>
        ))}
        <Earth className="absolute -left-10 -bottom-16 text-yellow-500 w-16 h-16 animate-bounce" />
      </div>
    </div>
  );
};

export default SnackJourney;
