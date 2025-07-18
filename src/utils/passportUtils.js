// src/utils/passportUtils.js

export const getVisitedCountries = (cartItems) => {
  const countries = new Set();
  cartItems.forEach(item => {
    countries.add(item.origin);
  });
  return Array.from(countries);
};
